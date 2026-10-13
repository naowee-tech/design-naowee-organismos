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
  import('../devnotes.js').then(({ mountDevnotes }) => mountDevnotes({ bandeja: { title: 'Bandeja · cómo funciona por dentro', sections: [
    { title: 'Quién ve qué', items: [
      'Cada organismo Activo ve lo que cuelga directamente de él y está <strong>En revisión</strong>: lo que cargó y lo que se autorregistró eligiéndolo como superior. Aprobar, devolver a corrección y rechazar; devolver y rechazar exigen motivo y todo queda en la trazabilidad.',
      'Nadie decide si su propio organismo no está Activo. Federaciones: doble validación Comité + Ministerio, sin orden (pendiente de confirmar, P-19).',
      'El club ve aquí sus solicitudes de afiliación. Las marcadas <strong>Propuesta</strong> no las pidió el deportista: las abrió otro nivel que lo registró, uno a uno o por carga masiva (P-07 respondida: todos los organismos), y siempre las confirma el club. Aprobar suma un club al deportista sin quitarle los que ya tiene.'
    ] },
    { title: 'Una persona, varios organismos (P-15)', items: [
      'Los contextos son de la <strong>persona</strong>, no del rol: cada uno es un par rol ↔ organismo. En la demo, Sandra Mejía administra la Liga de Patinaje del Valle, la Liga de Natación del Valle y la Federación Colombiana de Patinaje (<code>PERSONAS</code> en shared/sidebar.js).',
      'Con dos o más contextos aparece la franja <strong>«Trabajas en»</strong> encima del título; con uno solo no aparece nada. Cambiar de organismo cambia rol, menú y jurisdicción, y deja a la persona en la misma página si el otro rol la tiene.',
      'La franja avisa los pendientes de los otros organismos (en esta bandeja, lo En revisión directo; en el club, las solicitudes Enviadas) para que se note que hay trabajo en otro lado.',
      'En cada decisión, el diálogo dice <strong>«Vas a decidir en nombre de …»</strong> para que no se apruebe desde el organismo equivocado.',
      'Ganó la variante C de la ronda de diseño (2026-10-13), sin la pantalla de elección al entrar: un clic de más en cada inicio de sesión. La identidad debe llevar los pares rol ↔ organismo; cómo viajan en el token es un pendiente técnico de Arquitectura.'
    ] },
    { title: 'Organismo y superior a la vez (P-24)', items: [
      'Si la persona también administra el organismo que está revisando (Sandra, desde la federación, ve su propia Liga de Patinaje), la fila dice <strong>«También la administras»</strong> y el diálogo no muestra Aprobar, Rechazar ni Corrección: decide otra persona del organismo superior.',
      'Es la opción (b) de P-24, propuesta de Arquitectura pendiente con Negocio. Las otras: (a) permitirlo con trazabilidad, (c) prohibir administrar un organismo y su superior a la vez.',
      'Con (b), cada organismo necesita al menos otra persona que pueda decidir: un rol interno con esa facultad o el administrador principal.'
    ] }
  ] } }));
