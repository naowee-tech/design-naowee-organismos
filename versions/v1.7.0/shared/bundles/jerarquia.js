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
    const params = new URLSearchParams(window.location.search);
    const code = params.get("role");
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
    let toast = document.getElementById("evToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "evToast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = `${label}: pantalla disponible en una pr\xF3xima fase de la demo.`;
    toast.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
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
  var esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var ROLE_GROUPS = [
    { label: "Rector\xEDa", codes: ["MINDEPORTE"] },
    { label: "Cabezas de sector", codes: ["COMITE"] },
    { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
    { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
  ];
  function demoToast(msg) {
    let toast = document.getElementById("evToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "evToast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
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
      const items = g.codes.filter((c) => c !== "PERSONA" || esLocal()).map((c) => ROLES[c]).filter(Boolean).map(renderItem).join("");
      if (!items) return "";
      return `<div class="demo-role-switcher__group-label">${g.label}</div>${items}`;
    }).join("");
    const root = document.createElement("div");
    root.className = "demo-role-switcher demo-role-switcher--inline";
    root.id = "demoSwitcher";
    root.innerHTML = `
    <button class="demo-role-switcher__toggle" id="demoSwitcherToggle" type="button" aria-haspopup="true" aria-expanded="false">
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
    const tourPanel = document.getElementById("ttPanel");
    if (tourPanel) tourPanel.insertBefore(root, tourPanel.querySelector(".tt-panel-sub"));
    else document.body.appendChild(root);
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
        const params = new URLSearchParams(window.location.search);
        if (params.get("role") === next) {
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

  // shared/estados.js
  var ESTADOS = [
    "Preinscrito",
    "En revisi\xF3n",
    "En correcci\xF3n",
    "Activo",
    "Rechazado",
    "Suspendido",
    "Inactivo",
    "Cancelado"
  ];
  var BADGE_VARIANT = {
    "Preinscrito": "neutral",
    "En revisi\xF3n": "caution",
    "En correcci\xF3n": "caution",
    "Activo": "positive",
    "Rechazado": "negative",
    "Suspendido": "caution",
    "Inactivo": "neutral",
    "Cancelado": "negative"
  };
  function estadoBadgeVariant(estado) {
    return BADGE_VARIANT[estado] || "neutral";
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
  function childrenOf(id) {
    return allOrganismos().filter((o) => o.parentId === id);
  }
  function allDeportistas() {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const ov = readStore("deportistas-overrides", {}) || {};
    const base = SEED_DEPORTISTAS.map((d) => ov[d.id] ? { ...d, ...ov[d.id] } : { ...d });
    return [...base, ...nuevos.map((d) => ({ ...d }))];
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
    const byId2 = {};
    orgs.forEach((o) => {
      byId2[o.id] = o;
    });
    const chain = [];
    let cur = byId2[id];
    const guard = /* @__PURE__ */ new Set();
    while (cur && cur.parentId != null && byId2[cur.parentId] && !guard.has(cur.parentId)) {
      guard.add(cur.parentId);
      cur = byId2[cur.parentId];
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
  function countDescendants(orgId) {
    const sub = subtreeOf(orgId);
    const c = { federaciones: 0, ligas: 0, clubes: 0, deportistas: 0 };
    sub.forEach((o) => {
      if (o.tipo === "federacion") c.federaciones++;
      else if (o.tipo === "liga") c.ligas++;
      else if (o.tipo === "club") c.clubes++;
    });
    c.deportistas = deportistasOf(orgId).length;
    return c;
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

  // shared/devnotes.js
  function mountDevnotes(registry, root = document) {
    root.querySelectorAll("[data-devnote]").forEach((el) => {
      if (el.dataset.mounted) return;
      const n = registry[el.dataset.devnote];
      if (!n) return;
      const list = (items) => `<ul>${(items || []).map((i) => `<li>${i}</li>`).join("")}</ul>`;
      const body = n.sections ? n.sections.map((s) => `<div class="wz-devnote__sec"><div class="wz-devnote__sec-title">${s.title}</div>${list(s.items)}</div>`).join("") : list(n.items);
      el.innerHTML = `<span class="naowee-badge">Solo demo</span>Notas para devs
      <span class="wz-devnote__pop" role="tooltip"><span class="wz-devnote__head">${n.title} <em>\xB7 nota para devs, no es parte del producto</em></span>${body}</span>`;
      el.dataset.mounted = "1";
    });
  }

  // shared/entries/jerarquia.js
  seedDemoData();
  var roleCode = getRoleFromQuery();
  var role = ROLES[roleCode];
  var nivelQ = new URLSearchParams(window.location.search).get("nivel");
  var permitidos = nivelesForRole(roleCode).map((n) => n.id);
  var nivel = permitidos.includes(nivelQ) ? nivelQ : permitidos[0];
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode, activeId: `jerarquia-${nivel}` });
  mountHeader({ headerEl: document.getElementById("topHeader"), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  var EMOJI = { comite: "\u{1F3DB}\uFE0F", federacion: "\u{1F3C5}", liga: "\u{1F6A9}", club: "\u{1F6E1}\uFE0F", deportista: "\u{1F3C3}" };
  var TYPE_LABEL = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club", deportista: "Deportista" };
  var norm = (s) => [...String(s == null ? "" : s)].map((c) => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()).join("");
  var esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);
  function badgeHtml(variant, text) {
    return `<span class="naowee-badge naowee-badge--${variant} naowee-badge--quiet naowee-badge--small">${esc(text)}</span>`;
  }
  function depBadge(estado) {
    return estado === "vinculado" ? badgeHtml("positive", "Vinculado") : badgeHtml("informative", "Autodeclarado");
  }
  var scope = scopeFor(roleCode);
  function orgNode(org) {
    const children = childrenOf(org.id).map(orgNode);
    if (org.tipo === "club") deportistasOf(org.id).forEach((d) => children.push(depNode(d)));
    return {
      kind: "org",
      id: org.id,
      tipo: org.tipo,
      org,
      name: org.nombre,
      nit: org.nit,
      deporte: org.deporte,
      estado: org.estado,
      children
    };
  }
  function depNode(d) {
    return { kind: "dep", id: d.id, tipo: "deportista", dep: d, name: d.nombre, nit: d.numDoc, deporte: d.deporte, estado: d.estado, children: [] };
  }
  var roots = [];
  var minimalChain = false;
  if (roleCode === "DEPORTISTA") {
    minimalChain = true;
    const dep = allDeportistas().find((d) => d.id === scope);
    if (dep && dep.clubId) {
      const club = getOrganismo(dep.clubId);
      const chain = [...ancestorsOf(club.id)].reverse();
      chain.push(club);
      let level = [depNode(dep)];
      for (let i = chain.length - 1; i >= 0; i--) {
        const o = chain[i];
        level = [{ kind: "org", id: o.id, tipo: o.tipo, org: o, name: o.nombre, nit: o.nit, deporte: o.deporte, estado: o.estado, children: level }];
      }
      roots = level;
    } else if (dep) {
      roots = [depNode(dep)];
    }
  } else if (scope === null) {
    roots = childrenOf(null).map(orgNode);
  } else {
    const own = getOrganismo(scope);
    roots = own ? [orgNode(own)] : [];
  }
  function countsHtml(node) {
    if (minimalChain || node.kind !== "org") return "";
    const c = countDescendants(node.id);
    const parts = [];
    if (node.tipo === "comite") parts.push(seg(c.federaciones, "federaci\xF3n", "federaciones"));
    if (node.tipo === "comite" || node.tipo === "federacion") parts.push(seg(c.ligas, "liga", "ligas"));
    if (node.tipo !== "club") parts.push(seg(c.clubes, "club", "clubes"));
    parts.push(seg(c.deportistas, "deportista", "deportistas"));
    if (!parts.length) return "";
    return `<span class="jq-node__counts">${parts.join('<span aria-hidden="true">\xB7</span>')}</span>`;
  }
  var seg = (n, s, p) => `<span class="jq-node__count${n === 0 ? " jq-node__count--zero" : ""}"><b>${n}</b> ${n === 1 ? s : p}</span>`;
  function subHtml(node) {
    const type = `<span class="jq-node__type">${TYPE_LABEL[node.tipo]}</span>`;
    if (node.kind === "dep") {
      const d = node.dep;
      return `${type} \xB7 ${esc(d.deporte)}${d.modalidad ? " \u2014 " + esc(d.modalidad) : ""} \xB7 ${esc(d.tipoDoc)} ${esc(d.numDoc)}`;
    }
    const o = node.org;
    const extra = o.tipo === "club" && o.tipoClub ? ` ${esc(o.tipoClub)}` : "";
    const deporte = o.deporte && o.deporte !== "\u2014" ? ` \xB7 ${esc(o.deporte)}` : o.sector ? ` \xB7 ${esc(o.sector)}` : "";
    return `<span class="jq-node__type">${TYPE_LABEL[node.tipo]}${extra}</span>${deporte} \xB7 NIT ${esc(o.nit)}`;
  }
  renderSummary();
  function renderSummary() {
    const box = document.getElementById("summary");
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
        ${stats.map((s) => `<div class="jq-stat ${s.accent ? "jq-stat--accent" : ""}"><div class="jq-stat__val">${s.val}</div><div class="jq-stat__lbl">${esc(s.lbl)}</div></div>`).join("")}
      </div>`;
  }
  function scopeInfo() {
    if (roleCode === "MINDEPORTE") return { emoji: "\u{1F1E8}\u{1F1F4}", label: "Jurisdicci\xF3n \xB7 rector\xEDa del SND", name: "Sistema Nacional del Deporte" };
    if (roleCode === "DEPORTISTA") {
      const dep = allDeportistas().find((d) => d.id === scope);
      const club = dep && dep.clubId ? getOrganismo(dep.clubId) : null;
      return { emoji: "\u{1F3C3}", label: "Deportista \xB7 tu cadena heredada", name: dep ? `${dep.nombre}${club ? " \xB7 " + club.nombre : " \xB7 Sin club (autodeclarado)"}` : "\u2014" };
    }
    const org = getOrganismo(scope);
    return { emoji: EMOJI[org.tipo], label: `${TYPE_LABEL[org.tipo]} \xB7 tu jurisdicci\xF3n`, name: org.nombre };
  }
  function statsFor() {
    if (roleCode === "DEPORTISTA") {
      const dep = allDeportistas().find((d) => d.id === scope);
      const club = dep && dep.clubId ? getOrganismo(dep.clubId) : null;
      const n = club ? 1 : 0;
      return [
        { val: n, lbl: "Comit\xE9", accent: true },
        { val: n, lbl: "Federaci\xF3n" },
        { val: n, lbl: "Liga" },
        { val: n, lbl: "Club" }
      ];
    }
    const c = countDescendants(scope);
    if (roleCode === "MINDEPORTE") {
      return [
        { val: childrenOf(null).length, lbl: "Comit\xE9s", accent: true },
        { val: c.federaciones, lbl: "Federaciones" },
        { val: c.ligas, lbl: "Ligas" },
        { val: c.clubes, lbl: "Clubes" },
        { val: c.deportistas, lbl: "Deportistas" }
      ];
    }
    if (roleCode === "COMITE") return [{ val: c.federaciones, lbl: "Federaciones", accent: true }, { val: c.ligas, lbl: "Ligas" }, { val: c.clubes, lbl: "Clubes" }, { val: c.deportistas, lbl: "Deportistas" }];
    if (roleCode === "FEDERACION") return [{ val: c.ligas, lbl: "Ligas", accent: true }, { val: c.clubes, lbl: "Clubes" }, { val: c.deportistas, lbl: "Deportistas" }];
    if (roleCode === "LIGA") return [{ val: c.clubes, lbl: "Clubes", accent: true }, { val: c.deportistas, lbl: "Deportistas" }];
    return [{ val: c.deportistas, lbl: "Deportistas afiliados", accent: true }];
  }
  var currentEstado = "todos";
  var ESTADO_VARIANT = { Preinscrito: "neutral", "En revisi\xF3n": "caution", Activo: "positive", Rechazado: "negative", Suspendido: "caution", Inactivo: "neutral", Cancelado: "negative" };
  var DOT_COLOR = { positive: "var(--green)", caution: "#d98a00", negative: "var(--red)", neutral: "var(--text-secondary)", informative: "var(--blue-info)" };
  var estadoMenu = document.getElementById("estadoMenu");
  var estadoOpts = [{ v: "todos", label: "Todos los estados" }, ...ESTADOS.map((e) => ({ v: e, label: e }))];
  estadoMenu.innerHTML = estadoOpts.map((o) => {
    const dot = o.v === "todos" ? "" : `<span class="jq-dd-dot" style="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${DOT_COLOR[ESTADO_VARIANT[o.v]]}"></span>`;
    return `<div class="naowee-dropdown__opt ${o.v === "todos" ? "is-selected" : ""}" role="option" data-value="${o.v}">
        ${dot}<span class="jq-dd-label">${o.label}</span>
        <span class="naowee-dropdown__opt-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      </div>`;
  }).join("");
  var estadoDd = document.getElementById("estadoDd");
  var estadoTrigger = document.getElementById("estadoTrigger");
  var estadoValue = document.getElementById("estadoValue");
  estadoTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = estadoDd.classList.toggle("naowee-dropdown--open");
    estadoTrigger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", (e) => {
    if (!estadoDd.contains(e.target)) {
      estadoDd.classList.remove("naowee-dropdown--open");
      estadoTrigger.setAttribute("aria-expanded", "false");
    }
  });
  estadoMenu.addEventListener("click", (e) => {
    const opt = e.target.closest(".naowee-dropdown__opt");
    if (!opt) return;
    currentEstado = opt.dataset.value;
    estadoMenu.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.toggle("is-selected", o === opt));
    estadoValue.textContent = opt.querySelector(".jq-dd-label").textContent;
    estadoDd.classList.remove("naowee-dropdown--open");
    estadoTrigger.setAttribute("aria-expanded", "false");
    applyView();
  });
  var searchBox = document.getElementById("searchBox");
  var searchInput = document.getElementById("searchInput");
  var searchClear = document.getElementById("searchClear");
  searchInput.addEventListener("input", () => {
    searchBox.classList.toggle("naowee-searchbox--has-value", searchInput.value.length > 0);
    applyView();
  });
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    searchBox.classList.remove("naowee-searchbox--has-value");
    applyView();
    searchInput.focus();
  });
  var byId = /* @__PURE__ */ new Map();
  var parentOf = /* @__PURE__ */ new Map();
  (function index(list, parent) {
    list.forEach((n) => {
      byId.set(n.id, n);
      parentOf.set(n.id, parent);
      index(n.children, n);
    });
  })(roots, null);
  var totalOrgs = [...byId.values()].filter((n) => n.kind === "org").length;
  var ancestorIds = (id) => {
    const out = [];
    for (let p = parentOf.get(id); p; p = parentOf.get(p.id)) out.unshift(p.id);
    return out;
  };
  var fullRoots = roots;
  var PLURAL = { comite: "Comit\xE9s", federacion: "Federaciones", liga: "Ligas", club: "Clubes", deportista: "Deportistas" };
  function entryState() {
    if (roleCode === "DEPORTISTA") {
      return { list: fullRoots, ids: [] };
    }
    const base = roleCode === "MINDEPORTE" ? fullRoots : fullRoots.flatMap((n) => n.children);
    const collect = (list2) => list2.flatMap((n) => (n.tipo === nivel ? [n] : []).concat(collect(n.children)));
    const list = collect(base);
    return { list, ids: [] };
  }
  var entry = entryState();
  roots = entry.list;
  var path = entry.ids;
  var flashId = null;
  var tree = document.getElementById("tree");
  var treeCard = document.getElementById("treeCard");
  var emptyState = document.getElementById("emptyState");
  var colsFor = () => {
    const w = treeCard.clientWidth;
    return w < 560 ? 1 : w < 900 ? 2 : 3;
  };
  var fichaUrl = (id) => `afiliacion.html?role=${roleCode}&id=${encodeURIComponent(id)}&from=jerarquia`;
  var detailUrl = (id) => `organismo-detalle.html?id=${encodeURIComponent(id)}&role=${roleCode}`;
  var CHILD_LABEL = { comite: "Federaciones", federacion: "Ligas", liga: "Clubes", club: "Deportistas" };
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
    const isOrg = node.kind === "org";
    const badge = node.kind === "dep" ? depBadge(node.estado) : badgeHtml(estadoBadgeVariant(node.estado), node.estado);
    const end = hasKids ? `<span class="jq-item__lbl">Ver ${CHILD_LABEL[node.tipo].toLowerCase()}</span><svg class="jq-item__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 6 15 12 9 18"/></svg>` : "";
    const cls = `jq-item jq-item--${node.tipo}${selected ? " is-selected" : ""}${node.id === flashId ? " is-flash" : ""}`;
    const inner = `
      <span class="jq-node__emoji" aria-hidden="true">${EMOJI[node.tipo]}</span>
      <span class="jq-node__main">
        <span class="jq-node__title"><span class="jq-node__name" title="${esc(node.name)}">${esc(node.name)}</span>${badge}</span>
        <span class="jq-node__sub">${subHtml(node)}</span>
        ${trail ? `<span class="jq-item__trail">${trail}</span>` : countsHtml(node)}
      </span>
      <span class="jq-item__end">${end}</span>`;
    const open = hasKids || depth < 0 ? `<button type="button" class="jq-item__open" data-id="${esc(node.id)}" data-depth="${depth}"${hasKids ? ` aria-pressed="${selected}"` : ""}>${inner}</button>` : `<div class="jq-item__open jq-item__open--static">${inner}</div>`;
    const foot = isOrg ? `<a class="jq-item__detail${hasKids ? "" : " jq-item__detail--leaf"}" href="${detailUrl(node.id)}" aria-label="Ver detalles de ${esc(node.name)}">Ver detalles</a>` : node.tipo === "deportista" ? `<a class="jq-item__detail jq-item__detail--leaf" href="${fichaUrl(node.id)}" aria-label="Ver ficha de ${esc(node.name)}">Ver ficha</a>` : "";
    return `<li><div class="${cls}" data-id="${esc(node.id)}">${open}${foot}</div></li>`;
  }
  function columnHtml(level, depth) {
    const parent = level.parent;
    const kickerLabel = parent ? CHILD_LABEL[parent.tipo] : PLURAL[level.nodes[0] ? level.nodes[0].tipo : nivel];
    const kicker = `${kickerLabel}<span class="jq-col__count">${level.nodes.length}</span>`;
    const title = parent ? parent.name : roleCode === "MINDEPORTE" ? "Sistema Nacional del Deporte" : fullRoots[0] ? fullRoots[0].name : "Inicio";
    const btnClose = depth > 0 ? `<button type="button" class="jq-col__close" data-close="${depth}" aria-label="Cerrar ${esc(title)}" title="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>` : "";
    const actions = btnClose;
    return `
      <section class="jq-col" data-depth="${depth}" aria-label="${esc(title)}">
        <header class="jq-col__head">
          <span class="jq-col__headtext"><span class="jq-col__title">${esc(title)}</span><span class="jq-col__kicker">${kicker}</span></span>
          ${actions}
        </header>
        <ul class="jq-col__list">${level.nodes.map((n) => itemHtml(n, depth, path[depth] === n.id, "")).join("")}</ul>
      </section>`;
  }
  var REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SLIDE = { duration: 280, easing: "cubic-bezier(.22,.8,.3,1)" };
  var animateNext = false;
  function scrollListTo(list, to) {
    const max = list.scrollHeight - list.clientHeight;
    const target = Math.max(0, Math.min(to, max));
    const from = list.scrollTop;
    if (REDUCED || Math.abs(target - from) < 2) {
      list.scrollTop = target;
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / 600);
      list.scrollTop = from + (target - from) * (1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function renderColumns() {
    const before = /* @__PURE__ */ new Map();
    const prevScroll = /* @__PURE__ */ new Map();
    tree.querySelectorAll(".jq-col").forEach((c) => {
      var _a;
      before.set(c.dataset.depth, c.getBoundingClientRect().left);
      prevScroll.set(c.dataset.depth, ((_a = c.querySelector(".jq-col__list")) == null ? void 0 : _a.scrollTop) || 0);
    });
    const levels = levelsFor(path);
    const cols = colsFor();
    const first = Math.max(0, levels.length - cols);
    tree.className = "jq-cols";
    tree.dataset.cols = String(cols);
    tree.innerHTML = levels.slice(first).map((lv, i) => columnHtml(lv, first + i)).join("");
    tree.querySelectorAll(".jq-col__list").forEach((l) => {
      const d = l.closest(".jq-col").dataset.depth;
      l.scrollTop = prevScroll.get(d) || 0;
      const sel = l.querySelector(".jq-item.is-selected");
      if (sel) scrollListTo(l, l.scrollTop + sel.getBoundingClientRect().top - l.getBoundingClientRect().top);
    });
    if (animateNext && !REDUCED && before.size) slideColumns(before);
    animateNext = false;
  }
  function slideColumns(before) {
    const maxBefore = Math.max(...[...before.keys()].map(Number));
    tree.querySelectorAll(".jq-col").forEach((c) => {
      const d = c.dataset.depth;
      const w = c.getBoundingClientRect().width;
      if (before.has(d)) {
        const dx = before.get(d) - c.getBoundingClientRect().left;
        if (Math.abs(dx) > 1) c.animate([{ transform: `translateX(${dx}px)` }, { transform: "none" }], SLIDE);
      } else {
        const from = Number(d) > maxBefore ? w : -w;
        c.animate([{ transform: `translateX(${from}px)`, opacity: 0 }, { transform: "none", opacity: 1 }], SLIDE);
      }
    });
  }
  function renderResults(q, est) {
    const matches = [...byId.values()].filter((n) => {
      if (q && !norm([n.name, n.nit, n.deporte].filter(Boolean).join(" ")).includes(q)) return false;
      if (est !== "todos" && (n.kind !== "org" || n.estado !== est)) return false;
      return true;
    });
    emptyState.classList.toggle("is-shown", matches.length === 0);
    tree.className = "jq-results";
    tree.style.display = matches.length === 0 ? "none" : "";
    tree.innerHTML = `<ul class="jq-col__list">${matches.map((n) => {
      const trail = ancestorIds(n.id).map((id) => esc(byId.get(id).name)).join(" \u203A ");
      return itemHtml(n, -1, false, trail || "Ra\xEDz de tu jurisdicci\xF3n");
    }).join("")}</ul>`;
  }
  function applyView() {
    const q = norm(searchInput.value.trim());
    const active = q !== "" || currentEstado !== "todos";
    if (active) {
      renderResults(q, currentEstado);
      return;
    }
    emptyState.classList.remove("is-shown");
    tree.style.display = "";
    renderColumns();
  }
  function setPath(next, focusId, moveFocus) {
    animateNext = true;
    path = next;
    flashId = null;
    applyView();
    const target = moveFocus ? tree.querySelector(".jq-col:last-child .jq-item__open") : tree.querySelector(`.jq-item__open[data-id="${CSS.escape(focusId || "")}"]`);
    if (target && target.focus) target.focus({ preventScroll: true });
  }
  tree.addEventListener("click", (e) => {
    var _a;
    const closeBtn = e.target.closest("[data-close]");
    if (closeBtn) {
      const d = Number(closeBtn.dataset.close);
      const out = [...tree.querySelectorAll(".jq-col")].filter((c) => Number(c.dataset.depth) >= d);
      const done = () => setPath(path.slice(0, d - 1), path[d - 1], false);
      if (REDUCED || !out.length) {
        done();
        return;
      }
      Promise.all(out.map((c) => c.animate([{ transform: "none", opacity: 1 }, { transform: `translateX(${c.offsetWidth}px)`, opacity: 0 }], { duration: 200, easing: "ease-in", fill: "forwards" }).finished)).then(done);
      return;
    }
    const item = e.target.closest("button.jq-item__open");
    if (!item) return;
    const node = byId.get(item.dataset.id);
    if (!node) return;
    const depth = Number(item.dataset.depth);
    if (depth < 0) {
      const anc = ancestorIds(node.id);
      searchInput.value = "";
      searchBox.classList.remove("naowee-searchbox--has-value");
      currentEstado = "todos";
      estadoValue.textContent = "Todos los estados";
      estadoMenu.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.toggle("is-selected", o.dataset.value === "todos"));
      const own = roleCode !== "MINDEPORTE" && roleCode !== "DEPORTISTA" ? fullRoots[0] : null;
      const trail = node.children.length ? anc.concat(node.id) : anc;
      if (own && node.id !== own.id) {
        roots = own.children;
        path = trail.filter((id) => id !== own.id);
      } else {
        roots = fullRoots;
        path = trail;
      }
      flashId = node.id;
      applyView();
      (_a = tree.querySelector(`.jq-item__open[data-id="${CSS.escape(node.id)}"]`)) == null ? void 0 : _a.focus({ preventScroll: true });
      return;
    }
    setPath(path.slice(0, depth).concat(node.id), node.id, tree.dataset.cols === "1");
  });
  document.getElementById("clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    searchBox.classList.remove("naowee-searchbox--has-value");
    currentEstado = "todos";
    estadoValue.textContent = "Todos los estados";
    estadoMenu.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.toggle("is-selected", o.dataset.value === "todos"));
    applyView();
  });
  var lastCols = colsFor();
  new ResizeObserver(() => {
    const c = colsFor();
    if (c !== lastCols) {
      lastCols = c;
      if (tree.classList.contains("jq-cols")) {
        renderColumns();
      }
    }
  }).observe(treeCard);
  applyView();
  mountDevnotes({ jerarquia: { title: "Jerarqu\xEDa SND \xB7 c\xF3mo funciona por dentro", sections: [
    { title: "Alcance por rol", items: [
      "<code>scopeFor(rol)</code> da el organismo ancla; el \xE1rbol es su sub\xE1rbol (<code>childrenOf</code> + deportistas de cada club). MINDEPORTE no tiene ancla y ve todo.",
      "Un rol nunca se ve a s\xED mismo ni a sus ancestros: la primera columna arranca en los hijos de su ancla. DEPORTISTA ve solo su cadena hasta el club (<code>minimalChain</code>, sin contadores heredados).",
      "Es una vista de <strong>solo lectura</strong>: aprobar, rechazar o corregir vive en la Bandeja."
    ] },
    { title: "Relaci\xF3n con el sidebar", items: [
      "<code>nivelesForRole(rol)</code> (shared/sidebar.js) define los niveles que cuelgan de \xABJerarqu\xEDa SND\xBB; cada sub\xEDtem abre esta p\xE1gina con <code>?nivel=</code>.",
      "El nivel pedido es la <strong>ra\xEDz</strong> de la primera columna (lista plana de ese tipo). Si <code>?nivel=</code> no est\xE1 permitido para el rol, cae al primero permitido.",
      "El \xEDtem activo del sidebar se fija al nivel de entrada y <strong>no sigue</strong> a las columnas que el usuario abre o cierra.",
      "Con un solo nivel debajo (rol CLUB) no hay jerarqu\xEDa que explorar: <code>jerarquiaItems</code> no pinta la entrada."
    ] },
    { title: "Columnas y estado", items: [
      "Todo el estado de navegaci\xF3n es <code>path</code>: ids abiertos, uno por columna. <code>levelsFor(path)</code> deriva las columnas; abrir un \xEDtem = <code>path.slice(0, depth).concat(id)</code>.",
      "Se entra sin nada abierto (<code>path = []</code>): solo la primera lista, hasta que el usuario abre un nivel.",
      "Visibles: 3 columnas (\u2265900px), 2 (\u2265560px) o 1 en m\xF3vil (<code>colsFor</code>, sobre el ancho de la tarjeta, no del viewport). Las dem\xE1s viven en <code>path</code>; un ResizeObserver recalcula.",
      "Las columnas anteriores bajan a opacidad .8 y escala de grises (<code>filter: grayscale</code>, no <code>mix-blend-mode</code>, porque ese no se anima) y recuperan color y opacidad 1 con hover o foco; la transici\xF3n dura .6s; el \xEDtem seleccionado sube al tope de su columna con scroll animado de 600ms (<code>scrollListTo</code>, ease-out; las columnas que ya estaban conservan su scroll al re-renderizar).",
      "Animaci\xF3n de empuje con Web Animations (<code>slideColumns</code>); se omite con <code>prefers-reduced-motion</code>."
    ] },
    { title: "Botones de cada fila", items: [
      "<strong>Fila</strong> (bot\xF3n): abre el siguiente nivel con <code>aria-pressed</code>. Solo es bot\xF3n si tiene hijos (o viene de resultados); si no, es est\xE1tica.",
      "<strong>Chevron</strong>: aparece solo con hijos; en hover <strong>del propio bot\xF3n</strong> (no de toda la fila; solo \u22651024px) o foco de la fila se despliega \xABVer &lt;siguiente nivel&gt;\xBB (<code>CHILD_LABEL</code>).",
      "<strong>Ver detalles</strong>: organismos \u2192 <code>organismo-detalle.html?id=</code>. <strong>Ver ficha</strong>: deportistas \u2192 <code>afiliacion.html?id=\u2026&amp;from=jerarquia</code>; el \xABVolver\xBB de la ficha honra <code>from</code>.",
      "<strong>X</strong> de la columna: cierra esa columna y las de su derecha (<code>data-close</code>) con animaci\xF3n de salida; es la \xFAnica forma de subir de nivel en m\xF3vil."
    ] },
    { title: "B\xFAsqueda y filtro", items: [
      "Con texto o estado activo el \xE1rbol se reemplaza por una lista plana de coincidencias con su ruta de ancestros (<code>renderResults</code>, depth \u22121). B\xFAsqueda sin tildes (<code>norm</code>) por nombre, NIT/documento o deporte.",
      "Al elegir un resultado se limpian los filtros y se reconstruye <code>path</code> con sus ancestros (<code>ancestorIds</code>) para ubicarlo; un rol con ancla recorta su propia ra\xEDz."
    ] }
  ] } });
})();
