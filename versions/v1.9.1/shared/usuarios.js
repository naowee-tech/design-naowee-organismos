/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — Usuarios del organismo (Fase 3)
   Cuenta principal destacada arriba (una por organismo, A-9) + panel con
   pestañas «Usuarios» y «Roles del organismo». Invitar según el catálogo
   (transversal + marca), desactivar / reactivar (sin borrado).
   Ministerio: administradores en solo lectura (los crea Naowee, A-7) y
   usuarios territoriales anclados a departamento o municipio (A-2).
   Datos reales de organismos-data.js (usuariosDe / invitarUsuario / cambiarEstadoUsuario).
   ═══════════════════════════════════════════════════════════════ */
import { getRoleFromQuery, ROLES, organismoNoActivo } from './sidebar.js';
import {
  usuariosDe, invitarUsuario, cambiarEstadoUsuario, rolesDelOrganismo,
  CATALOGO_ROLES, ROLES_MINISTERIO, MARCAS, nombreTerritorio, getOrganismo, allOrganismos
} from './organismos-data.js';
import { scopeFor } from './permissions.js';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const toast = (m, t) => { if (window.naoweeToast) window.naoweeToast(m, t); };

/* ─── Iconos (mismo trazo que shared/sidebar.js) ─── */
const sv = (d, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 1.6}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  userPlus: sv('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>', 1.8),
  usersLg: sv('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', 1.4),
  search: sv('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 1.8),
  mail: sv('<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>', 1.8),
  ban: sv('<circle cx="12" cy="12" r="9"/><line x1="5.6" y1="5.6" x2="18.4" y2="18.4"/>', 1.8),
  refresh: sv('<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>', 1.8),
  lock: sv('<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>', 1.9),
  check: sv('<polyline points="20 6 9 17 4 12"/>', 2.4),
  x: sv('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 2),
  info: sv('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>', 2.2),
  alert: sv('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', 2),
  shield: sv('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><polyline points="9 12 11 14 15 10"/>')
};

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fmt = (iso) => { if (!iso) return ''; const [y, m, d] = String(iso).slice(0, 10).split('-'); return `${Number(d)} ${MESES[Number(m) - 1]} ${y}`; };
const ini = (n) => String(n || '').split(/\s+/).filter((w) => /^[A-ZÁÉÍÓÚÑ]/.test(w)).slice(0, 2).map((w) => w[0]).join('') || '?';
const badge = (variant, txt, extra) => `<span class="naowee-badge naowee-badge--${variant} naowee-badge--quiet naowee-badge--small${extra ? ' ' + extra : ''}">${esc(txt)}</span>`;
const ESTADO = { 'Invitado': 'caution', 'Activo': 'positive', 'Desactivado': 'neutral' };
const msg = (variant, icon, html) => `<div class="naowee-message naowee-message--${variant}"><span class="naowee-message__icon">${I[icon]}</span><div class="naowee-message__body"><p class="naowee-message__text">${html}</p></div></div>`;
const docKey = (d) => String(d || '').replace(/\D/g, '');

/* ─── Qué puede y qué no cada rol (texto de interfaz; el catálogo vive en organismos-data.js) ─── */
const ALCANCE = {
  ADMIN: { si: ['Aprobar al nivel de abajo y hacer cargues', 'Crear y desactivar usuarios internos', 'Editar los datos del organismo'], no: ['Haber más de una por organismo', 'Crearse desde esta pantalla: la habilita el nivel superior'] },
  REVISOR: { si: ['Aprobar, devolver o rechazar registros del nivel de abajo', 'Decidir en nombre del organismo'], no: ['Crear ni desactivar usuarios', 'Hacer cargues masivos', 'Editar los datos del organismo'] },
  GESTOR_COC: { si: ['Invitar y asignar metodólogos', 'Ver el Ciclo Olímpico y sus deportistas'], no: ['Aprobar federaciones', 'Crear otros gestores', 'Editar los datos del comité'] },
  METODOLOGO: { si: ['Registrar opiniones sobre deportistas del Ciclo Olímpico', 'Ver las fichas de esos deportistas'], no: ['Invitar usuarios', 'Aprobar registros', 'Ver deportistas fuera del Ciclo Olímpico'] },
  ADMIN_MIN: { si: ['Crear comités y aprobar su parte de las federaciones', 'Sancionar y ver todo el sistema', 'Crear usuarios territoriales'], no: ['Crear otros administradores del Ministerio'] },
  TERRITORIAL: { si: ['Consultar organismos y deportistas de su territorio', 'Registrar deportistas autodeclarados con club propuesto'], no: ['Aprobar registros ni afiliaciones', 'Ver fuera de su departamento o municipio'] }
};
const canHtml = (id) => {
  const a = ALCANCE[id]; if (!a) return '';
  return `<div class="us-can">
    <div class="us-can__col"><p class="us-can__title">Puede</p><ul class="us-can__yes">${a.si.map((t) => `<li>${I.check}<span>${esc(t)}</span></li>`).join('')}</ul></div>
    <div class="us-can__col"><p class="us-can__title">No puede</p><ul class="us-can__no">${a.no.map((t) => `<li>${I.x}<span>${esc(t)}</span></li>`).join('')}</ul></div>
  </div>`;
};
const MARCA_NOMBRE = { olimpica: 'Funcionalidades olímpicas' };
const propuestaTxt = (r) => (r && r.propuesta ? 'Rol transversal propuesto (P-16)' : '');

/* ─── Quién mira ─── */
const roleCode = getRoleFromQuery();
const role = ROLES[roleCode] || {};
const ORG_ROLES = ['COMITE', 'FEDERACION', 'LIGA', 'CLUB'];
const orgId = roleCode === 'MINDEPORTE' ? 'MIN' : ORG_ROLES.includes(roleCode) ? scopeFor(roleCode) : null;
const isMin = orgId === 'MIN';
const org = isMin ? { nombre: 'Ministerio del Deporte' } : getOrganismo(orgId);
const meName = role.userName || '';
const catalogo = orgId ? rolesDelOrganismo(orgId) : [];
const ROL = Object.fromEntries([...CATALOGO_ROLES, ...ROLES_MINISTERIO].map((r) => [r.id, r]));
const viewerRol = isMin ? 'ADMIN_MIN' : 'ADMIN';
/* Los roles aprobados primero; las propuestas al final (el primero queda preseleccionado al invitar). */
const creables = catalogo.filter((r) => r.creaRol === viewerRol).sort((x, y) => (x.propuesta ? 1 : 0) - (y.propuesta ? 1 : 0));
const orgCorto = () => {
  if (!org) return 'tu organismo';
  return { comite: 'el comité', federacion: 'la federación', liga: 'la liga', club: 'el club' }[org.tipo] || 'tu organismo';
};

/* Reactivar devuelve al usuario al estado que tenía (Invitado o Activo). Solo demo. */
const PREV_KEY = 'naowee-organismos-usuarios-prev';
const prevGet = () => { try { return JSON.parse(localStorage.getItem(PREV_KEY) || '{}') || {}; } catch (_) { return {}; } };
const prevSet = (id, v) => { try { const m = prevGet(); if (v) m[id] = v; else delete m[id]; localStorage.setItem(PREV_KEY, JSON.stringify(m)); } catch (_) {} };

let S = { tab: 'users', q: '', estado: 'Todos', newId: null };
const root = document.getElementById('usRoot');
const headAct = document.getElementById('usHeadAct');

function all() { return usuariosDe(orgId); }
function internos() { return all().filter((u) => (isMin ? u.rol === 'TERRITORIAL' : u.rol !== 'ADMIN')); }
function rolDeCreador(nombre) {
  const u = all().find((x) => x.nombre === nombre);
  if (u) return ROL[u.rol] ? ROL[u.rol].nombre : '';
  return isMin ? '' : 'Nivel superior';
}

/* ═══════════════ Render ═══════════════ */
function render() {
  const sub = document.getElementById('pageSub');
  if (!orgId) {
    sub.textContent = 'Aquí cada organismo gestiona su cuenta principal y sus usuarios internos.';
    root.innerHTML = `<div class="naowee-card"><div class="naowee-empty-state">
      <span class="naowee-empty-state__icon">${I.usersLg}</span>
      <p class="naowee-empty-state__title">Tu rol no gestiona usuarios</p>
      <p class="naowee-empty-state__description">Los usuarios los gestiona la cuenta principal de cada organismo y, para los territoriales, el Ministerio del Deporte.</p>
    </div></div>`;
    return;
  }
  const noActivo = !isMin && organismoNoActivo(roleCode);
  sub.textContent = isMin
    ? 'Los administradores del Ministerio y los usuarios territoriales que consultan un departamento o un municipio.'
    : `La cuenta principal de ${org ? org.nombre : 'tu organismo'} y los usuarios internos que trabajan con ella. Cada uno ve solo lo que su rol le permite.`;
  headAct.innerHTML = noActivo || !creables.length ? '' : `<button type="button" class="naowee-btn naowee-btn--loud" data-act="invite">${I.userPlus}${isMin ? 'Crear usuario territorial' : 'Invitar usuario'}</button>`;
  if (noActivo) {
    root.innerHTML = mainHtml() + `<div class="naowee-card"><div class="naowee-empty-state">
      <span class="naowee-empty-state__icon">${I.lock}</span>
      <p class="naowee-empty-state__title">Podrás invitar usuarios cuando tu organismo esté activo</p>
      <p class="naowee-empty-state__description">${esc(org.nombre)} está en estado ${esc(org.estado)}. Mientras tanto solo puedes ver «Mi organismo».</p>
    </div></div>`;
    return;
  }
  root.innerHTML = mainHtml() + `<div id="usPanel">${panelHtml()}</div>`;
}

function mainHtml() {
  if (isMin) {
    const admins = all().filter((u) => u.rol === 'ADMIN_MIN');
    const tu = (a) => a.nombre === meName;
    return `<section class="naowee-card us-admins" aria-labelledby="usAdmTitle">
      <div class="us-admins__head">
        <div>
          <h2 class="us-admins__title" id="usAdmTitle">Administradores del Ministerio</h2>
          <p class="us-admins__sub">${admins.length} ${admins.length === 1 ? 'cuenta' : 'cuentas'} del módulo de Organismos.</p>
        </div>
        ${badge('neutral', 'Solo lectura', 'naowee-badge--large')}
      </div>
      <ul class="us-admins__list">
        ${admins.map((a) => `<li class="us-admins__item">
          <span class="us-ava" aria-hidden="true">${esc(ini(a.nombre))}</span>
          <div style="min-width:0">
            <div class="us-admins__name">${esc(a.nombre)}${tu(a) ? badge('brand', 'Tú') : ''}</div>
            <div class="us-admins__mail">${esc(a.correo)}</div>
          </div>
        </li>`).join('')}
      </ul>
      ${msg('informative', 'info', '<strong>Los crea Naowee.</strong> Para sumar o retirar un administrador del Ministerio, pídelo a soporte de Naowee.')}
      ${msg('caution', 'info', '<strong>Administradores por módulo.</strong> En la Suite cada administrador del Ministerio es de un módulo (por ejemplo, Fomento administra Eventos; Infraestructura, Escenarios), bajo un administrador general. La matriz de roles está pendiente con Producto.')}
      <p class="us-admins__compact"><span class="us-stack" aria-hidden="true">${admins.map((a) => `<span class="us-ava">${esc(ini(a.nombre))}</span>`).join('')}</span><span><strong>${admins.length} administradores del Ministerio</strong> · los crea Naowee</span></p>
    </section>`;
  }
  const a = all().find((u) => u.rol === 'ADMIN');
  if (!a) return '';
  const tu = a.nombre === meName;
  return `<section class="naowee-card us-main" aria-label="Cuenta principal">
    <span class="us-ava" aria-hidden="true">${esc(ini(a.nombre))}</span>
    <div style="min-width:0">
      <div class="us-main__top"><h2 class="us-main__name">${esc(a.nombre)}</h2>${badge('brand', tu ? 'Cuenta principal · Tú' : 'Cuenta principal')}${badge(ESTADO[a.estado] || 'neutral', a.estado)}</div>
      <p class="us-main__role">Administrador del organismo</p>
      <p class="us-main__meta">${esc(a.doc)} · ${esc(a.correo)}</p>
    </div>
    <p class="us-main__side">La habilitó <strong>${esc(a.creadoPor)}</strong>${a.fecha ? ` el ${fmt(a.fecha)}` : ''}, al activar ${esc(orgCorto())}. Es la única cuenta principal; si cambia la persona, la reasigna el nivel superior.</p>
  </section>`;
}

function panelHtml() {
  const n = internos().length;
  const tabs = [
    ['users', `Usuarios<span class="us-tab-q">${isMin ? 'territoriales' : 'internos'}</span>`, n],
    ['roles', 'Roles del organismo', null]
  ];
  return `<section class="naowee-card bj-panel us-panel" aria-label="Usuarios y roles">
    <div class="naowee-tabs bj-tabs" role="tablist" aria-label="Vistas de usuarios">
      ${tabs.map(([id, l, c]) => `<button type="button" role="tab" id="tab-${id}" aria-controls="panel-${id}" class="naowee-tab ${S.tab === id ? 'naowee-tab--selected' : ''}" aria-selected="${S.tab === id}" tabindex="${S.tab === id ? 0 : -1}" data-tab="${id}">${l}${c != null ? `<span class="us-tabcount">${c}</span>` : ''}</button>`).join('')}
    </div>
    <div class="us-tabpanel" role="tabpanel" id="panel-${S.tab}" aria-labelledby="tab-${S.tab}" tabindex="0">
      ${S.tab === 'users' ? usersHtml() : rolesHtml()}
    </div>
    ${isMin ? '' : `<p class="us-panel-note">${I.lock}<span>Un usuario interno nunca ve más que el administrador que lo creó. Nadie se borra: un usuario desactivado conserva su historial y puedes reactivarlo.</span></p>`}
  </section>`;
}

function filtered(list) {
  const q = S.q.trim().toLowerCase();
  return list.filter((u) => (S.estado === 'Todos' || u.estado === S.estado) &&
    (!q || [u.nombre, u.doc, u.correo, (ROL[u.rol] || {}).nombre, u.ancla ? nombreTerritorio(u.ancla) : ''].join(' ').toLowerCase().includes(q)));
}

function usersHtml() {
  const base = internos();
  if (!base.length) {
    return `<div class="naowee-empty-state">
      <span class="naowee-empty-state__icon">${I.usersLg}</span>
      <p class="naowee-empty-state__title">${isMin ? 'Aún no hay usuarios territoriales' : 'Por ahora solo estás tú'}</p>
      <p class="naowee-empty-state__description">${isMin ? 'Crea encargados departamentales o municipales. Llegan con un correo para activar su cuenta.' : `Invita a las personas que te ayudan a gestionar ${esc(orgCorto())}. Llegan con un correo para activar su cuenta.`}</p>
      ${creables.length ? `<div class="naowee-empty-state__action"><button type="button" class="naowee-btn naowee-btn--quiet" data-act="invite">${I.userPlus}${isMin ? 'Crear usuario territorial' : 'Invitar usuario'}</button></div>` : ''}
    </div>`;
  }
  const list = filtered(base);
  const bar = `<div class="bj-panel__bar">
    <div class="naowee-searchbox bj-search${S.q ? ' naowee-searchbox--has-value' : ''}">
      <div class="naowee-searchbox__input-wrap">
        <span class="naowee-searchbox__icon">${I.search}</span>
        <input class="naowee-searchbox__input" id="usSearch" type="search" value="${esc(S.q)}" placeholder="${isMin ? 'Buscar por nombre, documento o territorio' : 'Buscar por nombre, documento o rol'}" aria-label="Buscar usuarios">
        <button type="button" class="naowee-searchbox__clear" id="usClear" aria-label="Limpiar búsqueda">${I.x}</button>
      </div>
    </div>
    <label class="bj-filter"><span class="bj-filter__lbl">Estado</span>
      <select class="bj-filter__select" id="usEstado">
        ${['Todos', 'Activo', 'Invitado', 'Desactivado'].map((e) => `<option value="${e}"${S.estado === e ? ' selected' : ''}>${e === 'Todos' ? 'Todos los estados' : e}</option>`).join('')}
      </select>
    </label>
    <span class="us-count" aria-live="polite">${list.length === base.length ? `${list.length} ${list.length === 1 ? 'usuario' : 'usuarios'}` : `${list.length} de ${base.length}`}</span>
  </div>`;
  const ajenos = base.some((u) => u.creadoPor !== meName && u.estado !== 'Desactivado');
  const help = ajenos ? `<p class="us-tablehelp">${I.info}<span>${isMin ? 'Como administrador del Ministerio puedes desactivar a cualquier usuario territorial, también a los que creó otro administrador.' : 'Como cuenta principal puedes desactivar a cualquier usuario interno, también a los que invitó otra persona.'}</span></p>` : '';
  if (!list.length) {
    return bar + `<div class="naowee-empty-state">
      <span class="naowee-empty-state__icon">${I.search}</span>
      <p class="naowee-empty-state__title">Sin resultados</p>
      <p class="naowee-empty-state__description">Ningún usuario coincide con la búsqueda o el estado elegido.</p>
    </div>`;
  }
  const col2 = isMin ? 'Territorio' : 'Rol';
  return bar + help + `<div class="cg-table-wrap"><table class="cg-table bj-table">
    <thead><tr><th scope="col">Usuario</th><th scope="col">${col2}</th><th scope="col">Estado</th><th scope="col">Creado por</th><th scope="col"><span class="us-sr">Acciones</span></th></tr></thead>
    <tbody>${list.map((u) => rowHtml(u, col2)).join('')}</tbody>
  </table></div>`;
}

function rowHtml(u, col2) {
  const r = ROL[u.rol] || { nombre: u.rol };
  const off = u.estado === 'Desactivado';
  const second = isMin
    ? `<span class="us-cell-strong">${esc(u.ancla ? (u.ancla.municipio || u.ancla.depto) : '—')}</span><span class="us-sub">${u.ancla && u.ancla.municipio ? `Municipal · ${esc(u.ancla.depto)}` : 'Departamental'}</span>`
    : `<span class="us-cell-strong">${esc(r.nombre)}</span>${r.propuesta ? `<span class="us-sub">${propuestaTxt(r)}</span>` : ''}`;
  const when = u.estado === 'Invitado' ? `Invitado el ${fmt(u.fecha)}` : off ? `Creado el ${fmt(u.fecha)}` : `Desde el ${fmt(u.fecha)}`;
  const byRol = rolDeCreador(u.creadoPor);
  const acts = [];
  if (u.estado === 'Invitado') acts.push(`<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-act="resend" data-id="${esc(u.id)}" aria-label="Reenviar invitación a ${esc(u.nombre)}">${I.mail}Reenviar</button>`);
  if (off) acts.push(`<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-act="reactivate" data-id="${esc(u.id)}" aria-label="Reactivar a ${esc(u.nombre)}">${I.refresh}Reactivar</button>`);
  else acts.push(`<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small us-btn-neg" data-act="deactivate" data-id="${esc(u.id)}" aria-label="Desactivar a ${esc(u.nombre)}">${I.ban}Desactivar</button>`);
  return `<tr class="${off ? 'us-row--off' : ''}${S.newId === u.id ? ' us-row--new' : ''}" data-row="${esc(u.id)}">
    <td class="us-td-user" data-label="Usuario"><div class="us-user"><span class="us-ava us-ava--sm" aria-hidden="true">${esc(ini(u.nombre))}</span><div style="min-width:0"><div class="bj-org__name">${esc(u.nombre)}</div><div class="bj-org__sub">${esc(u.doc)}</div><div class="bj-org__sub">${esc(u.correo)}</div></div></div></td>
    <td data-label="${col2}"><div>${second}</div></td>
    <td data-label="Estado"><div>${badge(ESTADO[u.estado] || 'neutral', u.estado)}<span class="us-sub us-nowrap">${when}</span></div></td>
    <td data-label="Creado por"><div><span class="us-cell-strong" style="font-weight:500">${esc(u.creadoPor)}${u.creadoPor === meName ? ' (tú)' : ''}</span>${byRol ? `<span class="us-sub">${esc(byRol)}</span>` : ''}</div></td>
    <td class="bj-row-action" data-label=""><div class="us-acts">${acts.join('')}</div></td>
  </tr>`;
}

function creadorTxt(r) {
  if (r.creaRol === 'NAOWEE') return 'Naowee';
  if (!r.creaRol) return 'El nivel superior, al activar el organismo';
  return (ROL[r.creaRol] || {}).nombre || r.creaRol;
}

function rolesHtml() {
  const marcas = isMin ? [] : (MARCAS[orgId] || []);
  let intro;
  if (isMin) intro = msg('informative', 'info', 'Los administradores del Ministerio los crea Naowee. Tú creas a los usuarios territoriales, anclados a un departamento o a un municipio.');
  else if (marcas.length) intro = msg('informative', 'info', `${esc(org.nombre)} tiene la marca <strong>${esc(marcas.map((m) => MARCA_NOMBRE[m] || m).join(', '))}</strong>; por eso puede usar sus roles. Los roles transversales sirven para cualquier organismo: hoy no hay ninguno aprobado y el Revisor de registros es una propuesta.`);
  else intro = msg('informative', 'info', `${esc(org.nombre)} no tiene marcas: además de la cuenta principal, solo aplican los roles transversales. Hoy no hay ninguno aprobado; el Revisor de registros es una propuesta.`);
  const users = internos();
  const card = (r) => {
    const yours = r.creaRol === viewerRol;
    const isMe = r.id === viewerRol;
    const badges = (r.transversal ? badge('neutral', 'Transversal') : '') + (r.marca ? badge('brand', MARCA_NOMBRE[r.marca] || r.marca) : '') +
      (r.propuesta ? badge('informative', propuestaTxt(r)) : '') + (isMe ? badge('brand', 'Tu rol') : '');
    let foot;
    if (yours) foot = `<p class="us-role__foot us-role__foot--yes">${I.check}Lo creas tú</p>`;
    else if (isMe) foot = `<p class="us-role__foot us-role__foot--no">${I.lock}Es tu cuenta; no se asigna desde aquí</p>`;
    else foot = `<p class="us-role__foot us-role__foot--no">${I.lock}No lo creas tú: lo crea ${r.creaRol === 'NAOWEE' ? 'Naowee' : `el ${esc(creadorTxt(r))}`}</p>`;
    const cuenta = r.principal || r.id === 'ADMIN_MIN' ? '' : `<dt>En ${isMin ? 'el Ministerio' : 'tu organismo'}</dt><dd>${users.filter((u) => u.rol === r.id && u.estado !== 'Desactivado').length} activos o invitados</dd>`;
    return `<article class="us-role${yours ? ' us-role--mine' : ''}">
      <div class="us-role__top"><h3 class="us-role__name">${esc(r.nombre)}</h3><div class="us-role__badges">${badges}</div></div>
      <p class="us-role__does">${esc(r.desc)}</p>
      ${canHtml(r.id)}
      <dl class="us-role__kv"><dt>Lo crea</dt><dd>${esc(creadorTxt(r))}</dd>${cuenta}</dl>
      ${foot}
    </article>`;
  };
  const groups = isMin
    ? [['Ministerio del Deporte', catalogo.filter((r) => r.id === 'ADMIN_MIN')], ['Usuarios territoriales', catalogo.filter((r) => r.id === 'TERRITORIAL')]]
    : [['Cuenta principal', catalogo.filter((r) => r.principal)],
       ...marcas.map((m) => [`Marca ${MARCA_NOMBRE[m] || m}`, catalogo.filter((r) => r.marca === m)]),
       ['Transversales', catalogo.filter((r) => r.transversal)]];
  return `<div class="us-cat">${intro}${groups.filter(([, rs]) => rs.length).map(([t, rs]) => `<h3 class="us-cat__group">${esc(t)}</h3><div class="us-roles">${rs.map(card).join('')}</div>`).join('')}</div>`;
}

function renderPanel(focusSel) {
  const host = document.getElementById('usPanel');
  if (!host) return;
  host.innerHTML = panelHtml();
  if (focusSel) {
    const el = document.querySelector(focusSel);
    if (el) { el.focus(); if (el.type === 'search') el.setSelectionRange(el.value.length, el.value.length); }
  }
}

/* ═══════════════ Diálogos ═══════════════ */
function modal({ title, body, ok, okClass, size }, onOk, opener) {
  const ov = document.createElement('div');
  ov.className = 'reg-modal-overlay bj-modal-ov';
  ov.innerHTML = `
    <div class="reg-modal bj-modal us-dlg${size === 'sm' ? ' bj-modal--sm' : ''}" role="dialog" aria-modal="true" aria-labelledby="dlgTitle">
      <div class="reg-modal__head"><h3 class="reg-modal__title" id="dlgTitle">${esc(title)}</h3><button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.x}</button></div>
      <div class="reg-modal__body">${body}</div>
      <div class="reg-modal__foot bj-modal__foot">
        <button type="button" class="naowee-btn naowee-btn--mute" data-close>Cancelar</button>
        <button type="button" class="naowee-btn ${okClass || 'naowee-btn--loud'}" id="dlgOk">${esc(ok)}</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('is-open'));
  const close = (after) => {
    if (ov.__closing) return; ov.__closing = true;
    ov.classList.remove('is-open');
    document.removeEventListener('keydown', onKey, true);
    setTimeout(() => { ov.remove(); if (after) after(); else if (opener && document.body.contains(opener)) opener.focus(); }, 300);
  };
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = [...ov.querySelectorAll('button, select, textarea, input')].filter((x) => !x.disabled && x.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener('keydown', onKey, true);
  ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) close(); });
  ov.querySelector('#dlgOk').addEventListener('click', () => onOk(ov, close));
  setTimeout(() => { const f = ov.querySelector('input:not([type=radio]), select') || ov.querySelector('#dlgOk'); f.focus(); }, 60);
  return ov;
}

const field = (id, label, input, help, full) => `
  <div class="naowee-textfield${full ? ' reg-grid-2--full' : ''}" data-field="${id}">
    <label class="naowee-textfield__label naowee-textfield__label--required" for="${id}">${label}</label>
    ${input}
    ${help ? `<p class="us-field-help" id="${id}Help">${help}</p>` : ''}
    <div class="naowee-helper naowee-helper--negative" id="${id}Err" hidden><span class="naowee-helper__text"><span class="naowee-helper__badge">${I.x}</span><span data-errtxt></span></span></div>
  </div>`;
const text = (id, type, ph, extra) => `<div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" id="${id}" type="${type}" placeholder="${ph}" aria-describedby="${id}Err" ${extra || ''}></div>`;
const select = (id, opts, ph) => `<select class="bj-select" id="${id}" aria-describedby="${id}Err">${ph ? `<option value="">${ph}</option>` : ''}${opts}</select>`;
const TIPOS = [['CC', 'Cédula de ciudadanía'], ['CE', 'Cédula de extranjería'], ['PPT', 'Permiso por protección temporal'], ['PA', 'Pasaporte']];

function personFields() {
  return field('fName', 'Nombre completo', text('fName', 'text', 'Como aparece en el documento', 'autocomplete="name"'), '', true) +
    field('fTipo', 'Tipo de documento', select('fTipo', TIPOS.map(([v, l]) => `<option value="${v}">${l}</option>`).join(''))) +
    field('fDoc', 'Número de documento', text('fDoc', 'text', 'Sin puntos ni espacios', 'inputmode="numeric"')) +
    field('fMail', 'Correo electrónico', text('fMail', 'email', 'nombre@dominio.co', 'autocomplete="email"'), 'Le llega aquí el enlace para activar su cuenta.', true);
}
function setErr(ov, id, txt) {
  const w = ov.querySelector(`[data-field="${id}"]`);
  const e = ov.querySelector(`#${id}Err`);
  const input = ov.querySelector(`#${id}`);
  if (!w || !e) return;
  if (txt) {
    w.classList.add('naowee-textfield--error'); e.hidden = false; e.querySelector('[data-errtxt]').textContent = txt;
    if (input) input.setAttribute('aria-invalid', 'true');
  } else {
    w.classList.remove('naowee-textfield--error'); e.hidden = true;
    if (input) input.removeAttribute('aria-invalid');
  }
}
const fmtDoc = (n) => (/^\d+$/.test(n) ? Number(n).toLocaleString('es-CO').replace(/,/g, '.') : n.toUpperCase());

function validatePerson(ov) {
  const v = (id) => ov.querySelector(`#${id}`).value.trim();
  const errs = [];
  const name = v('fName'), doc = v('fDoc').replace(/[.\s]/g, ''), mail = v('fMail');
  const todos = usuariosDe(orgId);
  const nameBad = name.split(/\s+/).filter(Boolean).length < 2;
  setErr(ov, 'fName', nameBad ? 'Escribe nombre y apellido.' : null); if (nameBad) errs.push('fName');
  let dErr = null;
  if (!doc) dErr = 'Escribe el número de documento.';
  else if (todos.some((u) => docKey(u.doc) && docKey(u.doc) === docKey(doc))) dErr = 'Ya hay un usuario con ese documento.';
  setErr(ov, 'fDoc', dErr); if (dErr) errs.push('fDoc');
  let mErr = null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) mErr = 'Escribe un correo válido.';
  else if (todos.some((u) => String(u.correo || '').toLowerCase() === mail.toLowerCase())) mErr = 'Ya hay un usuario con ese correo.';
  setErr(ov, 'fMail', mErr); if (mErr) errs.push('fMail');
  return { errs, data: { nombre: name, doc: `${v('fTipo')} ${fmtDoc(doc)}`, correo: mail } };
}
const clearOnInput = (ov) => ov.querySelectorAll('input, select').forEach((el) => {
  el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => { const w = el.closest('[data-field]'); if (w && w.classList.contains('naowee-textfield--error')) setErr(ov, w.dataset.field, null); });
});

/* Invitar usuario interno */
function openInvite(opener) {
  const otros = catalogo.filter((r) => !r.principal && r.creaRol !== viewerRol);
  const roleInfo = (id) => {
    const r = ROL[id];
    return `<p class="us-roleinfo__head">${esc(r.nombre)}${r.propuesta ? badge('informative', propuestaTxt(r)) : ''}</p>
      ${canHtml(id)}
      <p class="us-roleinfo__who">Lo crea: <strong>${esc(creadorTxt(r))}</strong></p>`;
  };
  const help = ['Solo ves los roles que tú puedes crear.', ...otros.map((r) => `El ${r.nombre} lo invita el ${creadorTxt(r)}.`)].join(' ');
  const body = `
    <p class="us-lead">Le enviamos un correo para que active su cuenta. Mientras no lo haga, aparece como <strong>Invitado</strong>.</p>
    <div class="reg-grid-2">
      ${personFields()}
      ${field('fRol', 'Rol interno', select('fRol', creables.map((r) => `<option value="${r.id}">${esc(r.nombre)}${r.propuesta ? ` · ${propuestaTxt(r)}` : ''}</option>`).join('')), esc(help), true)}
    </div>
    <div class="us-roleinfo" id="fRolInfo" aria-live="polite">${roleInfo(creables[0].id)}</div>`;
  const ov = modal({ title: 'Invitar usuario', body, ok: 'Enviar invitación' }, (ov2, close) => {
    const { errs, data } = validatePerson(ov2);
    const rol = ov2.querySelector('#fRol').value;
    if (errs.length) { ov2.querySelector(`#${errs[0]}`).focus(); return; }
    const u = invitarUsuario(orgId, { ...data, rol }, { creadoPor: meName, rol: role.label || '' });
    close(() => afterCreate(u, `Le enviamos la invitación a ${u.correo}.`));
  }, opener);
  clearOnInput(ov);
  ov.querySelector('#fRol').addEventListener('change', (e) => { ov.querySelector('#fRolInfo').innerHTML = roleInfo(e.target.value); });
}

/* Departamentos y municipios: los de los organismos de la demo + una lista corta. */
function geo() {
  const g = {
    'Amazonas': ['Leticia', 'Puerto Nariño'], 'Antioquia': ['Medellín', 'Envigado', 'Rionegro'],
    'Chocó': ['Quibdó', 'Istmina'], 'Huila': ['Neiva', 'Acevedo', 'Pitalito'], 'Valle del Cauca': ['Cali', 'Palmira', 'Buga']
  };
  allOrganismos().forEach((o) => {
    const u = o.ubicacion; if (!u || !u.depto) return;
    g[u.depto] = g[u.depto] || [];
    if (u.ciudad && !g[u.depto].includes(u.ciudad)) g[u.depto].push(u.ciudad);
  });
  Object.keys(g).forEach((d) => g[d].sort((a, b) => a.localeCompare(b, 'es')));
  return g;
}

/* Crear usuario territorial (Ministerio) */
function openTerritorial(opener) {
  const G = geo();
  const deptos = Object.keys(G).sort((a, b) => a.localeCompare(b, 'es'));
  const body = `
    <p class="us-lead">Podrá consultar la información de su territorio y registrar deportistas autodeclarados. Le enviamos un correo para activar su cuenta.</p>
    <div class="reg-grid-2">
      ${personFields()}
      <fieldset class="us-fieldset reg-grid-2--full naowee-textfield" data-field="fAmb">
        <legend class="naowee-textfield__label naowee-textfield__label--required">Ámbito</legend>
        <div class="reg-choice-group">
          <label class="reg-choice"><input type="radio" name="fAmb" value="dep" id="fAmb"><span class="reg-choice__dot" aria-hidden="true"></span><span class="reg-choice__body"><span class="reg-choice__title">Departamental</span><span class="reg-choice__desc">Consulta todo un departamento</span></span></label>
          <label class="reg-choice"><input type="radio" name="fAmb" value="mun"><span class="reg-choice__dot" aria-hidden="true"></span><span class="reg-choice__body"><span class="reg-choice__title">Municipal</span><span class="reg-choice__desc">Consulta solo un municipio</span></span></label>
        </div>
        <div class="naowee-helper naowee-helper--negative" id="fAmbErr" hidden><span class="naowee-helper__text"><span class="naowee-helper__badge">${I.x}</span><span data-errtxt></span></span></div>
      </fieldset>
      ${field('fDep', 'Departamento', select('fDep', deptos.map((d) => `<option>${esc(d)}</option>`).join(''), 'Selecciona un departamento'))}
      <div id="fMunWrap" hidden>${field('fMun', 'Municipio', select('fMun', '', 'Primero elige el departamento'))}</div>
    </div>
    <div class="us-dup" id="fDup" hidden aria-live="polite"></div>`;
  const ov = modal({ title: 'Crear usuario territorial', body, ok: 'Crear y enviar invitación' }, (ov2, close) => {
    const { errs, data } = validatePerson(ov2);
    const amb = (ov2.querySelector('input[name=fAmb]:checked') || {}).value;
    const dep = ov2.querySelector('#fDep').value, mun = ov2.querySelector('#fMun').value;
    setErr(ov2, 'fAmb', amb ? null : 'Elige si es departamental o municipal.'); if (!amb) errs.push('fAmb');
    setErr(ov2, 'fDep', dep ? null : 'Selecciona el departamento.'); if (!dep) errs.push('fDep');
    if (amb === 'mun') { setErr(ov2, 'fMun', mun ? null : 'Selecciona el municipio.'); if (!mun) errs.push('fMun'); }
    if (errs.length) { ov2.querySelector(`#${errs[0]}`).focus(); return; }
    const ancla = amb === 'mun' ? { depto: dep, municipio: mun } : { depto: dep };
    const u = invitarUsuario('MIN', { ...data, rol: 'TERRITORIAL', ancla }, { creadoPor: meName, rol: 'Ministerio' });
    close(() => afterCreate(u, `Creamos el usuario de ${nombreTerritorio(ancla)} y le enviamos la invitación a ${u.correo}.`));
  }, opener);
  clearOnInput(ov);
  const amb = () => (ov.querySelector('input[name=fAmb]:checked') || {}).value;
  const checkDup = () => {
    const box = ov.querySelector('#fDup');
    const dep = ov.querySelector('#fDep').value, mun = ov.querySelector('#fMun').value;
    const a = amb();
    if (!a || !dep || (a === 'mun' && !mun)) { box.hidden = true; return; }
    const ya = internos().filter((u) => u.estado === 'Activo' && u.ancla && u.ancla.depto === dep && (a === 'mun' ? u.ancla.municipio === mun : !u.ancla.municipio));
    box.hidden = !ya.length;
    box.innerHTML = ya.length ? msg('caution', 'alert', `<strong>Este territorio ya tiene a ${esc(ya.map((u) => u.nombre).join(' y '))}</strong> como encargado activo de ${esc(nombreTerritorio(a === 'mun' ? { depto: dep, municipio: mun } : { depto: dep }))}. Revisa que no sea la misma persona antes de crear otro.`) : '';
  };
  const fillMun = () => {
    const dep = ov.querySelector('#fDep').value;
    const m = ov.querySelector('#fMun');
    m.innerHTML = `<option value="">${dep ? 'Selecciona un municipio' : 'Primero elige el departamento'}</option>` + (G[dep] || []).map((x) => `<option>${esc(x)}</option>`).join('');
    m.disabled = !dep;
  };
  fillMun();
  ov.querySelectorAll('input[name=fAmb]').forEach((r) => r.addEventListener('change', () => {
    ov.querySelectorAll('.reg-choice').forEach((c) => c.classList.toggle('is-selected', c.querySelector('input').checked));
    setErr(ov, 'fAmb', null);
    const mun = r.value === 'mun';
    ov.querySelector('#fMunWrap').hidden = !mun;
    if (!mun) setErr(ov, 'fMun', null);
    checkDup();
  }));
  ov.querySelector('#fDep').addEventListener('change', () => { fillMun(); checkDup(); });
  ov.querySelector('#fMun').addEventListener('change', checkDup);
}

function afterCreate(u, text) {
  S.tab = 'users'; S.q = ''; S.estado = 'Todos'; S.newId = u.id;
  renderPanel();
  const row = document.querySelector(`[data-row="${u.id}"]`);
  if (row) { row.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); const b = row.querySelector('button'); if (b) b.focus({ preventScroll: true }); }
  toast(text, 'success');
}

/* Desactivar */
function openDeactivate(u, opener) {
  const r = ROL[u.rol] || { nombre: u.rol };
  const invito = internos().filter((x) => x.creadoPor === u.nombre && x.estado !== 'Desactivado');
  const pasa = [
    u.estado === 'Invitado' ? 'El enlace de la invitación deja de funcionar.' : 'Deja de entrar al SUID desde ahora.',
    'No se borra: lo que registró se conserva con su nombre.',
    'Puedes reactivarlo cuando quieras.',
    invito.length === 1 ? `${invito[0].nombre}, a quien invitó, conserva su cuenta.`
      : invito.length ? `Los ${invito.length} usuarios que invitó conservan su cuenta.` : 'Si invitó a otros usuarios, conservan su cuenta.'
  ];
  const que = isMin ? (u.ancla ? `${u.ancla.municipio ? 'Encargado municipal' : 'Encargado departamental'} · ${nombreTerritorio(u.ancla)}` : r.nombre) : r.nombre;
  const body = `<dl class="us-who">
      <dt>${isMin ? 'Territorio' : 'Rol'}</dt><dd>${esc(que)}</dd>
      <dt>Documento</dt><dd>${esc(u.doc)}</dd>
      <dt>Correo</dt><dd>${esc(u.correo)}</dd>
    </dl>
    <p class="us-subtitle">Qué pasa al desactivarlo</p>
    <ul class="us-list">${pasa.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
  modal({ title: `Desactivar a ${u.nombre}`, body, ok: 'Desactivar usuario', okClass: 'bj-btn-danger', size: 'sm' }, (ov, close) => {
    prevSet(u.id, u.estado);
    cambiarEstadoUsuario(u.id, 'Desactivado', { responsable: meName });
    close(() => { S.newId = null; renderPanel(`[data-act="reactivate"][data-id="${u.id}"]`); toast(`${u.nombre} quedó desactivado.`, 'caution'); });
  }, opener);
}

function reactivate(u) {
  const prev = prevGet()[u.id] === 'Invitado' ? 'Invitado' : 'Activo';
  cambiarEstadoUsuario(u.id, prev, { responsable: meName });
  prevSet(u.id, null);
  S.newId = null;
  renderPanel(`[data-act="deactivate"][data-id="${u.id}"]`);
  toast(prev === 'Invitado' ? `${u.nombre} vuelve a Invitado. Le reenviamos la invitación.` : `${u.nombre} está activo de nuevo.`, 'success');
}

/* ═══════════════ Eventos ═══════════════ */
function onClick(e) {
  const t = e.target.closest('.naowee-tab');
  if (t && root.contains(t)) { selectTab(t.dataset.tab, false); return; }
  if (e.target.closest('#usClear')) { S.q = ''; renderPanel('#usSearch'); return; }
  const a = e.target.closest('[data-act]');
  if (!a) return;
  const u = internos().find((x) => x.id === a.dataset.id);
  if (a.dataset.act === 'invite') { if (isMin) openTerritorial(a); else openInvite(a); return; }
  if (!u) return;
  if (a.dataset.act === 'deactivate') openDeactivate(u, a);
  else if (a.dataset.act === 'reactivate') reactivate(u);
  else if (a.dataset.act === 'resend') toast(`Reenviamos la invitación a ${u.correo}.`, 'info');
}
root.addEventListener('click', onClick);
headAct.addEventListener('click', onClick);
root.addEventListener('input', (e) => {
  if (e.target.id === 'usSearch') { S.q = e.target.value; S.newId = null; renderPanel('#usSearch'); }
});
root.addEventListener('change', (e) => {
  if (e.target.id === 'usEstado') { S.estado = e.target.value; S.newId = null; renderPanel('#usEstado'); }
});
function selectTab(tab, focus) { S.tab = tab; S.newId = null; renderPanel(focus ? `#tab-${tab}` : null); }
root.addEventListener('keydown', (e) => {
  const t = e.target.closest('.naowee-tab');
  if (!t || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
  e.preventDefault();
  const ids = ['users', 'roles']; let i = ids.indexOf(t.dataset.tab);
  i = e.key === 'Home' ? 0 : e.key === 'End' ? ids.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length;
  selectTab(ids[i], true);
});

render();
