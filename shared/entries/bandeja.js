  import { getRoleFromQuery, ROLES, getMenuForRole, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData } from '../organismos-data.js';
  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  /* H1 según la etiqueta del ítem de bandeja para ese rol. */
  getMenuForRole(roleCode).forEach((s) => s.items.forEach((it) => {
    if (it.id === 'bandeja') document.getElementById('pageTitle').textContent = it.label;
  }));
  /* Subtítulo por rol: el CLUB gestiona afiliaciones de deportistas (no organismos). */
  if (roleCode === 'CLUB') {
    document.getElementById('pageSub').textContent =
      'Solicitudes de afiliación de deportistas a tu club: aprobar o rechazar (motivo obligatorio). Al aprobar, el deportista hereda tu liga y federación.';
  }
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'bandeja' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por rol). */
  import('../bandeja.js');
