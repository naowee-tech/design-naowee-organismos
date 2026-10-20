  import { getRoleFromQuery, ROLES, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData } from '../organismos-data.js';
  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'cargue' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por rol). */
  import('../cargue.js');
