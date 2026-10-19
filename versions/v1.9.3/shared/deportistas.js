/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — «Mis deportistas»: plantel afiliado (ORG-09)
   Ejerce el permiso que la matriz §11.2 YA concedía y que no tenía
   pantalla: PERMS.deportistas[CLUB] = 'R' — «sus afiliados».

   ALCANCE: el club ve su plantel y puede DESVINCULAR con motivo (P-04,
   cerrada: sin apelación, se avisa al deportista y a la liga); el deportista también
   puede pedir la baja y el club la confirma en su bandeja. Con
   multi-afiliación, desvincular termina solo la afiliación a este club.
   Todos los organismos registran deportistas (P-07 respondida, 2026-10-09): los niveles de
   arriba indican el club y queda como propuesta que el club confirma (2026-10-13). Carga
   masiva de deportistas en `?vista=cargue` (DEP-609).

   La pantalla es GENÉRICA POR JURISDICCIÓN: usa scopeFor(role) +
   deportistasOf(), que resuelve el subárbol (§2 handoff: el deportista
   queda vinculado a toda la cadena de su club). Hoy solo el menú del
   rol CLUB la expone; habilitarla para LIGA/FEDERACIÓN/COMITÉ es
   agregar el ítem en MENU_BY_ROLE — todos tienen 'R' en la matriz.

   «Ver ficha» NO abre un modal: NAVEGA a `afiliacion.html?role=…&id=…
   &from=deportistas`, que ya es el PERFIL 360° canónico del deportista
   (hero + nav + tabs + biometría). Esa página detecta que quien la abre
   es un organismo y se sirve en modo CONSULTA (read-only, sin el grupo
   Cuenta ni los CTA de afiliación) y con gate de jurisdicción. Duplicar
   ese perfil en un modal era reconstruir lo que ya existe.

   Solo componentes .naowee-* + las clases locales YA existentes de la
   bandeja (.bj-panel/.bj-org/.cg-table). Lo único nuevo es el KPI-strip
   (.dp-*) por override pattern: el DS no tiene stat-card (§33).
   ═══════════════════════════════════════════════════════════════ */
import {
  getOrganismo, deportistasOf, getDeportista, solicitudesDeClub, desvincularPorClub,
  childrenOf, ancestorsOf, registrarDeportista, proponerClub, allSolicitudes, buscarAutodeclarados, asociarAutodeclarado,
  deportistasDeTerritorio, organismosDeTerritorio, territorioId, nombreTerritorio,
  personaPorDocumento, cargarDeportistas, recordCargue, allCargues, deportesDe, subtreeOf, allOrganismos, allDeportistas, edadDe, esDeportista
} from './organismos-data.js';
import { can, scopeFor, territorioDe } from './permissions.js';
import { buildDeportistaDetalle } from './deportista-detalle.js';
import { ROLES, getDemoMode } from './sidebar.js';
import { mountDevnotes } from './devnotes.js';

const root = document.getElementById('deportistasRoot');
if (root) {
  const qsp = (k) => new URLSearchParams(location.search).get(k);
  const roleCode = qsp('role') || 'MINDEPORTE';
  const scopeId = scopeFor(roleCode);
  /* Territorial (Fase 3): su jurisdicción es un departamento o un municipio, no un organismo. */
  const terr = territorioDe(roleCode);
  const puedeVer = can(roleCode, 'R', 'deportistas');
  const esClub = roleCode === 'CLUB';
  const puedeCrear = can(roleCode, 'C', 'deportistas');

  /* ─── Utilidades ─── */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const norm = (s) => String(s == null ? '' : s)
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const PAGE_SIZE = 10;

  /* Iconos inline — el tamaño lo fija SIEMPRE el CSS del chip que los
     contiene (§P7: un svg sin width/height renderiza enorme). */
  const I = {
    users:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    medal:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8 3h8l-3 6h-2L8 3z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    minor:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>',
    inbox:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    info:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    chevL:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevR:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    link:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.7-1.7"/></svg>',
    plus:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  /* Estado de vinculación — mapa semántico ÚNICO del módulo. */
  const EST_VARIANT = { vinculado: 'positive', autodeclarado: 'neutral' };
  const EST_LABEL = { vinculado: 'Vinculado', autodeclarado: 'Autodeclarado' };
  const estBadge = (e) => `<span class="naowee-badge naowee-badge--${EST_VARIANT[e] || 'neutral'} naowee-badge--quiet naowee-badge--small">${esc(EST_LABEL[e] || e)}</span>`;

  /* Categoría (tier) = dimensión distinta al estado → NO compite en color:
     siempre neutral (§A1). */
  const catBadge = (l) => `<span class="naowee-badge naowee-badge--neutral naowee-badge--quiet naowee-badge--small">${esc(l)}</span>`;

  /* Empty state y message: markup IDÉNTICO al de la bandeja del módulo. */
  const emptyState = (title, desc) =>
    `<div class="naowee-empty-state"><span class="naowee-empty-state__icon">${I.users}</span><p class="naowee-empty-state__title">${esc(title)}</p><p class="naowee-empty-state__description">${esc(desc)}</p></div>`;
  const msg = (variant, icon, html, style) =>
    `<div class="naowee-message naowee-message--${variant}"${style ? ` style="${style}"` : ''}><span class="naowee-message__icon">${icon}</span><div class="naowee-message__body"><p class="naowee-message__text">${html}</p></div></div>`;

  const club = scopeId ? getOrganismo(scopeId) : null;

  /* ─── Desvinculación por el club (ORG-10) ───
     Gateada por la matriz: solo si el rol tiene 'X' sobre deportistas. */
  const puedeDesvincular = can(roleCode, 'X', 'deportistas');
  const MOTIVOS_DESV = [
    'Retiro voluntario del deportista',
    'Inactividad · no continúa entrenando',
    'Traslado a otro club',
    'Incumplimiento del reglamento interno',
    'Fin de vigencia de la afiliación',
    'Otro (ver comentario)'
  ];

  /* ─── Plantel: semilla delgada + perfil derivado (edad/categoría/medallas) ─── */
  function plantel() {
    return (terr ? deportistasDeTerritorio(terr) : deportistasOf(scopeId)).map((d) => {
      let p = null;
      try { p = buildDeportistaDetalle(d); } catch (_) { /* registrado sin perfil derivado */ }
      return {
        propuesta: allSolicitudes().find((s) => s.deportistaId === d.id && s.origen === 'propuesta' && s.estado === 'Enviada') || null,
        sinClub: d.estado === 'autodeclarado',
        otrosClubes: d.clubIds.filter((c) => c !== scopeId).length, id: d.id, nombre: d.nombre, tipoDoc: d.tipoDoc, numDoc: d.numDoc,
        deporte: d.deporte, modalidad: d.modalidad || '—', estado: d.estado,
        edad: d.fechaNac ? edadDe(d.fechaNac) : (p ? p.edad : null), cat: p ? p.tierLabel : '—',
        emoji: p ? p.deporteEmoji : '🏅', medallas: p ? p.medalleria.length : 0
      };
    }).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  }

  /* ─── Estado de la vista ─── */
  let query = '';
  let fModalidad = 'Todas';
  let fCategoria = 'Todas';
  let fDeporte = 'Todas';
  let page = 1;

  function filtrar(rows) {
    let v = rows;
    if (fDeporte !== 'Todas') v = v.filter((r) => r.deporte === fDeporte);
    if (fModalidad !== 'Todas') v = v.filter((r) => r.modalidad === fModalidad);
    if (fCategoria !== 'Todas') v = v.filter((r) => r.cat === fCategoria);
    if (query) {
      const q = norm(query);
      v = v.filter((r) => norm(r.nombre).includes(q) || norm(r.numDoc).includes(q)
        || norm(r.modalidad).includes(q) || norm(r.deporte).includes(q));
    }
    return v;
  }

  /* KPI-strip: métricas DERIVABLES de datos reales (nada decorativo).
     El chip tintado da presencia al ícono (§P15); su color = significado. */
  function kpis(rows) {
    const deportes = [...new Set(rows.map((r) => r.deporte).filter(Boolean))];
    const menores = rows.filter((r) => r.edad != null && r.edad < 18).length;
    const conMedalla = rows.filter((r) => r.medallas > 0).length;

    const tiles = [
      { k: 'brand', ico: I.users, val: rows.length, lbl: rows.length === 1 ? 'Deportista afiliado' : 'Deportistas afiliados' },
      { k: 'info', ico: I.shield, val: deportes.length, lbl: deportes.length === 1 ? 'Deporte' : 'Deportes', sub: deportes.join(' · ') },
      { k: 'ok', ico: I.medal, val: conMedalla, lbl: 'Con medallería registrada' },
      { k: menores ? 'warn' : 'neutral', ico: I.minor, val: menores, lbl: menores === 1 ? 'Menor de edad' : 'Menores de edad', sub: menores ? 'Requieren consentimiento del tutor' : '' }
    ];
    const sinClub = rows.filter((r) => r.sinClub && !r.propuesta).length;
    if (puedeCrear && !esClub) {
      tiles.push({ k: sinClub ? 'warn' : 'neutral', ico: I.link, val: sinClub,
        lbl: sinClub === 1 ? 'Autodeclarado sin club' : 'Autodeclarados sin club',
        sub: sinClub ? 'Propónles un club; el club confirma' : '' });
    }
    /* Solicitudes por confirmar SOLO para el club: es su bandeja (ORG-08). */
    if (esClub && scopeId) {
      const pend = solicitudesDeClub(scopeId).filter((s) => s.estado === 'Enviada').length;
      tiles.push({
        k: pend ? 'warn' : 'neutral', ico: I.inbox, val: pend,
        lbl: pend === 1 ? 'Solicitud por confirmar' : 'Solicitudes por confirmar',
        href: `bandeja.html?role=${encodeURIComponent(roleCode)}`
      });
    }

    return `<div class="dp-kpis" id="dpKpis">${tiles.map((t) => {
      const inner = `
        <span class="dp-kpi__ico dp-kpi__ico--${t.k}">${t.ico}</span>
        <span class="dp-kpi__body">
          <span class="dp-kpi__val">${t.val}</span>
          <span class="dp-kpi__lbl">${esc(t.lbl)}</span>
          ${t.sub ? `<span class="dp-kpi__sub">${esc(t.sub)}</span>` : ''}
        </span>`;
      return t.href
        ? `<a class="dp-kpi dp-kpi--link" href="${esc(t.href)}">${inner}</a>`
        : `<div class="dp-kpi">${inner}</div>`;
    }).join('')}</div>`;
  }

  /* Filtro CONDICIONAL (§P20): se renderiza SOLO si la dimensión varía en el
     plantel. En un club de un solo deporte, un filtro de una opción es inútil
     → se oculta y manda el buscador.

     DROPDOWN CANÓNICO `.naowee-dropdown`, no `<select>` nativo: el menú de un
     select lo pinta el SISTEMA OPERATIVO (popup oscuro en macOS), así que se
     sale de la identidad Naowee en cuanto se despliega. Estos filtros no
     manejan lógica core (no hay cascada ni motor detrás), así que convertirlos
     es correcto — la excepción de «no toques los <select> nativos» aplica a
     los que sí la manejan.
     Toggle con la clase `--open` en el WRAPPER (regla dura del DS). */
  function filtroDropdown(key, label, vals, cur) {
    if (vals.length <= 1) return '';
    const opts = ['Todas', ...vals];
    return `
      <span class="bj-filter dp-filter">
        <span class="bj-filter__lbl" id="dpLbl-${key}">${esc(label)}</span>
        <div class="naowee-dropdown dp-dd" data-dd="${key}">
          <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"
                  aria-expanded="false" aria-labelledby="dpLbl-${key}">
            <span class="naowee-dropdown__value">${esc(cur)}</span>
            <span class="naowee-dropdown__chevron">${I.chevron}</span>
          </button>
          <div class="naowee-dropdown__menu" role="listbox">
            ${opts.map((v) => `
              <div class="naowee-dropdown__opt${v === cur ? ' is-selected' : ''}" role="option"
                   aria-selected="${v === cur}" data-value="${esc(v)}">
                ${esc(v)}<span class="naowee-dropdown__opt-check">${I.check}</span>
              </div>`).join('')}
          </div>
        </div>
      </span>`;
  }

  /* Aplica el valor elegido al filtro correspondiente. */
  function setFiltro(key, valor) {
    if (key === 'deporte') fDeporte = valor;
    else if (key === 'modalidad') fModalidad = valor;
    else if (key === 'categoria') fCategoria = valor;
    page = 1;                                    /* §P19: reset al filtrar */
    render();
  }

  /* Un ÚNICO listener delegado en document, registrado una sola vez: la
     página re-renderiza en cada filtro, así que atar el cierre por
     clic-fuera dentro de wire() acumularía un listener por render. */
  let _ddWired = false;
  function wireDropdowns() {
    if (_ddWired) return;
    _ddWired = true;
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('.dp-dd .naowee-dropdown__opt');
      if (opt) {
        const dd = opt.closest('.dp-dd');
        setFiltro(dd.getAttribute('data-dd'), opt.getAttribute('data-value'));
        return;
      }
      const trigger = e.target.closest('.dp-dd .naowee-dropdown__trigger');
      document.querySelectorAll('.dp-dd').forEach((dd) => {
        const esSuyo = trigger && dd.contains(trigger);
        const abrir = esSuyo && !dd.classList.contains('naowee-dropdown--open');
        dd.classList.toggle('naowee-dropdown--open', !!abrir);
        dd.querySelector('.naowee-dropdown__trigger')
          ?.setAttribute('aria-expanded', abrir ? 'true' : 'false');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('.dp-dd.naowee-dropdown--open').forEach((dd) => {
        dd.classList.remove('naowee-dropdown--open');
        dd.querySelector('.naowee-dropdown__trigger')?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sortEs = (a, b) => a.localeCompare(b, 'es');

  function render() {
    if (vistaCargue) { renderCargue(); return; }
    if (!puedeVer) {
      root.innerHTML = msg('caution', I.info,
        'Tu perfil no tiene permiso de consulta sobre deportistas en la matriz de accesos del módulo.');
      return;
    }

    const rows = plantel();
    const modalidades = [...new Set(rows.map((r) => r.modalidad).filter((m) => m && m !== '—'))].sort(sortEs);
    const categorias = [...new Set(rows.map((r) => r.cat).filter((c) => c && c !== '—'))].sort(sortEs);
    const deportes = [...new Set(rows.map((r) => r.deporte).filter(Boolean))].sort(sortEs);

    const view = filtrar(rows);
    const totalPages = Math.max(1, Math.ceil(view.length / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    const pageRows = view.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const filtrando = query !== '' || fModalidad !== 'Todas' || fCategoria !== 'Todas' || fDeporte !== 'Todas';

    root.innerHTML = `
      ${msg('informative', I.info, esClub
        ? `Deportistas con afiliación <strong>confirmada</strong> a <strong>${esc(club ? club.nombre : 'tu club')}</strong>. Cada ficha muestra la <strong>cadena heredada</strong> (club → liga → federación → comité) que el deportista recibió al ser aprobado (ORG-05). Registra deportistas con <strong>Registrar deportista</strong>; las solicitudes de afiliación y bajas se confirman en <a href="bandeja.html?role=${encodeURIComponent(roleCode)}">Solicitudes de deportistas</a>.`
        : terr ? `Deportistas vinculados a clubes ubicados en <strong>${esc(nombreTerritorio(terr))}</strong> y los autodeclarados que registraste. Puedes registrar deportistas y proponerles un club de tu territorio; el club lo confirma. No apruebas organismos ni afiliaciones.`
        : `Deportistas vinculados a clubes de tu jurisdicción${club ? ` (<strong>${esc(club.nombre)}</strong> y su subárbol)` : ''}. También ves los autodeclarados que registraste: propónles un club y ese club confirma.`,
        'margin-bottom:16px')}

      ${esClub && club && club.id === 'CLU-001' ? `
        <div class="naowee-card" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 18px;margin-bottom:16px">
          <span aria-hidden="true" style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;background:#0e749022;color:#0e7490;font-weight:700;font-size:13px">LG</span>
          <div style="flex:1;min-width:200px">
            <div class="bj-org__name">Laura Gómez · deportista y entrenadora</div>
            <div class="bj-org__sub">Afiliada a tu club como deportista y con un vínculo solicitado como personal de apoyo. Perfil multi-rol (v1.6.0).</div>
          </div>
          <a class="naowee-btn naowee-btn--mute naowee-btn--small" href="perfil.html?role=CLUB&persona=laura&from=${encodeURIComponent('deportistas.html?role=CLUB')}">Ver perfil</a>
        </div>` : ''}

      ${kpis(rows)}

      <div class="naowee-card bj-panel">
        <div class="bj-panel__bar">
          <div class="naowee-searchbox bj-search${query ? ' naowee-searchbox--has-value' : ''}" id="dpSearchBox">
            <div class="naowee-searchbox__input-wrap">
              <span class="naowee-searchbox__icon">${I.search}</span>
              <input class="naowee-searchbox__input" id="dpSearch" type="text"
                     placeholder="Buscar por nombre, documento o modalidad…" value="${esc(query)}"
                     aria-label="Buscar deportista">
              <button type="button" class="naowee-searchbox__clear" id="dpClear" aria-label="Limpiar búsqueda">${I.close}</button>
            </div>
          </div>
          ${filtroDropdown('deporte', 'Deporte', deportes, fDeporte)}
          ${filtroDropdown('modalidad', 'Modalidad', modalidades, fModalidad)}
          ${filtroDropdown('categoria', 'Categoría', categorias, fCategoria)}
        </div>

        ${pageRows.length ? `
          <div class="cg-table-wrap">
            <table class="cg-table bj-table">
              <thead>
                <tr>
                  <th>Deportista</th><th>Modalidad</th><th>Categoría</th>
                  <th>Edad</th><th>Estado</th><th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${pageRows.map((r) => `
                  <tr>
                    <td data-label="Deportista">
                      <div class="bj-org">
                        <span class="bj-org__emoji">${r.emoji}</span>
                        <div>
                          <div class="bj-org__name">${esc(r.nombre)}</div>
                          <div class="bj-org__sub">${esc(r.tipoDoc)} ${esc(r.numDoc)}</div>
                        </div>
                      </div>
                    </td>
                    <td data-label="Modalidad">
                      <div class="bj-org__name" style="font-weight:500">${esc(r.modalidad)}</div>
                      <div class="bj-org__sub">${esc(r.deporte)}</div>
                    </td>
                    <td data-label="Categoría">${catBadge(r.cat)}</td>
                    <td class="cg-table__nit" data-label="Edad">${r.edad != null ? `${r.edad} años` : '—'}${r.edad != null && r.edad < 18 ? ` <span class="dp-minor" title="Menor de edad — requiere consentimiento del tutor">menor</span>` : ''}</td>
                    <td data-label="Estado">${estBadge(r.estado)}${r.propuesta ? `<div class="bj-org__sub dp-falta">Club propuesto: ${esc((getOrganismo(r.propuesta.clubId) || {}).nombre || r.propuesta.clubId)} · espera al club</div>` : ''}${esClub && r.otrosClubes ? `<div class="bj-org__sub">También en ${r.otrosClubes} club${r.otrosClubes > 1 ? 'es' : ''} más</div>` : ''}</td>
                    <td class="bj-row-action" data-label="">
                      ${r.sinClub && !r.propuesta && puedeCrear && !esClub ? `<button type="button" class="naowee-btn naowee-btn--small" data-asoc="${esc(r.id)}">Proponer club</button>` : ''}
                      <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-ficha="${esc(r.id)}">Ver ficha</button>
                      ${puedeDesvincular && r.estado === 'vinculado'
                        ? `<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small dp-btn-danger" data-desv="${esc(r.id)}">Desvincular</button>`
                        : ''}
                    </td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
          ${totalPages > 1 ? `
            <div class="bj-panel__foot">
              <div class="naowee-pagination naowee-pagination--small" id="dpPager">
                <div class="naowee-pagination__pages">
                  <span class="naowee-pagination__label">Página</span>
                  <input class="naowee-pagination__input" id="dpPageInput" type="number" min="1" max="${totalPages}" value="${page}" aria-label="Número de página">
                  <span class="naowee-pagination__total">de <strong>${totalPages}</strong></span>
                </div>
                <div class="naowee-pagination__controls">
                  <button type="button" class="naowee-pagination__btn" data-pg="prev"${page <= 1 ? ' disabled' : ''} aria-label="Página anterior">${I.chevL}</button>
                  <button type="button" class="naowee-pagination__btn" data-pg="next"${page >= totalPages ? ' disabled' : ''} aria-label="Página siguiente">${I.chevR}</button>
                </div>
              </div>
            </div>` : ''}
        ` : (filtrando
          ? emptyState('Sin resultados', 'Ningún deportista de tu plantel coincide con la búsqueda o los filtros aplicados.')
          : emptyState('Sin deportistas afiliados',
              esClub
                ? 'Tu club aún no tiene deportistas con afiliación confirmada. Cuando apruebes una solicitud en «Solicitudes de deportistas», el deportista aparecerá aquí.'
                : 'Todavía no hay deportistas vinculados a clubes de tu jurisdicción.'))}
      </div>`;

    pintarAcciones();
    wire();
  }

  /* Acciones en el encabezado, a la derecha del título (fuera del re-render de la tabla). */
  function pintarAcciones() {
    const box = document.getElementById('dpActions');
    if (!box || !puedeCrear || box.querySelector('#dpNuevo')) return;
    /* La carga masiva es de los organismos (P-07); el territorial registra uno a uno. */
    box.insertAdjacentHTML('beforeend', `
      ${terr ? '' : `<a class="naowee-btn naowee-btn--quiet" id="dpMasivo" href="${esc(urlCon({ vista: 'cargue' }))}">${I.upload}Cargue masivo de deportistas</a>`}
      ${esClub ? `<button type="button" class="naowee-btn naowee-btn--quiet" id="dpBuscar">${I.search}Asociar autodeclarado</button>` : ''}
      <button type="button" class="naowee-btn naowee-btn--loud" id="dpNuevo">${I.plus}Registrar deportista</button>`);
    document.getElementById('dpNuevo').addEventListener('click', () => openRegistro());
    document.getElementById('dpBuscar')?.addEventListener('click', openAsociar);
  }
  /* Misma URL con parámetros cambiados (conserva role, org, como, territorio). */
  function urlCon(cambios) {
    const u = new URLSearchParams(location.search);
    Object.entries(cambios).forEach(([k, v]) => (v == null ? u.delete(k) : u.set(k, v)));
    return `deportistas.html?${u.toString()}`;
  }

  /* ─── Modal de desvinculación (ORG-10) ───
     Acto con consecuencia real: el deportista pierde su cadena heredada. La
     contención es la fricción —confirmación explícita + MOTIVO obligatorio—
     y la traza, no un segundo visto bueno del deportista. */
  function openDesvincular(id) {
    const dep = getDeportista(id);
    if (!dep) return;
    const p = buildDeportistaDetalle(dep);
    let motivo = '';
    let comentario = '';

    const ov = document.createElement('div');
    ov.className = 'reg-modal-overlay dp-modal-ov';
    ov.innerHTML = `
      <div class="reg-modal bj-modal bj-modal--sm dp-desv">
        <div class="reg-modal__head">
          <h3 class="reg-modal__title">Desvincular deportista</h3>
          <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button>
        </div>
        <div class="reg-modal__body">
          ${msg('caution', I.info, `Vas a desvincular a <strong>${esc(dep.nombre)}</strong> de <strong>${esc(club ? club.nombre : 'tu club')}</strong>. Quedará <strong>autodeclarado</strong> y perderá la cadena heredada (${esc(p && p.ligaNombre ? p.ligaNombre : 'liga')} · ${esc(p && p.federacionNombre ? p.federacionNombre : 'federación')}). No tiene apelación: le avisamos a la persona y a todas las ligas con las que el club tiene vínculo vigente. Podrá volver a solicitar afiliación cuando quiera.`)}
          <div class="dp-desv__field">
            <span class="bj-filter__lbl" id="dpDesvLbl">Motivo de la desvinculación <span aria-hidden="true">*</span></span>
            <div class="naowee-dropdown dp-desv__dd" id="dpDesvDd">
              <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"
                      aria-expanded="false" aria-labelledby="dpDesvLbl">
                <span class="naowee-dropdown__value is-placeholder">Seleccione…</span>
                <span class="naowee-dropdown__chevron">${I.chevron}</span>
              </button>
              <div class="naowee-dropdown__menu" role="listbox">
                ${MOTIVOS_DESV.map((m) => `
                  <div class="naowee-dropdown__opt" role="option" data-value="${esc(m)}">
                    ${esc(m)}<span class="naowee-dropdown__opt-check">${I.check}</span>
                  </div>`).join('')}
              </div>
            </div>
            <p class="naowee-helper dp-desv__err" id="dpDesvErr" hidden>Selecciona un motivo para continuar.</p>
          </div>
          <div class="dp-desv__field" id="dpDesvComentWrap" hidden>
            <label class="bj-filter__lbl" for="dpDesvComent">Comentario</label>
            <textarea class="dp-desv__ta" id="dpDesvComent" rows="3"
                      placeholder="Describe el motivo (queda en la trazabilidad)."></textarea>
          </div>
          <p class="bj-detail__note">El deportista recibe notificación por email y app, y el motivo queda registrado en su historial y en la auditoría del club.</p>
        </div>
        <div class="reg-modal__foot bj-modal__foot">
          <button type="button" class="naowee-btn naowee-btn--mute" data-close>Cancelar</button>
          <button type="button" class="naowee-btn bj-btn-danger" id="dpDesvOk">Desvincular</button>
        </div>
      </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('is-open'));

    const cerrar = () => {
      if (ov.__closing) return;
      ov.__closing = true;
      ov.classList.remove('is-open');
      setTimeout(() => ov.remove(), 340);
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') cerrar(); };
    ov.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', cerrar));
    ov.addEventListener('click', (e) => { if (e.target === e.currentTarget) cerrar(); });
    document.addEventListener('keydown', onKey);

    /* Dropdown del motivo: contenido en el modal, con sus propios handlers
       (el delegado global sirve a los filtros del toolbar, no a este). */
    const dd = ov.querySelector('#dpDesvDd');
    const val = dd.querySelector('.naowee-dropdown__value');
    dd.querySelector('.naowee-dropdown__trigger').addEventListener('click', (e) => {
      e.stopPropagation();
      const abrir = !dd.classList.contains('naowee-dropdown--open');
      dd.classList.toggle('naowee-dropdown--open', abrir);
      dd.querySelector('.naowee-dropdown__trigger').setAttribute('aria-expanded', abrir ? 'true' : 'false');
    });
    dd.querySelectorAll('.naowee-dropdown__opt').forEach((opt) => {
      opt.addEventListener('click', () => {
        motivo = opt.getAttribute('data-value');
        val.textContent = motivo;
        val.classList.remove('is-placeholder');
        dd.querySelectorAll('.naowee-dropdown__opt').forEach((o) => o.classList.toggle('is-selected', o === opt));
        dd.classList.remove('naowee-dropdown--open');
        ov.querySelector('#dpDesvErr').hidden = true;
        /* «Otro» exige comentario para que la traza sirva de algo. */
        ov.querySelector('#dpDesvComentWrap').hidden = !/^Otro/.test(motivo);
      });
    });
    ov.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) dd.classList.remove('naowee-dropdown--open');
    });

    ov.querySelector('#dpDesvOk').addEventListener('click', () => {
      comentario = (ov.querySelector('#dpDesvComent')?.value || '').trim();
      if (!motivo || (/^Otro/.test(motivo) && !comentario)) {
        ov.querySelector('#dpDesvErr').hidden = false;
        ov.querySelector('#dpDesvErr').textContent = !motivo
          ? 'Selecciona un motivo para continuar.'
          : 'Describe el motivo en el comentario.';
        dd.classList.add('naowee-shake');
        setTimeout(() => dd.classList.remove('naowee-shake'), 500);
        return;
      }
      const texto = /^Otro/.test(motivo) ? `${motivo}: ${comentario}` : motivo;
      desvincularPorClub(id, { clubId: scopeId, motivo: texto, responsable: (ROLES[roleCode] || {}).userName || '' });
      cerrar();
      render();
      if (window.naoweeToast) {
        window.naoweeToast(`${dep.nombre} quedó desvinculado de tu club. Le avisamos a la persona y a la liga.`, 'success');
      }
    });
  }

  /* ─── Registrar deportista: Datos → Club ───
     Todos los organismos registran deportistas (P-07 respondida, 2026-10-09). Desde un nivel
     distinto al club, el club es obligatorio: la liga indica el club; la federación, la liga y
     el club. El club queda como PROPUESTA que el club confirma en su bandeja (2026-10-13);
     mientras tanto el deportista sigue autodeclarado. Si el club aún no está en el SUID, se
     registra sin club (autodeclarado) y se le propone después. Si el documento ya existe, no se
     crea otra persona: conserva sus datos y su correo y solo se le propone el club. */
  const DEPORTES = ['Patinaje', 'Natación', 'Fútbol', 'Ciclismo'];
  const NIVELES_ABAJO = { comite: ['federacion', 'liga', 'club'], federacion: ['liga', 'club'], liga: ['club'], club: [], territorio: ['club'] };
  const TIPO_LBL = { comite: 'Comité', federacion: 'Federación', liga: 'Liga', club: 'Club' };

  function openRegistro(depId) {
    const actor = terr ? { id: territorioId(terr), tipo: 'territorio', nombre: nombreTerritorio(terr) } : getOrganismo(scopeId);
    if (!actor) return;
    const abajo = NIVELES_ABAJO[actor.tipo] || [];
    const fijos = terr ? [] : [...ancestorsOf(actor.id).reverse(), actor];
    const delActor = terr ? [] : actor.tipo === 'comite'
      ? [...new Set(childrenOf(actor.id).filter((o) => o.tipo === 'federacion').flatMap((o) => deportesDe(o)))] : deportesDe(actor);
    const deportesActor = delActor.length ? delActor : DEPORTES;
    const st = {
      step: depId ? 2 : 1, err: '', sinClub: false, soloProponer: !!depId,
      existente: depId ? getDeportista(depId) : null,
      d: { nombre: '', tipoDoc: 'CC', numDoc: '', deporte: deportesActor[0], correo: '' },
      sel: {}
    };
    const ov = document.createElement('div');
    ov.className = 'reg-modal-overlay dp-modal-ov';
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('is-open'));
    const cerrar = () => {
      ov.classList.remove('is-open');
      setTimeout(() => ov.remove(), 340);
      document.removeEventListener('keydown', onKey);
    };
    const onKey = (e) => { if (e.key === 'Escape') cerrar(); };
    document.addEventListener('keydown', onKey);

    const deporteDe = () => (st.existente ? st.existente.deporte : st.d.deporte);
    const opciones = (tipo) => {
      const conDeporte = (o) => tipo !== 'club' || !deporteDe() || deportesDe(o).includes(deporteDe());
      if (terr) return tipo === 'club' ? organismosDeTerritorio(terr).filter((o) => o.tipo === 'club' && o.estado === 'Activo' && conDeporte(o)) : [];
      const padre = tipo === 'federacion' ? actor.id : tipo === 'liga' ? (st.sel.federacionId || (actor.tipo === 'federacion' ? actor.id : null)) : (st.sel.ligaId || (actor.tipo === 'liga' ? actor.id : null));
      return padre ? childrenOf(padre).filter((o) => o.tipo === tipo && o.estado === 'Activo' && conDeporte(o)) : [];
    };
    const dd = (tipo) => {
      const ops = opciones(tipo);
      const cur = ops.find((o) => o.id === st.sel[`${tipo}Id`]);
      const off = st.sinClub || !ops.length;
      return `<div class="dp-desv__field">
        <span class="bj-filter__lbl">${TIPO_LBL[tipo]} <span aria-hidden="true">*</span></span>
        <div class="naowee-dropdown dp-desv__dd" data-dd="${tipo}">
          <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"${off ? ' disabled' : ''}>
            <span class="naowee-dropdown__value${cur ? '' : ' is-placeholder'}">${esc(cur ? cur.nombre : (ops.length ? 'Seleccione…' : 'Elige primero el nivel anterior'))}</span>
            <span class="naowee-dropdown__chevron">${I.chevron}</span>
          </button>
          <div class="naowee-dropdown__menu" role="listbox">
            ${ops.map((o) => `<div class="naowee-dropdown__opt${cur && cur.id === o.id ? ' is-selected' : ''}" role="option" data-value="${esc(o.id)}">${esc(o.nombre)}<span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join('')}
          </div>
        </div></div>`;
    };
    const campo = (id, label, val, type) => `<div class="dp-desv__field">
      <label class="bj-filter__lbl" for="${id}">${label} <span aria-hidden="true">*</span></label>
      <div class="naowee-textfield"><div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" id="${id}" type="${type || 'text'}" value="${esc(val)}"></div></div></div>`;
    const avisoExistente = (dep) => msg('caution', I.info, `<strong>${esc(dep.nombre)}</strong> (${esc(dep.tipoDoc)} ${esc(dep.numDoc)}) ya está registrado en el SUID. No se crea de nuevo: conserva sus datos y su correo. ${abajo.length ? 'Solo le propones el club.' : 'Puedes asociarlo a tu club.'}`);

    function draw() {
      const pasos = (abajo.length ? ['Datos', 'Club'] : ['Datos']).map((t, i) => {
        const n = i + 1; const estado = st.step > n ? 'done' : st.step === n ? 'on' : '';
        return `<li class="dp-step ${estado ? `dp-step--${estado}` : ''}"><span class="dp-step__n">${estado === 'done' ? I.check : n}</span>${t}</li>`;
      }).join('<li class="dp-step__sep" aria-hidden="true"></li>');
      const nombre = st.existente ? st.existente.nombre : st.d.nombre;
      const okLbl = st.step === 1
        ? (abajo.length ? 'Continuar' : (st.existente ? 'Asociar a mi club' : 'Registrar'))
        : (st.sinClub ? 'Registrar sin club' : (st.existente ? 'Proponer club' : 'Registrar y proponer club'));
      ov.innerHTML = `
      <div class="reg-modal bj-modal bj-modal--overflow dp-desv">
        <div class="reg-modal__head">
          <h3 class="reg-modal__title">${st.soloProponer ? 'Proponer club' : 'Registrar deportista'}</h3>
          <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button>
        </div>
        <div class="reg-modal__body">
          ${st.soloProponer ? '' : `<ol class="dp-steps">${pasos}</ol>`}
          ${st.step === 1 ? `
            ${st.existente ? avisoExistente(st.existente) : ''}
            ${campo('rdDoc', 'Número de documento', st.d.numDoc)}
            ${campo('rdNombre', 'Nombre completo', st.d.nombre)}
            ${campo('rdCorreo', 'Correo electrónico', st.d.correo, 'email')}
            <div class="dp-desv__field"><span class="bj-filter__lbl">Deporte</span>
              <div class="naowee-dropdown dp-desv__dd" data-dd="deporte"><button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"><span class="naowee-dropdown__value">${esc(st.d.deporte)}</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
              <div class="naowee-dropdown__menu" role="listbox">${deportesActor.map((x) => `<div class="naowee-dropdown__opt${x === st.d.deporte ? ' is-selected' : ''}" role="option" data-value="${esc(x)}">${esc(x)}<span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join('')}</div></div></div>
            <p class="bj-detail__note">${abajo.length ? 'Paso 1 de 2. Si el documento ya está en el SUID no se crea otra persona. Al deportista nuevo le llega un correo para completar su perfil.' : 'El deportista queda vinculado a tu club. Al deportista nuevo le llega un correo para completar su perfil.'}</p>`
          : `
            ${st.existente && !st.soloProponer ? avisoExistente(st.existente) : ''}
            ${msg('informative', I.info, `Indica el club de <strong>${esc(nombre)}</strong>${actor.tipo === 'federacion' ? ' (primero su liga)' : actor.tipo === 'comite' ? ' (primero su federación y su liga)' : ''}. El club recibe la propuesta en su bandeja y es quien la confirma; mientras tanto sigue autodeclarado.`)}
            ${fijos.length ? `<div class="dp-chain">${fijos.map((o) => `<span class="dp-chain__chip" title="Fijo: según tu organismo">${esc(TIPO_LBL[o.tipo])} · ${esc(o.nombre)}</span>`).join('')}</div>` : ''}
            ${abajo.map((t) => dd(t)).join('')}
            ${st.soloProponer ? '' : `<label class="naowee-checkbox dp-sinclub"><input type="checkbox" id="rdSinClub"${st.sinClub ? ' checked' : ''}${st.existente ? ' disabled' : ''}><span class="naowee-checkbox__box" aria-hidden="true">${I.check}</span><span class="naowee-checkbox__label">El club todavía no está en el SUID: registrarlo sin club por ahora. Queda autodeclarado y le propones el club cuando se cree.</span></label>`}`}
          ${st.err ? `<p class="naowee-helper dp-desv__err">${esc(st.err)}</p>` : ''}
        </div>
        <div class="reg-modal__foot bj-modal__foot">
          <button type="button" class="naowee-btn naowee-btn--mute" ${st.step === 2 && !st.soloProponer ? 'id="rdBack"' : 'data-close'}>${st.step === 2 && !st.soloProponer ? 'Atrás' : 'Cancelar'}</button>
          <button type="button" class="naowee-btn" id="rdOk">${okLbl}</button>
        </div>
      </div>`;
    }

    ov.addEventListener('click', (e) => {
      if (e.target === ov || e.target.closest('[data-close]')) { cerrar(); return; }
      if (e.target.closest('#rdBack')) { st.step = 1; st.err = ''; draw(); return; }
      if (e.target.closest('#rdSinClub')) { st.sinClub = e.target.closest('#rdSinClub').checked; st.err = ''; draw(); return; }
      const opt = e.target.closest('.naowee-dropdown__opt');
      const trg = e.target.closest('.naowee-dropdown__trigger');
      if (opt) {
        const key = opt.closest('[data-dd]').getAttribute('data-dd'); const v = opt.getAttribute('data-value');
        if (key === 'deporte') st.d.deporte = v;
        else { st.sel[`${key}Id`] = v; if (key === 'federacion') { delete st.sel.ligaId; delete st.sel.clubId; } if (key === 'liga') delete st.sel.clubId; }
        leer(); draw(); return;
      }
      ov.querySelectorAll('.naowee-dropdown').forEach((d) => {
        const abre = trg && d.contains(trg) && !d.classList.contains('naowee-dropdown--open');
        d.classList.toggle('naowee-dropdown--open', !!abre);
      });
      if (e.target.closest('#rdOk')) avanzar();
    });
    const leer = () => {
      if (st.step !== 1) return;
      st.d.nombre = ov.querySelector('#rdNombre')?.value.trim() ?? st.d.nombre;
      st.d.numDoc = ov.querySelector('#rdDoc')?.value.trim() ?? st.d.numDoc;
      st.d.correo = ov.querySelector('#rdCorreo')?.value.trim() ?? st.d.correo;
    };
    function avanzar() {
      leer(); st.err = '';
      if (st.step === 1) {
        const ya = personaPorDocumento(st.d.numDoc);
        if (ya && (!st.existente || st.existente.id !== ya.id)) {
          /* Primer aviso: se muestra y el siguiente clic sigue con la persona que ya existe. */
          st.existente = ya; draw(); return;
        }
        if (!ya) st.existente = null;
        if (st.existente) {
          if (st.existente.tutorId) { st.err = 'Es menor de edad: lo afilia su tutor desde su perfil.'; draw(); return; }
          if (!abajo.length) {
            if (st.existente.clubIds.includes(actor.id)) { st.err = 'Ya está vinculado a tu club.'; draw(); return; }
            asociarAutodeclarado(st.existente.id, actor.id, { responsable: (ROLES[roleCode] || {}).userName || '' });
            render(); cerrar(); toast(`${st.existente.nombre} quedó vinculado a tu club. Conserva sus datos y su correo; le avisamos a la persona y a la liga.`); return;
          }
          st.step = 2; st.sinClub = false; draw(); return;
        }
        if (!st.d.nombre || !st.d.numDoc || !/.+@.+\..+/.test(st.d.correo)) { st.err = 'Completa documento, nombre y un correo válido.'; draw(); return; }
        if (!abajo.length) {
          const dep = registrarDeportista(st.d, actor.id);
          render(); cerrar(); toast(`${dep.nombre} quedó registrado y vinculado a tu club. Le llega un correo para completar su perfil.`); return;
        }
        st.step = 2; draw(); return;
      }
      if (st.sinClub) {
        const dep = registrarDeportista(st.d, actor.id);
        render(); cerrar(); toast(`${dep.nombre} quedó registrado sin club (autodeclarado). Le llega un correo para completar su perfil.`); return;
      }
      if (!st.sel.clubId) { st.err = st.existente ? 'Elige el club que le propones.' : 'Elige el club del deportista, o márcalo sin club si el club aún no está en el SUID.'; draw(); return; }
      if (st.existente && st.existente.clubIds.includes(st.sel.clubId)) { st.err = 'Ya está vinculado a ese club.'; draw(); return; }
      const dep = st.existente || registrarDeportista(st.d, actor.id);
      proponerClub(dep.id, st.sel.clubId, actor.id);
      render(); cerrar();
      const clubNom = (getOrganismo(st.sel.clubId) || {}).nombre;
      toast(st.existente
        ? `Propuesta enviada: ${clubNom} confirma a ${dep.nombre} desde su bandeja.`
        : `${dep.nombre} quedó registrado y le llega un correo para completar su perfil. ${clubNom} confirma la propuesta desde su bandeja.`);
    }
    draw();
  }
  const toast = (t) => { if (window.naoweeToast) window.naoweeToast(t, 'success'); };
  const toastErr = (t) => { if (window.naoweeToast) window.naoweeToast(t, 'error'); };

  /* ─── El club busca un deportista autodeclarado y lo asocia (Fase 2) ───
     nao-docs, Afiliación · El flujo: «el club puede buscarlo entre los autodeclarados y asociarlo».
     Queda Vinculado de inmediato y hereda la cadena del club. Los menores no salen: los afilia su tutor. */
  function openAsociar() {
    let sel = null;
    const ov = document.createElement('div');
    ov.className = 'reg-modal-overlay dp-modal-ov';
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('is-open'));
    const cerrar = () => { ov.classList.remove('is-open'); setTimeout(() => ov.remove(), 340); };
    ov.innerHTML = `<div class="reg-modal bj-modal dp-desv">
      <div class="reg-modal__head"><h3 class="reg-modal__title">Asociar un deportista autodeclarado</h3><button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button></div>
      <div class="reg-modal__body">
        ${msg('informative', I.info, `Busca a la persona que ya se registró en el SUID y aún no tiene club. Al asociarla queda vinculada a <strong>${esc(club ? club.nombre : 'tu club')}</strong> y hereda tu liga y tu federación. A los menores los afilia su tutor.`)}
        <div class="naowee-searchbox" style="margin-top:12px"><div class="naowee-searchbox__input-wrap"><span class="naowee-searchbox__icon">${I.search}</span><input class="naowee-searchbox__input" id="asBusca" placeholder="Nombre o documento (mín. 3 caracteres)" autocomplete="off"></div></div>
        <div id="asRes" class="dp-as-res"></div>
      </div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" data-close>Cancelar</button><button type="button" class="naowee-btn" id="asOk" disabled>Asociar a mi club</button></div></div>`;
    const res = ov.querySelector('#asRes'); const inp = ov.querySelector('#asBusca'); const ok = ov.querySelector('#asOk');
    const pinta = () => {
      const q = inp.value.trim();
      const items = buscarAutodeclarados(q, club ? club.deportes : null).slice(0, 8);
      res.innerHTML = q.length < 3 ? '<p class="bj-detail__note">Escribe al menos 3 caracteres.</p>'
        : items.length ? items.map((d) => `<button type="button" class="dp-as-opt${sel === d.id ? ' is-sel' : ''}" data-id="${esc(d.id)}"><strong>${esc(d.nombre)}</strong><span>${esc(d.tipoDoc)} ${esc(d.numDoc)} · ${esc(d.deporte)}</span></button>`).join('')
        : `<p class="bj-detail__note">No hay autodeclarados de ${esc(club ? club.deporte : 'tus deportes')} con ese nombre o documento.</p>`;
      res.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => { sel = b.dataset.id; ok.disabled = false; pinta(); }));
    };
    inp.addEventListener('input', () => { sel = null; ok.disabled = true; pinta(); });
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) cerrar(); });
    ok.addEventListener('click', () => {
      if (!sel) return;
      const d = asociarAutodeclarado(sel, scopeId, { responsable: (ROLES[roleCode] || {}).userName || '' });
      cerrar(); render();
      toast(`${(d && d.nombre) || 'El deportista'} quedó vinculado a tu club.`);
    });
    pinta(); setTimeout(() => inp.focus(), 60);
  }

  /* ═══════════ Carga masiva de deportistas (DEP-609) ═══════════
     `?vista=cargue`. La usan club, liga, federación y comité (P-07 respondida, 2026-10-09);
     el territorial no. Mismo patrón que el cargue de organismos (cargue.js): plantilla .xlsx,
     validación por fila, confirmar solo las válidas, detalle de errores e historial.
     Reglas (reunión 2026-10-09 y decisión 2026-10-13):
     - Cada deportista va con su club: la liga indica el club; la federación, la liga y el club;
       el comité, la federación, la liga y el club. El club carga los suyos (sin columna).
     - El club indicado queda como PROPUESTA que el club confirma. Si carga el propio club,
       quedan vinculados. Club vacío = el club aún no está en el SUID: queda autodeclarado.
     - Documento que ya está en el SUID: no se crea otra persona, conserva su correo y solo se
       le propone el club.
     - Solo datos básicos; el resto del perfil lo completa el deportista (le llega un correo). */
  const vistaCargue = qsp('vista') === 'cargue' && puedeCrear && !terr;
  /* El club se identifica por su NIT (único en el SUID); su liga y su federación salen de él (decisión 2026-10-19). */
  const CG_COL_CLUB = 'NIT del club';
  const CG_MAX_FILAS = 5000;
  const CG_MAX_BYTES = 10 * 1024 * 1024;
  const CG_BASE = ['Tipo de documento', 'Número de documento', 'Nombres', 'Apellidos', 'Fecha de nacimiento (AAAA-MM-DD)', 'Sexo', 'Correo electrónico', 'Teléfono', 'Deporte'];
  const TIPOS_DOC = ['CC', 'TI', 'CE', 'PPT', 'PA'];
  const SEXOS = ['Mujer', 'Hombre', 'Intersexual'];
  const fmtSize = (b) => (b < 1024 ? `${b} B` : `${(b / 1024).toFixed(1)} KB`);
  const hoyISO = () => new Date().toISOString().slice(0, 10);
  let cg = { parsed: null, hecho: null };

  function cgActor() { return scopeId ? getOrganismo(scopeId) : null; }
  /* El comité no tiene deportes propios: son los de sus federaciones. */
  function deportesDeActor(actor) {
    if (actor.tipo !== 'comite') return deportesDe(actor);
    return [...new Set(childrenOf(actor.id).filter((o) => o.tipo === 'federacion').flatMap((o) => deportesDe(o)))];
  }
  function cgHeaders(actor) {
    return actor.tipo === 'club' ? [...CG_BASE] : [...CG_BASE, CG_COL_CLUB];
  }

  /* Filas de ejemplo armadas con la jurisdicción real de quien carga: dos nuevas con club, una
     persona que ya está en el SUID, una sin club y los errores típicos. */
  function cgEjemplos(actor) {
    const propiosDep = deportesDeActor(actor);
    const dep = propiosDep.includes('Patinaje') ? 'Patinaje' : (propiosDep[0] || 'Patinaje');
    const otroDeporte = ['Ciclismo', 'Fútbol', 'Natación', 'Patinaje', 'Pádel', 'Polo'].find((x) => !propiosDep.includes(x));
    const activo = (o) => o.tipo === 'club' && o.estado === 'Activo' && deportesDe(o).includes(dep);
    const propios = actor.tipo === 'club' ? [] : subtreeOf(actor.id).filter(activo);
    const ids = new Set(propios.map((o) => o.id));
    const ajeno = allOrganismos().find((o) => activo(o) && !ids.has(o.id));
    const clubA = propios[0]; const clubB = propios[1] || propios[0];
    const ya = allSolicitudes().filter((s) => s.estado === 'Enviada').map((s) => s.deportistaId);
    const existente = allDeportistasDe(dep).find((d) => d.estado === 'autodeclarado' && !ya.includes(d.id))
      || allDeportistasDe(dep).find((d) => clubA && !d.clubIds.includes(clubA.id) && !ya.includes(d.id));
    const cadena = (club) => (actor.tipo === 'club' ? [] : [club ? club.nit : '']);
    const sufijo = actor.id.replace(/\D/g, '').padStart(3, '0');
    const doc = (n) => `11${sufijo}${String(n).padStart(5, '0')}`;
    const fila = (td, nd, nom, ape, fn, sx, correo, tel, deporte, club) => [td, nd, nom, ape, fn, sx, correo, tel, deporte, ...cadena(club)];
    const rows = [
      fila('CC', doc(1), 'Mariana', 'Ceballos Ruiz', '2003-04-12', 'Mujer', 'mariana.ceballos@correo.demo.co', '3154820011', dep, clubA),
      fila('CC', doc(2), 'Juan Esteban', 'Ríos Mora', '2000-09-30', 'Hombre', 'juanesteban.rios@correo.demo.co', '3164820022', dep, clubB)
    ];
    if (existente) {
      const p = existente.nombre.split(' ');
      rows.push(fila(existente.tipoDoc, existente.numDoc, p[0], p.slice(1).join(' '), '1998-01-15', 'Mujer', 'otro.correo@correo.demo.co', '3174820033', dep, clubA));
    }
    if (actor.tipo !== 'club') rows.push(fila('CC', doc(3), 'Kevin', 'Andrade Polo', '2001-11-02', 'Hombre', 'kevin.andrade@correo.demo.co', '3184820044', dep, null));
    if (ajeno && actor.tipo !== 'club') rows.push(fila('CC', doc(4), 'Paula', 'Henao Gil', '2002-06-08', 'Mujer', 'paula.henao@correo.demo.co', '3194820055', dep, ajeno));
    rows.push(fila('CC', doc(5), 'Sergio', 'Molina Paz', '1999-03-21', 'Hombre', 'sergio.molina@correo.demo.co', '3204820066', otroDeporte, clubA));
    rows.push(fila('TI', doc(6), 'Valeria', 'Cuesta Lima', '2013-08-17', 'Mujer', 'valeria.cuesta@correo.demo.co', '3214820077', dep, clubA));
    rows.push(fila('CC', doc(1), 'Mariana', 'Ceballos Ruiz', '2003-04-12', 'Mujer', 'mariana.ceballos@correo.demo.co', '3154820011', dep, clubA));
    rows.push(fila('CC', doc(7), 'Óscar', 'Patiño Leal', '1997-12-05', 'Hombre', '', '3224820088', dep, clubB));
    return rows;
  }
  /* Personas deportistas de ese deporte, sin tutor (a los menores los afilia su tutor). */
  function allDeportistasDe(dep) {
    return allDeportistas().filter((d) => esDeportista(d) && !d.tutorId && d.deporte === dep);
  }

  function cgPlantilla() {
    const actor = cgActor();
    if (!window.XLSX) { toastErr('No se pudo cargar la librería de Excel. Revisa tu conexión.'); return; }
    const ws = window.XLSX.utils.aoa_to_sheet([cgHeaders(actor), ...cgEjemplos(actor)]);
    ws['!cols'] = cgHeaders(actor).map(() => ({ wch: 24 }));
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Deportistas');
    window.XLSX.writeFile(wb, 'plantilla-cargue-deportistas.xlsx');
  }

  const celdaFecha = (v) => {
    if (typeof v === 'number') { const d = new Date(Math.round((v - 25569) * 86400 * 1000)); return d.toISOString().slice(0, 10); }
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    return String(v == null ? '' : v).trim();
  };
  const soloDigitos = (v) => String(v == null ? '' : v).replace(/\D/g, '');
  const clubPorNit = (nit) => allOrganismos().find((o) => soloDigitos(o.nit) === soloDigitos(nit)) || null;
  /* Teléfono opcional: si viene, 7 dígitos (fijo) o 10 (celular), con o sin +57. */
  const telValido = (t) => { let n = soloDigitos(t); if (n.length === 12 && n.startsWith('57')) n = n.slice(2); return n.length === 7 || n.length === 10; };

  /* Validación por fila. Resultado: tipo 'nueva' | 'existente' | 'sinClub' | 'error'. */
  function cgValidar(body, actor) {
    const deportesActor = deportesDeActor(actor);
    const jurisdiccion = new Set(subtreeOf(actor.id).map((o) => o.id));
    /* Documento repetido: se rechazan todas sus filas, no se sabe cuál es la buena (decisión 2026-10-19). */
    const filasDe = {};
    body.forEach((raw, i) => { const n = soloDigitos(raw[1]); if (n) (filasDe[n] = filasDe[n] || []).push(i + 2); });
    return body.map((raw, i) => {
      const c = (k) => String(raw[k] == null ? '' : raw[k]).trim();
      const d = {
        tipoDoc: c(0).toUpperCase(), numDoc: c(1).replace(/\D/g, ''), nombres: c(2), apellidos: c(3),
        fechaNac: celdaFecha(raw[4]), sexo: c(5), correo: c(6), telefono: c(7), deporte: c(8)
      };
      const nitClub = actor.tipo === 'club' ? '' : c(9);
      const errores = [];
      const ya = d.numDoc ? personaPorDocumento(d.numDoc) : null;
      if (!d.numDoc) errores.push('Número de documento vacío');
      else if (filasDe[d.numDoc].length > 1) errores.push(`Documento repetido en el archivo (filas ${filasDe[d.numDoc].join(', ')})`);
      if (d.telefono && !telValido(d.telefono)) errores.push('Teléfono inválido (7 o 10 dígitos)');
      if (!ya) {
        if (!TIPOS_DOC.includes(d.tipoDoc)) errores.push('Tipo de documento inválido');
        if (!d.nombres || !d.apellidos) errores.push('Nombres o apellidos vacíos');
        if (!/^\d{4}-\d{2}-\d{2}$/.test(d.fechaNac)) errores.push('Fecha de nacimiento inválida (AAAA-MM-DD)');
        else if (edadDe(d.fechaNac) < 18) errores.push('Menor de edad: lo registra su tutor desde su perfil');
        if (!SEXOS.map(norm).includes(norm(d.sexo))) errores.push('Sexo inválido');
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.correo)) errores.push('Correo vacío o inválido');
      } else if (ya.tutorId) errores.push('Menor de edad: lo afilia su tutor');
      if (!d.deporte) errores.push('Deporte vacío');
      else if (!deportesActor.includes(d.deporte)) errores.push(`${d.deporte} no es deporte de ${actor.nombre}`);

      /* Club según quién carga. */
      let club = null; let sinClub = false;
      if (actor.tipo === 'club') club = actor;
      else if (!nitClub) sinClub = true;
      else {
        const hallado = clubPorNit(nitClub);
        if (!hallado) errores.push(`No hay un organismo con NIT ${nitClub} en el SUID`);
        else if (hallado.tipo !== 'club') errores.push(`El NIT ${nitClub} es de ${hallado.nombre}, no de un club`);
        else if (!jurisdiccion.has(hallado.id)) errores.push(`${hallado.nombre} no está en la jurisdicción de ${actor.nombre}`);
        else {
          club = hallado;
          if (club.estado !== 'Activo') errores.push(`${club.nombre} no está Activo`);
          if (d.deporte && !deportesDe(club).includes(d.deporte)) errores.push(`${club.nombre} no practica ${d.deporte}`);
        }
      }
      if (ya && club && ya.clubIds.includes(club.id)) errores.push(`Ya está vinculado a ${club.nombre}`);
      if (ya && club && allSolicitudes().some((s) => s.deportistaId === ya.id && s.clubId === club.id && s.estado === 'Enviada')) errores.push(`Ya tiene una propuesta pendiente con ${club.nombre}`);
      if (ya && sinClub) errores.push('Ya está en el SUID: indica el club para proponérselo');

      const nombre = ya ? ya.nombre : `${d.nombres} ${d.apellidos}`.trim() || '(sin nombre)';
      const tipo = errores.length ? 'error' : ya ? 'existente' : sinClub ? 'sinClub' : 'nueva';
      return { fila: i + 2, raw, nombre, doc: d.numDoc ? `${ya ? ya.tipoDoc : d.tipoDoc} ${d.numDoc}` : '—', tipo, errores, club, existenteId: ya ? ya.id : null,
        datos: { nombre, tipoDoc: d.tipoDoc, numDoc: d.numDoc, fechaNac: d.fechaNac, sexo: d.sexo, correo: d.correo, telefono: d.telefono, deporte: d.deporte, modalidad: '' } };
    });
  }

  function cgLeer(file) {
    if (file.size > CG_MAX_BYTES) { toastErr('El archivo pesa más de 10 MB.'); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = window.XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const aoa = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        const body = aoa.slice(1).filter((r) => r.some((x) => String(x).trim() !== ''));
        if (body.length > CG_MAX_FILAS) { toastErr(`El archivo tiene ${body.length} filas: el máximo es ${CG_MAX_FILAS.toLocaleString('es-CO')}. Divídelo en varios archivos.`); return; }
        cg.parsed = { archivo: file.name, tamano: file.size, filas: cgValidar(body, cgActor()) };
        renderCargue();
      } catch (_) { toastErr('No se pudo leer el archivo (.xlsx).'); }
    };
    reader.readAsArrayBuffer(file);
  }

  function cgErrores() {
    const actor = cgActor();
    const malas = cg.parsed.filas.filter((r) => r.tipo === 'error');
    const ws = window.XLSX.utils.aoa_to_sheet([[...cgHeaders(actor), 'Errores'], ...malas.map((r) => [...cgHeaders(actor).map((_, j) => r.raw[j] == null ? '' : r.raw[j]), r.errores.join(' · ')])]);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, 'Errores');
    window.XLSX.writeFile(wb, `errores-${cg.parsed.archivo.replace(/\.xlsx?$/i, '')}.xlsx`);
  }

  function cgConfirmar() {
    const actor = cgActor();
    const validas = cg.parsed.filas.filter((r) => r.tipo !== 'error');
    if (!validas.length) return;
    const responsable = (ROLES[roleCode] || {}).userName || roleCode;
    const res = cargarDeportistas(validas.map((r) => ({
      existenteId: r.existenteId, datos: r.datos, clubId: actor.tipo === 'club' ? actor.id : (r.club ? r.club.id : null)
    })), actor.id, { responsable });
    const reg = recordCargue({
      rol: roleCode, orgId: actor.id, tipo: 'deportista', fecha: hoyISO(), responsable,
      archivo: { nombre: cg.parsed.archivo, tamano: cg.parsed.tamano },
      totales: { filas: cg.parsed.filas.length, nuevos: res.nuevos.length, existentes: res.existentes.length, sinClub: res.sinClub.length, cargadas: validas.length, error: cg.parsed.filas.length - validas.length }
    });
    cg = { parsed: null, hecho: { ...res, radicado: reg.id } };
    renderCargue();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const CG_TIPO = {
    nueva: ['positive', 'Nueva'],
    existente: ['informative', 'Ya está en el SUID'],
    sinClub: ['caution', 'Nueva · sin club'],
    error: ['negative', 'Error']
  };
  const cgBadge = (t) => `<span class="naowee-badge naowee-badge--${CG_TIPO[t][0]} naowee-badge--quiet naowee-badge--small">${CG_TIPO[t][1]}</span>`;

  function cgDetalle(r, actor) {
    if (r.tipo === 'error') return `<span class="cg-errs">${esc(r.errores.join(' · '))}</span>`;
    const clubTxt = actor.tipo === 'club' ? 'Se vincula a tu club' : r.club ? `Se propone a ${esc(r.club.nombre)}; el club confirma` : 'Queda autodeclarado: el club aún no está en el SUID';
    const extra = r.tipo === 'existente'
      ? `No se crea de nuevo: conserva sus datos y su correo.${actor.tipo === 'club' ? ' Le avisamos a la persona y a la liga.' : ''}`
      : 'Le llega la invitación de Naowee para activar su cuenta.';
    return `<span class="dp-cg-det">${clubTxt}. ${extra}</span>`;
  }

  function renderCargue() {
    const actor = cgActor();
    const titulo = document.getElementById('pageTitle');
    if (titulo) titulo.textContent = 'Cargue masivo de deportistas';
    const sub = document.getElementById('pageSub');
    if (sub) sub.textContent = actor ? `Carga en lote los deportistas de ${actor.nombre} con una plantilla .xlsx.` : '';
    const box = document.getElementById('dpActions');
    if (box && !box.querySelector('#dpVolver')) {
      box.insertAdjacentHTML('beforeend', `<a class="naowee-btn naowee-btn--mute" id="dpVolver" href="${esc(urlCon({ vista: null }))}">Volver a deportistas</a>`);
    }
    const dn = document.querySelector('[data-devnote="clubTitulo"]');
    if (dn && dn.dataset.devnote !== 'cargueDep') { dn.dataset.devnote = 'cargueDep'; delete dn.dataset.mounted; dn.innerHTML = ''; }
    mountDevnotes({ cargueDep: CG_DEVNOTE });
    if (!actor) { root.innerHTML = msg('caution', I.info, 'Tu perfil no tiene un organismo para cargar deportistas.'); return; }

    const activo = actor.estado === 'Activo';
    const intro = actor.tipo === 'club'
      ? `Como <strong>${esc(actor.nombre)}</strong> cargas tus deportistas: quedan <strong>vinculados a tu club</strong>.`
      : `Como <strong>${esc(actor.nombre)}</strong> cargas deportistas con el <strong>NIT de su club</strong>; la liga y la federación salen del club. El club queda como <strong>propuesta</strong> y lo confirma desde su bandeja; mientras tanto el deportista sigue autodeclarado. Si el club aún no está en el SUID, deja el NIT vacío: queda autodeclarado.`;

    if (cg.hecho) {
      const h = cg.hecho;
      const clubes = [...new Set(h.propuestas.map((p) => p.clubId))];
      const primerClub = clubes[0] ? getOrganismo(clubes[0]) : null;
      root.innerHTML = `
        <div class="naowee-card cg-success">
          <div class="cg-success__check">${I.check}</div>
          <h2 class="cg-success__title">Cargue completado · ${esc(h.radicado)}</h2>
          <ul class="dp-cg-res">
            ${h.nuevos.length ? `<li><strong>${h.nuevos.length} ${h.nuevos.length === 1 ? 'deportista nuevo' : 'deportistas nuevos'}</strong>: les llega un correo para completar su perfil.</li>` : ''}
            ${h.existentes.length ? `<li><strong>${h.existentes.length} ya ${h.existentes.length === 1 ? 'estaba' : 'estaban'} en el SUID</strong>: ${h.existentes.length === 1 ? 'no se creó de nuevo y conserva' : 'no se crearon de nuevo y conservan'} sus datos y su correo.</li>` : ''}
            ${h.vinculados.length ? `<li><strong>${h.vinculados.length} ${h.vinculados.length === 1 ? 'quedó vinculado' : 'quedaron vinculados'}</strong> a tu club.</li>` : ''}
            ${h.propuestas.length ? `<li><strong>${h.propuestas.length} ${h.propuestas.length === 1 ? 'propuesta enviada' : 'propuestas enviadas'}</strong> a ${clubes.length} ${clubes.length === 1 ? 'club' : 'clubes'}: ${clubes.length === 1 ? 'el club la' : 'cada club las'} confirma desde su bandeja. Mientras tanto ${h.propuestas.length === 1 ? 'sigue autodeclarado' : 'siguen autodeclarados'}.</li>` : ''}
            ${h.sinClub.length ? `<li><strong>${h.sinClub.length} sin club</strong>: ${h.sinClub.length === 1 ? 'queda autodeclarado. Propónle' : 'quedan autodeclarados. Propónles'} el club cuando esté en el SUID.</li>` : ''}
          </ul>
          <div class="cg-success__actions">
            <a class="naowee-btn naowee-btn--loud" href="${esc(urlCon({ vista: null }))}">Ver deportistas</a>
            ${primerClub ? `<a class="naowee-btn naowee-btn--quiet" title="Solo demo: abre la bandeja de ese club" href="bandeja.html?role=CLUB&org=${encodeURIComponent(primerClub.id)}">Ver la bandeja de ${esc(primerClub.nombre)}</a>` : ''}
            <button type="button" class="naowee-btn naowee-btn--mute" id="cgOtro">Cargar otro archivo</button>
          </div>
        </div>
        ${cgHistorial(actor)}`;
      document.getElementById('cgOtro').addEventListener('click', () => { cg.hecho = null; renderCargue(); });
      return;
    }

    const filas = cg.parsed ? cg.parsed.filas : null;
    const n = (t) => (filas ? filas.filter((r) => r.tipo === t).length : 0);
    const validas = filas ? filas.length - n('error') : 0;
    root.innerHTML = `
      ${msg('informative', I.info, intro, 'margin-bottom:16px')}
      ${activo ? '' : msg('caution', I.info, 'Tu organismo no está <strong>Activo</strong>: no puedes cargar deportistas hasta que tu nivel superior te habilite.', 'margin-bottom:16px')}
      <div class="naowee-card cg-template">
        <div class="cg-template__body">
          <span class="cg-template__ico">${I.users}</span>
          <div>
            <p class="cg-template__title">Plantilla de deportistas (${cgHeaders(actor).length} columnas)</p>
            <p class="cg-template__sub">Datos básicos${actor.tipo === 'club' ? '' : ' y el NIT del club'}. Trae filas de ejemplo: nuevas, una persona que ya está en el SUID y errores típicos.</p>
          </div>
        </div>
        <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="cgTpl"${activo ? '' : ' disabled'}><span class="naowee-btn__ico">${I.download}</span>Descargar plantilla</button>
      </div>
      <label class="naowee-file-uploader__drop-zone cg-drop${activo ? '' : ' is-disabled'}" id="cgDrop">
        <input type="file" accept=".xlsx,.xls" id="cgInput"${activo ? '' : ' disabled'}>
        <span class="cg-drop__ico">${I.upload}</span>
        <span class="cg-drop__title">Arrastra tu archivo o haz clic para elegirlo</span>
        <span class="cg-drop__sub">Formato .xlsx o .xls · máx 10 MB y 5.000 filas</span>
      </label>
      ${filas ? `
        <div class="naowee-card cg-preview">
          <div class="cg-preview__head">
            <div class="cg-preview__file"><span>${esc(cg.parsed.archivo)}</span><span class="cg-preview__size">${fmtSize(cg.parsed.tamano)}</span></div>
            <div class="cg-preview__counts">
              <span class="naowee-badge naowee-badge--positive naowee-badge--quiet">${n('nueva') + n('sinClub')} nuevas</span>
              <span class="naowee-badge naowee-badge--informative naowee-badge--quiet">${n('existente')} ya en el SUID</span>
              <span class="naowee-badge naowee-badge--negative naowee-badge--quiet">${n('error')} con error</span>
            </div>
          </div>
          <div class="cg-table-wrap">
            <table class="cg-table">
              <thead><tr><th>Fila</th><th>Deportista</th><th>Resultado</th><th>Qué pasa</th></tr></thead>
              <tbody>
                ${filas.map((r) => `
                  <tr class="${r.tipo === 'error' ? 'is-error' : ''}">
                    <td class="cg-table__row" data-label="Fila">${r.fila}</td>
                    <td data-label="Deportista"><div class="bj-org__name">${esc(r.nombre)}</div><div class="bj-org__sub">${esc(r.doc)}</div></td>
                    <td data-label="Resultado">${cgBadge(r.tipo)}</td>
                    <td data-label="Qué pasa">${cgDetalle(r, actor)}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="cg-preview__foot">
            ${n('error') ? '<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="cgErr">Descargar errores</button>' : ''}
            <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="cgCancel">Cancelar</button>
            <button type="button" class="naowee-btn naowee-btn--loud" id="cgOk"${validas ? '' : ' disabled'}>Cargar ${validas} ${validas === 1 ? 'deportista' : 'deportistas'}</button>
          </div>
        </div>` : ''}
      ${cgHistorial(actor)}`;

    document.getElementById('cgTpl')?.addEventListener('click', cgPlantilla);
    const input = document.getElementById('cgInput'); const drop = document.getElementById('cgDrop');
    if (activo && input) {
      input.addEventListener('change', (e) => { if (e.target.files[0]) cgLeer(e.target.files[0]); });
      ['dragover', 'dragenter'].forEach((ev) => drop.addEventListener(ev, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
      ['dragleave', 'drop'].forEach((ev) => drop.addEventListener(ev, () => drop.classList.remove('is-over')));
      drop.addEventListener('drop', (e) => { e.preventDefault(); if (e.dataTransfer.files[0]) cgLeer(e.dataTransfer.files[0]); });
    }
    document.getElementById('cgOk')?.addEventListener('click', cgConfirmar);
    document.getElementById('cgErr')?.addEventListener('click', cgErrores);
    document.getElementById('cgCancel')?.addEventListener('click', () => { cg.parsed = null; renderCargue(); });
  }

  function cgHistorial(actor) {
    const lista = allCargues().filter((c) => c.tipo === 'deportista' && c.orgId === actor.id && (getDemoMode() !== 'blank' || !c.demo));
    const head = '<div class="cg-hist__head"><h3 class="cg-hist__title">Historial de cargues de deportistas</h3></div>';
    if (!lista.length) {
      return `<div class="naowee-card">${head}${emptyState('Sin cargues todavía', 'Cada archivo que cargues queda aquí con su radicado, responsable y resultado.')}</div>`;
    }
    return `<div class="naowee-card">${head}
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Radicado</th><th>Fecha</th><th>Responsable</th><th>Archivo</th><th>Resultado</th></tr></thead>
        <tbody>${lista.map((c) => `
          <tr>
            <td class="cg-table__row" data-label="Radicado">${esc(c.id)}</td>
            <td data-label="Fecha">${esc(c.fecha)}</td>
            <td data-label="Responsable">${esc(c.responsable)}</td>
            <td class="cg-table__nit" data-label="Archivo">${esc((c.archivo && c.archivo.nombre) || '—')}</td>
            <td data-label="Resultado">
              ${c.totales.nuevos ? `<span class="naowee-badge naowee-badge--positive naowee-badge--quiet naowee-badge--small">${c.totales.nuevos} nuevos</span> ` : ''}
              ${c.totales.existentes ? `<span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">${c.totales.existentes} ya en el SUID</span> ` : ''}
              ${c.totales.error ? `<span class="naowee-badge naowee-badge--negative naowee-badge--quiet naowee-badge--small">${c.totales.error} error</span>` : ''}
            </td>
          </tr>`).join('')}</tbody>
      </table></div></div>`;
  }

  /* Historial de ejemplo de la liga del Valle (modo demo con datos). */
  function cgSembrar() {
    if (getDemoMode() !== 'demo' || allCargues().some((c) => c.demo && c.tipo === 'deportista')) return;
    recordCargue({ rol: 'LIGA', orgId: 'LIG-001', tipo: 'deportista', fecha: '2026-09-22', responsable: 'Sandra Mejía', demo: true,
      archivo: { nombre: 'deportistas-liga-valle.xlsx', tamano: 16384 }, totales: { filas: 24, nuevos: 18, existentes: 4, sinClub: 1, cargadas: 22, error: 2 } });
  }

  const CG_DEVNOTE = { title: 'Carga masiva de deportistas (DEP-609)', sections: [
    { title: 'Reglas', items: [
      'La usan club, liga, federación y comité (P-07 respondida en la reunión con Producto del 2026-10-09). El territorial registra uno a uno.',
      'Columnas: datos básicos + el <strong>NIT del club</strong> (decisión 2026-10-19: el nombre tiene homónimos; el NIT es único). La liga y la federación salen del club; no van en la plantilla. El club no indica club: quedan vinculados a él.',
      'El club indicado queda como <strong>propuesta</strong> que el club confirma en su bandeja (decisión 2026-10-13); mientras tanto el deportista sigue autodeclarado.',
      'Club vacío = el club aún no está en el SUID: la fila es válida y el deportista queda autodeclarado, para proponerle el club después.',
      'Documento que ya existe en el SUID: no se crea otra persona; manda el primer registro y su correo no cambia. Solo se le propone el club. Sin club, esa fila es error aunque no tenga afiliación activa: no crea ni cambia nada (decisión 2026-10-19).',
      'Club que carga a alguien que ya existe: queda vinculado directo, igual que en el registro uno a uno; el club es quien aprueba sus afiliaciones. Le avisamos a la persona y a la liga; si no está de acuerdo, se retira (decisión 2026-10-19).',
      'Solo datos básicos. Al deportista nuevo le llega la invitación actual de Naowee (enlace de activación + contraseña temporal); no hay plantilla nueva (decisión 2026-10-19). Los datos personales adicionales los maneja él.'
    ] },
    { title: 'Validación por fila', items: [
      'Documento vacío · documento repetido en el archivo: se rechazan <strong>todas</strong> sus filas · tipo de documento · nombres y apellidos · fecha (AAAA-MM-DD) · menor de 18 (lo registra su tutor) · sexo · correo.',
      'Teléfono opcional: si viene, 7 o 10 dígitos (con o sin +57).',
      'Deporte que no es del organismo · NIT que no existe, que no es de un club, club fuera de la jurisdicción de quien carga, no Activo o que no practica el deporte.',
      'Archivo: máximo 10 MB y 5.000 filas (los del motor de lotes de user-auth-ms).',
      'Persona que ya está vinculada a ese club o que ya tiene una propuesta pendiente con él.'
    ] },
    { title: 'Back (referencia)', items: [
      'INT-125 ya tiene en user-auth-ms (staging) el motor de lotes para administradores internos: plantilla ATHLETE, validación, archivo de errores, confirmación y reporte. DEP-611 lo extiende a organismos con el NIT del club y la propuesta al club.',
      'Radicado = el código del lote; no hay otro identificador. No se guarda el archivo original: quedan el nombre, el SHA-256 y cada fila con su resultado.'
    ] }
  ] };
  if (vistaCargue) cgSembrar();
  /* ─── Wiring ─── */
  function wire() {
    const search = document.getElementById('dpSearch');
    if (search) {
      search.addEventListener('input', (e) => {
        query = e.target.value;
        page = 1;                                  /* §P19: reset de página en cada filtro */
        const pos = search.selectionStart;
        render();
        /* El re-render recrea el input: devolver foco y caret para no
           interrumpir la escritura. */
        const next = document.getElementById('dpSearch');
        if (next) { next.focus(); try { next.setSelectionRange(pos, pos); } catch (_) { /* noop */ } }
      });
    }
    document.getElementById('dpClear')?.addEventListener('click', () => {
      query = ''; page = 1; render();
      document.getElementById('dpSearch')?.focus();
    });
    wireDropdowns();                             /* delegado, se ata una sola vez */

    document.querySelectorAll('[data-ficha]').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.getAttribute('data-ficha');
        window.location.href = `perfil.html?role=${encodeURIComponent(roleCode)}&persona=${encodeURIComponent(id)}&seccion=afiliaciones&from=${encodeURIComponent('deportistas.html?role=' + roleCode)}`;
      });
    });

    document.querySelectorAll('[data-asoc]').forEach((b) => {
      b.addEventListener('click', () => openRegistro(b.getAttribute('data-asoc')));
    });
    document.querySelectorAll('[data-desv]').forEach((b) => {
      b.addEventListener('click', () => openDesvincular(b.getAttribute('data-desv')));
    });

    document.querySelectorAll('#dpPager [data-pg]').forEach((b) => {
      b.addEventListener('click', () => {
        page += b.getAttribute('data-pg') === 'next' ? 1 : -1;
        if (page < 1) page = 1;
        render();
      });
    });
    document.getElementById('dpPageInput')?.addEventListener('change', (e) => {
      const n = parseInt(e.target.value, 10);
      if (!Number.isNaN(n)) { page = Math.max(1, n); render(); }
    });
  }

  render();
}
