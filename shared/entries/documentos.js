import { getRoleFromQuery, ROLES, getMenuForRole, mountSidebar, mountHeader, mountBackdrop, mountDemoSwitcher, getDemoMode } from '../sidebar.js';
import { seedDemoData, seedAfiliacionesDemo } from '../organismos-data.js';
seedDemoData();
seedAfiliacionesDemo(getDemoMode());
const roleCode = getRoleFromQuery();
const role = ROLES[roleCode];
mountSidebar({ rootEl: document.getElementById('sidebarRoot'), roleCode, activeId: 'documentos' });
mountHeader({ headerEl: document.getElementById('topHeader'), role });
mountBackdrop();
mountDemoSwitcher({ roleCode });
import('../documentos.js');

/* Notas para devs: lo que cambia según el rol con el que se mira la pantalla. */
import('../devnotes.js').then(({ mountDevnotes }) => {
  const revisor = roleCode === 'REVISOR_DOC';
  mountDevnotes({ documentos: { title: revisor ? 'Revisión documental · vista del revisor de documentos' : 'Revisión documental · vista del administrador del club', sections: [
    { title: 'Qué resuelve', items: [
      'Hallazgo de QA sobre DEP-1029 y DEP-1030: el tutor veía «El Ministerio valida sus documentos», pero esa aprobación solo existía en SPORT (<code>Documentación → Aprobación</code>), sin ruta desde el SUID. PROD-96 la mueve al club, dentro del SUID.',
      'El tutor elige el club al registrar al menor; el documento de parentesco llega a la <b>Revisión documental</b> de ese club. No pasa por «Solicitudes de deportistas».',
      'Tres estados: <b>Pendiente</b>, <b>Aprobado</b> y <b>Rechazado</b>. Abrir un documento no cambia su estado: si nadie decide, sigue pendiente y cuenta en el contador del menú.'
    ] },
    { title: revisor ? 'Qué puede hacer el revisor' : 'Qué puede hacer el administrador del club', items: revisor ? [
      'Ve solo lo que tiene <b>pendiente</b> y los documentos que <b>él mismo decidió</b>; el administrador ve todos los del club. Su menú es <b>Revisión documental</b> y <b>Mi perfil</b>, nada más.',
      'Puede aprobar y rechazar, igual que el administrador. Rechazar exige una <b>nota</b>. Su decisión queda en el historial con la etiqueta <b>Revisor</b>.',
      'No ve deportistas, solicitudes, usuarios ni los datos del organismo, y no invita a nadie.'
    ] : [
      'Ve todos los documentos del club (pendientes, aprobados y rechazados), filtra por deporte, estado y quién decidió, y decide cualquiera.',
      'Invita al <b>Revisor de documentos</b> desde «Usuarios»: el rol solo existe en clubes y solo lo crea el administrador del organismo.',
      'Un mismo usuario puede tener los dos roles en el club; el selector «Solo demo» del encabezado cambia de uno a otro.'
    ] },
    { title: 'Decisión e historial', items: [
      'Una sola decisión: <b>aprobar</b> el documento afilia al menor (queda vinculado al club y hereda su liga y su federación); <b>rechazar</b> exige una nota que el tutor ve en su perfil, desde donde recarga el documento o elige otro club.',
      'La vista pide confirmación antes de registrar. Cada documento guarda su línea de tiempo: <b>Enviado</b> (con <b>Corregido</b> si el tutor lo recargó), y <b>Aprobación</b> o <b>Rechazado</b>, con quién, cuándo y con qué rol (Club o Revisor). También queda en la auditoría del club.'
    ] },
    { title: 'Notificaciones', items: [
      'La campana del encabezado (administrador del club y revisor) trae <b>un aviso por cada documento pendiente</b>: «Hay documentos pendientes de revisión», con quién lo cargó, de qué menor y cuándo. Cada aviso lleva a la revisión de ese documento.',
      '<b>Marcar como leídas</b> apaga los puntos y el contador; queda guardado en la sesión del navegador (demo). Si el tutor recarga un documento, el aviso dice «corrigió».'
    ] },
    { title: 'Qué falta en el back', items: [
      'Estado del documento por menor y club, nota de rechazo, quién y cuándo decide, y el rol <b>Revisor de documentos</b> (alcance: solo revisión y su perfil). Pendiente con Back (DEP-1029) y Front (DEP-1030).',
      'Aviso al tutor cuando se decide, y la vista previa real del documento (hoy es una página simulada).'
    ] },
    { title: 'Solo demo', items: [
      'Los menores de ejemplo y sus tutores (varios ficticios) los siembra <code>seedMenoresDemo</code>. «Descargar» es simulado y los cambios viven en la sesión del navegador.',
      revisor ? 'Se entra con <code>?role=REVISOR_DOC</code> (Óscar Cardona con su segundo rol).' : 'Se entra con <code>?role=CLUB</code>.'
    ] }
  ] } });
});
