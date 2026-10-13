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
  function mountSidebar({ rootEl, roleCode: roleCode2, activeId: activeId2 }) {
    const role = ROLES[roleCode2] || ROLES.MINDEPORTE;
    const sections2 = getMenuForRole(role.code);
    const isCollapsed = localStorage.getItem(COLLAPSED_KEY) === "1";
    rootEl.innerHTML = renderSidebar({ sections: sections2, activeId: activeId2, isCollapsed, roleCode: role.code });
    bindSidebarEvents(rootEl);
    setupTooltips(rootEl);
    return { role, sections: sections2 };
  }
  function renderSection(section, activeId2, roleCode2) {
    return `
    ${section.section ? `<div class="nav-section">${section.section}</div>` : ""}
    ${section.items.map((it) => renderRow(it, activeId2, roleCode2)).join("")}
  `;
  }
  function renderRow(item, activeId2, roleCode2) {
    const isActive = item.id === activeId2 || item.id === "jerarquia" && String(activeId2).startsWith("jerarquia-");
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
  function renderSidebar({ sections: sections2, activeId: activeId2, isCollapsed, roleCode: roleCode2 }) {
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
        ${sections2.map((s) => renderSection(s, activeId2, roleCode2)).join("")}
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
        var _a3;
        if (row.classList.contains("active")) return;
        flashPlaceholder(((_a3 = row.querySelector(".lbl")) == null ? void 0 : _a3.textContent) || "Esta secci\xF3n");
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
  function mountHeader({ headerEl, role }) {
    const initials = role.avatar || (role.userName || role.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    headerEl.innerHTML = `
    <button class="header-burger" id="headerBurger" type="button" aria-label="Abrir men\xFA">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="profile-switcher" id="profileSwitcher">
      <div class="user-chip" id="userChipTrigger" role="button" tabindex="0" aria-haspopup="menu" aria-label="Mi cuenta">
        <div class="ava">
          <div class="ava-ring" style="background:${role.color}22;color:${role.color}">${initials}</div>
          <div class="ava-dot"></div>
        </div>
        <div class="user-info">
          <span class="user-name">${role.userName}</span>
          <span class="user-role">${role.label}</span>
        </div>
        <button class="user-chip__chevron" type="button" tabindex="-1" aria-hidden="true">${getIcon("chevron")}</button>
      </div>
      <div class="profile-dd profile-dd--identity-only" role="menu">
        <div class="profile-dd__header">
          <span class="ava-ring" style="width:42px;height:42px;font-size:14px;background:${role.color}22;color:${role.color}">${initials}</span>
          <div class="profile-dd__user">
            <strong>${role.userName}</strong>
            <span class="profile-dd__doc">${getIcon("id")}${role.userDoc || "\u2014"}</span>
            <span class="profile-dd__current-role" style="color:${role.color}">
              <span class="profile-dd__check-ico">${getIcon("check")}</span>${role.label}${role.org && role.org !== "\u2014" ? ` \xB7 ${role.org}` : ""}
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
      var _a3, _b;
      if (e.key === "Escape") {
        closeDrawer();
        (_a3 = document.getElementById("profileSwitcher")) == null ? void 0 : _a3.classList.remove("open");
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
    const root2 = document.createElement("div");
    root2.className = "demo-role-switcher";
    root2.id = "demoSwitcher";
    root2.innerHTML = `
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
    document.body.appendChild(root2);
    bindDemoSwitcher(root2);
  }
  function bindDemoSwitcher(root2) {
    var _a3, _b;
    const toggle = root2.querySelector("#demoSwitcherToggle");
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = root2.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!root2.contains(e.target)) root2.classList.remove("is-open");
    });
    root2.querySelectorAll("[data-perfil]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const next = item.getAttribute("data-perfil");
        if (!ROLES[next]) return;
        const params = new URLSearchParams(window.location.search);
        if (params.get("role") === next) {
          root2.classList.remove("is-open");
          return;
        }
        window.location.href = `${homeForRole(next)}?role=${next}`;
      });
    });
    const syncMode = () => {
      const cur = getDemoMode();
      root2.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.mode === cur ? "true" : "false");
      });
    };
    syncMode();
    root2.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const mode = b.dataset.mode;
        if (mode === getDemoMode()) return;
        localStorage.setItem(MODE_KEY, mode);
        syncMode();
        root2.classList.remove("is-open");
        window.dispatchEvent(new CustomEvent("organismos:demo-mode", { detail: { mode } }));
        setTimeout(() => demoToast(
          mode === "demo" ? "Modo libre: datos de ejemplo cargados." : "Modo guiado: estado vac\xEDo para recorrer el flujo."
        ), 160);
      });
    });
    (_a3 = root2.querySelector("#demoRestartTourBtn")) == null ? void 0 : _a3.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem(TOUR_KEY);
      root2.classList.remove("is-open");
      demoToast("Tour reiniciado \u2014 se mostrar\xE1 en tu pr\xF3xima visita.");
    });
    (_b = root2.querySelector("#demoResetBtn")) == null ? void 0 : _b.addEventListener("click", (e) => {
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
  var SEED_ORGANISMOS = [
    ...COMITES,
    ...FEDERACIONES_COC,
    ...FEDERACIONES_FICTICIAS,
    ...LIGAS,
    ...CLUBES
  ];
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

  // shared/devnotes.js?v=1.6.0
  function mountDevnotes(registry, root2 = document) {
    root2.querySelectorAll("[data-devnote]").forEach((el) => {
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
  function scopeFor(role) {
    return role in SCOPE ? SCOPE[role] : null;
  }

  // shared/perfil.js
  var SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="mp-run" viewBox="0 0 24 24"><circle cx="14" cy="4.5" r="2"/><path d="M7 21l3-6 3 2v5M6 12l3-4 4 1 3 4 3 1M10 15l-1-4"/></symbol>
  <symbol id="mp-family" viewBox="0 0 24 24"><circle cx="8" cy="6" r="2.5"/><circle cx="17" cy="9" r="2"/><path d="M4 21v-6a4 4 0 018 0v6M14 21v-4a3 3 0 016 0v4"/></symbol>
  <symbol id="mp-whistle" viewBox="0 0 24 24"><path d="M3 12a5 5 0 005 5h1a5 5 0 005-5V9h7V6H8a5 5 0 00-5 5z"/><circle cx="8.5" cy="12" r="1.5"/></symbol>
  <symbol id="mp-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></symbol>
  <symbol id="mp-doc" viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></symbol>
  <symbol id="mp-gear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></symbol>
  <symbol id="mp-trophy" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/></symbol>
  <symbol id="mp-building" viewBox="0 0 24 24"><path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M3 21h18"/></symbol>
  <symbol id="mp-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>
  <symbol id="mp-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/></symbol>
  <symbol id="mp-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="mp-left" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></symbol>
  <symbol id="mp-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>
  <symbol id="mp-edit" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></symbol>
  <symbol id="mp-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></symbol>
  <symbol id="mp-x" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></symbol>
  <symbol id="mp-flame" viewBox="0 0 24 24"><path d="M12 3s5 4.5 5 10a5 5 0 01-10 0c0-3 2-4.5 2-4.5S10 11 12 11c0-3 0-8 0-8z"/></symbol>
  <symbol id="mp-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
</svg>`;
  var ic = (id, cls = "") => `<svg class="i ${cls}" aria-hidden="true"><use href="#mp-${id}"/></svg>`;
  var esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var qs = () => new URLSearchParams(window.location.search);
  var ORG_ROLES = ["CLUB", "LIGA", "FEDERACION"];
  function resolveViewer() {
    const q = qs();
    const role = q.get("role");
    const comite = q.get("visor") === "comite" || role === "COMITE";
    let kind = "own";
    let shellRole = "PERSONA";
    if (q.get("modo") === "consulta" || role === "MINDEPORTE") {
      kind = "admin";
      shellRole = "MINDEPORTE";
    } else if (ORG_ROLES.includes(role)) {
      kind = "org";
      shellRole = role;
    } else if (comite) {
      kind = "comite";
      shellRole = "COMITE";
    }
    const orgId = kind === "org" ? scopeFor(role) : null;
    return { kind, shellRole, orgId, analisis: kind === "comite" };
  }
  var P = {
    nombre: "Laura Marcela G\xF3mez Restrepo",
    corto: "Laura",
    ini: "LG",
    doc: "C.C. 1.032.987.456",
    edad: "34 a\xF1os",
    deporte: "Patinaje (carreras)",
    depto: "Valle del Cauca",
    muni: "Cali",
    correo: "laura.gomez@correo.co",
    rolApoyo: "Docente/Entrenador"
  };
  var ALL_ROLES = ["deportista", "tutor", "apoyo"];
  var ROLE = {
    deportista: { name: "Deportista", icon: "run", group: "Como deportista", hint: "Patinaje" },
    tutor: { name: "Tutor legal", icon: "family", group: "Como tutor legal", hint: "2 menores" },
    apoyo: { name: "Personal de apoyo", icon: "whistle", group: "Como personal de apoyo", hint: "Docente/Entrenador" }
  };
  var TABS = [
    { id: "datos", label: "Datos", title: "Datos personales", fields: [
      ["Nombre", "Laura"],
      ["Segundo nombre", "Marcela"],
      ["Apellido", "G\xF3mez"],
      ["Segundo apellido", "Restrepo"],
      ["Tipo de documento", "C\xE9dula de ciudadan\xEDa", "lock"],
      ["N\xFAmero de documento", "1.032.987.456", "lock"],
      ["Fecha expedici\xF3n documento", "14/08/2010"],
      ["Sexo", "Femenino"],
      ["Fecha de nacimiento", "03/05/1992"],
      ["Edad", "34 a\xF1os", "lock"],
      ["Departamento de nacimiento", "Valle del Cauca"],
      ["Municipio de nacimiento", "Cali"],
      ["Nacionalidad", "Colombiana"],
      ["Deporte principal", "Patinaje (carreras)", "", "deportista"]
    ] },
    { id: "ubic", label: "Ubicaci\xF3n", title: "Ubicaci\xF3n", fields: [
      ["Direcci\xF3n", "Calle 5 # 38-25, apto 402"],
      ["Departamento", "Valle del Cauca"],
      ["Municipio", "Cali"],
      ["Zona", "Urbana"]
    ] },
    { id: "cont", label: "Contacto", title: "Contacto", fields: [
      ["Tel\xE9fono", "315 482 7710"],
      ["Correo electr\xF3nico", "laura.gomez@correo.co"]
    ] },
    { id: "salud", label: "Salud", title: "Salud", sensitive: true, fields: [
      ["EPS", "Sura EPS"],
      ["Nombre del contacto de emergencia", "Andr\xE9s G\xF3mez Restrepo"],
      ["Tel\xE9fono de emergencia", "318 220 4419"],
      ["Relaci\xF3n con contacto de emergencia", "Hermano"],
      ["Protecci\xF3n menores", "No aplica"]
    ] },
    { id: "socio", label: "Sociodemogr\xE1fico", title: "Sociodemogr\xE1fico", sensitive: true, fields: [
      ["Identidad de g\xE9nero", "Mujer"],
      ["Orientaci\xF3n sexual", "Prefiere no responder"],
      ["Discapacidad", "Ninguna"],
      ["Pertenencia \xE9tnica", "Ninguna"],
      ["V\xEDctima del conflicto armado", "No"],
      ["Priorizaci\xF3n", "No aplica"]
    ] },
    { id: "adic", label: "Datos adicionales", title: "Datos adicionales", fields: [
      ["Talla de uniforme", "S"],
      ["Grado escolar", "Profesional"]
    ] }
  ];
  var TRAY = [
    { yr: 2025, ev: "Juegos Nacionales", prueba: "500 m", fase: "Final", pos: "2.\xBA", marca: "43,812 s", medal: "silver", cyc: true },
    { yr: 2024, ev: "Campeonato Nacional", prueba: "1000 m", fase: "Final", pos: "1.\xBA", marca: "1:27,405", medal: "gold", cyc: true },
    { yr: 2023, ev: "Juegos Departamentales", prueba: "500 m", fase: "Semifinal", pos: "4.\xBA", marca: "45,130 s", medal: null }
  ];
  var MEDAL = { gold: "Oro", silver: "Plata", bronze: "Bronce" };
  var EVAL = [
    ["T\xE9cnica", "Salida explosiva y buena posici\xF3n baja en la recta. Pierde eficiencia en la segunda curva por apertura del apoyo derecho."],
    ["T\xE1ctica", "Lee bien la carrera desde la segunda posici\xF3n; el adelantamiento final lleg\xF3 tarde para disputar el oro."],
    ["F\xEDsica", "Potencia anaer\xF3bica por encima del promedio de la categor\xEDa. Recuperaci\xF3n entre series mejorable."],
    ["Conclusiones", "Deportista con proyecci\xF3n para el ciclo ol\xEDmpico en distancias cortas."],
    ["Recomendaciones", "Trabajo espec\xEDfico de curva y bloques de resistencia a la velocidad en el pr\xF3ximo mesociclo."]
  ];
  var ESTADO = {
    vinculado: ["Vinculado", "ok"],
    solicitada: ["Solicitada", "wait"],
    solicitado: ["Solicitado", "wait"],
    rechazada: ["Rechazada", "no"],
    rechazado: ["Rechazado", "no"],
    desvinculado: ["Desvinculado", "off"],
    registrado: ["Registrado", "ok"],
    revision: ["En revisi\xF3n", "rev"],
    pendiente: ["Pendiente", "wait"],
    inactivo: ["Inactivo", "off"]
  };
  var pill = (e) => `<span class="mp-st mp-st--${ESTADO[e][1]}">${ESTADO[e][0]}</span>`;
  var viewer = resolveViewer();
  var own = viewer.kind === "own";
  var third = !own;
  var canEdit = viewer.kind === "own" || viewer.kind === "admin";
  var parseRoles = () => {
    const r = (qs().get("roles") || ALL_ROLES.join(",")).split(",").map((s) => s.trim()).filter((s) => ALL_ROLES.includes(s));
    return r.length ? r : ALL_ROLES.slice();
  };
  var personaRoles = parseRoles();
  var scope = viewer.orgId ? /* @__PURE__ */ new Set([viewer.orgId, ...subtreeOf(viewer.orgId).map((o) => o.id)]) : null;
  var _a;
  var orgName = viewer.orgId ? ((_a = getOrganismo(viewer.orgId)) == null ? void 0 : _a.nombre) || "tu organismo" : "";
  var state = {
    section: qs().get("seccion") === "analisis" && !resolveViewer().analisis ? "perfil" : qs().get("seccion") || "perfil",
    tab: { perfil: "datos", tray: "tr", eval: 0 },
    editing: null,
    activa: true,
    afiliaciones: [
      { id: "af1", org: "CLU-001", nombre: "Club Pat\xEDn Cali", sub: "Club \xB7 Patinaje \xB7 Cali", estado: "vinculado", fecha: "Desde 12/03/2022" },
      { id: "af2", org: "CLU-003", nombre: "Club Pat\xEDn Vallecaucano", sub: "Club \xB7 Patinaje \xB7 Cali", estado: "solicitada", fecha: "Enviada el 02/10/2026" }
    ],
    vinculos: [
      { id: "vi1", org: "LIG-001", nombre: "Liga de Patinaje del Valle", sub: "Liga \xB7 Valle del Cauca", estado: "vinculado", fecha: "Desde 20/01/2024", aprueba: "la liga" },
      { id: "vi2", org: "CLU-001", nombre: "Club Pat\xEDn Cali", sub: "Club \xB7 Cali", estado: "solicitado", fecha: "Enviada el 29/09/2026", aprueba: "el club" }
    ],
    menores: [
      { id: "mn1", ini: "TG", nombre: "Tom\xE1s G\xF3mez", meta: ["T.I.", "12 a\xF1os", "Patinaje \xB7 Club Pat\xEDn Cali", "V\xEDnculo: Padre/Madre"], estado: "registrado", org: "CLU-001" },
      { id: "mn2", ini: "SG", nombre: "Sara G\xF3mez", meta: ["T.I.", "9 a\xF1os", "Nataci\xF3n", "V\xEDnculo: Padre/Madre"], estado: "revision", org: null }
    ]
  };
  var VIVOS = ["vinculado", "solicitada", "solicitado"];
  var inScope = (it) => !scope || scope.has(it.org);
  var afiliacionesVis = () => state.afiliaciones.filter((a) => inScope(a) && (VIVOS.includes(a.estado) || a.touched));
  var vinculosVis = () => state.vinculos.filter((v) => inScope(v) && (VIVOS.includes(v.estado) || v.touched));
  function visibleRoles() {
    return personaRoles.filter((r) => {
      if (viewer.kind !== "org") return true;
      if (r === "deportista") return state.afiliaciones.some(inScope);
      if (r === "apoyo") return state.vinculos.some(inScope);
      return r === "tutor";
    });
  }
  var has = (r) => visibleRoles().includes(r);
  function sections() {
    const out = [{ id: "perfil", label: "Perfil", icon: "user" }];
    if (has("deportista")) {
      out.push({ id: "trayectoria", label: "Trayectoria", icon: "trophy", group: "deportista" });
      out.push({ id: "afiliaciones", label: "Afiliaciones", icon: "building", group: "deportista", pend: pendAfil() });
      if (viewer.analisis) out.push({ id: "analisis", label: "An\xE1lisis cualitativo", icon: "chart", group: "deportista", only: "Solo Comit\xE9 Ol\xEDmpico y ROOT" });
    }
    if (has("tutor")) out.push({ id: "menores", label: third ? "Menores" : "Mis menores", icon: "family", group: "tutor", pend: pendMen() });
    if (has("apoyo")) out.push({ id: "vinculos", label: "V\xEDnculos", icon: "link", group: "apoyo", pend: pendVin() });
    if (own || viewer.kind === "admin") out.push({ id: "documentos", label: "Documentos", icon: "doc", soon: true });
    if (own) out.push({ id: "configuracion", label: "Configuraci\xF3n", icon: "gear", soon: true });
    return out;
  }
  function pendAfil() {
    const n = afiliacionesVis().filter((a) => a.estado === "solicitada").length;
    return n ? { txt: `${n} solicitada${n > 1 ? "s" : ""}`, aria: `${n} afiliaci\xF3n${n > 1 ? "es" : ""} solicitada${n > 1 ? "s" : ""}, pendiente${n > 1 ? "s" : ""} de aprobaci\xF3n` } : null;
  }
  function pendMen() {
    const n = state.menores.filter((m) => m.estado === "revision").length;
    return n ? { txt: `${n} en revisi\xF3n`, aria: `${n} menor${n > 1 ? "es" : ""} en revisi\xF3n`, rev: true } : null;
  }
  function pendVin() {
    const n = vinculosVis().filter((v) => v.estado === "solicitado").length;
    return n ? { txt: `${n} solicitado${n > 1 ? "s" : ""}`, aria: `${n} v\xEDnculo${n > 1 ? "s" : ""} solicitado${n > 1 ? "s" : ""}, pendiente${n > 1 ? "s" : ""} de aprobaci\xF3n` } : null;
  }
  function pendientes() {
    if (!own) return [];
    const out = [];
    if (personaRoles.includes("deportista")) state.afiliaciones.filter((a) => a.estado === "solicitada").forEach((a) => out.push({ t: `Afiliaci\xF3n a ${a.nombre}`, sub: "La aprueba el club", estado: "solicitada", act: "cancel", kind: "af", id: a.id }));
    if (personaRoles.includes("tutor")) state.menores.filter((m) => m.estado === "revision").forEach((m) => out.push({ t: m.nombre, sub: "El Ministerio valida sus documentos", estado: "revision", act: "ver", go: "menores" }));
    if (personaRoles.includes("apoyo")) state.vinculos.filter((v) => v.estado === "solicitado").forEach((v) => out.push({ t: `V\xEDnculo con ${v.nombre}`, sub: `Lo aprueba ${v.aprueba}`, estado: "solicitado", act: "cancel", kind: "vi", id: v.id }));
    return out;
  }
  var root;
  var DEPORTISTA_SECS = ["perfil", "trayectoria", "afiliaciones", "analisis"];
  var devnote = (k) => `<span class="wz-devnote" tabindex="0" role="button" data-devnote="${k}"></span>`;
  function render() {
    const secs = sections();
    if (!secs.some((s) => s.id === state.section)) state.section = "perfil";
    const scrollTabs = {};
    root.querySelectorAll("[data-tabs]").forEach((t) => {
      scrollTabs[t.dataset.tabs] = t.scrollLeft;
    });
    const enJurisdiccion = personaRoles.includes("deportista") && state.afiliaciones.some(inScope) || personaRoles.includes("apoyo") && state.vinculos.some(inScope);
    if (viewer.kind === "org" && (qs().get("persona") === "ajena" || !enJurisdiccion)) {
      root.innerHTML = `
      ${renderTop(true)}
      <div class="mp-card mp-empty"><div class="mp-tile">${ic("building")}</div>
        <h3>Esta persona no est\xE1 vinculada a ${esc(orgName)}</h3>
        <p>Solo puedes ver el perfil de personas afiliadas o vinculadas a tu organismo o a uno que dependa de \xE9l${qs().get("role") === "CLUB" ? ", o que le hayan enviado una solicitud a tu club" : ""}.</p></div>`;
      mountDevnotes(DEVNOTES, root);
      return;
    }
    root.innerHTML = `
    ${renderTop()}
    ${renderExamples()}
    ${renderHeader()}
    <div class="mp-layout">
      ${renderNav(secs)}
      ${renderPicker(secs)}
      <div class="mp-content" id="mpContent">${state.section === "perfil" ? renderPendientes() : ""}${renderSection2(state.section)}</div>
    </div>`;
    bind();
    root.querySelectorAll("[data-tabs]").forEach((t) => {
      if (scrollTabs[t.dataset.tabs]) t.scrollLeft = scrollTabs[t.dataset.tabs];
    });
    syncTabFades();
    mountDevnotes(DEVNOTES, root);
  }
  function renderTop(denied) {
    const q = qs();
    const from = q.get("from");
    if (viewer.kind === "admin") {
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("info", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text"><strong>Consulta de usuario</strong> \u2014 Esta vista es de consulta y edici\xF3n de datos del usuario. Los cambios que guardes quedan registrados a tu nombre.</p></div></div>
      <div class="mp-bar">
        <a class="mp-back" href="${esc(from || "jerarquia.html?role=MINDEPORTE")}" data-back>${ic("left")}Volver al listado</a>
        <div class="mp-bar__end">
          <div class="mp-acct"><span class="mp-acct__l">Estado de la cuenta</span>${state.activa ? '<span class="mp-st mp-st--ok">Activo</span>' : '<span class="mp-st mp-st--off">Inactivo</span>'}
            <button class="mp-btn mp-btn--sm" type="button" data-acct>${state.activa ? "Inactivar cuenta" : "Activar cuenta"}</button></div>
          ${devnote("barAdmin")}
        </div>
      </div>`;
    }
    if (viewer.kind === "org") {
      const back = from || (qs().get("role") === "CLUB" ? "deportistas.html?role=CLUB" : `jerarquia.html?role=${qs().get("role")}`);
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("eye", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">${denied ? `Est\xE1s consultando como <strong>${esc(orgName)}</strong>.` : `Est\xE1s viendo el perfil de una persona vinculada a <strong>${esc(orgName)}</strong>. Ves sus datos y lo que tiene relaci\xF3n con tu organismo.`}</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(back)}">${ic("left")}Volver</a><div class="mp-bar__end">${devnote("barVisor")}</div></div>`;
    }
    if (viewer.kind === "comite") {
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("eye", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">Est\xE1s viendo el perfil como <strong>Comit\xE9 Ol\xEDmpico Colombiano</strong>: ves todo el perfil y el an\xE1lisis cualitativo, en solo lectura.</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(from || "jerarquia.html?role=COMITE")}">${ic("left")}Volver</a><div class="mp-bar__end">${devnote("barVisor")}</div></div>`;
    }
    return "";
  }
  function renderHeader() {
    const vr = visibleRoles();
    const chips = vr.map((r) => {
      const go2 = r === "deportista" ? "trayectoria" : r === "tutor" ? "menores" : "vinculos";
      return `<li><a class="mp-rchip" href="?seccion=${go2}" data-go="${go2}"><span class="mp-ic">${ic(ROLE[r].icon)}</span><span class="mp-rchip__l">${ROLE[r].name}</span><small>${ROLE[r].hint}</small></a></li>`;
    }).join("");
    return `
    <section class="mp-hcard" aria-labelledby="mpName">
      <div class="mp-hcard__top">
        <div class="mp-ava" aria-hidden="true">${P.ini}</div>
        <div class="mp-hid">
          <h1 id="mpName">${P.nombre}</h1>
          <p class="mp-doc">${P.doc} \xB7 ${P.edad}</p>
          ${own ? `<div class="mp-hid__note">${devnote("barOwn")}</div>` : ""}
          <ul class="mp-roles" aria-label="Roles de la persona">${chips}
            ${own ? `<li><button class="mp-addrole" type="button" data-addrole>${ic("plus", "sm")}Agregar rol</button></li>` : ""}</ul>
        </div>
      </div>
      <dl class="mp-hstrip">
        ${vr.includes("deportista") ? `<div><dt>Deporte principal</dt><dd>${P.deporte}</dd></div>` : ""}
        <div><dt>Departamento</dt><dd>${P.depto}</dd></div>
        <div><dt>Municipio</dt><dd>${P.muni}</dd></div>
        <div class="mp-hstrip__mail"><dt>Correo</dt><dd>${P.correo}</dd></div>
      </dl>
      ${vr.includes("deportista") && DEPORTISTA_SECS.includes(state.section) ? `
        <div class="mp-hbio" role="group" aria-label="Biometr\xEDa, actualizada el 15/09/2026">
          <span class="mp-hbio__t">Biometr\xEDa</span>
          <dl class="mp-bio">
            <div><dt>Altura</dt><dd>166 cm</dd></div><div><dt>Peso</dt><dd>58 kg</dd></div>
            <div><dt>Sangre</dt><dd>O+</dd></div><div><dt>IMC</dt><dd>21,0</dd></div>
          </dl>
          <span class="mp-hbio__d">Act. 15/09/2026</span>
        </div>` : ""}
    </section>`;
  }
  function navLink(s) {
    const cur = s.id === state.section ? ' aria-current="page"' : "";
    const pend = s.pend ? `<span class="mp-pend${s.pend.rev ? " mp-pend--rev" : ""}" aria-label="${esc(s.pend.aria)}">${s.pend.txt}</span>` : "";
    const soon = s.soon ? '<span class="mp-soon">Pronto</span>' : "";
    return `<li><a href="?seccion=${s.id}" data-sec="${s.id}"${cur}>${ic(s.icon)}<span class="mp-nav__l">${s.label}</span>${pend}${soon}</a>${s.only ? `<span class="mp-only">${s.only}</span>` : ""}</li>`;
  }
  function renderNav(secs) {
    const top = secs.filter((s) => !s.group && !s.soon);
    const tail = secs.filter((s) => s.soon);
    const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
    return `
    <nav class="mp-nav" aria-label="Secciones del perfil">
      <ul>${top.map(navLink).join("")}</ul>
      ${groups.map((g) => `
        <div class="mp-sgroup">
          <p class="mp-sgroup-h" id="mpg-${g}">${ic(ROLE[g].icon)}${ROLE[g].group}</p>
          <ul aria-labelledby="mpg-${g}">${secs.filter((s) => s.group === g).map(navLink).join("")}</ul>
        </div>`).join("")}
      ${tail.length ? `<div class="mp-sgroup"><ul>${tail.map(navLink).join("")}</ul></div>` : ""}
    </nav>`;
  }
  function renderPicker(secs) {
    const opt = (s) => `<option value="${s.id}"${s.id === state.section ? " selected" : ""}>${s.label}${s.pend ? ` (${s.pend.txt})` : ""}${s.soon ? " \xB7 pronto" : ""}</option>`;
    const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
    return `
    <div class="mp-picker">
      <label for="mpPick">Secci\xF3n</label>
      <div class="mp-sel">
        <select id="mpPick">
          ${secs.filter((s) => !s.group && !s.soon).map(opt).join("")}
          ${groups.map((g) => `<optgroup label="${ROLE[g].group}">${secs.filter((s) => s.group === g).map(opt).join("")}</optgroup>`).join("")}
          ${secs.some((s) => s.soon) ? `<optgroup label="Cuenta">${secs.filter((s) => s.soon).map(opt).join("")}</optgroup>` : ""}
        </select>${ic("down")}
      </div>
    </div>`;
  }
  function renderPendientes() {
    const pend = pendientes();
    if (!pend.length) return "";
    const MAX = 3;
    const shown = state.pendOpen ? pend : pend.slice(0, MAX);
    return `
    <section class="mp-card mp-pend-card" aria-labelledby="mpPend">
      <div class="mp-pend-card__h"><h2 id="mpPend">Pendientes <span class="mp-pend-card__n">\xB7 ${pend.length}</span></h2>${devnote("pendientes")}</div>
      <ul class="mp-pendl">
        ${shown.map((p) => `
          <li><div class="mp-pendl__tx"><strong>${esc(p.t)}</strong><span class="mp-pendl__sub">${esc(p.sub)}</span></div>
            ${pill(p.estado)}
            ${p.act === "cancel" ? `<button class="mp-link" type="button" data-cancel="${p.kind}:${p.id}">Cancelar solicitud</button>` : `<button class="mp-link" type="button" data-go="${p.go}">Ver</button>`}</li>`).join("")}
      </ul>
      ${pend.length > MAX ? `<button class="mp-link mp-pend-card__more" type="button" data-pend-toggle aria-expanded="${!!state.pendOpen}">${state.pendOpen ? "Ver menos" : `Ver ${pend.length - MAX} m\xE1s`}</button>` : ""}
    </section>`;
  }
  var EJEMPLOS = [["deportista,tutor,apoyo", "Multi-rol"], ["deportista", "Solo deportista"], ["tutor", "Solo tutor legal"], ["apoyo", "Solo personal de apoyo"]];
  function renderExamples() {
    if (!own) return "";
    const cur = personaRoles.join(",");
    return `
    <div class="mp-demo" role="group" aria-label="Solo demo: ver ejemplo">
      <span class="naowee-badge">Solo demo</span><span class="mp-demo__l">Ver ejemplo:</span>
      <div class="mp-demo__seg">${EJEMPLOS.map(([v, l]) => `<button type="button" data-ejemplo="${v}" aria-pressed="${v === cur}">${l}</button>`).join("")}</div>
    </div>`;
  }
  function secHead({ group, id, title, desc, acts = "", note }) {
    return `
    <div class="mp-sec-h">
      <div>
        ${group ? `<span class="mp-eyebrow">${ic(ROLE[group].icon)}${ROLE[group].group}</span>` : ""}
        <h2 id="${id}">${title}</h2>
        ${desc ? `<p>${desc}</p>` : ""}
      </div>
      <div class="mp-sec-h__acts">${acts}${note ? devnote(note) : ""}</div>
    </div>`;
  }
  function tabsBar(key, items, sel, label) {
    return `<div class="mp-tabs-wrap"><div class="mp-tabs" role="tablist" aria-label="${label}" data-tabs="${key}">
    ${items.map(([id, lbl]) => `<button class="mp-tab" type="button" role="tab" id="mpt-${key}-${id}" aria-controls="mpp-${key}-${id}" aria-selected="${id === sel}" tabindex="${id === sel ? 0 : -1}" data-tab="${key}:${id}">${lbl}</button>`).join("")}
  </div></div>`;
  }
  function renderSection2(sec) {
    switch (sec) {
      case "trayectoria":
        return secTrayectoria();
      case "afiliaciones":
        return secAfiliaciones();
      case "analisis":
        return secAnalisis();
      case "menores":
        return secMenores();
      case "vinculos":
        return secVinculos();
      case "documentos":
        return secEmpty("doc", "Documentos", third ? "Documento de identidad, certificados m\xE9dicos y soportes que pidan los organismos. Estamos terminando esta secci\xF3n." : "Aqu\xED vas a encontrar tu documento de identidad, certificados m\xE9dicos y los soportes que te pidan tus organismos. Estamos terminando esta secci\xF3n.");
      case "configuracion":
        return secEmpty("gear", "Configuraci\xF3n", "Contrase\xF1a, notificaciones y privacidad de tu cuenta. Estamos terminando esta secci\xF3n.");
      default:
        return secPerfil();
    }
  }
  function secEmpty(icon, title, text) {
    return `<section aria-labelledby="mpSecEmpty"><div class="mp-card mp-empty"><div class="mp-tile">${ic(icon)}</div><h3 id="mpSecEmpty">${title}</h3><p>${text}</p></div></section>`;
  }
  function secPerfil() {
    const tabs = TABS;
    if (!tabs.some((t2) => t2.id === state.tab.perfil)) state.tab.perfil = "datos";
    const t = tabs.find((x) => x.id === state.tab.perfil);
    const editing = state.editing === t.id;
    const fields = t.fields.filter((f) => !f[3] || has(f[3]));
    return `
    <section aria-labelledby="mpH-perfil">
      <h2 class="mp-sr" id="mpH-perfil">Perfil</h2>
      <div class="mp-card">
        ${tabsBar("perfil", tabs.map((x) => [x.id, x.label]), t.id, "Datos del perfil")}
        <div class="mp-panel" role="tabpanel" id="mpp-perfil-${t.id}" aria-labelledby="mpt-perfil-${t.id}">
          <div class="mp-panel-h">
            <div><h3>${t.title}</h3>${t.id === "datos" && own ? "<p>Son los mismos para todos tus roles.</p>" : ""}</div>
            <div class="mp-sec-h__acts">${canEdit && !editing ? `<button class="mp-btn mp-btn--sm" type="button" data-edit="${t.id}">${ic("edit", "sm")}Editar</button>` : ""}${t.id === "datos" ? devnote("perfil") : ""}</div>
          </div>
          <dl class="mp-fields">
            ${fields.map(([dt, dd, lock]) => `<div><dt>${dt}</dt>${editing ? `<dd><input value="${esc(dd)}" aria-label="${esc(dt)}"${lock ? " disabled" : ""} data-field="${esc(dt)}"></dd>` : `<dd${dd === "Prefiere no responder" ? ' class="is-empty"' : ""}>${esc(dd)}</dd>`}</div>`).join("")}
          </dl>
          ${editing ? `<div class="mp-edit-acts"><button class="mp-btn mp-btn--lg" type="button" data-edit-cancel>Cancelar</button><button class="mp-btn mp-btn--pri mp-btn--lg" type="button" data-edit-save="${t.id}">Guardar cambios</button></div>` : ""}
        </div>
      </div>
    </section>`;
  }
  function secTrayectoria() {
    const tab = state.tab.tray;
    const medals = TRAY.filter((r) => r.medal);
    return `
    <section aria-labelledby="mpH-tray">
      ${secHead({ group: "deportista", id: "mpH-tray", title: "Trayectoria", desc: "Resultados oficiales en eventos registrados en el SUID.", note: "trayectoria" })}
      <div class="mp-result" aria-label="\xDAltimo resultado">
        <div class="mp-ring" aria-hidden="true">2.\xBA</div>
        <div>
          <p class="mp-result__k">\xDAltimo resultado</p>
          <p class="mp-result__v">Plata \xB7 500 m</p>
          <p class="mp-result__m">Juegos Nacionales 2025 \xB7 Final</p>
        </div>
        <ul class="mp-tally" aria-label="Medallero: 1 oro, 1 plata, 0 bronce">
          <li><b>1</b><span><i class="mp-gold"></i>oro</span></li>
          <li><b>1</b><span><i class="mp-silver"></i>plata</span></li>
          <li><b>0</b><span><i class="mp-bronze"></i>bronce</span></li>
        </ul>
      </div>
      <div class="mp-card">
        ${tabsBar("tray", [["tr", "Trayectoria"], ["med", `Medaller\xEDa (${medals.length})`]], tab, "Trayectoria")}
        <div class="mp-panel" role="tabpanel" id="mpp-tray-${tab}" aria-labelledby="mpt-tray-${tab}">
          ${tab === "tr" ? `
            <table class="mp-tbl">
              <thead><tr><th>A\xF1o</th><th>Evento</th><th>Prueba</th><th>Fase</th><th>Posici\xF3n</th><th>Marca</th><th>Medalla</th></tr></thead>
              <tbody>${TRAY.map((r) => `
                <tr><td class="mp-yr">${r.yr}</td>
                  <td class="mp-ev"><strong>${r.ev}</strong><span>Patinaje</span>${r.cyc ? `<br><span class="mp-cyc">${ic("flame", "sm")}Ciclo ol\xEDmpico</span>` : ""}</td>
                  <td data-l="Prueba">${r.prueba}</td><td data-l="Fase">${r.fase}</td><td data-l="Posici\xF3n">${r.pos}</td><td data-l="Marca">${r.marca}</td>
                  <td data-l="Medalla">${r.medal ? `<span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span>` : '<span class="mp-dash" aria-label="Sin medalla">\u2014</span>'}</td></tr>`).join("")}
              </tbody>
            </table>` : `
            <div class="mp-medals">${medals.map((r) => `
              <div class="mp-mcard"><span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span><strong>${r.ev} ${r.yr}</strong><p>Patinaje \xB7 ${r.prueba} \xB7 ${r.marca}</p></div>`).join("")}
            </div>`}
        </div>
      </div>
    </section>`;
  }
  function rowActions(it, kind) {
    const solicitada = it.estado === "solicitada" || it.estado === "solicitado";
    if (own && solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-cancel="${kind}:${it.id}">Cancelar solicitud</button>`;
    if (viewer.kind === "org" && it.org === viewer.orgId) {
      if (solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-org="aprobar:${kind}:${it.id}">Aprobar</button><button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="rechazar:${kind}:${it.id}">Rechazar</button>`;
      if (it.estado === "vinculado") return `<button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="desvincular:${kind}:${it.id}">Desvincular</button>`;
    }
    return "";
  }
  function orgRow(it, kind, aprueba) {
    const solicitada = it.estado === "solicitada" || it.estado === "solicitado";
    return `
    <li class="mp-row"><span class="mp-tile">${ic("building")}</span>
      <div class="mp-row__main"><strong>${esc(it.nombre)}</strong><span>${esc(it.sub)}</span>
        <span class="mp-row__hint">${esc(it.fecha)}${solicitada ? ` \xB7 Lo aprueba ${aprueba}` : ""}</span></div>
      <div class="mp-row__side">${pill(it.estado)}${rowActions(it, kind)}</div></li>`;
  }
  function secAfiliaciones() {
    const list = afiliacionesVis();
    return `
    <section aria-labelledby="mpH-afil">
      ${secHead({
      group: "deportista",
      id: "mpH-afil",
      title: "Afiliaciones",
      desc: viewer.kind === "org" ? `Afiliaciones de ${P.corto} a clubes de tu jurisdicci\xF3n. Cada club aprueba la suya.` : third ? "Clubes en los que la persona est\xE1 inscrita como deportista. El club aprueba cada solicitud." : "Clubes en los que est\xE1s inscrita como deportista. El club aprueba cada solicitud.",
      acts: own ? `<button class="mp-btn" type="button" data-soon="Solicitar afiliaci\xF3n">${ic("plus", "sm")}Solicitar afiliaci\xF3n</button>` : "",
      note: "afiliaciones"
    })}
      ${list.length ? `<ul class="mp-list">${list.map((a) => orgRow(a, "af", "el club")).join("")}</ul>` : `<div class="mp-card mp-empty"><div class="mp-tile">${ic("building")}</div><h3>Sin afiliaciones</h3><p>${own ? "Solicita la afiliaci\xF3n a un club para competir con \xE9l." : "No tiene afiliaciones a clubes."}</p></div>`}
      <div class="mp-note">${ic("info")}<span>${own ? "La afiliaci\xF3n la aprueba el club. Mientras est\xE1 solicitada, sigues compitiendo con tu club actual." : "La afiliaci\xF3n la aprueba el club. Al aprobarla, el deportista hereda la liga y la federaci\xF3n del club."}</span></div>
    </section>`;
  }
  function secAnalisis() {
    const i = state.tab.eval;
    return `
    <section aria-labelledby="mpH-anal">
      ${secHead({
      group: "deportista",
      id: "mpH-anal",
      title: `An\xE1lisis cualitativo <span class="mp-tag">${ic("eye")}Solo Comit\xE9 Ol\xEDmpico y ROOT</span>`,
      desc: "Evaluaciones del metod\xF3logo por prueba y evento.",
      note: "analisis"
    })}
      <div class="mp-eval">
        <div class="mp-eval-h"><strong>Juegos Nacionales 2025 \xB7 500 m</strong><span>14/11/2025 \xB7 Andr\xE9s Pineda, metod\xF3logo</span></div>
        ${tabsBar("eval", EVAL.map(([l], k) => [String(k), l]), String(i), "Dimensiones de la evaluaci\xF3n")}
        <p class="mp-eval-b" role="tabpanel" id="mpp-eval-${i}" aria-labelledby="mpt-eval-${i}">${EVAL[i][1]}</p>
      </div>
    </section>`;
  }
  function secMenores() {
    return `
    <section aria-labelledby="mpH-men">
      ${secHead({
      group: "tutor",
      id: "mpH-men",
      title: third ? "Menores a cargo" : "Mis menores",
      desc: third ? "Deportistas menores de edad cuyo perfil administra esta persona." : "Administras el perfil de los menores a tu cargo. Un menor solo puede tener el rol de deportista.",
      acts: own ? `<button class="mp-btn" type="button" data-soon="Registrar menor">${ic("plus", "sm")}Registrar menor</button>` : "",
      note: "menores"
    })}
      <div class="mp-card">
        <ul class="mp-minors">${state.menores.map((m) => `
          <li class="mp-minor"><span class="mp-ava-s" aria-hidden="true">${m.ini}</span>
            <div><strong>${m.nombre}</strong><div class="mp-meta">${m.meta.map((x) => `<span>${x}</span>`).join("")}</div></div>
            <div class="mp-row__side">${pill(m.estado)}${viewer.kind === "org" && !(m.org && scope.has(m.org)) ? `<span class="mp-out" tabindex="0" title="Solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de \xE9l." aria-label="Fuera de tu jurisdicci\xF3n: solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de \xE9l.">${ic("info", "sm")}Fuera de tu jurisdicci\xF3n</span>` : `<button class="mp-btn mp-btn--sm" type="button" data-soon="Perfil de ${m.nombre}">Ver perfil</button>`}${canEdit ? `<button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-soon="Editar a ${m.nombre}">${ic("edit", "sm")}Editar</button>` : ""}</div></li>`).join("")}
        </ul>
      </div>
      <div class="mp-note">${ic("info")}<span>\xABEn revisi\xF3n\xBB significa que el Ministerio est\xE1 validando los documentos del menor. ${third ? "El tutor puede seguir editando sus datos mientras tanto." : "Puedes seguir editando sus datos mientras tanto."} Mientras sea menor de edad, sus datos, documentos y afiliaciones los gestiona su tutor.</span></div>
    </section>`;
  }
  function secVinculos() {
    const list = vinculosVis();
    return `
    <section aria-labelledby="mpH-vin">
      ${secHead({
      group: "apoyo",
      id: "mpH-vin",
      title: "V\xEDnculos",
      desc: viewer.kind === "org" ? `Rol de apoyo de ${P.corto} y sus v\xEDnculos con organismos de tu jurisdicci\xF3n.` : third ? "Rol de apoyo y organismos con los que trabaja esta persona. Cada organismo aprueba el v\xEDnculo." : "Tu rol de apoyo y los organismos con los que trabajas. Cada organismo aprueba el v\xEDnculo.",
      acts: own ? `<button class="mp-btn" type="button" data-soon="Solicitar v\xEDnculo">${ic("plus", "sm")}Solicitar v\xEDnculo</button>` : "",
      note: "vinculos"
    })}
      <h3 class="mp-sub-h">Rol de apoyo</h3>
      <ul class="mp-list">
        <li class="mp-row"><span class="mp-tile">${ic("whistle")}</span>
          <div class="mp-row__main"><strong>${P.rolApoyo}</strong><span>Patinaje \xB7 Rol principal</span></div>
          ${own ? `<div class="mp-row__side"><button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-addrole>${ic("plus", "sm")}Agregar otro rol espec\xEDfico</button></div>` : ""}</li>
      </ul>
      <h3 class="mp-sub-h">Organismos</h3>
      ${list.length ? `<ul class="mp-list">${list.map((v) => orgRow(v, "vi", v.aprueba)).join("")}</ul>` : '<p class="mp-note">Sin v\xEDnculos con organismos.</p>'}
      <div class="mp-note">${ic("info")}<span>Cada v\xEDnculo lo aprueba el organismo (la liga o el club). Ser personal de apoyo no requiere aprobaci\xF3n; trabajar para un organismo s\xED.</span></div>
    </section>`;
  }
  function go(sec) {
    var _a3;
    state.section = sec;
    state.editing = null;
    const u = qs();
    u.set("seccion", sec);
    history.replaceState(null, "", "?" + u.toString());
    render();
    const c = root.querySelector("#mpContent");
    if (c && window.matchMedia("(max-width: 900px)").matches) c.scrollIntoView({ block: "start" });
    (_a3 = root.querySelector(`.mp-nav a[data-sec="${sec}"]`)) == null ? void 0 : _a3.focus({ preventScroll: true });
  }
  function syncTabFades() {
    root.querySelectorAll(".mp-tabs").forEach((t) => {
      const w = t.parentElement;
      const upd = () => {
        w.classList.toggle("has-more", t.scrollLeft + t.clientWidth < t.scrollWidth - 2);
        w.classList.toggle("has-less", t.scrollLeft > 2);
      };
      upd();
      t.addEventListener("scroll", upd, { passive: true });
    });
  }
  function bind() {
    var _a3, _b, _c, _d;
    root.querySelectorAll("[data-sec]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      go(a.dataset.sec);
    }));
    root.querySelectorAll("[data-go]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      go(a.dataset.go);
    }));
    (_a3 = root.querySelector("#mpPick")) == null ? void 0 : _a3.addEventListener("change", (e) => go(e.target.value));
    root.querySelectorAll('[role="tablist"]').forEach((tl) => {
      const tabs = [...tl.querySelectorAll('[role="tab"]')];
      const sel = (b) => {
        var _a4;
        const [k, id] = b.dataset.tab.split(":");
        if (k === "eval") state.tab.eval = Number(id);
        else state.tab[k] = id;
        if (k === "perfil") state.editing = null;
        render();
        (_a4 = root.querySelector(`[data-tab="${b.dataset.tab}"]`)) == null ? void 0 : _a4.focus();
      };
      tabs.forEach((b, i) => {
        b.addEventListener("click", () => sel(b));
        b.addEventListener("keydown", (e) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) {
            e.preventDefault();
            sel(tabs[(i + d + tabs.length) % tabs.length]);
          }
        });
      });
    });
    root.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      var _a4;
      state.editing = b.dataset.edit;
      render();
      (_a4 = root.querySelector(".mp-fields input:not(:disabled)")) == null ? void 0 : _a4.focus();
    }));
    (_b = root.querySelector("[data-edit-cancel]")) == null ? void 0 : _b.addEventListener("click", () => {
      state.editing = null;
      render();
    });
    (_c = root.querySelector("[data-edit-save]")) == null ? void 0 : _c.addEventListener("click", (e) => {
      const t = TABS.find((x) => x.id === e.currentTarget.dataset.editSave);
      root.querySelectorAll(".mp-fields input:not(:disabled)").forEach((inp) => {
        const f = t.fields.find((x) => x[0] === inp.dataset.field);
        if (f) f[1] = inp.value;
      });
      state.editing = null;
      render();
      toast(viewer.kind === "admin" ? "Cambios guardados. Quedan registrados a tu nombre." : "Cambios guardados.");
    });
    root.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => {
      const [k, id] = b.dataset.cancel.split(":");
      const arr = k === "af" ? state.afiliaciones : state.vinculos;
      const it = arr.find((x) => x.id === id);
      confirmDlg({
        title: "Cancelar solicitud",
        text: `${k === "af" ? "Se retira la solicitud de afiliaci\xF3n a" : "Se retira la solicitud de v\xEDnculo con"} ${it.nombre}. Puedes volver a solicitarla cuando quieras.`,
        ok: "Cancelar solicitud",
        back: "Mantener solicitud",
        onOk: () => {
          arr.splice(arr.indexOf(it), 1);
          render();
          toast("Solicitud cancelada.");
        }
      });
    }));
    root.querySelectorAll("[data-org]").forEach((b) => b.addEventListener("click", () => {
      const [act, k, id] = b.dataset.org.split(":");
      const arr = k === "af" ? state.afiliaciones : state.vinculos;
      const it = arr.find((x) => x.id === id);
      const fem = k === "af";
      const que = fem ? "la afiliaci\xF3n" : "el v\xEDnculo";
      if (act === "aprobar") {
        it.estado = "vinculado";
        it.fecha = "Desde hoy";
        it.touched = true;
        render();
        toast(`${fem ? "Afiliaci\xF3n aprobada" : "V\xEDnculo aprobado"}: ${P.corto} queda vinculada a ${it.nombre}.`);
        return;
      }
      confirmDlg(act === "rechazar" ? {
        title: `Rechazar ${que}`,
        text: `${P.corto} recibe el rechazo con el motivo y puede volver a solicitar${fem ? "la" : "lo"}.`,
        ok: "Rechazar",
        danger: true,
        motivo: true,
        onOk: () => {
          it.estado = fem ? "rechazada" : "rechazado";
          it.touched = true;
          render();
          toast(`${fem ? "Afiliaci\xF3n rechazada" : "V\xEDnculo rechazado"}.`);
        }
      } : {
        title: `Desvincular de ${it.nombre}`,
        text: fem ? `${P.corto} deja de estar afiliada a ${it.nombre} y pierde la liga y la federaci\xF3n que hered\xF3 del club.` : `${P.corto} deja de figurar como personal de apoyo de ${it.nombre}.`,
        ok: "Desvincular",
        danger: true,
        motivo: true,
        onOk: () => {
          it.estado = "desvinculado";
          it.fecha = "Desde hoy";
          it.touched = true;
          render();
          toast("Desvinculaci\xF3n registrada.");
        }
      });
    }));
    root.querySelectorAll("[data-acct]").forEach((b) => b.addEventListener("click", () => {
      state.activa = !state.activa;
      render();
      toast(state.activa ? "Cuenta activada." : "Cuenta inactivada.");
    }));
    root.querySelectorAll("[data-addrole]").forEach((b) => b.addEventListener("click", openAddRole));
    (_d = root.querySelector("[data-pend-toggle]")) == null ? void 0 : _d.addEventListener("click", () => {
      var _a4;
      state.pendOpen = !state.pendOpen;
      render();
      (_a4 = root.querySelector("[data-pend-toggle]")) == null ? void 0 : _a4.focus();
    });
    root.querySelectorAll("[data-ejemplo]").forEach((b) => b.addEventListener("click", () => {
      var _a4;
      const u = qs();
      if (b.dataset.ejemplo === ALL_ROLES.join(",")) u.delete("roles");
      else u.set("roles", b.dataset.ejemplo);
      history.replaceState(null, "", "?" + u.toString());
      personaRoles = parseRoles();
      state.editing = null;
      render();
      (_a4 = root.querySelector(`[data-ejemplo="${b.dataset.ejemplo}"]`)) == null ? void 0 : _a4.focus();
    }));
    root.querySelectorAll("[data-soon]").forEach((b) => b.addEventListener("click", () => toast(`${b.dataset.soon}: disponible en una pr\xF3xima fase de la demo.`)));
  }
  function dialog(html, cls = "") {
    var _a3;
    (_a3 = document.getElementById("mpDlg")) == null ? void 0 : _a3.remove();
    const d = document.createElement("dialog");
    d.id = "mpDlg";
    d.className = `mp-dlg ${cls}`;
    d.setAttribute("aria-labelledby", "mpDlgT");
    d.innerHTML = SPRITE + html;
    document.body.appendChild(d);
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) d.close();
    });
    d.addEventListener("close", () => d.remove());
    d.showModal();
    return d;
  }
  function openAddRole() {
    const ADD = {
      deportista: ["Elige tu deporte. Luego puedes solicitar afiliaci\xF3n a un club.", "Agregar otro deporte", "menor"],
      tutor: ["Registra a un menor de edad a tu cargo.", "Registrar otro menor"],
      apoyo: ["Elige tu rol espec\xEDfico: entrenador, m\xE9dico, fisioterapeuta\u2026", "Agregar otro rol espec\xEDfico"]
    };
    const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">Agregar rol</h2><p>El rol se agrega a este mismo perfil.</p></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
    <div class="mp-opts">${ALL_ROLES.map((r) => {
      const ya = personaRoles.includes(r);
      return `<button class="mp-opt" type="button" data-opt="${r}"><span class="mp-tile">${ic(ROLE[r].icon)}</span>
        <span class="mp-opt__main"><strong>${ya ? ADD[r][1] : ROLE[r].name}</strong><span class="mp-opt__d">${ya ? `Ya eres ${ROLE[r].name.toLowerCase()}. ` : ""}${ADD[r][0]}</span></span></button>`;
    }).join("")}</div>
    <p class="mp-dlg__rule">Agregar un rol no requiere aprobaci\xF3n. El v\xEDnculo con un organismo s\xED: la afiliaci\xF3n a un club o el v\xEDnculo con una liga lo aprueba ese organismo.</p>`);
    d.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => {
      const r = b.dataset.opt;
      d.close();
      if (personaRoles.includes(r) && r === "tutor") {
        go("menores");
        return;
      }
      if (personaRoles.includes(r) && r === "apoyo") {
        go("vinculos");
        return;
      }
      toast(`${b.querySelector("strong").textContent}: disponible en una pr\xF3xima fase de la demo.`);
    }));
  }
  function confirmDlg({ title, text, ok, back = "Volver", danger, motivo, onOk }) {
    const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">${esc(title)}</h2></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
    <p class="mp-dlg__b">${esc(text)}</p>
    ${motivo ? `<div class="mp-dlg__b"><label for="mpMotivo" style="display:block;font-weight:600;color:var(--naowee-color-text-primary);margin:12px 0 6px">Motivo</label>
      <textarea id="mpMotivo" rows="3" style="width:100%;border:1px solid var(--naowee-color-border-primary);border-radius:var(--naowee-border-radius-actions-inputs-default);padding:10px 12px;font:inherit;resize:vertical"></textarea></div>` : ""}
    <div class="mp-dlg__f"><button class="mp-btn" type="button" data-close>${esc(back)}</button>
      <button class="mp-btn ${danger ? "mp-btn--danger-solid" : "mp-btn--pri"}" type="button" data-ok>${esc(ok)}</button></div>`);
    d.querySelector("[data-ok]").addEventListener("click", () => {
      const m = d.querySelector("#mpMotivo");
      if (m && !m.value.trim()) {
        m.focus();
        m.style.borderColor = "var(--naowee-color-red-700)";
        m.setAttribute("aria-invalid", "true");
        return;
      }
      d.close();
      onOk();
    });
  }
  var _t;
  function toast(msg) {
    let el = document.getElementById("evToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "evToast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(_t);
    _t = setTimeout(() => el.classList.remove("is-visible"), 2800);
  }
  var DEVNOTES = {
    quien: { title: "Qui\xE9n mira (visor)", sections: [
      { title: "Hoy en el perfil migrado", items: ["<code>suite-mf-profile</code> (<code>ProfilePage.tsx</code>, ruta v2 <code>/home/profile/:userCode</code>) solo distingue perfil propio y administrador; hoy solo se abre desde Incentivos (guard ROOT e INCENTIVES_*).", "No existe la vista de un organismo sobre una persona: un club no puede abrir el perfil de su deportista ni de su entrenador."] },
      { title: "Qu\xE9 cambia", items: ["Un solo componente con un <b>visor</b>: propio (edita, agrega rol, Pendientes), organismo (solo lectura, solo las facetas ligadas a su jurisdicci\xF3n, nunca tutor/menores; Aprobar/Rechazar sobre lo Solicitado a ese organismo y Desvincular sobre lo Vinculado), administrador (Consulta de usuario, ve y edita todo) y Comit\xE9 Ol\xEDmpico/ROOT (habilita An\xE1lisis cualitativo).", "Desvincular desde el perfil: P-04, decisi\xF3n de Producto pendiente de ratificar.", "Un organismo ve todos los datos de la persona, sus facetas de deportista y los v\xEDnculos de apoyo con \xE9l o con organismos debajo, y la lista de menores a cargo en solo lectura. Ver \xABQui\xE9n puede ver este perfil\xBB."] },
      { title: "Qu\xE9 falta en el back", items: ["Un endpoint de lectura para un organismo con jurisdicci\xF3n (hoy <code>GET /v1/user/{code}</code> es propio o admin con <code>user:update_athlete</code>) que filtre campos por visor.", "Afiliaciones y v\xEDnculos con estado y organismo due\xF1o, para saber qu\xE9 acciones mostrar."] },
      { title: "Solo demo", items: ["El visor sale de <code>?role=</code>: PERSONA, CLUB/LIGA/FEDERACION, MINDEPORTE (alias <code>?modo=consulta</code>) y <code>?visor=comite</code>."] }
    ] },
    acceso: { title: "Qui\xE9n puede ver este perfil", sections: [
      { title: "Regla (Arquitectura \xB7 Juan Manuel Armero, 08-10-2026)", items: [
        "<b>Ministerio</b> y <b>Comit\xE9 Ol\xEDmpico</b>: cualquier persona, todo el perfil. El Ministerio entra como administrador (Consulta de usuario: estado de la cuenta y edici\xF3n).",
        "<b>An\xE1lisis cualitativo</b>: solo Comit\xE9 Ol\xEDmpico y ROOT. Nadie m\xE1s (ni el Ministerio ni otros organismos).",
        "<b>Federaci\xF3n / Liga / Club</b>: solo personas dentro de su jerarqu\xEDa deportiva (afiliadas o vinculadas a \xE9l o a un organismo debajo, por herencia) y, para clubes, quien le envi\xF3 una solicitud pendiente. Cualquier otra persona: estado \xABEsta persona no est\xE1 vinculada a\u2026\xBB en vez del perfil.",
        "Un organismo ve todos los datos (Datos, Ubicaci\xF3n, Contacto, Salud, Sociodemogr\xE1fico, Datos adicionales, Biometr\xEDa, Trayectoria), las afiliaciones y los v\xEDnculos de apoyo relacionados con \xE9l o con organismos debajo.",
        "<b>Menores a cargo</b>: el organismo ve la lista (nombre, documento, edad, deporte, v\xEDnculo, estado) en solo lectura. Abrir el perfil de un menor sigue la misma regla de jurisdicci\xF3n: si no est\xE1 en su \xE1rbol, la fila dice \xABFuera de tu jurisdicci\xF3n\xBB en vez de \xABVer perfil\xBB.",
        "<b>Ver el sub\xE1rbol, actuar sobre el nivel inmediato</b>: solo el organismo directo aprueba, rechaza o desvincula; los niveles superiores solo ven."
      ] },
      { title: "Qu\xE9 falta en el back", items: ["Resolver la jurisdicci\xF3n del visor contra las afiliaciones y v\xEDnculos de la persona (incluidas las solicitudes pendientes hacia un club) antes de devolver el perfil."] },
      { title: "Solo demo", items: ["<code>?role=LIGA&persona=ajena</code> muestra el estado fuera de jurisdicci\xF3n. Laura est\xE1 en Club Pat\xEDn Cali \u2192 Liga de Patinaje del Valle \u2192 Fed. Colombiana de Patinaje, as\xED que los tres la ven.", "Con Club Pat\xEDn Cali: Tom\xE1s (Patinaje) est\xE1 afiliado al club y se puede abrir; Sara (Nataci\xF3n) no est\xE1 en su \xE1rbol."] }
    ] },
    perfil: { title: "Perfil \xB7 datos personales", sections: [
      { title: "Hoy en el perfil migrado", items: ["Datos de <code>GET /v1/user/{code}</code>; guardado con <code>PATCH /v1/user/{code}</code> enviando <code>individual_data</code> (permiso <code>user:update_athlete</code>).", 'Ya muestra secciones por <code>roles.includes(...)</code> (multi-rol listo para gating), pero la etiqueta del encabezado usa <code>roles[0]</code>. Las vistas viejas (perfil propio y "Consulta de usuario") usan <code>roles[0]</code> en todo.', "La biometr\xEDa sale a cualquiera, vac\xEDa si no es deportista."] },
      { title: "Qu\xE9 cambia", items: ["Encabezado con todos los roles como chips (sin selector de rol). Datos comunes una sola vez: \xABSon los mismos para todos tus roles\xBB.", "Biometr\xEDa como grupo compacto en la franja del encabezado, solo con rol deportista y solo en Perfil y en las secciones de deportista.", "\xABEditar\xBB es un bot\xF3n secundario neutro; el naranja queda para lo activo y \xABAgregar rol\xBB."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada para los datos; el encabezado debe leer <code>roles[]</code> completo en vez de <code>roles[0]</code>."] }
    ] },
    trayectoria: { title: "Trayectoria", sections: [
      { title: "Hoy en el perfil migrado", items: ["sport-records <code>GET /sport-records/api/v2/athletes/by-document/{doc}/history?view=trajectory</code>. Pesta\xF1as Trayectoria / Medaller\xEDa."] },
      { title: "Qu\xE9 cambia", items: ["Bloque \xAB\xDAltimo resultado\xBB con la posici\xF3n, la medalla y el medallero (oro \xB7 plata \xB7 bronce) arriba de la tabla. Es el \xFAnico acento fuerte de la p\xE1gina."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada nuevo: el \xFAltimo resultado y el medallero se derivan de la misma respuesta."] }
    ] },
    afiliaciones: { title: "Afiliaciones (deportista)", sections: [
      { title: "Hoy en el perfil migrado", items: ["No existen en el perfil. Viven aparte (Mi afiliaci\xF3n) y el modelo est\xE1 en nao-docs (entidad de afiliaci\xF3n)."] },
      { title: "Qu\xE9 cambia", items: ["Lista de clubes con estado Vinculado / Solicitada / Rechazada. En lo Solicitado, \xABCancelar solicitud\xBB en la misma fila y la nota \xABLo aprueba el club\xBB.", "El badge de la navegaci\xF3n cuenta solo lo pendiente."] },
      { title: "Qu\xE9 falta en el back", items: ["Exponer las afiliaciones de la persona (varias, en clubes distintos) en el perfil, y cancelar una solicitud."] }
    ] },
    analisis: { title: "An\xE1lisis cualitativo", sections: [
      { title: "Hoy en el perfil migrado", items: ["<code>\u2026/evaluations</code> de sport-records; datos del lakehouse, no en vivo. Lo ven Comit\xE9 Ol\xEDmpico y ROOT."] },
      { title: "Qu\xE9 cambia", items: ["Etiqueta visible \xABSolo Comit\xE9 Ol\xEDmpico y ROOT\xBB, sin candado. Para el resto de visores la secci\xF3n no existe (no se muestra bloqueada)."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada; el gating es el mismo."] }
    ] },
    menores: { title: "Menores a cargo (tutor legal)", sections: [
      { title: "Hoy en el perfil migrado", items: ["Solo exist\xEDan en el perfil viejo: <code>GET/POST /v1/user/me/dependents</code>, <code>GET/PATCH /v1/user/me/dependents/{code}</code>; estados Registrado / En revisi\xF3n / Pendiente / Inactivo. En el perfil nuevo est\xE1n marcados como no implementados.", "El gateway ya acepta <code>GET /v1/user/{code}?include_dependents=true</code> (devuelve <code>dependents[]</code> y <code>guardians[]</code>); no est\xE1 verificado que user-auth-ms lo responda para un usuario distinto del de la sesi\xF3n."] },
      { title: "Qu\xE9 cambia", items: ["Una sola tarjeta con filas (nombre, T.I., edad, deporte, v\xEDnculo, estado, Ver perfil) y la nota de qu\xE9 significa \xABEn revisi\xF3n\xBB.", "Regla: un menor solo puede ser deportista y lo administra su tutor. Un organismo ve la lista en solo lectura y abre solo a los menores de su jurisdicci\xF3n."] },
      { title: "Qu\xE9 falta en el back", items: ["Confirmar <code>include_dependents</code> para el visor administrador."] }
    ] },
    vinculos: { title: "V\xEDnculos (personal de apoyo)", sections: [
      { title: "Hoy en el perfil migrado", items: ["Solo existe <code>support_role_code/name</code>; la tarjeta \xABRol / Principal\xBB cae en \xABPersonal deportivo\xBB si no llega.", "No existen profesi\xF3n, certificaciones ni v\xEDnculos con organismos. El rol de apoyo multi-valor estaba en la vista vieja y no en la nueva."] },
      { title: "Qu\xE9 cambia", items: ["Rol de apoyo y organismos con estado. Ser personal de apoyo no requiere aprobaci\xF3n; el v\xEDnculo con una liga o un club s\xED."] },
      { title: "Qu\xE9 falta en el back", items: ["Entidad de v\xEDnculo persona\u2013organismo (estado, fechas, qui\xE9n aprueba) y rol de apoyo multi-valor."] }
    ] },
    pendientes: { title: "Pendientes", sections: [
      { title: "Hoy en el perfil migrado", items: ["No existe. El riel derecho ten\xEDa Biometr\xEDa y \xABRol / Principal\xBB."] },
      { title: "Qu\xE9 cambia", items: ["Reemplaza a \xABMis roles y v\xEDnculos\xBB (repet\xEDa los roles por tercera vez). Bloque compacto arriba de los datos: solo lo que espera algo, una fila por pendiente con su acci\xF3n; se colapsa si son m\xE1s de 3 y sin pendientes no se muestra. Solo en el perfil propio."] },
      { title: "Qu\xE9 falta en el back", items: ["Se arma con las afiliaciones, los v\xEDnculos y los menores; no necesita endpoint propio si esos tres existen."] }
    ] },
    consulta: { title: "Consulta de usuario (administrador)", sections: [
      { title: "Hoy en el perfil migrado", items: ["La vista vieja ten\xEDa y la nueva no: estado Activo/Inactivo, \xABVolver al listado\xBB, rol de apoyo multi-valor y edici\xF3n de organizaciones."] },
      { title: "Qu\xE9 cambia", items: ["Mismo componente que el perfil propio con banner, \xABVolver al listado\xBB, estado de la cuenta y textos en tercera persona. Ve todas las facetas y puede editar."] },
      { title: "Qu\xE9 falta en el back", items: ["Activar/inactivar cuenta desde el perfil y auditor\xEDa de los cambios del administrador.", "Documentos y Configuraci\xF3n no tienen funcionalidad en ninguna versi\xF3n."] }
    ] }
  };
  var merge = (title, keys) => ({ title, sections: keys.flatMap((k) => DEVNOTES[k].sections.map((x) => ({ title: `${DEVNOTES[k].title} \xB7 ${x.title}`, items: x.items }))) });
  DEVNOTES.barAdmin = merge("Consulta de usuario y visor", ["consulta", "acceso", "quien"]);
  DEVNOTES.barVisor = merge("Qui\xE9n mira y qui\xE9n puede ver", ["acceso", "quien"]);
  DEVNOTES.barOwn = merge("Qui\xE9n mira y qui\xE9n puede ver", ["quien", "acceso"]);
  function mountPerfil(el) {
    root = el;
    if (!document.getElementById("mpSprite")) {
      const s = document.createElement("div");
      s.id = "mpSprite";
      s.innerHTML = SPRITE;
      document.body.prepend(s);
    }
    root.classList.add("mp");
    render();
    let raf;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncTabFades);
    });
  }

  // shared/entries/perfil.js
  seedDemoData();
  var viewer2 = resolveViewer();
  var roleCode = viewer2.shellRole;
  var activeId = roleCode === "PERSONA" ? "perfil" : roleCode === "CLUB" ? "deportistas" : null;
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode, activeId });
  var _a2;
  if (window.matchMedia("(min-width: 1024px)").matches) (_a2 = document.getElementById("naoweeSidebar")) == null ? void 0 : _a2.classList.add("collapsed");
  mountHeader({ headerEl: document.getElementById("topHeader"), role: ROLES[roleCode] });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  mountPerfil(document.getElementById("perfilRoot"));
})();
