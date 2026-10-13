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
  function demoToast(msg2) {
    let toast2 = document.getElementById("evToast");
    if (!toast2) {
      toast2 = document.createElement("div");
      toast2.id = "evToast";
      toast2.setAttribute("role", "status");
      document.body.appendChild(toast2);
    }
    toast2.textContent = msg2;
    toast2.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast2.classList.remove("is-visible"), 2600);
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
  function estadoBadgeVariant(estado) {
    return BADGE_VARIANT[estado] || "neutral";
  }
  function resolverFederacion(validacion) {
    const v = validacion || {};
    if (v.mindeporte === "rechazado" || v.comite === "rechazado") return "Rechazado";
    if (v.mindeporte === "aprobado" && v.comite === "aprobado") return "Activo";
    return "En revisi\xF3n";
  }
  function puedeTransicionar(role3, org, aEstado, superior) {
    const t = TRANSICIONES.find((x) => x.a === aEstado && (x.de === org.estado || x.de === "*"));
    if (!t) return false;
    if (t.quien === "MINDEPORTE") return role3 === "MINDEPORTE";
    if (t.quien === "superior") {
      if (superior && superior.estado !== "Activo") return false;
      return true;
    }
    return false;
  }
  var BADGE_VARIANT, TRANSICIONES;
  var init_estados = __esm({
    "shared/estados.js"() {
      BADGE_VARIANT = {
        "Preinscrito": "neutral",
        "En revisi\xF3n": "caution",
        "En correcci\xF3n": "caution",
        "Activo": "positive",
        "Rechazado": "negative",
        "Suspendido": "caution",
        "Inactivo": "neutral",
        "Cancelado": "negative"
      };
      TRANSICIONES = [
        { de: "Preinscrito", a: "En revisi\xF3n", quien: "organismo", regla: "El propio organismo completa y env\xEDa su registro." },
        { de: "En revisi\xF3n", a: "Activo", quien: "superior", regla: "Nivel superior inmediato (federaci\xF3n: doble validaci\xF3n Mindeporte + Comit\xE9). El padre debe estar Activo." },
        { de: "En revisi\xF3n", a: "Rechazado", quien: "superior", regla: "Motivo obligatorio." },
        { de: "En revisi\xF3n", a: "En correcci\xF3n", quien: "superior", regla: "Solicitud de correcci\xF3n con motivo obligatorio; NO es rechazo \u2014 el organismo corrige y reenv\xEDa." },
        { de: "En correcci\xF3n", a: "En revisi\xF3n", quien: "organismo", regla: "Corrige y reenv\xEDa; reingresa al mismo flujo." },
        { de: "Rechazado", a: "En revisi\xF3n", quien: "organismo", regla: "Corrige y reenv\xEDa; reingresa al mismo flujo." },
        { de: "Activo", a: "Suspendido", quien: "MINDEPORTE", regla: "Sanci\xF3n temporal (supuesto de demo)." },
        { de: "Activo", a: "Inactivo", quien: "MINDEPORTE", regla: "Sin uso / p\xE9rdida de v\xEDnculos (condici\xF3n pendiente de definir)." },
        { de: "*", a: "Cancelado", quien: "MINDEPORTE", regla: "P\xE9rdida de reconocimiento; NO reingresa." }
      ];
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
  function updateOrganismo(id, patch) {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const i = nuevos.findIndex((o) => o.id === id);
    if (i >= 0) {
      nuevos[i] = { ...nuevos[i], ...patch };
      writeStore("organismos-nuevos", nuevos);
    } else {
      const overrides = readStore("organismos-overrides", {}) || {};
      overrides[id] = { ...overrides[id] || {}, ...patch };
      writeStore("organismos-overrides", overrides);
    }
    return getOrganismo(id);
  }
  function setEstado(id, estado, meta = {}) {
    const prev = getOrganismo(id);
    const updated = updateOrganismo(id, { estado, ...meta.patch || {} });
    auditLog({
      orgId: id,
      notif: true,
      fecha: meta.fecha || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      responsable: meta.responsable || "",
      rol: meta.rol || "",
      accion: meta.accion || "Cambio de estado",
      de: prev ? prev.estado : "",
      a: estado,
      motivo: meta.motivo || ""
    });
    return updated;
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }
  function allAudit(orgId) {
    const list = (readStore("audit", []) || []).map((a) => ({ ...a }));
    return orgId ? list.filter((a) => a.orgId === orgId) : list;
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
  function resolverAfiliacion(solicitudId, resultado, meta = {}) {
    const list = readStore("solicitudes", []) || [];
    const i = list.findIndex((s2) => s2.id === solicitudId);
    if (i < 0) return null;
    const s = list[i];
    const esRetiro = s.tipo === "retiro";
    const estadoSol = resultado === "aprobada" ? "Aprobada" : "Rechazada";
    list[i] = { ...s, estado: estadoSol, motivo: meta.motivo || "", responsable: meta.responsable || "", resueltaFecha: _todayISO() };
    writeStore("solicitudes", list);
    const dep = getDeportista(s.deportistaId);
    if (resultado === "aprobada") {
      if (esRetiro) {
        updateDeportista(s.deportistaId, { clubId: null, estado: "autodeclarado" });
      } else {
        updateDeportista(s.deportistaId, { clubId: s.clubId, estado: "vinculado" });
      }
    }
    auditLog({
      orgId: s.clubId,
      deportistaId: s.deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: _todayISO(),
      responsable: meta.responsable || "",
      rol: "CLUB",
      accion: esRetiro ? resultado === "aprobada" ? "Baja confirmada" : "Baja rechazada" : resultado === "aprobada" ? "Afiliaci\xF3n aprobada" : "Afiliaci\xF3n rechazada",
      de: esRetiro ? "Baja solicitada" : "Enviada",
      a: estadoSol,
      motivo: meta.motivo || "",
      notif: true
    });
    return { ...list[i] };
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
  function allPreinscritos() {
    return (readStore("preinscritos", []) || []).map((p) => ({ ...p }));
  }
  function getPreinscrito(id) {
    return allPreinscritos().find((p) => p.id === id) || null;
  }
  function resolverPreinscrito(id, resultado, meta = {}) {
    const list = readStore("preinscritos", []) || [];
    const i = list.findIndex((p2) => p2.id === id);
    if (i < 0) return null;
    const p = list[i];
    const MAP = { aprobado: "Activo", rechazado: "Rechazado", correccion: "En correcci\xF3n" };
    const ACC = { aprobado: "Registro validado", rechazado: "Registro rechazado", correccion: "Correcci\xF3n solicitada" };
    const nuevo = MAP[resultado] || p.estado;
    const fecha = _todayISO();
    const hist = _preHist(fecha, ACC[resultado] || "Actualizaci\xF3n", p.estado, nuevo, meta.responsable || "", meta.rol || "", meta.motivo || "");
    list[i] = { ...p, ...meta.patch || {}, estado: nuevo, motivo: meta.motivo || "", responsable: meta.responsable || "", resueltaFecha: fecha, historial: [...p.historial || [], hist] };
    writeStore("preinscritos", list);
    return { ...list[i] };
  }
  function updatePreinscrito(id, patch, hist) {
    const list = readStore("preinscritos", []) || [];
    const i = list.findIndex((p2) => p2.id === id);
    if (i < 0) return null;
    const p = list[i];
    const historial = hist ? [...p.historial || [], _preHist(_todayISO(), hist.accion || "Actualizaci\xF3n", p.estado, p.estado, hist.responsable || "", hist.rol || "", hist.motivo || "")] : p.historial || [];
    list[i] = { ...p, ...patch || {}, historial };
    writeStore("preinscritos", list);
    return { ...list[i] };
  }
  function seedPreinscritosDemo(mode) {
    if (mode !== "demo") return;
    const list = readStore("preinscritos", []) || [];
    if (list.some((p) => p.demoSeed)) return;
    const mk = (o) => ({ origen: "registro-publico", demoSeed: true, documentos: {}, historial: [], ...o });
    const seeds = [
      mk({
        id: "PRE-D1",
        tipo: "personal",
        subtipo: "Entrenador",
        rol: "Entrenador",
        nombre: "Carlos Palacio Mesa",
        tipoDoc: "CC",
        numDoc: "79345612",
        correo: "carlos.palacio@correo.demo.co",
        telefono: "+57 300 555 1010",
        profesion: "Entrenador de patinaje",
        experiencia: "8",
        deporte: "Patinaje",
        depto: "Valle del Cauca",
        ciudad: "Cali",
        estado: "En revisi\xF3n",
        fecha: "2026-07-13",
        documentos: { cert: { name: "certificacion-entrenador-nivel-2.pdf" } },
        historial: [_preHist("2026-07-13", "Registro p\xFAblico recibido", "", "En revisi\xF3n", "Carlos Palacio Mesa", "P\xDABLICO", "")]
      }),
      mk({
        id: "PRE-D2",
        tipo: "entidad",
        subtipo: "Club promotor",
        entTipo: "club-promotor",
        orgTipo: "club",
        parentId: "LIG-001",
        nombre: "Club Deportivo Ruedas de Occidente",
        nit: "901720045-3",
        correo: "contacto@ruedasdeoccidente.demo.co",
        telefono: "+57 602 555 2020",
        deporte: "Patinaje",
        sector: "Ol\xEDmpico",
        depto: "Valle del Cauca",
        ciudad: "Palmira",
        estado: "En revisi\xF3n",
        fecha: "2026-07-14",
        repLegal: { nombre: "Ana Mar\xEDa Torres", doc: "31567001", correo: "ana.torres@correo.demo.co" },
        documentos: { existencia: { name: "certificado-existencia-representacion.pdf" }, reconocimientoMunicipal: { name: "reconocimiento-ente-municipal.pdf" } },
        historial: [_preHist("2026-07-14", "Registro p\xFAblico recibido", "", "En revisi\xF3n", "Ana Mar\xEDa Torres", "P\xDABLICO", "")]
      }),
      mk({
        id: "PRE-D3",
        tipo: "personal",
        subtipo: "Juez / \xC1rbitro",
        rol: "Juez / \xC1rbitro",
        nombre: "Luc\xEDa Ram\xEDrez Pe\xF1a",
        tipoDoc: "CC",
        numDoc: "52889314",
        correo: "lucia.ramirez@correo.demo.co",
        telefono: "+57 301 555 3030",
        profesion: "Juez de nataci\xF3n",
        experiencia: "5",
        deporte: "Nataci\xF3n",
        depto: "Antioquia",
        ciudad: "Medell\xEDn",
        estado: "Activo",
        fecha: "2026-07-08",
        resueltaFecha: "2026-07-10",
        responsable: "Mar\xEDa F. Rojas",
        documentos: { cert: { name: "licencia-juez-natacion.pdf" } },
        historial: [_preHist("2026-07-08", "Registro p\xFAblico recibido", "", "En revisi\xF3n", "Luc\xEDa Ram\xEDrez Pe\xF1a", "P\xDABLICO", ""), _preHist("2026-07-10", "Registro validado", "En revisi\xF3n", "Activo", "Mar\xEDa F. Rojas", "MINDEPORTE", "")]
      }),
      mk({
        id: "PRE-D4",
        tipo: "entidad",
        subtipo: "Liga departamental",
        entTipo: "liga",
        orgTipo: "liga",
        parentId: "FED-040",
        nombre: "Liga de Patinaje de Cundinamarca",
        nit: "901720099-1",
        correo: "contacto@ligapatinajecundinamarca.demo.co",
        telefono: "+57 601 555 4040",
        deporte: "Patinaje",
        sector: "Ol\xEDmpico",
        depto: "Cundinamarca",
        ciudad: "Bogot\xE1",
        estado: "En correcci\xF3n",
        fecha: "2026-07-09",
        resueltaFecha: "2026-07-11",
        responsable: "Alberto Herrera",
        motivo: "Documento de la entidad incompleto \u2014 falta reconocimiento deportivo vigente",
        repLegal: { nombre: "Jorge Beltr\xE1n", doc: "79990012", correo: "jorge.beltran@correo.demo.co" },
        documentos: { personeria: { name: "personeria-juridica-liga.pdf" }, rut: { name: "rut-liga-patinaje.pdf" } },
        historial: [_preHist("2026-07-09", "Registro p\xFAblico recibido", "", "En revisi\xF3n", "Jorge Beltr\xE1n", "P\xDABLICO", ""), _preHist("2026-07-11", "Correcci\xF3n solicitada", "En revisi\xF3n", "En correcci\xF3n", "Alberto Herrera", "FEDERACION", "Documento de la entidad incompleto \u2014 falta reconocimiento deportivo vigente")]
      }),
      mk({
        id: "PRE-D5",
        tipo: "entidad",
        subtipo: "Federaci\xF3n",
        entTipo: "federacion",
        orgTipo: "federacion",
        parentId: "COC",
        nombre: "Federaci\xF3n Colombiana de Escalada",
        nit: "901720123-4",
        correo: "contacto@fedescalada.demo.co",
        telefono: "+57 601 555 5050",
        deporte: "Escalada",
        sector: "Ol\xEDmpico",
        depto: "Bogot\xE1 D.C.",
        ciudad: "Bogot\xE1",
        estado: "En revisi\xF3n",
        fecha: "2026-07-15",
        validacion: { mindeporte: "pendiente", comite: "pendiente" },
        repLegal: { nombre: "Paula Nieto", doc: "52110033", correo: "paula.nieto@correo.demo.co" },
        documentos: { personeria: { name: "personeria-juridica-fed.pdf" }, estatutos: { name: "estatutos-fed-escalada.pdf" }, reconocimiento: { name: "reconocimiento-deportivo-ivc.pdf" }, aval: { name: "aval-comite-olimpico.pdf" }, rut: { name: "rut-fed-escalada.pdf" } },
        historial: [_preHist("2026-07-15", "Registro p\xFAblico recibido", "", "En revisi\xF3n", "Paula Nieto", "P\xDABLICO", "")]
      })
    ];
    seeds.forEach((s) => list.push(s));
    writeStore("preinscritos", list);
  }
  var COMITES, FEDERACIONES_COC, FEDERACIONES_FICTICIAS, LIGAS, CLUBES, DEPORTISTAS, SEED_ORGANISMOS, SEED_DEPORTISTAS, STORE_PREFIX, SEED_FLAG, SEED_VERSION, ID_PREFIX, _todayISO, _preHist;
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
      ID_PREFIX = { comite: "COM", federacion: "FED", liga: "LIG", club: "CLU" };
      _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      _preHist = (fecha, accion, de, a, responsable, rol, motivo) => ({
        fecha,
        accion,
        de,
        a,
        responsable: responsable || "",
        rol: rol || "",
        motivo: motivo || "",
        notif: true
      });
    }
  });

  // shared/permissions.js
  function can(role3, accion, recurso) {
    const fila = PERMS[recurso];
    if (!fila) return false;
    const concedidas = fila[role3] || "";
    return concedidas.includes(accion);
  }
  function scopeFor(role3) {
    return role3 in SCOPE ? SCOPE[role3] : null;
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

  // shared/bandeja.js
  var bandeja_exports = {};
  function orgTipoDe(p) {
    if (!p || p.tipo === "personal" || p.tipo === "deportista") return "personal";
    return p.orgTipo || (p.entTipo === "federacion" ? "federacion" : p.entTipo === "liga" ? "liga" : "club");
  }
  function enScope(parentId) {
    if (scopeId === null) return true;
    if (!parentId) return false;
    return parentId === scopeId || subtreeOf(scopeId).some((o) => o.id === parentId);
  }
  function enScopeDe(anchorId, parentId) {
    if (!anchorId || !parentId) return false;
    return parentId === anchorId || subtreeOf(anchorId).some((o) => o.id === parentId);
  }
  function cubiertoPorRolAnclado(p) {
    const ot = orgTipoDe(p);
    if (ot === "liga") return enScopeDe(scopeFor("FEDERACION"), p.parentId);
    if (ot === "club") return enScopeDe(scopeFor("LIGA"), p.parentId);
    return true;
  }
  function validaPre(p) {
    const ot = orgTipoDe(p);
    if (ot === "personal") return roleCode === "MINDEPORTE";
    if (target && target.tipo === ot && enScope(p.parentId)) return true;
    if (roleCode === "MINDEPORTE") return ot === "federacion" || !cubiertoPorRolAnclado(p);
    return false;
  }
  function preinscritosDeRol() {
    return allPreinscritos().filter(validaPre);
  }
  function seedBandejaDemo() {
    if (getDemoMode() !== "demo") return;
    if (allOrganismos().some((o) => o.ficticioBandeja)) return;
    const base = { tipo: "federacion", sector: "Ol\xEDmpico", parentId: "COC", estado: "En revisi\xF3n", ficticioBandeja: true };
    addOrganismo({
      ...base,
      nombre: "Federaci\xF3n Colombiana de Triatl\xF3n",
      nit: "901620001-1",
      deporte: "Triatl\xF3n",
      validacion: { mindeporte: "pendiente", comite: "pendiente" },
      documentos: { reconocimiento: { name: "reconocimiento-deportivo-mindeporte.pdf" }, aval: { name: "aval-comite-olimpico.pdf" }, rut: { name: "rut-fedetriatlon.pdf" }, personeria: { name: "personeria-juridica.pdf" } },
      repLegal: { tipoDoc: "CC", numDoc: "79620001", nombre: "Andr\xE9s", apellido: "V\xE9lez Mora", correo: "presidencia@fedetriatlon.demo.co" },
      ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06" },
      contacto: { telefono: "6014801122", correo: "contacto@fedetriatlon.demo.co" }
    });
    addOrganismo({
      ...base,
      nombre: "Federaci\xF3n Colombiana de Surf",
      nit: "901620002-2",
      deporte: "Surf",
      validacion: { mindeporte: "aprobado", comite: "pendiente" },
      documentos: { reconocimiento: { name: "reconocimiento-deportivo-mindeporte.pdf" }, aval: { name: "aval-comite-olimpico.pdf" }, rut: { name: "rut-fedesurf.pdf" }, personeria: { name: "personeria-juridica.pdf" } },
      repLegal: { tipoDoc: "CC", numDoc: "79620002", nombre: "Laura", apellido: "Pe\xF1a Gil", correo: "presidencia@fedesurf.demo.co" },
      ubicacion: { depto: "Valle del Cauca", ciudad: "Buenaventura", zona: "Urbana", direccion: "Cra 2 # 1-40" },
      contacto: { telefono: "6022410033", correo: "contacto@fedesurf.demo.co" }
    });
  }
  function bandejaOrgs() {
    if (!target) return [];
    const sub = scopeId === null ? allOrganismos() : subtreeOf(scopeId);
    return sub.filter((o) => o.tipo === target.tipo);
  }
  function filtered(orgs) {
    let out = orgs.filter((o) => VISIBLES.includes(o.estado));
    if (estadoFiltro === "Accionables") out = out.filter((o) => o.estado === "En revisi\xF3n");
    else if (estadoFiltro !== "Todos") out = out.filter((o) => o.estado === estadoFiltro);
    if (sectorFiltro !== "Todos") out = out.filter((o) => (o.sector || "") === sectorFiltro);
    if (query) {
      const q = norm(query);
      out = out.filter((o) => norm(o.nombre).includes(q) || norm(o.nit).includes(q));
    }
    return out.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }
  function render() {
    if (roleCode === "CLUB") return renderAfiliaciones();
    if (tieneColaPublica && vista === "publico") return renderPreinscritos();
    if (!target) return renderNoBandeja();
    return renderOrgBandeja();
  }
  function vistaSwitch() {
    if (!tieneColaPublica) return "";
    const pend = preinscritosDeRol().filter((p) => p.estado === "En revisi\xF3n").length;
    return `<div class="bj-vista-wrap">
    <div class="naowee-segment" id="bjVista" data-segmented role="tablist" aria-label="Sub-vista de la bandeja">
      <span class="naowee-segment__pill naowee-segment__pill--no-anim" data-pill></span>
      <button type="button" class="naowee-segment__item ${vista === "federaciones" ? "naowee-segment__item--active" : ""}" data-vista="federaciones" data-idx="0" role="tab" aria-selected="${vista === "federaciones"}">${I.bldg}${esc(capFirst(target.plural))}</button>
      <button type="button" class="naowee-segment__item ${vista === "publico" ? "naowee-segment__item--active" : ""}" data-vista="publico" data-idx="1" role="tab" aria-selected="${vista === "publico"}">${I.inbox}Registro p\xFAblico${pend ? ` \xB7 ${pend}` : ""}</button>
    </div>
  </div>`;
  }
  function layoutPill() {
    const seg = document.getElementById("bjVista");
    if (!seg) return;
    const pill = seg.querySelector("[data-pill]");
    const active = seg.querySelector(".naowee-segment__item--active");
    if (!pill || !active) return;
    const put = (el) => {
      pill.style.transform = `translate3d(${el.offsetLeft}px,0,0)`;
      pill.style.width = el.offsetWidth + "px";
    };
    if (_segPrev !== null && _segPrev !== vista) {
      const prev = seg.querySelector(`[data-vista="${_segPrev}"]`) || active;
      pill.classList.add("naowee-segment__pill--no-anim");
      put(prev);
      void pill.offsetWidth;
      pill.classList.remove("naowee-segment__pill--no-anim");
      put(active);
    } else {
      pill.classList.add("naowee-segment__pill--no-anim");
      put(active);
      void pill.offsetWidth;
      pill.classList.remove("naowee-segment__pill--no-anim");
    }
    _segPrev = vista;
  }
  function renderOrgBandeja() {
    const all = bandejaOrgs();
    const allRows = filtered(all);
    const anchor = scopeId ? getOrganismo(scopeId) : null;
    const sectores = [...new Set(all.map((o) => o.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
    const totalPages = Math.max(1, Math.ceil(allRows.length / PAGE_SIZE));
    page = Math.min(Math.max(1, page), totalPages);
    const rows = allRows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    const FILTER_ICO = { "Accionables": I.bolt, "En revisi\xF3n": I.clock, "En correcci\xF3n": I.edit, "Rechazado": I.x, "Activo": I.check, "Todos": I.list };
    root.innerHTML = `
    ${vistaSwitch()}
    ${msg("informative", I.info, puedeAccionar ? `Bandeja de <strong>${target.plural}</strong> ${anchor ? `de <strong>${esc(anchor.nombre)}</strong>` : "del SND"}. Aprueba, rechaza o solicita correcci\xF3n (motivo obligatorio). ${target.tipo === "federacion" ? "La federaci\xF3n requiere <strong>doble validaci\xF3n</strong>: Ministerio + Comit\xE9." : ""}` : `Vista de <strong>oversight</strong> (solo lectura) de ${target.plural}.`)}

    <div class="naowee-card bj-panel">
      <div class="bj-panel__bar">
        <div class="naowee-searchbox bj-search">
          <div class="naowee-searchbox__input-wrap">
            <span class="naowee-searchbox__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input class="naowee-searchbox__input" id="bjSearch" placeholder="Buscar por nombre o NIT\u2026" value="${esc(query)}">
          </div>
        </div>
        ${sectores.length > 1 ? `<label class="bj-filter"><span class="bj-filter__lbl">Sector</span><select class="bj-filter__select" id="bjSector"><option value="Todos"${sectorFiltro === "Todos" ? " selected" : ""}>Todos los sectores</option>${sectores.map((s) => `<option value="${esc(s)}"${sectorFiltro === s ? " selected" : ""}>${esc(s)}</option>`).join("")}</select></label>` : ""}
      </div>
      <div class="naowee-tabs bj-tabs" id="bjFilters">
        ${["Accionables", "En revisi\xF3n", "En correcci\xF3n", "Rechazado", "Activo", "Todos"].map((f) => `<button type="button" class="naowee-tab ${estadoFiltro === f ? "naowee-tab--selected" : ""}" data-f="${f}">${FILTER_ICO[f] || ""}${f}</button>`).join("")}
      </div>
      ${rows.length ? `
        <div class="cg-table-wrap">
          <table class="cg-table bj-table">
            <thead><tr><th>${TIPO_SING[target.tipo]}</th><th>NIT</th><th>Estado</th>${target.tipo === "federacion" ? "<th>Validaci\xF3n</th>" : ""}<th></th></tr></thead>
            <tbody>
              ${rows.map((o) => `
                <tr>
                  <td data-label="${esc(TIPO_SING[target.tipo])}"><div class="bj-org"><span class="bj-org__emoji">${TIPO_EMOJI[o.tipo]}</span><div><div class="bj-org__name">${esc(o.nombre)}</div><div class="bj-org__sub">${esc(o.deporte && o.deporte !== "\u2014" ? o.deporte : TIPO_SING[o.tipo])}</div></div></div></td>
                  <td class="cg-table__nit" data-label="NIT">${esc(o.nit)}</td>
                  <td data-label="Estado">${badge(o.estado)}</td>
                  ${target.tipo === "federacion" ? `<td data-label="Validaci\xF3n">${valChips(o)}</td>` : ""}
                  <td class="bj-row-action" data-label=""><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-open="${esc(o.id)}">${puedeAccionar && o.estado === "En revisi\xF3n" ? "Revisar" : "Ver"}</button></td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>${totalPages > 1 ? `<div class="bj-panel__foot"><div class="naowee-pagination naowee-pagination--small" id="bjPager"><div class="naowee-pagination__pages"><span class="naowee-pagination__label">P\xE1gina</span><input class="naowee-pagination__input" id="bjPageInput" type="number" min="1" max="${totalPages}" value="${page}" aria-label="N\xFAmero de p\xE1gina"><span class="naowee-pagination__total">de <strong>${totalPages}</strong></span></div><div class="naowee-pagination__controls"><button type="button" class="naowee-pagination__btn" data-pg="prev"${page <= 1 ? " disabled" : ""} aria-label="P\xE1gina anterior">${I.chevL}</button><button type="button" class="naowee-pagination__btn" data-pg="next"${page >= totalPages ? " disabled" : ""} aria-label="P\xE1gina siguiente">${I.chevR}</button></div></div></div>` : ""}` : emptyState("Sin organismos", `No hay ${target.plural} ${estadoFiltro === "Accionables" ? "pendientes de tu revisi\xF3n" : "que coincidan con el filtro"} por ahora.`)}
    </div>`;
    wire();
  }
  function renderNoBandeja() {
    root.innerHTML = `<div class="naowee-card">${emptyState(
      "Sin bandeja",
      "Tu rol no gestiona aprobaciones de organismos."
    )}</div>`;
  }
  function solBadge(estado) {
    return `<span class="naowee-badge naowee-badge--${AFIL_SOL_VARIANT[estado] || "neutral"} naowee-badge--quiet naowee-badge--small">${esc(estado)}</span>`;
  }
  function renderAfiliaciones() {
    const club = scopeId ? getOrganismo(scopeId) : null;
    const rows = solicitudesDeClub(scopeId).map((s) => ({ ...s, dep: getDeportista(s.deportistaId) })).filter((r) => r.dep);
    let view = rows;
    if (afilFiltro !== "Todas") {
      const est = AFIL_ESTADO[afilFiltro];
      if (est) view = rows.filter((r) => r.estado === est);
    }
    if (query) {
      const q = norm(query);
      view = view.filter((r) => norm(r.dep.nombre).includes(q) || norm(r.dep.numDoc).includes(q) || norm(r.dep.deporte).includes(q));
    }
    view.sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    root.innerHTML = `
    ${msg("informative", I.info, puedeAfil ? `Solicitudes de afiliaci\xF3n a <strong>${esc(club ? club.nombre : "tu club")}</strong>. Al <strong>aprobar</strong>, el deportista queda vinculado y hereda autom\xE1ticamente tu liga y federaci\xF3n (ORG-05). El club es el \xFAnico aprobador.` : `Vista de <strong>oversight</strong> (solo lectura) de solicitudes de afiliaci\xF3n.`)}

    <div class="naowee-card bj-panel">
      <div class="bj-panel__bar">
        <div class="naowee-searchbox bj-search">
          <div class="naowee-searchbox__input-wrap">
            <span class="naowee-searchbox__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input class="naowee-searchbox__input" id="bjSearch" placeholder="Buscar por nombre, documento o deporte\u2026" value="${esc(query)}">
          </div>
        </div>
      </div>
      <div class="naowee-tabs bj-tabs" id="bjFilters">
        ${["Pendientes", "Aprobadas", "Rechazadas", "Todas"].map((f) => `<button type="button" class="naowee-tab ${afilFiltro === f ? "naowee-tab--selected" : ""}" data-af="${f}">${f}</button>`).join("")}
      </div>
      ${view.length ? `
        <div class="cg-table-wrap">
          <table class="cg-table bj-table">
            <thead><tr><th>Deportista</th><th>Deporte</th><th>Estado</th><th>Fecha</th><th></th></tr></thead>
            <tbody>
              ${view.map((r) => `
                <tr>
                  <td data-label="Deportista"><div class="bj-org"><span class="bj-org__emoji">\u{1F3C3}</span><div><div class="bj-org__name">${esc(r.dep.nombre)}</div><div class="bj-org__sub">${esc(r.dep.tipoDoc)} ${esc(r.dep.numDoc)}</div></div></div></td>
                  <td data-label="Deporte"><div class="bj-org__name" style="font-weight:500">${esc(r.dep.deporte)}</div><div class="bj-org__sub">${esc(r.dep.modalidad || "")}</div></td>
                  <td data-label="Estado"><div class="bj-sol-cell">${r.tipo === "retiro" ? '<span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Baja</span>' : '<span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">Afiliaci\xF3n</span>'}${solBadge(r.estado)}</div></td>
                  <td class="cg-table__nit" data-label="Fecha">${esc(r.fecha || "\u2014")}</td>
                  <td class="bj-row-action" data-label=""><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-openafil="${esc(r.id)}">${puedeAfil && r.estado === "Enviada" ? "Revisar" : "Ver"}</button></td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>` : emptyState("Sin solicitudes", afilFiltro === "Pendientes" ? "No hay solicitudes de afiliaci\xF3n pendientes de tu confirmaci\xF3n por ahora." : "No hay solicitudes que coincidan con el filtro.")}
    </div>`;
    wire();
  }
  function afilById(sid) {
    return solicitudesDeClub(scopeId).find((s) => s.id === sid) || null;
  }
  function openAfilDetail(sid) {
    var _a;
    const sol = afilById(sid);
    if (!sol) return;
    const dep = getDeportista(sol.deportistaId);
    if (!dep) return;
    const accionable = puedeAfil && sol.estado === "Enviada";
    const esRetiro = sol.tipo === "retiro";
    const clubNm = esc((getOrganismo(sol.clubId) || {}).nombre || "tu club");
    const tipoBadge = esRetiro ? '<span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Solicitud de baja</span>' : '<span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">Solicitud de afiliaci\xF3n</span>';
    const ov = openModal(`
    <div class="reg-modal bj-modal" role="dialog" aria-modal="true">
      <div class="reg-modal__head">
        <h3 class="reg-modal__title">\u{1F3C3} ${esc(dep.nombre)}</h3>
        <button type="button" class="reg-modal__close" id="afClose" aria-label="Cerrar">${I.x}</button>
      </div>
      <div class="reg-modal__body bj-detail">
        <div class="bj-detail__badges">${tipoBadge}${solBadge(sol.estado)}</div>
        <dl class="bj-kv">
          ${kv("Documento", `${dep.tipoDoc || ""} ${dep.numDoc || ""}`)}
          ${kv("Deporte", dep.deporte)}
          ${kv("Modalidad", dep.modalidad || "\u2014")}
          ${kv("Correo", dep.correo || "\u2014")}
          ${kv(esRetiro ? "Baja solicitada" : "Solicitud", sol.fecha || "\u2014")}
          ${(sol.estado === "Aprobada" || sol.estado === "Rechazada") && sol.responsable ? kv("Revisado por", `${esc(sol.responsable)}${sol.resueltaFecha ? " \xB7 " + esc(sol.resueltaFecha) : ""}`) : ""}
        </dl>
        ${sol.estado === "Rechazada" && sol.motivo ? msg("negative", I.alert, `<strong>Motivo del rechazo:</strong> ${esc(sol.motivo)}`) : ""}
        ${sol.estado === "Aprobada" ? msg("positive", I.check, esRetiro ? `La baja fue confirmada: el deportista qued\xF3 <strong>desvinculado</strong> del club.` : `El deportista qued\xF3 <strong>vinculado</strong> a tu club y hered\xF3 tu liga y federaci\xF3n.`) : ""}
        ${accionable ? `<p class="bj-detail__note">${esRetiro ? `Al confirmar la baja, <strong>${esc(dep.nombre)}</strong> dejar\xE1 de estar afiliado a <strong>${clubNm}</strong> y perder\xE1 la liga y la federaci\xF3n heredadas.` : `Al aprobar, <strong>${esc(dep.nombre)}</strong> quedar\xE1 vinculado a <strong>${clubNm}</strong> y heredar\xE1 autom\xE1ticamente la liga y la federaci\xF3n (ORG-05).`}</p>` : ""}
      </div>
      <div class="reg-modal__foot bj-actions">
        ${accionable ? `
          <div class="bj-actions__main">
            <button type="button" class="naowee-btn bj-btn-danger" id="afRej">Rechazar</button>
            <button type="button" class="naowee-btn bj-btn-success" id="afApr">${esRetiro ? "Confirmar retiro" : "Aprobar afiliaci\xF3n"}</button>
          </div>` : `<button type="button" class="naowee-btn naowee-btn--mute" id="afCancel">Cerrar</button>`}
      </div>
    </div>`);
    const close = () => closeModal(ov);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    ov.querySelector("#afClose").addEventListener("click", close);
    (_a = ov.querySelector("#afCancel")) == null ? void 0 : _a.addEventListener("click", close);
    if (accionable) {
      ov.querySelector("#afApr").addEventListener("click", () => {
        doApproveAfil(sid);
        close();
      });
      ov.querySelector("#afRej").addEventListener("click", () => openAfilMotivo(sid, ov));
    }
  }
  function doApproveAfil(sid) {
    const sol = afilById(sid);
    const dep = sol ? getDeportista(sol.deportistaId) : null;
    const esRetiro = sol && sol.tipo === "retiro";
    resolverAfiliacion(sid, "aprobada", { responsable: role.userName || roleCode });
    toast(esRetiro ? `Retiro confirmado${dep ? " \u2014 " + dep.nombre + " qued\xF3 desvinculado" : ""}` : `Afiliaci\xF3n aprobada${dep ? " \u2014 " + dep.nombre + " qued\xF3 vinculado" : ""}`, "success");
    render();
  }
  function openAfilMotivo(sid, detailOv) {
    closeModal(detailOv);
    const sol = afilById(sid);
    const dep = sol ? getDeportista(sol.deportistaId) : null;
    const esRetiro = sol && sol.tipo === "retiro";
    let selMotivo = "";
    const ov = openModal(`
    <div class="reg-modal bj-modal bj-modal--sm bj-modal--overflow" role="dialog" aria-modal="true">
      <div class="reg-modal__head"><h3 class="reg-modal__title">${esRetiro ? "Rechazar baja" : "Rechazar afiliaci\xF3n"} \xB7 ${esc(dep ? dep.nombre : "")}</h3><button type="button" class="reg-modal__close" id="amClose" aria-label="Cerrar">${I.x}</button></div>
      <div class="reg-modal__body">
        <div class="bj-field">
          <label class="bj-label">Motivo <span class="bj-req">*</span></label>
          <div class="naowee-dropdown" id="amDd">
            <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"><span class="naowee-dropdown__value is-placeholder">Selecciona un motivo\u2026</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
            <div class="naowee-dropdown__menu" role="listbox">${MOTIVOS_AFIL.map((m) => `<div class="naowee-dropdown__opt" role="option" data-value="${esc(m)}">${esc(m)}</div>`).join("")}</div>
          </div>
          <p class="bj-err" id="amErr" style="display:none">Selecciona un motivo para continuar.</p>
        </div>
        <div class="bj-field">
          <label class="bj-label">Comentario</label>
          <div class="naowee-textfield__input-wrap bj-ta-wrap"><textarea id="amTxt" rows="3" placeholder="Detalle para el deportista\u2026"></textarea></div>
        </div>
      </div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" id="amCancel">Cancelar</button><button type="button" class="naowee-btn bj-btn-danger" id="amOk">Confirmar rechazo</button></div>
    </div>`);
    mountDd(ov, (val) => {
      selMotivo = val;
      ov.querySelector("#amErr").style.display = "none";
    });
    const backToDetail = () => closeModal(ov, () => openAfilDetail(sid));
    ov.addEventListener("click", (e) => {
      if (e.target === ov) backToDetail();
    });
    ov.querySelector("#amClose").addEventListener("click", backToDetail);
    ov.querySelector("#amCancel").addEventListener("click", backToDetail);
    ov.querySelector("#amOk").addEventListener("click", () => {
      if (!selMotivo) {
        ov.querySelector("#amErr").style.display = "block";
        ov.querySelector("#amDd").classList.add("naowee-dropdown--error");
        return;
      }
      const txt = ov.querySelector("#amTxt").value.trim();
      resolverAfiliacion(sid, "rechazada", { motivo: txt ? `${selMotivo} \u2014 ${txt}` : selMotivo, responsable: role.userName || roleCode });
      toast(esRetiro ? "Baja rechazada \u2014 el deportista sigue afiliado" : "Afiliaci\xF3n rechazada", "success");
      closeModal(ov);
      render();
    });
  }
  function badge(estado) {
    return `<span class="naowee-badge naowee-badge--${estadoBadgeVariant(estado)} naowee-badge--quiet naowee-badge--small">${esc(estado)}</span>`;
  }
  function valChips(o) {
    const v = o.validacion || { mindeporte: "pendiente", comite: "pendiente" };
    const chip = (lbl, st) => `<span class="naowee-badge naowee-badge--${VAL_VARIANT[st] || "neutral"} naowee-badge--quiet naowee-badge--small bj-val">${lbl}: ${st}</span>`;
    return `<div class="bj-vals">${chip("Min", v.mindeporte)}${chip("Comit\xE9", v.comite)}</div>`;
  }
  function emptyState(title, desc) {
    return `<div class="naowee-empty-state"><span class="naowee-empty-state__icon">${I.inbox}</span><p class="naowee-empty-state__title">${esc(title)}</p><p class="naowee-empty-state__description">${esc(desc)}</p></div>`;
  }
  function msg(variant, icon, html) {
    return `<div class="naowee-message naowee-message--${variant}" style="margin-bottom:16px"><span class="naowee-message__icon">${icon}</span><div class="naowee-message__body"><p class="naowee-message__text">${html}</p></div></div>`;
  }
  function openModal(innerHtml) {
    const ov = document.createElement("div");
    ov.className = "reg-modal-overlay bj-modal-ov";
    ov.innerHTML = innerHtml;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("is-open"));
    return ov;
  }
  function closeModal(ov, after) {
    if (!ov || ov.__closing) return;
    ov.__closing = true;
    ov.classList.remove("is-open");
    setTimeout(() => {
      ov.remove();
      if (after) after();
    }, 340);
  }
  function mountDd(scope, onSelect) {
    const dd = scope.querySelector(".naowee-dropdown");
    if (!dd) return;
    const valueEl = dd.querySelector(".naowee-dropdown__value");
    dd.querySelector(".naowee-dropdown__trigger").addEventListener("click", (e) => {
      e.stopPropagation();
      dd.classList.toggle("naowee-dropdown--open");
    });
    dd.querySelectorAll(".naowee-dropdown__opt").forEach((opt) => opt.addEventListener("click", () => {
      valueEl.textContent = opt.dataset.value;
      valueEl.classList.remove("is-placeholder");
      dd.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.classList.remove("naowee-dropdown__opt--selected"));
      opt.classList.add("naowee-dropdown__opt--selected");
      dd.classList.remove("naowee-dropdown--open", "naowee-dropdown--error");
      onSelect(opt.dataset.value);
    }));
    scope.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) dd.classList.remove("naowee-dropdown--open");
    });
  }
  function openDetail(id) {
    var _a;
    const o = getOrganismo(id);
    if (!o) return;
    const superior = o.parentId ? getOrganismo(o.parentId) : null;
    const supActivo = !superior || superior.estado === "Activo";
    const esFed = o.tipo === "federacion";
    const half = halfOf[roleCode];
    const v = o.validacion || { mindeporte: "pendiente", comite: "pendiente" };
    const yaVote = esFed && half && v[half] !== "pendiente";
    const accionable = puedeAccionar && o.estado === "En revisi\xF3n" && puedeTransicionar(roleCode, o, "Activo", superior) && (!esFed || !yaVote);
    const audit = allAudit(id);
    const ov = openModal(`
    <div class="reg-modal bj-modal" role="dialog" aria-modal="true">
      <div class="reg-modal__head">
        <h3 class="reg-modal__title">${TIPO_EMOJI[o.tipo]} ${esc(o.nombre)}</h3>
        <button type="button" class="reg-modal__close" id="bjClose" aria-label="Cerrar">${I.x}</button>
      </div>
      <div class="reg-modal__body bj-detail">
        <div class="bj-detail__badges">${badge(o.estado)}${esFed ? valChips(o) : ""}</div>
        <dl class="bj-kv">
          ${kv("Tipo", TIPO_SING[o.tipo])}${kv("NIT / RUT", o.nit)}${o.deporte && o.deporte !== "\u2014" ? kv("Deporte", o.deporte) : ""}
          ${o.sector ? kv("Sector", o.sector) : ""}${superior ? kv("Superior", superior.nombre + " \xB7 " + superior.estado) : ""}
          ${o.repLegal ? kv("Rep. legal", `${o.repLegal.nombre || ""} ${o.repLegal.apellido || ""} \xB7 ${o.repLegal.tipoDoc || ""} ${o.repLegal.numDoc || ""}`) : ""}
          ${o.ubicacion ? kv("Sede", `${o.ubicacion.ciudad || ""}, ${o.ubicacion.depto || ""}`) : ""}
          ${o.contacto ? kv("Contacto", o.contacto.correo || "") : ""}
        </dl>
        ${docsBlock(o)}
        ${!supActivo ? msg("caution", I.info, `Su superior (${esc(superior.nombre)}) no est\xE1 <strong>Activo</strong>: no puede aprobarse hasta que se habilite (ORG-06).`) : ""}
        ${esFed && o.estado === "En revisi\xF3n" ? `<p class="bj-detail__note">Doble validaci\xF3n: t\xFA registras la mitad de <strong>${roleCode === "MINDEPORTE" ? "Ministerio" : "Comit\xE9"}</strong>. Ambas aprobadas \u2192 Activo.</p>` : ""}
        <div class="bj-timeline">
          <p class="bj-timeline__title">Trazabilidad</p>
          ${audit.length ? audit.map((a) => `
            <div class="bj-tl-row"><span class="bj-tl-dot"></span><div><div class="bj-tl-head"><strong>${esc(a.accion)}</strong> \xB7 ${esc(a.a)}</div><div class="bj-tl-sub">${esc(a.fecha)} \xB7 ${esc(a.responsable || a.rol || "\u2014")}${a.motivo ? " \xB7 " + esc(a.motivo) : ""}${a.notif ? " \xB7 \u{1F514} notificado por email/app" : ""}</div></div></div>`).join("") : '<p class="bj-tl-empty">Sin movimientos registrados.</p>'}
        </div>
      </div>
      <div class="reg-modal__foot bj-actions">
        ${accionable ? `
          <button type="button" class="naowee-btn naowee-btn--mute" id="bjCorr">Solicitar correcci\xF3n</button>
          <div class="bj-actions__main">
            <button type="button" class="naowee-btn bj-btn-danger" id="bjRej">Rechazar</button>
            <button type="button" class="naowee-btn bj-btn-success" id="bjApr">${esFed ? "Aprobar mi mitad" : "Aprobar"}</button>
          </div>` : `<button type="button" class="naowee-btn naowee-btn--mute" id="bjCancel">Cerrar</button>`}
      </div>
    </div>`);
    const close = () => closeModal(ov);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    ov.querySelector("#bjClose").addEventListener("click", close);
    (_a = ov.querySelector("#bjCancel")) == null ? void 0 : _a.addEventListener("click", close);
    ov.querySelectorAll("[data-doc-view]").forEach((b) => b.addEventListener("click", () => {
      const [label, file] = b.dataset.docView.split("||");
      closeModal(ov, () => openDocViewer(label, file, () => openDetail(id)));
    }));
    if (accionable) {
      ov.querySelector("#bjApr").addEventListener("click", () => {
        doApprove(id);
        close();
      });
      ov.querySelector("#bjRej").addEventListener("click", () => openMotivo(id, "Rechazado", ov));
      ov.querySelector("#bjCorr").addEventListener("click", () => openMotivo(id, "Correcci\xF3n solicitada", ov));
    }
  }
  function kv(k, val) {
    return `<div class="bj-kv__row"><dt>${esc(k)}</dt><dd>${esc(val)}</dd></div>`;
  }
  function openDocViewer(label, file, onBack) {
    const ov = openModal(`
    <div class="reg-modal bj-modal" role="dialog" aria-modal="true">
      <div class="reg-modal__head"><h3 class="reg-modal__title">${I.doc} ${esc(label)}</h3><button type="button" class="reg-modal__close" id="dvClose" aria-label="Cerrar">${I.x}</button></div>
      <div class="reg-modal__body">
        <div class="bj-docview">
          <div class="bj-docview__bar"><span class="bj-docview__file">${esc(file)}</span><span class="bj-docview__ro">${I.lock || ""} Vista previa \xB7 solo lectura</span></div>
          <div class="bj-docview__page">
            <span class="bj-docview__wm">${I.doc}</span>
            <p class="bj-docview__title">${esc(label)}</p>
            <span class="bj-docview__line"></span><span class="bj-docview__line"></span><span class="bj-docview__line" style="width:72%"></span>
            <span class="bj-docview__gap"></span>
            <span class="bj-docview__line"></span><span class="bj-docview__line" style="width:88%"></span><span class="bj-docview__line" style="width:60%"></span>
            <p class="bj-docview__note">Documento simulado para la demo \u2014 el visor real muestra el PDF/JPG/PNG cargado (${esc(file)}) sin permitir su descarga.</p>
          </div>
        </div>
      </div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" id="dvBack">Volver al organismo</button></div>
    </div>`);
    const back = () => closeModal(ov, () => typeof onBack === "function" ? onBack() : null);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) back();
    });
    ov.querySelector("#dvClose").addEventListener("click", back);
    ov.querySelector("#dvBack").addEventListener("click", back);
  }
  function docsBlock(o) {
    const docs = o.documentos || {};
    const items = Object.keys(DOC_LABELS).filter((k) => docs[k]).map((k) => ({ label: DOC_LABELS[k], file: docs[k] && docs[k].name || docs[k] }));
    return `<div class="bj-docs">
    <p class="bj-docs__title">Documentos de soporte</p>
    ${items.length ? items.map((d) => `<div class="bj-doc"><span class="bj-doc__ico">${I.doc}</span><div style="min-width:0"><div class="bj-doc__name">${esc(d.label)}</div><div class="bj-doc__file">${esc(d.file)}</div></div><button type="button" class="bj-doc__view" data-doc-view="${esc(d.label)}||${esc(d.file)}">Ver</button></div>`).join("") : `<div class="naowee-message naowee-message--caution"><span class="naowee-message__icon">${I.alert}</span><div class="naowee-message__body"><p class="naowee-message__text">El organismo a\xFAn no adjunt\xF3 el <strong>reconocimiento deportivo</strong> ni los soportes requeridos. El reconocimiento es un acto legal externo (IVC) \u2014 verif\xEDcalo antes de aprobar.</p></div></div>`}
  </div>`;
  }
  function doApprove(id) {
    const o = getOrganismo(id);
    const meta = { rol: roleCode, responsable: role.userName || roleCode, fecha: today() };
    if (o.tipo === "federacion") {
      const half = halfOf[roleCode];
      const v = { mindeporte: "pendiente", comite: "pendiente", ...o.validacion || {}, [half]: "aprobado" };
      const nuevo = resolverFederacion(v);
      const lbl = roleCode === "MINDEPORTE" ? "Ministerio aprob\xF3" : "Comit\xE9 aprob\xF3";
      if (nuevo !== o.estado) setEstado(id, nuevo, { ...meta, accion: lbl + (nuevo === "Activo" ? " \u2192 Activo" : ""), patch: { validacion: v } });
      else {
        updateOrganismo(id, { validacion: v });
        auditLog({ orgId: id, ...meta, accion: lbl, de: o.estado, a: o.estado, motivo: "" });
      }
    } else {
      setEstado(id, "Activo", { ...meta, accion: "Aprobado \u2192 Activo" });
    }
    toast(`Aprobaci\xF3n registrada \u2014 se notific\xF3 a ${o.nombre} por email y app`, "success");
    render();
  }
  function openMotivo(id, tipoAccion, detailOv) {
    closeModal(detailOv);
    const o = getOrganismo(id);
    let selMotivo = "";
    const ov = openModal(`
    <div class="reg-modal bj-modal bj-modal--sm bj-modal--overflow" role="dialog" aria-modal="true">
      <div class="reg-modal__head"><h3 class="reg-modal__title">${esc(tipoAccion)} \xB7 ${esc(o.nombre)}</h3><button type="button" class="reg-modal__close" id="mtClose" aria-label="Cerrar">${I.x}</button></div>
      <div class="reg-modal__body">
        <div class="bj-field">
          <label class="bj-label">Motivo <span class="bj-req">*</span></label>
          <div class="naowee-dropdown" id="mtDd">
            <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"><span class="naowee-dropdown__value is-placeholder">Selecciona un motivo\u2026</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
            <div class="naowee-dropdown__menu" role="listbox">${MOTIVOS.map((m) => `<div class="naowee-dropdown__opt" role="option" data-value="${esc(m)}">${esc(m)}</div>`).join("")}</div>
          </div>
          <p class="bj-err" id="mtErr" style="display:none">Selecciona un motivo para continuar.</p>
        </div>
        <div class="bj-field">
          <label class="bj-label">Comentario</label>
          <div class="naowee-textfield__input-wrap bj-ta-wrap"><textarea id="mtTxt" rows="3" placeholder="Detalle para el organismo\u2026"></textarea></div>
        </div>
      </div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" id="mtCancel">Cancelar</button><button type="button" class="naowee-btn bj-btn-danger" id="mtOk">Confirmar ${esc(tipoAccion.toLowerCase())}</button></div>
    </div>`);
    mountDd(ov, (val) => {
      selMotivo = val;
      ov.querySelector("#mtErr").style.display = "none";
    });
    const backToDetail = () => closeModal(ov, () => openDetail(id));
    ov.addEventListener("click", (e) => {
      if (e.target === ov) backToDetail();
    });
    ov.querySelector("#mtClose").addEventListener("click", backToDetail);
    ov.querySelector("#mtCancel").addEventListener("click", backToDetail);
    ov.querySelector("#mtOk").addEventListener("click", () => {
      if (!selMotivo) {
        ov.querySelector("#mtErr").style.display = "block";
        ov.querySelector("#mtDd").classList.add("naowee-dropdown--error");
        return;
      }
      const txt = ov.querySelector("#mtTxt").value.trim();
      doReject(id, tipoAccion, txt ? `${selMotivo} \u2014 ${txt}` : selMotivo);
      closeModal(ov);
      render();
    });
  }
  function doReject(id, tipoAccion, motivo) {
    const o = getOrganismo(id);
    const esCorreccion = tipoAccion === "Correcci\xF3n solicitada";
    const nuevoEstado = esCorreccion ? "En correcci\xF3n" : "Rechazado";
    const meta = { rol: roleCode, responsable: role.userName || roleCode, fecha: today(), accion: tipoAccion, motivo };
    const patch = o.tipo === "federacion" && !esCorreccion ? { validacion: { mindeporte: "pendiente", comite: "pendiente", ...o.validacion || {}, [halfOf[roleCode]]: "rechazado" } } : {};
    setEstado(id, nuevoEstado, { ...meta, patch });
    toast(`${tipoAccion} registrada \u2014 se notific\xF3 a ${o.nombre} por email y app`, "success");
  }
  function renderPreinscritos() {
    const all = preinscritosDeRol();
    let view = all;
    if (preFiltro === "Accionables") view = view.filter((p) => p.estado === "En revisi\xF3n");
    else if (preFiltro !== "Todos") view = view.filter((p) => p.estado === preFiltro);
    if (query) {
      const q = norm(query);
      view = view.filter((p) => norm(p.nombre).includes(q) || norm(p.numDoc || p.nit || "").includes(q) || norm(p.subtipo || "").includes(q));
    }
    view = view.slice().sort((a, b) => (b.fecha || "").localeCompare(a.fecha || ""));
    root.innerHTML = `
    ${vistaSwitch()}
    ${msg("informative", I.info, roleCode === "MINDEPORTE" ? `Validaci\xF3n del <strong>registro p\xFAblico</strong> del SUID: <strong>federaciones</strong> autoinscritas (doble validaci\xF3n Ministerio + Comit\xE9) y <strong>personal deportivo</strong> del Registro \xDAnico. Aprueba, rechaza o solicita correcci\xF3n (motivo obligatorio); al aprobar quedan <strong>Activos</strong> y se notifica.` : `Validaci\xF3n del <strong>registro p\xFAblico</strong> a tu cargo seg\xFAn la jerarqu\xEDa del SND: <strong>${esc(target.plural)}</strong> autoinscritas dentro de tu jurisdicci\xF3n. Aprueba, rechaza o solicita correcci\xF3n (motivo obligatorio); requiere que su superior est\xE9 <strong>Activo</strong> (ORG-06).`)}

    <div class="naowee-card bj-panel">
      <div class="bj-panel__bar">
        <div class="naowee-searchbox bj-search">
          <div class="naowee-searchbox__input-wrap">
            <span class="naowee-searchbox__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
            <input class="naowee-searchbox__input" id="bjSearch" placeholder="Buscar por nombre, documento o tipo\u2026" value="${esc(query)}">
          </div>
        </div>
      </div>
      <div class="naowee-tabs bj-tabs" id="bjFilters">
        ${["Accionables", "Activo", "En correcci\xF3n", "Rechazado", "Todos"].map((f) => `<button type="button" class="naowee-tab ${preFiltro === f ? "naowee-tab--selected" : ""}" data-pf="${f}">${f === "Activo" ? "Validados" : f}</button>`).join("")}
      </div>
      ${view.length ? `
        <div class="cg-table-wrap">
          <table class="cg-table bj-table">
            <thead><tr><th>Solicitante</th><th>Tipo</th><th>Estado</th><th>Fecha</th><th></th></tr></thead>
            <tbody>
              ${view.map((p) => `
                <tr>
                  <td data-label="Solicitante"><div class="bj-org"><span class="bj-org__emoji">${PRE_EMOJI[p.tipo] || "\u{1F4C4}"}</span><div><div class="bj-org__name">${esc(p.nombre)}</div><div class="bj-org__sub">${esc(p.numDoc ? `${p.tipoDoc || ""} ${p.numDoc}`.trim() : p.nit ? "NIT " + p.nit : "")}</div></div></div></td>
                  <td data-label="Tipo"><div class="bj-sol-cell"><span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">${esc(PRE_TIPO_SING[p.tipo] || "Registro")}</span><span class="bj-org__sub">${esc(p.subtipo || "")}</span></div></td>
                  <td data-label="Estado">${badge(p.estado)}</td>
                  <td class="cg-table__nit" data-label="Fecha">${esc(p.fecha || "\u2014")}</td>
                  <td class="bj-row-action" data-label=""><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" data-openpre="${esc(p.id)}">${p.estado === "En revisi\xF3n" ? "Revisar" : "Ver"}</button></td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>` : emptyState("Sin registros p\xFAblicos", preFiltro === "Accionables" ? "No hay registros p\xFAblicos pendientes de validaci\xF3n por ahora." : "No hay registros que coincidan con el filtro.")}
    </div>`;
    wire();
  }
  function preDocsBlock(p) {
    const docs = p.documentos || {};
    const items = Object.keys(docs).filter((k) => docs[k]).map((k) => ({ label: PRE_DOC_LABELS[k] || k, file: docs[k] && docs[k].name || docs[k] }));
    return `<div class="bj-docs">
    <p class="bj-docs__title">Documentos de soporte</p>
    ${items.length ? items.map((d) => `<div class="bj-doc"><span class="bj-doc__ico">${I.doc}</span><div style="min-width:0"><div class="bj-doc__name">${esc(d.label)}</div><div class="bj-doc__file">${esc(d.file)}</div></div><button type="button" class="bj-doc__view" data-doc-view="${esc(d.label)}||${esc(d.file)}">Ver</button></div>`).join("") : `<div class="naowee-message naowee-message--caution"><span class="naowee-message__icon">${I.alert}</span><div class="naowee-message__body"><p class="naowee-message__text">Este registro no adjunt\xF3 documentos de soporte.</p></div></div>`}
  </div>`;
  }
  function openPreDetail(id) {
    var _a;
    const p = getPreinscrito(id);
    if (!p) return;
    const esFed = orgTipoDe(p) === "federacion";
    const half = halfOf[roleCode];
    const v = p.validacion || { mindeporte: "pendiente", comite: "pendiente" };
    const yaVote = esFed && half && v[half] !== "pendiente";
    const superior = p.parentId ? getOrganismo(p.parentId) : null;
    const supActivo = !superior || superior.estado === "Activo";
    const accionable = validaPre(p) && p.estado === "En revisi\xF3n" && supActivo && !(esFed && yaVote);
    const tipoBadge = `<span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">${esc(PRE_TIPO_SING[p.tipo] || "Registro p\xFAblico")}</span>`;
    const hist = p.historial || [];
    const ov = openModal(`
    <div class="reg-modal bj-modal" role="dialog" aria-modal="true">
      <div class="reg-modal__head">
        <h3 class="reg-modal__title">${PRE_EMOJI[p.tipo] || "\u{1F4C4}"} ${esc(p.nombre)}</h3>
        <button type="button" class="reg-modal__close" id="prClose" aria-label="Cerrar">${I.x}</button>
      </div>
      <div class="reg-modal__body bj-detail">
        <div class="bj-detail__badges">${badge(p.estado)}${tipoBadge}${esFed ? valChips(p) : ""}</div>
        <dl class="bj-kv">
          ${kv("Tipo", PRE_TIPO_SING[p.tipo] || "\u2014")}
          ${p.subtipo ? kv(p.tipo === "entidad" ? "Tipo de entidad" : "Rol", p.subtipo) : ""}
          ${p.numDoc ? kv("Documento", `${p.tipoDoc || ""} ${p.numDoc}`) : ""}
          ${p.nit ? kv("NIT / RUT", p.nit) : ""}
          ${p.deporte ? kv("Deporte", p.deporte) : ""}
          ${p.sector ? kv("Sector", p.sector) : ""}
          ${superior ? kv("Superior", `${superior.nombre} \xB7 ${superior.estado}`) : ""}
          ${p.profesion ? kv("Profesi\xF3n", p.profesion) : ""}
          ${p.experiencia ? kv("Experiencia", p.experiencia + " a\xF1os") : ""}
          ${p.repLegal && p.repLegal.nombre ? kv("Rep. legal", `${p.repLegal.nombre}${p.repLegal.doc ? " \xB7 " + p.repLegal.doc : ""}`) : ""}
          ${p.ciudad || p.depto ? kv("Sede", `${p.ciudad || ""}${p.ciudad && p.depto ? ", " : ""}${p.depto || ""}`) : ""}
          ${p.correo ? kv("Correo", p.correo) : ""}
          ${p.telefono ? kv("Tel\xE9fono", p.telefono) : ""}
          ${kv("Registro", p.fecha || "\u2014")}
          ${p.estado !== "En revisi\xF3n" && p.responsable ? kv("Revisado por", `${esc(p.responsable)}${p.resueltaFecha ? " \xB7 " + esc(p.resueltaFecha) : ""}`) : ""}
        </dl>
        ${preDocsBlock(p)}
        ${msg("informative", I.info, `<strong>Integraci\xF3n externa (demo):</strong> el n\xFAmero de documento se valid\xF3 contra la Registradur\xEDa / entidades externas v\xEDa API al procesar el registro.`)}
        ${!supActivo ? msg("caution", I.info, `Su superior (<strong>${esc(superior.nombre)}</strong>) no est\xE1 <strong>Activo</strong>: no puede validarse hasta que se habilite (ORG-06).`) : ""}
        ${esFed && p.estado === "En revisi\xF3n" ? `<p class="bj-detail__note">Doble validaci\xF3n de federaci\xF3n: registras la mitad de <strong>${roleCode === "MINDEPORTE" ? "Ministerio" : "Comit\xE9"}</strong>. Ambas aprobadas \u2192 Activo.</p>` : ""}
        ${p.estado === "Rechazado" && p.motivo ? msg("negative", I.alert, `<strong>Motivo del rechazo:</strong> ${esc(p.motivo)}`) : ""}
        ${p.estado === "En correcci\xF3n" && p.motivo ? msg("caution", I.alert, `<strong>Correcci\xF3n solicitada:</strong> ${esc(p.motivo)}`) : ""}
        ${p.estado === "Activo" ? msg("positive", I.check, `Registro <strong>validado</strong>: qued\xF3 Activo en el Registro \xDAnico del SUID.`) : ""}
        ${accionable ? `<p class="bj-detail__note">Al <strong>aprobar</strong>, <strong>${esc(p.nombre)}</strong> quedar\xE1 Activo en el Registro \xDAnico y se notificar\xE1 por email/SMS. Tambi\xE9n puedes solicitar correcci\xF3n o rechazar con motivo.</p>` : ""}
        <div class="bj-timeline">
          <p class="bj-timeline__title">Trazabilidad</p>
          ${hist.length ? hist.slice().reverse().map((a) => `
            <div class="bj-tl-row"><span class="bj-tl-dot"></span><div><div class="bj-tl-head"><strong>${esc(a.accion)}</strong> \xB7 ${esc(a.a)}</div><div class="bj-tl-sub">${esc(a.fecha)} \xB7 ${esc(a.responsable || a.rol || "\u2014")}${a.motivo ? " \xB7 " + esc(a.motivo) : ""}${a.notif ? " \xB7 \u{1F514} notificado por email/app" : ""}</div></div></div>`).join("") : '<p class="bj-tl-empty">Sin movimientos registrados.</p>'}
        </div>
      </div>
      <div class="reg-modal__foot bj-actions">
        ${accionable ? `
          <button type="button" class="naowee-btn naowee-btn--mute" id="prCorr">Solicitar correcci\xF3n</button>
          <div class="bj-actions__main">
            <button type="button" class="naowee-btn bj-btn-danger" id="prRej">Rechazar</button>
            <button type="button" class="naowee-btn bj-btn-success" id="prApr">${esFed ? "Aprobar mi mitad" : "Validar y activar"}</button>
          </div>` : `<button type="button" class="naowee-btn naowee-btn--mute" id="prCancel">Cerrar</button>`}
      </div>
    </div>`);
    const close = () => closeModal(ov);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) close();
    });
    ov.querySelector("#prClose").addEventListener("click", close);
    (_a = ov.querySelector("#prCancel")) == null ? void 0 : _a.addEventListener("click", close);
    ov.querySelectorAll("[data-doc-view]").forEach((b) => b.addEventListener("click", () => {
      const [label, file] = b.dataset.docView.split("||");
      closeModal(ov, () => openDocViewer(label, file, () => openPreDetail(id)));
    }));
    if (accionable) {
      ov.querySelector("#prApr").addEventListener("click", () => {
        doApprovePre(id);
        close();
      });
      ov.querySelector("#prRej").addEventListener("click", () => openPreMotivo(id, "Rechazado", ov));
      ov.querySelector("#prCorr").addEventListener("click", () => openPreMotivo(id, "Correcci\xF3n solicitada", ov));
    }
  }
  function materializarEntidad(p) {
    if (orgTipoDe(p) === "personal") return;
    addOrganismo({
      tipo: orgTipoDe(p),
      nombre: p.nombre,
      nit: p.nit || "",
      deporte: p.deporte || "\u2014",
      sector: p.sector || "",
      parentId: p.parentId || null,
      estado: "Activo",
      origen: "registro-publico",
      repLegal: p.repLegal || {},
      documentos: p.documentos || {},
      contacto: { correo: p.correo || "", telefono: p.telefono || "" },
      ubicacion: { depto: p.depto || "", ciudad: p.ciudad || "" }
    });
  }
  function doApprovePre(id) {
    const p = getPreinscrito(id);
    if (!p) return;
    const resp = role.userName || roleCode;
    if (orgTipoDe(p) !== "personal" && p.parentId) {
      const sup = getOrganismo(p.parentId);
      if (sup && sup.estado !== "Activo") {
        toast(`No se puede activar: su superior (${sup.nombre}) no est\xE1 Activo`, "error");
        return;
      }
    }
    if (orgTipoDe(p) === "federacion") {
      const half = halfOf[roleCode];
      const nv = { mindeporte: "pendiente", comite: "pendiente", ...p.validacion || {}, [half]: "aprobado" };
      const lbl = roleCode === "MINDEPORTE" ? "Ministerio aprob\xF3" : "Comit\xE9 aprob\xF3";
      if (nv.mindeporte === "aprobado" && nv.comite === "aprobado") {
        resolverPreinscrito(id, "aprobado", { responsable: resp, rol: roleCode, patch: { validacion: nv } });
        materializarEntidad(p);
        toast(`Doble validaci\xF3n completa \u2014 ${p.nombre} qued\xF3 Activa en la jerarqu\xEDa; se notific\xF3`, "success");
      } else {
        updatePreinscrito(id, { validacion: nv }, { accion: lbl, responsable: resp, rol: roleCode });
        toast(`${lbl} su mitad \u2014 falta la otra validaci\xF3n`, "success");
      }
    } else {
      resolverPreinscrito(id, "aprobado", { responsable: resp, rol: roleCode });
      materializarEntidad(p);
      toast(`Registro validado \u2014 ${p.nombre} qued\xF3 Activo${orgTipoDe(p) !== "personal" ? " en la jerarqu\xEDa" : ""}; se notific\xF3 por email y app`, "success");
    }
    render();
  }
  function openPreMotivo(id, tipoAccion, detailOv) {
    closeModal(detailOv);
    const p = getPreinscrito(id);
    let selMotivo = "";
    const ov = openModal(`
    <div class="reg-modal bj-modal bj-modal--sm bj-modal--overflow" role="dialog" aria-modal="true">
      <div class="reg-modal__head"><h3 class="reg-modal__title">${esc(tipoAccion)} \xB7 ${esc(p ? p.nombre : "")}</h3><button type="button" class="reg-modal__close" id="pmClose" aria-label="Cerrar">${I.x}</button></div>
      <div class="reg-modal__body">
        <div class="bj-field">
          <label class="bj-label">Motivo <span class="bj-req">*</span></label>
          <div class="naowee-dropdown" id="pmDd">
            <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"><span class="naowee-dropdown__value is-placeholder">Selecciona un motivo\u2026</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button>
            <div class="naowee-dropdown__menu" role="listbox">${MOTIVOS_PRE.map((m) => `<div class="naowee-dropdown__opt" role="option" data-value="${esc(m)}">${esc(m)}</div>`).join("")}</div>
          </div>
          <p class="bj-err" id="pmErr" style="display:none">Selecciona un motivo para continuar.</p>
        </div>
        <div class="bj-field">
          <label class="bj-label">Comentario</label>
          <div class="naowee-textfield__input-wrap bj-ta-wrap"><textarea id="pmTxt" rows="3" placeholder="Detalle para el solicitante\u2026"></textarea></div>
        </div>
      </div>
      <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" id="pmCancel">Cancelar</button><button type="button" class="naowee-btn bj-btn-danger" id="pmOk">Confirmar ${esc(tipoAccion.toLowerCase())}</button></div>
    </div>`);
    mountDd(ov, (val) => {
      selMotivo = val;
      ov.querySelector("#pmErr").style.display = "none";
    });
    const backToDetail = () => closeModal(ov, () => openPreDetail(id));
    ov.addEventListener("click", (e) => {
      if (e.target === ov) backToDetail();
    });
    ov.querySelector("#pmClose").addEventListener("click", backToDetail);
    ov.querySelector("#pmCancel").addEventListener("click", backToDetail);
    ov.querySelector("#pmOk").addEventListener("click", () => {
      if (!selMotivo) {
        ov.querySelector("#pmErr").style.display = "block";
        ov.querySelector("#pmDd").classList.add("naowee-dropdown--error");
        return;
      }
      const txt = ov.querySelector("#pmTxt").value.trim();
      const motivo = txt ? `${selMotivo} \u2014 ${txt}` : selMotivo;
      const resultado = tipoAccion === "Correcci\xF3n solicitada" ? "correccion" : "rechazado";
      const pp = getPreinscrito(id);
      const patch = resultado === "rechazado" && orgTipoDe(pp) === "federacion" && halfOf[roleCode] ? { validacion: { mindeporte: "pendiente", comite: "pendiente", ...pp.validacion || {}, [halfOf[roleCode]]: "rechazado" } } : {};
      resolverPreinscrito(id, resultado, { motivo, responsable: role.userName || roleCode, rol: roleCode, patch });
      toast(`${tipoAccion} registrada${p ? " \u2014 se notific\xF3 a " + p.nombre + " por email y app" : ""}`, "success");
      closeModal(ov);
      render();
    });
  }
  function wire() {
    const s = document.getElementById("bjSearch");
    if (s) s.addEventListener("input", (e) => {
      query = e.target.value;
      page = 1;
      const p = s.selectionStart;
      render();
      const n = document.getElementById("bjSearch");
      if (n) {
        n.focus();
        try {
          n.setSelectionRange(p, p);
        } catch (_) {
        }
      }
    });
    const f = document.getElementById("bjFilters");
    if (f) {
      f.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => {
        estadoFiltro = b.dataset.f;
        page = 1;
        render();
      }));
      f.querySelectorAll("[data-af]").forEach((b) => b.addEventListener("click", () => {
        afilFiltro = b.dataset.af;
        render();
      }));
      f.querySelectorAll("[data-pf]").forEach((b) => b.addEventListener("click", () => {
        preFiltro = b.dataset.pf;
        render();
      }));
    }
    const sec = document.getElementById("bjSector");
    if (sec) sec.addEventListener("change", (e) => {
      sectorFiltro = e.target.value;
      page = 1;
      render();
    });
    root.querySelectorAll("[data-pg]").forEach((b) => b.addEventListener("click", () => {
      page = b.dataset.pg === "prev" ? page - 1 : page + 1;
      render();
    }));
    const pi = document.getElementById("bjPageInput");
    if (pi) pi.addEventListener("change", (e) => {
      const v = parseInt(e.target.value, 10);
      if (!isNaN(v)) {
        page = v;
        render();
      }
    });
    root.querySelectorAll("[data-vista]").forEach((b) => b.addEventListener("click", () => {
      vista = b.dataset.vista;
      page = 1;
      render();
    }));
    root.querySelectorAll("[data-open]").forEach((b) => b.addEventListener("click", () => openDetail(b.dataset.open)));
    root.querySelectorAll("[data-openafil]").forEach((b) => b.addEventListener("click", () => openAfilDetail(b.dataset.openafil)));
    root.querySelectorAll("[data-openpre]").forEach((b) => b.addEventListener("click", () => openPreDetail(b.dataset.openpre)));
    layoutPill();
  }
  function toast(text, variant) {
    window.naoweeToast && window.naoweeToast(text, variant === "negative" ? "error" : "success");
  }
  var roleCode, role, TARGET, target, scopeId, halfOf, TIPO_EMOJI, TIPO_SING, MOTIVOS, VISIBLES, PRE_EMOJI, PRE_TIPO_SING, PRE_DOC_LABELS, MOTIVOS_PRE, tieneColaPublica, capFirst, root, esc, norm, today, I, query, estadoFiltro, vista, preFiltro, sectorFiltro, page, PAGE_SIZE, _segPrev, puedeAccionar, afilFiltro, AFIL_ESTADO, AFIL_SOL_VARIANT, MOTIVOS_AFIL, puedeAfil, VAL_VARIANT, DOC_LABELS, _segResizeWired;
  var init_bandeja = __esm({
    "shared/bandeja.js"() {
      init_sidebar();
      init_organismos_data();
      init_permissions();
      init_estados();
      roleCode = getRoleFromQuery();
      role = ROLES[roleCode] || {};
      TARGET = {
        MINDEPORTE: { tipo: "federacion", recurso: "federaciones", plural: "federaciones" },
        COMITE: { tipo: "federacion", recurso: "federaciones", plural: "federaciones" },
        FEDERACION: { tipo: "liga", recurso: "ligas", plural: "ligas" },
        LIGA: { tipo: "club", recurso: "clubes", plural: "clubes" }
      };
      target = TARGET[roleCode] || null;
      scopeId = scopeFor(roleCode);
      halfOf = { MINDEPORTE: "mindeporte", COMITE: "comite" };
      TIPO_EMOJI = { federacion: "\u{1F3C5}", liga: "\u{1F6A9}", club: "\u{1F6E1}\uFE0F" };
      TIPO_SING = { federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
      MOTIVOS = [
        "Documentaci\xF3n incompleta",
        "Reconocimiento deportivo no v\xE1lido o vencido",
        "Datos del representante legal incorrectos",
        "NIT / RUT inconsistente",
        "Fuera de jurisdicci\xF3n / sector",
        "Otro (ver comentario)"
      ];
      VISIBLES = ["En revisi\xF3n", "En correcci\xF3n", "Preinscrito", "Rechazado", "Activo"];
      PRE_EMOJI = { deportista: "\u{1F3C3}", personal: "\u{1F9D1}\u200D\u{1F3EB}", entidad: "\u{1F3DB}\uFE0F" };
      PRE_TIPO_SING = { deportista: "Deportista", personal: "Personal deportivo", entidad: "Entidad deportiva" };
      PRE_DOC_LABELS = {
        parentesco: "Documento de parentesco (registro civil / custodia)",
        cert: "Certificaciones profesionales",
        tarjeta: "Tarjeta profesional vigente",
        existencia: "Certificado de existencia y representaci\xF3n legal",
        representacion: "Documento de representaci\xF3n legal",
        personeria: "Certificado de personer\xEDa jur\xEDdica",
        estatutos: "Estatutos vigentes",
        reconocimiento: "Reconocimiento deportivo (tr\xE1mite IVC)",
        reconocimientoMunicipal: "Reconocimiento del ente municipal",
        aval: "Aval del Comit\xE9",
        rut: "RUT"
      };
      MOTIVOS_PRE = [
        "Documento de identidad no v\xE1lido o ilegible",
        "Certificaci\xF3n / soporte incompleto o vencido",
        "Datos personales inconsistentes",
        "Documento de la entidad incompleto",
        "Registro duplicado",
        "Otro (ver comentario)"
      ];
      tieneColaPublica = !!target;
      capFirst = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
      root = document.getElementById("bandejaRoot");
      esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      I = {
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>',
        inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        bldg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 13.5h.01M15 13.5h.01"/></svg>',
        bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>',
        list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
        chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
        chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
      };
      query = "";
      estadoFiltro = "Accionables";
      vista = "federaciones";
      preFiltro = "Accionables";
      sectorFiltro = "Todos";
      page = 1;
      PAGE_SIZE = 10;
      _segPrev = null;
      puedeAccionar = target && can(roleCode, "A", target.recurso);
      afilFiltro = "Pendientes";
      AFIL_ESTADO = { Pendientes: "Enviada", Aprobadas: "Aprobada", Rechazadas: "Rechazada" };
      AFIL_SOL_VARIANT = { Enviada: "caution", Aprobada: "positive", Rechazada: "negative", Retirada: "neutral" };
      MOTIVOS_AFIL = [
        "El deportista no corresponde a la oferta deportiva del club",
        "Datos del deportista inconsistentes",
        "Sin cupo disponible por el momento",
        "Documentaci\xF3n del deportista pendiente",
        "Otro (ver comentario)"
      ];
      puedeAfil = can(roleCode, "A", "solicitudes");
      VAL_VARIANT = { aprobado: "positive", rechazado: "negative", pendiente: "neutral" };
      DOC_LABELS = {
        reconocimiento: "Reconocimiento deportivo (tr\xE1mite IVC)",
        reconocimientoMunicipal: "Reconocimiento del ente municipal",
        aval: "Aval del Comit\xE9",
        rut: "RUT",
        personeria: "Certificado de personer\xEDa jur\xEDdica"
      };
      _segResizeWired = false;
      if (!_segResizeWired) {
        _segResizeWired = true;
        window.addEventListener("resize", () => layoutPill());
      }
      seedBandejaDemo();
      seedAfiliacionesDemo(getDemoMode());
      seedPreinscritosDemo(getDemoMode());
      render();
    }
  });

  // shared/entries/bandeja.js
  init_sidebar();
  init_organismos_data();
  seedDemoData();
  var roleCode2 = getRoleFromQuery();
  var role2 = ROLES[roleCode2];
  getMenuForRole(roleCode2).forEach((s) => s.items.forEach((it) => {
    if (it.id === "bandeja") document.getElementById("pageTitle").textContent = it.label;
  }));
  if (roleCode2 === "CLUB") {
    document.getElementById("pageSub").textContent = "Solicitudes de afiliaci\xF3n de deportistas a tu club: aprobar o rechazar (motivo obligatorio). Al aprobar, el deportista hereda tu liga y federaci\xF3n.";
  }
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode: roleCode2, activeId: "bandeja" });
  mountHeader({ headerEl: document.getElementById("topHeader"), role: role2 });
  mountBackdrop();
  mountDemoSwitcher({ roleCode: roleCode2 });
  Promise.resolve().then(() => init_bandeja());
})();
