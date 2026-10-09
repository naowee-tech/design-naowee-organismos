/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — «Mis deportistas»: plantel afiliado (ORG-09)
   Ejerce el permiso que la matriz §11.2 YA concedía y que no tenía
   pantalla: PERMS.deportistas[CLUB] = 'R' — «sus afiliados».

   ALCANCE (deliberadamente de CONSULTA, no de gestión):
   el CLUB tiene sobre `deportistas` solo la acción R. La baja de un
   afiliado NO la inicia el club: el deportista la solicita
   (crearSolicitudRetiro) y el club la resuelve en su bandeja, donde
   sí tiene 'RA' sobre `solicitudes`. Por eso aquí no hay ningún botón
   de desafiliar — sería inventar un permiso que el handoff no da.

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
  childrenOf, ancestorsOf, registrarDeportista, asociarDeportista, faltaAsociar
} from './organismos-data.js';
import { can, scopeFor } from './permissions.js';
import { buildDeportistaDetalle } from './deportista-detalle.js';
import { ROLES } from './sidebar.js';

const root = document.getElementById('deportistasRoot');
if (root) {
  const qsp = (k) => new URLSearchParams(location.search).get(k);
  const roleCode = qsp('role') || 'MINDEPORTE';
  const scopeId = scopeFor(roleCode);
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
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
  };

  /* Estado de vinculación — mapa semántico ÚNICO del módulo. */
  const EST_VARIANT = { vinculado: 'positive', autodeclarado: 'neutral', registrado: 'caution' };
  const EST_LABEL = { vinculado: 'Vinculado', autodeclarado: 'Autodeclarado', registrado: 'Sin asociar' };
  const NIVEL_LBL = { federacion: 'federación', liga: 'liga', club: 'club' };
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
    return deportistasOf(scopeId).map((d) => {
      let p = null;
      try { p = buildDeportistaDetalle(d); } catch (_) { /* registrado sin perfil derivado */ }
      return {
        faltan: faltaAsociar(d), id: d.id, nombre: d.nombre, tipoDoc: d.tipoDoc, numDoc: d.numDoc,
        deporte: d.deporte, modalidad: d.modalidad || '—', estado: d.estado,
        edad: p ? p.edad : null, cat: p ? p.tierLabel : '—',
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
    const sinAsociar = rows.filter((r) => r.estado === 'registrado').length;
    if (puedeCrear && !esClub) {
      tiles.push({ k: sinAsociar ? 'warn' : 'neutral', ico: I.link, val: sinAsociar,
        lbl: sinAsociar === 1 ? 'Pendiente de asociar' : 'Pendientes de asociar',
        sub: sinAsociar ? 'Completa su cadena de organismos' : '' });
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
        : `Deportistas vinculados a clubes de tu jurisdicción${club ? ` (<strong>${esc(club.nombre)}</strong> y su subárbol)` : ''}. Registra deportistas y asócialos a la cadena de organismos que tienes debajo.`,
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
                    <td data-label="Estado">${estBadge(r.estado)}${r.faltan.length ? `<div class="bj-org__sub dp-falta">Falta: ${esc(r.faltan.map((n) => NIVEL_LBL[n]).join(' → '))}</div>` : ''}</td>
                    <td class="bj-row-action" data-label="">
                      ${r.faltan.length && puedeCrear ? `<button type="button" class="naowee-btn naowee-btn--small" data-asoc="${esc(r.id)}">Completar asociación</button>` : ''}
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
    box.insertAdjacentHTML('beforeend', `
      <button type="button" class="naowee-btn naowee-btn--quiet" id="dpMasivo">${I.upload}Cargue masivo de deportistas</button>
      <button type="button" class="naowee-btn naowee-btn--loud" id="dpNuevo">${I.plus}Registrar deportista</button>`);
    document.getElementById('dpNuevo').addEventListener('click', () => openRegistro());
    document.getElementById('dpMasivo').addEventListener('click', openMasivo);
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
          ${msg('caution', I.info, `Vas a desvincular a <strong>${esc(dep.nombre)}</strong> de <strong>${esc(club ? club.nombre : 'tu club')}</strong>. Quedará <strong>autodeclarado</strong> y perderá la cadena heredada (${esc(p && p.ligaNombre ? p.ligaNombre : 'liga')} · ${esc(p && p.federacionNombre ? p.federacionNombre : 'federación')}). Podrá volver a solicitar afiliación cuando quiera.`)}
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
      desvincularPorClub(id, { motivo: texto, responsable: (ROLES[roleCode] || {}).userName || '' });
      cerrar();
      render();
      if (window.naoweeToast) {
        window.naoweeToast(`${dep.nombre} quedó desvinculado de tu club.`, 'success');
      }
    });
  }

  /* ─── Registrar → Asociar (dos momentos, visibles en el modal) ───
     Lo de arriba del actor viene fijo; lo de abajo se elige en cascada. */
  const DEPORTES = ['Patinaje', 'Natación', 'Fútbol', 'Ciclismo'];
  const NIVELES_ABAJO = { comite: ['federacion', 'liga', 'club'], federacion: ['liga', 'club'], liga: ['club'], club: [] };
  const TIPO_LBL = { comite: 'Comité', federacion: 'Federación', liga: 'Liga', club: 'Club' };

  function openRegistro(depId) {
    const actor = getOrganismo(scopeId);
    if (!actor) return;
    const existente = depId ? getDeportista(depId) : null;
    const abajo = NIVELES_ABAJO[actor.tipo] || [];
    const fijos = [...ancestorsOf(actor.id).reverse(), actor];
    const st = {
      step: existente ? 2 : 1, id: existente ? existente.id : null, err: '',
      d: { nombre: '', tipoDoc: 'CC', numDoc: '', deporte: DEPORTES[0], correo: '' },
      sel: { ...((existente && existente.asocParcial) || {}) }
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

    const opciones = (tipo) => {
      const padre = tipo === 'federacion' ? actor.id : tipo === 'liga' ? (st.sel.federacionId || (actor.tipo === 'federacion' ? actor.id : null)) : (st.sel.ligaId || (actor.tipo === 'liga' ? actor.id : null));
      return padre ? childrenOf(padre).filter((o) => o.tipo === tipo && o.estado === 'Activo') : [];
    };
    const dd = (key, tipo) => {
      const ops = opciones(tipo);
      const cur = ops.find((o) => o.id === st.sel[`${tipo}Id`]);
      return `<div class="dp-desv__field">
        <span class="bj-filter__lbl">${TIPO_LBL[tipo]}</span>
        <div class="naowee-dropdown dp-desv__dd" data-dd="${tipo}">
          <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"${ops.length ? '' : ' disabled'}>
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

    function draw() {
      const pasos = ['Registro', 'Asociación'].map((t, i) => {
        const n = i + 1; const estado = st.step > n ? 'done' : st.step === n ? 'on' : '';
        return `<li class="dp-step ${estado ? `dp-step--${estado}` : ''}"><span class="dp-step__n">${estado === 'done' ? I.check : n}</span>${t}</li>`;
      }).join('<li class="dp-step__sep" aria-hidden="true"></li>');
      const nombre = existente ? existente.nombre : st.d.nombre;
      ov.innerHTML = `
      <div class="reg-modal bj-modal bj-modal--overflow dp-desv">
        <div class="reg-modal__head">
          <h3 class="reg-modal__title">${existente ? 'Completar asociación' : 'Registrar deportista'}</h3>
          <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button>
        </div>
        <div class="reg-modal__body">
          <ol class="dp-steps">${pasos}</ol>
          ${st.step === 1 ? `
            ${campo('rdNombre', 'Nombre completo', st.d.nombre)}
            ${campo('rdDoc', 'Número de documento', st.d.numDoc)}
            ${campo('rdCorreo', 'Correo electrónico', st.d.correo, 'email')}
            <div class="dp-desv__field"><span class="bj-filter__lbl">Deporte</span>
              <div class="naowee-dropdown dp-desv__dd" data-dd="deporte"><button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"><span class="naowee-dropdown__value">${esc(st.d.deporte)}</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
              <div class="naowee-dropdown__menu" role="listbox">${DEPORTES.map((x) => `<div class="naowee-dropdown__opt${x === st.d.deporte ? ' is-selected' : ''}" role="option" data-value="${x}">${x}<span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join('')}</div></div></div>
            <p class="bj-detail__note">Momento 1 de 2: el deportista queda registrado. Luego lo asocias a la cadena de organismos (puedes dejarlo para después).</p>`
          : `
            ${msg('informative', I.info, `Momento 2 de 2: asocia a <strong>${esc(nombre)}</strong>. Lo de arriba ya viene de dónde entraste y no se cambia.`)}
            <div class="dp-chain">${fijos.map((o) => `<span class="dp-chain__chip" title="Fijo: según tu organismo">${esc(TIPO_LBL[o.tipo])} · ${esc(o.nombre)}</span>`).join('')}</div>
            ${abajo.map((t) => dd(t, t)).join('') || '<p class="bj-detail__note">Como club, el deportista queda asociado a tu club automáticamente.</p>'}`}
          ${st.err ? `<p class="naowee-helper dp-desv__err">${esc(st.err)}</p>` : ''}
        </div>
        <div class="reg-modal__foot bj-modal__foot">
          <button type="button" class="naowee-btn naowee-btn--mute" data-close>${st.step === 2 ? 'Asociar después' : 'Cancelar'}</button>
          <button type="button" class="naowee-btn" id="rdOk">${st.step === 1 ? 'Registrar y continuar' : 'Guardar asociación'}</button>
        </div>
      </div>`;
    }

    ov.addEventListener('click', (e) => {
      if (e.target === ov || e.target.closest('[data-close]')) {
        if (st.id) render();
        cerrar(); return;
      }
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
        if (!st.d.nombre || !st.d.numDoc || !/.+@.+\..+/.test(st.d.correo)) { st.err = 'Completa nombre, documento y un correo válido.'; draw(); return; }
        const dep = registrarDeportista(st.d, actor.id);
        st.id = dep.id; st.step = 2;
        if (!abajo.length) { render(); cerrar(); toast(`${dep.nombre} quedó registrado y asociado a tu club.`); return; }
        render(); draw(); return;
      }
      const falta = abajo.filter((t) => !st.sel[`${t}Id`]);
      const dep = asociarDeportista(st.id, st.sel);
      render(); cerrar();
      toast(falta.length ? `${dep.nombre}: asociación parcial, falta ${falta.map((t) => NIVEL_LBL[t]).join(' y ')}.` : `${dep.nombre} quedó asociado.`);
    }
    draw();
  }
  const toast = (t) => { if (window.naoweeToast) window.naoweeToast(t, 'success'); };

  /* Cargue masivo de deportistas: entrada lista, la carga llega después. */
  function openMasivo() {
    const ov = document.createElement('div');
    ov.className = 'reg-modal-overlay dp-modal-ov';
    ov.innerHTML = `<div class="reg-modal bj-modal bj-modal--sm"><div class="reg-modal__head"><h3 class="reg-modal__title">Cargue masivo de deportistas</h3><button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button></div>
      <div class="reg-modal__body">${msg('informative', I.info, 'Próximamente: subirás una plantilla .xlsx con los deportistas y la asociación quedará como segundo paso, igual que en el registro manual.')}</div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn" data-close>Entendido</button></div></div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('is-open'));
    ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-close]')) { ov.classList.remove('is-open'); setTimeout(() => ov.remove(), 340); } });
  }

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
        window.location.href = `afiliacion.html?role=${encodeURIComponent(roleCode)}&id=${encodeURIComponent(id)}&from=deportistas`;
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
