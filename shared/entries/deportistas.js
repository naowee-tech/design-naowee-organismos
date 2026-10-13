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
      '<strong>Desvincular</strong> termina solo la afiliación a este club (P-04, cerrada: sin apelación; le avisa al deportista y a la liga). Si el deportista no tiene otro club, vuelve a autodeclarado.',
      '<strong>Asociar autodeclarado</strong> (Fase 2): busca por nombre o documento a quien ya está en el SUID sin club, solo de los deportes del club y sin menores (a esos los afilia su tutor). Queda Vinculado de inmediato y hereda la cadena del club.',
      '<strong>Registrar deportista</strong> desde el club: si el documento ya está en el SUID no se crea otra persona; se asocia al club y conserva su correo. Al nuevo le llega un correo para completar su perfil.',
      '<strong>Cargue masivo de deportistas</strong> (DEP-609): el club carga los suyos con plantilla y quedan vinculados a él.'
    ] } });
  }
  if (roleCode !== 'CLUB') {
    document.getElementById('pageSub').textContent =
      'Deportistas vinculados a clubes de tu jurisdicción y los autodeclarados que registraste.';
    document.querySelector('[data-devnote="clubTitulo"]').style.display = '';
    mountDevnotes({ clubTitulo: { title: 'Deportistas de tu jurisdicción', items: [
      'Lista los deportistas Vinculados a cualquier club de tu subárbol (por cualquiera de sus afiliaciones) y los autodeclarados que registraste. Un deportista en dos clubes de tu jurisdicción aparece una vez.',
      'Todos los organismos registran deportistas (P-07 respondida en la reunión con Producto del 2026-10-09).',
      '<strong>Registrar deportista</strong> en dos pasos (Datos → Club). El club es obligatorio: la liga indica el club; la federación, la liga y el club; el comité, la federación, la liga y el club. Queda como <strong>propuesta</strong> que el club confirma en su bandeja (decisión 2026-10-13); mientras tanto sigue autodeclarado.',
      'Si el club aún no está en el SUID, se marca «sin club por ahora»: queda autodeclarado y se le propone el club cuando se cree (dos pasos).',
      'Si el documento ya existe en el SUID no se crea otra persona: manda el primer registro, conserva su correo y solo se le propone el club.',
      'Al deportista nuevo le llega un correo para completar su perfil (decisión 2026-10-13). El organismo solo edita sus datos básicos (dirección, teléfono, correo); el resto lo maneja el deportista.',
      '<strong>Cargue masivo de deportistas</strong> (DEP-609) con las mismas reglas, en <code>?vista=cargue</code>. El territorial registra uno a uno, sin carga masiva.'
    ] } });
  }
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'deportistas' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por jurisdicción). */
  import('../deportistas.js');
