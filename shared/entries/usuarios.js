  import { getRoleFromQuery, ROLES, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher } from '../sidebar.js';
  import { seedDemoData } from '../organismos-data.js';
  seedDemoData();
  const roleCode = getRoleFromQuery();
  const role = ROLES[roleCode];
  mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'usuarios' });
  mountHeader({ headerEl: document.getElementById('topHeader'), role });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  /* El módulo se auto-arranca al importar (render por rol). */
  import('../usuarios.js');
  import('../devnotes.js').then(({ mountDevnotes }) => mountDevnotes({ usuarios: { title: 'Usuarios · cómo funciona por dentro', sections: [
    { title: 'Modelo', items: [
      'Cada organismo tiene <strong>una sola cuenta principal</strong> (Administrador del organismo, A-9). La habilita el nivel superior al activar el organismo y no se crea desde esta pantalla.',
      'La cuenta principal crea a los <strong>usuarios internos</strong> según el catálogo: roles <strong>transversales</strong> (sirven para cualquier organismo) y roles <strong>por marca</strong> (hoy solo el COC, con funcionalidades olímpicas: Gestor de comité olímpico y Metodólogo). Datos en <code>CATALOGO_ROLES</code> y <code>MARCAS</code> de shared/organismos-data.js.',
      'Cada rol declara quién lo crea (<code>creaRol</code>): eso arma el árbol de creación. Administrador → Gestor → Metodólogo. El diálogo de invitar solo ofrece los roles que puede crear quien mira.',
      'Un usuario interno nunca ve más que el administrador que lo creó. La cuenta principal puede desactivar a cualquier usuario interno, también a los que invitó otro.',
      'No hay borrado: Invitado → Activo → Desactivado, y se puede reactivar. Cada cambio queda en la auditoría del organismo.'
    ] },
    { title: 'Ministerio', items: [
      'El Ministerio tiene <strong>varios administradores</strong> (A-7). Los crea Naowee: en la pantalla salen en solo lectura.',
      'Reunión con Producto del 2026-10-09: en la Suite los administradores del Ministerio son <strong>por módulo</strong> (por ejemplo, Dirección de Fomento → Eventos; Infraestructura → Escenarios), bajo un administrador general de la Suite que ve todo. Los de esta pantalla son los del módulo de Organismos. La matriz de roles del Ministerio por módulo está pendiente de levantar con Producto.',
      'El Ministerio crea a los <strong>usuarios territoriales</strong> (A-2), anclados a un departamento o a un municipio (<code>ancla: { depto }</code> o <code>{ depto, municipio }</code>). Consultan su territorio y registran deportistas autodeclarados; no aprueban.',
      'Si el territorio ya tiene un encargado activo, el diálogo lo avisa pero no bloquea.'
    ] },
    { title: 'Pendientes', items: [
      'P-16: roles internos por federación o comité (qué roles más necesita cada organismo).',
      'El <strong>Revisor de registros</strong> es un rol transversal propuesto, pendiente de ratificar en P-16. Es quien decide cuando el administrador también administra el organismo en revisión (P-24, opción b, decidida). En la demo ya se puede invitar, marcado como propuesto.',
      'Qué pasa con los usuarios que invitó alguien que luego se desactiva: hoy siguen activos y los gestiona la cuenta principal. Falta confirmarlo con Negocio.'
    ] }
  ] } }));
