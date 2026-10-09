  import { getRoleFromQuery, ROLES, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData } from '../organismos-data.js';
  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  /* El perfil se llega desde la jerarquía o la bandeja; no es un ítem del menú.
     El activo del sidebar queda en Jerarquía SND (contexto de navegación). */
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'jerarquia' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo del perfil se auto-arranca al importar (lee ?id y ?role). */
  import('../detalle.js');
