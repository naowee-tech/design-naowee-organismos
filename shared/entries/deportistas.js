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
    mountDevnotes({ clubTitulo: { title: 'Plantel del club', items: [
      'El rol CLUB ve el nombre de su club como título; roles superiores conservan la etiqueta del menú.',
      'Con multi-afiliación, el plantel son los deportistas con afiliación Vinculada a este club. Si también están en otro club se indica en la fila.',
      '<strong>Desvincular</strong> termina solo la afiliación a este club (P-04, decisión de Producto pendiente de ratificar). Si el deportista no tiene otro club, vuelve a autodeclarado.',
      '<strong>Asociar autodeclarado</strong> (Fase 2): busca por nombre o documento a quien ya está en el SUID sin club, solo de los deportes del club y sin menores (a esos los afilia su tutor). Queda Vinculado de inmediato y hereda la cadena del club.'
    ] } });
  }
  if (roleCode !== 'CLUB') {
    document.getElementById('pageSub').textContent =
      'Deportistas vinculados a clubes de tu jurisdicción y los autodeclarados que registraste.';
    document.querySelector('[data-devnote="clubTitulo"]').style.display = '';
    mountDevnotes({ clubTitulo: { title: 'Deportistas de tu jurisdicción', items: [
      'Lista los deportistas Vinculados a cualquier club de tu subárbol (por cualquiera de sus afiliaciones) y los autodeclarados que registraste. Un deportista en dos clubes de tu jurisdicción aparece una vez.',
      '<strong>Registrar</strong> deja al deportista autodeclarado. Si sabes su club, lo <strong>propones</strong>: se abre una afiliación Solicitada que el club confirma en su bandeja; la confirmación siempre es del club.',
      'Quién puede cargar deportistas por encima del club sigue abierto (P-07). Ya no existe el estado «Sin asociar» ni la asociación parcial por niveles.'
    ] } });
  }
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'deportistas' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por jurisdicción). */
  import('../deportistas.js');
