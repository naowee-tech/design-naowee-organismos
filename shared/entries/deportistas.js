  import { getRoleFromQuery, ROLES, getMenuForRole, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData, getOrganismo } from '../organismos-data.js';
  import { scopeFor } from '../permissions.js';
  import { mountDevnotes } from '../devnotes.js';
  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  /* H1 según la etiqueta del ítem para ese rol (el club lo ve como
     «Mis deportistas»; un rol superior, como su plantel jurisdiccional). */
  getMenuForRole(roleCode).forEach((s) => s.items.forEach((it) => {
    if (it.id === 'deportistas') document.getElementById('pageTitle').textContent = it.label;
  }));
  if (roleCode === 'CLUB') {
    const club = getOrganismo(scopeFor(roleCode));
    if (club) document.getElementById('pageTitle').textContent = club.nombre;
    document.querySelector('[data-devnote="clubTitulo"]').style.display = '';
    mountDevnotes({ clubTitulo: { title: 'Título con el nombre del club', items: [
      'El rol CLUB ve el nombre de su club como título (antes «Mis deportistas»); roles superiores conservan la etiqueta del menú.',
      'Dato: <code>organismo.nombre</code> del organismo en el alcance del rol (<code>scopeFor</code>).'
    ] } });
  }
  if (roleCode !== 'CLUB') {
    document.getElementById('pageSub').textContent =
      'Deportistas vinculados a clubes de tu jurisdicción, heredados de la jerarquía. Vista de consulta.';
  }
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'deportistas' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por jurisdicción). */
  import('../deportistas.js');
