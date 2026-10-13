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
    const root2 = document.createElement("div");
    root2.className = "demo-role-switcher demo-role-switcher--inline";
    root2.id = "demoSwitcher";
    root2.innerHTML = `
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
    if (tourPanel) tourPanel.insertBefore(root2, tourPanel.querySelector(".tt-panel-sub"));
    else document.body.appendChild(root2);
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
  var COLLAPSED_KEY, ICONS, ROLES, NIVELES_JERARQUIA, NIVEL_PROPIO, jerarquiaItems, MENU_BY_ROLE, _toastTimer, _tooltipEl, MODE_KEY, TOUR_KEY, esLocal, ROLE_GROUPS;
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
      esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
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
  function faltaAsociar(d) {
    if (!d || d.clubId) return [];
    const actor = getOrganismo(d.registradoPor);
    const par = d.asocParcial || {};
    const hecho = par.ligaId ? "liga" : par.federacionId ? "federacion" : actor ? actor.tipo : "comite";
    return NIVEL_ORDEN.slice(Math.max(NIVEL_ORDEN.indexOf(hecho), 0) + 1);
  }
  function registrarDeportista(datos, actorOrgId) {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const actor = getOrganismo(actorOrgId);
    const esClub = actor && actor.tipo === "club";
    const dep = {
      modalidad: "",
      ...datos,
      id: `DEP-N${String(nuevos.length + 1).padStart(3, "0")}`,
      clubId: esClub ? actor.id : null,
      estado: esClub ? "vinculado" : "registrado",
      registradoPor: actorOrgId,
      origen: "organismo",
      fechaRegistro: _todayISO()
    };
    nuevos.push(dep);
    writeStore("deportistas-nuevos", nuevos);
    auditLog({ orgId: actorOrgId, fecha: _todayISO(), deportistaId: dep.id, deportistaNombre: dep.nombre, accion: "Registro de deportista" });
    return dep;
  }
  function asociarDeportista(id, cadena) {
    var _a;
    const { clubId = null, ...parcial } = cadena || {};
    const dep = updateDeportista(id, clubId ? { clubId, estado: "vinculado", asocParcial: null } : { asocParcial: { ...((_a = getDeportista(id)) == null ? void 0 : _a.asocParcial) || {}, ...parcial } });
    auditLog({ orgId: clubId || dep.registradoPor, fecha: _todayISO(), deportistaId: id, deportistaNombre: dep.nombre, accion: clubId ? "Asociaci\xF3n de deportista" : "Asociaci\xF3n parcial" });
    return dep;
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }
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
  function solicitudesDeClub(clubId) {
    return allSolicitudes().filter((s) => s.clubId === clubId);
  }
  function desvincularPorClub(deportistaId, meta = {}) {
    const dep = getDeportista(deportistaId);
    if (!dep || dep.estado !== "vinculado" || !dep.clubId) return null;
    const clubPrev = dep.clubId;
    const list = readStore("solicitudes", []) || [];
    const cerradas = list.map((s) => s.deportistaId === deportistaId && (s.estado === "Enviada" || s.estado === "Aprobada") ? { ...s, estado: "Retirada", resueltaFecha: _todayISO() } : s);
    const registro = {
      id: "SOL-" + String(cerradas.length + 1).padStart(3, "0") + "-DSV",
      tipo: "desvinculacion",
      deportistaId,
      clubId: clubPrev,
      estado: "Desvinculado",
      fecha: _todayISO(),
      resueltaFecha: _todayISO(),
      motivo: meta.motivo || "",
      responsable: meta.responsable || ""
    };
    writeStore("solicitudes", [registro, ...cerradas]);
    updateDeportista(deportistaId, { clubId: null, estado: "autodeclarado" });
    auditLog({
      orgId: clubPrev,
      deportistaId,
      deportistaNombre: dep.nombre,
      fecha: _todayISO(),
      responsable: meta.responsable || "",
      rol: "CLUB",
      accion: "Deportista desvinculado",
      de: "Vinculado",
      a: "Autodeclarado",
      motivo: meta.motivo || ""
    });
    return getDeportista(deportistaId);
  }
  var COMITES, FEDERACIONES_COC, FEDERACIONES_FICTICIAS, LIGAS, CLUBES, DEPORTISTAS, SEED_ORGANISMOS, SEED_DEPORTISTAS, STORE_PREFIX, SEED_FLAG, SEED_VERSION, NIVEL_ORDEN, _todayISO;
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
      DEPORTISTAS = [
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
      SEED_ORGANISMOS = [
        ...COMITES,
        ...FEDERACIONES_COC,
        ...FEDERACIONES_FICTICIAS,
        ...LIGAS,
        ...CLUBES
      ];
      SEED_DEPORTISTAS = DEPORTISTAS;
      STORE_PREFIX = "naowee-organismos-";
      SEED_FLAG = STORE_PREFIX + "demo-seeded";
      SEED_VERSION = "0.1.0";
      NIVEL_ORDEN = ["comite", "federacion", "liga", "club"];
      _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    }
  });

  // shared/permissions.js
  function can(role2, accion, recurso) {
    const fila = PERMS[recurso];
    if (!fila) return false;
    const concedidas = fila[role2] || "";
    return concedidas.includes(accion);
  }
  function scopeFor(role2) {
    return role2 in SCOPE ? SCOPE[role2] : null;
  }
  var ACCIONES, RECURSOS, PERMS, SCOPE;
  var init_permissions = __esm({
    "shared/permissions.js"() {
      ACCIONES = Object.freeze({
        CREAR: "C",
        LEER: "R",
        EDITAR: "U",
        APROBAR: "A",
        SANCIONAR: "S",
        RETIRAR: "X"
      });
      RECURSOS = Object.freeze([
        "comites",
        "federaciones",
        "ligas",
        "clubes",
        "deportistas",
        "solicitudes",
        "cargue",
        "auditoria"
      ]);
      PERMS = {
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
      SCOPE = {
        MINDEPORTE: null,
        COMITE: "COC",
        FEDERACION: "FED-040",
        LIGA: "LIG-001",
        CLUB: "CLU-001",
        DEPORTISTA: "DEP-001"
      };
    }
  });

  // shared/deportista-detalle.js
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
  var MESES, TIER_LABEL, DOC_LABEL, DEPORTE_EMOJI, SANGRES, PERFIL_EXTRA;
  var init_deportista_detalle = __esm({
    "shared/deportista-detalle.js"() {
      init_organismos_data();
      MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      TIER_LABEL = { olimpico: "Ol\xEDmpico", profesional: "Profesional", juvenil: "Juvenil", amateur: "Amateur" };
      DOC_LABEL = { CC: "C\xE9dula de ciudadan\xEDa", TI: "Tarjeta de identidad", CE: "C\xE9dula de extranjer\xEDa", PA: "Pasaporte" };
      DEPORTE_EMOJI = { Patinaje: "\u{1F6FC}", Nataci\u00F3n: "\u{1F3CA}", F\u00FAtbol: "\u26BD", Ciclismo: "\u{1F6B4}", Atletismo: "\u{1F3C3}", Baloncesto: "\u{1F3C0}" };
      SANGRES = ["O+", "A+", "B+", "O-", "A-", "AB+"];
      PERFIL_EXTRA = {
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
    }
  });

  // shared/deportistas.js
  var deportistas_exports = {};
  var root;
  var init_deportistas = __esm({
    "shared/deportistas.js"() {
      init_organismos_data();
      init_permissions();
      init_deportista_detalle();
      init_sidebar();
      root = document.getElementById("deportistasRoot");
      if (root) {
        let plantel = function() {
          return deportistasOf(scopeId).map((d) => {
            let p = null;
            try {
              p = buildDeportistaDetalle(d);
            } catch (_) {
            }
            return {
              faltan: faltaAsociar(d),
              id: d.id,
              nombre: d.nombre,
              tipoDoc: d.tipoDoc,
              numDoc: d.numDoc,
              deporte: d.deporte,
              modalidad: d.modalidad || "\u2014",
              estado: d.estado,
              edad: p ? p.edad : null,
              cat: p ? p.tierLabel : "\u2014",
              emoji: p ? p.deporteEmoji : "\u{1F3C5}",
              medallas: p ? p.medalleria.length : 0
            };
          }).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        }, filtrar = function(rows) {
          let v = rows;
          if (fDeporte !== "Todas") v = v.filter((r) => r.deporte === fDeporte);
          if (fModalidad !== "Todas") v = v.filter((r) => r.modalidad === fModalidad);
          if (fCategoria !== "Todas") v = v.filter((r) => r.cat === fCategoria);
          if (query) {
            const q = norm(query);
            v = v.filter((r) => norm(r.nombre).includes(q) || norm(r.numDoc).includes(q) || norm(r.modalidad).includes(q) || norm(r.deporte).includes(q));
          }
          return v;
        }, kpis = function(rows) {
          const deportes = [...new Set(rows.map((r) => r.deporte).filter(Boolean))];
          const menores = rows.filter((r) => r.edad != null && r.edad < 18).length;
          const conMedalla = rows.filter((r) => r.medallas > 0).length;
          const tiles = [
            { k: "brand", ico: I.users, val: rows.length, lbl: rows.length === 1 ? "Deportista afiliado" : "Deportistas afiliados" },
            { k: "info", ico: I.shield, val: deportes.length, lbl: deportes.length === 1 ? "Deporte" : "Deportes", sub: deportes.join(" \xB7 ") },
            { k: "ok", ico: I.medal, val: conMedalla, lbl: "Con medaller\xEDa registrada" },
            { k: menores ? "warn" : "neutral", ico: I.minor, val: menores, lbl: menores === 1 ? "Menor de edad" : "Menores de edad", sub: menores ? "Requieren consentimiento del tutor" : "" }
          ];
          const sinAsociar = rows.filter((r) => r.estado === "registrado").length;
          if (puedeCrear && !esClub) {
            tiles.push({
              k: sinAsociar ? "warn" : "neutral",
              ico: I.link,
              val: sinAsociar,
              lbl: sinAsociar === 1 ? "Pendiente de asociar" : "Pendientes de asociar",
              sub: sinAsociar ? "Completa su cadena de organismos" : ""
            });
          }
          if (esClub && scopeId) {
            const pend = solicitudesDeClub(scopeId).filter((s) => s.estado === "Enviada").length;
            tiles.push({
              k: pend ? "warn" : "neutral",
              ico: I.inbox,
              val: pend,
              lbl: pend === 1 ? "Solicitud por confirmar" : "Solicitudes por confirmar",
              href: `bandeja.html?role=${encodeURIComponent(roleCode2)}`
            });
          }
          return `<div class="dp-kpis" id="dpKpis">${tiles.map((t) => {
            const inner = `
        <span class="dp-kpi__ico dp-kpi__ico--${t.k}">${t.ico}</span>
        <span class="dp-kpi__body">
          <span class="dp-kpi__val">${t.val}</span>
          <span class="dp-kpi__lbl">${esc(t.lbl)}</span>
          ${t.sub ? `<span class="dp-kpi__sub">${esc(t.sub)}</span>` : ""}
        </span>`;
            return t.href ? `<a class="dp-kpi dp-kpi--link" href="${esc(t.href)}">${inner}</a>` : `<div class="dp-kpi">${inner}</div>`;
          }).join("")}</div>`;
        }, filtroDropdown = function(key, label, vals, cur) {
          if (vals.length <= 1) return "";
          const opts = ["Todas", ...vals];
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
              <div class="naowee-dropdown__opt${v === cur ? " is-selected" : ""}" role="option"
                   aria-selected="${v === cur}" data-value="${esc(v)}">
                ${esc(v)}<span class="naowee-dropdown__opt-check">${I.check}</span>
              </div>`).join("")}
          </div>
        </div>
      </span>`;
        }, setFiltro = function(key, valor) {
          if (key === "deporte") fDeporte = valor;
          else if (key === "modalidad") fModalidad = valor;
          else if (key === "categoria") fCategoria = valor;
          page = 1;
          render();
        }, wireDropdowns = function() {
          if (_ddWired) return;
          _ddWired = true;
          document.addEventListener("click", (e) => {
            const opt = e.target.closest(".dp-dd .naowee-dropdown__opt");
            if (opt) {
              const dd = opt.closest(".dp-dd");
              setFiltro(dd.getAttribute("data-dd"), opt.getAttribute("data-value"));
              return;
            }
            const trigger = e.target.closest(".dp-dd .naowee-dropdown__trigger");
            document.querySelectorAll(".dp-dd").forEach((dd) => {
              var _a;
              const esSuyo = trigger && dd.contains(trigger);
              const abrir = esSuyo && !dd.classList.contains("naowee-dropdown--open");
              dd.classList.toggle("naowee-dropdown--open", !!abrir);
              (_a = dd.querySelector(".naowee-dropdown__trigger")) == null ? void 0 : _a.setAttribute("aria-expanded", abrir ? "true" : "false");
            });
          });
          document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") return;
            document.querySelectorAll(".dp-dd.naowee-dropdown--open").forEach((dd) => {
              var _a;
              dd.classList.remove("naowee-dropdown--open");
              (_a = dd.querySelector(".naowee-dropdown__trigger")) == null ? void 0 : _a.setAttribute("aria-expanded", "false");
            });
          });
        }, render = function() {
          if (!puedeVer) {
            root.innerHTML = msg(
              "caution",
              I.info,
              "Tu perfil no tiene permiso de consulta sobre deportistas en la matriz de accesos del m\xF3dulo."
            );
            return;
          }
          const rows = plantel();
          const modalidades = [...new Set(rows.map((r) => r.modalidad).filter((m) => m && m !== "\u2014"))].sort(sortEs);
          const categorias = [...new Set(rows.map((r) => r.cat).filter((c) => c && c !== "\u2014"))].sort(sortEs);
          const deportes = [...new Set(rows.map((r) => r.deporte).filter(Boolean))].sort(sortEs);
          const view = filtrar(rows);
          const totalPages = Math.max(1, Math.ceil(view.length / PAGE_SIZE));
          if (page > totalPages) page = totalPages;
          const pageRows = view.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
          const filtrando = query !== "" || fModalidad !== "Todas" || fCategoria !== "Todas" || fDeporte !== "Todas";
          root.innerHTML = `
      ${msg(
            "informative",
            I.info,
            esClub ? `Deportistas con afiliaci\xF3n <strong>confirmada</strong> a <strong>${esc(club ? club.nombre : "tu club")}</strong>. Cada ficha muestra la <strong>cadena heredada</strong> (club \u2192 liga \u2192 federaci\xF3n \u2192 comit\xE9) que el deportista recibi\xF3 al ser aprobado (ORG-05). Registra deportistas con <strong>Registrar deportista</strong>; las solicitudes de afiliaci\xF3n y bajas se confirman en <a href="bandeja.html?role=${encodeURIComponent(roleCode2)}">Solicitudes de deportistas</a>.` : `Deportistas vinculados a clubes de tu jurisdicci\xF3n${club ? ` (<strong>${esc(club.nombre)}</strong> y su sub\xE1rbol)` : ""}. Registra deportistas y as\xF3cialos a la cadena de organismos que tienes debajo.`,
            "margin-bottom:16px"
          )}

      ${esClub && club && club.id === "CLU-001" ? `
        <div class="naowee-card" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:14px 18px;margin-bottom:16px">
          <span aria-hidden="true" style="width:36px;height:36px;border-radius:50%;display:grid;place-items:center;flex-shrink:0;background:#0e749022;color:#0e7490;font-weight:700;font-size:13px">LG</span>
          <div style="flex:1;min-width:200px">
            <div class="bj-org__name">Laura G\xF3mez \xB7 deportista y entrenadora</div>
            <div class="bj-org__sub">Afiliada a tu club como deportista y con un v\xEDnculo solicitado como personal de apoyo. Perfil multi-rol (v1.6.0).</div>
          </div>
          <a class="naowee-btn naowee-btn--mute naowee-btn--small" href="perfil.html?role=CLUB&persona=laura&from=${encodeURIComponent("deportistas.html?role=CLUB")}">Ver perfil</a>
        </div>` : ""}

      ${kpis(rows)}

      <div class="naowee-card bj-panel">
        <div class="bj-panel__bar">
          <div class="naowee-searchbox bj-search${query ? " naowee-searchbox--has-value" : ""}" id="dpSearchBox">
            <div class="naowee-searchbox__input-wrap">
              <span class="naowee-searchbox__icon">${I.search}</span>
              <input class="naowee-searchbox__input" id="dpSearch" type="text"
                     placeholder="Buscar por nombre, documento o modalidad\u2026" value="${esc(query)}"
                     aria-label="Buscar deportista">
              <button type="button" class="naowee-searchbox__clear" id="dpClear" aria-label="Limpiar b\xFAsqueda">${I.close}</button>
            </div>
          </div>
          ${filtroDropdown("deporte", "Deporte", deportes, fDeporte)}
          ${filtroDropdown("modalidad", "Modalidad", modalidades, fModalidad)}
          ${filtroDropdown("categoria", "Categor\xEDa", categorias, fCategoria)}
        </div>

        ${pageRows.length ? `
          <div class="cg-table-wrap">
            <table class="cg-table bj-table">
              <thead>
                <tr>
                  <th>Deportista</th><th>Modalidad</th><th>Categor\xEDa</th>
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
                    <td data-label="Categor\xEDa">${catBadge(r.cat)}</td>
                    <td class="cg-table__nit" data-label="Edad">${r.edad != null ? `${r.edad} a\xF1os` : "\u2014"}${r.edad != null && r.edad < 18 ? ` <span class="dp-minor" title="Menor de edad \u2014 requiere consentimiento del tutor">menor</span>` : ""}</td>
                    <td data-label="Estado">${estBadge(r.estado)}${r.faltan.length ? `<div class="bj-org__sub dp-falta">Falta: ${esc(r.faltan.map((n) => NIVEL_LBL[n]).join(" \u2192 "))}</div>` : ""}</td>
                    <td class="bj-row-action" data-label="">
                      ${r.faltan.length && puedeCrear ? `<button type="button" class="naowee-btn naowee-btn--small" data-asoc="${esc(r.id)}">Completar asociaci\xF3n</button>` : ""}
                      <button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-ficha="${esc(r.id)}">Ver ficha</button>
                      ${puedeDesvincular && r.estado === "vinculado" ? `<button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small dp-btn-danger" data-desv="${esc(r.id)}">Desvincular</button>` : ""}
                    </td>
                  </tr>`).join("")}
              </tbody>
            </table>
          </div>
          ${totalPages > 1 ? `
            <div class="bj-panel__foot">
              <div class="naowee-pagination naowee-pagination--small" id="dpPager">
                <div class="naowee-pagination__pages">
                  <span class="naowee-pagination__label">P\xE1gina</span>
                  <input class="naowee-pagination__input" id="dpPageInput" type="number" min="1" max="${totalPages}" value="${page}" aria-label="N\xFAmero de p\xE1gina">
                  <span class="naowee-pagination__total">de <strong>${totalPages}</strong></span>
                </div>
                <div class="naowee-pagination__controls">
                  <button type="button" class="naowee-pagination__btn" data-pg="prev"${page <= 1 ? " disabled" : ""} aria-label="P\xE1gina anterior">${I.chevL}</button>
                  <button type="button" class="naowee-pagination__btn" data-pg="next"${page >= totalPages ? " disabled" : ""} aria-label="P\xE1gina siguiente">${I.chevR}</button>
                </div>
              </div>
            </div>` : ""}
        ` : filtrando ? emptyState("Sin resultados", "Ning\xFAn deportista de tu plantel coincide con la b\xFAsqueda o los filtros aplicados.") : emptyState(
            "Sin deportistas afiliados",
            esClub ? "Tu club a\xFAn no tiene deportistas con afiliaci\xF3n confirmada. Cuando apruebes una solicitud en \xABSolicitudes de deportistas\xBB, el deportista aparecer\xE1 aqu\xED." : "Todav\xEDa no hay deportistas vinculados a clubes de tu jurisdicci\xF3n."
          )}
      </div>`;
          pintarAcciones();
          wire();
        }, pintarAcciones = function() {
          const box = document.getElementById("dpActions");
          if (!box || !puedeCrear || box.querySelector("#dpNuevo")) return;
          box.insertAdjacentHTML("beforeend", `
      <button type="button" class="naowee-btn naowee-btn--quiet" id="dpMasivo">${I.upload}Cargue masivo de deportistas</button>
      <button type="button" class="naowee-btn naowee-btn--loud" id="dpNuevo">${I.plus}Registrar deportista</button>`);
          document.getElementById("dpNuevo").addEventListener("click", () => openRegistro());
          document.getElementById("dpMasivo").addEventListener("click", openMasivo);
        }, openDesvincular = function(id) {
          const dep = getDeportista(id);
          if (!dep) return;
          const p = buildDeportistaDetalle(dep);
          let motivo = "";
          let comentario = "";
          const ov = document.createElement("div");
          ov.className = "reg-modal-overlay dp-modal-ov";
          ov.innerHTML = `
      <div class="reg-modal bj-modal bj-modal--sm dp-desv">
        <div class="reg-modal__head">
          <h3 class="reg-modal__title">Desvincular deportista</h3>
          <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button>
        </div>
        <div class="reg-modal__body">
          ${msg("caution", I.info, `Vas a desvincular a <strong>${esc(dep.nombre)}</strong> de <strong>${esc(club ? club.nombre : "tu club")}</strong>. Quedar\xE1 <strong>autodeclarado</strong> y perder\xE1 la cadena heredada (${esc(p && p.ligaNombre ? p.ligaNombre : "liga")} \xB7 ${esc(p && p.federacionNombre ? p.federacionNombre : "federaci\xF3n")}). Podr\xE1 volver a solicitar afiliaci\xF3n cuando quiera.`)}
          <div class="dp-desv__field">
            <span class="bj-filter__lbl" id="dpDesvLbl">Motivo de la desvinculaci\xF3n <span aria-hidden="true">*</span></span>
            <div class="naowee-dropdown dp-desv__dd" id="dpDesvDd">
              <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"
                      aria-expanded="false" aria-labelledby="dpDesvLbl">
                <span class="naowee-dropdown__value is-placeholder">Seleccione\u2026</span>
                <span class="naowee-dropdown__chevron">${I.chevron}</span>
              </button>
              <div class="naowee-dropdown__menu" role="listbox">
                ${MOTIVOS_DESV.map((m) => `
                  <div class="naowee-dropdown__opt" role="option" data-value="${esc(m)}">
                    ${esc(m)}<span class="naowee-dropdown__opt-check">${I.check}</span>
                  </div>`).join("")}
              </div>
            </div>
            <p class="naowee-helper dp-desv__err" id="dpDesvErr" hidden>Selecciona un motivo para continuar.</p>
          </div>
          <div class="dp-desv__field" id="dpDesvComentWrap" hidden>
            <label class="bj-filter__lbl" for="dpDesvComent">Comentario</label>
            <textarea class="dp-desv__ta" id="dpDesvComent" rows="3"
                      placeholder="Describe el motivo (queda en la trazabilidad)."></textarea>
          </div>
          <p class="bj-detail__note">El deportista recibe notificaci\xF3n por email y app, y el motivo queda registrado en su historial y en la auditor\xEDa del club.</p>
        </div>
        <div class="reg-modal__foot bj-modal__foot">
          <button type="button" class="naowee-btn naowee-btn--mute" data-close>Cancelar</button>
          <button type="button" class="naowee-btn bj-btn-danger" id="dpDesvOk">Desvincular</button>
        </div>
      </div>`;
          document.body.appendChild(ov);
          requestAnimationFrame(() => ov.classList.add("is-open"));
          const cerrar = () => {
            if (ov.__closing) return;
            ov.__closing = true;
            ov.classList.remove("is-open");
            setTimeout(() => ov.remove(), 340);
            document.removeEventListener("keydown", onKey);
          };
          const onKey = (e) => {
            if (e.key === "Escape") cerrar();
          };
          ov.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", cerrar));
          ov.addEventListener("click", (e) => {
            if (e.target === e.currentTarget) cerrar();
          });
          document.addEventListener("keydown", onKey);
          const dd = ov.querySelector("#dpDesvDd");
          const val = dd.querySelector(".naowee-dropdown__value");
          dd.querySelector(".naowee-dropdown__trigger").addEventListener("click", (e) => {
            e.stopPropagation();
            const abrir = !dd.classList.contains("naowee-dropdown--open");
            dd.classList.toggle("naowee-dropdown--open", abrir);
            dd.querySelector(".naowee-dropdown__trigger").setAttribute("aria-expanded", abrir ? "true" : "false");
          });
          dd.querySelectorAll(".naowee-dropdown__opt").forEach((opt) => {
            opt.addEventListener("click", () => {
              motivo = opt.getAttribute("data-value");
              val.textContent = motivo;
              val.classList.remove("is-placeholder");
              dd.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.toggle("is-selected", o === opt));
              dd.classList.remove("naowee-dropdown--open");
              ov.querySelector("#dpDesvErr").hidden = true;
              ov.querySelector("#dpDesvComentWrap").hidden = !/^Otro/.test(motivo);
            });
          });
          ov.addEventListener("click", (e) => {
            if (!dd.contains(e.target)) dd.classList.remove("naowee-dropdown--open");
          });
          ov.querySelector("#dpDesvOk").addEventListener("click", () => {
            var _a;
            comentario = (((_a = ov.querySelector("#dpDesvComent")) == null ? void 0 : _a.value) || "").trim();
            if (!motivo || /^Otro/.test(motivo) && !comentario) {
              ov.querySelector("#dpDesvErr").hidden = false;
              ov.querySelector("#dpDesvErr").textContent = !motivo ? "Selecciona un motivo para continuar." : "Describe el motivo en el comentario.";
              dd.classList.add("naowee-shake");
              setTimeout(() => dd.classList.remove("naowee-shake"), 500);
              return;
            }
            const texto = /^Otro/.test(motivo) ? `${motivo}: ${comentario}` : motivo;
            desvincularPorClub(id, { motivo: texto, responsable: (ROLES[roleCode2] || {}).userName || "" });
            cerrar();
            render();
            if (window.naoweeToast) {
              window.naoweeToast(`${dep.nombre} qued\xF3 desvinculado de tu club.`, "success");
            }
          });
        }, openRegistro = function(depId) {
          const actor = getOrganismo(scopeId);
          if (!actor) return;
          const existente = depId ? getDeportista(depId) : null;
          const abajo = NIVELES_ABAJO[actor.tipo] || [];
          const fijos = [...ancestorsOf(actor.id).reverse(), actor];
          const st = {
            step: existente ? 2 : 1,
            id: existente ? existente.id : null,
            err: "",
            d: { nombre: "", tipoDoc: "CC", numDoc: "", deporte: DEPORTES[0], correo: "" },
            sel: { ...existente && existente.asocParcial || {} }
          };
          const ov = document.createElement("div");
          ov.className = "reg-modal-overlay dp-modal-ov";
          document.body.appendChild(ov);
          requestAnimationFrame(() => ov.classList.add("is-open"));
          const cerrar = () => {
            ov.classList.remove("is-open");
            setTimeout(() => ov.remove(), 340);
            document.removeEventListener("keydown", onKey);
          };
          const onKey = (e) => {
            if (e.key === "Escape") cerrar();
          };
          document.addEventListener("keydown", onKey);
          const opciones = (tipo) => {
            const padre = tipo === "federacion" ? actor.id : tipo === "liga" ? st.sel.federacionId || (actor.tipo === "federacion" ? actor.id : null) : st.sel.ligaId || (actor.tipo === "liga" ? actor.id : null);
            return padre ? childrenOf(padre).filter((o) => o.tipo === tipo && o.estado === "Activo") : [];
          };
          const dd = (key, tipo) => {
            const ops = opciones(tipo);
            const cur = ops.find((o) => o.id === st.sel[`${tipo}Id`]);
            return `<div class="dp-desv__field">
        <span class="bj-filter__lbl">${TIPO_LBL[tipo]}</span>
        <div class="naowee-dropdown dp-desv__dd" data-dd="${tipo}">
          <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"${ops.length ? "" : " disabled"}>
            <span class="naowee-dropdown__value${cur ? "" : " is-placeholder"}">${esc(cur ? cur.nombre : ops.length ? "Seleccione\u2026" : "Elige primero el nivel anterior")}</span>
            <span class="naowee-dropdown__chevron">${I.chevron}</span>
          </button>
          <div class="naowee-dropdown__menu" role="listbox">
            ${ops.map((o) => `<div class="naowee-dropdown__opt${cur && cur.id === o.id ? " is-selected" : ""}" role="option" data-value="${esc(o.id)}">${esc(o.nombre)}<span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join("")}
          </div>
        </div></div>`;
          };
          const campo = (id, label, val, type) => `<div class="dp-desv__field">
      <label class="bj-filter__lbl" for="${id}">${label} <span aria-hidden="true">*</span></label>
      <div class="naowee-textfield"><div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" id="${id}" type="${type || "text"}" value="${esc(val)}"></div></div></div>`;
          function draw() {
            const pasos = ["Registro", "Asociaci\xF3n"].map((t, i) => {
              const n = i + 1;
              const estado = st.step > n ? "done" : st.step === n ? "on" : "";
              return `<li class="dp-step ${estado ? `dp-step--${estado}` : ""}"><span class="dp-step__n">${estado === "done" ? I.check : n}</span>${t}</li>`;
            }).join('<li class="dp-step__sep" aria-hidden="true"></li>');
            const nombre = existente ? existente.nombre : st.d.nombre;
            ov.innerHTML = `
      <div class="reg-modal bj-modal bj-modal--overflow dp-desv">
        <div class="reg-modal__head">
          <h3 class="reg-modal__title">${existente ? "Completar asociaci\xF3n" : "Registrar deportista"}</h3>
          <button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button>
        </div>
        <div class="reg-modal__body">
          <ol class="dp-steps">${pasos}</ol>
          ${st.step === 1 ? `
            ${campo("rdNombre", "Nombre completo", st.d.nombre)}
            ${campo("rdDoc", "N\xFAmero de documento", st.d.numDoc)}
            ${campo("rdCorreo", "Correo electr\xF3nico", st.d.correo, "email")}
            <div class="dp-desv__field"><span class="bj-filter__lbl">Deporte</span>
              <div class="naowee-dropdown dp-desv__dd" data-dd="deporte"><button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false"><span class="naowee-dropdown__value">${esc(st.d.deporte)}</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
              <div class="naowee-dropdown__menu" role="listbox">${DEPORTES.map((x) => `<div class="naowee-dropdown__opt${x === st.d.deporte ? " is-selected" : ""}" role="option" data-value="${x}">${x}<span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join("")}</div></div></div>
            <p class="bj-detail__note">Momento 1 de 2: el deportista queda registrado. Luego lo asocias a la cadena de organismos (puedes dejarlo para despu\xE9s).</p>` : `
            ${msg("informative", I.info, `Momento 2 de 2: asocia a <strong>${esc(nombre)}</strong>. Lo de arriba ya viene de d\xF3nde entraste y no se cambia.`)}
            <div class="dp-chain">${fijos.map((o) => `<span class="dp-chain__chip" title="Fijo: seg\xFAn tu organismo">${esc(TIPO_LBL[o.tipo])} \xB7 ${esc(o.nombre)}</span>`).join("")}</div>
            ${abajo.map((t) => dd(t, t)).join("") || '<p class="bj-detail__note">Como club, el deportista queda asociado a tu club autom\xE1ticamente.</p>'}`}
          ${st.err ? `<p class="naowee-helper dp-desv__err">${esc(st.err)}</p>` : ""}
        </div>
        <div class="reg-modal__foot bj-modal__foot">
          <button type="button" class="naowee-btn naowee-btn--mute" data-close>${st.step === 2 ? "Asociar despu\xE9s" : "Cancelar"}</button>
          <button type="button" class="naowee-btn" id="rdOk">${st.step === 1 ? "Registrar y continuar" : "Guardar asociaci\xF3n"}</button>
        </div>
      </div>`;
          }
          ov.addEventListener("click", (e) => {
            if (e.target === ov || e.target.closest("[data-close]")) {
              if (st.id) render();
              cerrar();
              return;
            }
            const opt = e.target.closest(".naowee-dropdown__opt");
            const trg = e.target.closest(".naowee-dropdown__trigger");
            if (opt) {
              const key = opt.closest("[data-dd]").getAttribute("data-dd");
              const v = opt.getAttribute("data-value");
              if (key === "deporte") st.d.deporte = v;
              else {
                st.sel[`${key}Id`] = v;
                if (key === "federacion") {
                  delete st.sel.ligaId;
                  delete st.sel.clubId;
                }
                if (key === "liga") delete st.sel.clubId;
              }
              leer();
              draw();
              return;
            }
            ov.querySelectorAll(".naowee-dropdown").forEach((d) => {
              const abre = trg && d.contains(trg) && !d.classList.contains("naowee-dropdown--open");
              d.classList.toggle("naowee-dropdown--open", !!abre);
            });
            if (e.target.closest("#rdOk")) avanzar();
          });
          const leer = () => {
            var _a, _b, _c, _d, _e, _f;
            if (st.step !== 1) return;
            st.d.nombre = (_b = (_a = ov.querySelector("#rdNombre")) == null ? void 0 : _a.value.trim()) != null ? _b : st.d.nombre;
            st.d.numDoc = (_d = (_c = ov.querySelector("#rdDoc")) == null ? void 0 : _c.value.trim()) != null ? _d : st.d.numDoc;
            st.d.correo = (_f = (_e = ov.querySelector("#rdCorreo")) == null ? void 0 : _e.value.trim()) != null ? _f : st.d.correo;
          };
          function avanzar() {
            leer();
            st.err = "";
            if (st.step === 1) {
              if (!st.d.nombre || !st.d.numDoc || !/.+@.+\..+/.test(st.d.correo)) {
                st.err = "Completa nombre, documento y un correo v\xE1lido.";
                draw();
                return;
              }
              const dep2 = registrarDeportista(st.d, actor.id);
              st.id = dep2.id;
              st.step = 2;
              if (!abajo.length) {
                render();
                cerrar();
                toast(`${dep2.nombre} qued\xF3 registrado y asociado a tu club.`);
                return;
              }
              render();
              draw();
              return;
            }
            const falta = abajo.filter((t) => !st.sel[`${t}Id`]);
            const dep = asociarDeportista(st.id, st.sel);
            render();
            cerrar();
            toast(falta.length ? `${dep.nombre}: asociaci\xF3n parcial, falta ${falta.map((t) => NIVEL_LBL[t]).join(" y ")}.` : `${dep.nombre} qued\xF3 asociado.`);
          }
          draw();
        }, openMasivo = function() {
          const ov = document.createElement("div");
          ov.className = "reg-modal-overlay dp-modal-ov";
          ov.innerHTML = `<div class="reg-modal bj-modal bj-modal--sm"><div class="reg-modal__head"><h3 class="reg-modal__title">Cargue masivo de deportistas</h3><button type="button" class="reg-modal__close" data-close aria-label="Cerrar">${I.close}</button></div>
      <div class="reg-modal__body">${msg("informative", I.info, "Pr\xF3ximamente: subir\xE1s una plantilla .xlsx con los deportistas y la asociaci\xF3n quedar\xE1 como segundo paso, igual que en el registro manual.")}</div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn" data-close>Entendido</button></div></div>`;
          document.body.appendChild(ov);
          requestAnimationFrame(() => ov.classList.add("is-open"));
          ov.addEventListener("click", (e) => {
            if (e.target === ov || e.target.closest("[data-close]")) {
              ov.classList.remove("is-open");
              setTimeout(() => ov.remove(), 340);
            }
          });
        }, wire = function() {
          var _a, _b;
          const search = document.getElementById("dpSearch");
          if (search) {
            search.addEventListener("input", (e) => {
              query = e.target.value;
              page = 1;
              const pos = search.selectionStart;
              render();
              const next = document.getElementById("dpSearch");
              if (next) {
                next.focus();
                try {
                  next.setSelectionRange(pos, pos);
                } catch (_) {
                }
              }
            });
          }
          (_a = document.getElementById("dpClear")) == null ? void 0 : _a.addEventListener("click", () => {
            var _a2;
            query = "";
            page = 1;
            render();
            (_a2 = document.getElementById("dpSearch")) == null ? void 0 : _a2.focus();
          });
          wireDropdowns();
          document.querySelectorAll("[data-ficha]").forEach((b) => {
            b.addEventListener("click", () => {
              const id = b.getAttribute("data-ficha");
              window.location.href = `afiliacion.html?role=${encodeURIComponent(roleCode2)}&id=${encodeURIComponent(id)}&from=deportistas`;
            });
          });
          document.querySelectorAll("[data-asoc]").forEach((b) => {
            b.addEventListener("click", () => openRegistro(b.getAttribute("data-asoc")));
          });
          document.querySelectorAll("[data-desv]").forEach((b) => {
            b.addEventListener("click", () => openDesvincular(b.getAttribute("data-desv")));
          });
          document.querySelectorAll("#dpPager [data-pg]").forEach((b) => {
            b.addEventListener("click", () => {
              page += b.getAttribute("data-pg") === "next" ? 1 : -1;
              if (page < 1) page = 1;
              render();
            });
          });
          (_b = document.getElementById("dpPageInput")) == null ? void 0 : _b.addEventListener("change", (e) => {
            const n = parseInt(e.target.value, 10);
            if (!Number.isNaN(n)) {
              page = Math.max(1, n);
              render();
            }
          });
        };
        const qsp = (k) => new URLSearchParams(location.search).get(k);
        const roleCode2 = qsp("role") || "MINDEPORTE";
        const scopeId = scopeFor(roleCode2);
        const puedeVer = can(roleCode2, "R", "deportistas");
        const esClub = roleCode2 === "CLUB";
        const puedeCrear = can(roleCode2, "C", "deportistas");
        const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        const norm = (s) => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
        const PAGE_SIZE = 10;
        const I = {
          users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
          medal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8 3h8l-3 6h-2L8 3z"/></svg>',
          shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
          minor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 21v-1a6 6 0 0 1 12 0v1"/></svg>',
          inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
          search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
          info: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
          chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
          chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
          close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
          chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
          link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.7-1.7"/></svg>',
          plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
          upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
          check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
        };
        const EST_VARIANT = { vinculado: "positive", autodeclarado: "neutral", registrado: "caution" };
        const EST_LABEL = { vinculado: "Vinculado", autodeclarado: "Autodeclarado", registrado: "Sin asociar" };
        const NIVEL_LBL = { federacion: "federaci\xF3n", liga: "liga", club: "club" };
        const estBadge = (e) => `<span class="naowee-badge naowee-badge--${EST_VARIANT[e] || "neutral"} naowee-badge--quiet naowee-badge--small">${esc(EST_LABEL[e] || e)}</span>`;
        const catBadge = (l) => `<span class="naowee-badge naowee-badge--neutral naowee-badge--quiet naowee-badge--small">${esc(l)}</span>`;
        const emptyState = (title, desc) => `<div class="naowee-empty-state"><span class="naowee-empty-state__icon">${I.users}</span><p class="naowee-empty-state__title">${esc(title)}</p><p class="naowee-empty-state__description">${esc(desc)}</p></div>`;
        const msg = (variant, icon, html, style) => `<div class="naowee-message naowee-message--${variant}"${style ? ` style="${style}"` : ""}><span class="naowee-message__icon">${icon}</span><div class="naowee-message__body"><p class="naowee-message__text">${html}</p></div></div>`;
        const club = scopeId ? getOrganismo(scopeId) : null;
        const puedeDesvincular = can(roleCode2, "X", "deportistas");
        const MOTIVOS_DESV = [
          "Retiro voluntario del deportista",
          "Inactividad \xB7 no contin\xFAa entrenando",
          "Traslado a otro club",
          "Incumplimiento del reglamento interno",
          "Fin de vigencia de la afiliaci\xF3n",
          "Otro (ver comentario)"
        ];
        let query = "";
        let fModalidad = "Todas";
        let fCategoria = "Todas";
        let fDeporte = "Todas";
        let page = 1;
        let _ddWired = false;
        const sortEs = (a, b) => a.localeCompare(b, "es");
        const DEPORTES = ["Patinaje", "Nataci\xF3n", "F\xFAtbol", "Ciclismo"];
        const NIVELES_ABAJO = { comite: ["federacion", "liga", "club"], federacion: ["liga", "club"], liga: ["club"], club: [] };
        const TIPO_LBL = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
        const toast = (t) => {
          if (window.naoweeToast) window.naoweeToast(t, "success");
        };
        render();
      }
    }
  });

  // shared/entries/deportistas.js
  init_sidebar();
  init_organismos_data();
  init_permissions();

  // shared/devnotes.js
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

  // shared/entries/deportistas.js
  seedDemoData();
  var roleCode = getRoleFromQuery();
  var role = ROLES[roleCode];
  getMenuForRole(roleCode).forEach((s) => s.items.forEach((it) => {
    if (it.id === "deportistas") document.getElementById("pageTitle").textContent = it.label;
  }));
  if (roleCode === "CLUB") {
    const club = getOrganismo(scopeFor(roleCode));
    if (club) document.getElementById("pageTitle").textContent = club.nombre;
    document.querySelector('[data-devnote="clubTitulo"]').style.display = "";
    mountDevnotes({ clubTitulo: { title: "T\xEDtulo con el nombre del club", items: [
      "El rol CLUB ve el nombre de su club como t\xEDtulo (antes \xABMis deportistas\xBB); roles superiores conservan la etiqueta del men\xFA.",
      "Dato: <code>organismo.nombre</code> del organismo en el alcance del rol (<code>scopeFor</code>)."
    ] } });
  }
  if (roleCode !== "CLUB") {
    document.getElementById("pageSub").textContent = "Deportistas vinculados a clubes de tu jurisdicci\xF3n, heredados de la jerarqu\xEDa. Vista de consulta.";
  }
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode, activeId: "deportistas" });
  mountHeader({ headerEl: document.getElementById("topHeader"), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  Promise.resolve().then(() => init_deportistas());
})();
