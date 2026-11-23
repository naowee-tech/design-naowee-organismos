/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — Aprobación de documentos (v1.10.0)
   El club revisa el documento de parentesco que el tutor sube al registrar un menor.
   Una sola decisión: aprobar el documento afilia al menor; rechazar exige una nota y el
   tutor la ve en su perfil. Lista + vista de revisión (maestro-detalle) + historial.
   Por ahora solo el administrador del club.
   ═══════════════════════════════════════════════════════════════ */
import { getRoleFromQuery, ROLES } from './sidebar.js';
import {
  solicitudesDeClub, getDeportista, getOrganismo, resolverAfiliacion
} from './organismos-data.js';
import { can, scopeFor } from './permissions.js';
import { buildDeportistaDetalle } from './deportista-detalle.js';

const roleCode = getRoleFromQuery();
const role = ROLES[roleCode] || {};
const scopeId = scopeFor(roleCode);
/* El administrador del club y el revisor de documentos deciden; el revisor ve solo lo que tiene por revisar. */
const esRevisor = roleCode === 'REVISOR_DOC';
const puede = (roleCode === 'CLUB' && can(roleCode, 'A', 'solicitudes')) || esRevisor;
const ROL_DECISION = esRevisor ? 'REVISOR' : 'CLUB';
const root = document.getElementById('docRoot');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const toast = (t, v) => { if (window.naoweeToast) window.naoweeToast(t, v || 'success'); };

/* ── Fechas ── */
const MES_L = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
const MES_H = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const hora = (d) => { const h = d.getHours(); return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const dt = (iso) => (iso ? new Date(String(iso).length === 10 ? iso + 'T12:00:00' : iso) : null);
/* Lista: «Nov. 18, 2026 9:12 AM» */
const fmtL = (iso) => { const d = dt(iso); return d ? `${MES_L[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hora(d)}` : '—'; };
/* Historial: «Mar, 02 2026. 10:01 AM» */
const fmtH = (iso) => { const d = dt(iso); return d ? `${MES_H[d.getMonth()]}, ${String(d.getDate()).padStart(2, '0')} ${d.getFullYear()}. ${hora(d)}` : '—'; };
const fmtCargue = (iso) => { const d = dt(iso); return d ? `${MES_L[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : '—'; };
const nacFmt = (iso) => { const d = dt(iso); return d ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}` : '—'; };
const edadDe = (iso) => { const d = dt(iso); if (!d) return null; const n = new Date(); let e = n.getFullYear() - d.getFullYear(); if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) e--; return e; };
const iniciales = (n) => String(n || '').split(' ').filter(Boolean).slice(0, 2).map((x) => x[0]).join('').toUpperCase();

/* ── Datos: cada solicitud de menor lleva su documento de parentesco ── */
const ROL_TXT = { CLUB: 'Club', REVISOR: 'Revisor' };
function filas() {
  const sols = solicitudesDeClub(scopeId).filter((s) => s.esMenor && s.documento && ['Enviada', 'Aprobada', 'Rechazada'].includes(s.estado));
  /* Un menor, un renglón: la solicitud más reciente; las anteriores (rechazos corregidos) alimentan su historial. */
  const grupos = new Map();
  sols.forEach((s) => { const k = s.deportistaId; (grupos.get(k) || grupos.set(k, []).get(k)).push(s); });
  return [...grupos.values()].map((g) => {
    g.sort((a, b) => String(a.documento.cargadoAt || a.documento.cargado).localeCompare(String(b.documento.cargadoAt || b.documento.cargado)));
    const s = g[g.length - 1];
    const dep = getDeportista(s.deportistaId) || {};
    const tutor = s.tutorId ? getDeportista(s.tutorId) : null;
    const d = s.documento;
    /* Los menores del plantel traen su edad y fecha de nacimiento del perfil derivado. */
    let der = null; try { der = buildDeportistaDetalle(dep); } catch (_) { /* sin perfil derivado */ }
    const est = s.estado === 'Enviada' ? 'p' : s.estado === 'Aprobada' ? 'a' : 'r';   // tres estados: pendiente, aprobado, rechazado
    return {
      id: s.id, sol: s, dep, est, grupo: g,
      menor: dep.nombre || '—', ini: iniciales(dep.nombre), docMenor: `${dep.tipoDoc || ''} ${dep.numDoc || ''}`.trim(), edad: dep.fechaNac ? edadDe(dep.fechaNac) : (der ? der.edad : null), nac: dep.fechaNac ? nacFmt(dep.fechaNac) : (der && der.nac ? der.nac : '—'), deporte: dep.deporte || '',
      tutor: tutor ? tutor.nombre : (s.tutorNombre || '—'), tutorDoc: tutor ? `${tutor.tipoDoc} ${tutor.numDoc}` : (s.tutorDoc || '—'), vinculo: dep.parentesco || 'Padre/Madre',
      tipoDoc: dep.parentesco === 'Tutor legal' ? 'Sentencia de tutela' : 'Registro civil',
      archivo: d.nombre, enviado: d.cargadoAt || d.cargado, corregido: !!d.corregido,
      revision: d.revision || null,
      decidio: d.revisadoPor ? { por: d.revisadoPor, rol: ROL_TXT[d.rolRevisor] || 'Club', at: d.revisadoAt || d.revisadoFecha } : null,
      nota: s.motivo || ''
    };
  }).sort((a, b) => String(b.enviado).localeCompare(String(a.enviado)));
}
const EST = { p: ['Pendiente', 'caution'], a: ['Aprobado', 'positive'], r: ['Rechazado', 'negative'] };
const badge = (k) => `<span class="naowee-badge naowee-badge--${EST[k][1]} naowee-badge--quiet">${EST[k][0]}</span>`;
const accionesPendientes = (r) => r.est === 'p';

/* ── Íconos ── */
const P = {
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>', doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  chk: '<path d="M20 6 9 17l-5-5"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>', ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5M12 16.8h.01"/>',
  up: '<path d="m6 15 6-6 6 6"/>', zin: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>', zout: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/>', dwn: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', chev: '<path d="m6 9 6 6 6-6"/>', chl: '<path d="m15 18-6-6 6-6"/>', chr: '<path d="m9 18 6-6-6-6"/>', inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
  clk: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  docx: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M14 3v5h5v3M8 12h6M8 16h3M16 15l4 4M20 15l-4 4"/>', doce: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M14 3v5h5v3"/><path d="M11 17s1.5-3 5-3 5 3 5 3-1.5 3-5 3-5-3-5-3z"/><circle cx="16" cy="17" r="1"/>',
  docc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 3v5h5v4M8 12h6M8 16h3M15 18l2 2 4-4"/>'
};
const ic = (n, c = '') => `<svg class="dx-i ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

/* ── Estado de pantalla ── */
const F = { q: '', dep: 'Todos', est: 'p', por: 'Todos' };
let sel = new URLSearchParams(location.search).get('sol') || null;   // vista de revisión de una solicitud
let rv = { chk: false, dec: null, nota: '', tab: 'req', shut: false, zoom: 1 };
const EST_OPTS = [['Todos', 'Todos'], ['p', 'Pendientes'], ['a', 'Aprobados'], ['r', 'Rechazados']];

function setSel(id) {
  sel = id;
  const u = new URLSearchParams(location.search); if (id) u.set('sol', id); else u.delete('sol');
  history.replaceState(null, '', '?' + u.toString());
  render(); window.scrollTo(0, 0);
}

/* ═════════ Lista ═════════ */
function dropdown(key, label, opts) {
  const cur = opts.find((o) => o[0] === F[key]) || opts[0];
  return `<div class="naowee-dropdown dx-dd" data-k="${key}"><button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"><span class="naowee-dropdown__value">${label}: ${esc(cur[1])}</span><span class="naowee-dropdown__chevron">${ic('chev')}</span></button>
    <div class="naowee-dropdown__menu" role="listbox">${opts.map((o) => `<div class="naowee-dropdown__opt${o[0] === F[key] ? ' naowee-dropdown__opt--selected' : ''}" role="option" data-v="${esc(o[0])}">${esc(o[1])}</div>`).join('')}</div></div>`;
}
function renderLista() {
  let all = filas();
  if (esRevisor) all = all.filter((r) => accionesPendientes(r) || (r.decidio && r.decidio.rol === 'Revisor' && r.decidio.por === role.userName));
  const c = { p: 0, a: 0, r: 0 }; all.forEach((r) => { c[r.est]++; });
  const deps = ['Todos', ...new Set(all.map((r) => r.deporte).filter(Boolean))];
  const q = norm(F.q);
  const view = all.filter((r) => {
    const k = r.est;
    return (F.est === 'Todos' || k === F.est) && (F.dep === 'Todos' || r.deporte === F.dep) && (F.por === 'Todos' || (r.decidio && r.decidio.rol === F.por)) && (!q || norm(r.menor + ' ' + r.tutor + ' ' + r.archivo).includes(q));
  });
  const K = [['pu', 'doc', 'Por revisar', c.p, 'Esperando decisión'], ['gr', 'chk', 'Aprobados', c.a, 'Menores afiliados'], ['pk', 'x', 'Rechazados', c.r, 'Devueltos con nota']];
  root.innerHTML = `
    <div class="dx-kpis">${K.map((k) => `<div class="dx-kpi"><span class="dx-kpi__t"><span class="dx-kpi__l">${k[2]}</span><span class="dx-kic dx-kic--${k[0]}">${ic(k[1])}</span></span><span class="dx-kpi__v">${k[3]}</span><span class="dx-kpi__f">${k[4]}</span></div>`).join('')}</div>
    <div class="naowee-card dx-panel">
      <div class="dx-bar"><div class="dx-bar__l">
        <label class="dx-search">${ic('search')}<input id="dxQ" placeholder="Buscar menor, tutor o documento" aria-label="Buscar" value="${esc(F.q)}"></label>
        ${dropdown('dep', 'Deporte', deps.map((d) => [d, d]))}${dropdown('est', 'Estado', EST_OPTS)}${dropdown('por', 'Decidió', [['Todos', 'Todos'], ['Club', 'Club'], ['Revisor', 'Revisor']])}
      </div></div>
      ${view.length ? `<div class="dx-tw"><table class="dx-table">
        <thead><tr><th>Menor</th><th>Tutor</th><th>Enviado</th><th>Estado</th><th>Historial</th><th class="dx-r">Acciones</th></tr></thead>
        <tbody>${view.map((r, i) => `<tr>
          <td><div class="dx-who"><span class="dx-av dx-av--c${i % 5}">${esc(r.ini)}</span><div><strong>${esc(r.menor)}</strong><span class="dx-sub">${esc(r.docMenor)}${r.edad != null ? ' · ' + r.edad + ' años' : ''}</span></div></div></td>
          <td><strong class="dx-n">${esc(r.tutor)}</strong><span class="dx-sub">${esc(r.vinculo)} · ${esc(r.tipoDoc)}</span></td>
          <td>${fmtL(r.enviado)}${r.corregido ? ' <span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Corregido</span>' : ''}</td>
          <td>${badge(r.est)}</td>
          <td>${r.decidio ? `<div>${fmtL(r.decidio.at)}</div><span class="dx-de">De ${esc(r.decidio.por)} <span class="dx-tag">${r.decidio.rol}</span></span>` : '<span class="dx-sub">—</span>'}</td>
          <td class="dx-r"><button type="button" class="dx-alink" data-rev="${esc(r.id)}">${ic('eye')}${accionesPendientes(r) && puede ? 'Revisar' : 'Ver'}</button></td></tr>`).join('')}</tbody></table></div>`
      : `<div class="dx-empty"><strong>Sin documentos</strong>No hay documentos que coincidan con el filtro.</div>`}
      <div class="dx-pg">Página <input value="1" aria-label="Página actual" readonly> de <b>1</b><span class="dx-pg__b"><button type="button" disabled aria-label="Anterior">${ic('chl')}</button><button type="button" disabled aria-label="Siguiente">${ic('chr')}</button></span></div>
    </div>`;
  const q$ = root.querySelector('#dxQ');
  q$.addEventListener('input', () => { F.q = q$.value; const pos = q$.selectionStart; renderLista(); const n = root.querySelector('#dxQ'); n.focus(); n.setSelectionRange(pos, pos); });
  root.querySelectorAll('.dx-dd').forEach((dd) => {
    dd.querySelector('.naowee-dropdown__trigger').addEventListener('click', (e) => { e.stopPropagation(); const o = dd.classList.contains('naowee-dropdown--open'); cerrarDd(); if (!o) dd.classList.add('naowee-dropdown--open'); });
    dd.querySelectorAll('.naowee-dropdown__opt').forEach((o) => o.addEventListener('click', () => { F[dd.dataset.k] = o.dataset.v; renderLista(); }));
  });
  root.querySelectorAll('[data-rev]').forEach((b) => b.addEventListener('click', () => abrir(b.dataset.rev)));
}
function cerrarDd() { document.querySelectorAll('.dx-dd.naowee-dropdown--open').forEach((d) => d.classList.remove('naowee-dropdown--open')); }
document.addEventListener('click', cerrarDd);

function abrir(id) {
  rv = { chk: false, dec: null, nota: '', tab: 'req', shut: false, zoom: 1 };
  setSel(id);
}

/* ═════════ Revisión ═════════ */
const MOCK = (r) => `<div class="dx-page" style="transform:scale(${rv.zoom})"><div class="dx-page__t">${esc(r.tipoDoc.toUpperCase())}</div><div class="dx-l dx-l--m"></div><div class="dx-l dx-l--s"></div><div class="dx-box"><span class="dx-hl">Nombre: ${esc(r.menor)}</span><span class="dx-hl">Fecha de nacimiento: ${esc(r.nac)}</span></div><div class="dx-l dx-l--m"></div><div class="dx-box"><span class="dx-hl">${esc(r.vinculo)}: ${esc(r.tutor)}</span></div><div class="dx-l dx-l--s"></div><div class="dx-l dx-l--m"></div></div>`;

function reqHtml(r, p) {
  const acts = p
    ? `<button type="button" class="dx-ib${rv.dec === 'r' ? ' is-r' : ''}" id="dxR" data-tip="Rechazar documento" aria-label="Rechazar documento" aria-pressed="${rv.dec === 'r'}">${ic('ban')}</button><button type="button" class="dx-ib${rv.dec === 'a' ? ' is-a' : ''}" id="dxA" data-tip="Aprobar documento" aria-label="Aprobar documento" aria-pressed="${rv.dec === 'a'}">${ic('chk')}</button>`
    : '<span class="dx-sub">—</span>';
  return `<table class="dx-t2"><thead><tr><th>Documento</th><th>Estado</th><th class="dx-c">Acciones</th></tr></thead>
      <tbody><tr><td><span class="dx-dn">${esc(r.tipoDoc)}</span></td><td>${badge(r.est)}</td><td class="dx-c dx-nw">${acts}</td></tr></tbody></table>
    ${p && rv.dec === 'r' ? `<div class="dx-nota"><label for="dxNota">Nota<span>*</span></label><textarea id="dxNota" placeholder="Explica por qué se rechaza y qué debe corregir el tutor.">${esc(rv.nota)}</textarea><p class="dx-err" id="dxErr" hidden>Escribe una nota para rechazar el documento.</p></div>` : ''}
    <div class="dx-acc${rv.shut ? ' is-shut' : ''}"><button type="button" id="dxAcc" aria-expanded="${!rv.shut}">Datos del menor${ic('up')}</button><div class="dx-acc__b">
      <div class="dx-nm"><span class="dx-av dx-av--c3">${esc(r.ini)}</span>${esc(r.menor)}</div>
      <div class="dx-pv"><div class="dx-pv__t"><button type="button" id="dxZi" aria-label="Acercar">${ic('zin')}</button><button type="button" id="dxZo" aria-label="Alejar">${ic('zout')}</button><button type="button" id="dxDl" aria-label="Descargar">${ic('dwn')}</button></div><div class="dx-pv__b" aria-label="Vista previa de ${esc(r.archivo)}">${MOCK(r)}</div></div>
    </div></div>`;
}
function histHtml(r) {
  const ev = [];
  r.grupo.forEach((s) => {
    const d = s.documento;
    ev.push({ t: 'Enviado', ic: 'docc', cls: '', corr: !!d.corregido, desc: `El formulario con documento <b>${esc(d.nombre)}</b> ha sido enviado exitosamente y está pendiente de revisión.`, at: d.cargadoAt || d.cargado, por: r.tutor, tutor: true });
    if (s.estado === 'Aprobada') ev.push({ t: 'Aprobación', ic: 'chk', cls: 'ok', desc: `El documento <b>${esc(d.nombre)}</b> ha sido validado correctamente y el menor quedó afiliado.`, at: d.revisadoAt || d.revisadoFecha, por: d.revisadoPor });
    if (s.estado === 'Rechazada') ev.push({ t: 'Rechazado', ic: 'docx', cls: 'no', help: s.motivo, desc: `El documento <b>${esc(d.nombre)}</b> ha sido rechazado, revisar notas del revisor.`, at: d.revisadoAt || d.revisadoFecha, por: d.revisadoPor });
  });
  ev.reverse();
  return `<ul class="dx-tl">${ev.map((e) => `<li><span class="dx-rail"><span class="dx-ti${e.cls ? ' dx-ti--' + e.cls : ''}">${ic(e.ic)}</span></span>
    <div><div class="dx-tt">${e.t}${e.corr ? ' <span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Corregido</span>' : ''}${e.help ? ` <span class="dx-hlp" title="Nota: ${esc(e.help)}">${ic('help', 'dx-hq')}</span>` : ''}</div><div class="dx-td">${e.desc}</div></div>
    <div class="dx-who2"><div class="dx-tdt"><div>${fmtH(e.at)}</div><span>${esc(e.por)}</span></div><span class="dx-av2 ${e.tutor ? 'is-t' : 'is-r'}">${esc(iniciales(e.por))}</span></div></li>`).join('')}</ul>`;
}
/* Los botones «Rechazar/Aprobar documentos» solo salen cuando se seleccionan varios documentos. */
function seleccionados() { return rv.chk ? 1 : 0; }
function renderRev() {
  const r = filas().find((x) => x.id === sel);
  if (!r) { setSel(null); return; }
  const p = puede && accionesPendientes(r);
  const canSend = p && rv.dec && (rv.dec === 'a' || rv.nota.trim());
  const n = String(r.id).replace(/\D/g, '').slice(-3).padStart(3, '0');
  root.innerHTML = `
    <nav class="dx-crumb" aria-label="Ruta"><a href="#" id="dxBk">Aprobación de documentos</a><span aria-hidden="true">›</span><b>${esc(r.menor)}</b></nav>
    <div class="dx-rh"><h2>${esc(r.menor)}</h2><p>Documento de parentesco enviado · solicitud #SUID 2026 • ${n} · ${esc((getOrganismo(scopeId) || {}).nombre || 'Tu club')}</p></div>
    <div class="dx-split">
      <div class="dx-lp">${p && seleccionados() >= 2 ? `<div class="dx-bulk"><button type="button" class="dx-tlink" id="dxBkR">Rechazar documentos</button><button type="button" class="dx-tlink" id="dxBkA">Aprobar documentos</button></div>` : ''}
        <table class="dx-t2"><thead><tr><th class="dx-ck"><input class="dx-cb" type="checkbox" id="dxAll" aria-label="Seleccionar todos" ${p ? '' : 'disabled'} ${rv.chk ? 'checked' : ''}></th><th>Documento</th><th>Estado</th><th>Fecha de cargue</th></tr></thead>
        <tbody><tr><td class="dx-ck"><input class="dx-cb" type="checkbox" id="dxOne" aria-label="Seleccionar documento" ${p ? '' : 'disabled'} ${rv.chk ? 'checked' : ''}></td><td><span class="dx-dn">${ic('doc')}${esc(r.tipoDoc)} ${ic('help', 'dx-hq')}</span></td><td>${badge(r.est)}</td><td class="dx-nw">${fmtCargue(r.enviado)}</td></tr></tbody></table></div>
      <div class="dx-rp"><h3 class="dx-rt">Detalle del documento</h3>
        <div class="dx-rtabs" role="tablist"><button type="button" class="dx-rtab" role="tab" data-t="req" aria-selected="${rv.tab === 'req'}">Requerimientos</button><button type="button" class="dx-rtab" role="tab" data-t="his" aria-selected="${rv.tab === 'his'}">Historial</button></div>
        <div class="dx-rbody">${rv.tab === 'req' ? reqHtml(r, p) : histHtml(r)}</div>
        ${p ? `<div class="dx-rf"><button type="button" class="naowee-btn naowee-btn--loud naowee-btn--large" id="dxSend" ${canSend ? '' : 'disabled'}>Enviar</button></div>` : ''}
      </div>
    </div>`;
  wireRev(r, p);
}
function wireRev(r, p) {
  root.querySelector('#dxBk').addEventListener('click', (e) => { e.preventDefault(); setSel(null); });
  root.querySelectorAll('.dx-rtab').forEach((b) => b.addEventListener('click', () => { rv.tab = b.dataset.t; renderRev(); }));
  if (!p) return;
  const marcar = (v) => { rv.chk = v; renderRev(); };
  root.querySelector('#dxAll').addEventListener('change', (e) => marcar(e.target.checked));
  root.querySelector('#dxOne').addEventListener('change', (e) => marcar(e.target.checked));
  root.querySelector('#dxSend').addEventListener('click', () => {
    if (rv.dec === 'r' && !rv.nota.trim()) { const e = root.querySelector('#dxErr'); if (e) e.hidden = false; return; }
    confirmar(r, rv.dec);
  });
  if (rv.tab !== 'req') return;
  root.querySelector('#dxA').addEventListener('click', () => { rv.dec = rv.dec === 'a' ? null : 'a'; renderRev(); });
  root.querySelector('#dxR').addEventListener('click', () => { rv.dec = rv.dec === 'r' ? null : 'r'; renderRev(); const n = root.querySelector('#dxNota'); if (n) n.focus(); });
  root.querySelector('#dxAcc').addEventListener('click', () => { rv.shut = !rv.shut; renderRev(); });
  root.querySelector('#dxZi').addEventListener('click', () => { rv.zoom = Math.min(1.5, rv.zoom + .1); renderRev(); });
  root.querySelector('#dxZo').addEventListener('click', () => { rv.zoom = Math.max(.7, rv.zoom - .1); renderRev(); });
  root.querySelector('#dxDl').addEventListener('click', () => toast('Descarga simulada de ' + r.archivo));
  const nota = root.querySelector('#dxNota');
  if (nota) nota.addEventListener('input', () => { rv.nota = nota.value; const b = root.querySelector('#dxSend'); if (b) b.disabled = !rv.nota.trim(); const e = root.querySelector('#dxErr'); if (e) e.hidden = true; });
}

/* Confirmación (modal) → la decisión se registra recién al aceptar. */
function confirmar(r, est) {
  const ok = est === 'a';
  const club = (getOrganismo(scopeId) || {}).nombre || 'tu club';
  const ov = document.createElement('div');
  ov.className = 'dx-ov';
  ov.innerHTML = `<div class="dx-dlg" role="dialog" aria-modal="true" aria-labelledby="dxCt"><div class="dx-dlg__i"><span class="dx-dlg__k">${ic('chk')}</span><h3 id="dxCt">${ok ? '¡Aprobación de documento!' : '¡Rechazo de documento!'}</h3>
    <p>${ok ? `El documento ha sido aprobado exitosamente y el menor quedó afiliado a ${esc(club)}. Se notificó al tutor sobre la decisión.` : 'El documento ha sido rechazado exitosamente y se ha notificado al tutor sobre la decisión. Asegúrate de que las razones del rechazo sean claras para facilitar futuras correcciones.'}</p></div>
    <div class="dx-dlg__f"><button type="button" class="dx-tlink" id="dxCc">Cancelar</button><button type="button" class="naowee-btn naowee-btn--loud naowee-btn--large" id="dxCa">Aceptar</button></div></div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('is-open'));
  const cerrar = () => { ov.classList.remove('is-open'); setTimeout(() => ov.remove(), 200); };
  ov.querySelector('#dxCa').focus();
  ov.querySelector('#dxCc').addEventListener('click', cerrar);
  ov.addEventListener('click', (e) => { if (e.target === ov) cerrar(); });
  ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrar(); });
  ov.querySelector('#dxCa').addEventListener('click', () => {
    cerrar();
    resolverAfiliacion(r.id, ok ? 'aprobada' : 'rechazada', { motivo: ok ? '' : rv.nota.trim(), responsable: role.userName || 'Administrador del club', rol: ROL_DECISION });
    toast(ok ? `${r.menor} quedó afiliado a ${club}` : `Documento de ${r.menor} rechazado. El tutor fue notificado.`);
    setSel(null);
  });
}

/* ═════════ Arranque ═════════ */
function render() {
  const t = document.getElementById('pageTitle'), s = document.getElementById('pageSub');
  const head = document.querySelector('.page-head');
  if (roleCode !== 'CLUB' && !esRevisor) {
    root.innerHTML = '<div class="dx-empty"><strong>Esta vista es del club</strong>Entra como administrador de un club para revisar los documentos de parentesco de los menores.</div>';
    return;
  }
  if (sel) { if (head) head.hidden = true; renderRev(); return; }
  if (head) head.hidden = false;
  if (t) t.textContent = 'Aprobación de documentos';
  if (s) s.textContent = 'Revisa el documento de parentesco de los menores. Si se aprueba, el menor queda afiliado al club y hereda su liga y federación.';
  renderLista();
}
render();
