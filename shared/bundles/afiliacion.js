(() => {
  // shared/sidebar.js
  var COLLAPSED_KEY = "naowee-organismos-sidebar-collapsed";
  var ICONS = {
    sitemap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v4M5 17v-2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2M12 11v3"/></svg>',
    inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    filePlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c0-1.5 1.5-2.2 3-2.2s3 .7 3 2.2"/><line x1="15" y1="10" x2="18" y2="10"/><line x1="15" y1="13" x2="18" y2="13"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  };
  ICONS.user = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  ICONS.doc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>';
  ICONS.club = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>';
  ICONS.cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>';
  ICONS.award = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/></svg>';
  ICONS.gear = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';
  ICONS.bell = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
  ICONS.shield = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><polyline points="9 12 11 14 15 10"/></svg>';
  ICONS.level = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>';
  function getIcon(name) {
    return ICONS[name] || "";
  }
  var ROLES = {
    MINDEPORTE: {
      code: "MINDEPORTE",
      label: "Admin Mindeporte",
      userName: "Mar\xEDa F. Rojas",
      userEmail: "maria.rojas@mindeporte.demo.co",
      userDoc: "CC 41.234.567",
      org: "Ministerio del Deporte",
      avatar: "MR",
      color: "#002B5B",
      short: "Rector\xEDa del SND \xB7 registra comit\xE9s, ve toda la jerarqu\xEDa y aprueba federaciones",
      group: "Rector\xEDa"
    },
    COMITE: {
      code: "COMITE",
      label: "Comit\xE9 (COC)",
      userName: "Camilo Duarte",
      userEmail: "cduarte@coc.demo.co",
      userDoc: "CC 79.456.123",
      org: "Comit\xE9 Ol\xEDmpico Colombiano",
      avatar: "CD",
      color: "#d74009",
      short: "Cabeza de sector \xB7 pre-registra y avala las federaciones de su sector",
      group: "Cabezas de sector"
    },
    FEDERACION: {
      code: "FEDERACION",
      label: "Federaci\xF3n",
      userName: "Alberto Herrera",
      userEmail: "presidencia@fedepatinaje.demo.co",
      userDoc: "CC 16.789.234",
      org: "Fed. Colombiana de Patinaje",
      avatar: "AH",
      color: "#1f78d1",
      short: "Aprueba sus ligas \xB7 cargue masivo de ligas de su deporte",
      group: "Organismos"
    },
    LIGA: {
      code: "LIGA",
      label: "Liga",
      userName: "Sandra Mej\xEDa",
      userEmail: "direccion@ligapatinajevalle.demo.co",
      userDoc: "CC 31.567.890",
      org: "Liga de Patinaje del Valle",
      avatar: "SM",
      color: "#7c3aed",
      short: "Aprueba sus clubes \xB7 cargue masivo de clubes de su liga",
      group: "Organismos"
    },
    CLUB: {
      code: "CLUB",
      label: "Club",
      userName: "\xD3scar Cardona",
      userEmail: "admin@clubpatincali.demo.co",
      userDoc: "CC 94.321.678",
      org: "Club Pat\xEDn Cali",
      avatar: "OC",
      color: "#1f8923",
      short: "Confirma la afiliaci\xF3n de sus deportistas",
      group: "Organismos"
    },
    DEPORTISTA: {
      code: "DEPORTISTA",
      label: "Deportista",
      userName: "Valentina Ortiz",
      userEmail: "valentina.ortiz@correo.demo.co",
      userDoc: "CC 1.144.556.778",
      org: "\u2014",
      avatar: "VO",
      color: "#0e7490",
      short: "Gestiona su afiliaci\xF3n a un club deportivo",
      group: "Personas",
      deportistaId: "DEP-001"
    },
    /* v1.6.0 · perfil multi-rol: una persona con varias facetas
       (deportista + tutora legal + personal de apoyo) en un solo perfil. */
    PERSONA: {
      code: "PERSONA",
      label: "Persona multi-rol",
      userName: "Laura G\xF3mez",
      userEmail: "laura.gomez@correo.co",
      userDoc: "CC 1.032.987.456",
      org: "\u2014",
      avatar: "LG",
      color: "#0e7490",
      short: "Deportista, tutora legal y entrenadora: un solo perfil",
      group: "Personas"
    }
  };
  var NIVELES_JERARQUIA = [["comite", "Comit\xE9s"], ["federacion", "Federaciones"], ["liga", "Ligas"], ["club", "Clubes"], ["deportista", "Deportistas"]];
  var NIVEL_PROPIO = { MINDEPORTE: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista" };
  function nivelesForRole(code) {
    const propio = NIVELES_JERARQUIA.findIndex(([n]) => n === NIVEL_PROPIO[code]);
    return NIVELES_JERARQUIA.slice(propio + 1).map(([n, label]) => ({ id: n, label }));
  }
  var jerarquiaItems = (code) => {
    const hijos = nivelesForRole(code);
    if (hijos.length === 1) return [];
    return [
      { id: "jerarquia", label: "Jerarqu\xEDa SND", icon: "sitemap", route: "jerarquia.html" },
      ...hijos.map(({ id, label }) => ({ id: `jerarquia-${id}`, label, icon: "level", route: `jerarquia.html?nivel=${id}`, child: true }))
    ];
  };
  var MENU_BY_ROLE = {
    MINDEPORTE: [
      { section: null, items: jerarquiaItems("MINDEPORTE") },
      { section: "GESTI\xD3N", items: [
        { id: "bandeja", label: "Bandeja de aprobaciones", icon: "inbox", route: "bandeja.html" },
        { id: "registro", label: "Registro de organismo", icon: "filePlus", route: "registro.html" }
      ] }
    ],
    COMITE: [
      { section: null, items: jerarquiaItems("COMITE") },
      { section: "MI SECTOR", items: [
        { id: "bandeja", label: "Mis federaciones", icon: "inbox", route: "bandeja.html" },
        { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
      ] },
      { section: "DEPORTISTAS", items: [
        { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
      ] }
    ],
    FEDERACION: [
      { section: null, items: jerarquiaItems("FEDERACION") },
      { section: "MIS LIGAS", items: [
        { id: "bandeja", label: "Mis ligas", icon: "inbox", route: "bandeja.html" },
        { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
      ] },
      { section: "DEPORTISTAS", items: [
        { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
      ] }
    ],
    LIGA: [
      { section: null, items: jerarquiaItems("LIGA") },
      { section: "MIS CLUBES", items: [
        { id: "bandeja", label: "Mis clubes", icon: "inbox", route: "bandeja.html" },
        { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
      ] },
      { section: "DEPORTISTAS", items: [
        { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
      ] }
    ],
    CLUB: [
      { section: null, items: jerarquiaItems("CLUB") },
      /* «Mis deportistas» (ORG-09) primero: es el plantel ya afiliado — el
         estado permanente del club. La bandeja es el trabajo pendiente. */
      { section: "DEPORTISTAS", items: [
        { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" },
        { id: "bandeja", label: "Solicitudes de deportistas", icon: "inbox", route: "bandeja.html" }
      ] }
    ],
    /* Las secciones del perfil son páginas (afiliacion.html?sec=…): el menú lateral las lista, no hay nav interna */
    DEPORTISTA: [
      { section: "PERFIL", items: [
        { id: "afiliacion-resumen", label: "Resumen", icon: "id", route: "afiliacion.html?sec=resumen" },
        { id: "afiliacion-documentos", label: "Documentos", icon: "doc", route: "afiliacion.html?sec=documentos", badge: "1" },
        { id: "afiliacion-carne", label: "Carn\xE9 digital", icon: "id", route: "afiliacion.html?sec=carne" }
      ] },
      { section: "AFILIACI\xD3N", items: [
        { id: "afiliacion-miclub", label: "Mi club", icon: "club", route: "afiliacion.html?sec=miclub" },
        { id: "afiliacion-solicitudes", label: "Solicitudes", icon: "link", route: "afiliacion.html?sec=solicitudes" }
      ] },
      { section: "DEPORTIVO", items: [
        { id: "afiliacion-eventos", label: "Eventos", icon: "cal", route: "afiliacion.html?sec=eventos" },
        { id: "afiliacion-historial", label: "Historial", icon: "award", route: "afiliacion.html?sec=historial" }
      ] },
      { section: "CUENTA", items: [
        { id: "afiliacion-config", label: "Configuraciones", icon: "gear", route: "afiliacion.html?sec=config" },
        { id: "afiliacion-notif", label: "Notificaciones", icon: "bell", route: "afiliacion.html?sec=notif" },
        { id: "afiliacion-seguridad", label: "Seguridad", icon: "shield", route: "afiliacion.html?sec=seguridad" }
      ] }
    ],
    PERSONA: [
      { section: null, items: [{ id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html" }] }
    ]
  };
  function getRoleFromQuery() {
    const params2 = new URLSearchParams(window.location.search);
    const code = params2.get("role");
    return ROLES[code] ? code : "MINDEPORTE";
  }
  function getMenuForRole(code) {
    return MENU_BY_ROLE[code] || MENU_BY_ROLE.MINDEPORTE;
  }
  function homeForRole(code) {
    if (code === "CLUB") return "bandeja.html";
    if (code === "DEPORTISTA") return "afiliacion.html";
    if (code === "PERSONA") return "perfil.html";
    return "jerarquia.html";
  }
  function hrefForItem(item, roleCode2) {
    if (item.route && item.route.includes(".html")) {
      const sep = item.route.includes("?") ? "&" : "?";
      return `${item.route}${sep}role=${roleCode2}`;
    }
    return null;
  }
  function mountSidebar({ rootEl, roleCode: roleCode2, activeId }) {
    const role2 = ROLES[roleCode2] || ROLES.MINDEPORTE;
    const sections = getMenuForRole(role2.code);
    const isCollapsed = localStorage.getItem(COLLAPSED_KEY) === "1";
    rootEl.innerHTML = renderSidebar({ sections, activeId, isCollapsed, roleCode: role2.code });
    bindSidebarEvents(rootEl);
    setupTooltips(rootEl);
    return { role: role2, sections };
  }
  function renderSection(section, activeId, roleCode2) {
    return `
    ${section.section ? `<div class="nav-section">${section.section}</div>` : ""}
    ${section.items.map((it) => renderRow(it, activeId, roleCode2)).join("")}
  `;
  }
  function renderRow(item, activeId, roleCode2) {
    const isActive = item.id === activeId || item.id === "jerarquia" && String(activeId).startsWith("jerarquia-");
    const href = hrefForItem(item, roleCode2);
    const tag = href ? "a" : "div";
    const hrefAttr = href ? ` href="${href}"` : "";
    return `
    <${tag} class="nav-row ${item.child ? "nav-row--child" : ""} ${isActive ? "active" : ""}" data-id="${item.id}"${hrefAttr}>
      ${isActive && !item.child ? '<span class="active-bar" aria-hidden="true"></span>' : ""}
      <span class="icon">${getIcon(item.icon)}</span>
      <span class="lbl">${item.label}</span>
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ""}
    </${tag}>
  `;
  }
  function renderSidebar({ sections, activeId, isCollapsed, roleCode: roleCode2 }) {
    return `
    <aside class="sidebar ${isCollapsed ? "collapsed" : ""}" id="naoweeSidebar">
      <div class="sidebar-logo">
        <button class="burger-btn" id="sidebarToggle" type="button" aria-label="Colapsar men\xFA">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#282834" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
        <img src="shared/logos/ministerio.svg" alt="Ministerio del Deporte" class="sb-logo-img"/>
        <div class="logo-sep"></div>
        <img src="shared/logos/suid.png" alt="SUID" class="sb-logo-img"/>
      </div>
      <nav class="sidebar-nav" id="sidebarNav" role="navigation" aria-label="Men\xFA principal">
        ${sections.map((s) => renderSection(s, activeId, roleCode2)).join("")}
      </nav>
    </aside>
  `;
  }
  function bindSidebarEvents(rootEl) {
    const sidebar = rootEl.querySelector(".sidebar");
    const toggle = rootEl.querySelector("#sidebarToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        localStorage.setItem(COLLAPSED_KEY, sidebar.classList.contains("collapsed") ? "1" : "0");
      });
    }
    rootEl.querySelectorAll(".nav-row:not([href])").forEach((row) => {
      row.addEventListener("click", () => {
        var _a;
        if (row.classList.contains("active")) return;
        flashPlaceholder(((_a = row.querySelector(".lbl")) == null ? void 0 : _a.textContent) || "Esta secci\xF3n");
        closeDrawer();
      });
    });
    rootEl.querySelectorAll(".nav-row[href]").forEach((row) => {
      row.addEventListener("click", closeDrawer);
    });
  }
  var _toastTimer = null;
  function flashPlaceholder(label) {
    let toast2 = document.getElementById("evToast");
    if (!toast2) {
      toast2 = document.createElement("div");
      toast2.id = "evToast";
      toast2.setAttribute("role", "status");
      document.body.appendChild(toast2);
    }
    toast2.textContent = `${label}: pantalla disponible en una pr\xF3xima fase de la demo.`;
    toast2.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast2.classList.remove("is-visible"), 2600);
  }
  var _tooltipEl = null;
  function setupTooltips(rootEl) {
    const sidebar = rootEl.querySelector(".sidebar");
    if (!sidebar) return;
    if (!_tooltipEl) {
      _tooltipEl = document.createElement("div");
      _tooltipEl.className = "nav-tooltip";
      document.body.appendChild(_tooltipEl);
    }
    function show(row) {
      if (!sidebar.classList.contains("collapsed") || window.innerWidth < 1024) return;
      const lbl = row.querySelector(".lbl");
      if (!lbl) return;
      _tooltipEl.textContent = lbl.textContent.trim();
      const r = row.getBoundingClientRect();
      _tooltipEl.style.left = `${r.right + 12}px`;
      _tooltipEl.style.top = `${r.top + r.height / 2}px`;
      _tooltipEl.classList.add("is-visible");
    }
    function hide() {
      if (_tooltipEl) _tooltipEl.classList.remove("is-visible");
    }
    rootEl.querySelectorAll(".nav-row").forEach((row) => {
      row.addEventListener("mouseenter", () => show(row));
      row.addEventListener("mouseleave", hide);
    });
    new MutationObserver(hide).observe(sidebar, { attributes: true, attributeFilter: ["class"] });
  }
  function openDrawer() {
    document.body.classList.add("has-mobile-drawer-open");
  }
  function closeDrawer() {
    document.body.classList.remove("has-mobile-drawer-open");
  }
  function mountHeader({ headerEl, role: role2 }) {
    const initials = role2.avatar || (role2.userName || role2.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    headerEl.innerHTML = `
    <button class="header-burger" id="headerBurger" type="button" aria-label="Abrir men\xFA">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="profile-switcher" id="profileSwitcher">
      <div class="user-chip" id="userChipTrigger" role="button" tabindex="0" aria-haspopup="menu" aria-label="Mi cuenta">
        <div class="ava">
          <div class="ava-ring" style="background:${role2.color}22;color:${role2.color}">${initials}</div>
          <div class="ava-dot"></div>
        </div>
        <div class="user-info">
          <span class="user-name">${role2.userName}</span>
          <span class="user-role">${role2.label}</span>
        </div>
        <button class="user-chip__chevron" type="button" tabindex="-1" aria-hidden="true">${getIcon("chevron")}</button>
      </div>
      <div class="profile-dd profile-dd--identity-only" role="menu">
        <div class="profile-dd__header">
          <span class="ava-ring" style="width:42px;height:42px;font-size:14px;background:${role2.color}22;color:${role2.color}">${initials}</span>
          <div class="profile-dd__user">
            <strong>${role2.userName}</strong>
            <span class="profile-dd__doc">${getIcon("id")}${role2.userDoc || "\u2014"}</span>
            <span class="profile-dd__current-role" style="color:${role2.color}">
              <span class="profile-dd__check-ico">${getIcon("check")}</span>${role2.label}${role2.org && role2.org !== "\u2014" ? ` \xB7 ${role2.org}` : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
    bindHeaderEvents(headerEl);
  }
  function bindHeaderEvents(headerEl) {
    const switcher = headerEl.querySelector("#profileSwitcher");
    const trigger = headerEl.querySelector("#userChipTrigger");
    const burger = headerEl.querySelector("#headerBurger");
    if (burger) burger.addEventListener("click", openDrawer);
    if (!switcher || !trigger) return;
    const toggle = (e) => {
      e.stopPropagation();
      switcher.classList.toggle("open");
    };
    trigger.addEventListener("click", toggle);
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(e);
      }
    });
    document.addEventListener("click", (e) => {
      if (!switcher.contains(e.target)) switcher.classList.remove("open");
    });
  }
  function mountBackdrop() {
    let bd = document.querySelector(".shell-backdrop");
    if (!bd) {
      bd = document.createElement("div");
      bd.className = "shell-backdrop";
      document.body.appendChild(bd);
    }
    bd.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      var _a, _b;
      if (e.key === "Escape") {
        closeDrawer();
        (_a = document.getElementById("profileSwitcher")) == null ? void 0 : _a.classList.remove("open");
        (_b = document.getElementById("demoSwitcher")) == null ? void 0 : _b.classList.remove("is-open");
      }
    });
  }
  var MODE_KEY = "naowee-organismos-demo-mode";
  var TOUR_KEY = "naowee-organismos-tour-seen";
  function getDemoMode() {
    const m = localStorage.getItem(MODE_KEY);
    return m === "blank" || m === "demo" ? m : "demo";
  }
  var ROLE_GROUPS = [
    { label: "Rector\xEDa", codes: ["MINDEPORTE"] },
    { label: "Cabezas de sector", codes: ["COMITE"] },
    { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
    { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
  ];
  function demoToast(msg) {
    let toast2 = document.getElementById("evToast");
    if (!toast2) {
      toast2 = document.createElement("div");
      toast2.id = "evToast";
      toast2.setAttribute("role", "status");
      document.body.appendChild(toast2);
    }
    toast2.textContent = msg;
    toast2.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast2.classList.remove("is-visible"), 2600);
  }
  function mountDemoSwitcher({ roleCode: roleCode2 }) {
    const current = ROLES[roleCode2] || ROLES.MINDEPORTE;
    const renderItem = (p) => {
      const isActive = p.code === current.code;
      const ini = p.avatar || (p.userName || p.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
      return `
      <a class="demo-role-switcher__item ${isActive ? "is-active" : ""}"
         href="#" data-perfil="${p.code}">
        <span class="demo-role-switcher__item-avatar" style="background:${p.color}22;color:${p.color}">${ini}</span>
        <span class="demo-role-switcher__item-meta">
          <span class="demo-role-switcher__item-name">${p.userName || p.label}</span>
          <span class="demo-role-switcher__item-role">${p.label}${p.org && p.org !== "\u2014" ? ` \xB7 ${p.org}` : ""}</span>
        </span>
        ${isActive ? `<span class="demo-role-switcher__check">${getIcon("check")}</span>` : ""}
      </a>`;
    };
    const listHtml = ROLE_GROUPS.map((g) => {
      const items = g.codes.map((c) => ROLES[c]).filter(Boolean).map(renderItem).join("");
      if (!items) return "";
      return `<div class="demo-role-switcher__group-label">${g.label}</div>${items}`;
    }).join("");
    const root = document.createElement("div");
    root.className = "demo-role-switcher";
    root.id = "demoSwitcher";
    root.innerHTML = `
    <button class="demo-role-switcher__toggle" id="demoSwitcherToggle" type="button" aria-haspopup="true" aria-expanded="false">
      <span class="demo-role-switcher__badge">DEMO</span>
      <span class="demo-role-switcher__avatar" style="background:${current.color}22;color:${current.color}">${current.avatar || "OR"}</span>
      <span>Cambiar perfil</span>
      <span class="demo-role-switcher__chev">${getIcon("chevron")}</span>
    </button>
    <div class="demo-role-switcher__panel" id="demoSwitcherPanel" role="menu">
      <div class="demo-role-switcher__panel-label">CAMBIAR DE PERFIL (SIMULADO)</div>
      <div class="demo-role-switcher__list">${listHtml}</div>
      <div class="demo-role-switcher__mode-section">
        <div class="demo-role-switcher__mode-label">MODO DEMO</div>
        <div class="demo-role-switcher__mode-switch" role="group" aria-label="Modo demo">
          <button type="button" class="demo-role-switcher__mode-btn" data-mode="blank" title="Estado vac\xEDo \u2014 para recorrer el flujo paso a paso">Guiado \xB7 vac\xEDo</button>
          <button type="button" class="demo-role-switcher__mode-btn" data-mode="demo" title="Datos de ejemplo cargados para explorar">Libre \xB7 con datos</button>
        </div>
      </div>
      <div class="demo-role-switcher__panel-footer">
        <button type="button" class="demo-role-switcher__action" id="demoRestartTourBtn">${getIcon("refresh")}<span>Reiniciar tour</span></button>
        <button type="button" class="demo-role-switcher__action demo-role-switcher__action--quiet" id="demoResetBtn" title="Limpia el state de la demo">Reiniciar demo</button>
      </div>
    </div>
  `;
    document.body.appendChild(root);
    bindDemoSwitcher(root);
  }
  function bindDemoSwitcher(root) {
    var _a, _b;
    const toggle = root.querySelector("#demoSwitcherToggle");
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = root.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!root.contains(e.target)) root.classList.remove("is-open");
    });
    root.querySelectorAll("[data-perfil]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const next = item.getAttribute("data-perfil");
        if (!ROLES[next]) return;
        const params2 = new URLSearchParams(window.location.search);
        if (params2.get("role") === next) {
          root.classList.remove("is-open");
          return;
        }
        window.location.href = `${homeForRole(next)}?role=${next}`;
      });
    });
    const syncMode = () => {
      const cur = getDemoMode();
      root.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.mode === cur ? "true" : "false");
      });
    };
    syncMode();
    root.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const mode = b.dataset.mode;
        if (mode === getDemoMode()) return;
        localStorage.setItem(MODE_KEY, mode);
        syncMode();
        root.classList.remove("is-open");
        window.dispatchEvent(new CustomEvent("organismos:demo-mode", { detail: { mode } }));
        setTimeout(() => demoToast(
          mode === "demo" ? "Modo libre: datos de ejemplo cargados." : "Modo guiado: estado vac\xEDo para recorrer el flujo."
        ), 160);
      });
    });
    (_a = root.querySelector("#demoRestartTourBtn")) == null ? void 0 : _a.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem(TOUR_KEY);
      root.classList.remove("is-open");
      demoToast("Tour reiniciado \u2014 se mostrar\xE1 en tu pr\xF3xima visita.");
    });
    (_b = root.querySelector("#demoResetBtn")) == null ? void 0 : _b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.confirm("\xBFReiniciar la demo? Se borran los organismos, solicitudes y datos que creaste y se restablecen el modo y el tour.")) {
        [sessionStorage, localStorage].forEach((store) => {
          for (let i = store.length - 1; i >= 0; i--) {
            const k = store.key(i);
            if (k && k.startsWith("naowee-organismos-")) store.removeItem(k);
          }
        });
        window.location.href = "index.html";
      }
    });
  }

  // shared/organismos-data.js
  var COMITES = [
    { id: "COC", tipo: "comite", nombre: "Comit\xE9 Ol\xEDmpico Colombiano", nit: "860028097-1", sector: "Ol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000100", nombre: "Camilo", apellido: "Duarte", correo: "presidencia@coc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550001", correo: "contacto@coc.demo.co" }, fechaRegistro: "2025-11-02" },
    { id: "CPC", tipo: "comite", nombre: "Comit\xE9 Paral\xEDmpico Colombiano", nit: "830500110-4", sector: "Paral\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000101", nombre: "Marcela", apellido: "R\xEDos", correo: "presidencia@cpc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06" }, contacto: { telefono: "6014801515", correo: "contacto@paralimpicocol.demo.co" }, fechaRegistro: "2025-11-05" },
    { id: "FSC", tipo: "comite", nombre: "Federaci\xF3n Sordol\xEDmpica de Colombia", nit: "900700221-2", sector: "Sordol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000102", nombre: "Hern\xE1n", apellido: "P\xE9rez", correo: "presidencia@sordolimpico.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114" }, contacto: { telefono: "6045551020", correo: "contacto@sordolimpico.demo.co" }, fechaRegistro: "2025-11-08" }
  ];
  var FEDERACIONES_COC = [
    { id: "FED-001", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Actividades Subacu\xE1ticas", nit: "890315463-9", sector: "Ol\xEDmpico", deporte: "Actividades Subacu\xE1ticas", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000001", nombre: "Andr\xE9s", apellido: "Vargas Guzm\xE1n", correo: "presidencia@fedeactividadessubac.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550002", correo: "contacto@fedeactividadessubac.demo.co" }, fechaRegistro: "2026-02-02" },
    { id: "FED-002", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Ajedrez", nit: "860016595-0", sector: "Ol\xEDmpico", deporte: "Ajedrez", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000002", nombre: "Carolina", apellido: "Pineda Zuluaga", correo: "presidencia@fedeajedrez.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550003", correo: "contacto@fedeajedrez.demo.co" }, fechaRegistro: "2026-03-03" },
    { id: "FED-003", tipo: "federacion", nombre: "Federaci\xF3n Arqueros de Colombia", nit: "811030815-6", sector: "Ol\xEDmpico", deporte: "Arqueros de Colombia", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000003", nombre: "Fernando", apellido: "Escobar C\xE1rdenas", correo: "presidencia@fedearquerosdecolomb.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Carrera 66B No. 31A -15" }, contacto: { telefono: "6015550004", correo: "contacto@fedearquerosdecolomb.demo.co" }, fechaRegistro: "2026-04-04" },
    { id: "FED-004", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Atletismo", nit: "860075776-9", sector: "Ol\xEDmpico", deporte: "Atletismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000004", nombre: "Diana", apellido: "Cano Reyes", correo: "presidencia@fedeatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550005", correo: "contacto@fedeatletismo.demo.co" }, fechaRegistro: "2026-05-05" },
    { id: "FED-005", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Automovilismo Deportivo", nit: "860047439-2", sector: "Ol\xEDmpico", deporte: "Automovilismo Deportivo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000005", nombre: "Ricardo", apellido: "Ram\xEDrez Castro", correo: "presidencia@fedeautomovilismodep.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 102 a No. 49a-24" }, contacto: { telefono: "6015550006", correo: "contacto@fedeautomovilismodep.demo.co" }, fechaRegistro: "2026-06-06" },
    { id: "FED-006", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de B\xE1dminton", nit: "900094889-8", sector: "Ol\xEDmpico", deporte: "B\xE1dminton", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000006", nombre: "Marcela", apellido: "C\xE1rdenas Escobar", correo: "presidencia@fedebadminton.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Transv. 21 BIS No. 60-35/39 Barrio San Luis" }, contacto: { telefono: "6015550007", correo: "contacto@fedebadminton.demo.co" }, fechaRegistro: "2026-01-07" },
    { id: "FED-007", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Baile Deportivo", nit: "900856525-3", sector: "Ol\xEDmpico", deporte: "Baile Deportivo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000007", nombre: "Juli\xE1n", apellido: "Salazar L\xF3pez", correo: "presidencia@fedebailedeportivo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 59A #2c-67" }, contacto: { telefono: "6015550008", correo: "contacto@fedebailedeportivo.demo.co" }, fechaRegistro: "2026-02-08" },
    { id: "FED-008", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Baloncesto", nit: "860038199-1", sector: "Ol\xEDmpico", deporte: "Baloncesto", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000008", nombre: "Paola", apellido: "Franco Arango", correo: "presidencia@fedebaloncesto.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avenida Carrera 30 # 64-81" }, contacto: { telefono: "6015550009", correo: "contacto@fedebaloncesto.demo.co" }, fechaRegistro: "2026-03-09" },
    { id: "FED-009", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Balonmano", nit: "900359754-1", sector: "Ol\xEDmpico", deporte: "Balonmano", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000009", nombre: "Sebasti\xE1n", apellido: "Hern\xE1ndez G\xF3mez", correo: "presidencia@fedebalonmano.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 36 No. 5B3-62 Piso 2 Oficina 201" }, contacto: { telefono: "6015550010", correo: "contacto@fedebalonmano.demo.co" }, fechaRegistro: "2026-04-10" },
    { id: "FED-010", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de B\xE9isbol", nit: "890480480-1", sector: "Ol\xEDmpico", deporte: "B\xE9isbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000010", nombre: "Natalia", apellido: "Mej\xEDa Su\xE1rez", correo: "presidencia@fedebeisbol.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Centro la Matuna Edificio CONCASA Of. 404" }, contacto: { telefono: "6015550011", correo: "contacto@fedebeisbol.demo.co" }, fechaRegistro: "2026-05-11" },
    { id: "FED-011", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Billar", nit: "860061869-4", sector: "Ol\xEDmpico", deporte: "Billar", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000011", nombre: "Camilo", apellido: "Arango Franco", correo: "presidencia@fedebillar.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 402" }, contacto: { telefono: "6015550012", correo: "contacto@fedebillar.demo.co" }, fechaRegistro: "2026-06-12" },
    { id: "FED-012", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Bowling", nit: "860533073-5", sector: "Ol\xEDmpico", deporte: "Bowling", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000012", nombre: "Adriana", apellido: "Bravo Rojas", correo: "presidencia@fedebowling.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avda. Calle 63 No. 68-99 2do. Piso Bolera El Salitre" }, contacto: { telefono: "6015550013", correo: "contacto@fedebowling.demo.co" }, fechaRegistro: "2026-01-13" },
    { id: "FED-013", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Boxeo", nit: "800231411-7", sector: "Ol\xEDmpico", deporte: "Boxeo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000013", nombre: "Mauricio", apellido: "Rodr\xEDguez Naranjo", correo: "presidencia@fedeboxeo.demo.co" }, ubicacion: { depto: "Atlantico", ciudad: "Barranquilla", zona: "Urbana", direccion: "Cra. 38 No. 52-52 Edificio JT Oficina 1" }, contacto: { telefono: "6015550014", correo: "contacto@fedeboxeo.demo.co" }, fechaRegistro: "2026-02-14" },
    { id: "FED-014", tipo: "federacion", nombre: "Federaci\xF3n Clubes de Bridge de Colombia", nit: "900572599-8", sector: "Ol\xEDmpico", deporte: "Bridge", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000014", nombre: "Luc\xEDa", apellido: "Castro Ram\xEDrez", correo: "presidencia@fedebridge.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 7 A No. 69 - 07 Barrio Quinta Camacho" }, contacto: { telefono: "6015550015", correo: "contacto@fedebridge.demo.co" }, fechaRegistro: "2026-03-15" },
    { id: "FED-015", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Canotaje", nit: "830083646-4", sector: "Ol\xEDmpico", deporte: "Canotaje", parentId: "COC", estado: "En revisi\xF3n", repLegal: { tipoDoc: "CC", numDoc: "10000015", nombre: "Gustavo", apellido: "Quintero Betancur", correo: "presidencia@fedecanotaje.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Transversal 21 bis No. 60-35/39 Teusaquillo" }, contacto: { telefono: "6015550016", correo: "contacto@fedecanotaje.demo.co" }, fechaRegistro: "2026-04-16" },
    { id: "FED-016", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Ciclismo", nit: "860020863-5", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000016", nombre: "\xC1ngela", apellido: "Naranjo Rodr\xEDguez", correo: "presidencia@fedeciclismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 47 No. 106 A - 37 Barrio Estoril" }, contacto: { telefono: "6015550017", correo: "contacto@fedeciclismo.demo.co" }, fechaRegistro: "2026-05-17" },
    { id: "FED-017", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Coleo", nit: "822003697-9", sector: "Ol\xEDmpico", deporte: "Coleo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000017", nombre: "Felipe", apellido: "Zuluaga Pineda", correo: "presidencia@fedecoleo.demo.co" }, ubicacion: { depto: "Meta", ciudad: "Villavicencio", zona: "Urbana", direccion: "Camino Ganadero Parque las Malocas Centro Ecuestre Of. 04" }, contacto: { telefono: "6015550018", correo: "contacto@fedecoleo.demo.co" }, fechaRegistro: "2026-06-18" },
    { id: "FED-018", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Deportes A\xE9reos", nit: "830066529-9", sector: "Ol\xEDmpico", deporte: "Deportes A\xE9reos", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000018", nombre: "Sandra", apellido: "Torres Duarte", correo: "presidencia@fededeportesaereos.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "carrera 26 # 72-73" }, contacto: { telefono: "6015550019", correo: "contacto@fededeportesaereos.demo.co" }, fechaRegistro: "2026-01-19" },
    { id: "FED-019", tipo: "federacion", nombre: "Federaci\xF3n Colombiana Deportiva Militar", nit: "800230729-9", sector: "Ol\xEDmpico", deporte: "Deportiva Militar", parentId: "COC", estado: "En revisi\xF3n", repLegal: { tipoDoc: "CC", numDoc: "10000019", nombre: "\xD3scar", apellido: "Su\xE1rez Mej\xEDa", correo: "presidencia@fededeportivamilitar.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 59a # 44b-29 Barrio la Esmeralda" }, contacto: { telefono: "6015550020", correo: "contacto@fededeportivamilitar.demo.co" }, fechaRegistro: "2026-02-20" },
    { id: "FED-020", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Disco Volador", nit: "901154209-1", sector: "Ol\xEDmpico", deporte: "Disco Volador", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000020", nombre: "Valeria", apellido: "Molina Cort\xE9s", correo: "presidencia@fedediscovolador.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550021", correo: "contacto@fedediscovolador.demo.co" }, fechaRegistro: "2026-03-21" },
    { id: "FED-021", tipo: "federacion", nombre: "Federaci\xF3n Ecuestre de Colombia", nit: "860025991-2", sector: "Ol\xEDmpico", deporte: "Ecuestre", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000021", nombre: "Hern\xE1n", apellido: "Duarte Torres", correo: "presidencia@fedeecuestre.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 98 No. 21 - 36 Oficina 602 Edificio Centro 98" }, contacto: { telefono: "6015550022", correo: "contacto@fedeecuestre.demo.co" }, fechaRegistro: "2026-04-22" },
    { id: "FED-022", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Escalada Deportiva", nit: "900645499-4", sector: "Ol\xEDmpico", deporte: "Escalada Deportiva", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000022", nombre: "Claudia", apellido: "L\xF3pez Salazar", correo: "presidencia@fedeescaladadeportiv.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 21 # 50-34" }, contacto: { telefono: "6015550023", correo: "contacto@fedeescaladadeportiv.demo.co" }, fechaRegistro: "2026-05-23" },
    { id: "FED-023", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Esgrima", nit: "830016532-8", sector: "Ol\xEDmpico", deporte: "Esgrima", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000023", nombre: "Rodrigo", apellido: "Ospina Mart\xEDnez", correo: "presidencia@fedeesgrima.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avenida Ciudad de Quito #64-81 oficina 602" }, contacto: { telefono: "6015550024", correo: "contacto@fedeesgrima.demo.co" }, fechaRegistro: "2026-06-24" },
    { id: "FED-024", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Esqu\xED N\xE1utico y Wakeboard", nit: "860503520-8", sector: "Ol\xEDmpico", deporte: "Esqu\xED N\xE1utico y Wakeboard", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000024", nombre: "Patricia", apellido: "Betancur Quintero", correo: "presidencia@fedeesquinauticoywak.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550025", correo: "contacto@fedeesquinauticoywak.demo.co" }, fechaRegistro: "2026-01-25" },
    { id: "FED-025", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Fisicoculturismo", nit: "900134600-1", sector: "Ol\xEDmpico", deporte: "Fisicoculturismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000025", nombre: "Iv\xE1n", apellido: "Reyes Cano", correo: "presidencia@fedefisicoculturismo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 12 C No. 24 A - 119 Barrio Las Americas" }, contacto: { telefono: "6015550026", correo: "contacto@fedefisicoculturismo.demo.co" }, fechaRegistro: "2026-02-26" },
    { id: "FED-026", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de F\xFAtbol", nit: "860033879-9", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000026", nombre: "M\xF3nica", apellido: "Mart\xEDnez Ospina", correo: "presidencia@fedefutbol.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 45 A No. 94-06 Pisos 6 7 y 8" }, contacto: { telefono: "6015550027", correo: "contacto@fedefutbol.demo.co" }, fechaRegistro: "2026-03-27" },
    { id: "FED-027", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de F\xFAtbol de Sal\xF3n", nit: "860052688-1", sector: "Ol\xEDmpico", deporte: "F\xFAtbol de Sal\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000027", nombre: "Alberto", apellido: "Rojas Bravo", correo: "presidencia@fedefutboldesalon.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 26a #61c-07 Campin" }, contacto: { telefono: "6015550028", correo: "contacto@fedefutboldesalon.demo.co" }, fechaRegistro: "2026-04-01" },
    { id: "FED-028", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Gimnasia", nit: "860535259-7", sector: "Ol\xEDmpico", deporte: "Gimnasia", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000028", nombre: "Liliana", apellido: "Guzm\xE1n Vargas", correo: "presidencia@fedegimnasia.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550029", correo: "contacto@fedegimnasia.demo.co" }, fechaRegistro: "2026-05-02" },
    { id: "FED-029", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Golf", nit: "860006815-3", sector: "Ol\xEDmpico", deporte: "Golf", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000029", nombre: "Nicol\xE1s", apellido: "Cort\xE9s Molina", correo: "presidencia@fedegolf.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 7a No. 72 - 64 Interior 30 Chapinero" }, contacto: { telefono: "6015550030", correo: "contacto@fedegolf.demo.co" }, fechaRegistro: "2026-06-03" },
    { id: "FED-030", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Jiu-Jitsu", nit: "900123386-0", sector: "Ol\xEDmpico", deporte: "Jiu-Jitsu", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000030", nombre: "Beatriz", apellido: "G\xF3mez Hern\xE1ndez", correo: "presidencia@fedejiujitsu.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 7" }, contacto: { telefono: "6015550031", correo: "contacto@fedejiujitsu.demo.co" }, fechaRegistro: "2026-01-04" },
    { id: "FED-031", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Judo", nit: "860532945-8", sector: "Ol\xEDmpico", deporte: "Judo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000031", nombre: "Andr\xE9s", apellido: "Vargas Guzm\xE1n", correo: "presidencia@fedejudo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 4 Of. 407" }, contacto: { telefono: "6015550032", correo: "contacto@fedejudo.demo.co" }, fechaRegistro: "2026-02-05" },
    { id: "FED-032", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de K\xE1rate Do", nit: "800101126-5", sector: "Ol\xEDmpico", deporte: "K\xE1rate Do", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000032", nombre: "Carolina", apellido: "Pineda Zuluaga", correo: "presidencia@fedekaratedo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 4" }, contacto: { telefono: "6015550033", correo: "contacto@fedekaratedo.demo.co" }, fechaRegistro: "2026-03-06" },
    { id: "FED-033", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Karts", nit: "860065896-1", sector: "Ol\xEDmpico", deporte: "Karts", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000033", nombre: "Fernando", apellido: "Escobar C\xE1rdenas", correo: "presidencia@fedekarts.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550034", correo: "contacto@fedekarts.demo.co" }, fechaRegistro: "2026-04-07" },
    { id: "FED-034", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Levantamiento de Pesas", nit: "890480912-1", sector: "Ol\xEDmpico", deporte: "Levantamiento de Pesas", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000034", nombre: "Diana", apellido: "Cano Reyes", correo: "presidencia@fedelevantamientodep.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 39 No. 9 - 31 Santiago de Cali" }, contacto: { telefono: "6015550035", correo: "contacto@fedelevantamientodep.demo.co" }, fechaRegistro: "2026-05-08" },
    { id: "FED-035", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Lucha", nit: "890310137-1", sector: "Ol\xEDmpico", deporte: "Lucha", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000035", nombre: "Ricardo", apellido: "Ram\xEDrez Castro", correo: "presidencia@fedelucha.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Calle 45 FF No. 75 - 37" }, contacto: { telefono: "6015550036", correo: "contacto@fedelucha.demo.co" }, fechaRegistro: "2026-06-09" },
    { id: "FED-036", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Motociclismo", nit: "800176937-3", sector: "Ol\xEDmpico", deporte: "Motociclismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000036", nombre: "Marcela", apellido: "C\xE1rdenas Escobar", correo: "presidencia@fedemotociclismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 706" }, contacto: { telefono: "6015550037", correo: "contacto@fedemotociclismo.demo.co" }, fechaRegistro: "2026-01-10" },
    { id: "FED-037", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Moton\xE1utica", nit: "811022609-1", sector: "Ol\xEDmpico", deporte: "Moton\xE1utica", parentId: "COC", estado: "Suspendido", repLegal: { tipoDoc: "CC", numDoc: "10000037", nombre: "Juli\xE1n", apellido: "Salazar L\xF3pez", correo: "presidencia@fedemotonautica.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 45 # 66B-15 Salitre Greco" }, contacto: { telefono: "6015550038", correo: "contacto@fedemotonautica.demo.co" }, fechaRegistro: "2026-02-11" },
    { id: "FED-038", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Nataci\xF3n", nit: "890308001-0", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000038", nombre: "Paola", apellido: "Franco Arango", correo: "presidencia@fedenatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 9B No. 27 - 49 Barrio Champana" }, contacto: { telefono: "6015550039", correo: "contacto@fedenatacion.demo.co" }, fechaRegistro: "2026-03-12" },
    { id: "FED-039", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Orientaci\xF3n", nit: "804013044-7", sector: "Ol\xEDmpico", deporte: "Orientaci\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000039", nombre: "Sebasti\xE1n", apellido: "Hern\xE1ndez G\xF3mez", correo: "presidencia@fedeorientacion.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550040", correo: "contacto@fedeorientacion.demo.co" }, fechaRegistro: "2026-04-13" },
    { id: "FED-040", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Patinaje", nit: "860077223-7", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000040", nombre: "Alberto", apellido: "Herrera", correo: "presidencia@fedepatinaje.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 74 No. 25 F - 10 Barrio Modelia" }, contacto: { telefono: "6015550041", correo: "contacto@fedepatinaje.demo.co" }, fechaRegistro: "2026-05-14" },
    { id: "FED-041", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Porrismo", nit: "901057369-6", sector: "Ol\xEDmpico", deporte: "Porrismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000041", nombre: "Camilo", apellido: "Arango Franco", correo: "presidencia@fedeporrismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 11 #146-75 Ed. 147" }, contacto: { telefono: "6015550042", correo: "contacto@fedeporrismo.demo.co" }, fechaRegistro: "2026-06-15" },
    { id: "FED-042", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Rugby", nit: "900429096-4", sector: "Ol\xEDmpico", deporte: "Rugby", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000042", nombre: "Adriana", apellido: "Bravo Rojas", correo: "presidencia@federugby.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Calle 59 #70-124" }, contacto: { telefono: "6015550043", correo: "contacto@federugby.demo.co" }, fechaRegistro: "2026-01-16" },
    { id: "FED-043", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Sambo", nit: "900262915-2", sector: "Ol\xEDmpico", deporte: "Sambo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000043", nombre: "Mauricio", apellido: "Rodr\xEDguez Naranjo", correo: "presidencia@fedesambo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 38A No. 7-05 El Templete" }, contacto: { telefono: "6015550044", correo: "contacto@fedesambo.demo.co" }, fechaRegistro: "2026-02-17" },
    { id: "FED-044", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Savate", nit: "901239083-7", sector: "Ol\xEDmpico", deporte: "Savate", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000044", nombre: "Luc\xEDa", apellido: "Castro Ram\xEDrez", correo: "presidencia@fedesavate.demo.co" }, ubicacion: { depto: "Tolima", ciudad: "Ibagu\xE9", zona: "Urbana", direccion: "Urbanizacion La Maria Parte Baja Casa 20" }, contacto: { telefono: "6015550045", correo: "contacto@fedesavate.demo.co" }, fechaRegistro: "2026-03-18" },
    { id: "FED-045", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Softbol", nit: "890401221-1", sector: "Ol\xEDmpico", deporte: "Softbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000045", nombre: "Gustavo", apellido: "Quintero Betancur", correo: "presidencia@fedesoftbol.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Estadio de Softbol de Chiquinquira" }, contacto: { telefono: "6015550046", correo: "contacto@fedesoftbol.demo.co" }, fechaRegistro: "2026-04-19" },
    { id: "FED-046", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Squash", nit: "800045466-4", sector: "Ol\xEDmpico", deporte: "Squash", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000046", nombre: "\xC1ngela", apellido: "Naranjo Rodr\xEDguez", correo: "presidencia@fedesquash.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550047", correo: "contacto@fedesquash.demo.co" }, fechaRegistro: "2026-05-20" },
    { id: "FED-047", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Surf", nit: "901091612-5", sector: "Ol\xEDmpico", deporte: "Surf", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000047", nombre: "Felipe", apellido: "Zuluaga Pineda", correo: "presidencia@fedesurf.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Isla Tierra Bomba Av. Principal Cabana Vista Hermosa" }, contacto: { telefono: "6015550048", correo: "contacto@fedesurf.demo.co" }, fechaRegistro: "2026-06-21" },
    { id: "FED-048", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Taekwondo", nit: "860524134-8", sector: "Ol\xEDmpico", deporte: "Taekwondo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000048", nombre: "Sandra", apellido: "Torres Duarte", correo: "presidencia@fedetaekwondo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 603" }, contacto: { telefono: "6015550049", correo: "contacto@fedetaekwondo.demo.co" }, fechaRegistro: "2026-01-22" },
    { id: "FED-049", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tejo", nit: "800078980-0", sector: "Ol\xEDmpico", deporte: "Tejo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000049", nombre: "\xD3scar", apellido: "Su\xE1rez Mej\xEDa", correo: "presidencia@fedetejo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550050", correo: "contacto@fedetejo.demo.co" }, fechaRegistro: "2026-02-23" },
    { id: "FED-050", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tenis", nit: "860030468-1", sector: "Ol\xEDmpico", deporte: "Tenis", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000050", nombre: "Valeria", apellido: "Molina Cort\xE9s", correo: "presidencia@fedetenis.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Carrera 30 NQS No. 64A-70 Piso 5 Of. 506" }, contacto: { telefono: "6015550051", correo: "contacto@fedetenis.demo.co" }, fechaRegistro: "2026-03-24" },
    { id: "FED-051", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tenis de Mesa", nit: "890106273-1", sector: "Ol\xEDmpico", deporte: "Tenis de Mesa", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000051", nombre: "Hern\xE1n", apellido: "Duarte Torres", correo: "presidencia@fedetenisdemesa.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC costado occidental" }, contacto: { telefono: "6015550052", correo: "contacto@fedetenisdemesa.demo.co" }, fechaRegistro: "2026-04-25" },
    { id: "FED-052", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tiro y Caza Deportiva", nit: "860008926-1", sector: "Ol\xEDmpico", deporte: "Tiro y Caza Deportiva", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000052", nombre: "Claudia", apellido: "L\xF3pez Salazar", correo: "presidencia@fedetiroycazadeporti.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 606" }, contacto: { telefono: "6015550053", correo: "contacto@fedetiroycazadeporti.demo.co" }, fechaRegistro: "2026-05-26" },
    { id: "FED-053", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Triatl\xF3n", nit: "800009065-1", sector: "Ol\xEDmpico", deporte: "Triatl\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000053", nombre: "Rodrigo", apellido: "Ospina Mart\xEDnez", correo: "presidencia@fedetriatlon.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 27 #5 OESTE - 05" }, contacto: { telefono: "6015550054", correo: "contacto@fedetriatlon.demo.co" }, fechaRegistro: "2026-06-27" },
    { id: "FED-054", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Vela", nit: "860045920-5", sector: "Ol\xEDmpico", deporte: "Vela", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000054", nombre: "Patricia", apellido: "Betancur Quintero", correo: "presidencia@fedevela.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550055", correo: "contacto@fedevela.demo.co" }, fechaRegistro: "2026-01-01" },
    { id: "FED-055", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Voleibol", nit: "860045666-9", sector: "Ol\xEDmpico", deporte: "Voleibol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000055", nombre: "Iv\xE1n", apellido: "Reyes Cano", correo: "presidencia@fedevoleibol.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av Cra 30 # 64-81 Oficina 702" }, contacto: { telefono: "6015550056", correo: "contacto@fedevoleibol.demo.co" }, fechaRegistro: "2026-02-02" },
    { id: "FED-056", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Wushu", nit: "809011909-1", sector: "Ol\xEDmpico", deporte: "Wushu", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000056", nombre: "M\xF3nica", apellido: "Mart\xEDnez Ospina", correo: "presidencia@fedewushu.demo.co" }, ubicacion: { depto: "Tolima", ciudad: "Ibagu\xE9", zona: "Urbana", direccion: "Calle 18 No 16-30 Urbanizacion la Aurora" }, contacto: { telefono: "6015550057", correo: "contacto@fedewushu.demo.co" }, fechaRegistro: "2026-03-03" },
    { id: "FED-057", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Remo", nit: "901375567-1", sector: "Ol\xEDmpico", deporte: "Remo", parentId: "COC", estado: "Preinscrito", repLegal: { tipoDoc: "CC", numDoc: "10000057", nombre: "Alberto", apellido: "Rojas Bravo", correo: "presidencia@federemo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 9 # 37-06 Secretaria de Deportes de Cali" }, contacto: { telefono: "6015550058", correo: "contacto@federemo.demo.co" }, fechaRegistro: "2026-04-04" }
  ];
  var FEDERACIONES_FICTICIAS = [
    { id: "FED-P01", tipo: "federacion", nombre: "Federaci\xF3n Paral\xEDmpica de Atletismo", nit: "901500001-1", sector: "Paral\xEDmpico", deporte: "Atletismo", parentId: "CPC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000201", nombre: "Laura", apellido: "Mendoza R\xEDos", correo: "presidencia@fedeparaatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06 Of. 201" }, contacto: { telefono: "6014809090", correo: "contacto@fedeparaatletismo.demo.co" }, fechaRegistro: "2026-02-18" },
    { id: "FED-P02", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Nataci\xF3n Paral\xEDmpica", nit: "901500002-2", sector: "Paral\xEDmpico", deporte: "Nataci\xF3n", parentId: "CPC", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000202", nombre: "Diego", apellido: "Vargas Pe\xF1a", correo: "presidencia@fedeparanatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 36 # 5B-62" }, contacto: { telefono: "6024889090", correo: "contacto@fedeparanatacion.demo.co" }, fechaRegistro: "2026-05-09" },
    { id: "FED-S01", tipo: "federacion", nombre: "Federaci\xF3n Deportiva de Sordos de Baloncesto", nit: "901500003-3", sector: "Sordol\xEDmpico", deporte: "Baloncesto", parentId: "FSC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000203", nombre: "Sof\xEDa", apellido: "Guerrero Le\xF3n", correo: "presidencia@fedesordosbaloncesto.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114 Of. 3" }, contacto: { telefono: "6045553030", correo: "contacto@fedesordosbaloncesto.demo.co" }, fechaRegistro: "2026-03-28" }
  ];
  var LIGAS = [
    { id: "LIG-001", tipo: "liga", nombre: "Liga de Patinaje del Valle", nit: "805010001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000301", nombre: "Sandra", apellido: "Mej\xEDa", correo: "direccion@ligapatinajevalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-00 Unidad Deportiva Alberto Galindo" }, contacto: { telefono: "6024010101", correo: "contacto@ligapatinajevalle.demo.co" }, fechaRegistro: "2026-03-10" },
    { id: "LIG-002", tipo: "liga", nombre: "Liga de Patinaje de Antioquia", nit: "805010002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000302", nombre: "Carlos", apellido: "Estrada Ruiz", correo: "direccion@ligapatinajeant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 70 # 48-70 Estadio Atanasio Girardot" }, contacto: { telefono: "6044020202", correo: "contacto@ligapatinajeant.demo.co" }, fechaRegistro: "2026-03-14" },
    { id: "LIG-003", tipo: "liga", nombre: "Liga de Patinaje de Bogot\xE1", nit: "805010003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000303", nombre: "Paula", apellido: "Rinc\xF3n D\xEDaz", correo: "direccion@ligapatinajebogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014030303", correo: "contacto@ligapatinajebogota.demo.co" }, fechaRegistro: "2026-05-02" },
    { id: "LIG-004", tipo: "liga", nombre: "Liga de F\xFAtbol del Valle", nit: "805010004-4", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000304", nombre: "Andr\xE9s", apellido: "Lozano Gil", correo: "direccion@ligafutbolvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 50-00" }, contacto: { telefono: "6024040404", correo: "contacto@ligafutbolvalle.demo.co" }, fechaRegistro: "2026-02-22" },
    { id: "LIG-005", tipo: "liga", nombre: "Liga de F\xFAtbol de Antioquia", nit: "805010005-5", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000305", nombre: "Mariana", apellido: "Ospina Cano", correo: "direccion@ligafutbolant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 74 # 48-10" }, contacto: { telefono: "6044050505", correo: "contacto@ligafutbolant.demo.co" }, fechaRegistro: "2026-06-01" },
    { id: "LIG-006", tipo: "liga", nombre: "Liga de Nataci\xF3n del Valle", nit: "805010006-6", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "FED-038", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000306", nombre: "Diego", apellido: "Ospina Mar\xEDn", correo: "direccion@liganatacionvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-40 Complejo Acu\xE1tico" }, contacto: { telefono: "6024060606", correo: "contacto@liganatacionvalle.demo.co" }, fechaRegistro: "2026-02-28" },
    { id: "LIG-007", tipo: "liga", nombre: "Liga de Ciclismo de Antioquia", nit: "805010007-7", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000307", nombre: "Juli\xE1n", apellido: "C\xE1rdenas V\xE9lez", correo: "direccion@ligaciclismoant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Vel\xF3dromo Mart\xEDn Emilio Cochise Rodr\xEDguez" }, contacto: { telefono: "6044070707", correo: "contacto@ligaciclismoant.demo.co" }, fechaRegistro: "2026-04-11" },
    { id: "LIG-008", tipo: "liga", nombre: "Liga de Ciclismo de Bogot\xE1", nit: "805010008-8", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000308", nombre: "Natalia", apellido: "Pe\xF1a Rojas", correo: "direccion@ligaciclismobogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 57-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014080808", correo: "contacto@ligaciclismobogota.demo.co" }, fechaRegistro: "2026-01-30" }
  ];
  var CLUBES = [
    { id: "CLU-001", tipo: "club", nombre: "Club Pat\xEDn Cali", nit: "805020001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "profesional", parentId: "LIG-001", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000401", nombre: "\xD3scar", apellido: "Cardona", correo: "admin@clubpatincali.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 39 # 5-20 Barrio San Fernando" }, contacto: { telefono: "6025010101", correo: "contacto@clubpatincali.demo.co" }, fechaRegistro: "2026-04-02" },
    { id: "CLU-002", tipo: "club", nombre: "Club Ruedas del Sur", nit: "805020002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "escuela", parentId: "LIG-001", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000402", nombre: "Carolina", apellido: "Zapata R\xEDos", correo: "admin@ruedasdelsur.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 30 # 28-15" }, contacto: { telefono: "6025020202", correo: "contacto@ruedasdelsur.demo.co" }, fechaRegistro: "2026-06-10" },
    { id: "CLU-003", tipo: "club", nombre: "Club Pat\xEDn Vallecaucano", nit: "805020003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-001", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000403", nombre: "Felipe", apellido: "Mu\xF1oz Cano", correo: "admin@patinvallecaucano.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 8 # 20-40" }, contacto: { telefono: "6025030303", correo: "contacto@patinvallecaucano.demo.co" }, fechaRegistro: "2026-04-15" },
    { id: "CLU-004", tipo: "club", nombre: "Club Patinaje Antioquia Norte", nit: "805020004-4", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-002", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000404", nombre: "Valentina", apellido: "R\xEDos Duque", correo: "admin@patinajeantnorte.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Bello", zona: "Urbana", direccion: "Calle 50 # 55-20" }, contacto: { telefono: "6045040404", correo: "contacto@patinajeantnorte.demo.co" }, fechaRegistro: "2026-04-20" },
    { id: "CLU-005", tipo: "club", nombre: "Club Velocidad Medell\xEDn", nit: "805020005-5", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "profesional", parentId: "LIG-002", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000405", nombre: "Santiago", apellido: "Herrera Cano", correo: "admin@velocidadmedellin.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 65 # 44-50" }, contacto: { telefono: "6045050505", correo: "contacto@velocidadmedellin.demo.co" }, fechaRegistro: "2026-05-18" },
    { id: "CLU-006", tipo: "club", nombre: "Club F\xFAtbol Cali Junior", nit: "805020006-6", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", tipoClub: "escuela", parentId: "LIG-004", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000406", nombre: "Camila", apellido: "Rojas V\xE9lez", correo: "admin@calijunior.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 16 # 100-00" }, contacto: { telefono: "6025060606", correo: "contacto@calijunior.demo.co" }, fechaRegistro: "2026-03-05" },
    { id: "CLU-007", tipo: "club", nombre: "Club Deportivo Aguas del Valle", nit: "805020007-7", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", tipoClub: "profesional", parentId: "LIG-006", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000407", nombre: "Isabella", apellido: "Torres Pe\xF1a", correo: "admin@aguasdelvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-42" }, contacto: { telefono: "6025070707", correo: "contacto@aguasdelvalle.demo.co" }, fechaRegistro: "2026-03-16" },
    { id: "CLU-008", tipo: "club", nombre: "Club Nataci\xF3n Pac\xEDfico", nit: "805020008-8", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", tipoClub: "promotor", parentId: "LIG-006", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000408", nombre: "Mateo", apellido: "Angulo Mena", correo: "admin@natacionpacifico.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Buenaventura", zona: "Urbana", direccion: "Cra. 3 # 5-30" }, contacto: { telefono: "6025080808", correo: "contacto@natacionpacifico.demo.co" }, fechaRegistro: "2026-05-25" },
    { id: "CLU-009", tipo: "club", nombre: "Club Pat\xEDn Bogot\xE1", nit: "805020009-9", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-003", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000409", nombre: "Daniela", apellido: "Su\xE1rez Gil", correo: "admin@patinbogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-20" }, contacto: { telefono: "6015090909", correo: "contacto@patinbogota.demo.co" }, fechaRegistro: "2026-05-12" },
    { id: "CLU-010", tipo: "club", nombre: "Club Rueda Libre Palmira", nit: "805020010-0", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "escuela", parentId: "LIG-001", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000410", nombre: "Andr\xE9s", apellido: "Caicedo Mora", correo: "admin@ruedalibrepalmira.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 31 # 29-10" }, contacto: { telefono: "6025101010", correo: "contacto@ruedalibrepalmira.demo.co" }, fechaRegistro: "2026-01-28" }
  ];
  var DEPORTISTAS = [
    { id: "DEP-001", nombre: "Valentina Ortiz", tipoDoc: "CC", numDoc: "1144556778", deporte: "Patinaje", modalidad: "Carreras", correo: "valentina.ortiz@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-002", nombre: "Mateo Restrepo", tipoDoc: "CC", numDoc: "1144200145", deporte: "Patinaje", modalidad: "Carreras", correo: "mateo.restrepo@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-003", nombre: "Laura Giraldo", tipoDoc: "CC", numDoc: "1130987654", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "laura.giraldo@correo.demo.co", clubId: "CLU-003", estado: "vinculado" },
    { id: "DEP-004", nombre: "Samuel Ruiz", tipoDoc: "TI", numDoc: "1028445566", deporte: "Patinaje", modalidad: "Carreras", correo: "samuel.ruiz@correo.demo.co", clubId: "CLU-004", estado: "vinculado" },
    { id: "DEP-005", nombre: "Isabella N\xFA\xF1ez", tipoDoc: "CC", numDoc: "1144778899", deporte: "Nataci\xF3n", modalidad: "Estilo libre", correo: "isabella.nunez@correo.demo.co", clubId: "CLU-007", estado: "vinculado" },
    { id: "DEP-006", nombre: "Tom\xE1s V\xE9lez", tipoDoc: "CC", numDoc: "1120334455", deporte: "F\xFAtbol", modalidad: "Campo", correo: "tomas.velez@correo.demo.co", clubId: "CLU-006", estado: "vinculado" },
    { id: "DEP-007", nombre: "Daniela C\xE1rdenas", tipoDoc: "CC", numDoc: "1144990011", deporte: "Patinaje", modalidad: "Carreras", correo: "daniela.cardenas@correo.demo.co", clubId: null, estado: "autodeclarado" },
    { id: "DEP-008", nombre: "Andr\xE9s Lozano", tipoDoc: "CC", numDoc: "1098223344", deporte: "Ciclismo", modalidad: "Ruta", correo: "andres.lozano@correo.demo.co", clubId: null, estado: "autodeclarado" },
    { id: "DEP-009", nombre: "Camila Su\xE1rez", tipoDoc: "CC", numDoc: "1144556001", deporte: "Nataci\xF3n", modalidad: "Mariposa", correo: "camila.suarez@correo.demo.co", clubId: null, estado: "autodeclarado" },
    { id: "DEP-010", nombre: "Juan D. Mar\xEDn", tipoDoc: "CC", numDoc: "1088776655", deporte: "Patinaje", modalidad: "Carreras", correo: "juan.marin@correo.demo.co", clubId: null, estado: "autodeclarado" },
    { id: "DEP-011", nombre: "Sara Betancur", tipoDoc: "TI", numDoc: "1029887766", deporte: "F\xFAtbol", modalidad: "Campo", correo: "sara.betancur@correo.demo.co", clubId: null, estado: "autodeclarado" },
    { id: "DEP-012", nombre: "Nicol\xE1s Ariza", tipoDoc: "CC", numDoc: "1144667788", deporte: "Patinaje", modalidad: "Carreras", correo: "nicolas.ariza@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    /* Resto del plantel de CLU-001 — Club Patín Cali (ORG-09 · «Mis deportistas»). */
    { id: "DEP-013", nombre: "Sof\xEDa Arango Cano", tipoDoc: "TI", numDoc: "1029334455", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "sofia.arango@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-014", nombre: "Emilio V\xE1squez Ruiz", tipoDoc: "CC", numDoc: "1144881122", deporte: "Patinaje", modalidad: "Carreras", correo: "emilio.vasquez@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-015", nombre: "Manuela Ospina D\xEDaz", tipoDoc: "TI", numDoc: "1029556677", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "manuela.ospina@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-016", nombre: "Juli\xE1n Bedoya Mesa", tipoDoc: "CC", numDoc: "1144773311", deporte: "Patinaje", modalidad: "Hockey en l\xEDnea", correo: "julian.bedoya@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-017", nombre: "Antonia Zapata Le\xF3n", tipoDoc: "CC", numDoc: "1144665544", deporte: "Patinaje", modalidad: "Carreras", correo: "antonia.zapata@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-018", nombre: "Felipe Quintero S\xE1enz", tipoDoc: "TI", numDoc: "1029778899", deporte: "Patinaje", modalidad: "Hockey en l\xEDnea", correo: "felipe.quintero@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-019", nombre: "Valeria Mosquera Renter\xEDa", tipoDoc: "CC", numDoc: "1144992277", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "valeria.mosquera@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-020", nombre: "Sebasti\xE1n Toro Aguirre", tipoDoc: "CC", numDoc: "1144110099", deporte: "Patinaje", modalidad: "Carreras", correo: "sebastian.toro@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
    { id: "DEP-021", nombre: "Luciana Palacio Hoyos", tipoDoc: "TI", numDoc: "1029223344", deporte: "Patinaje", modalidad: "Freestyle", correo: "luciana.palacio@correo.demo.co", clubId: "CLU-001", estado: "vinculado" }
  ];
  var SEED_ORGANISMOS = [
    ...COMITES,
    ...FEDERACIONES_COC,
    ...FEDERACIONES_FICTICIAS,
    ...LIGAS,
    ...CLUBES
  ];
  var SEED_DEPORTISTAS = DEPORTISTAS;
  var STORE_PREFIX = "naowee-organismos-";
  var SEED_FLAG = STORE_PREFIX + "demo-seeded";
  var SEED_VERSION = "0.1.0";
  function readStore(key, fallback = null) {
    try {
      const raw = sessionStorage.getItem(STORE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
    } catch (_) {
    }
  }
  function seedDemoData() {
    const seeded = (function() {
      try {
        return localStorage.getItem(SEED_FLAG);
      } catch (_) {
        return null;
      }
    })();
    if (seeded === SEED_VERSION) {
      return { seeded: false, version: SEED_VERSION };
    }
    if (readStore("organismos-nuevos") == null) writeStore("organismos-nuevos", []);
    if (readStore("organismos-overrides") == null) writeStore("organismos-overrides", {});
    if (readStore("deportistas-nuevos") == null) writeStore("deportistas-nuevos", []);
    if (readStore("deportistas-overrides") == null) writeStore("deportistas-overrides", {});
    if (readStore("solicitudes") == null) writeStore("solicitudes", []);
    if (readStore("cargues") == null) writeStore("cargues", []);
    if (readStore("audit") == null) writeStore("audit", []);
    if (readStore("preinscritos") == null) writeStore("preinscritos", []);
    try {
      localStorage.setItem(SEED_FLAG, SEED_VERSION);
    } catch (_) {
    }
    return { seeded: true, version: SEED_VERSION };
  }
  function applyOverride(org, overrides) {
    const ov = overrides[org.id];
    return ov ? { ...org, ...ov } : { ...org };
  }
  function allOrganismos() {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const overrides = readStore("organismos-overrides", {}) || {};
    const base = SEED_ORGANISMOS.map((o) => applyOverride(o, overrides));
    const extra = nuevos.map((o) => ({ ...o }));
    return [...base, ...extra];
  }
  function getOrganismo(id) {
    return allOrganismos().find((o) => o.id === id) || null;
  }
  function allDeportistas() {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const ov = readStore("deportistas-overrides", {}) || {};
    const base = SEED_DEPORTISTAS.map((d) => ov[d.id] ? { ...d, ...ov[d.id] } : { ...d });
    return [...base, ...nuevos.map((d) => ({ ...d }))];
  }
  function getDeportista(id) {
    return allDeportistas().find((d) => d.id === id) || null;
  }
  function indexByParent(orgs) {
    const idx = {};
    orgs.forEach((o) => {
      (idx[o.parentId] = idx[o.parentId] || []).push(o);
    });
    return idx;
  }
  function subtreeOf(id) {
    const orgs = allOrganismos();
    const idx = indexByParent(orgs);
    const out = [];
    const stack = [...idx[id] || []];
    while (stack.length) {
      const node = stack.pop();
      out.push({ ...node });
      const kids = idx[node.id];
      if (kids) for (const k of kids) stack.push(k);
    }
    return out;
  }
  function ancestorsOf(id) {
    const orgs = allOrganismos();
    const byId = {};
    orgs.forEach((o) => {
      byId[o.id] = o;
    });
    const chain = [];
    let cur = byId[id];
    const guard = /* @__PURE__ */ new Set();
    while (cur && cur.parentId != null && byId[cur.parentId] && !guard.has(cur.parentId)) {
      guard.add(cur.parentId);
      cur = byId[cur.parentId];
      chain.push({ ...cur });
    }
    return chain;
  }
  function deportistasOf(orgId) {
    const clubIds = /* @__PURE__ */ new Set();
    const self = getOrganismo(orgId);
    if (self && self.tipo === "club") clubIds.add(self.id);
    subtreeOf(orgId).forEach((o) => {
      if (o.tipo === "club") clubIds.add(o.id);
    });
    const orgIds = /* @__PURE__ */ new Set([orgId, ...subtreeOf(orgId).map((o) => o.id)]);
    return allDeportistas().filter((d) => {
      var _a, _b;
      return d.clubId && clubIds.has(d.clubId) || !d.clubId && [d.registradoPor, (_a = d.asocParcial) == null ? void 0 : _a.federacionId, (_b = d.asocParcial) == null ? void 0 : _b.ligaId].some((x) => x && orgIds.has(x));
    }).map((d) => ({ ...d }));
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }
  var _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  var _norm = (s) => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function updateDeportista(id, patch) {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const i = nuevos.findIndex((d) => d.id === id);
    if (i >= 0) {
      nuevos[i] = { ...nuevos[i], ...patch };
      writeStore("deportistas-nuevos", nuevos);
    } else {
      const ov = readStore("deportistas-overrides", {}) || {};
      ov[id] = { ...ov[id] || {}, ...patch };
      writeStore("deportistas-overrides", ov);
    }
    return getDeportista(id);
  }
  function allSolicitudes() {
    return (readStore("solicitudes", []) || []).map((s) => ({ ...s }));
  }
  function solicitudDeDeportista(deportistaId) {
    return allSolicitudes().find((s) => s.deportistaId === deportistaId) || null;
  }
  function crearSolicitud(deportistaId, clubId) {
    const list = readStore("solicitudes", []) || [];
    const dep = getDeportista(deportistaId);
    const prev = list.find((s) => s.deportistaId === deportistaId && s.tipo !== "retiro" && s.estado === "Enviada");
    if (prev) return { ...prev };
    const rec = {
      id: "AF-" + String(list.length + 1).padStart(3, "0"),
      tipo: "afiliacion",
      deportistaId,
      clubId,
      estado: "Enviada",
      fecha: _todayISO()
    };
    list.unshift(rec);
    writeStore("solicitudes", list);
    auditLog({
      orgId: clubId,
      deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: rec.fecha,
      responsable: dep ? dep.nombre : "",
      rol: "DEPORTISTA",
      accion: "Solicitud de afiliaci\xF3n enviada",
      de: "",
      a: "Enviada",
      motivo: ""
    });
    return { ...rec };
  }
  function crearSolicitudRetiro(deportistaId) {
    const dep = getDeportista(deportistaId);
    if (!dep || !dep.clubId) return null;
    const list = readStore("solicitudes", []) || [];
    const rec = {
      id: "RT-" + String(list.length + 1).padStart(3, "0"),
      tipo: "retiro",
      deportistaId,
      clubId: dep.clubId,
      estado: "Enviada",
      fecha: _todayISO()
    };
    list.unshift(rec);
    writeStore("solicitudes", list);
    auditLog({
      orgId: dep.clubId,
      deportistaId,
      deportistaNombre: dep.nombre,
      fecha: rec.fecha,
      responsable: dep.nombre,
      rol: "DEPORTISTA",
      accion: "Solicitud de baja enviada",
      de: "Vinculado",
      a: "Baja solicitada",
      motivo: ""
    });
    return { ...rec };
  }
  function retiroPendienteDe(deportistaId) {
    return allSolicitudes().find((s) => s.tipo === "retiro" && s.deportistaId === deportistaId && s.estado === "Enviada") || null;
  }
  function cancelarRetiro(deportistaId) {
    const dep = getDeportista(deportistaId);
    const list = readStore("solicitudes", []) || [];
    let changed = false;
    const upd = list.map((s) => {
      if (s.tipo === "retiro" && s.deportistaId === deportistaId && s.estado === "Enviada") {
        changed = true;
        return { ...s, estado: "Retirada", resueltaFecha: _todayISO() };
      }
      return s;
    });
    if (changed) {
      writeStore("solicitudes", upd);
      auditLog({
        orgId: dep ? dep.clubId : "",
        deportistaId,
        deportistaNombre: dep ? dep.nombre : "",
        fecha: _todayISO(),
        responsable: dep ? dep.nombre : "",
        rol: "DEPORTISTA",
        accion: "Solicitud de baja cancelada",
        de: "Baja solicitada",
        a: "Retirada",
        motivo: ""
      });
    }
    return getDeportista(deportistaId);
  }
  function retirarAfiliacion(deportistaId, meta = {}) {
    const dep = getDeportista(deportistaId);
    const eraVinculado = dep && dep.estado === "vinculado";
    const clubPrev = dep ? dep.clubId : null;
    const list = readStore("solicitudes", []) || [];
    let changed = false;
    const upd = list.map((s) => {
      if (s.deportistaId === deportistaId && (s.estado === "Enviada" || s.estado === "Aprobada")) {
        changed = true;
        return { ...s, estado: "Retirada", resueltaFecha: _todayISO() };
      }
      return s;
    });
    if (changed) writeStore("solicitudes", upd);
    updateDeportista(deportistaId, { clubId: null, estado: "autodeclarado" });
    auditLog({
      orgId: clubPrev || "",
      deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: _todayISO(),
      responsable: dep ? dep.nombre : "",
      rol: "DEPORTISTA",
      accion: "Afiliaci\xF3n retirada",
      de: eraVinculado ? "Vinculado" : "Enviada",
      a: "Retirada",
      motivo: ""
    });
    return getDeportista(deportistaId);
  }
  function buscarClubesActivos(query) {
    const q = String(query || "").trim();
    if (q.length < 3) return [];
    const nq = _norm(q);
    return allOrganismos().filter((o) => o.tipo === "club" && o.estado === "Activo").filter((o) => _norm(o.nombre).includes(nq) || _norm(o.nit).includes(nq)).sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((o) => ({ ...o }));
  }
  function seedAfiliacionesDemo(mode) {
    if (mode !== "demo") return;
    const list = readStore("solicitudes", []) || [];
    if (list.some((s) => s.demoSeed)) return;
    const seeds = [
      { deportistaId: "DEP-010", clubId: "CLU-001", fecha: "2026-07-12" },
      // Juan D. Marín · Patinaje
      { deportistaId: "DEP-007", clubId: "CLU-001", fecha: "2026-07-13" }
      // Daniela Cárdenas · Patinaje
    ];
    seeds.forEach((s, idx) => {
      list.unshift({ id: "AF-D" + (idx + 1), deportistaId: s.deportistaId, clubId: s.clubId, estado: "Enviada", fecha: s.fecha, demoSeed: true });
    });
    writeStore("solicitudes", list);
  }

  // shared/permissions.js
  var ACCIONES = Object.freeze({
    CREAR: "C",
    LEER: "R",
    EDITAR: "U",
    APROBAR: "A",
    SANCIONAR: "S",
    RETIRAR: "X"
  });
  var RECURSOS = Object.freeze([
    "comites",
    "federaciones",
    "ligas",
    "clubes",
    "deportistas",
    "solicitudes",
    "cargue",
    "auditoria"
  ]);
  var PERMS = {
    comites: {
      MINDEPORTE: "CRUS",
      // único creador (ORG-01)
      COMITE: "RU",
      // el propio
      FEDERACION: "R",
      LIGA: "R",
      CLUB: "R",
      DEPORTISTA: "R"
    },
    federaciones: {
      MINDEPORTE: "RAS",
      // A = su mitad de la doble validación
      COMITE: "CRA",
      // C pre-registro/cargue · A = su mitad — solo su sector
      FEDERACION: "RU",
      // la propia
      LIGA: "R",
      CLUB: "R",
      DEPORTISTA: "R"
    },
    ligas: {
      MINDEPORTE: "RS",
      // S* supuesto
      COMITE: "R",
      // su sector
      FEDERACION: "CRA",
      // las suyas
      LIGA: "RU",
      // la propia
      CLUB: "R",
      DEPORTISTA: "R"
    },
    clubes: {
      MINDEPORTE: "RS",
      // S* supuesto
      COMITE: "R",
      FEDERACION: "R",
      // subárbol
      LIGA: "CRA",
      // los suyos
      CLUB: "RU",
      // el propio
      DEPORTISTA: "R"
      // solo buscar clubes Activos (se acota en la UI de afiliación)
    },
    deportistas: {
      MINDEPORTE: "R",
      COMITE: "CR",
      FEDERACION: "CR",
      LIGA: "CR",
      // C = registrar y asociar hacia abajo
      CLUB: "CRX",
      // sus afiliados · X = desvincular (ORG-10, ver nota)
      DEPORTISTA: "RU"
      // el propio (nunca documento / fecha nac.)
    },
    /* NOTA sobre deportistas[CLUB] = 'X' (desvincular):
       DECISIÓN DE PRODUCTO de Doug (2026-09-10) que responde la pregunta de
       Nicolás Mosquera en la mesa del 2026-09-08. VA MÁS ALLÁ del handoff §11.2
       y de la matriz oficial de negocio, que NO tienen columna de
       desvinculación — pendiente de validar (P-04).
       Alcance: solo sobre deportistas de SU propio club, con motivo obligatorio
       y traza. No es borrado (sigue sin existir D): el deportista vuelve a
       'autodeclarado' y puede re-afiliarse. */
    solicitudes: {
      MINDEPORTE: "R",
      // auditoría
      COMITE: "",
      FEDERACION: "",
      LIGA: "",
      CLUB: "RA",
      // las dirigidas a su club (ORG-05, único aprobador)
      DEPORTISTA: "CRX"
      // crea / ve estado / retira las propias
    },
    cargue: {
      MINDEPORTE: "R",
      // historial global*
      COMITE: "CR",
      // federaciones
      FEDERACION: "CR",
      // ligas
      LIGA: "CR",
      // clubes
      CLUB: "",
      // cargue masivo de deportistas: pendiente (entrada en «Deportistas»)
      DEPORTISTA: ""
    },
    auditoria: {
      MINDEPORTE: "R",
      COMITE: "R",
      FEDERACION: "R",
      LIGA: "R",
      CLUB: "R",
      DEPORTISTA: "R"
    }
  };
  function can(role2, accion, recurso) {
    const fila = PERMS[recurso];
    if (!fila) return false;
    const concedidas = fila[role2] || "";
    return concedidas.includes(accion);
  }
  var SCOPE = {
    MINDEPORTE: null,
    COMITE: "COC",
    FEDERACION: "FED-040",
    LIGA: "LIG-001",
    CLUB: "CLU-001",
    DEPORTISTA: "DEP-001"
  };
  function scopeFor(role2) {
    return role2 in SCOPE ? SCOPE[role2] : null;
  }
  function isGlobalScope(role2) {
    return scopeFor(role2) === null && role2 === "MINDEPORTE";
  }

  // shared/deportista-detalle.js
  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var TIER_LABEL = { olimpico: "Ol\xEDmpico", profesional: "Profesional", juvenil: "Juvenil", amateur: "Amateur" };
  var DOC_LABEL = { CC: "C\xE9dula de ciudadan\xEDa", TI: "Tarjeta de identidad", CE: "C\xE9dula de extranjer\xEDa", PA: "Pasaporte" };
  var DEPORTE_EMOJI = { Patinaje: "\u{1F6FC}", Nataci\u00F3n: "\u{1F3CA}", F\u00FAtbol: "\u26BD", Ciclismo: "\u{1F6B4}", Atletismo: "\u{1F3C3}", Baloncesto: "\u{1F3C0}" };
  var SANGRES = ["O+", "A+", "B+", "O-", "A-", "AB+"];
  var PERFIL_EXTRA = {
    "DEP-001": {
      // Valentina Ortiz — hilo conductor, Club Patín Cali
      sexo: "F",
      tier: "olimpico",
      nac: "14 mar 1998",
      edad: 28,
      sangre: "O+",
      alt: 168,
      peso: 61,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [
        { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", fecha: "2025-04-18", estado: "finalizado" },
        { evento: "Juegos Regionales Valle 2025", prueba: "1000m", fecha: "2025-07-10", estado: "finalizado" },
        { evento: "Copa Panamericana de Patinaje 2026", prueba: "500m sprint", fecha: "2026-03-22", estado: "activo" }
      ],
      resultados: [
        { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", ranking: 1, fecha: "2025-04-18" },
        { evento: "Juegos Regionales Valle 2025", prueba: "1000m", ranking: 2, fecha: "2025-07-10" }
      ],
      medalleria: [
        { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", medalla: "Oro", fecha: "2025-04-18" },
        { evento: "Juegos Regionales Valle 2025", prueba: "1000m", medalla: "Plata", fecha: "2025-07-10" }
      ]
    },
    "DEP-002": {
      // Mateo Restrepo — Club Patín Cali
      sexo: "M",
      tier: "profesional",
      nac: "02 sep 1999",
      edad: 26,
      sangre: "A+",
      alt: 176,
      peso: 72,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", fecha: "2025-04-18", estado: "finalizado" }],
      resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", ranking: 3, fecha: "2025-04-18" }],
      medalleria: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", medalla: "Bronce", fecha: "2025-04-18" }]
    },
    "DEP-003": { sexo: "F", tier: "juvenil", nac: "11 jun 2005", edad: 20, sangre: "B+", alt: 162, peso: 55, ciudad: "Pereira", depto: "Risaralda" },
    "DEP-004": { sexo: "M", tier: "juvenil", nac: "30 ene 2008", edad: 17, sangre: "O+", alt: 170, peso: 60, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-005": {
      sexo: "F",
      tier: "profesional",
      nac: "19 abr 1997",
      edad: 28,
      sangre: "A-",
      alt: 171,
      peso: 63,
      ciudad: "Medell\xEDn",
      depto: "Antioquia",
      inscripciones: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", fecha: "2025-05-12", estado: "finalizado" }],
      resultados: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", ranking: 2, fecha: "2025-05-12" }],
      medalleria: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", medalla: "Plata", fecha: "2025-05-12" }]
    },
    "DEP-006": { sexo: "M", tier: "amateur", nac: "05 dic 1996", edad: 29, sangre: "O+", alt: 179, peso: 76, ciudad: "Bogot\xE1", depto: "Bogot\xE1 D.C." },
    "DEP-007": { sexo: "F", tier: "amateur", nac: "22 oct 2001", edad: 24, sangre: "A+", alt: 165, peso: 58, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-008": { sexo: "M", tier: "amateur", nac: "14 jul 1999", edad: 26, sangre: "B+", alt: 177, peso: 70, ciudad: "Tunja", depto: "Boyac\xE1" },
    "DEP-009": { sexo: "F", tier: "amateur", nac: "03 feb 2000", edad: 25, sangre: "O-", alt: 169, peso: 60, ciudad: "Medell\xEDn", depto: "Antioquia" },
    "DEP-010": { sexo: "M", tier: "amateur", nac: "28 ago 2002", edad: 23, sangre: "A+", alt: 174, peso: 68, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-011": { sexo: "F", tier: "juvenil", nac: "16 mar 2007", edad: 18, sangre: "O+", alt: 160, peso: 54, ciudad: "Barranquilla", depto: "Atl\xE1ntico" },
    "DEP-012": {
      sexo: "M",
      tier: "profesional",
      nac: "09 nov 1998",
      edad: 27,
      sangre: "AB+",
      alt: 178,
      peso: 73,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [{ evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", fecha: "2025-07-10", estado: "finalizado" }],
      resultados: [{ evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", ranking: 4, fecha: "2025-07-10" }],
      medalleria: []
    },
    /* ─── Resto del plantel de CLU-001 (ORG-09 · «Mis deportistas») ───
       Categorías y edades deliberadamente variadas: alimentan los filtros
       condicionales y el KPI de menores de edad (consentimiento del tutor). */
    "DEP-013": { sexo: "F", tier: "juvenil", nac: "14 may 2009", edad: 16, sangre: "O+", alt: 158, peso: 49, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-014": {
      sexo: "M",
      tier: "profesional",
      nac: "21 jul 1997",
      edad: 28,
      sangre: "A+",
      alt: 180,
      peso: 75,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "10.000m puntos", fecha: "2025-04-19", estado: "finalizado" }],
      resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "10.000m puntos", ranking: 5, fecha: "2025-04-19" }],
      medalleria: []
    },
    "DEP-015": { sexo: "F", tier: "juvenil", nac: "03 oct 2010", edad: 15, sangre: "B+", alt: 155, peso: 46, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-016": { sexo: "M", tier: "amateur", nac: "17 mar 2000", edad: 25, sangre: "O-", alt: 175, peso: 71, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-017": {
      sexo: "F",
      tier: "olimpico",
      nac: "28 ene 1996",
      edad: 29,
      sangre: "A+",
      alt: 170,
      peso: 62,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [
        { evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", fecha: "2025-04-18", estado: "finalizado" },
        { evento: "Copa Panamericana de Patinaje 2026", prueba: "200m contrarreloj", fecha: "2026-03-22", estado: "activo" }
      ],
      resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", ranking: 1, fecha: "2025-04-18" }],
      medalleria: [
        { evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", medalla: "Oro", fecha: "2025-04-18" },
        { evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", medalla: "Bronce", fecha: "2025-07-10" }
      ]
    },
    "DEP-018": { sexo: "M", tier: "juvenil", nac: "08 feb 2009", edad: 17, sangre: "O+", alt: 172, peso: 63, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-019": {
      sexo: "F",
      tier: "profesional",
      nac: "12 dic 1999",
      edad: 26,
      sangre: "AB+",
      alt: 164,
      peso: 56,
      ciudad: "Cali",
      depto: "Valle del Cauca",
      inscripciones: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", fecha: "2025-09-06", estado: "finalizado" }],
      resultados: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", ranking: 2, fecha: "2025-09-06" }],
      medalleria: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", medalla: "Plata", fecha: "2025-09-06" }]
    },
    "DEP-020": { sexo: "M", tier: "amateur", nac: "05 jun 2001", edad: 24, sangre: "A-", alt: 177, peso: 70, ciudad: "Cali", depto: "Valle del Cauca" },
    "DEP-021": { sexo: "F", tier: "juvenil", nac: "19 sep 2011", edad: 14, sangre: "O+", alt: 152, peso: 43, ciudad: "Cali", depto: "Valle del Cauca" }
  };
  function seedFromDoc(numDoc) {
    let h = 2166136261 >>> 0;
    const s = String(numDoc || "");
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function fmtFecha(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? `${m[3]} ${MESES[+m[2] - 1]} ${m[1]}` : iso || "";
  }
  function anio(iso) {
    const m = /(\d{4})/.exec(iso || "");
    return m ? m[1] : iso || "";
  }
  function slugCorreo(n, a) {
    return `${n}.${a}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z.]/g, "");
  }
  function buildDeportistaDetalle(dep) {
    if (!dep) return null;
    const w = dep.nombre.trim().split(/\s+/);
    let nombre = w[0] || "", segundoNombre = "", apellido = "", segundoApellido = "";
    if (w.length >= 4) {
      segundoNombre = w[1];
      apellido = w[2];
      segundoApellido = w.slice(3).join(" ");
    } else if (w.length === 3) {
      segundoNombre = w[1];
      apellido = w[2];
    } else {
      apellido = w.slice(1).join(" ");
    }
    const x = PERFIL_EXTRA[dep.id] || {};
    const seed = seedFromDoc(dep.numDoc);
    const sexo = x.sexo || (seed % 2 === 0 ? "F" : "M");
    const tier = x.tier || "amateur";
    const alt = x.alt || 158 + seed % 32;
    const peso = x.peso || 52 + (seed >> 3) % 38;
    const sangre = x.sangre || SANGRES[seed % SANGRES.length];
    const edad = x.edad || 16 + (seed >> 5) % 22;
    const imc = alt && peso ? (peso / Math.pow(alt / 100, 2)).toFixed(1) : "\u2014";
    const inscripciones = x.inscripciones || [];
    const resultados = x.resultados || [];
    const medalleria = x.medalleria || [];
    const club = dep.clubId ? getOrganismo(dep.clubId) : null;
    const chain = dep.clubId ? ancestorsOf(dep.clubId) : [];
    const liga = chain.find((o) => o.tipo === "liga") || null;
    const federacion = chain.find((o) => o.tipo === "federacion") || null;
    const comite = chain.find((o) => o.tipo === "comite") || null;
    const emoji = DEPORTE_EMOJI[dep.deporte] || "\u{1F3C5}";
    const slug = slugCorreo(nombre, apellido);
    const compl = Math.min(96, 60 + medalleria.length * 8 + inscripciones.length * 4 + (dep.clubId ? 10 : 0));
    return {
      id: dep.id,
      estado: dep.estado,
      clubId: dep.clubId,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nombreCompleto: dep.nombre,
      avatar: (nombre[0] || "") + (apellido[0] || ""),
      tier,
      tierLabel: TIER_LABEL[tier],
      deporte: dep.deporte,
      deporteEmoji: emoji,
      modalidad: dep.modalidad,
      doc: { tipo: DOC_LABEL[dep.tipoDoc] || dep.tipoDoc, tipoCorto: dep.tipoDoc, numero: dep.numDoc },
      nacimiento: x.nac || "\u2014",
      edad,
      sexo: sexo === "F" ? "Femenino" : "Masculino",
      genero: sexo === "F" ? "Femenino" : "Masculino",
      sangre,
      nacionalidad: { pais: "Colombia", iso: "co" },
      /* Cadena real (objetos organismo) + nombres para pintar. */
      club,
      liga,
      federacion,
      comite,
      clubNombre: club ? club.nombre : null,
      ligaNombre: liga ? liga.nombre : null,
      federacionNombre: federacion ? federacion.nombre : null,
      comiteNombre: comite ? comite.nombre : null,
      manoHabil: seed % 5 === 0 ? "Izquierda" : "Derecha",
      aniosPractica: Math.max(2, edad - 12),
      ubicacion: { depto: x.depto || "Valle del Cauca", municipio: x.ciudad || "Cali", zona: "Urbana", barrio: "Centro", direccion: "Por definir" },
      contacto: {
        correo: dep.correo || `${slug}@correo.demo.co`,
        telefono: `+57 31${seed % 9} 555 0${(100 + seed % 800).toString().slice(-3)}`,
        emergenciaNombre: "Contacto familiar",
        emergenciaTel: "+57 320 555 0142"
      },
      biometria: { altura: alt + " cm", peso: peso + " kg", sangre, imc },
      completitud: compl,
      documentos: [
        { nombre: "Documento de identidad", sub: "Verificado", estado: "verificado", subido: true },
        { nombre: "Certificado m\xE9dico deportivo", sub: "Vigente", estado: "vigente", subido: true },
        { nombre: "Afiliaci\xF3n EPS", sub: "Documento requerido \u2014 a\xFAn no lo has subido", estado: "requerido", subido: false },
        { nombre: "Consentimiento de tratamiento de datos", sub: "Falta firmar", estado: "pendiente", subido: true }
      ],
      inscripciones: inscripciones.map((e) => ({ evento: e.evento, prueba: e.prueba, fecha: fmtFecha(e.fecha), estado: e.estado })),
      resultados: resultados.map((r) => ({ evento: r.evento, prueba: r.prueba, ranking: r.ranking, fecha: anio(r.fecha) })),
      medalleria: medalleria.map((m) => ({ evento: m.evento, prueba: m.prueba, medalla: m.medalla, fecha: anio(m.fecha), deporte: m.deporte || dep.deporte }))
    };
  }

  // shared/qr.js
  var Ecc = {
    LOW: { ordinal: 0, formatBits: 1 },
    MEDIUM: { ordinal: 1, formatBits: 0 },
    QUARTILE: { ordinal: 2, formatBits: 3 },
    HIGH: { ordinal: 3, formatBits: 2 }
  };
  var ECL_MAP = {
    L: Ecc.LOW,
    M: Ecc.MEDIUM,
    Q: Ecc.QUARTILE,
    H: Ecc.HIGH
  };
  var Mode = {
    BYTE: {
      modeBits: 4,
      numCharCountBits(ver) {
        return ver < 10 ? 8 : 16;
      }
    }
  };
  var ECC_CODEWORDS_PER_BLOCK = [
    // 0  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36  37  38  39  40
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Low
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    // Medium
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Quartile
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    // High
  ];
  var NUM_ERROR_CORRECTION_BLOCKS = [
    // 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    // Low
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    // Medium
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    // Quartile
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
    // High
  ];
  var MIN_VERSION = 1;
  var MAX_VERSION = 40;
  var PENALTY_N1 = 3;
  var PENALTY_N2 = 3;
  var PENALTY_N3 = 40;
  var PENALTY_N4 = 10;
  function getBit(x, i) {
    return (x >>> i & 1) !== 0;
  }
  function appendBits(val, len, bb) {
    if (len < 0 || len > 31 || val >>> len !== 0) {
      throw new RangeError("Value out of range for appendBits");
    }
    for (let i = len - 1; i >= 0; i--) {
      bb.push(val >>> i & 1);
    }
  }
  function toUtf8ByteArray(str) {
    const out = [];
    for (const ch of str) {
      const cp = ch.codePointAt(0);
      if (cp < 128) {
        out.push(cp);
      } else if (cp < 2048) {
        out.push(192 | cp >> 6, 128 | cp & 63);
      } else if (cp < 65536) {
        out.push(224 | cp >> 12, 128 | cp >> 6 & 63, 128 | cp & 63);
      } else {
        out.push(
          240 | cp >> 18,
          128 | cp >> 12 & 63,
          128 | cp >> 6 & 63,
          128 | cp & 63
        );
      }
    }
    return out;
  }
  function reedSolomonMultiply(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = z << 1 ^ (z >>> 7) * 285;
      z ^= (y >>> i & 1) * x;
    }
    return z & 255;
  }
  function reedSolomonComputeDivisor(degree) {
    if (degree < 1 || degree > 255) {
      throw new RangeError("Degree out of range");
    }
    const result = [];
    for (let i = 0; i < degree - 1; i++) result.push(0);
    result.push(1);
    let root = 1;
    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < result.length; j++) {
        result[j] = reedSolomonMultiply(result[j], root);
        if (j + 1 < result.length) result[j] ^= result[j + 1];
      }
      root = reedSolomonMultiply(root, 2);
    }
    return result;
  }
  function reedSolomonComputeRemainder(data, divisor) {
    const result = divisor.map(() => 0);
    for (const b of data) {
      const factor = b ^ result.shift();
      result.push(0);
      divisor.forEach((coef, i) => {
        result[i] ^= reedSolomonMultiply(coef, factor);
      });
    }
    return result;
  }
  function getNumRawDataModules(ver) {
    if (ver < MIN_VERSION || ver > MAX_VERSION) {
      throw new RangeError("Version out of range");
    }
    let result = (16 * ver + 128) * ver + 64;
    if (ver >= 2) {
      const numAlign = Math.floor(ver / 7) + 2;
      result -= (25 * numAlign - 10) * numAlign - 55;
      if (ver >= 7) result -= 36;
    }
    return result;
  }
  function getNumDataCodewords(ver, ecl) {
    return Math.floor(getNumRawDataModules(ver) / 8) - ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver] * NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
  }
  function makeBytes(data) {
    const bb = [];
    for (const b of data) appendBits(b, 8, bb);
    return { mode: Mode.BYTE, numChars: data.length, bitData: bb };
  }
  function getTotalBits(segs, version) {
    let result = 0;
    for (const seg of segs) {
      const ccbits = seg.mode.numCharCountBits(version);
      if (seg.numChars >= 1 << ccbits) return Infinity;
      result += 4 + ccbits + seg.bitData.length;
    }
    return result;
  }
  var QrCode = class _QrCode {
    constructor(version, ecl, dataCodewords, msk) {
      if (version < MIN_VERSION || version > MAX_VERSION) {
        throw new RangeError("Version out of range");
      }
      if (msk < -1 || msk > 7) {
        throw new RangeError("Mask out of range");
      }
      this.version = version;
      this.errorCorrectionLevel = ecl;
      this.size = version * 4 + 17;
      const blankRow = new Array(this.size).fill(false);
      this.modules = [];
      this.isFunction = [];
      for (let i = 0; i < this.size; i++) {
        this.modules.push(blankRow.slice());
        this.isFunction.push(blankRow.slice());
      }
      this.drawFunctionPatterns();
      const allCodewords = this.addEccAndInterleave(dataCodewords);
      this.drawCodewords(allCodewords);
      if (msk === -1) {
        let minPenalty = Infinity;
        for (let i = 0; i < 8; i++) {
          this.applyMask(i);
          this.drawFormatBits(i);
          const penalty = this.getPenaltyScore();
          if (penalty < minPenalty) {
            msk = i;
            minPenalty = penalty;
          }
          this.applyMask(i);
        }
      }
      this.mask = msk;
      this.applyMask(msk);
      this.drawFormatBits(msk);
    }
    static encodeText(text, ecl) {
      const seg = makeBytes(toUtf8ByteArray(text));
      return _QrCode.encodeSegments([seg], ecl);
    }
    static encodeSegments(segs, ecl, boostEcl = true) {
      let version;
      let dataUsedBits;
      for (version = MIN_VERSION; ; version++) {
        const dataCapacityBits2 = getNumDataCodewords(version, ecl) * 8;
        const usedBits = getTotalBits(segs, version);
        if (usedBits <= dataCapacityBits2) {
          dataUsedBits = usedBits;
          break;
        }
        if (version >= MAX_VERSION) {
          throw new RangeError("Data too long to fit in any QR Code version");
        }
      }
      for (const newEcl of [Ecc.MEDIUM, Ecc.QUARTILE, Ecc.HIGH]) {
        if (boostEcl && dataUsedBits <= getNumDataCodewords(version, newEcl) * 8) {
          ecl = newEcl;
        }
      }
      const bb = [];
      for (const seg of segs) {
        appendBits(seg.mode.modeBits, 4, bb);
        appendBits(seg.numChars, seg.mode.numCharCountBits(version), bb);
        for (const bit of seg.bitData) bb.push(bit);
      }
      const dataCapacityBits = getNumDataCodewords(version, ecl) * 8;
      appendBits(0, Math.min(4, dataCapacityBits - bb.length), bb);
      appendBits(0, (8 - bb.length % 8) % 8, bb);
      for (let padByte = 236; bb.length < dataCapacityBits; padByte ^= 236 ^ 17) {
        appendBits(padByte, 8, bb);
      }
      const dataCodewords = new Array(bb.length >>> 3).fill(0);
      bb.forEach((bit, i) => {
        dataCodewords[i >>> 3] |= bit << 7 - (i & 7);
      });
      return new _QrCode(version, ecl, dataCodewords, -1);
    }
    // -- function-pattern drawing -------------------------------------------
    drawFunctionPatterns() {
      for (let i = 0; i < this.size; i++) {
        this.setFunctionModule(6, i, i % 2 === 0);
        this.setFunctionModule(i, 6, i % 2 === 0);
      }
      this.drawFinderPattern(3, 3);
      this.drawFinderPattern(this.size - 4, 3);
      this.drawFinderPattern(3, this.size - 4);
      const alignPos = this.getAlignmentPatternPositions();
      const numAlign = alignPos.length;
      for (let i = 0; i < numAlign; i++) {
        for (let j = 0; j < numAlign; j++) {
          if (!(i === 0 && j === 0 || i === 0 && j === numAlign - 1 || i === numAlign - 1 && j === 0)) {
            this.drawAlignmentPattern(alignPos[i], alignPos[j]);
          }
        }
      }
      this.drawFormatBits(0);
      this.drawVersion();
    }
    drawFormatBits(mask) {
      const data = this.errorCorrectionLevel.formatBits << 3 | mask;
      let rem = data;
      for (let i = 0; i < 10; i++) {
        rem = rem << 1 ^ (rem >>> 9) * 1335;
      }
      const bits = (data << 10 | rem) ^ 21522;
      for (let i = 0; i <= 5; i++) this.setFunctionModule(8, i, getBit(bits, i));
      this.setFunctionModule(8, 7, getBit(bits, 6));
      this.setFunctionModule(8, 8, getBit(bits, 7));
      this.setFunctionModule(7, 8, getBit(bits, 8));
      for (let i = 9; i < 15; i++) this.setFunctionModule(14 - i, 8, getBit(bits, i));
      for (let i = 0; i < 8; i++) {
        this.setFunctionModule(this.size - 1 - i, 8, getBit(bits, i));
      }
      for (let i = 8; i < 15; i++) {
        this.setFunctionModule(8, this.size - 15 + i, getBit(bits, i));
      }
      this.setFunctionModule(8, this.size - 8, true);
    }
    drawVersion() {
      if (this.version < 7) return;
      let rem = this.version;
      for (let i = 0; i < 12; i++) {
        rem = rem << 1 ^ (rem >>> 11) * 7973;
      }
      const bits = this.version << 12 | rem;
      for (let i = 0; i < 18; i++) {
        const color = getBit(bits, i);
        const a = this.size - 11 + i % 3;
        const b = Math.floor(i / 3);
        this.setFunctionModule(a, b, color);
        this.setFunctionModule(b, a, color);
      }
    }
    drawFinderPattern(x, y) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          const xx = x + dx;
          const yy = y + dy;
          if (xx >= 0 && xx < this.size && yy >= 0 && yy < this.size) {
            this.setFunctionModule(xx, yy, dist !== 2 && dist !== 4);
          }
        }
      }
    }
    drawAlignmentPattern(x, y) {
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          this.setFunctionModule(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
        }
      }
    }
    setFunctionModule(x, y, isDark) {
      this.modules[y][x] = isDark;
      this.isFunction[y][x] = true;
    }
    getAlignmentPatternPositions() {
      if (this.version === 1) return [];
      const numAlign = Math.floor(this.version / 7) + 2;
      const step = this.version === 32 ? 26 : Math.ceil((this.version * 4 + 4) / (numAlign * 2 - 2)) * 2;
      const result = [6];
      for (let pos = this.size - 7; result.length < numAlign; pos -= step) {
        result.splice(1, 0, pos);
      }
      return result;
    }
    // -- data + ECC ----------------------------------------------------------
    addEccAndInterleave(data) {
      const ver = this.version;
      const ecl = this.errorCorrectionLevel;
      const numBlocks = NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver];
      const blockEccLen = ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver];
      const rawCodewords = Math.floor(getNumRawDataModules(ver) / 8);
      const numShortBlocks = numBlocks - rawCodewords % numBlocks;
      const shortBlockLen = Math.floor(rawCodewords / numBlocks);
      if (data.length !== getNumDataCodewords(ver, ecl)) {
        throw new RangeError("Invalid data codeword count");
      }
      const blocks = [];
      const rsDiv = reedSolomonComputeDivisor(blockEccLen);
      for (let i = 0, k = 0; i < numBlocks; i++) {
        const dat = data.slice(
          k,
          k + shortBlockLen - blockEccLen + (i < numShortBlocks ? 0 : 1)
        );
        k += dat.length;
        const ecc = reedSolomonComputeRemainder(dat, rsDiv);
        if (i < numShortBlocks) dat.push(0);
        blocks.push(dat.concat(ecc));
      }
      const result = [];
      for (let i = 0; i < blocks[0].length; i++) {
        blocks.forEach((block, j) => {
          if (i !== shortBlockLen - blockEccLen || j >= numShortBlocks) {
            result.push(block[i]);
          }
        });
      }
      return result;
    }
    drawCodewords(data) {
      let i = 0;
      for (let right = this.size - 1; right >= 1; right -= 2) {
        if (right === 6) right = 5;
        for (let vert = 0; vert < this.size; vert++) {
          for (let j = 0; j < 2; j++) {
            const x = right - j;
            const upward = (right + 1 & 2) === 0;
            const y = upward ? this.size - 1 - vert : vert;
            if (!this.isFunction[y][x] && i < data.length * 8) {
              this.modules[y][x] = getBit(data[i >>> 3], 7 - (i & 7));
              i++;
            }
          }
        }
      }
    }
    // -- masking + penalty ---------------------------------------------------
    applyMask(mask) {
      if (mask < 0 || mask > 7) throw new RangeError("Mask out of range");
      for (let y = 0; y < this.size; y++) {
        for (let x = 0; x < this.size; x++) {
          let invert;
          switch (mask) {
            case 0:
              invert = (x + y) % 2 === 0;
              break;
            case 1:
              invert = y % 2 === 0;
              break;
            case 2:
              invert = x % 3 === 0;
              break;
            case 3:
              invert = (x + y) % 3 === 0;
              break;
            case 4:
              invert = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
              break;
            case 5:
              invert = x * y % 2 + x * y % 3 === 0;
              break;
            case 6:
              invert = (x * y % 2 + x * y % 3) % 2 === 0;
              break;
            case 7:
              invert = ((x + y) % 2 + x * y % 3) % 2 === 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          if (!this.isFunction[y][x] && invert) {
            this.modules[y][x] = !this.modules[y][x];
          }
        }
      }
    }
    getPenaltyScore() {
      let result = 0;
      for (let y = 0; y < this.size; y++) {
        let runColor = false;
        let runX = 0;
        const runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let x = 0; x < this.size; x++) {
          if (this.modules[y][x] === runColor) {
            runX++;
            if (runX === 5) result += PENALTY_N1;
            else if (runX > 5) result++;
          } else {
            this.finderPenaltyAddHistory(runX, runHistory);
            if (!runColor) {
              result += this.finderPenaltyCountPatterns(runHistory) * PENALTY_N3;
            }
            runColor = this.modules[y][x];
            runX = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runX, runHistory) * PENALTY_N3;
      }
      for (let x = 0; x < this.size; x++) {
        let runColor = false;
        let runY = 0;
        const runHistory = [0, 0, 0, 0, 0, 0, 0];
        for (let y = 0; y < this.size; y++) {
          if (this.modules[y][x] === runColor) {
            runY++;
            if (runY === 5) result += PENALTY_N1;
            else if (runY > 5) result++;
          } else {
            this.finderPenaltyAddHistory(runY, runHistory);
            if (!runColor) {
              result += this.finderPenaltyCountPatterns(runHistory) * PENALTY_N3;
            }
            runColor = this.modules[y][x];
            runY = 1;
          }
        }
        result += this.finderPenaltyTerminateAndCount(runColor, runY, runHistory) * PENALTY_N3;
      }
      for (let y = 0; y < this.size - 1; y++) {
        for (let x = 0; x < this.size - 1; x++) {
          const color = this.modules[y][x];
          if (color === this.modules[y][x + 1] && color === this.modules[y + 1][x] && color === this.modules[y + 1][x + 1]) {
            result += PENALTY_N2;
          }
        }
      }
      let dark = 0;
      for (const row of this.modules) {
        dark = row.reduce((sum, color) => sum + (color ? 1 : 0), dark);
      }
      const total = this.size * this.size;
      const k = Math.ceil(Math.abs(dark * 20 - total * 10) / total) - 1;
      result += k * PENALTY_N4;
      return result;
    }
    finderPenaltyCountPatterns(runHistory) {
      const n = runHistory[1];
      const core = n > 0 && runHistory[2] === n && runHistory[3] === n * 3 && runHistory[4] === n && runHistory[5] === n;
      return (core && runHistory[0] >= n * 4 && runHistory[6] >= n ? 1 : 0) + (core && runHistory[6] >= n * 4 && runHistory[0] >= n ? 1 : 0);
    }
    finderPenaltyTerminateAndCount(currentRunColor, currentRunLength, runHistory) {
      if (currentRunColor) {
        this.finderPenaltyAddHistory(currentRunLength, runHistory);
        currentRunLength = 0;
      }
      currentRunLength += this.size;
      this.finderPenaltyAddHistory(currentRunLength, runHistory);
      return this.finderPenaltyCountPatterns(runHistory);
    }
    finderPenaltyAddHistory(currentRunLength, runHistory) {
      if (runHistory[0] === 0) currentRunLength += this.size;
      runHistory.pop();
      runHistory.unshift(currentRunLength);
    }
  };
  function qrMatrix(text, ecl = "M") {
    const level = ECL_MAP[String(ecl).toUpperCase()] || Ecc.MEDIUM;
    const qr = QrCode.encodeText(String(text), level);
    return { size: qr.size, modules: qr.modules };
  }
  function qrSvg(text, opts = {}) {
    const {
      size = 200,
      margin = 4,
      dark = "#0f1e3d",
      light = "#ffffff",
      ecl = "M"
    } = opts;
    const { size: n, modules } = qrMatrix(text, ecl);
    const dim = n + margin * 2;
    let path = "";
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (modules[y][x]) {
          path += `M${x + margin},${y + margin}h1v1h-1z`;
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${dim} ${dim}" shape-rendering="crispEdges" role="img" aria-label="QR code"><rect width="${dim}" height="${dim}" fill="${light}"/><path d="${path}" fill="${dark}"/></svg>`;
  }

  // shared/afiliacion.js
  var I = {
    id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M5 16c.8-1.5 2.3-2.5 4-2.5s3.2 1 4 2.5"/><line x1="15" y1="10" x2="18" y2="10"/><line x1="15" y1="13" x2="18" y2="13"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></svg>',
    ruler: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l13 13 5-5L8 3z"/><path d="M7 7l2 2M11 5l1.5 1.5M11 11l2 2M15 9l1.5 1.5"/></svg>',
    weight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 7h11l2 13H4.5z"/><circle cx="12" cy="5" r="2.2"/></svg>',
    blood: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V15z"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8.2 10 5 3M15.8 10 19 3M9 3h6"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    olimpico: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="6" cy="9" r="3.4"/><circle cx="12" cy="9" r="3.4"/><circle cx="18" cy="9" r="3.4"/><circle cx="9" cy="15" r="3.4"/><circle cx="15" cy="15" r="3.4"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    comite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 21V10l8-5 8 5v11M9 21v-6h6v6"/></svg>',
    federacion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4a1 1 0 0 1 1-1h13l-2.5 4L18 11H5"/></svg>',
    liga: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17.5" cy="9.5" r="2.6"/><path d="M15 20a5 5 0 0 1 7-4.6"/></svg>',
    club: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5z"/></svg>',
    carne: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><circle cx="8" cy="11" r="2.2"/><path d="M4.5 16.5c.7-1.6 2-2.5 3.5-2.5s2.8.9 3.5 2.5"/><line x1="15" y1="10" x2="19" y2="10"/><line x1="15" y1="13.5" x2="19" y2="13.5"/></svg>',
    cross: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 3h5.2v6.4H21v5.2h-6.4V21H9.4v-6.4H3V9.4h6.4z"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    cert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><polyline points="15 3 15 7 19 7"/><circle cx="12" cy="12" r="2.4"/><path d="M10.4 13.8 9.5 18l2.5-1.4 2.5 1.4-.9-4.2"/></svg>'
  };
  var TIER = { olimpico: { label: "Ol\xEDmpico", ico: I.olimpico }, profesional: { label: "Profesional", ico: I.medal }, juvenil: { label: "Juvenil", ico: I.user }, amateur: { label: "Amateur", ico: I.shield } };
  var MEDAL_EMOJI = { Oro: "\u{1F947}", Plata: "\u{1F948}", Bronce: "\u{1F949}" };
  var DEPORTE_EMOJI2 = { Patinaje: "\u{1F6FC}", Nataci\u00F3n: "\u{1F3CA}", F\u00FAtbol: "\u26BD", Ciclismo: "\u{1F6B4}", Atletismo: "\u{1F3C3}", Baloncesto: "\u{1F3C0}" };
  var SOL_EMOJI = { Enviada: I.send, Aprobada: I.check, Rechazada: I.x, Retirada: I.refresh, Desvinculado: I.x };
  var CLUB_EMOJI = "\u{1F6E1}\uFE0F";
  var esc = (v) => String(v == null ? "" : v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var toast = (text, type) => {
    if (window.naoweeToast) window.naoweeToast(text, type || "success");
  };
  var roleCode = getRoleFromQuery();
  var role = ROLES[roleCode] || {};
  var params = new URLSearchParams(location.search);
  var DEP_ID = params.get("id") || role.deportistaId || "DEP-001";
  var esConsulta = roleCode !== "DEPORTISTA";
  var scopeId = esConsulta ? scopeFor(roleCode) : null;
  var desde = params.get("from") || "";
  function enJurisdiccion() {
    if (!esConsulta) return true;
    if (!can(roleCode, "R", "deportistas")) return false;
    if (isGlobalScope(roleCode)) return true;
    return deportistasOf(scopeId).some((d) => d.id === DEP_ID);
  }
  function volverHref() {
    if (desde === "deportistas") return `deportistas.html?role=${encodeURIComponent(roleCode)}`;
    if (desde === "jerarquia") return `jerarquia.html?role=${encodeURIComponent(roleCode)}`;
    if (desde === "bandeja") return `bandeja.html?role=${encodeURIComponent(roleCode)}`;
    return `deportistas.html?role=${encodeURIComponent(roleCode)}`;
  }
  var ATLETA = buildDeportistaDetalle(getDeportista(DEP_ID));
  var SECCIONES = ["resumen", "documentos", "carne", "miclub", "solicitudes", "eventos", "historial", "config", "notif", "seguridad"];
  var activeSec = !esConsulta && SECCIONES.includes(params.get("sec")) ? params.get("sec") : "resumen";
  var activeTab = "datos";
  var activeHist = "trayectoria";
  function affState() {
    const sol = solicitudDeDeportista(DEP_ID);
    const retiro = retiroPendienteDe(DEP_ID);
    if (ATLETA.estado === "vinculado" && ATLETA.clubId) {
      return retiro ? { key: "baja", sol: retiro } : { key: "vinculado", sol };
    }
    if (sol && sol.tipo !== "retiro" && sol.estado === "Enviada") return { key: "pendiente", sol };
    if (sol && sol.tipo !== "retiro" && sol.estado === "Rechazada") return { key: "rechazada", sol };
    return { key: "autodeclarado", sol };
  }
  function refresh() {
    ATLETA = buildDeportistaDetalle(getDeportista(DEP_ID));
    render();
  }
  function medalStripHTML() {
    const meds = ATLETA.medalleria;
    if (!meds.length) return `<div class="pf-medal-strip"><span class="pf-medal-strip__empty">Sin medallas a\xFAn</span></div>`;
    const orden = { Oro: 0, Plata: 1, Bronce: 2 };
    const sorted = [...meds].sort((a, b) => orden[a.medalla] - orden[b.medalla]);
    const chips = sorted.slice(0, 5).map((m) => `<span class="pf-mchip pf-mchip--${m.medalla.toLowerCase()}" title="${esc(m.medalla)} \xB7 ${esc(m.evento)}">${MEDAL_EMOJI[m.medalla]}</span>`).join("");
    return `<div class="pf-medal-strip"><div class="pf-medal-strip__items">${chips}</div><span class="pf-medal-strip__count"><strong>${meds.length}</strong> ${meds.length === 1 ? "medalla" : "medallas"}</span></div>`;
  }
  function navGroups() {
    const st = affState();
    const solCount = allSolicitudes().filter((s) => s.deportistaId === DEP_ID).length;
    const miclub = { id: "miclub", label: "Mi club", icon: I.club };
    if (st.key === "pendiente") miclub.badge = "1";
    else if (st.key === "autodeclarado" || st.key === "rechazada") miclub.alert = true;
    const sol = { id: "solicitudes", label: "Solicitudes", icon: I.link };
    if (solCount) sol.badge = String(solCount);
    if (esConsulta) {
      miclub.label = "Club y cadena";
      delete miclub.alert;
      sol.label = "Historial de afiliaci\xF3n";
      return [
        { label: "Ficha", items: [{ id: "resumen", label: "Resumen", icon: I.id }, { id: "documentos", label: "Documentos", icon: I.doc, badge: "1" }, { id: "carne", label: "Carn\xE9 digital", icon: I.carne }] },
        { label: "Afiliaci\xF3n", items: [miclub, sol] },
        { label: "Deportivo", items: [{ id: "eventos", label: "Eventos", icon: I.cal }, { id: "historial", label: "Historial", icon: I.award }] }
      ];
    }
    return [
      { label: "Perfil", items: [{ id: "resumen", label: "Resumen", icon: I.id }, { id: "documentos", label: "Documentos", icon: I.doc, badge: "1" }, { id: "carne", label: "Carn\xE9 digital", icon: I.carne }] },
      { label: "Afiliaci\xF3n", items: [miclub, sol] },
      { label: "Deportivo", items: [{ id: "eventos", label: "Eventos", icon: I.cal }, { id: "historial", label: "Historial", icon: I.award }] },
      { label: "Cuenta", items: [{ id: "config", label: "Configuraciones", icon: I.gear }, { id: "notif", label: "Notificaciones", icon: I.bell }, { id: "seguridad", label: "Seguridad", icon: I.shield, alert: true }] }
    ];
  }
  function backBtnHTML() {
    return `<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small af-back" id="pfVolver">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    Volver al plantel
  </button>`;
  }
  function consultaBannerHTML() {
    const org = scopeId ? getOrganismo(scopeId) : null;
    return `<div class="naowee-message naowee-message--informative af-consulta-msg">
    <span class="naowee-message__icon">${I.shieldCheck}</span>
    <div class="naowee-message__body">
      <p class="naowee-message__text">Ficha en <strong>modo consulta</strong>${org ? ` desde <strong>${esc(org.nombre)}</strong>` : ""}: ves la informaci\xF3n del deportista, no gestionas su cuenta. Las afiliaciones y bajas se resuelven en <strong>Solicitudes de deportistas</strong>.</p>
    </div>
  </div>`;
  }
  function fueraDeAlcanceHTML() {
    const org = scopeId ? getOrganismo(scopeId) : null;
    return `
    <div class="af-oos">
      ${backBtnHTML()}
      <div class="naowee-message naowee-message--caution" style="margin-top:16px">
        <span class="naowee-message__icon">${I.alert}</span>
        <div class="naowee-message__body">
          <p class="naowee-message__title">Fuera de tu alcance</p>
          <p class="naowee-message__text">Este deportista no est\xE1 vinculado a ${org ? `<strong>${esc(org.nombre)}</strong> ni a ning\xFAn organismo de tu sub\xE1rbol` : "tu jurisdicci\xF3n"}. Cada organismo solo consulta los deportistas de su propia rama de la jerarqu\xEDa.</p>
        </div>
      </div>
    </div>`;
  }
  function render() {
    var _a, _b, _c, _d, _e;
    if (esConsulta && (!ATLETA || !enJurisdiccion())) {
      document.getElementById("pfRoot").innerHTML = fueraDeAlcanceHTML();
      (_a = document.getElementById("pfVolver")) == null ? void 0 : _a.addEventListener("click", () => {
        window.location.href = volverHref();
      });
      return;
    }
    if (!ATLETA) {
      document.getElementById("pfRoot").innerHTML = fueraDeAlcanceHTML();
      (_b = document.getElementById("pfVolver")) == null ? void 0 : _b.addEventListener("click", () => {
        window.location.href = volverHref();
      });
      return;
    }
    const t = TIER[ATLETA.tier];
    const st = affState();
    const afiliado = st.key === "vinculado" || st.key === "baja";
    document.getElementById("pfRoot").innerHTML = `
    ${esConsulta ? `<div class="af-consulta-bar">${backBtnHTML()}${consultaBannerHTML()}</div>` : ""}
    <section class="pf-hero">
      <div class="pf-ava-wrap">
        <div class="pf-ava pf-ava--${ATLETA.tier}">${esc(ATLETA.avatar)}</div>
        <span class="pf-flag pf-flag--${ATLETA.nacionalidad.iso}" title="${esc(ATLETA.nacionalidad.pais)}"></span>
        <span class="pf-tier-ribbon pf-tier--${ATLETA.tier}">${t.ico} ${t.label}</span>
      </div>
      <div class="pf-id">
        <h1 class="pf-name">${esc(ATLETA.nombreCompleto)}</h1>
        <p class="pf-doc">${esc(ATLETA.doc.tipoCorto)} ${esc(ATLETA.doc.numero)}</p>
        <div class="pf-badges">
          <span class="pf-badge pf-badge--deporte"><span class="pf-badge__dot"></span>${ATLETA.deporteEmoji} ${esc(ATLETA.deporte)}</span>
          ${afiliado ? `
            <span class="pf-badge pf-badge--club"><span class="pf-badge__dot"></span>${esc(ATLETA.clubNombre)}</span>
            <span class="pf-badge pf-badge--liga"><span class="pf-badge__dot"></span>${esc(ATLETA.ligaNombre || "Liga")}</span>
            <span class="pf-badge pf-badge--federacion"><span class="pf-badge__dot"></span>${esc(ATLETA.federacionNombre || "Federaci\xF3n")}</span>` : `<span class="pf-badge"><span class="pf-badge__dot"></span>Sin afiliaci\xF3n</span>`}
        </div>
      </div>
      <div class="pf-side">
        <div class="pf-aff-state">
          ${affStatePillHTML(st)}
          ${!esConsulta && (st.key === "autodeclarado" || st.key === "rechazada") ? `<button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" id="heroAsociar">${I.link} Asociar a club</button>` : ""}
        </div>
        ${afiliado ? medalStripHTML() : ""}
      </div>
    </section>

    <div class="pf-grid${esConsulta ? "" : " pf-grid--nonav"}">
      ${esConsulta ? `<nav class="pf-nav" id="pfNav">${navGroups().map((g) => `<div class="pf-nav__group">${g.label}</div>${g.items.map(navItem).join("")}`).join("")}</nav>` : ""}
      <div class="pf-panel" id="pfPanel"></div>
      <aside class="pf-aside">${asideHTML()}</aside>
    </div>`;
    (_c = document.getElementById("pfNav")) == null ? void 0 : _c.addEventListener("click", (e) => {
      const b = e.target.closest(".pf-nav__item");
      if (!b) return;
      activeSec = b.dataset.sec;
      syncNav();
      renderPanel();
    });
    (_d = document.getElementById("heroAsociar")) == null ? void 0 : _d.addEventListener("click", openAsociarModal);
    (_e = document.getElementById("pfVolver")) == null ? void 0 : _e.addEventListener("click", () => {
      window.location.href = volverHref();
    });
    renderPanel();
  }
  function affStatePillHTML(st) {
    const map = {
      vinculado: ["vinculado", I.check, "Vinculado"],
      baja: ["pendiente", I.clock, "Baja en tr\xE1mite"],
      pendiente: ["pendiente", I.clock, "Solicitud enviada"],
      rechazada: ["autodeclarado", I.user, "Autodeclarado"],
      autodeclarado: ["autodeclarado", I.user, "Autodeclarado"]
    };
    const [cls, ico, label] = map[st.key];
    return `<span class="af-state-pill af-state-pill--${cls}">${ico}${label}</span>`;
  }
  function navItem(s) {
    const end = s.badge ? `<span class="pf-nav__badge pf-nav__badge--${/^\d+$/.test(s.badge) ? "count" : "new"}">${s.badge}</span>` : s.alert ? `<span class="pf-nav__alert">!</span>` : "";
    return `<button type="button" class="pf-nav__item ${s.id === activeSec ? "is-active" : ""}" data-sec="${s.id}">${s.icon}<span>${s.label}</span>${end}</button>`;
  }
  function syncSecChrome() {
    if (esConsulta) return;
    const url = new URL(window.location.href);
    url.searchParams.set("sec", activeSec);
    window.history.replaceState(null, "", url);
    document.querySelectorAll('.nav-row[data-id^="afiliacion-"]').forEach((r) => {
      var _a;
      const on = r.dataset.id === `afiliacion-${activeSec}`;
      r.classList.toggle("active", on);
      (_a = r.querySelector(".active-bar")) == null ? void 0 : _a.remove();
      if (on) r.insertAdjacentHTML("afterbegin", '<span class="active-bar" aria-hidden="true"></span>');
    });
  }
  function syncNav() {
    document.querySelectorAll(".pf-nav__item").forEach((b) => b.classList.toggle("is-active", b.dataset.sec === activeSec));
  }
  function asideHTML() {
    const b = ATLETA.biometria;
    const deg = Math.round(ATLETA.completitud * 3.6);
    const pend = ATLETA.documentos.filter((d) => !d.subido || d.estado === "pendiente").length;
    return `
    <div class="pf-card">
      <h3 class="pf-card__title">Biometr\xEDa</h3>
      <div class="pf-bio-grid">
        ${bioTile(I.ruler, "Altura", b.altura, "accent")}
        ${bioTile(I.weight, "Peso", b.peso, "blue")}
        ${bioTile(I.blood, "Tipo de sangre", b.sangre, "red")}
        ${bioTile(I.medal, "IMC", b.imc, "green")}
      </div>
    </div>
    <div class="pf-card pf-ring-card">
      <div class="pf-ring" style="background:conic-gradient(var(--accent) ${deg}deg, var(--border) ${deg}deg)"><div class="pf-ring__inner">${ATLETA.completitud}%</div></div>
      <div class="pf-ring-card__txt"><strong>Completitud del perfil</strong><span>${pend} dato${pend === 1 ? "" : "s"} pendiente${pend === 1 ? "" : "s"} por completar</span></div>
    </div>`;
  }
  function bioTile(ico, l, v, c) {
    return `<div class="pf-bio-tile pf-bio-tile--${c}"><span class="pf-bio-tile__ico">${ico}</span><span class="pf-bio-tile__v">${esc(v)}</span><span class="pf-bio-tile__l">${l}</span></div>`;
  }
  function renderPanel() {
    const p = document.getElementById("pfPanel");
    syncSecChrome();
    const dispatch = { resumen: resumenHTML, documentos: documentosHTML, carne: carneHTML, miclub: miclubHTML, solicitudes: solicitudesHTML, eventos: eventosHTML, historial: historialHTML, config: configHTML, notif: notifHTML, seguridad: seguridadHTML };
    p.innerHTML = (dispatch[activeSec] || resumenHTML)();
    bindPanel();
  }
  function bindPanel() {
    var _a, _b, _c, _d, _e, _f, _g;
    const tabs = document.getElementById("pfTabs");
    if (tabs) tabs.addEventListener("click", (e) => {
      const t = e.target.closest(".naowee-tab");
      if (!t) return;
      activeTab = t.dataset.tab;
      renderPanel();
    });
    const ht = document.getElementById("pfHistTabs");
    if (ht) ht.addEventListener("click", (e) => {
      const t = e.target.closest(".naowee-tab");
      if (!t) return;
      activeHist = t.dataset.tab;
      renderPanel();
    });
    document.querySelectorAll(".pf-sw").forEach((sw) => sw.addEventListener("click", () => sw.classList.toggle("is-on")));
    document.querySelectorAll("#pfPanel .naowee-file-uploader").forEach((up) => {
      const inp = up.querySelector("input[type=file]");
      const dz = up.querySelector(".naowee-file-uploader__drop-zone");
      const handle = (file) => {
        if (!file) return;
        const doc = ATLETA.documentos.find((d) => d.nombre === up.dataset.doc);
        if (doc) {
          doc.subido = true;
          doc.estado = "revision";
          doc.sub = `Cargado: ${file.name} \xB7 en revisi\xF3n`;
        }
        renderPanel();
      };
      if (inp) inp.addEventListener("change", () => handle(inp.files[0]));
      if (dz) {
        ["dragover", "dragenter"].forEach((ev) => dz.addEventListener(ev, (e) => {
          e.preventDefault();
          dz.classList.add("is-drag-over");
        }));
        ["dragleave", "dragend"].forEach((ev) => dz.addEventListener(ev, () => dz.classList.remove("is-drag-over")));
        dz.addEventListener("drop", (e) => {
          e.preventDefault();
          dz.classList.remove("is-drag-over");
          handle(e.dataTransfer.files[0]);
        });
      }
    });
    if (activeSec === "resumen") (_a = document.querySelector("#pfPanel .pf-edit")) == null ? void 0 : _a.addEventListener("click", openEditModal);
    (_b = document.getElementById("dlCarne")) == null ? void 0 : _b.addEventListener("click", () => {
      const slug = ATLETA.nombreCompleto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      downloadBlob(`carne-suid-${ATLETA.id}-${slug}.svg`, carneSvg(), "image/svg+xml");
      toast("Carn\xE9 descargado (SVG).", "success");
    });
    (_c = document.getElementById("dlCert")) == null ? void 0 : _c.addEventListener("click", () => {
      downloadBlob(`certificado-registro-${ATLETA.id}.html`, certificadoHtml(), "text/html");
      toast("Certificado de registro descargado.", "success");
    });
    document.querySelectorAll("#pfPanel [data-asociar]").forEach((b) => b.addEventListener("click", openAsociarModal));
    (_d = document.getElementById("miclubCambiar")) == null ? void 0 : _d.addEventListener("click", () => openRetiroWarning(true));
    (_e = document.getElementById("miclubRetirar")) == null ? void 0 : _e.addEventListener("click", () => openRetiroWarning(false));
    (_f = document.getElementById("miclubCancelarBaja")) == null ? void 0 : _f.addEventListener("click", () => {
      cancelarRetiro(DEP_ID);
      toast("Cancelaste tu solicitud de baja. Sigues afiliado.", "info");
      refresh();
    });
    (_g = document.getElementById("miclubRetirarSol")) == null ? void 0 : _g.addEventListener("click", () => openConfirm({
      title: "Retirar solicitud",
      body: '<p class="af-confirm-text">\xBFSeguro que quieres retirar tu solicitud de afiliaci\xF3n? El club dejar\xE1 de verla en su bandeja. Podr\xE1s enviar una nueva cuando quieras.</p>',
      confirmLabel: "S\xED, retirar solicitud",
      onConfirm: () => {
        retirarAfiliacion(DEP_ID);
        toast("Solicitud retirada.", "info");
        refresh();
      }
    }));
  }
  var fld = (l, v, full) => `<div class="pf-field ${full ? "pf-field--full" : ""}"><div class="pf-field__l">${l}</div><div class="pf-field__v">${v || "\u2014"}</div></div>`;
  var head = (title, sub, actionHTML) => `<div class="pf-panel__head"><div><h2 class="pf-panel__title">${title}</h2>${sub ? `<p class="pf-panel__sub">${sub}</p>` : ""}</div>${actionHTML || ""}</div>`;
  function resumenHTML() {
    const st = affState();
    const TABS = [["datos", "Datos", I.id], ["ubicacion", "Ubicaci\xF3n", I.pin], ["adicionales", "Adicionales", I.medal], ["contacto", "Contacto", I.phone]];
    const tabsBar = `<div class="pf-tabs-wrap"><div class="naowee-tabs" id="pfTabs" role="tablist">${TABS.map(([id, l, ic]) => `<button class="naowee-tab ${id === activeTab ? "naowee-tab--selected" : ""}" data-tab="${id}" role="tab">${ic}${l}</button>`).join("")}</div></div>`;
    let body = "";
    if (activeTab === "datos") body = `
    ${fld("Nombre", ATLETA.nombre)} ${fld("Segundo nombre", ATLETA.segundoNombre)}
    ${fld("Apellido", ATLETA.apellido)} ${fld("Segundo apellido", ATLETA.segundoApellido)}
    ${fld("Tipo de documento", ATLETA.doc.tipo)} ${fld("N\xFAmero de documento", ATLETA.doc.numero)}
    ${fld("Sexo", ATLETA.sexo)} ${fld("Fecha de nacimiento", ATLETA.nacimiento)}
    ${fld("Edad", ATLETA.edad + " a\xF1os")} ${fld("Identidad de g\xE9nero", ATLETA.genero)}
    ${fld("Tipo de sangre", ATLETA.sangre)} ${fld("Nacionalidad", `<span class="pf-flag-chip pf-flag--${ATLETA.nacionalidad.iso}"></span>${esc(ATLETA.nacionalidad.pais)}`)}`;
    else if (activeTab === "ubicacion") body = `
    ${fld("Departamento", ATLETA.ubicacion.depto)} ${fld("Municipio", ATLETA.ubicacion.municipio)}
    ${fld("Zona", ATLETA.ubicacion.zona)} ${fld("Barrio", ATLETA.ubicacion.barrio)}
    ${fld("Direcci\xF3n", ATLETA.ubicacion.direccion, true)}`;
    else if (activeTab === "adicionales") body = `
    ${fld("Deporte principal", ATLETA.deporteEmoji + " " + esc(ATLETA.deporte))} ${fld("Modalidad", ATLETA.modalidad)}
    ${fld("Categor\xEDa", TIER[ATLETA.tier].label)} ${fld("Estado de afiliaci\xF3n", st.key === "vinculado" ? "Vinculado" : st.key === "pendiente" ? "Solicitud enviada" : "Autodeclarado")}
    ${fld("Club", ATLETA.clubNombre || "\u2014 (sin afiliaci\xF3n)")} ${fld("Liga", ATLETA.ligaNombre || "\u2014")}
    ${fld("Federaci\xF3n", ATLETA.federacionNombre || "\u2014")} ${fld("A\xF1os de pr\xE1ctica", ATLETA.aniosPractica + " a\xF1os")}`;
    else body = `
    ${fld("Correo electr\xF3nico", ATLETA.contacto.correo)} ${fld("Tel\xE9fono", ATLETA.contacto.telefono)}
    ${fld("Contacto de emergencia", ATLETA.contacto.emergenciaNombre)} ${fld("Tel. de emergencia", ATLETA.contacto.emergenciaTel)}`;
    const editBtn = esConsulta ? "" : `<button class="naowee-btn naowee-btn--mute naowee-btn--small pf-edit">${I.pencil} Editar datos</button>`;
    return `${head("Datos personales", "", editBtn)}${tabsBar}<div class="pf-body"><div class="pf-fields">${body}</div></div>`;
  }
  var DOC_STATUS = { verificado: "Verificado", vigente: "Vigente", pendiente: "Pendiente", requerido: "Requerido", revision: "En revisi\xF3n" };
  var UPLOAD_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';
  function documentosHTML() {
    const rows = ATLETA.documentos.map((d) => {
      const up = d.subido ? "" : `
      <div class="pf-doc-up">
        <div class="naowee-file-uploader" data-doc="${esc(d.nombre)}">
          <label class="naowee-file-uploader__drop-zone">
            <span class="naowee-file-uploader__drop-icon">${UPLOAD_ICO}</span>
            <span class="naowee-file-uploader__drop-title">Arrastra el archivo o haz clic para subir</span>
            <span class="naowee-file-uploader__drop-hint">PDF, JPG o PNG \xB7 m\xE1ximo 5 MB</span>
            <span class="naowee-file-uploader__drop-filename"></span>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png">
          </label>
        </div>
      </div>`;
      return `<div class="pf-doc-item ${d.subido ? "" : "is-required"}">
      <div class="pf-doc">
        <span class="pf-doc__ico ${d.subido ? "" : "is-required"}">${I.doc}</span>
        <span class="pf-doc__txt"><span class="pf-doc__nm">${esc(d.nombre)}</span><span class="pf-doc__sub">${esc(d.sub)}</span></span>
        <span class="pf-doc__st st-${d.estado}">${DOC_STATUS[d.estado] || d.estado}</span>
      </div>${up}
    </div>`;
    }).join("");
    return `${head("Documentos", "Soportes de tu registro \xFAnico de persona en el SUID.")}<div class="pf-body">${rows}</div>`;
  }
  var VERIFY_BASE = "https://suid.demo.co/v/";
  function estadoTxt(st) {
    return { vinculado: "Vinculado", baja: "Baja en tr\xE1mite", pendiente: "Solicitud enviada", rechazada: "Autodeclarado", autodeclarado: "Autodeclarado" }[st.key] || "Autodeclarado";
  }
  function carnePayload(st) {
    const a = ATLETA;
    return [
      "SUID",
      a.id,
      a.nombreCompleto,
      `${a.doc.tipoCorto} ${a.doc.numero}`,
      a.deporte,
      estadoTxt(st),
      a.clubNombre || "Sin afiliaci\xF3n",
      "Sangre " + a.sangre,
      `SOS ${a.contacto.emergenciaNombre} ${a.contacto.emergenciaTel}`,
      VERIFY_BASE + a.id
    ].join("|");
  }
  function carneHTML() {
    const st = affState();
    const afiliado = st.key === "vinculado" || st.key === "baja";
    const qr = qrSvg(carnePayload(st), { size: 118, margin: 2, dark: "#0f1e3d" });
    const row = (l, v) => `<div class="pf-carne__row"><span class="pf-carne__row-l">${l}</span><span class="pf-carne__row-v">${v}</span></div>`;
    const cadena = afiliado ? [ATLETA.ligaNombre, ATLETA.federacionNombre].filter(Boolean).join(" \xB7 ") || "\u2014" : null;
    return `${head("Carn\xE9 digital", "Tu credencial del Registro \xDAnico del Deporte, con c\xF3digo QR verificable.")}
    <div class="pf-body">
      <div class="pf-carne" id="pfCarne">
        <div class="pf-carne__band">
          <span class="pf-carne__brand">SUID \xB7 Registro \xDAnico del Deporte</span>
          <span class="pf-carne__id">${esc(ATLETA.id)}</span>
        </div>
        <div class="pf-carne__main">
          <div class="pf-carne__left">
            <div class="pf-carne__ava pf-ava--${ATLETA.tier}">${esc(ATLETA.avatar)}</div>
            <span class="pf-carne__tier">${TIER[ATLETA.tier].label}</span>
          </div>
          <div class="pf-carne__info">
            <div class="pf-carne__name">${esc(ATLETA.nombreCompleto)}</div>
            <div class="pf-carne__doc">${esc(ATLETA.doc.tipoCorto)} ${esc(ATLETA.doc.numero)}</div>
            <div class="pf-carne__rows">
              ${row("Deporte", esc(ATLETA.deporte))}
              ${row("Estado", esc(estadoTxt(st)))}
              ${row("Club", esc(ATLETA.clubNombre || "Sin afiliaci\xF3n"))}
              ${cadena ? row("Cadena", esc(cadena)) : ""}
              ${row("Sangre", esc(ATLETA.sangre))}
            </div>
            <div class="pf-carne__sos">
              <span class="pf-carne__sos-ico">${I.cross}</span>
              <div class="pf-carne__sos-body">
                <span class="pf-carne__sos-l">Contacto de emergencia</span>
                <span class="pf-carne__sos-v">${esc(ATLETA.contacto.emergenciaNombre)} \xB7 ${esc(ATLETA.contacto.emergenciaTel)}</span>
              </div>
            </div>
          </div>
          <div class="pf-carne__qr">${qr}<span class="pf-carne__qr-cap">Escanea para verificar</span></div>
        </div>
      </div>
      <div class="pf-carne-actions">
        <button type="button" class="naowee-btn naowee-btn--loud" id="dlCarne">${I.download} Descargar carn\xE9</button>
        <button type="button" class="naowee-btn naowee-btn--quiet" id="dlCert">${I.cert} Descargar certificado de registro</button>
      </div>
      <p class="pf-carne-note">${I.shieldCheck}<span>El c\xF3digo QR contiene tus <strong>datos b\xE1sicos</strong> y <strong>contacto de emergencia</strong>, m\xE1s un enlace de verificaci\xF3n del SUID (${esc(VERIFY_BASE + ATLETA.id)}). En esta demo la verificaci\xF3n es simulada.</span></p>
    </div>`;
  }
  function qrRectsSvg(payload, x, y, px, dark) {
    const m = qrMatrix(payload, "M");
    let s = "";
    for (let r = 0; r < m.size; r++) for (let c = 0; c < m.size; c++) if (m.modules[r][c]) s += `<rect x="${(x + c * px).toFixed(1)}" y="${(y + r * px).toFixed(1)}" width="${px}" height="${px}"/>`;
    return { svg: `<g fill="${dark}">${s}</g>`, modules: m.size };
  }
  function carneSvg() {
    const st = affState();
    const a = ATLETA, W = 620, H = 360;
    const q = qrRectsSvg(carnePayload(st), 0, 0, 3, "#0f1e3d");
    const qpx = q.modules * 3, qScale = 132 / qpx, qx = 448, qy = 150;
    const line = (x, y, l, v) => `<text x="${x}" y="${y}" font-size="12.5" fill="#646587">${esc(l)}</text><text x="${x + 78}" y="${y}" font-size="12.5" font-weight="600" fill="#282834">${esc(v)}</text>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter, Arial, sans-serif">
    <rect width="${W}" height="${H}" rx="18" fill="#ffffff" stroke="#e7e9f3"/>
    <path d="M0 18 A18 18 0 0 1 18 0 H${W - 18} A18 18 0 0 1 ${W} 18 V64 H0 Z" fill="#002b5b"/>
    <text x="24" y="40" font-size="14" font-weight="700" fill="#ffffff">SUID \xB7 Registro \xDAnico del Deporte</text>
    <text x="${W - 24}" y="40" font-size="13" font-weight="700" fill="#cfe0f5" text-anchor="end">${esc(a.id)}</text>
    <circle cx="70" cy="128" r="30" fill="#d74009"/>
    <text x="70" y="135" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">${esc(a.avatar)}</text>
    <text x="24" y="185" font-size="18" font-weight="800" fill="#282834">${esc(a.nombreCompleto)}</text>
    <text x="24" y="205" font-size="12.5" fill="#646587">${esc(a.doc.tipoCorto)} ${esc(a.doc.numero)} \xB7 ${esc(TIER[a.tier].label)}</text>
    ${line(24, 240, "Deporte", a.deporte)}
    ${line(24, 262, "Estado", estadoTxt(st))}
    ${line(24, 284, "Club", a.clubNombre || "Sin afiliaci\xF3n")}
    ${line(24, 306, "Sangre", a.sangre)}
    <rect x="24" y="320" width="392" height="26" rx="6" fill="#fff0ee" stroke="#ffc4bb"/>
    <text x="34" y="337" font-size="11.5" fill="#b3261e" font-weight="700">SOS</text>
    <text x="66" y="337" font-size="11.5" fill="#282834">${esc(a.contacto.emergenciaNombre)} \xB7 ${esc(a.contacto.emergenciaTel)}</text>
    <rect x="${qx - 8}" y="${qy - 8}" width="148" height="148" rx="8" fill="#ffffff" stroke="#e7e9f3"/>
    <g transform="translate(${qx}, ${qy}) scale(${qScale.toFixed(4)})">${q.svg}</g>
    <text x="${qx + 66}" y="${qy + 156}" font-size="10.5" fill="#9ca0b8" text-anchor="middle">Escanea para verificar</text>
  </svg>`;
  }
  function certificadoHtml() {
    const st = affState();
    const a = ATLETA;
    const qr = qrSvg(carnePayload(st), { size: 132, margin: 2, dark: "#002b5b" });
    const fecha = new Date(2026, 6, 17).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
    const rows = [
      ["Identificaci\xF3n", `${a.doc.tipo} ${a.doc.numero}`],
      ["Deporte", a.deporte],
      ["Categor\xEDa", TIER[a.tier].label],
      ["Estado de afiliaci\xF3n", estadoTxt(st)],
      ["Club", a.clubNombre || "Sin afiliaci\xF3n"],
      ["Liga", a.ligaNombre || "\u2014"],
      ["Federaci\xF3n", a.federacionNombre || "\u2014"],
      ["Contacto de emergencia", `${a.contacto.emergenciaNombre} \xB7 ${a.contacto.emergenciaTel}`]
    ].map(([l, v]) => `<tr><td class="l">${esc(l)}</td><td class="v">${esc(v)}</td></tr>`).join("");
    return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Certificado de registro \u2014 ${esc(a.nombreCompleto)}</title>
<style>
  *{box-sizing:border-box} body{font-family:Inter,Arial,sans-serif;color:#282834;margin:0;background:#f5f6fa;padding:32px}
  .cert{max-width:760px;margin:0 auto;background:#fff;border:1px solid #e7e9f3;border-radius:16px;overflow:hidden}
  .band{background:linear-gradient(120deg,#002b5b,#0d3b73);color:#fff;padding:22px 32px;display:flex;justify-content:space-between;align-items:center}
  .band h1{font-size:18px;margin:0} .band span{font-size:12px;opacity:.85}
  .body{padding:32px;display:flex;gap:28px} .main{flex:1}
  .lead{font-size:13px;color:#646587;line-height:1.6;margin:0 0 20px}
  .name{font-size:24px;font-weight:800;margin:0 0 4px} .sub{color:#646587;font-size:13px;margin:0 0 20px}
  table{width:100%;border-collapse:collapse} td{padding:8px 0;border-top:1px solid #eef0f6;font-size:13px;vertical-align:top}
  td.l{color:#9ca0b8;width:180px} td.v{font-weight:600}
  .qr{text-align:center;flex-shrink:0} .qr svg{border:1px solid #e7e9f3;border-radius:8px} .qr small{display:block;color:#9ca0b8;font-size:11px;margin-top:6px}
  .foot{padding:18px 32px;border-top:1px solid #eef0f6;color:#9ca0b8;font-size:11.5px;line-height:1.6}
  @media print{body{background:#fff;padding:0}.cert{border:none}}
</style></head><body>
<div class="cert">
  <div class="band"><h1>Certificado de registro \xB7 SUID</h1><span>Sistema \xDAnico de Informaci\xF3n del Deporte</span></div>
  <div class="body">
    <div class="main">
      <p class="lead">El Sistema \xDAnico de Informaci\xF3n del Deporte certifica que la siguiente persona se encuentra registrada en el Registro \xDAnico del Deporte:</p>
      <p class="name">${esc(a.nombreCompleto)}</p>
      <p class="sub">Radicado: ${esc(a.id)} \xB7 Fecha de emisi\xF3n: ${esc(fecha)}</p>
      <table>${rows}</table>
    </div>
    <div class="qr">${qr}<small>Verificaci\xF3n<br>${esc(VERIFY_BASE + a.id)}</small></div>
  </div>
  <div class="foot">Documento generado en modo demostraci\xF3n. La verificaci\xF3n por QR es simulada. El presente certificado no constituye un acto administrativo oficial.</div>
</div>
</body></html>`;
  }
  function downloadBlob(filename, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3e3);
  }
  var soloTitular = (html) => esConsulta ? "" : html;
  function miclubHTML() {
    const secTitle = esConsulta ? "Club y cadena" : "Mi club";
    const st = affState();
    if (st.key === "vinculado" || st.key === "baja") {
      const enBaja = st.key === "baja";
      const chainDefs = [
        ATLETA.liga && { mod: "liga", tipo: "Liga", ico: I.liga, nm: ATLETA.ligaNombre },
        ATLETA.federacion && { mod: "fed", tipo: "Federaci\xF3n", ico: I.federacion, nm: ATLETA.federacionNombre },
        ATLETA.comite && { mod: "comite", tipo: "Comit\xE9 / cabeza de sector", ico: I.comite, nm: ATLETA.comiteNombre }
      ].filter(Boolean);
      const chain = chainDefs.map((n) => `
      <div class="af-node af-node--${n.mod}">
        <span class="af-node__ico">${n.ico}</span>
        <span class="af-node__body"><span class="af-node__type">${n.tipo}</span><span class="af-node__nm">${esc(n.nm)}</span></span>
      </div>`).join("");
      const clubCard = `
        <div class="af-club-card">
          <span class="af-club-card__ico">${I.shieldCheck}</span>
          <div class="af-club-card__body">
            <div class="af-club-card__lead">Club afiliado</div>
            <div class="af-club-card__nm">${esc(ATLETA.clubNombre)}</div>
            <div class="af-club-card__sub">${esc(ATLETA.deporte)} \xB7 ${esc(ATLETA.modalidad)}${ATLETA.club && ATLETA.club.nit ? ` <span class="af-club-card__nit">NIT ${esc(ATLETA.club.nit)}</span>` : ""}</div>
          </div>
          <span class="af-club-card__badge">${I.check} V\xEDnculo confirmado</span>
        </div>
        <div class="af-chain">
          <div class="af-chain__title">Cadena heredada (ORG-05)</div>
          ${chain || '<div class="pf-empty">Sin cadena ascendente registrada.</div>'}
        </div>`;
      if (enBaja) {
        return `${head(secTitle, esConsulta ? "El deportista solicit\xF3 su baja: el club debe confirmar el retiro." : "Tu baja est\xE1 en tr\xE1mite: el club debe confirmar tu retiro.")}
        <div class="pf-body">
          <div class="naowee-message naowee-message--caution" role="status" style="margin-bottom:18px">
            <span class="naowee-message__icon">${I.clock}</span>
            <div class="naowee-message__body">${esConsulta ? `<p class="naowee-message__text"><strong>Solicitud de baja recibida el ${esc(st.sol.fecha)}.</strong> Est\xE1 pendiente de que <strong>${esc(ATLETA.clubNombre)}</strong> confirme el retiro en su bandeja. Hasta entonces el deportista sigue vinculado y conserva su liga y federaci\xF3n.</p>` : `<p class="naowee-message__text"><strong>Solicitud de baja enviada el ${esc(st.sol.fecha)}.</strong> Est\xE1s en espera de que <strong>${esc(ATLETA.clubNombre)}</strong> confirme tu retiro. Hasta entonces sigues vinculado y conservas tu liga y federaci\xF3n.</p>`}</div>
          </div>
          ${clubCard}
          ${soloTitular(`<div class="af-node__actions">
            <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="miclubCancelarBaja">${I.refresh} Cancelar solicitud de baja</button>
          </div>`)}
        </div>`;
      }
      return `${head(secTitle, esConsulta ? "El deportista est\xE1 afiliado a este club. Su liga y federaci\xF3n se heredan autom\xE1ticamente de \xE9l." : "Est\xE1s afiliado a un club. Tu liga y federaci\xF3n se heredan autom\xE1ticamente de \xE9l.")}
      <div class="pf-body">
        ${clubCard}
        ${soloTitular(`<div class="af-node__actions">
          <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="miclubCambiar">${I.refresh} Cambiar de club</button>
          <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="miclubRetirar">Retirar afiliaci\xF3n</button>
        </div>`)}
      </div>`;
    }
    if (st.key === "pendiente") {
      const club = getOrganismo(st.sol.clubId);
      return `${head(secTitle, esConsulta ? "La solicitud del deportista est\xE1 en espera de confirmaci\xF3n del club." : "Tu solicitud est\xE1 en espera de confirmaci\xF3n por parte del club.")}
      <div class="pf-body">
        <div class="af-sol-card">
          <div class="af-sol-card__top">
            <span class="af-sol-card__ico">\u23F3</span>
            <div class="af-sol-card__body">
              <div class="af-sol-card__lead">Solicitud enviada</div>
              <div class="af-sol-card__nm">${esc(club ? club.nombre : st.sol.clubId)}</div>
              <div class="af-sol-card__meta">Enviada el ${esc(st.sol.fecha)} \xB7 en espera de confirmaci\xF3n del club</div>
            </div>
          </div>
          ${soloTitular(`<div class="af-sol-card__foot">
            <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="miclubRetirarSol">Retirar solicitud</button>
          </div>`)}
        </div>
      </div>`;
    }
    if (st.key === "rechazada") {
      const club = getOrganismo(st.sol.clubId);
      return `${head(secTitle, esConsulta ? "La \xFAltima solicitud del deportista fue rechazada." : "Tu \xFAltima solicitud fue rechazada. Puedes enviar una nueva.")}
      <div class="pf-body">
        <div class="af-sol-card af-sol-card--rechazada">
          <div class="af-sol-card__top">
            <span class="af-sol-card__ico">${I.x}</span>
            <div class="af-sol-card__body">
              <div class="af-sol-card__lead">Solicitud rechazada</div>
              <div class="af-sol-card__nm">${esc(club ? club.nombre : st.sol.clubId)}</div>
              <div class="af-sol-card__meta">${st.sol.motivo ? "Motivo: " + esc(st.sol.motivo) : "Sin motivo registrado"}</div>
            </div>
          </div>
          ${soloTitular(`<div class="af-sol-card__foot">
            <button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" data-asociar>${I.link} Enviar nueva solicitud</button>
          </div>`)}
        </div>
      </div>`;
    }
    return `${head(secTitle, esConsulta ? "El deportista no est\xE1 afiliado a ning\xFAn club." : "A\xFAn no est\xE1s afiliado a un club.")}
    <div class="pf-body">
      <div class="naowee-empty-state">
        <span class="naowee-empty-state__icon">${I.club}</span>
        <p class="naowee-empty-state__title">${esConsulta ? "Deportista autodeclarado" : "Eres un deportista autodeclarado"}</p>
        <p class="naowee-empty-state__description">${esConsulta ? "Est\xE1 registrado en el SUID pero sin club, por lo que no hereda liga ni federaci\xF3n. Solo el propio deportista puede iniciar su afiliaci\xF3n; el club la confirma desde su bandeja (ORG-05)." : "Est\xE1s registrado en el SUID pero sin club. Al afiliarte a un club <strong>Activo</strong> y ser aprobado, heredar\xE1s autom\xE1ticamente su liga y su federaci\xF3n (ORG-05). Podr\xE1s cambiar o retirar tu afiliaci\xF3n cuando quieras."}</p>
        ${soloTitular(`<button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" data-asociar>${I.link} Buscar un club</button>`)}
      </div>
    </div>`;
  }
  function solicitudesHTML() {
    const mine = allSolicitudes().filter((s) => s.deportistaId === DEP_ID);
    if (!mine.length) {
      return `${head("Solicitudes de afiliaci\xF3n", "Historial de tus solicitudes a clubes.")}
      <div class="pf-body"><div class="naowee-empty-state">
        <span class="naowee-empty-state__icon">${I.link}</span>
        <p class="naowee-empty-state__title">Sin solicitudes a\xFAn</p>
        <p class="naowee-empty-state__description">Cuando env\xEDes una solicitud de afiliaci\xF3n a un club, aparecer\xE1 aqu\xED con su estado y trazabilidad.</p>
      </div></div>`;
    }
    const nodeCls = { Enviada: "enviada", Aprobada: "aprobada", Rechazada: "rechazada", Retirada: "retirada", Desvinculado: "rechazada" };
    const rows = mine.map((s) => {
      const club = getOrganismo(s.clubId);
      const fecha = s.resueltaFecha || s.fecha;
      const quien = s.responsable ? ` \xB7 por ${esc(s.responsable)}` : "";
      const resuelta = s.estado === "Aprobada" || s.estado === "Rechazada" || s.estado === "Desvinculado";
      const notif = resuelta ? " \xB7 \u{1F514} notificado por email/app" : "";
      const sub = s.tipo === "desvinculacion" ? `El club te desvincul\xF3 \xB7 ${esc(fecha)}${quien}${notif}${s.motivo ? ` \xB7 Motivo: ${esc(s.motivo)}` : ""}` : s.estado === "Rechazada" && s.motivo ? `Rechazada \xB7 ${esc(fecha)}${quien}${notif} \xB7 Motivo: ${esc(s.motivo)}` : `${s.estado} \xB7 ${esc(fecha)}${resuelta ? quien : ""}${notif}`;
      return `<div class="af-sol-row">
      <span class="af-sol-row__ico pf-tl__node--${nodeCls[s.estado] || "enviada"}">${SOL_EMOJI[s.estado] || I.send}</span>
      <span class="af-sol-row__body"><span class="af-sol-row__nm">${esc(club ? club.nombre : s.clubId)}</span><span class="af-sol-row__sub">${sub}</span></span>
      <span class="pf-tl__pill pf-tl__pill--${nodeCls[s.estado] || "enviada"}">${s.estado}</span>
    </div>`;
    }).join("");
    return `${head("Solicitudes de afiliaci\xF3n", "Historial de tus solicitudes a clubes.")}<div class="pf-body"><div class="af-sol-list">${rows}</div></div>`;
  }
  function eventosHTML() {
    const activos = ATLETA.inscripciones.filter((e) => e.estado === "activo");
    const finalizados = ATLETA.inscripciones.filter((e) => e.estado === "finalizado");
    if (!ATLETA.inscripciones.length) {
      return `${head("Eventos e inscripciones")}<div class="pf-body"><div class="naowee-empty-state">
      <span class="naowee-empty-state__icon">${I.cal}</span>
      <p class="naowee-empty-state__title">Sin inscripciones</p>
      <p class="naowee-empty-state__description">${ATLETA.clubId ? "A\xFAn no tienes inscripciones a eventos." : "Para competir necesitas estar afiliado a un club. As\xF3ciate a uno para inscribirte a eventos."}</p>
    </div></div>`;
    }
    const row = (e) => {
      const act = e.estado === "activo";
      return `<div class="pf-ev"><span class="pf-ev__tile ${act ? "is-active" : ""}">${ATLETA.deporteEmoji}</span><span class="pf-ev__body"><span class="pf-ev__nm">${esc(e.evento)}</span><span class="pf-ev__sub">${esc(e.prueba)}<span class="pf-ev__dot"></span>${esc(e.fecha)}</span></span><span class="pf-ev__st s-${e.estado}">${act ? "Activo" : "Finalizado"}</span></div>`;
    };
    const group = (label, list, active) => list.length ? `<div class="pf-ev-group"><div class="pf-ev-group__h ${active ? "is-active" : ""}">${label} <span>${list.length}</span></div>${list.map(row).join("")}</div>` : "";
    return `${head("Eventos e inscripciones")}<div class="pf-body">${group("Activos \xB7 pr\xF3ximos", activos, true)}${group("Finalizados", finalizados, false)}</div>`;
  }
  function trayectoriaHTML() {
    const prox = ATLETA.inscripciones.filter((e) => e.estado === "activo").map((e) => ({ anio: (e.fecha.match(/\d{4}/) || ["2026"])[0], evento: e.evento, meta: `${e.prueba} \xB7 inscrito`, cls: "proximo", node: I.cal, pill: "Pr\xF3ximo" }));
    const meds = [...ATLETA.medalleria].sort((a, b) => ("" + b.fecha).localeCompare("" + a.fecha)).map((m) => ({ anio: "" + m.fecha, evento: m.evento, meta: m.prueba, cls: m.medalla.toLowerCase(), node: MEDAL_EMOJI[m.medalla], pill: m.medalla }));
    const items = [...prox, ...meds];
    if (!items.length) return `<div class="pf-empty">Sin trayectoria deportiva registrada.</div>`;
    return `<div class="pf-tl">${items.map((it) => `
    <div class="pf-tl__item">
      <div class="pf-tl__node pf-tl__node--${it.cls}">${it.node}</div>
      <div class="pf-tl__c">
        <div class="pf-tl__top"><span class="pf-tl__year">${esc(it.anio)}</span><span class="pf-tl__pill pf-tl__pill--${it.cls}">${it.pill}</span></div>
        <div class="pf-tl__ev">${esc(it.evento)}</div>
        <div class="pf-tl__meta">${esc(it.meta)}</div>
      </div>
    </div>`).join("")}</div>`;
  }
  function medalTally(meds) {
    const t = { Oro: 0, Plata: 0, Bronce: 0 };
    meds.forEach((m) => {
      if (t[m.medalla] != null) t[m.medalla]++;
    });
    return t;
  }
  function medalPorDeporte(meds) {
    const map = {};
    meds.forEach((m) => {
      const dep = m.deporte || ATLETA.deporte || "\u2014";
      const c = map[dep] || (map[dep] = { Oro: 0, Plata: 0, Bronce: 0, total: 0 });
      if (c[m.medalla] != null) c[m.medalla]++;
      c.total++;
    });
    return map;
  }
  function talleroHTML() {
    const meds = ATLETA.medalleria;
    if (!meds.length) return "";
    const t = medalTally(meds);
    const tile = (tipo, n) => `<div class="pf-tally__item pf-tally__item--${tipo.toLowerCase()}"><span class="pf-tally__medal">${MEDAL_EMOJI[tipo]}</span><span class="pf-tally__n">${n}</span><span class="pf-tally__l">${tipo}</span></div>`;
    const porDep = medalPorDeporte(meds);
    const depRows = Object.keys(porDep).map((dep) => {
      const c = porDep[dep];
      return `<div class="pf-tally-row"><span class="pf-tally-row__dep">${DEPORTE_EMOJI2[dep] || "\u{1F3C5}"} ${esc(dep)}</span><span class="pf-tally-row__meds"><span class="m-oro">${MEDAL_EMOJI.Oro} ${c.Oro}</span><span class="m-plata">${MEDAL_EMOJI.Plata} ${c.Plata}</span><span class="m-bronce">${MEDAL_EMOJI.Bronce} ${c.Bronce}</span></span><span class="pf-tally-row__total">${c.total}</span></div>`;
    }).join("");
    return `<div class="pf-tally">${tile("Oro", t.Oro)}${tile("Plata", t.Plata)}${tile("Bronce", t.Bronce)}<div class="pf-tally__item pf-tally__item--total"><span class="pf-tally__n">${meds.length}</span><span class="pf-tally__l">Total</span></div></div>
    <div class="pf-tally-bydep"><div class="pf-tally-bydep__h">Por deporte</div>${depRows}</div>`;
  }
  function historialHTML() {
    const RANK_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>';
    const TABS = [["trayectoria", "Trayectoria", I.clock], ["medalleria", "Medaller\xEDa", I.medal], ["resultados", "Resultados", RANK_ICO]];
    const tabsBar = `<div class="pf-tabs-wrap"><div class="naowee-tabs" id="pfHistTabs" role="tablist">${TABS.map(([id, l, ic]) => `<button class="naowee-tab ${id === activeHist ? "naowee-tab--selected" : ""}" data-tab="${id}" role="tab">${ic}${l}</button>`).join("")}</div></div>`;
    let body;
    if (activeHist === "trayectoria") {
      body = trayectoriaHTML();
    } else if (activeHist === "medalleria") {
      body = ATLETA.medalleria.length ? talleroHTML() + '<div class="pf-tally-list">' + ATLETA.medalleria.map((m) => `<div class="pf-tr"><span class="pf-tr__medal m-${m.medalla.toLowerCase()}">${MEDAL_EMOJI[m.medalla]}</span><span><span class="pf-tr__nm">${esc(m.evento)}</span><span class="pf-tr__sub">${esc(m.prueba)} \xB7 ${esc(m.fecha)}</span></span><span class="pf-tr__rk is-podio">${m.medalla}</span></div>`).join("") + "</div>" : `<div class="pf-empty">Sin medallas registradas.</div>`;
    } else {
      body = ATLETA.resultados.length ? ATLETA.resultados.map((r) => {
        const cls = r.ranking <= 3 ? r.ranking : "n";
        const tag = r.ranking <= 3 ? '<span class="pf-res__tag">Podio</span>' : "";
        return `<div class="pf-res"><span class="pf-res__pos pf-res__pos--${cls}">${r.ranking}\xB0</span><span class="pf-res__body"><span class="pf-res__nm">${esc(r.evento)}</span><span class="pf-res__sub">${esc(r.prueba)} \xB7 ${esc(r.fecha)}</span></span>${tag}</div>`;
      }).join("") : `<div class="pf-empty">Sin resultados registrados.</div>`;
    }
    return `${head("Historial deportivo")}${tabsBar}<div class="pf-body">${body}</div>`;
  }
  var setRow = (nm, d, on) => `<div class="pf-set"><span class="pf-set__txt"><span class="pf-set__nm">${nm}</span><span class="pf-set__d">${d}</span></span><button class="pf-sw ${on ? "is-on" : ""}" aria-pressed="${!!on}"></button></div>`;
  function configHTML() {
    return `${head("Configuraciones")}<div class="pf-body">
    ${setRow("Idioma de la plataforma", "Espa\xF1ol (Colombia)", false)}
    ${setRow("Unidades m\xE9tricas", "Cent\xEDmetros \xB7 kilogramos", true)}
    ${setRow("Perfil visible para organismos", "Permite que clubes, ligas y federaciones vean tu trazabilidad", true)}
    ${setRow("Compartir datos para recomendaciones", "Mejora las sugerencias de clubes y eventos", false)}</div>`;
  }
  function notifHTML() {
    return `${head("Notificaciones")}<div class="pf-body">
    ${setRow("Estado de mis solicitudes de afiliaci\xF3n", "Av\xEDsame cuando un club apruebe o rechace", true)}
    ${setRow("Nuevos eventos de mi deporte", "Cuando se abran inscripciones", true)}
    ${setRow("Recordatorios de documentos", "Antes de que venza un documento", true)}
    ${setRow("Bolet\xEDn mensual", "Resumen de actividad por correo", false)}</div>`;
  }
  function seguridadHTML() {
    return `${head("Seguridad")}<div class="pf-body">
    ${setRow("Verificaci\xF3n en dos pasos", "Recomendado \u2014 protege tu cuenta", false)}
    ${setRow("Inicio de sesi\xF3n biom\xE9trico", "Huella o rostro en el dispositivo", true)}
    ${setRow("Alertas de inicio de sesi\xF3n", "Av\xEDsame de accesos nuevos", true)}
    <div class="pf-set"><span class="pf-set__txt"><span class="pf-set__nm">Contrase\xF1a</span><span class="pf-set__d">\xDAltima actualizaci\xF3n hace 3 meses</span></span><button class="pf-edit" style="white-space:nowrap">${I.pencil} Cambiar</button></div></div>`;
  }
  var _confirmSeq = 0;
  function openConfirm({ title, body, confirmLabel, danger, onConfirm }) {
    const titleId = "confirmTitle" + ++_confirmSeq;
    const prevFocus = document.activeElement;
    const ov = document.createElement("div");
    ov.className = "pf-modal-ov";
    ov.innerHTML = `<div class="pf-modal pf-modal--sm" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
    <header class="pf-modal__head"><h2 id="${titleId}">${title}</h2><button class="pf-modal__close" type="button" aria-label="Cerrar">${I.x}</button></header>
    <div class="pf-modal__body">${body}</div>
    <footer class="pf-modal__foot">
      <button type="button" class="naowee-btn naowee-btn--mute" data-cancel>Cancelar</button>
      <button type="button" class="naowee-btn ${danger ? "naowee-btn--danger" : "naowee-btn--loud"}" data-ok>${confirmLabel}</button>
    </footer>
  </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("is-open"));
    document.body.style.overflow = "hidden";
    let closed = false;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    const close = () => {
      if (closed) return;
      closed = true;
      document.removeEventListener("keydown", onKey);
      ov.classList.remove("is-open");
      setTimeout(() => {
        ov.remove();
        if (!document.querySelector(".pf-modal-ov.is-open")) document.body.style.overflow = "";
      }, 220);
      if (prevFocus && prevFocus.focus) {
        try {
          prevFocus.focus();
        } catch (_) {
        }
      }
    };
    ov.querySelector("[data-cancel]").addEventListener("click", close);
    ov.querySelector(".pf-modal__close").addEventListener("click", close);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    ov.querySelector("[data-ok]").addEventListener("click", () => {
      close();
      onConfirm();
    });
    document.addEventListener("keydown", onKey);
    setTimeout(() => {
      try {
        ov.querySelector("[data-cancel]").focus();
      } catch (_) {
      }
    }, 40);
  }
  function openRetiroWarning(cambiar) {
    const club = ATLETA.clubNombre || "tu club";
    const body = `
    <div class="af-warn">
      <span class="af-warn__ico">${I.alert}</span>
      <div class="af-warn__body">
        <p class="af-warn__lead">${cambiar ? `Para cambiar de club primero debes tramitar tu <strong>baja de ${esc(club)}</strong>.` : `Vas a solicitar tu <strong>baja de ${esc(club)}</strong>.`}</p>
        <ul class="af-warn__list">
          <li>Tu retiro <strong>no es inmediato</strong>: el club debe <strong>confirmarlo</strong>.</li>
          <li>Al confirmarse <strong>perder\xE1s</strong> tu v\xEDnculo con la liga y la federaci\xF3n heredadas.</li>
          <li>Podr\xE1s ${cambiar ? "afiliarte a un nuevo club" : "volver a afiliarte"} cuando el club acepte la baja.</li>
        </ul>
      </div>
    </div>`;
    openConfirm({
      title: cambiar ? "Cambiar de club" : "Retirar afiliaci\xF3n",
      body,
      confirmLabel: "S\xED, solicitar retiro",
      danger: true,
      onConfirm: () => {
        crearSolicitudRetiro(DEP_ID);
        toast("Solicitud de baja enviada. El club debe confirmarla.", "info");
        activeSec = "miclub";
        refresh();
      }
    });
  }
  var LOCK_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  var selectedClub = null;
  function openAsociarModal() {
    selectedClub = null;
    const ov = document.getElementById("afOv");
    const kv = (l, v) => `<dt>${l}</dt><dd>${esc(v)}</dd>`;
    document.getElementById("afBody").innerHTML = `
    <div class="pf-modal__note">${LOCK_ICO}<span>Estos datos vienen de tu registro \xFAnico de persona en el SUID y no son editables aqu\xED. El club validar\xE1 que tu deporte corresponda a su oferta.</span></div>
    <dl class="af-precarga">
      ${kv("Nombres y apellidos", ATLETA.nombreCompleto)}
      ${kv("Documento", ATLETA.doc.tipo + " \xB7 " + ATLETA.doc.numero)}
      ${kv("Deporte \xB7 modalidad", ATLETA.deporteEmoji + " " + ATLETA.deporte + " \xB7 " + ATLETA.modalidad)}
      ${kv("Correo electr\xF3nico", ATLETA.contacto.correo)}
    </dl>
    <label class="af-search-label">Buscar club (nombre o NIT)</label>
    <div class="naowee-searchbox" id="afSearchbox">
      <div class="naowee-searchbox__input-wrap">
        <span class="naowee-searchbox__icon">${I.search}</span>
        <input type="text" class="naowee-searchbox__input" id="afSearch" placeholder="Busca por nombre o NIT (m\xEDn. 3 caracteres)\u2026" autocomplete="off" spellcheck="false">
      </div>
    </div>
    <div id="afResults"></div>`;
    renderAfResults("");
    ov.classList.add("is-open");
    document.body.style.overflow = "hidden";
    const inp = document.getElementById("afSearch");
    inp.addEventListener("input", () => renderAfResults(inp.value));
    setTimeout(() => inp.focus(), 60);
    syncAfSend();
  }
  function renderAfResults(q) {
    const box = document.getElementById("afResults");
    const query = String(q || "").trim();
    if (query.length < 3) {
      box.innerHTML = `<p class="af-search-hint">Escribe al menos 3 caracteres para buscar. Solo se muestran clubes en estado <strong>Activo</strong>.</p>`;
      selectedClub = null;
      syncAfSend();
      return;
    }
    const results = buscarClubesActivos(query);
    if (!results.length) {
      box.innerHTML = `<div class="naowee-message naowee-message--caution" style="margin-top:12px" role="status">
      <span class="naowee-message__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
      <div class="naowee-message__content"><p class="naowee-message__text"><strong>Club no registrado / no encontrado.</strong> Verifica el nombre o el NIT. Si crees que tu club deber\xEDa aparecer, contacta a la liga de tu deporte para confirmar su registro y estado en el SUID.</p></div>
    </div>`;
      selectedClub = null;
      syncAfSend();
      return;
    }
    box.innerHTML = `<div class="af-results">${results.map((c) => {
      const chain = ancestorsChainPreview(c.id);
      return `<button type="button" class="af-result ${selectedClub === c.id ? "is-selected" : ""}" data-club="${esc(c.id)}">
      <span class="af-result__ico">${CLUB_EMOJI}</span>
      <span class="af-result__body"><span class="af-result__nm">${esc(c.nombre)}</span><span class="af-result__sub">NIT ${esc(c.nit || "\u2014")}${chain ? " \xB7 " + chain : ""}</span></span>
      <span class="af-result__check">${I.check}</span>
    </button>`;
    }).join("")}</div>${selectedClub ? inheritPreview(selectedClub) : ""}`;
    box.querySelectorAll(".af-result").forEach((b) => b.addEventListener("click", () => {
      selectedClub = b.dataset.club;
      renderAfResults(q);
      syncAfSend();
    }));
  }
  var _stubDep = (clubId) => buildDeportistaDetalle({ id: "_", nombre: "x", numDoc: "0", tipoDoc: "CC", deporte: "", modalidad: "", clubId });
  function ancestorsChainPreview(clubId) {
    const dep = _stubDep(clubId);
    return [dep.ligaNombre, dep.federacionNombre].filter(Boolean).join(" \xB7 ");
  }
  function inheritPreview(clubId) {
    const dep = _stubDep(clubId);
    const pill = (dot, l) => `<span class="af-inherit__pill"><span class="pf-badge__dot" style="background:${dot}"></span>${esc(l)}</span>`;
    const parts = [];
    if (dep.ligaNombre) parts.push(pill("#1f8923", dep.ligaNombre));
    if (dep.federacionNombre) parts.push(pill("#d74009", dep.federacionNombre));
    if (dep.comiteNombre) parts.push(pill("#1d4ed8", dep.comiteNombre));
    if (!parts.length) return "";
    return `<div class="af-inherit"><div class="af-inherit__title">Al aprobarse, heredar\xE1s autom\xE1ticamente</div><div class="af-inherit__chain">${parts.join('<span class="af-inherit__arrow">\u2192</span>')}</div></div>`;
  }
  function syncAfSend() {
    const b = document.getElementById("afSend");
    if (b) b.disabled = !selectedClub;
  }
  function closeAsociarModal() {
    document.getElementById("afOv").classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function enviarSolicitud() {
    if (!selectedClub) return;
    const club = getOrganismo(selectedClub);
    crearSolicitud(DEP_ID, selectedClub);
    closeAsociarModal();
    toast(`Solicitud enviada a ${club ? club.nombre : "el club"}. Te avisaremos cuando la confirme.`, "success");
    activeSec = "miclub";
    refresh();
  }
  var modalTab = "datos";
  var editState = {};
  var editBaseline = "";
  function editTabFields(tab) {
    const s = editState;
    const RO = (l, v) => ({ ro: true, l, v });
    const ED = (k, l, v, full) => ({ k, l, v, full });
    return {
      datos: [
        RO("Nombre", ATLETA.nombre),
        RO("Segundo nombre", ATLETA.segundoNombre),
        RO("Apellido", ATLETA.apellido),
        RO("Segundo apellido", ATLETA.segundoApellido),
        RO("Tipo de documento", ATLETA.doc.tipo),
        RO("N\xFAmero de documento", ATLETA.doc.numero),
        RO("Sexo", ATLETA.sexo),
        RO("Fecha de nacimiento", ATLETA.nacimiento),
        RO("Nacionalidad", ATLETA.nacionalidad.pais),
        RO("Edad", ATLETA.edad + " a\xF1os"),
        ED("genero", "Identidad de g\xE9nero", s.genero),
        ED("sangre", "Tipo de sangre", s.sangre)
      ],
      ubicacion: [
        ED("depto", "Departamento", s.depto),
        ED("municipio", "Municipio", s.municipio),
        ED("zona", "Zona", s.zona),
        ED("barrio", "Barrio", s.barrio),
        ED("direccion", "Direcci\xF3n", s.direccion, true)
      ],
      adicionales: [
        RO("Deporte principal", ATLETA.deporteEmoji + " " + ATLETA.deporte),
        RO("Modalidad", ATLETA.modalidad),
        RO("Club", ATLETA.clubNombre || "\u2014 (sin afiliaci\xF3n)"),
        RO("Liga", ATLETA.ligaNombre || "\u2014"),
        RO("Federaci\xF3n", ATLETA.federacionNombre || "\u2014"),
        RO("Categor\xEDa", TIER[ATLETA.tier].label),
        ED("manoHabil", "Mano h\xE1bil", s.manoHabil),
        ED("aniosPractica", "A\xF1os de pr\xE1ctica", s.aniosPractica)
      ],
      contacto: [
        ED("correo", "Correo electr\xF3nico", s.correo, true),
        ED("telefono", "Tel\xE9fono", s.telefono, true),
        ED("emergenciaNombre", "Contacto de emergencia", s.emergenciaNombre),
        ED("emergenciaTel", "Tel. de emergencia", s.emergenciaTel)
      ]
    }[tab];
  }
  function renderEditTabs() {
    const T = [["datos", "Datos", I.id], ["ubicacion", "Ubicaci\xF3n", I.pin], ["adicionales", "Adicionales", I.medal], ["contacto", "Contacto", I.phone]];
    document.getElementById("editTabs").innerHTML = T.map(([id, l, ic]) => `<button class="naowee-tab ${id === modalTab ? "naowee-tab--selected" : ""}" data-mtab="${id}" type="button">${ic}${l}</button>`).join("");
  }
  function renderEditBody() {
    const html = editTabFields(modalTab).map(
      (f) => f.ro ? `<div class="pf-ro ${f.full ? "col-2" : ""}"><span class="pf-ro__l">${f.l}</span><div class="pf-ro__v"><span>${esc(f.v) || "\u2014"}</span>${LOCK_ICO}</div></div>` : `<div class="naowee-textfield ${f.full ? "col-2" : ""}"><label class="naowee-textfield__label">${f.l}</label><div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" data-key="${f.k}" value="${esc(f.v)}" autocomplete="off"></div></div>`
    ).join("");
    const note = `<div class="pf-modal__note">${LOCK_ICO}<span>Los datos con candado los gestiona el administrador de Naowee y tu afiliaci\xF3n se cambia desde "Mi club". Para modificarlos, usa esa secci\xF3n o contacta al administrador.</span></div>`;
    document.getElementById("editBody").innerHTML = note + `<div class="pf-mgrid">${html}</div>`;
  }
  function syncEditDirty() {
    const b = document.getElementById("editSave");
    if (b) b.disabled = JSON.stringify(editState) === editBaseline;
  }
  function openEditModal() {
    modalTab = "datos";
    const u = ATLETA.ubicacion, c = ATLETA.contacto;
    editState = { genero: ATLETA.genero, sangre: ATLETA.sangre, depto: u.depto, municipio: u.municipio, zona: u.zona, barrio: u.barrio, direccion: u.direccion, manoHabil: ATLETA.manoHabil, aniosPractica: "" + ATLETA.aniosPractica, correo: c.correo, telefono: c.telefono, emergenciaNombre: c.emergenciaNombre, emergenciaTel: c.emergenciaTel };
    editBaseline = JSON.stringify(editState);
    renderEditTabs();
    renderEditBody();
    syncEditDirty();
    document.getElementById("editOv").classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeEditModal() {
    document.getElementById("editOv").classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function saveEdit() {
    const s = editState;
    ATLETA.genero = s.genero;
    ATLETA.sangre = s.sangre;
    ATLETA.manoHabil = s.manoHabil;
    ATLETA.aniosPractica = s.aniosPractica;
    Object.assign(ATLETA.ubicacion, { depto: s.depto, municipio: s.municipio, zona: s.zona, barrio: s.barrio, direccion: s.direccion });
    Object.assign(ATLETA.contacto, { correo: s.correo, telefono: s.telefono, emergenciaNombre: s.emergenciaNombre, emergenciaTel: s.emergenciaTel });
    closeEditModal();
    toast("Datos actualizados.", "success");
    renderPanel();
  }
  function setupModals() {
    document.getElementById("editTabs").addEventListener("click", (e) => {
      const t = e.target.closest(".naowee-tab");
      if (!t) return;
      modalTab = t.dataset.mtab;
      renderEditTabs();
      renderEditBody();
    });
    document.getElementById("editBody").addEventListener("input", (e) => {
      const inp = e.target.closest("[data-key]");
      if (!inp) return;
      editState[inp.dataset.key] = inp.value;
      syncEditDirty();
    });
    document.getElementById("editClose").addEventListener("click", closeEditModal);
    document.getElementById("editCancel").addEventListener("click", closeEditModal);
    document.getElementById("editSave").addEventListener("click", saveEdit);
    document.getElementById("editOv").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeEditModal();
    });
    document.getElementById("afClose").addEventListener("click", closeAsociarModal);
    document.getElementById("afCancel").addEventListener("click", closeAsociarModal);
    document.getElementById("afSend").addEventListener("click", enviarSolicitud);
    document.getElementById("afOv").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeAsociarModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (document.getElementById("afOv").classList.contains("is-open")) closeAsociarModal();
      else if (document.getElementById("editOv").classList.contains("is-open")) closeEditModal();
    });
  }
  seedDemoData();
  seedAfiliacionesDemo(getDemoMode());
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode, activeId: esConsulta ? "deportistas" : `afiliacion-${activeSec}` });
  mountHeader({ headerEl: document.getElementById("topHeader"), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  document.title = !ATLETA ? "Ficha fuera de tu alcance \u2014 Naowee Organismos" : !esConsulta ? `Mi perfil \u2014 ${ATLETA.nombreCompleto}` : enJurisdiccion() ? `${ATLETA.nombreCompleto} \u2014 Ficha del deportista` : "Ficha fuera de tu alcance \u2014 Naowee Organismos";
  render();
  setupModals();
})();
