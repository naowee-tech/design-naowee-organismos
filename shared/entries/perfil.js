  import { ROLES, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData } from '../organismos-data.js';
import { resolveViewer, mountPerfil } from '../perfil.js';
  seedDemoData();
  /* El shell muestra a QUIEN MIRA (visor), no a la persona del perfil. */
  const viewer = resolveViewer();
  const roleCode = viewer.shellRole;
  const activeId = roleCode === 'PERSONA' ? 'perfil' : roleCode === 'CLUB' ? 'deportistas' : null;
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId });
  /* En escritorio el sidebar del shell arranca en riel de íconos: así la
     navegación agrupada del perfil es la única vertical expandida. No se
     escribe la preferencia guardada; si la persona lo expande, sí queda. */
  if (window.matchMedia('(min-width: 1024px)').matches) document.getElementById('naoweeSidebar')?.classList.add('collapsed');
  mountHeader({ headerEl: document.getElementById('topHeader'), role: ROLES[roleCode] });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  mountPerfil(document.getElementById('perfilRoot'));
