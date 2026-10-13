(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };

  // shared/sidebar.js
  function getIcon(name) {
    return ICONS[name] || "";
  }
  function nivelesForRole(code) {
    const propio = NIVELES_JERARQUIA.findIndex(([n]) => n === NIVEL_PROPIO[code]);
    return NIVELES_JERARQUIA.slice(propio + 1).map(([n, label]) => ({ id: n, label }));
  }
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
  function hrefForItem(item, roleCode3) {
    if (item.route && item.route.includes(".html")) {
      const sep = item.route.includes("?") ? "&" : "?";
      return `${item.route}${sep}role=${roleCode3}`;
    }
    return null;
  }
  function mountSidebar({ rootEl, roleCode: roleCode3, activeId }) {
    const role3 = ROLES[roleCode3] || ROLES.MINDEPORTE;
    const sections = getMenuForRole(role3.code);
    const isCollapsed = localStorage.getItem(COLLAPSED_KEY) === "1";
    rootEl.innerHTML = renderSidebar({ sections, activeId, isCollapsed, roleCode: role3.code });
    bindSidebarEvents(rootEl);
    setupTooltips(rootEl);
    return { role: role3, sections };
  }
  function renderSection(section, activeId, roleCode3) {
    return `
    ${section.section ? `<div class="nav-section">${section.section}</div>` : ""}
    ${section.items.map((it) => renderRow(it, activeId, roleCode3)).join("")}
  `;
  }
  function renderRow(item, activeId, roleCode3) {
    const isActive = item.id === activeId || item.id === "jerarquia" && String(activeId).startsWith("jerarquia-");
    const href = hrefForItem(item, roleCode3);
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
  function renderSidebar({ sections, activeId, isCollapsed, roleCode: roleCode3 }) {
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
        ${sections.map((s) => renderSection(s, activeId, roleCode3)).join("")}
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
  function mountHeader({ headerEl, role: role3 }) {
    const initials = role3.avatar || (role3.userName || role3.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    headerEl.innerHTML = `
    <button class="header-burger" id="headerBurger" type="button" aria-label="Abrir men\xFA">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="profile-switcher" id="profileSwitcher">
      <div class="user-chip" id="userChipTrigger" role="button" tabindex="0" aria-haspopup="menu" aria-label="Mi cuenta">
        <div class="ava">
          <div class="ava-ring" style="background:${role3.color}22;color:${role3.color}">${initials}</div>
          <div class="ava-dot"></div>
        </div>
        <div class="user-info">
          <span class="user-name">${role3.userName}</span>
          <span class="user-role">${role3.label}</span>
        </div>
        <button class="user-chip__chevron" type="button" tabindex="-1" aria-hidden="true">${getIcon("chevron")}</button>
      </div>
      <div class="profile-dd profile-dd--identity-only" role="menu">
        <div class="profile-dd__header">
          <span class="ava-ring" style="width:42px;height:42px;font-size:14px;background:${role3.color}22;color:${role3.color}">${initials}</span>
          <div class="profile-dd__user">
            <strong>${role3.userName}</strong>
            <span class="profile-dd__doc">${getIcon("id")}${role3.userDoc || "\u2014"}</span>
            <span class="profile-dd__current-role" style="color:${role3.color}">
              <span class="profile-dd__check-ico">${getIcon("check")}</span>${role3.label}${role3.org && role3.org !== "\u2014" ? ` \xB7 ${role3.org}` : ""}
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
  function getDemoMode() {
    const m = localStorage.getItem(MODE_KEY);
    return m === "blank" || m === "demo" ? m : "demo";
  }
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
  function mountDemoSwitcher({ roleCode: roleCode3 }) {
    const current = ROLES[roleCode3] || ROLES.MINDEPORTE;
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
    var _a, _b;
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
        const next2 = item.getAttribute("data-perfil");
        if (!ROLES[next2]) return;
        const params = new URLSearchParams(window.location.search);
        if (params.get("role") === next2) {
          root2.classList.remove("is-open");
          return;
        }
        window.location.href = `${homeForRole(next2)}?role=${next2}`;
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
    (_a = root2.querySelector("#demoRestartTourBtn")) == null ? void 0 : _a.addEventListener("click", (e) => {
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
  var COLLAPSED_KEY, ICONS, ROLES, NIVELES_JERARQUIA, NIVEL_PROPIO, jerarquiaItems, MENU_BY_ROLE, _toastTimer, _tooltipEl, MODE_KEY, TOUR_KEY, ROLE_GROUPS;
  var init_sidebar = __esm({
    "shared/sidebar.js"() {
      COLLAPSED_KEY = "naowee-organismos-sidebar-collapsed";
      ICONS = {
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
      ROLES = {
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
      NIVELES_JERARQUIA = [["comite", "Comit\xE9s"], ["federacion", "Federaciones"], ["liga", "Ligas"], ["club", "Clubes"], ["deportista", "Deportistas"]];
      NIVEL_PROPIO = { MINDEPORTE: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista" };
      jerarquiaItems = (code) => {
        const hijos = nivelesForRole(code);
        if (hijos.length === 1) return [];
        return [
          { id: "jerarquia", label: "Jerarqu\xEDa SND", icon: "sitemap", route: "jerarquia.html" },
          ...hijos.map(({ id, label }) => ({ id: `jerarquia-${id}`, label, icon: "level", route: `jerarquia.html?nivel=${id}`, child: true }))
        ];
      };
      MENU_BY_ROLE = {
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
      _toastTimer = null;
      _tooltipEl = null;
      MODE_KEY = "naowee-organismos-demo-mode";
      TOUR_KEY = "naowee-organismos-tour-seen";
      ROLE_GROUPS = [
        { label: "Rector\xEDa", codes: ["MINDEPORTE"] },
        { label: "Cabezas de sector", codes: ["COMITE"] },
        { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
        { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
      ];
    }
  });

  // shared/estados.js
  var init_estados = __esm({
    "shared/estados.js"() {
    }
  });

  // shared/organismos-data.js
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
  function clearStore(key) {
    try {
      sessionStorage.removeItem(STORE_PREFIX + key);
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
  function nextOrgId(tipo) {
    const prefix = ID_PREFIX[tipo] || "ORG";
    const nuevos = readStore("organismos-nuevos", []) || [];
    const n = nuevos.filter((o) => o.tipo === tipo).length + 1;
    return `${prefix}-N${String(n).padStart(3, "0")}`;
  }
  function addOrganismo(org) {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const record = {
      estado: "Preinscrito",
      ficticio: true,
      fechaRegistro: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      ...org,
      id: org.id || nextOrgId(org.tipo)
    };
    nuevos.push(record);
    writeStore("organismos-nuevos", nuevos);
    return { ...record };
  }
  function activosDeTipo(tipo) {
    return allOrganismos().filter((o) => o.tipo === tipo && o.estado === "Activo").sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((o) => ({ ...o }));
  }
  function comitePorSector(sector) {
    return allOrganismos().find((o) => o.tipo === "comite" && o.sector === sector) || null;
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }
  var COMITES, FEDERACIONES_COC, FEDERACIONES_FICTICIAS, LIGAS, CLUBES, SEED_ORGANISMOS, STORE_PREFIX, SEED_FLAG, SEED_VERSION, ID_PREFIX;
  var init_organismos_data = __esm({
    "shared/organismos-data.js"() {
      init_estados();
      COMITES = [
        { id: "COC", tipo: "comite", nombre: "Comit\xE9 Ol\xEDmpico Colombiano", nit: "860028097-1", sector: "Ol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000100", nombre: "Camilo", apellido: "Duarte", correo: "presidencia@coc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550001", correo: "contacto@coc.demo.co" }, fechaRegistro: "2025-11-02" },
        { id: "CPC", tipo: "comite", nombre: "Comit\xE9 Paral\xEDmpico Colombiano", nit: "830500110-4", sector: "Paral\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000101", nombre: "Marcela", apellido: "R\xEDos", correo: "presidencia@cpc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06" }, contacto: { telefono: "6014801515", correo: "contacto@paralimpicocol.demo.co" }, fechaRegistro: "2025-11-05" },
        { id: "FSC", tipo: "comite", nombre: "Federaci\xF3n Sordol\xEDmpica de Colombia", nit: "900700221-2", sector: "Sordol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000102", nombre: "Hern\xE1n", apellido: "P\xE9rez", correo: "presidencia@sordolimpico.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114" }, contacto: { telefono: "6045551020", correo: "contacto@sordolimpico.demo.co" }, fechaRegistro: "2025-11-08" }
      ];
      FEDERACIONES_COC = [
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
      FEDERACIONES_FICTICIAS = [
        { id: "FED-P01", tipo: "federacion", nombre: "Federaci\xF3n Paral\xEDmpica de Atletismo", nit: "901500001-1", sector: "Paral\xEDmpico", deporte: "Atletismo", parentId: "CPC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000201", nombre: "Laura", apellido: "Mendoza R\xEDos", correo: "presidencia@fedeparaatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06 Of. 201" }, contacto: { telefono: "6014809090", correo: "contacto@fedeparaatletismo.demo.co" }, fechaRegistro: "2026-02-18" },
        { id: "FED-P02", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Nataci\xF3n Paral\xEDmpica", nit: "901500002-2", sector: "Paral\xEDmpico", deporte: "Nataci\xF3n", parentId: "CPC", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000202", nombre: "Diego", apellido: "Vargas Pe\xF1a", correo: "presidencia@fedeparanatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 36 # 5B-62" }, contacto: { telefono: "6024889090", correo: "contacto@fedeparanatacion.demo.co" }, fechaRegistro: "2026-05-09" },
        { id: "FED-S01", tipo: "federacion", nombre: "Federaci\xF3n Deportiva de Sordos de Baloncesto", nit: "901500003-3", sector: "Sordol\xEDmpico", deporte: "Baloncesto", parentId: "FSC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000203", nombre: "Sof\xEDa", apellido: "Guerrero Le\xF3n", correo: "presidencia@fedesordosbaloncesto.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114 Of. 3" }, contacto: { telefono: "6045553030", correo: "contacto@fedesordosbaloncesto.demo.co" }, fechaRegistro: "2026-03-28" }
      ];
      LIGAS = [
        { id: "LIG-001", tipo: "liga", nombre: "Liga de Patinaje del Valle", nit: "805010001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000301", nombre: "Sandra", apellido: "Mej\xEDa", correo: "direccion@ligapatinajevalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-00 Unidad Deportiva Alberto Galindo" }, contacto: { telefono: "6024010101", correo: "contacto@ligapatinajevalle.demo.co" }, fechaRegistro: "2026-03-10" },
        { id: "LIG-002", tipo: "liga", nombre: "Liga de Patinaje de Antioquia", nit: "805010002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000302", nombre: "Carlos", apellido: "Estrada Ruiz", correo: "direccion@ligapatinajeant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 70 # 48-70 Estadio Atanasio Girardot" }, contacto: { telefono: "6044020202", correo: "contacto@ligapatinajeant.demo.co" }, fechaRegistro: "2026-03-14" },
        { id: "LIG-003", tipo: "liga", nombre: "Liga de Patinaje de Bogot\xE1", nit: "805010003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000303", nombre: "Paula", apellido: "Rinc\xF3n D\xEDaz", correo: "direccion@ligapatinajebogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014030303", correo: "contacto@ligapatinajebogota.demo.co" }, fechaRegistro: "2026-05-02" },
        { id: "LIG-004", tipo: "liga", nombre: "Liga de F\xFAtbol del Valle", nit: "805010004-4", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000304", nombre: "Andr\xE9s", apellido: "Lozano Gil", correo: "direccion@ligafutbolvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 50-00" }, contacto: { telefono: "6024040404", correo: "contacto@ligafutbolvalle.demo.co" }, fechaRegistro: "2026-02-22" },
        { id: "LIG-005", tipo: "liga", nombre: "Liga de F\xFAtbol de Antioquia", nit: "805010005-5", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000305", nombre: "Mariana", apellido: "Ospina Cano", correo: "direccion@ligafutbolant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 74 # 48-10" }, contacto: { telefono: "6044050505", correo: "contacto@ligafutbolant.demo.co" }, fechaRegistro: "2026-06-01" },
        { id: "LIG-006", tipo: "liga", nombre: "Liga de Nataci\xF3n del Valle", nit: "805010006-6", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "FED-038", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000306", nombre: "Diego", apellido: "Ospina Mar\xEDn", correo: "direccion@liganatacionvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-40 Complejo Acu\xE1tico" }, contacto: { telefono: "6024060606", correo: "contacto@liganatacionvalle.demo.co" }, fechaRegistro: "2026-02-28" },
        { id: "LIG-007", tipo: "liga", nombre: "Liga de Ciclismo de Antioquia", nit: "805010007-7", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000307", nombre: "Juli\xE1n", apellido: "C\xE1rdenas V\xE9lez", correo: "direccion@ligaciclismoant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Vel\xF3dromo Mart\xEDn Emilio Cochise Rodr\xEDguez" }, contacto: { telefono: "6044070707", correo: "contacto@ligaciclismoant.demo.co" }, fechaRegistro: "2026-04-11" },
        { id: "LIG-008", tipo: "liga", nombre: "Liga de Ciclismo de Bogot\xE1", nit: "805010008-8", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000308", nombre: "Natalia", apellido: "Pe\xF1a Rojas", correo: "direccion@ligaciclismobogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 57-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014080808", correo: "contacto@ligaciclismobogota.demo.co" }, fechaRegistro: "2026-01-30" }
      ];
      CLUBES = [
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
      SEED_ORGANISMOS = [
        ...COMITES,
        ...FEDERACIONES_COC,
        ...FEDERACIONES_FICTICIAS,
        ...LIGAS,
        ...CLUBES
      ];
      STORE_PREFIX = "naowee-organismos-";
      SEED_FLAG = STORE_PREFIX + "demo-seeded";
      SEED_VERSION = "0.1.0";
      ID_PREFIX = { comite: "COM", federacion: "FED", liga: "LIG", club: "CLU" };
    }
  });

  // shared/registro.js
  var registro_exports = {};
  function freshData() {
    return {
      nombre: "",
      nit: "",
      deporte: "",
      sector: "",
      tipoClub: "",
      ambito: "",
      superiorId: "",
      actoAdministrativo: "",
      repLegal: { tipoDoc: "CC", numDoc: "", nombre: "", apellido: "", correo: "" },
      ubicacion: { depto: "", ciudad: "", zona: "Urbana", direccion: "" },
      dirEstruct: { tipoVia: "", numero: "", letra: "\u2014", bis: false, numeroCruce: "", letraCruce: "\u2014", numeroCasa: "", info: "" },
      contacto: { telefono: "", correo: "" },
      documentos: {},
      aceptaPoliticas: false
    };
  }
  function applyMask(type, raw) {
    if (!raw) return "";
    switch (type) {
      case "tel":
        return String(raw).replace(/[^0-9+\-()\s]/g, "");
      case "numeric":
        return String(raw).replace(/[^0-9]/g, "");
      case "email":
        return String(raw).replace(/\s/g, "").toLowerCase();
      default:
        return String(raw);
    }
  }
  function setPath(obj, path, val) {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((o, k) => o[k] = o[k] || {}, obj);
    target[last] = val;
  }
  function fileSizeFmt(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  function pasosAplicables() {
    return STATE.tipo ? STEPS_POR_ORGANISMO[STATE.tipo] : [0];
  }
  function indiceVisual(step) {
    return pasosAplicables().indexOf(step);
  }
  function docsDelTipo() {
    return DOCS_POR_TIPO[STATE.tipo] || [];
  }
  function hasContent() {
    if (STATE.tipo) return true;
    const d = STATE.data;
    return !!(d.nombre || d.nit || d.superiorId || d.repLegal.numDoc || d.contacto.correo);
  }
  function saveDraft() {
    if (created) return;
    writeStore(DRAFT_KEY, { tipo: STATE.tipo, step: STATE.step, data: STATE.data, role: roleCode });
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveDraft, 500);
  }
  function render() {
    if (created) {
      renderSuccess();
      return;
    }
    root.innerHTML = `
    <div class="reg-wizard" id="regWizard">
      <div class="reg-stepper-wrap">
        <div class="naowee-stepper naowee-stepper--distributed naowee-stepper--pulse" id="regStepper"></div>
        <div class="reg-stepper-mobile" id="regStepperMobile"></div>
      </div>
      <div class="reg-pane" id="regPane"></div>
      <div class="reg-footer" id="regFooter"></div>
    </div>`;
    renderStepper();
    renderPane();
    renderFooter();
    bindPane();
  }
  function renderStepper() {
    const wrap = document.getElementById("regStepper");
    const aplicables = pasosAplicables();
    const visualActual = indiceVisual(STATE.step);
    let html = "";
    aplicables.forEach((stepIdx, vi) => {
      if (vi > 0) {
        const done = vi <= visualActual;
        html += `<div class="naowee-stepper__connector ${done ? "naowee-stepper__connector--done" : ""}"></div>`;
      }
      const isDone = vi < visualActual;
      const isActive = vi === visualActual;
      const cls = isDone ? "naowee-stepper__step--done" : isActive ? "naowee-stepper__step--active" : "";
      const num = isDone ? I.check : vi + 1;
      html += `<div class="naowee-stepper__step ${cls}" ${isDone ? `data-goto="${stepIdx}"` : ""}>
      <span class="naowee-stepper__number">${num}</span>
      <span class="naowee-stepper__label">${STEP_LABELS[stepIdx]}</span>
    </div>`;
    });
    if (!STATE.tipo) {
      for (let i = 0; i < 5; i++) {
        html += '<div class="naowee-stepper__connector naowee-stepper__connector--skeleton"></div>';
        html += '<div class="naowee-stepper__step naowee-stepper__step--skeleton" aria-hidden="true"><span class="naowee-stepper__number"></span></div>';
      }
    }
    wrap.innerHTML = html;
    document.getElementById("regStepperMobile").innerHTML = `Paso <strong>${visualActual + 1}</strong> de ${aplicables.length} \xB7 ${STEP_LABELS[STATE.step]}`;
  }
  function renderPane() {
    const pane = document.getElementById("regPane");
    switch (STATE.step) {
      case 0:
        pane.innerHTML = paneTipo();
        break;
      case 1:
        pane.innerHTML = STATE.tipo === "comite" ? paneComite() : paneDatos();
        break;
      case 2:
        pane.innerHTML = paneRepLegal();
        break;
      case 3:
        pane.innerHTML = paneSede();
        break;
      case 4:
        pane.innerHTML = paneDocumentos();
        break;
      case 5:
        pane.innerHTML = paneConfirmar();
        break;
    }
  }
  function paneTipo() {
    const tipos = roleCode === "MINDEPORTE" ? ["comite"] : ["federacion", "liga", "club"];
    const cards = tipos.map((t) => {
      const m = TIPO_META[t];
      return `<button type="button" class="reg-tipo-card ${STATE.tipo === t ? "is-selected" : ""}" data-tipo="${t}">
      <span class="reg-tipo-card__check">${I.check}</span>
      <span class="reg-tipo-card__emoji">${m.emoji}</span>
      <span class="reg-tipo-card__title">${m.label}</span>
      <span class="reg-tipo-card__desc">${m.desc}</span>
    </button>`;
    }).join("");
    const nota = roleCode === "MINDEPORTE" ? "Como Ministerio del Deporte creas Comit\xE9s (cabezas de sector), el nivel ra\xEDz del SND que reconoce y avala a las federaciones." : "El registro es p\xFAblico. Se precarg\xF3 el tipo coherente con tu rol; puedes cambiarlo. El organismo quedar\xE1 <strong>Preinscrito</strong> hasta que su nivel superior lo valide.";
    return `
    <h2 class="reg-pane__title">\xBFQu\xE9 organismo vas a registrar?</h2>
    <p class="reg-pane__sub">${nota}</p>
    <div class="reg-tipo-grid">${cards}</div>`;
  }
  function paneDatos() {
    const d = STATE.data;
    let fields = "";
    if (STATE.tipo === "federacion") {
      fields = `
      ${ddPlaceholder("sector", "Sector", true)}
      ${ddPlaceholder("deporte", "Deporte", true)}
      ${tf({ id: "f-nombre", label: "Nombre de la federaci\xF3n", required: true, path: "nombre", value: d.nombre, placeholder: "Ej: Federaci\xF3n Colombiana de \u2026" })}
      ${tf({ id: "f-nit", label: "NIT", required: true, path: "nit", value: d.nit, placeholder: "800123456-7", mask: "tel", maxLength: 13 })}`;
    } else if (STATE.tipo === "liga") {
      fields = `
      ${ddPlaceholder("superior", "Federaci\xF3n a la que pertenece", true)}
      ${deporteReadonly()}
      ${tf({ id: "f-nombre", label: "Nombre de la liga", required: true, path: "nombre", value: d.nombre, placeholder: "Ej: Liga de \u2026 del Valle" })}
      ${tf({ id: "f-nit", label: "NIT / RUT", required: true, path: "nit", value: d.nit, placeholder: "805010001-1", mask: "tel", maxLength: 13 })}
      ${choiceGroup("ambito", "\xC1mbito", AMBITOS, d.ambito, true)}`;
    } else if (STATE.tipo === "club") {
      fields = `
      ${ddPlaceholder("superior", "Liga a la que se afilia", true)}
      ${deporteReadonly()}
      ${tf({ id: "f-nombre", label: "Nombre del club", required: true, path: "nombre", value: d.nombre, placeholder: "Ej: Club Deportivo \u2026" })}
      ${tf({ id: "f-nit", label: "NIT / RUT", required: true, path: "nit", value: d.nit, placeholder: "805020001-1", mask: "tel", maxLength: 13 })}
      ${choiceGroup("tipoClub", "Tipo de club", TIPOS_CLUB, d.tipoClub, true)}`;
    }
    const art = { federacion: "de la federaci\xF3n", liga: "de la liga", club: "del club" }[STATE.tipo] || "del organismo";
    return `
    <h2 class="reg-pane__title">Datos ${art}</h2>
    <p class="reg-pane__sub">Identifica el organismo y su v\xEDnculo con el nivel superior de la jerarqu\xEDa.</p>
    <form class="reg-form" id="regFormDatos" autocomplete="off">${fields}</form>`;
  }
  function paneComite() {
    const d = STATE.data;
    return `
    <h2 class="reg-pane__title">Datos del Comit\xE9</h2>
    <p class="reg-pane__sub">Registro interno del Ministerio. El Comit\xE9 queda como cabeza de sector (nodo ra\xEDz) sin aprobaci\xF3n superior.</p>
    <form class="reg-form" id="regFormDatos" autocomplete="off">
      ${tf({ id: "f-nombre", label: "Nombre del Comit\xE9", required: true, path: "nombre", value: d.nombre, placeholder: "Ej: Comit\xE9 Ol\xEDmpico Colombiano" })}
      ${ddPlaceholder("sector", "Sector", true)}
      ${tf({ id: "f-nit", label: "NIT", required: true, path: "nit", value: d.nit, placeholder: "860028097-1", mask: "tel", maxLength: 13 })}
      ${actoUploader()}
      <div class="reg-section-label">Aceptaci\xF3n</div>
      ${privacyCheck()}
    </form>`;
  }
  function paneRepLegal() {
    const r = STATE.data.repLegal;
    return `
    <h2 class="reg-pane__title">Representante legal</h2>
    <p class="reg-pane__sub">Datos de contacto del representante legal del organismo.</p>
    <form class="reg-form" id="regFormRep" autocomplete="off">
      <div class="reg-grid-2">
        ${ddPlaceholder("tipoDoc", "Tipo de documento", true)}
        ${tf({ id: "f-numdoc", label: "N\xFAmero de documento", required: true, path: "repLegal.numDoc", value: r.numDoc, placeholder: "10000123", mask: "numeric", maxLength: 12 })}
        ${tf({ id: "f-repnombre", label: "Nombres", required: true, path: "repLegal.nombre", value: r.nombre, placeholder: "Ej: Mar\xEDa" })}
        ${tf({ id: "f-repapellido", label: "Apellidos", required: true, path: "repLegal.apellido", value: r.apellido, placeholder: "Ej: Rojas" })}
      </div>
      ${tf({ id: "f-repcorreo", label: "Correo electr\xF3nico", required: true, path: "repLegal.correo", value: r.correo, placeholder: "representante@correo.co", mask: "email", type: "email" })}
    </form>`;
  }
  function paneSede() {
    const d = STATE.data;
    const geo = STATE.tipo === "club" ? `<div class="naowee-field-help">Geolocalizaci\xF3n simulada: se toma de la direcci\xF3n estructurada.</div>` : "";
    return `
    <h2 class="reg-pane__title">Sede y contacto</h2>
    <p class="reg-pane__sub">Ubicaci\xF3n de la sede del organismo y datos de contacto institucional.</p>
    <form class="reg-form" id="regFormSede" autocomplete="off">
      ${dirTrigger()}
      ${geo}
      <div class="reg-grid-2">
        ${ddPlaceholder("depto", "Departamento", true)}
        ${tf({ id: "f-ciudad", label: "Ciudad / Municipio", required: true, path: "ubicacion.ciudad", value: d.ubicacion.ciudad, placeholder: "Ej: Cali" })}
        ${ddPlaceholder("zona", "Zona", false)}
        ${tf({ id: "f-tel", label: "Tel\xE9fono de contacto", required: true, path: "contacto.telefono", value: d.contacto.telefono, placeholder: "+57 300 123 4567", mask: "tel", maxLength: 18, type: "tel" })}
      </div>
      ${tf({ id: "f-contactocorreo", label: "Correo de contacto institucional", required: true, path: "contacto.correo", value: d.contacto.correo, placeholder: "contacto@organismo.co", mask: "email", type: "email" })}
    </form>`;
  }
  function paneDocumentos() {
    const docs = docsDelTipo().map((doc) => fileField(doc)).join("");
    return `
    <h2 class="reg-pane__title">Documentos y pol\xEDticas</h2>
    <p class="reg-pane__sub">Adjunta los soportes del organismo. Formatos: PDF, JPG o PNG. (Simulado \u2014 no se sube ning\xFAn archivo.)</p>
    <form class="reg-form" id="regFormDocs">
      ${docs}
      <div class="reg-section-label">Aceptaci\xF3n</div>
      ${privacyCheck()}
    </form>`;
  }
  function paneConfirmar() {
    const d = STATE.data;
    const sup = d.superiorId ? getOrganismo(d.superiorId) : null;
    const groups = [];
    const rows = (arr) => arr.filter((r) => r[1]).map((r) => `<div class="reg-kv__k">${esc(r[0])}</div><div class="reg-kv__v">${esc(r[1])}</div>`).join("");
    const general = [
      ["Tipo", TIPO_SINGULAR[STATE.tipo]],
      ["Nombre", d.nombre],
      ["NIT / RUT", d.nit],
      ["Sector", d.sector],
      ["Deporte", d.deporte],
      ["\xC1mbito", d.ambito],
      ["Tipo de club", d.tipoClub],
      ["Superior", sup ? sup.nombre : ""],
      ["Acto administrativo", d.actoAdministrativo]
    ];
    groups.push(group("Datos generales", 1, rows(general)));
    if (STATE.tipo !== "comite") {
      const r = d.repLegal;
      groups.push(group("Representante legal", 2, rows([
        ["Documento", r.numDoc ? `${r.tipoDoc} ${r.numDoc}` : ""],
        ["Nombre", [r.nombre, r.apellido].filter(Boolean).join(" ")],
        ["Correo", r.correo]
      ])));
      groups.push(group("Sede y contacto", 3, rows([
        ["Direcci\xF3n", d.ubicacion.direccion],
        ["Departamento", d.ubicacion.depto],
        ["Ciudad", d.ubicacion.ciudad],
        ["Zona", d.ubicacion.zona],
        ["Tel\xE9fono", d.contacto.telefono],
        ["Correo", d.contacto.correo]
      ])));
      const docsList = docsDelTipo().map((doc) => {
        const f = d.documentos[doc.id];
        return [doc.label, f ? f.name : "\u2014"];
      });
      groups.push(group("Documentos", 4, rows(docsList) + `<div class="reg-kv__k">Pol\xEDticas de privacidad</div><div class="reg-kv__v">${d.aceptaPoliticas ? "Aceptadas" : "Pendiente"}</div>`));
    }
    return `
    <h2 class="reg-pane__title">Revisa y confirma</h2>
    <p class="reg-pane__sub">Verifica los datos antes de enviar. Al enviar, el organismo se env\xEDa a validaci\xF3n (estado <strong>En revisi\xF3n</strong>) y aparece en la jerarqu\xEDa bajo su superior.</p>
    <div class="reg-review">${groups.join("")}</div>`;
  }
  function group(title, gotoStep, rowsHtml) {
    return `<div class="reg-review__group">
    <div class="reg-review__group-head">
      <span class="reg-review__group-title">${esc(title)}</span>
      <button type="button" class="reg-review__edit" data-goto="${gotoStep}">Editar</button>
    </div>
    <div class="reg-kv">${rowsHtml}</div>
  </div>`;
  }
  function tf(o) {
    const req = o.required ? " naowee-textfield__label--required" : "";
    const attrs = [
      `id="${o.id}"`,
      `type="${o.type || "text"}"`,
      `class="naowee-textfield__input"`,
      `placeholder="${esc(o.placeholder || "")}"`,
      `value="${esc(o.value || "")}"`,
      `data-model="${o.path}"`,
      o.mask ? `data-mask="${o.mask}"` : "",
      o.maxLength ? `maxlength="${o.maxLength}"` : "",
      o.mask === "numeric" ? 'inputmode="numeric"' : o.mask === "tel" ? 'inputmode="tel"' : o.mask === "email" ? 'inputmode="email"' : ""
    ].filter(Boolean).join(" ");
    return `<div class="naowee-textfield" data-field="${o.id}">
    <label class="naowee-textfield__label${req}" for="${o.id}">${esc(o.label)}</label>
    <div class="naowee-textfield__input-wrap"><input ${attrs}></div>
  </div>`;
  }
  function deporteReadonly() {
    return `<div class="naowee-textfield naowee-textfield--readonly" data-field="f-deporte-ro">
    <label class="naowee-textfield__label">Deporte</label>
    <div class="naowee-textfield__input-wrap">
      <input class="naowee-textfield__input" id="f-deporte-ro" value="${esc(STATE.data.deporte)}" placeholder="Se toma del superior seleccionado" readonly>
    </div>
  </div>`;
  }
  function ddPlaceholder(key, label, required) {
    const req = required ? " naowee-dropdown__label--required" : "";
    return `<div class="naowee-dropdown" data-dd="${key}" data-field="dd-${key}" data-required="${required ? 1 : 0}" id="dd-${key}">
    <label class="naowee-dropdown__label${req}">${esc(label)}</label>
    <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="naowee-dropdown__value is-placeholder">Seleccione\u2026</span>
      <span class="naowee-dropdown__chevron">${I.chevron}</span>
    </button>
    <div class="naowee-dropdown__menu" role="listbox"></div>
  </div>`;
  }
  function choiceGroup(key, label, opts, value, required) {
    const items = opts.map((o) => `
    <label class="reg-choice ${value === o.v ? "is-selected" : ""}" data-choice="${key}" data-value="${o.v}">
      <input type="radio" name="${key}" value="${o.v}" ${value === o.v ? "checked" : ""}>
      <span class="reg-choice__dot"></span>
      <span class="reg-choice__body"><span class="reg-choice__title">${esc(o.t)}</span><span class="reg-choice__desc">${esc(o.d)}</span></span>
    </label>`).join("");
    const req = required ? " naowee-textfield__label--required" : "";
    return `<div class="naowee-textfield" data-field="dd-${key}" style="gap:0">
    <label class="naowee-textfield__label${req}">${esc(label)}</label>
    <div class="reg-choice-group" id="dd-${key}">${items}</div>
  </div>`;
  }
  function privacyCheck() {
    const c = STATE.data.aceptaPoliticas;
    return `<label class="naowee-checkbox" data-field="f-politicas" id="f-politicas">
    <input type="checkbox" ${c ? "checked" : ""} data-check="aceptaPoliticas">
    <span class="naowee-checkbox__box">${I.check}</span>
    <span class="naowee-checkbox__label">Acepto las pol\xEDticas de tratamiento y privacidad de datos del SUID. <strong>(Obligatorio)</strong></span>
  </label>`;
  }
  function dirTrigger() {
    const v = STATE.data.ubicacion.direccion;
    return `<div class="naowee-textfield naowee-textfield--readonly" data-field="f-dir" id="f-dir">
    <label class="naowee-textfield__label naowee-textfield__label--required">Direcci\xF3n de la sede</label>
    <div class="naowee-textfield__input-wrap" id="dirTrigger" role="button" tabindex="0">
      <span class="naowee-textfield__prefix">${I.pin}</span>
      <input class="naowee-textfield__input" id="f-dir-input" value="${esc(v)}" placeholder="Diligencie la direcci\xF3n" readonly style="cursor:pointer">
      <span class="naowee-textfield__prefix" style="color:var(--accent)">${I.edit}</span>
    </div>
  </div>`;
  }
  function fileField(doc) {
    const f = STATE.data.documentos[doc.id];
    const inner = f ? `<div class="naowee-file-uploader__file-tag">
         <span class="file-ico">${I.file}</span>
         <span class="naowee-file-uploader__file-name">${esc(f.name)}</span>
         <span class="naowee-file-uploader__file-size">${esc(f.size)}</span>
         <button type="button" class="naowee-file-uploader__file-dismiss" data-doc-remove="${doc.id}" aria-label="Quitar archivo">${I.x}</button>
       </div>` : `<span class="naowee-file-uploader__drop-icon">${I.upload}</span>
       <span class="naowee-file-uploader__drop-title">Cargar archivo (clic o arrastrar)</span>
       <span class="naowee-file-uploader__drop-hint">PDF, JPG o PNG \xB7 m\xE1x 10 MB</span>
       <input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" data-doc-input="${doc.id}">`;
    return `<div class="naowee-file-uploader ${f ? "has-file" : ""}" data-field="doc-${doc.id}" id="doc-${doc.id}">
    <label class="naowee-file-uploader__label naowee-file-uploader__label--required">${esc(doc.label)}</label>
    <div class="naowee-file-uploader__drop-zone">${inner}</div>
  </div>`;
  }
  function actoUploader() {
    const name = STATE.data.actoAdministrativo;
    const inner = name ? `<span class="naowee-file-uploader__placeholder naowee-file-uploader__placeholder--filled">${I.check}${esc(name)}</span>
       <button type="button" class="naowee-file-uploader__action" data-acto-remove>${I.x} Quitar</button>` : `<span class="naowee-file-uploader__placeholder">Ning\xFAn archivo seleccionado \xB7 PDF, JPG o PNG</span>
       <label class="naowee-file-uploader__action">${I.upload} Subir archivo<input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" data-acto-input></label>`;
    return `<div class="naowee-file-uploader" data-field="f-acto" id="f-acto">
    <label class="naowee-file-uploader__label naowee-file-uploader__label--required">Acto administrativo de reconocimiento del Ministerio</label>
    <div class="naowee-file-uploader__input-wrap">${inner}</div>
  </div>`;
  }
  function renderFooter() {
    const footer = document.getElementById("regFooter");
    const aplicables = pasosAplicables();
    const vi = indiceVisual(STATE.step);
    const esUltimoFormulario = STATE.step === 5;
    const back2 = vi > 0 ? `<button type="button" class="naowee-btn naowee-btn--quiet" id="regBack">Atr\xE1s</button>` : `<span></span>`;
    const nextLabel = esUltimoFormulario ? "Enviar registro" : STATE.step === 0 ? "Comenzar" : "Siguiente";
    const nextId = esUltimoFormulario ? "regSubmit" : "regNext";
    footer.innerHTML = `${back2}<span class="reg-footer__spacer"></span>
    <button type="button" class="naowee-btn naowee-btn--loud" id="${nextId}">${nextLabel}</button>`;
  }
  function bindPane() {
    var _a, _b, _c, _d, _e;
    root.querySelectorAll("input[data-model]").forEach((inp) => {
      inp.addEventListener("input", () => {
        if (inp.dataset.mask) {
          const p = inp.selectionStart;
          inp.value = applyMask(inp.dataset.mask, inp.value);
          try {
            inp.setSelectionRange(p, p);
          } catch (_) {
          }
        }
        setPath(STATE.data, inp.dataset.model, inp.value);
        clearFieldError(inp.closest("[data-field]"));
        scheduleSave();
      });
    });
    root.querySelectorAll("input[data-check]").forEach((cb) => {
      cb.addEventListener("change", () => {
        STATE.data[cb.dataset.check] = cb.checked;
        clearFieldError(cb.closest("[data-field]"));
        scheduleSave();
      });
    });
    root.querySelectorAll(".reg-tipo-card").forEach((card) => {
      card.addEventListener("click", () => {
        selectTipo(card.dataset.tipo);
      });
    });
    root.querySelectorAll(".reg-choice").forEach((ch) => {
      ch.addEventListener("click", (e) => {
        e.preventDefault();
        const key = ch.dataset.choice, val = ch.dataset.value;
        STATE.data[key] = val;
        ch.parentElement.querySelectorAll(".reg-choice").forEach((c) => c.classList.toggle("is-selected", c === ch));
        ch.parentElement.classList.remove("is-error");
        ch.querySelector("input").checked = true;
        scheduleSave();
      });
    });
    root.querySelectorAll("[data-dd]").forEach((el) => mountDropdown(el));
    root.querySelectorAll("[data-doc-input]").forEach((inp) => {
      inp.addEventListener("change", () => onFilePick(inp));
    });
    root.querySelectorAll("[data-doc-remove]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        delete STATE.data.documentos[btn.dataset.docRemove];
        scheduleSave();
        renderPane();
        bindPane();
      });
    });
    (_a = root.querySelector("[data-acto-input]")) == null ? void 0 : _a.addEventListener("change", (e) => onActoPick(e.target));
    (_b = document.querySelector("[data-acto-remove]")) == null ? void 0 : _b.addEventListener("click", (e) => {
      e.preventDefault();
      STATE.data.actoAdministrativo = "";
      clearFieldError(document.getElementById("f-acto"));
      scheduleSave();
      renderPane();
      bindPane();
    });
    const dt = document.getElementById("dirTrigger");
    if (dt) {
      dt.addEventListener("click", openDirModal);
      dt.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDirModal();
        }
      });
    }
    (_c = document.getElementById("regNext")) == null ? void 0 : _c.addEventListener("click", next);
    (_d = document.getElementById("regSubmit")) == null ? void 0 : _d.addEventListener("click", submit);
    (_e = document.getElementById("regBack")) == null ? void 0 : _e.addEventListener("click", back);
    root.querySelectorAll("[data-goto]").forEach((el) => {
      el.addEventListener("click", () => {
        const s = parseInt(el.dataset.goto, 10);
        if (s < STATE.step) goToStep(s);
      });
    });
  }
  function selectTipo(tipo) {
    STATE.tipo = tipo;
    STATE.data.sector = tipo === "federacion" || tipo === "comite" ? STATE.data.sector : "";
    renderPane();
    renderStepper();
    renderFooter();
    bindPane();
    scheduleSave();
  }
  function ddOptions(key) {
    const d = STATE.data;
    switch (key) {
      case "sector":
        return SECTORES.map((s) => ({ v: s, t: s }));
      case "deporte":
        return DEPORTES.map((s) => ({ v: s, t: s }));
      case "tipoDoc":
        return TIPO_DOC.map((s) => ({ v: s, t: s }));
      case "zona":
        return ZONAS.map((s) => ({ v: s, t: s }));
      case "depto":
        return DEPARTAMENTOS.map((s) => ({ v: s, t: s }));
      case "superior": {
        const tipoSup = STATE.tipo === "liga" ? "federacion" : "liga";
        return activosDeTipo(tipoSup).map((o) => ({ v: o.id, t: o.nombre, sub: `${o.deporte} \xB7 NIT ${o.nit}`, emoji: tipoSup === "federacion" ? "\u{1F3C5}" : "\u{1F6A9}" }));
      }
      default:
        return [];
    }
  }
  function ddCurrentValue(key) {
    const d = STATE.data;
    if (key === "sector") return d.sector;
    if (key === "deporte") return d.deporte;
    if (key === "tipoDoc") return d.repLegal.tipoDoc;
    if (key === "zona") return d.ubicacion.zona;
    if (key === "depto") return d.ubicacion.depto;
    if (key === "superior") return d.superiorId;
    return "";
  }
  function ddApply(key, opt) {
    const d = STATE.data;
    if (key === "sector") d.sector = opt.v;
    else if (key === "deporte") d.deporte = opt.v;
    else if (key === "tipoDoc") d.repLegal.tipoDoc = opt.v;
    else if (key === "zona") d.ubicacion.zona = opt.v;
    else if (key === "depto") d.ubicacion.depto = opt.v;
    else if (key === "superior") {
      d.superiorId = opt.v;
      const sup = getOrganismo(opt.v);
      if (sup) {
        d.deporte = sup.deporte;
        if (sup.sector) d.sector = sup.sector;
        const ro = document.getElementById("f-deporte-ro");
        if (ro) ro.value = sup.deporte;
      }
    }
  }
  function mountDropdown(el) {
    const key = el.dataset.dd;
    const searchable = key === "superior" || key === "deporte" || key === "depto";
    const opts = ddOptions(key);
    const current = ddCurrentValue(key);
    const trigger = el.querySelector(".naowee-dropdown__trigger");
    const valueEl = el.querySelector(".naowee-dropdown__value");
    const menu = el.querySelector(".naowee-dropdown__menu");
    const selected = opts.find((o) => o.v === current);
    if (selected) {
      valueEl.textContent = selected.t;
      valueEl.classList.remove("is-placeholder");
    }
    function buildMenu(filter) {
      const q = norm(filter || "");
      const list = opts.filter((o) => !q || norm(o.t + " " + (o.sub || "")).includes(q));
      let html = searchable ? `<div class="dd-search-wrap"><input type="text" class="dd-search-input" placeholder="Buscar\u2026" aria-label="Buscar opci\xF3n"></div>` : "";
      if (!list.length) html += `<div class="dd-empty">Sin coincidencias</div>`;
      html += list.map((o) => `<div class="naowee-dropdown__opt ${o.v === ddCurrentValue(key) ? "is-selected" : ""}" role="option" data-value="${esc(o.v)}">
      ${o.emoji ? `<span class="naowee-dropdown__opt-emoji">${o.emoji}</span>` : ""}
      <span class="naowee-dropdown__opt-main"><span class="naowee-dropdown__opt-name">${esc(o.t)}</span>${o.sub ? `<span class="naowee-dropdown__opt-sub">${esc(o.sub)}</span>` : ""}</span>
      <span class="naowee-dropdown__opt-check">${I.check}</span>
    </div>`).join("");
      menu.innerHTML = html;
      if (searchable) {
        const si = menu.querySelector(".dd-search-input");
        si.addEventListener("click", (e) => e.stopPropagation());
        si.addEventListener("input", () => buildMenu(si.value));
        setTimeout(() => si.focus(), 40);
      }
    }
    function anchorDd() {
      const r = trigger.getBoundingClientRect();
      menu.style.left = r.left + "px";
      menu.style.width = r.width + "px";
      menu.style.right = "auto";
      const below = window.innerHeight - r.bottom;
      const flipUp = below < 240 && r.top > below;
      const space = (flipUp ? r.top : below) - 16;
      menu.style.maxHeight = Math.max(160, Math.min(300, space)) + "px";
      if (flipUp) {
        menu.style.top = "auto";
        menu.style.bottom = window.innerHeight - r.top + 6 + "px";
      } else {
        menu.style.bottom = "auto";
        menu.style.top = r.bottom + 6 + "px";
      }
    }
    function openDd() {
      document.querySelectorAll(".naowee-dropdown--open").forEach((o) => {
        if (o !== el) o.classList.remove("naowee-dropdown--open");
      });
      buildMenu("");
      el.classList.add("naowee-dropdown--open");
      trigger.setAttribute("aria-expanded", "true");
      anchorDd();
      window.addEventListener("scroll", anchorDd, true);
      window.addEventListener("resize", anchorDd);
    }
    function closeDd() {
      el.classList.remove("naowee-dropdown--open");
      trigger.setAttribute("aria-expanded", "false");
      window.removeEventListener("scroll", anchorDd, true);
      window.removeEventListener("resize", anchorDd);
    }
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      el.classList.contains("naowee-dropdown--open") ? closeDd() : openDd();
    });
    menu.addEventListener("click", (e) => {
      const opt = e.target.closest(".naowee-dropdown__opt");
      if (!opt) return;
      const o = opts.find((x) => String(x.v) === opt.dataset.value);
      if (!o) return;
      ddApply(key, o);
      valueEl.textContent = o.t;
      valueEl.classList.remove("is-placeholder");
      el.classList.remove("naowee-dropdown--error");
      clearFieldError(el);
      closeDd();
      scheduleSave();
    });
    document.addEventListener("click", (e) => {
      if (!el.contains(e.target)) closeDd();
    });
  }
  function onFilePick(inp) {
    const f = inp.files && inp.files[0];
    if (!f) return;
    const ok = /\.(pdf|jpe?g|png)$/i.test(f.name);
    const uploader = inp.closest(".naowee-file-uploader");
    if (!ok) {
      fieldError(uploader, "Formato no permitido. Usa PDF, JPG o PNG.");
      window.naoweeToast && window.naoweeToast("Formato no permitido (PDF/JPG/PNG)", "error");
      inp.value = "";
      return;
    }
    const id = inp.dataset.docInput;
    STATE.data.documentos[id] = { name: f.name, size: fileSizeFmt(f.size) };
    scheduleSave();
    renderPane();
    bindPane();
  }
  function onActoPick(inp) {
    const f = inp.files && inp.files[0];
    if (!f) return;
    if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) {
      fieldError(document.getElementById("f-acto"), "Formato no permitido. Usa PDF, JPG o PNG.");
      window.naoweeToast && window.naoweeToast("Formato no permitido (PDF/JPG/PNG)", "error");
      inp.value = "";
      return;
    }
    STATE.data.actoAdministrativo = f.name;
    clearFieldError(document.getElementById("f-acto"));
    scheduleSave();
    renderPane();
    bindPane();
  }
  function openDirModal() {
    var _a;
    (_a = document.getElementById("regDirModal")) == null ? void 0 : _a.remove();
    const d = STATE.data.dirEstruct;
    const overlay = document.createElement("div");
    overlay.className = "reg-modal-overlay";
    overlay.id = "regDirModal";
    overlay.innerHTML = `
    <div class="reg-modal" role="dialog" aria-modal="true" aria-labelledby="dirTitle">
      <div class="reg-modal__head">
        <h3 class="reg-modal__title" id="dirTitle">Direcci\xF3n de la sede</h3>
        <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.x}</button>
      </div>
      <div class="reg-modal__body">
        <div class="reg-grid-2">
          ${dirDd("tipoVia", "Tipo de v\xEDa", TIPOS_VIA, d.tipoVia, true)}
          ${dirTf("numero", "N\xFAmero", d.numero, "numeric", 5, true, "45")}
          ${dirDd("letra", "Letra", LETRAS_VIA, d.letra, false)}
          <div class="reg-inline-check">
            <label class="naowee-checkbox"><input type="checkbox" id="dir-bis" ${d.bis ? "checked" : ""}><span class="naowee-checkbox__box">${I.check}</span><span class="naowee-checkbox__label">BIS</span></label>
          </div>
          ${dirTf("numeroCruce", "N\xFAmero de cruce", d.numeroCruce, "numeric", 5, false, "12")}
          ${dirDd("letraCruce", "Letra de cruce", LETRAS_VIA, d.letraCruce, false)}
          ${dirTf("numeroCasa", "N\xFAmero de casa / placa", d.numeroCasa, "numeric", 5, false, "18")}
          ${dirTf("info", "Informaci\xF3n adicional", d.info, null, 60, false, "Ej: Torre 2, apto 301")}
        </div>
      </div>
      <div class="reg-modal__foot">
        <button type="button" class="naowee-btn naowee-btn--loud" id="dirSave" ${d.tipoVia && d.numero ? "" : "disabled"}>Guardar direcci\xF3n</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    void overlay.offsetWidth;
    overlay.classList.add("is-open");
    function close() {
      overlay.classList.remove("is-open");
      document.removeEventListener("keydown", onEsc);
      setTimeout(() => overlay.remove(), 240);
    }
    function onEsc(e) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onEsc);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    overlay.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
    const saveBtn = overlay.querySelector("#dirSave");
    function refreshSave() {
      saveBtn.disabled = !(d.tipoVia && d.numero);
    }
    overlay.querySelectorAll("input[data-dir]").forEach((inp) => {
      inp.addEventListener("input", () => {
        if (inp.dataset.mask) inp.value = applyMask(inp.dataset.mask, inp.value);
        d[inp.dataset.dir] = inp.value;
        refreshSave();
      });
    });
    overlay.querySelector("#dir-bis").addEventListener("change", (e) => {
      d.bis = e.target.checked;
      e.target.closest(".naowee-checkbox").classList.toggle("naowee-checkbox--checked", e.target.checked);
    });
    overlay.querySelectorAll("[data-dd-dir]").forEach((el) => mountDirDropdown(el, d, refreshSave));
    saveBtn.addEventListener("click", () => {
      STATE.data.ubicacion.direccion = formatDireccion(d);
      close();
      scheduleSave();
      renderPane();
      bindPane();
    });
  }
  function dirTf(key, label, value, mask, maxLen, required, ph) {
    const req = required ? " naowee-textfield__label--required" : "";
    return `<div class="naowee-textfield">
    <label class="naowee-textfield__label${req}">${esc(label)}</label>
    <div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" data-dir="${key}" ${mask ? `data-mask="${mask}" inputmode="numeric"` : ""} maxlength="${maxLen}" value="${esc(value)}" placeholder="${esc(ph || "")}"></div>
  </div>`;
  }
  function dirDd(key, label, opts, value, required) {
    const req = required ? " naowee-dropdown__label--required" : "";
    return `<div class="naowee-dropdown" data-dd-dir="${key}" id="dird-${key}">
    <label class="naowee-dropdown__label${req}">${esc(label)}</label>
    <button type="button" class="naowee-dropdown__trigger"><span class="naowee-dropdown__value ${value && value !== "\u2014" ? "" : "is-placeholder"}">${value && value !== "\u2014" ? esc(value) : "Seleccione\u2026"}</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
    <div class="naowee-dropdown__menu" role="listbox">${opts.map((o) => `<div class="naowee-dropdown__opt ${o === value ? "is-selected" : ""}" data-value="${esc(o)}"><span class="naowee-dropdown__opt-name">${esc(o)}</span><span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join("")}</div>
  </div>`;
  }
  function mountDirDropdown(el, d, refresh) {
    const key = el.dataset.ddDir;
    const trigger = el.querySelector(".naowee-dropdown__trigger");
    const valueEl = el.querySelector(".naowee-dropdown__value");
    const menu = el.querySelector(".naowee-dropdown__menu");
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll("#regDirModal .naowee-dropdown--open").forEach((o) => {
        if (o !== el) o.classList.remove("naowee-dropdown--open");
      });
      el.classList.toggle("naowee-dropdown--open");
    });
    menu.addEventListener("click", (e) => {
      const opt = e.target.closest(".naowee-dropdown__opt");
      if (!opt) return;
      const v = opt.dataset.value;
      d[key] = v;
      valueEl.textContent = v === "\u2014" ? "Seleccione\u2026" : v;
      valueEl.classList.toggle("is-placeholder", v === "\u2014");
      menu.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.toggle("is-selected", o === opt));
      el.classList.remove("naowee-dropdown--open");
      refresh();
    });
    document.getElementById("regDirModal").addEventListener("click", (e) => {
      if (!el.contains(e.target)) el.classList.remove("naowee-dropdown--open");
    });
  }
  function formatDireccion(d) {
    if (!d.tipoVia || !d.numero) return "";
    let s = `${d.tipoVia} ${d.numero}`;
    if (d.letra && d.letra !== "\u2014") s += d.letra;
    if (d.bis) s += " Bis";
    if (d.numeroCruce) {
      s += ` # ${d.numeroCruce}`;
      if (d.letraCruce && d.letraCruce !== "\u2014") s += d.letraCruce;
    }
    if (d.numeroCasa) s += `-${d.numeroCasa}`;
    if (d.info) s += `, ${d.info}`;
    return s;
  }
  function validateStep(step) {
    const d = STATE.data;
    const errs = [];
    const reqTf = (field, ok, msg) => {
      if (!ok) errs.push({ field, kind: "tf", msg });
    };
    if (step === 0) {
      if (!STATE.tipo) errs.push({ field: null, kind: "none" });
      return errs;
    }
    if (step === 1) {
      if (STATE.tipo === "comite") {
        reqTf("f-nombre", d.nombre.trim());
        if (!d.sector) errs.push({ field: "dd-sector", kind: "dd" });
        reqTf("f-nit", d.nit.trim());
        reqTf("f-acto", d.actoAdministrativo.trim(), "Adjunta el acto administrativo de reconocimiento");
        if (!d.aceptaPoliticas) errs.push({ field: "f-politicas", kind: "check" });
      } else if (STATE.tipo === "federacion") {
        if (!d.sector) errs.push({ field: "dd-sector", kind: "dd" });
        if (!d.deporte) errs.push({ field: "dd-deporte", kind: "dd" });
        reqTf("f-nombre", d.nombre.trim());
        reqTf("f-nit", d.nit.trim());
      } else if (STATE.tipo === "liga") {
        if (!d.superiorId) errs.push({ field: "dd-superior", kind: "dd" });
        reqTf("f-nombre", d.nombre.trim());
        reqTf("f-nit", d.nit.trim());
        if (!d.ambito) errs.push({ field: "dd-ambito", kind: "choice" });
      } else if (STATE.tipo === "club") {
        if (!d.superiorId) errs.push({ field: "dd-superior", kind: "dd" });
        reqTf("f-nombre", d.nombre.trim());
        reqTf("f-nit", d.nit.trim());
        if (!d.tipoClub) errs.push({ field: "dd-tipoClub", kind: "choice" });
      }
      if (d.nit.trim() && allOrganismos().some((o) => String(o.nit).trim() === d.nit.trim()) && !errs.some((e) => e.field === "f-nit")) {
        errs.push({ field: "f-nit", kind: "tf", msg: "Este NIT ya est\xE1 registrado en el SUID." });
      }
    } else if (step === 2) {
      if (!d.repLegal.tipoDoc) errs.push({ field: "dd-tipoDoc", kind: "dd" });
      reqTf("f-numdoc", d.repLegal.numDoc.trim());
      reqTf("f-repnombre", d.repLegal.nombre.trim());
      reqTf("f-repapellido", d.repLegal.apellido.trim());
      if (!EMAIL_RE.test(d.repLegal.correo)) errs.push({ field: "f-repcorreo", kind: "tf", msg: "Ingresa un correo v\xE1lido" });
    } else if (step === 3) {
      reqTf("f-dir", d.ubicacion.direccion.trim(), "Diligencia la direcci\xF3n");
      if (!d.ubicacion.depto) errs.push({ field: "dd-depto", kind: "dd" });
      reqTf("f-ciudad", d.ubicacion.ciudad.trim());
      reqTf("f-tel", d.contacto.telefono.trim());
      if (!EMAIL_RE.test(d.contacto.correo)) errs.push({ field: "f-contactocorreo", kind: "tf", msg: "Ingresa un correo v\xE1lido" });
    } else if (step === 4) {
      docsDelTipo().forEach((doc) => {
        if (!d.documentos[doc.id]) errs.push({ field: "doc-" + doc.id, kind: "file" });
      });
      if (!d.aceptaPoliticas) errs.push({ field: "f-politicas", kind: "check" });
    }
    return errs;
  }
  function fieldEl(field) {
    return field ? document.querySelector(`[data-field="${field}"]`) : null;
  }
  function shakeErrors(errs) {
    let first = null;
    errs.forEach((e) => {
      var _a;
      const el = e.field ? fieldEl(e.field) : document.querySelector(".reg-tipo-grid");
      if (!el) return;
      if (!first) first = el;
      if (e.kind === "dd") {
        el.classList.add("naowee-dropdown--error");
      } else if (e.kind === "choice") {
        (_a = el.querySelector(".reg-choice-group")) == null ? void 0 : _a.classList.add("is-error");
      } else if (e.kind === "tf") {
        fieldError(el, e.msg || "Este campo es obligatorio");
      } else if (e.kind === "file") {
        fieldError(el, "Adjunta este documento");
      } else if (e.kind === "check") {
        el.classList.add("naowee-checkbox--error");
      }
      el.classList.remove("naowee-shake");
      void el.offsetWidth;
      el.classList.add("naowee-shake");
      setTimeout(() => el.classList.remove("naowee-shake"), 500);
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function fieldError(el, msg) {
    if (!el) return;
    el.classList.add(el.classList.contains("naowee-file-uploader") ? "naowee-file-uploader--error" : "naowee-textfield--error");
    if (!el.querySelector(".naowee-helper")) {
      const h = document.createElement("div");
      h.className = "naowee-helper naowee-helper--negative";
      h.innerHTML = `<span class="naowee-helper__text"><span class="naowee-helper__badge">${I.bang}</span><span>${esc(msg)}</span></span>`;
      el.appendChild(h);
    }
  }
  function clearFieldError(el) {
    var _a, _b;
    if (!el) return;
    el.classList.remove("naowee-textfield--error", "naowee-file-uploader--error", "naowee-checkbox--error", "naowee-dropdown--error");
    (_a = el.querySelector(".naowee-helper")) == null ? void 0 : _a.remove();
    (_b = el.querySelector(".reg-choice-group")) == null ? void 0 : _b.classList.remove("is-error");
  }
  function next() {
    var _a;
    const errs = validateStep(STATE.step);
    if (errs.length) {
      shakeErrors(errs);
      return;
    }
    const aplicables = pasosAplicables();
    const vi = indiceVisual(STATE.step);
    const nextStep = aplicables[Math.min(vi + 1, aplicables.length - 1)];
    if (nextStep === 6) {
      submit();
      return;
    }
    STATE.step = nextStep;
    render();
    saveDraft();
    (_a = document.getElementById("regWizard")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function back() {
    const aplicables = pasosAplicables();
    const vi = indiceVisual(STATE.step);
    if (vi <= 0) return;
    STATE.step = aplicables[vi - 1];
    render();
    saveDraft();
  }
  function goToStep(step) {
    if (!pasosAplicables().includes(step)) return;
    STATE.step = step;
    render();
    saveDraft();
  }
  function submit() {
    const errs = validateStep(5);
    if (errs.length) {
      shakeErrors(errs);
      return;
    }
    const d = STATE.data;
    let parentId = null, sector = d.sector || "";
    if (STATE.tipo === "federacion") {
      const c = comitePorSector(d.sector);
      parentId = c ? c.id : "COC";
    } else if (STATE.tipo === "liga" || STATE.tipo === "club") {
      parentId = d.superiorId;
      const sup = getOrganismo(d.superiorId);
      if (sup) sector = sup.sector;
    } else if (STATE.tipo === "comite") {
      parentId = null;
    }
    const org = {
      tipo: STATE.tipo,
      nombre: d.nombre.trim(),
      nit: d.nit.trim(),
      sector,
      deporte: STATE.tipo === "comite" ? "\u2014" : d.deporte || "\u2014",
      parentId,
      estado: STATE.tipo === "comite" ? "Activo" : "En revisi\xF3n",
      repLegal: { ...d.repLegal },
      ubicacion: { ...d.ubicacion },
      contacto: { ...d.contacto },
      documentos: { ...d.documentos },
      aceptaPoliticas: d.aceptaPoliticas
    };
    if (STATE.tipo === "club") org.tipoClub = d.tipoClub;
    if (STATE.tipo === "liga") org.ambito = d.ambito;
    if (STATE.tipo === "comite") org.actoAdministrativo = d.actoAdministrativo;
    created = addOrganismo(org);
    const _actor = ROLES[roleCode] || {};
    auditLog({
      orgId: created.id,
      notif: true,
      fecha: created.fechaRegistro,
      responsable: _actor.userName || roleCode,
      rol: _actor.label || roleCode,
      accion: "Registro creado",
      de: "",
      a: created.estado,
      motivo: STATE.tipo === "comite" ? "Alta interna por el Ministerio" : "Autoregistro p\xFAblico"
    });
    clearStore(DRAFT_KEY);
    STATE.step = 6;
    window.naoweeToast && window.naoweeToast("Registro enviado \u2014 organismo " + org.estado, "success");
    render();
  }
  function renderSuccess() {
    const org = created;
    const sup = org.parentId ? getOrganismo(org.parentId) : null;
    root.innerHTML = `
    <div class="reg-wizard">
      <div class="reg-stepper-wrap">
        <div class="naowee-stepper naowee-stepper--distributed" id="regStepper"></div>
        <div class="reg-stepper-mobile" id="regStepperMobile"></div>
      </div>
      <div class="reg-success" id="regSuccess">
        <div class="reg-confetti" id="regConfetti"></div>
        <div class="reg-success__hero">
          <div class="reg-success__check">${I.check}</div>
          <h2 class="reg-success__title">\xA1Registro enviado con \xE9xito!</h2>
          <p class="reg-success__lead">${esc(TIPO_SINGULAR[org.tipo])} <strong>${esc(org.nombre)}</strong> qued\xF3 en estado <strong>${esc(org.estado)}</strong>. ${org.tipo === "comite" ? "Como cabeza de sector queda Activo de inmediato, sin aprobaci\xF3n superior." : "Su nivel superior la revisar\xE1 desde la Bandeja de aprobaciones."}</p>
          <div class="naowee-message naowee-message--informative" style="max-width:460px;margin:0 auto">
            <span class="naowee-message__icon">${I.bang}</span>
            <div class="naowee-message__body"><p class="naowee-message__text">${org.tipo === "comite" ? "Como cabeza de sector del SND, este comit\xE9 queda Activo de inmediato, sin aprobaci\xF3n superior. Ya aparece en la jerarqu\xEDa como nodo ra\xEDz." : "Este registro ya aparece en la jerarqu\xEDa del SND bajo su superior. La aprobaci\xF3n (En revisi\xF3n \u2192 Activo) se ejercita en la Bandeja."}</p></div>
          </div>
          ${org.tipo === "comite" ? `<div class="naowee-message naowee-message--positive" style="max-width:480px;margin:12px auto 0;text-align:left">
            <span class="naowee-message__icon">${I.check}</span>
            <div class="naowee-message__body"><p class="naowee-message__text"><strong>Credenciales del administrador entregadas</strong> (demo): se cre\xF3 el usuario administrador del Comit\xE9 y se envi\xF3 una contrase\xF1a temporal a su correo institucional. Con ese usuario el Comit\xE9 avala a las federaciones de su sector.</p></div>
          </div>` : ""}
          <div class="reg-receipt">
            <div class="reg-receipt__head">
              <span class="reg-receipt__ava">${TIPO_META[org.tipo].emoji}</span>
              <div><div class="reg-receipt__name">${esc(org.nombre)}</div><div class="reg-receipt__meta">${esc(TIPO_SINGULAR[org.tipo])} \xB7 NIT ${esc(org.nit)}</div></div>
            </div>
            <div class="reg-receipt__rows">
              ${receiptRow(I.id, "Radicado", org.id)}
              ${receiptRow(I.tag, "Estado", org.estado)}
              ${org.deporte && org.deporte !== "\u2014" ? receiptRow(I.layers, "Deporte", org.deporte) : ""}
              ${sup ? receiptRow(I.tree, "Superior", sup.nombre) : ""}
              ${receiptRow(I.pin, "Fecha de registro", org.fechaRegistro)}
            </div>
          </div>
          <div class="reg-success__actions">
            <a class="naowee-btn naowee-btn--loud" href="jerarquia.html?role=${encodeURIComponent(roleCode)}">Ver en la jerarqu\xEDa</a>
            <button type="button" class="naowee-btn naowee-btn--quiet" id="regAnother">Registrar otro organismo</button>
          </div>
        </div>
      </div>
    </div>`;
    spawnConfetti();
    document.getElementById("regAnother").addEventListener("click", () => {
      created = null;
      STATE = { tipo: precargaTipo(), step: 0, data: freshData() };
      render();
    });
  }
  function receiptRow(ico, lbl, val) {
    return `<div class="reg-kv-row"><span class="reg-kv-row__ico">${ico}</span><span class="reg-kv-row__lbl">${esc(lbl)}</span><span class="reg-kv-row__val">${esc(val)}</span></div>`;
  }
  function spawnConfetti() {
    const wrap = document.getElementById("regConfetti");
    if (!wrap || wrap.children.length > 0) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#FF7500", "#d74009", "#1f8923", "#1f78d1", "#ffbf75"];
    for (let i = 0; i < 42; i++) {
      const s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = Math.random() * 0.6 + "s";
      s.style.animationDuration = 1.8 + Math.random() * 1.4 + "s";
      s.style.borderRadius = Math.random() > 0.5 ? "2px" : "50%";
      wrap.appendChild(s);
    }
  }
  function precargaTipo() {
    return roleCode === "MINDEPORTE" ? "comite" : PRECARGA_TIPO[roleCode] || "";
  }
  function offerDraft() {
    const draft = readStore(DRAFT_KEY, null);
    const bar = document.getElementById("regDraftBar");
    if (!draft || !draft.tipo && !(draft.data && (draft.data.nombre || draft.data.nit))) {
      startFresh();
      return;
    }
    const tipoLbl = draft.tipo ? TIPO_SINGULAR[draft.tipo] : "sin tipo";
    bar.innerHTML = `
    <div class="naowee-message naowee-message--caution" role="status">
      <span class="naowee-message__icon">${I.bang}</span>
      <div class="naowee-message__body">
        <p class="naowee-message__title">Tienes un registro sin terminar</p>
        <p class="naowee-message__text">Borrador de <strong>${esc(tipoLbl)}</strong>${draft.data && draft.data.nombre ? ` \xB7 ${esc(draft.data.nombre)}` : ""}. \xBFDeseas retomarlo?</p>
      </div>
    </div>
    <div style="display:flex;gap:10px;margin-top:10px">
      <button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" id="draftResume">Retomar borrador</button>
      <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="draftDiscard">Descartar</button>
    </div>`;
    bar.style.display = "block";
    document.getElementById("draftResume").addEventListener("click", () => {
      STATE = { tipo: draft.tipo || "", step: draft.step || 0, data: { ...freshData(), ...draft.data } };
      bar.style.display = "none";
      bar.innerHTML = "";
      render();
    });
    document.getElementById("draftDiscard").addEventListener("click", () => {
      clearStore(DRAFT_KEY);
      bar.style.display = "none";
      bar.innerHTML = "";
      startFresh();
    });
    startFresh();
  }
  function startFresh() {
    STATE = { tipo: precargaTipo(), step: 0, data: freshData() };
    render();
  }
  var I, TIPO_META, TIPO_SINGULAR, SECTORES, TIPO_DOC, ZONAS, AMBITOS, TIPOS_CLUB, TIPOS_VIA, LETRAS_VIA, DEPARTAMENTOS, DEPORTES, PRECARGA_TIPO, STEP_LABELS, STEPS_POR_ORGANISMO, DOCS_POR_TIPO, roleCode, role, DRAFT_KEY, STATE, created, esc, norm, EMAIL_RE, saveTimer, root;
  var init_registro = __esm({
    "shared/registro.js"() {
      init_organismos_data();
      init_sidebar();
      I = {
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        bang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
        upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
        file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
        pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="12" r="2"/><line x1="14" y1="10" x2="17" y2="10"/><line x1="14" y1="14" x2="17" y2="14"/></svg>',
        layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
        tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
        tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
      };
      TIPO_META = {
        comite: { emoji: "\u{1F3DB}\uFE0F", label: "Comit\xE9 (cabeza de sector)", desc: "Nivel ra\xEDz del SND. Solo lo crea el Ministerio (ORG-01)." },
        federacion: { emoji: "\u{1F3C5}", label: "Federaci\xF3n deportiva", desc: "Se adscribe a su Comit\xE9 por sector (ORG-02)." },
        liga: { emoji: "\u{1F6A9}", label: "Liga deportiva", desc: "Departamental o distrital, bajo su Federaci\xF3n (ORG-03)." },
        club: { emoji: "\u{1F6E1}\uFE0F", label: "Club deportivo", desc: "Promotor, profesional o escuela, bajo su Liga (ORG-04)." }
      };
      TIPO_SINGULAR = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
      SECTORES = ["Ol\xEDmpico", "Paral\xEDmpico", "Sordol\xEDmpico"];
      TIPO_DOC = ["CC", "CE", "PA", "PEP"];
      ZONAS = ["Urbana", "Rural"];
      AMBITOS = [
        { v: "departamental", t: "Departamental", d: "Cubre un departamento" },
        { v: "distrital", t: "Distrital", d: "Cubre un distrito" }
      ];
      TIPOS_CLUB = [
        { v: "promotor", t: "Promotor", d: "Fomento y base" },
        { v: "profesional", t: "Profesional", d: "Alto rendimiento" },
        { v: "escuela", t: "Escuela", d: "Formaci\xF3n deportiva" }
      ];
      TIPOS_VIA = ["Calle", "Carrera", "Diagonal", "Avenida", "Transversal", "Autopista"];
      LETRAS_VIA = ["\u2014", ..."ABCDEFGHIJKLMN\xD1OPQRSTUVWXYZ".split("")];
      DEPARTAMENTOS = ["Amazonas", "Antioquia", "Atl\xE1ntico", "Bol\xEDvar", "Boyac\xE1", "Caldas", "Caquet\xE1", "Casanare", "Cauca", "Cesar", "Choc\xF3", "C\xF3rdoba", "Cundinamarca", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nari\xF1o", "Norte de Santander", "Putumayo", "Quind\xEDo", "Risaralda", "Santander", "Sucre", "Tolima", "Valle del Cauca"];
      DEPORTES = [...new Set(allOrganismos().filter((o) => o.tipo === "federacion" && o.deporte && o.deporte !== "\u2014").map((o) => o.deporte))].sort((a, b) => a.localeCompare(b, "es"));
      PRECARGA_TIPO = { MINDEPORTE: "comite", COMITE: "federacion", FEDERACION: "liga", LIGA: "club" };
      STEP_LABELS = ["Tipo", "Datos", "Representante", "Sede", "Documentos", "Confirmar", "Listo"];
      STEPS_POR_ORGANISMO = {
        federacion: [0, 1, 2, 3, 4, 5, 6],
        liga: [0, 1, 2, 3, 4, 5, 6],
        club: [0, 1, 2, 3, 4, 5, 6],
        comite: [0, 1, 5, 6]
        // Tipo · Datos (reducido) · Confirmar · Listo
      };
      DOCS_POR_TIPO = {
        federacion: [
          { id: "reconocimiento", label: "Acto de reconocimiento deportivo del Ministerio" },
          { id: "aval", label: "Documento de aval del Comit\xE9 de su sector" }
        ],
        liga: [{ id: "reconocimiento", label: "Reconocimiento deportivo (tr\xE1mite IVC ante el Ministerio)" }],
        club: [{ id: "reconocimiento", label: "Reconocimiento deportivo del ente municipal" }]
      };
      roleCode = getRoleFromQuery();
      role = ROLES[roleCode] || ROLES.DEPORTISTA;
      DRAFT_KEY = "registro-draft";
      STATE = { tipo: "", step: 0, data: freshData() };
      created = null;
      esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);
      norm = (s) => String(s == null ? "" : s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      saveTimer = null;
      window.addEventListener("beforeunload", () => {
        if (!created && hasContent()) saveDraft();
      });
      root = document.getElementById("regRoot");
      seedDemoData();
      offerDraft();
    }
  });

  // shared/entries/registro.js
  init_sidebar();
  var roleCode2 = getRoleFromQuery();
  var role2 = ROLES[roleCode2];
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode: roleCode2, activeId: "registro" });
  mountHeader({ headerEl: document.getElementById("topHeader"), role: role2 });
  mountBackdrop();
  mountDemoSwitcher({ roleCode: roleCode2 });
  Promise.resolve().then(() => init_registro());
})();
