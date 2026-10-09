  import { getRoleFromQuery, ROLES, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'registro' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El wizard se auto-arranca al importar el módulo (seedDemoData + offerDraft). */
  import('../registro.js');
