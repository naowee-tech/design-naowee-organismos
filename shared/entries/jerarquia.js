  import {
    getRoleFromQuery, ROLES,
    mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher, nivelesForRole
  } from '../sidebar.js';
  import {
    seedDemoData, getOrganismo, childrenOf, allDeportistas,
    ancestorsOf, countDescendants, deportistasOf, estadoBadgeVariant
  } from '../organismos-data.js';
  import { ESTADOS } from '../estados.js';
  import { scopeFor } from '../permissions.js';
  import { mountDevnotes } from '../devnotes.js';

  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];

  /* Nivel de entrada (subítems del sidebar): con él las columnas abren ya posicionadas */
  const NIVELES = ['comite', 'federacion', 'liga', 'club', 'deportista'];
  const nivelQ = new URLSearchParams(window.location.search).get('nivel');
  const permitidos = nivelesForRole(roleCode).map((n) => n.id);   // solo los niveles de su rol
  const nivel = permitidos.includes(nivelQ) ? nivelQ : permitidos[0];

  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: `jerarquia-${nivel}` });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });

  /* ─── Utilidades ─── */
  const EMOJI = { comite: '🏛️', federacion: '🏅', liga: '🚩', club: '🛡️', deportista: '🏃' };
  const TYPE_LABEL = { comite: 'Comité', federacion: 'Federación', liga: 'Liga', club: 'Club', deportista: 'Deportista' };
  const CHAIN = ['COC', 'FED-040', 'LIG-001', 'CLU-001'];   // hilo conductor de la demo

  const norm = (s) => [...String(s == null ? '' : s)]
    .map((c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()).join('');
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;

  function badgeHtml(variant, text) {
    return `<span class="naowee-badge naowee-badge--${variant} naowee-badge--quiet naowee-badge--small">${esc(text)}</span>`;
  }
  function depBadge(estado) {
    return estado === 'vinculado'
      ? badgeHtml('positive', 'Vinculado')
      : badgeHtml('informative', 'Autodeclarado');
  }

  /* ─── Modelo de nodos según rol (jurisdicción) ─── */
  const scope = scopeFor(roleCode);

  function orgNode(org) {
    const children = childrenOf(org.id).map(orgNode);
    if (org.tipo === 'club') deportistasOf(org.id).forEach((d) => children.push(depNode(d)));
    return {
      kind: 'org', id: org.id, tipo: org.tipo, org,
      name: org.nombre, nit: org.nit, deporte: org.deporte, estado: org.estado, children
    };
  }
  function depNode(d) {
    return { kind: 'dep', id: d.id, tipo: 'deportista', dep: d, name: d.nombre, nit: d.numDoc, deporte: d.deporte, estado: d.estado, children: [] };
  }

  let roots = [];
  let minimalChain = false;   // deportista: vista mínima sin contadores heredados
  if (roleCode === 'DEPORTISTA') {
    minimalChain = true;
    const dep = allDeportistas().find((d) => d.id === scope);
    if (dep && dep.clubId) {
      const club = getOrganismo(dep.clubId);
      const chain = [...ancestorsOf(club.id)].reverse();   // [COC, FED-040, LIG-001]
      chain.push(club);                                    // + CLU-001
      let level = [depNode(dep)];
      for (let i = chain.length - 1; i >= 0; i--) {
        const o = chain[i];
        level = [{ kind: 'org', id: o.id, tipo: o.tipo, org: o, name: o.nombre, nit: o.nit, deporte: o.deporte, estado: o.estado, children: level }];
      }
      roots = level;
    } else if (dep) {
      roots = [depNode(dep)];   // autodeclarado — sin cadena
    }
  } else if (scope === null) {
    roots = childrenOf(null).map(orgNode);   // Mindeporte → los 3 comités
  } else {
    const own = getOrganismo(scope);
    roots = own ? [orgNode(own)] : [];
  }

  /* ─── Render del árbol (HTML) ─── */
  function countsHtml(node) {
    if (minimalChain || node.kind !== 'org') return '';
    const c = countDescendants(node.id);
    const parts = [];
    if (node.tipo === 'comite') parts.push(seg(c.federaciones, 'federación', 'federaciones'));
    if (node.tipo === 'comite' || node.tipo === 'federacion') parts.push(seg(c.ligas, 'liga', 'ligas'));
    if (node.tipo !== 'club') parts.push(seg(c.clubes, 'club', 'clubes'));
    parts.push(seg(c.deportistas, 'deportista', 'deportistas'));
    if (!parts.length) return '';
    return `<span class="jq-node__counts">${parts.join('<span aria-hidden="true">·</span>')}</span>`;
  }
  const seg = (n, s, p) => `<span class="jq-node__count${n === 0 ? ' jq-node__count--zero' : ''}"><b>${n}</b> ${n === 1 ? s : p}</span>`;

  function subHtml(node) {
    const type = `<span class="jq-node__type">${TYPE_LABEL[node.tipo]}</span>`;
    if (node.kind === 'dep') {
      const d = node.dep;
      return `${type} · ${esc(d.deporte)}${d.modalidad ? ' — ' + esc(d.modalidad) : ''} · ${esc(d.tipoDoc)} ${esc(d.numDoc)}`;
    }
    const o = node.org;
    const extra = o.tipo === 'club' && o.tipoClub ? ` ${esc(o.tipoClub)}` : '';
    const deporte = o.deporte && o.deporte !== '—' ? ` · ${esc(o.deporte)}` : (o.sector ? ` · ${esc(o.sector)}` : '');
    return `<span class="jq-node__type">${TYPE_LABEL[node.tipo]}${extra}</span>${deporte} · NIT ${esc(o.nit)}`;
  }

  /* ─── Panel de resumen ─── */
  renderSummary();
  function renderSummary() {
    const box = document.getElementById('summary');
    const info = scopeInfo();
    const stats = statsFor();
    box.innerHTML = `
      <div class="jq-summary__scope">
        <span class="jq-summary__scope-emoji">${info.emoji}</span>
        <div class="jq-summary__scope-text">
          <p class="jq-summary__scope-label">${esc(info.label)}</p>
          <p class="jq-summary__scope-name">${esc(info.name)}</p>
        </div>
        <span class="jq-summary__ro" title="Explorador de solo lectura (las acciones viven en la Bandeja)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
          Solo lectura
        </span>
      </div>
      <div class="jq-stats">
        ${stats.map((s) => `<div class="jq-stat ${s.accent ? 'jq-stat--accent' : ''}"><div class="jq-stat__val">${s.val}</div><div class="jq-stat__lbl">${esc(s.lbl)}</div></div>`).join('')}
      </div>`;
  }

  function scopeInfo() {
    if (roleCode === 'MINDEPORTE') return { emoji: '🇨🇴', label: 'Jurisdicción · rectoría del SND', name: 'Sistema Nacional del Deporte' };
    if (roleCode === 'DEPORTISTA') {
      const dep = allDeportistas().find((d) => d.id === scope);
      const club = dep && dep.clubId ? getOrganismo(dep.clubId) : null;
      return { emoji: '🏃', label: 'Deportista · tu cadena heredada', name: dep ? `${dep.nombre}${club ? ' · ' + club.nombre : ' · Sin club (autodeclarado)'}` : '—' };
    }
    const org = getOrganismo(scope);
    return { emoji: EMOJI[org.tipo], label: `${TYPE_LABEL[org.tipo]} · tu jurisdicción`, name: org.nombre };
  }

  function statsFor() {
    if (roleCode === 'DEPORTISTA') {
      const dep = allDeportistas().find((d) => d.id === scope);
      const club = dep && dep.clubId ? getOrganismo(dep.clubId) : null;
      const n = club ? 1 : 0;
      return [
        { val: n, lbl: 'Comité', accent: true }, { val: n, lbl: 'Federación' },
        { val: n, lbl: 'Liga' }, { val: n, lbl: 'Club' }
      ];
    }
    const c = countDescendants(scope);
    if (roleCode === 'MINDEPORTE') {
      return [
        { val: childrenOf(null).length, lbl: 'Comités', accent: true },
        { val: c.federaciones, lbl: 'Federaciones' }, { val: c.ligas, lbl: 'Ligas' },
        { val: c.clubes, lbl: 'Clubes' }, { val: c.deportistas, lbl: 'Deportistas' }
      ];
    }
    if (roleCode === 'COMITE') return [{ val: c.federaciones, lbl: 'Federaciones', accent: true }, { val: c.ligas, lbl: 'Ligas' }, { val: c.clubes, lbl: 'Clubes' }, { val: c.deportistas, lbl: 'Deportistas' }];
    if (roleCode === 'FEDERACION') return [{ val: c.ligas, lbl: 'Ligas', accent: true }, { val: c.clubes, lbl: 'Clubes' }, { val: c.deportistas, lbl: 'Deportistas' }];
    if (roleCode === 'LIGA') return [{ val: c.clubes, lbl: 'Clubes', accent: true }, { val: c.deportistas, lbl: 'Deportistas' }];
    return [{ val: c.deportistas, lbl: 'Deportistas afiliados', accent: true }];   // CLUB
  }

  /* ─── Estado del filtro (dropdown por estado) ─── */
  let currentEstado = 'todos';
  const ESTADO_VARIANT = { Preinscrito: 'neutral', 'En revisión': 'caution', Activo: 'positive', Rechazado: 'negative', Suspendido: 'caution', Inactivo: 'neutral', Cancelado: 'negative' };
  const DOT_COLOR = { positive: 'var(--green)', caution: '#d98a00', negative: 'var(--red)', neutral: 'var(--text-secondary)', informative: 'var(--blue-info)' };

  const estadoMenu = document.getElementById('estadoMenu');
  const estadoOpts = [{ v: 'todos', label: 'Todos los estados' }, ...ESTADOS.map((e) => ({ v: e, label: e }))];
  estadoMenu.innerHTML = estadoOpts.map((o) => {
    const dot = o.v === 'todos' ? '' : `<span class="jq-dd-dot" style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${DOT_COLOR[ESTADO_VARIANT[o.v]]}"></span>`;
    return `<div class="naowee-dropdown__opt ${o.v === 'todos' ? 'is-selected' : ''}" role="option" data-value="${o.v}">
        ${dot}<span class="jq-dd-label">${o.label}</span>
        <span class="naowee-dropdown__opt-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      </div>`;
  }).join('');

  const estadoDd = document.getElementById('estadoDd');
  const estadoTrigger = document.getElementById('estadoTrigger');
  const estadoValue = document.getElementById('estadoValue');
  estadoTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = estadoDd.classList.toggle('naowee-dropdown--open');
    estadoTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', (e) => { if (!estadoDd.contains(e.target)) { estadoDd.classList.remove('naowee-dropdown--open'); estadoTrigger.setAttribute('aria-expanded', 'false'); } });
  estadoMenu.addEventListener('click', (e) => {
    const opt = e.target.closest('.naowee-dropdown__opt');
    if (!opt) return;
    currentEstado = opt.dataset.value;
    estadoMenu.querySelectorAll('.naowee-dropdown__opt').forEach((o) => o.classList.toggle('is-selected', o === opt));
    estadoValue.textContent = opt.querySelector('.jq-dd-label').textContent;
    estadoDd.classList.remove('naowee-dropdown--open');
    estadoTrigger.setAttribute('aria-expanded', 'false');
    applyView();
  });

  /* ─── Buscador ─── */
  const searchBox = document.getElementById('searchBox');
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  searchInput.addEventListener('input', () => {
    searchBox.classList.toggle('naowee-searchbox--has-value', searchInput.value.length > 0);
    applyView();
  });
  searchClear.addEventListener('click', () => { searchInput.value = ''; searchBox.classList.remove('naowee-searchbox--has-value'); applyView(); searchInput.focus(); });

  /* ─── Navegación por columnas ───
     Máx. 3 niveles visibles (2 en tablet, 1 en móvil); el resto vive en el rastro. */
  const byId = new Map();
  const parentOf = new Map();
  (function index(list, parent) {
    list.forEach((n) => { byId.set(n.id, n); parentOf.set(n.id, parent); index(n.children, n); });
  })(roots, null);
  const totalOrgs = [...byId.values()].filter((n) => n.kind === 'org').length;

  const ancestorIds = (id) => {
    const out = [];
    for (let p = parentOf.get(id); p; p = parentOf.get(p.id)) out.unshift(p.id);
    return out;
  };

  /* Se parte solo de la raíz: cada nivel se abre al tocar, de uno en uno */
  const fullRoots = roots;
  const PLURAL = { comite: 'Comités', federacion: 'Federaciones', liga: 'Ligas', club: 'Clubes', deportista: 'Deportistas' };

  /* Admin: la primera columna es el nivel pedido (lista plana). Con alcance: se entra
     sin nada abierto: solo la lista hasta que el usuario abra un nivel. */
  function entryState() {
    if (roleCode === 'DEPORTISTA') {   // su cadena, hasta el club
      return { list: fullRoots, ids: [] };
    }
    // Lo que está debajo de mí: el rol no se ve a sí mismo; el nivel elegido en el sidebar es la raíz
    const base = roleCode === 'MINDEPORTE' ? fullRoots : fullRoots.flatMap((n) => n.children);
    const collect = (list) => list.flatMap((n) => (n.tipo === nivel ? [n] : []).concat(collect(n.children)));
    const list = collect(base);
    return { list, ids: [] };   // se entra con la lista sola; el usuario abre cada nivel
  }
  const entry = entryState();
  roots = entry.list;
  let path = entry.ids;
  let flashId = null;

  const tree = document.getElementById('tree');
  const treeCard = document.getElementById('treeCard');
  const emptyState = document.getElementById('emptyState');

  const colsFor = () => { const w = treeCard.clientWidth; return w < 560 ? 1 : w < 900 ? 2 : 3; };
  const fichaUrl = (id) => `afiliacion.html?role=${roleCode}&id=${encodeURIComponent(id)}&from=jerarquia`;
  const detailUrl = (id) => `organismo-detalle.html?id=${encodeURIComponent(id)}&role=${roleCode}`;
  const CHILD_LABEL = { comite: 'Federaciones', federacion: 'Ligas', liga: 'Clubes', club: 'Deportistas' };

  function levelsFor(p) {
    const levels = [{ parent: null, nodes: roots }];
    let cur = roots;
    for (const id of p) {
      const n = cur.find((x) => x.id === id);
      if (!n || !n.children.length) break;
      levels.push({ parent: n, nodes: n.children });
      cur = n.children;
    }
    return levels;
  }

  function itemHtml(node, depth, selected, trail) {
    const hasKids = node.children.length > 0;
    const isOrg = node.kind === 'org';
    const badge = node.kind === 'dep' ? depBadge(node.estado) : badgeHtml(estadoBadgeVariant(node.estado), node.estado);
    const end = hasKids
      ? `<span class="jq-item__lbl">Ver ${CHILD_LABEL[node.tipo].toLowerCase()}</span><svg class="jq-item__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>`
      : '';
    const cls = `jq-item jq-item--${node.tipo}${selected ? ' is-selected' : ''}${node.id === flashId ? ' is-flash' : ''}`;
    const inner = `
      <span class="jq-node__emoji" aria-hidden="true">${EMOJI[node.tipo]}</span>
      <span class="jq-node__main">
        <span class="jq-node__title"><span class="jq-node__name" title="${esc(node.name)}">${esc(node.name)}</span>${badge}</span>
        <span class="jq-node__sub">${subHtml(node)}</span>
        ${trail ? `<span class="jq-item__trail">${trail}</span>` : countsHtml(node)}
      </span>
      <span class="jq-item__end">${end}</span>`;
    // Abre el siguiente panel solo si tiene contenido (o si viene de resultados, para ubicarlo)
    const open = hasKids || depth < 0
      ? `<button type="button" class="jq-item__open" data-id="${esc(node.id)}" data-depth="${depth}"${hasKids ? ` aria-pressed="${selected}"` : ''}>${inner}</button>`
      : `<div class="jq-item__open jq-item__open--static">${inner}</div>`;
    const foot = isOrg
      ? `<a class="jq-item__detail${hasKids ? '' : ' jq-item__detail--leaf'}" href="${detailUrl(node.id)}" aria-label="Ver detalles de ${esc(node.name)}">Ver detalles</a>`
      : (node.tipo === 'deportista'
        ? `<a class="jq-item__detail jq-item__detail--leaf" href="${fichaUrl(node.id)}" aria-label="Ver ficha de ${esc(node.name)}">Ver ficha</a>`
        : '');
    return `<li><div class="${cls}" data-id="${esc(node.id)}">${open}${foot}</div></li>`;
  }

  function columnHtml(level, depth) {
    const parent = level.parent;
    const kickerLabel = parent ? CHILD_LABEL[parent.tipo] : PLURAL[level.nodes[0] ? level.nodes[0].tipo : nivel];
    const kicker = `${kickerLabel}<span class="jq-col__count">${level.nodes.length}</span>`;
    const title = parent ? parent.name : (roleCode === 'MINDEPORTE' ? 'Sistema Nacional del Deporte' : (fullRoots[0] ? fullRoots[0].name : 'Inicio'));
    const btnClose = depth > 0
      ? `<button type="button" class="jq-col__close" data-close="${depth}" aria-label="Cerrar ${esc(title)}" title="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>` : '';
    const actions = btnClose;
    return `
      <section class="jq-col" data-depth="${depth}" aria-label="${esc(title)}">
        <header class="jq-col__head">
          <span class="jq-col__headtext"><span class="jq-col__title">${esc(title)}</span><span class="jq-col__kicker">${kicker}</span></span>
          ${actions}
        </header>
        <ul class="jq-col__list">${level.nodes.map((n) => itemHtml(n, depth, path[depth] === n.id, '')).join('')}</ul>
      </section>`;
  }

  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SLIDE = { duration: 280, easing: 'cubic-bezier(.22,.8,.3,1)' };
  let animateNext = false;

  /* Scroll animado (600ms) de la lista hasta `to`; sin animación con prefers-reduced-motion */
  function scrollListTo(list, to) {
    const max = list.scrollHeight - list.clientHeight;
    const target = Math.max(0, Math.min(to, max));
    const from = list.scrollTop;
    if (REDUCED || Math.abs(target - from) < 2) { list.scrollTop = target; return; }
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 600);
      list.scrollTop = from + (target - from) * (1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function renderColumns() {
    const before = new Map();
    const prevScroll = new Map();
    tree.querySelectorAll('.jq-col').forEach((c) => {
      before.set(c.dataset.depth, c.getBoundingClientRect().left);
      prevScroll.set(c.dataset.depth, c.querySelector('.jq-col__list')?.scrollTop || 0);
    });
    const levels = levelsFor(path);
    const cols = colsFor();
    const first = Math.max(0, levels.length - cols);
    tree.className = 'jq-cols';
    tree.dataset.cols = String(cols);
    tree.innerHTML = levels.slice(first).map((lv, i) => columnHtml(lv, first + i)).join('');
    // en móvil, la columna nueva arranca arriba; en el resto, el scroll es propio de cada columna
    tree.querySelectorAll('.jq-col__list').forEach((l) => {
      const d = l.closest('.jq-col').dataset.depth;
      l.scrollTop = prevScroll.get(d) || 0;   // conserva el scroll de las columnas que ya estaban
      // el seleccionado sube al tope de su columna (si está entre los últimos, el scroll lo frena solo)
      const sel = l.querySelector('.jq-item.is-selected');
      if (sel) scrollListTo(l, l.scrollTop + sel.getBoundingClientRect().top - l.getBoundingClientRect().top);
    });
    if (animateNext && !REDUCED && before.size) slideColumns(before);
    animateNext = false;
  }

  /* Todo se empuja: al abrir, el conjunto se desplaza a la izquierda; al cerrar, a la derecha */
  function slideColumns(before) {
    const maxBefore = Math.max(...[...before.keys()].map(Number));
    tree.querySelectorAll('.jq-col').forEach((c) => {
      const d = c.dataset.depth;
      const w = c.getBoundingClientRect().width;
      if (before.has(d)) {
        const dx = before.get(d) - c.getBoundingClientRect().left;
        if (Math.abs(dx) > 1) c.animate([{ transform: `translateX(${dx}px)` }, { transform: 'none' }], SLIDE);
      } else {
        const from = Number(d) > maxBefore ? w : -w;
        c.animate([{ transform: `translateX(${from}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }], SLIDE);
      }
    });
  }

  /* Con búsqueda o filtro activo: un solo listado plano con la ruta de cada resultado */
  function renderResults(q, est) {
    const matches = [...byId.values()].filter((n) => {
      if (q && !norm([n.name, n.nit, n.deporte].filter(Boolean).join(' ')).includes(q)) return false;
      if (est !== 'todos' && (n.kind !== 'org' || n.estado !== est)) return false;
      return true;
    });
    emptyState.classList.toggle('is-shown', matches.length === 0);
    tree.className = 'jq-results';
    tree.style.display = matches.length === 0 ? 'none' : '';
    tree.innerHTML = `<ul class="jq-col__list">${matches.map((n) => {
      const trail = ancestorIds(n.id).map((id) => esc(byId.get(id).name)).join(' › ');
      return itemHtml(n, -1, false, trail || 'Raíz de tu jurisdicción');
    }).join('')}</ul>`;
  }

  function applyView() {
    const q = norm(searchInput.value.trim());
    const active = q !== '' || currentEstado !== 'todos';
    if (active) { renderResults(q, currentEstado); return; }
    emptyState.classList.remove('is-shown');
    tree.style.display = '';
    renderColumns();
  }

  function setPath(next, focusId, moveFocus) {
    animateNext = true;
    path = next;
    flashId = null;
    applyView();
    const target = moveFocus
      ? tree.querySelector('.jq-col:last-child .jq-item__open')
      : tree.querySelector(`.jq-item__open[data-id="${CSS.escape(focusId || '')}"]`);
    if (target && target.focus) target.focus({ preventScroll: true });
  }

  tree.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) {   // cierra esta columna (y las de su derecha, que dependen de ella)
      const d = Number(closeBtn.dataset.close);
      const out = [...tree.querySelectorAll('.jq-col')].filter((c) => Number(c.dataset.depth) >= d);
      const done = () => setPath(path.slice(0, d - 1), path[d - 1], false);
      if (REDUCED || !out.length) { done(); return; }
      Promise.all(out.map((c) => c.animate([{ transform: 'none', opacity: 1 }, { transform: `translateX(${c.offsetWidth}px)`, opacity: 0 }], { duration: 200, easing: 'ease-in', fill: 'forwards' }).finished)).then(done);
      return;
    }
    const item = e.target.closest('button.jq-item__open');
    if (!item) return;
    const node = byId.get(item.dataset.id);
    if (!node) return;
    const depth = Number(item.dataset.depth);
    if (depth < 0) {   // vino de la lista de resultados: se limpia y se ubica en su columna
      const anc = ancestorIds(node.id);
      searchInput.value = ''; searchBox.classList.remove('naowee-searchbox--has-value');
      currentEstado = 'todos'; estadoValue.textContent = 'Todos los estados';
      estadoMenu.querySelectorAll('.naowee-dropdown__opt').forEach((o) => o.classList.toggle('is-selected', o.dataset.value === 'todos'));
        const own = roleCode !== 'MINDEPORTE' && roleCode !== 'DEPORTISTA' ? fullRoots[0] : null;
      const trail = node.children.length ? anc.concat(node.id) : anc;
      if (own && node.id !== own.id) { roots = own.children; path = trail.filter((id) => id !== own.id); }   // sin verme a mí
      else { roots = fullRoots; path = trail; }
      flashId = node.id;
      applyView();
      tree.querySelector(`.jq-item__open[data-id="${CSS.escape(node.id)}"]`)?.focus({ preventScroll: true });
      return;
    }
    setPath(path.slice(0, depth).concat(node.id), node.id, tree.dataset.cols === '1');
  });

  document.getElementById('clearFilters').addEventListener('click', () => {
    searchInput.value = ''; searchBox.classList.remove('naowee-searchbox--has-value');
    currentEstado = 'todos'; estadoValue.textContent = 'Todos los estados';
    estadoMenu.querySelectorAll('.naowee-dropdown__opt').forEach((o) => o.classList.toggle('is-selected', o.dataset.value === 'todos'));
    applyView();
  });

  /* Al cambiar el ancho (rotar, abrir sidebar) se recalcula cuántas columnas caben */
  let lastCols = colsFor();
  new ResizeObserver(() => {
    const c = colsFor();
    if (c !== lastCols) { lastCols = c; if (tree.classList.contains('jq-cols')) { renderColumns(); } }
  }).observe(treeCard);

  applyView();   // estado inicial

  /* ─── Notas para devs (solo demo) ─── */
  mountDevnotes({ jerarquia: { title: 'Jerarquía SND · cómo funciona por dentro', sections: [
    { title: 'Alcance por rol', items: [
      '<code>scopeFor(rol)</code> da el organismo ancla; el árbol es su subárbol (<code>childrenOf</code> + deportistas de cada club). MINDEPORTE no tiene ancla y ve todo.',
      'Un rol nunca se ve a sí mismo ni a sus ancestros: la primera columna arranca en los hijos de su ancla. DEPORTISTA ve solo su cadena hasta el club (<code>minimalChain</code>, sin contadores heredados).',
      'Es una vista de <strong>solo lectura</strong>: aprobar, rechazar o corregir vive en la Bandeja.'
    ] },
    { title: 'Relación con el sidebar', items: [
      '<code>nivelesForRole(rol)</code> (shared/sidebar.js) define los niveles que cuelgan de «Jerarquía SND»; cada subítem abre esta página con <code>?nivel=</code>.',
      'El nivel pedido es la <strong>raíz</strong> de la primera columna (lista plana de ese tipo). Si <code>?nivel=</code> no está permitido para el rol, cae al primero permitido.',
      'El ítem activo del sidebar se fija al nivel de entrada y <strong>no sigue</strong> a las columnas que el usuario abre o cierra.',
      'Con un solo nivel debajo (rol CLUB) no hay jerarquía que explorar: <code>jerarquiaItems</code> no pinta la entrada.'
    ] },
    { title: 'Columnas y estado', items: [
      'Todo el estado de navegación es <code>path</code>: ids abiertos, uno por columna. <code>levelsFor(path)</code> deriva las columnas; abrir un ítem = <code>path.slice(0, depth).concat(id)</code>.',
      'Se entra sin nada abierto (<code>path = []</code>): solo la primera lista, hasta que el usuario abre un nivel.',
      'Visibles: 3 columnas (≥900px), 2 (≥560px) o 1 en móvil (<code>colsFor</code>, sobre el ancho de la tarjeta, no del viewport). Las demás viven en <code>path</code>; un ResizeObserver recalcula.',
      'Las columnas anteriores bajan a opacidad .8 y escala de grises (<code>filter: grayscale</code>, no <code>mix-blend-mode</code>, porque ese no se anima) y recuperan color y opacidad 1 con hover o foco; la transición dura .6s; el ítem seleccionado sube al tope de su columna con scroll animado de 600ms (<code>scrollListTo</code>, ease-out; las columnas que ya estaban conservan su scroll al re-renderizar).',
      'Animación de empuje con Web Animations (<code>slideColumns</code>); se omite con <code>prefers-reduced-motion</code>.'
    ] },
    { title: 'Botones de cada fila', items: [
      '<strong>Fila</strong> (botón): abre el siguiente nivel con <code>aria-pressed</code>. Solo es botón si tiene hijos (o viene de resultados); si no, es estática.',
      '<strong>Chevron</strong>: aparece solo con hijos; en hover <strong>del propio botón</strong> (no de toda la fila; solo ≥1024px) o foco de la fila se despliega «Ver &lt;siguiente nivel&gt;» (<code>CHILD_LABEL</code>).',
      '<strong>Ver detalles</strong>: organismos → <code>organismo-detalle.html?id=</code>. <strong>Ver ficha</strong>: deportistas → <code>afiliacion.html?id=…&amp;from=jerarquia</code>; el «Volver» de la ficha honra <code>from</code>.',
      '<strong>X</strong> de la columna: cierra esa columna y las de su derecha (<code>data-close</code>) con animación de salida; es la única forma de subir de nivel en móvil.'
    ] },
    { title: 'Búsqueda y filtro', items: [
      'Con texto o estado activo el árbol se reemplaza por una lista plana de coincidencias con su ruta de ancestros (<code>renderResults</code>, depth −1). Búsqueda sin tildes (<code>norm</code>) por nombre, NIT/documento o deporte.',
      'Al elegir un resultado se limpian los filtros y se reconstruye <code>path</code> con sus ancestros (<code>ancestorIds</code>) para ubicarlo; un rol con ancla recorta su propia raíz.'
    ] }
  ] } });
