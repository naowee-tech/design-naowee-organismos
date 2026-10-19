/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — Perfil multi-rol (v1.6.0)
   Una persona, varias facetas (deportista · tutor legal · personal de
   apoyo) en UN perfil. Variante A: comunes arriba y un grupo por rol en la
   navegación, sin selector de rol.

   El mismo componente sirve a quien mira (el «visor»), derivado del rol
   demo de la URL:
     PERSONA (o sin rol)        → perfil propio: edita, agrega rol, Pendientes.
     CLUB / LIGA / FEDERACION   → organismo: solo lectura, solo las facetas
                                  ligadas a su jurisdicción, Aprobar/Rechazar/
                                  Desvincular sobre lo que es suyo.
     MINDEPORTE (?modo=consulta)→ Consulta de usuario (admin): ve todo, edita,
                                  estado de la cuenta.
     ?visor=comite / COMITE     → Comité Olímpico/ROOT: habilita Análisis
                                  cualitativo.
   Parámetros: ?roles=deportista,tutor,apoyo (subconjunto) · ?seccion=… ·
   ?persona=laura (única persona de la demo) · ?from=… (destino de Volver).
   Datos estáticos (los del brief). Todo se pinta desde `state` con un único
   render(); las notas para devs se montan después de cada render.
   ═══════════════════════════════════════════════════════════════ */
import { mountDevnotes } from './devnotes.js?v=1.7.0';
import { scopeFor, territorioDe } from './permissions.js';
import {
  getOrganismo, subtreeOf, getDeportista, afiliacionesDe, menoresDe, edadDe, ancestorsOf, allSolicitudes,
  crearSolicitud, retirarAfiliacion, crearSolicitudRetiro, retiroPendienteDe, cancelarRetiro, resolverAfiliacion,
  desvincularPorClub, solicitarVinculo, resolverVinculo, registrarMenor, buscarClubesActivos, allOrganismos,
  catalogoDeportes, allDeportistas, organismosDeTerritorio, nombreTerritorio
} from './organismos-data.js';
import { buildDeportistaDetalle } from './deportista-detalle.js';

/* ─── Iconos (sprite inline, stroke currentColor) ─── */
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="mp-run" viewBox="0 0 24 24"><circle cx="14" cy="4.5" r="2"/><path d="M7 21l3-6 3 2v5M6 12l3-4 4 1 3 4 3 1M10 15l-1-4"/></symbol>
  <symbol id="mp-family" viewBox="0 0 24 24"><circle cx="8" cy="6" r="2.5"/><circle cx="17" cy="9" r="2"/><path d="M4 21v-6a4 4 0 018 0v6M14 21v-4a3 3 0 016 0v4"/></symbol>
  <symbol id="mp-whistle" viewBox="0 0 24 24"><path d="M3 12a5 5 0 005 5h1a5 5 0 005-5V9h7V6H8a5 5 0 00-5 5z"/><circle cx="8.5" cy="12" r="1.5"/></symbol>
  <symbol id="mp-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></symbol>
  <symbol id="mp-doc" viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></symbol>
  <symbol id="mp-gear" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></symbol>
  <symbol id="mp-trophy" viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/></symbol>
  <symbol id="mp-building" viewBox="0 0 24 24"><path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M3 21h18"/></symbol>
  <symbol id="mp-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>
  <symbol id="mp-link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/></symbol>
  <symbol id="mp-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="mp-left" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></symbol>
  <symbol id="mp-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></symbol>
  <symbol id="mp-edit" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></symbol>
  <symbol id="mp-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></symbol>
  <symbol id="mp-x" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></symbol>
  <symbol id="mp-flame" viewBox="0 0 24 24"><path d="M12 3s5 4.5 5 10a5 5 0 01-10 0c0-3 2-4.5 2-4.5S10 11 12 11c0-3 0-8 0-8z"/></symbol>
  <symbol id="mp-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
</svg>`;
const ic = (id, cls = '') => `<svg class="i ${cls}" aria-hidden="true"><use href="#mp-${id}"/></svg>`;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const qs = () => new URLSearchParams(window.location.search);

/* ─── Visor: quién mira ─── */
const ORG_ROLES = ['CLUB', 'LIGA', 'FEDERACION'];
export function resolveViewer() {
  const q = qs();
  const role = q.get('role');
  const comite = q.get('visor') === 'comite' || role === 'COMITE';
  let kind = 'own';
  let shellRole = 'PERSONA';
  if (q.get('modo') === 'consulta' || role === 'MINDEPORTE') { kind = 'admin'; shellRole = 'MINDEPORTE'; }
  else if (role === 'DEPORTISTA') { kind = 'own'; shellRole = 'DEPORTISTA'; }
  else if (role === 'TERRITORIAL') { kind = 'org'; shellRole = 'TERRITORIAL'; }
  else if (role === 'MINISTRO') { kind = 'org'; shellRole = 'MINISTRO'; }   // consulta de todo el SND, sin acciones (P-01)
  else if (ORG_ROLES.includes(role)) { kind = 'org'; shellRole = role; }
  else if (comite) { kind = 'comite'; shellRole = 'COMITE'; }
  const orgId = kind === 'org' ? scopeFor(role) : null;
  /* Análisis cualitativo: solo Comité Olímpico y ROOT; nunca el Ministerio ni otro organismo. */
  return { kind, shellRole, orgId, analisis: kind === 'comite' };
}

/* ─── La persona del perfil (Fase 2: sale de los datos, no del brief) ───
   ?persona=<id de deportista>. Sin él: DEPORTISTA → Valentina (DEP-001); el resto → Laura (DEP-022).
   Laura conserva los datos ricos del brief; para las demás se derivan con buildDeportistaDetalle. */
const LAURA = 'DEP-022';
const PERSONA_ID = (() => {
  const q = qs(); const id = q.get('persona');
  if (id && id !== 'laura' && id !== 'ajena' && getDeportista(id)) return id;
  return q.get('role') === 'DEPORTISTA' ? 'DEP-001' : LAURA;
})();
const DEP = getDeportista(PERSONA_ID);
const DET = (() => { try { return buildDeportistaDetalle(DEP); } catch (_) { return null; } })();
const edadP = edadDe(DEP.fechaNac) ?? (DET ? DET.edad : null);
const P = PERSONA_ID === LAURA ? {
  nombre: 'Laura Marcela Gómez Restrepo', corto: 'Laura', ini: 'LG',
  doc: 'C.C. 1.032.987.456', edad: `${edadP} años`,
  deporte: 'Patinaje (carreras)', depto: 'Valle del Cauca', muni: 'Cali', correo: 'laura.gomez@correo.co',
  rolApoyo: 'Docente/Entrenador'
} : {
  nombre: DEP.nombre, corto: DEP.nombre.split(' ')[0], ini: DEP.nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
  doc: `${DEP.tipoDoc === 'TI' ? 'T.I.' : DEP.tipoDoc === 'CC' ? 'C.C.' : DEP.tipoDoc} ${Number(DEP.numDoc).toLocaleString('es-CO')}`, edad: edadP != null ? `${edadP} años` : '',
  deporte: `${DEP.deporte}${DEP.modalidad ? ` (${DEP.modalidad.toLowerCase()})` : ''}`,
  depto: DET ? DET.ubicacion.depto : '—', muni: DET ? DET.ubicacion.municipio : '—', correo: DEP.correo || (DET ? DET.contacto.correo : '—'),
  rolApoyo: DEP.rolApoyo || ''
};
const TUTOR = DEP.tutorId ? getDeportista(DEP.tutorId) : null;   // si la persona es un menor
const ALL_ROLES = ['deportista', 'tutor', 'apoyo'];
const ROLE = {
  deportista: { name: 'Deportista', icon: 'run', group: 'Como deportista', hint: DEP.deporte },
  tutor: { name: 'Tutor legal', icon: 'family', group: 'Como tutor legal', hint: '' },
  apoyo: { name: 'Personal de apoyo', icon: 'whistle', group: 'Como personal de apoyo', hint: P.rolApoyo }
};
/* Campos por pestaña. lock = no editable (llave o derivado). role = solo si tiene ese rol. */
const TABS = [
  { id: 'datos', label: 'Datos', title: 'Datos personales', fields: [
    ['Nombre', 'Laura'], ['Segundo nombre', 'Marcela'], ['Apellido', 'Gómez'], ['Segundo apellido', 'Restrepo'],
    ['Tipo de documento', 'Cédula de ciudadanía', 'lock'], ['Número de documento', '1.032.987.456', 'lock'],
    ['Fecha expedición documento', '14/08/2010'], ['Sexo', 'Femenino'], ['Fecha de nacimiento', '03/05/1992'],
    ['Edad', '34 años', 'lock'], ['Departamento de nacimiento', 'Valle del Cauca'], ['Municipio de nacimiento', 'Cali'],
    ['Nacionalidad', 'Colombiana'], ['Deporte principal', 'Patinaje (carreras)', '', 'deportista']] },
  { id: 'ubic', label: 'Ubicación', title: 'Ubicación', fields: [
    ['Dirección', 'Calle 5 # 38-25, apto 402'], ['Departamento', 'Valle del Cauca'], ['Municipio', 'Cali'], ['Zona', 'Urbana']] },
  { id: 'cont', label: 'Contacto', title: 'Contacto', fields: [
    ['Teléfono', '315 482 7710'], ['Correo electrónico', 'laura.gomez@correo.co']] },
  { id: 'salud', label: 'Salud', title: 'Salud', sensitive: true, fields: [
    ['EPS', 'Sura EPS'], ['Nombre del contacto de emergencia', 'Andrés Gómez Restrepo'], ['Teléfono de emergencia', '318 220 4419'],
    ['Relación con contacto de emergencia', 'Hermano'], ['Protección menores', 'No aplica']] },
  { id: 'socio', label: 'Sociodemográfico', title: 'Sociodemográfico', sensitive: true, fields: [
    ['Identidad de género', 'Mujer'], ['Orientación sexual', 'Prefiere no responder'], ['Discapacidad', 'Ninguna'],
    ['Pertenencia étnica', 'Ninguna'], ['Víctima del conflicto armado', 'No'], ['Priorización', 'No aplica']] },
  { id: 'adic', label: 'Datos adicionales', title: 'Datos adicionales', fields: [
    ['Talla de uniforme', 'S'], ['Grado escolar', 'Profesional']] }
];
if (PERSONA_ID !== LAURA && DET) {
  const partes = DEP.nombre.split(/\s+/);
  const v = (x) => x || '—';
  const VAL = {
    'Nombre': partes[0], 'Segundo nombre': partes.length > 3 ? partes[1] : '', 'Apellido': partes.length > 3 ? partes[2] : v(partes[1]), 'Segundo apellido': partes.length > 3 ? v(partes[3]) : v(partes[2]),
    'Tipo de documento': DET.doc.tipo, 'Número de documento': Number(DEP.numDoc).toLocaleString('es-CO'), 'Fecha expedición documento': '—',
    'Sexo': DEP.sexo === 'Hombre' ? 'Masculino' : DEP.sexo === 'Mujer' ? 'Femenino' : DET.sexo, 'Fecha de nacimiento': DEP.fechaNac ? DEP.fechaNac.split('-').reverse().join('/') : DET.nacimiento, 'Edad': P.edad,
    'Departamento de nacimiento': DET.ubicacion.depto, 'Municipio de nacimiento': DET.ubicacion.municipio, 'Nacionalidad': 'Colombiana',
    'Deporte principal': P.deporte, 'Dirección': '—', 'Departamento': DET.ubicacion.depto, 'Municipio': DET.ubicacion.municipio, 'Zona': DET.ubicacion.zona,
    'Teléfono': DET.contacto.telefono, 'Correo electrónico': P.correo, 'Nombre del contacto de emergencia': TUTOR ? TUTOR.nombre : DET.contacto.emergenciaNombre,
    'Teléfono de emergencia': DET.contacto.emergenciaTel, 'Relación con contacto de emergencia': TUTOR ? 'Tutor legal' : 'Familiar', 'Protección menores': TUTOR ? 'Tutor legal registrado' : 'No aplica'
  };
  TABS.forEach((t) => t.fields.forEach((f) => { if (f[0] in VAL) f[1] = VAL[f[0]]; else f[1] = '—'; }));
}
const TRAY = [
  { yr: 2025, ev: 'Juegos Nacionales', prueba: '500 m', fase: 'Final', pos: '2.º', marca: '43,812 s', medal: 'silver', cyc: true },
  { yr: 2024, ev: 'Campeonato Nacional', prueba: '1000 m', fase: 'Final', pos: '1.º', marca: '1:27,405', medal: 'gold', cyc: true },
  { yr: 2023, ev: 'Juegos Departamentales', prueba: '500 m', fase: 'Semifinal', pos: '4.º', marca: '45,130 s', medal: null }
];
const MEDAL = { gold: 'Oro', silver: 'Plata', bronze: 'Bronce' };
const EVAL = [
  ['Técnica', 'Salida explosiva y buena posición baja en la recta. Pierde eficiencia en la segunda curva por apertura del apoyo derecho.'],
  ['Táctica', 'Lee bien la carrera desde la segunda posición; el adelantamiento final llegó tarde para disputar el oro.'],
  ['Física', 'Potencia anaeróbica por encima del promedio de la categoría. Recuperación entre series mejorable.'],
  ['Conclusiones', 'Deportista con proyección para el ciclo olímpico en distancias cortas.'],
  ['Recomendaciones', 'Trabajo específico de curva y bloques de resistencia a la velocidad en el próximo mesociclo.']
];
const ESTADO = {
  vinculado: ['Vinculado', 'ok'], solicitada: ['Solicitada', 'wait'], solicitado: ['Solicitado', 'wait'],
  rechazada: ['Rechazada', 'no'], rechazado: ['Rechazado', 'no'], desvinculado: ['Desvinculado', 'off'],
  registrado: ['Registrado', 'ok'], revision: ['En revisión', 'rev'], pendiente: ['Pendiente', 'wait'], inactivo: ['Inactivo', 'off']
};
const pill = (e) => `<span class="mp-st mp-st--${ESTADO[e][1]}">${ESTADO[e][0]}</span>`;

/* ─── Estado ─── */
const viewer = resolveViewer();
const own = viewer.kind === 'own';
const third = !own;
const canEdit = viewer.kind === 'own' || viewer.kind === 'admin';
/* Reunión con Producto 2026-10-09: el organismo (club, liga, federación) solo edita los datos básicos
   de contacto de la persona; los datos personales adicionales quedan bajo su control. */
const ORG_EDITA = ['Dirección', 'Teléfono', 'Correo electrónico'];
const orgEdita = viewer.kind === 'org' && ORG_ROLES.includes(viewer.shellRole);
/* Decisión 2026-10-14: el organismo cambia el correo solo mientras la persona no haya activado su
   cuenta. Después lo cambia solo ella: el reclamo de perfil manda el acceso al correo guardado. */
const correoBloqueado = orgEdita && DEP && DEP.cuentaActivada !== false;
const orgEditaCampo = (dt) => ORG_EDITA.includes(dt) && !(dt === 'Correo electrónico' && correoBloqueado);
/* Roles que la persona tiene según los datos: deportista siempre; tutor si tiene menores a cargo;
   personal de apoyo si tiene rol de apoyo o vínculos. ?roles= solo recorta (ejemplos de la demo). */
const ROLES_DATOS = () => [...(DEP.esDeportista === false ? [] : ['deportista']),
  ...(menoresDe(PERSONA_ID).length || DEP.rolTutor ? ['tutor'] : []),
  ...(DEP.rolApoyo || afiliacionesDe(PERSONA_ID).some((a) => a.tipo === 'personal') ? ['apoyo'] : [])];
const parseRoles = () => {
  const base = ROLES_DATOS();
  const r = (qs().get('roles') || base.join(',')).split(',').map((s) => s.trim()).filter((s) => base.includes(s));
  return r.length ? r : base;
};
let personaRoles = parseRoles();
const TERR = territorioDe(qs().get('role'));
/* Territorial: su alcance son los organismos ubicados en su territorio y lo que cuelga de ellos (solo consulta). */
const scope = viewer.orgId ? new Set([viewer.orgId, ...subtreeOf(viewer.orgId).map((o) => o.id)])
  : TERR ? new Set(organismosDeTerritorio(TERR).flatMap((o) => [o.id, ...subtreeOf(o.id).map((x) => x.id)])) : null;
const orgName = viewer.orgId ? (getOrganismo(viewer.orgId)?.nombre || 'tu organismo') : TERR ? nombreTerritorio(TERR) : viewer.shellRole === 'MINISTRO' ? 'el Ministerio del Deporte (consulta)' : '';

const state = {
  section: (qs().get('seccion') === 'analisis' && !resolveViewer().analisis) ? 'perfil' : (qs().get('seccion') || 'perfil'),
  tab: { perfil: 'datos', tray: 'tr', eval: 0 },
  editing: null,
  activa: true,
  pendOpen: false
};
/* Afiliaciones, vínculos y menores salen de los datos de la demo (organismos-data.js). */
const dmy = (iso) => (iso ? iso.slice(0, 10).split('-').reverse().join('/') : '');
const TIPO_TXT = { comite: 'Comité', federacion: 'Federación', liga: 'Liga', club: 'Club' };
const ARTICULO = { comite: 'el comité', federacion: 'la federación', liga: 'la liga', club: 'el club' };
const EST_AF = { Vinculada: 'vinculado', Solicitada: 'solicitada', Rechazada: 'rechazada', Terminada: 'desvinculado' };
const EST_VI = { Vinculada: 'vinculado', Solicitada: 'solicitado', Rechazada: 'rechazado', Terminada: 'desvinculado' };
function itemDe(a, est) {
  const o = getOrganismo(a.organismoId) || {};
  const cadena = o.tipo === 'club' ? ancestorsOf(o.id).filter((x) => x.tipo !== 'comite').map((x) => x.nombre).join(' · ') : '';
  const fecha = a.estado === 'Vinculada' ? `Desde ${dmy(a.desde)}` : a.estado === 'Solicitada' ? `Enviada el ${dmy(a.fecha || a.desde) || 'hoy'}`
    : a.estado === 'Terminada' ? `Hasta ${dmy(a.hasta)}${a.fin === 'desvinculacion' ? ' · desvinculado por el club' : ''}` : `Rechazada${a.motivo ? ` · ${a.motivo}` : ''}`;
  return { id: a.id, org: a.organismoId, tipoOrg: o.tipo, nombre: o.nombre || a.organismoId, sub: [TIPO_TXT[o.tipo], a.deporte || o.deporte, o.ubicacion ? o.ubicacion.ciudad : ''].filter(Boolean).join(' · '),
    cadena, estado: est[a.estado] || 'pendiente', fecha, aprueba: ARTICULO[o.tipo] || 'el organismo', motivo: a.motivo || '', touched: true,
    baja: a.tipo === 'deportista' && a.estado === 'Vinculada' && !!retiroPendienteDe(PERSONA_ID, a.organismoId) };
}
const AFS = () => afiliacionesDe(PERSONA_ID).filter((a) => a.tipo === 'deportista').map((a) => itemDe(a, EST_AF));
const VIS = () => afiliacionesDe(PERSONA_ID).filter((a) => a.tipo === 'personal').map((a) => itemDe(a, EST_VI));
const MEN = () => menoresDe(PERSONA_ID).map((m) => {
  const e = edadDe(m.fechaNac);
  const club = m.clubId ? getOrganismo(m.clubId) : null;
  return { id: m.id, ini: m.nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase(), nombre: m.nombre,
    meta: [m.tipoDoc === 'TI' ? 'T.I.' : m.tipoDoc === 'RC' ? 'R.C.' : m.tipoDoc, e != null ? `${e} años` : '', `${m.deporte}${club ? ' · ' + club.nombre : ''}`, `Vínculo: ${m.parentesco || 'Tutor legal'}`].filter(Boolean),
    estado: m.docsEstado === 'revision' ? 'revision' : 'registrado', org: m.clubId };
});
ROLE.tutor.hint = (() => { const n = menoresDe(PERSONA_ID).length; return n ? `${n} menor${n > 1 ? 'es' : ''}` : ''; })();
const VIVOS = ['vinculado', 'solicitada', 'solicitado'];
const inScope = (it) => !scope || scope.has(it.org);
const afiliacionesVis = () => AFS().filter((a) => inScope(a) && (VIVOS.includes(a.estado) || a.touched));
const vinculosVis = () => VIS().filter((v) => inScope(v) && (VIVOS.includes(v.estado) || v.touched));

/* Facetas visibles para este visor. */
function visibleRoles() {
  return personaRoles.filter((r) => {
    if (viewer.kind !== 'org') return true; /* propio, Ministerio y Comité: todo */
    /* organismo: deportista y apoyo solo si hay algo en su jurisdicción;
       la lista de menores sí la ve (abrir cada menor sigue la misma regla). */
    if (r === 'deportista') return AFS().some(inScope);
    if (r === 'apoyo') return VIS().some(inScope);
    return r === 'tutor';
  });
}
const has = (r) => visibleRoles().includes(r);

/* Secciones en orden: Perfil · grupos por rol · Documentos/Configuración. */
function sections() {
  const out = [{ id: 'perfil', label: 'Perfil', icon: 'user' }];
  if (has('deportista')) {
    out.push({ id: 'trayectoria', label: 'Trayectoria', icon: 'trophy', group: 'deportista' });
    out.push({ id: 'afiliaciones', label: 'Afiliaciones', icon: 'building', group: 'deportista', pend: pendAfil() });
    if (viewer.analisis) out.push({ id: 'analisis', label: 'Análisis cualitativo', icon: 'chart', group: 'deportista', only: 'Solo Comité Olímpico y ROOT' });
  }
  if (has('tutor')) out.push({ id: 'menores', label: third ? 'Menores' : 'Mis menores', icon: 'family', group: 'tutor', pend: pendMen() });
  if (has('apoyo')) out.push({ id: 'vinculos', label: 'Vínculos', icon: 'link', group: 'apoyo', pend: pendVin() });
  if (own || viewer.kind === 'admin') out.push({ id: 'documentos', label: 'Documentos', icon: 'doc', soon: true });
  if (own) out.push({ id: 'configuracion', label: 'Configuración', icon: 'gear', soon: true });
  return out;
}
function pendAfil() {
  const n = afiliacionesVis().filter((a) => a.estado === 'solicitada').length;
  return n ? { txt: `${n} solicitada${n > 1 ? 's' : ''}`, aria: `${n} afiliación${n > 1 ? 'es' : ''} solicitada${n > 1 ? 's' : ''}, pendiente${n > 1 ? 's' : ''} de aprobación` } : null;
}
function pendMen() {
  const n = MEN().filter((m) => m.estado === 'revision').length;
  return n ? { txt: `${n} en revisión`, aria: `${n} menor${n > 1 ? 'es' : ''} en revisión`, rev: true } : null;
}
function pendVin() {
  const n = vinculosVis().filter((v) => v.estado === 'solicitado').length;
  return n ? { txt: `${n} solicitado${n > 1 ? 's' : ''}`, aria: `${n} vínculo${n > 1 ? 's' : ''} solicitado${n > 1 ? 's' : ''}, pendiente${n > 1 ? 's' : ''} de aprobación` } : null;
}
/* Pendientes del riel (solo perfil propio): lo que espera algo. */
function pendientes() {
  if (!own) return [];
  const out = [];
  if (personaRoles.includes('deportista')) AFS().filter((a) => a.estado === 'solicitada').forEach((a) =>
    out.push({ t: `Afiliación a ${a.nombre}`, sub: 'La aprueba el club', estado: 'solicitada', act: 'cancel', kind: 'af', id: a.id }));
  if (personaRoles.includes('tutor')) MEN().filter((m) => m.estado === 'revision').forEach((m) =>
    out.push({ t: m.nombre, sub: 'El Ministerio valida sus documentos', estado: 'revision', act: 'ver', go: 'menores' }));
  if (personaRoles.includes('apoyo')) VIS().filter((v) => v.estado === 'solicitado').forEach((v) =>
    out.push({ t: `Vínculo con ${v.nombre}`, sub: `Lo aprueba ${v.aprueba}`, estado: 'solicitado', act: 'cancel', kind: 'vi', id: v.id }));
  return out;
}

/* ─── Render ─── */
let root;
const DEPORTISTA_SECS = ['perfil', 'trayectoria', 'afiliaciones', 'analisis'];
/* (la biometría vive en la franja del encabezado y solo sale en estas secciones) */
const devnote = (k) => `<span class="wz-devnote" tabindex="0" role="button" data-devnote="${k}"></span>`;

function render() {
  const secs = sections();
  if (!secs.some((s) => s.id === state.section)) state.section = 'perfil';
  const scrollTabs = {};
  root.querySelectorAll('[data-tabs]').forEach((t) => { scrollTabs[t.dataset.tabs] = t.scrollLeft; });

  /* Organismo fuera de jurisdicción: no ve el perfil. */
  const enJurisdiccion = (personaRoles.includes('deportista') && AFS().some(inScope))
    || (personaRoles.includes('apoyo') && VIS().some(inScope));
  if (viewer.kind === 'org' && (qs().get('persona') === 'ajena' || !enJurisdiccion)) {
    root.innerHTML = `
      ${renderTop(true)}
      <div class="mp-card mp-empty"><div class="mp-tile">${ic('building')}</div>
        <h3>Esta persona no está vinculada a ${esc(orgName)}</h3>
        <p>Solo puedes ver el perfil de personas afiliadas o vinculadas a tu organismo o a uno que dependa de él${qs().get('role') === 'CLUB' ? ', o que le hayan enviado una solicitud a tu club' : ''}.</p></div>`;
    mountDevnotes(DEVNOTES, root);
    return;
  }
  root.innerHTML = `
    ${renderTop()}
    ${renderExamples()}
    ${renderHeader()}
    <div class="mp-layout">
      ${renderNav(secs)}
      ${renderPicker(secs)}
      <div class="mp-content" id="mpContent">${state.section === 'perfil' ? renderPendientes() : ''}${renderSection(state.section)}</div>
    </div>`;
  bind();
  root.querySelectorAll('[data-tabs]').forEach((t) => { if (scrollTabs[t.dataset.tabs]) t.scrollLeft = scrollTabs[t.dataset.tabs]; });
  syncTabFades();
  mountDevnotes(DEVNOTES, root);
}

function renderTop(denied) {
  const q = qs();
  const from = q.get('from');
  if (own && TUTOR) {
    return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic('family', 'sm')}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">Estás gestionando el perfil de <strong>${esc(P.corto)}</strong> como su tutor legal (${esc(TUTOR.nombre)}). Sus datos, documentos y afiliaciones los administras tú mientras sea menor de edad.</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(from || 'perfil.html?seccion=menores')}">${ic('left')}Volver a mi perfil</a></div>`;
  }
  if (viewer.kind === 'admin') {
    return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic('info', 'sm')}</span>
        <div class="naowee-message__body"><p class="naowee-message__text"><strong>Consulta de usuario</strong> — Esta vista es de consulta y edición de datos del usuario. Los cambios que guardes quedan registrados a tu nombre.</p></div></div>
      <div class="mp-bar">
        <a class="mp-back" href="${esc(from || 'jerarquia.html?role=MINDEPORTE')}" data-back>${ic('left')}Volver al listado</a>
        <div class="mp-bar__end">
          <div class="mp-acct"><span class="mp-acct__l">Estado de la cuenta</span>${state.activa ? '<span class="mp-st mp-st--ok">Activo</span>' : '<span class="mp-st mp-st--off">Inactivo</span>'}
            <button class="mp-btn mp-btn--sm" type="button" data-acct>${state.activa ? 'Inactivar cuenta' : 'Activar cuenta'}</button></div>
          ${devnote('barAdmin')}
        </div>
      </div>`;
  }
  if (viewer.kind === 'org') {
    const back = from || (qs().get('role') === 'CLUB' ? 'deportistas.html?role=CLUB' : `jerarquia.html?role=${qs().get('role')}`);
    return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic('eye', 'sm')}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">${denied ? `Estás consultando como <strong>${esc(orgName)}</strong>.` : `Estás viendo el perfil de una persona vinculada a <strong>${esc(orgName)}</strong>. Ves sus datos y lo que tiene relación con tu organismo.`}</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(back)}">${ic('left')}Volver</a><div class="mp-bar__end">${devnote('barVisor')}</div></div>`;
  }
  if (viewer.kind === 'comite') {
    return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic('eye', 'sm')}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">Estás viendo el perfil como <strong>Comité Olímpico Colombiano</strong>: ves todo el perfil y el análisis cualitativo, en solo lectura.</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(from || 'jerarquia.html?role=COMITE')}">${ic('left')}Volver</a><div class="mp-bar__end">${devnote('barVisor')}</div></div>`;
  }
  return '';
}

function renderHeader() {
  const vr = visibleRoles();
  const chips = vr.map((r) => {
    const go = r === 'deportista' ? 'trayectoria' : r === 'tutor' ? 'menores' : 'vinculos';
    return `<li><a class="mp-rchip" href="?seccion=${go}" data-go="${go}"><span class="mp-ic">${ic(ROLE[r].icon)}</span><span class="mp-rchip__l">${ROLE[r].name}</span><small>${ROLE[r].hint}</small></a></li>`;
  }).join('');
  return `
    <section class="mp-hcard" aria-labelledby="mpName">
      <div class="mp-hcard__top">
        <div class="mp-ava" aria-hidden="true">${P.ini}</div>
        <div class="mp-hid">
          <h1 id="mpName">${P.nombre}</h1>
          <p class="mp-doc">${P.doc} · ${P.edad}</p>
          ${own ? `<div class="mp-hid__note">${devnote('barOwn')}</div>` : ''}
          <ul class="mp-roles" aria-label="Roles de la persona">${chips}
            ${own && !TUTOR ? `<li><button class="mp-addrole" type="button" data-addrole>${ic('plus', 'sm')}Agregar rol</button></li>` : ''}</ul>
        </div>
      </div>
      <dl class="mp-hstrip">
        ${vr.includes('deportista') ? `<div><dt>Deporte principal</dt><dd>${P.deporte}</dd></div>` : ''}
        <div><dt>Departamento</dt><dd>${P.depto}</dd></div>
        <div><dt>Municipio</dt><dd>${P.muni}</dd></div>
        <div class="mp-hstrip__mail"><dt>Correo</dt><dd>${P.correo}</dd></div>
      </dl>
      ${vr.includes('deportista') && DEPORTISTA_SECS.includes(state.section) ? `
        <div class="mp-hbio" role="group" aria-label="Biometría, actualizada el 15/09/2026">
          <span class="mp-hbio__t">Biometría</span>
          <dl class="mp-bio">
            <div><dt>Altura</dt><dd>166 cm</dd></div><div><dt>Peso</dt><dd>58 kg</dd></div>
            <div><dt>Sangre</dt><dd>O+</dd></div><div><dt>IMC</dt><dd>21,0</dd></div>
          </dl>
          <span class="mp-hbio__d">Act. 15/09/2026</span>
        </div>` : ''}
    </section>`;
}

function navLink(s) {
  const cur = s.id === state.section ? ' aria-current="page"' : '';
  const pend = s.pend ? `<span class="mp-pend${s.pend.rev ? ' mp-pend--rev' : ''}" aria-label="${esc(s.pend.aria)}">${s.pend.txt}</span>` : '';
  const soon = s.soon ? '<span class="mp-soon">Pronto</span>' : '';
  return `<li><a href="?seccion=${s.id}" data-sec="${s.id}"${cur}>${ic(s.icon)}<span class="mp-nav__l">${s.label}</span>${pend}${soon}</a>${s.only ? `<span class="mp-only">${s.only}</span>` : ''}</li>`;
}
function renderNav(secs) {
  const top = secs.filter((s) => !s.group && !s.soon);
  const tail = secs.filter((s) => s.soon);
  const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
  return `
    <nav class="mp-nav" aria-label="Secciones del perfil">
      <ul>${top.map(navLink).join('')}</ul>
      ${groups.map((g) => `
        <div class="mp-sgroup">
          <p class="mp-sgroup-h" id="mpg-${g}">${ic(ROLE[g].icon)}${ROLE[g].group}</p>
          <ul aria-labelledby="mpg-${g}">${secs.filter((s) => s.group === g).map(navLink).join('')}</ul>
        </div>`).join('')}
      ${tail.length ? `<div class="mp-sgroup"><ul>${tail.map(navLink).join('')}</ul></div>` : ''}
    </nav>`;
}
function renderPicker(secs) {
  const opt = (s) => `<option value="${s.id}"${s.id === state.section ? ' selected' : ''}>${s.label}${s.pend ? ` (${s.pend.txt})` : ''}${s.soon ? ' · pronto' : ''}</option>`;
  const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
  return `
    <div class="mp-picker">
      <label for="mpPick">Sección</label>
      <div class="mp-sel">
        <select id="mpPick">
          ${secs.filter((s) => !s.group && !s.soon).map(opt).join('')}
          ${groups.map((g) => `<optgroup label="${ROLE[g].group}">${secs.filter((s) => s.group === g).map(opt).join('')}</optgroup>`).join('')}
          ${secs.some((s) => s.soon) ? `<optgroup label="Cuenta">${secs.filter((s) => s.soon).map(opt).join('')}</optgroup>` : ''}
        </select>${ic('down')}
      </div>
    </div>`;
}

/* Pendientes: bloque compacto arriba del contenido (solo perfil propio). */
function renderPendientes() {
  const pend = pendientes();
  if (!pend.length) return '';
  const MAX = 3;
  const shown = state.pendOpen ? pend : pend.slice(0, MAX);
  return `
    <section class="mp-card mp-pend-card" aria-labelledby="mpPend">
      <div class="mp-pend-card__h"><h2 id="mpPend">Pendientes <span class="mp-pend-card__n">· ${pend.length}</span></h2>${devnote('pendientes')}</div>
      <ul class="mp-pendl">
        ${shown.map((p) => `
          <li><div class="mp-pendl__tx"><strong>${esc(p.t)}</strong><span class="mp-pendl__sub">${esc(p.sub)}</span></div>
            ${pill(p.estado)}
            ${p.act === 'cancel'
              ? `<button class="mp-link" type="button" data-cancel="${p.kind}:${p.id}">Cancelar solicitud</button>`
              : `<button class="mp-link" type="button" data-go="${p.go}">Ver</button>`}</li>`).join('')}
      </ul>
      ${pend.length > MAX ? `<button class="mp-link mp-pend-card__more" type="button" data-pend-toggle aria-expanded="${!!state.pendOpen}">${state.pendOpen ? 'Ver menos' : `Ver ${pend.length - MAX} más`}</button>` : ''}
    </section>`;
}

/* Solo demo: ejemplos de una persona con uno o varios roles (perfil propio). */
const EJEMPLOS = [['deportista,tutor,apoyo', 'Multi-rol'], ['deportista', 'Solo deportista'], ['tutor', 'Solo tutor legal'], ['apoyo', 'Solo personal de apoyo']];
function renderExamples() {
  if (PERSONA_ID !== LAURA) return '';   // los ejemplos (multi-rol, solo deportista…) son de Laura
  if (!own) return '';
  const cur = personaRoles.join(',');
  return `
    <div class="mp-demo" role="group" aria-label="Solo demo: ver ejemplo">
      <span class="naowee-badge">Solo demo</span><span class="mp-demo__l">Ver ejemplo:</span>
      <div class="mp-demo__seg">${EJEMPLOS.map(([v, l]) => `<button type="button" data-ejemplo="${v}" aria-pressed="${v === cur}">${l}</button>`).join('')}</div>
    </div>`;
}

function secHead({ group, id, title, desc, acts = '', note }) {
  return `
    <div class="mp-sec-h">
      <div>
        ${group ? `<span class="mp-eyebrow">${ic(ROLE[group].icon)}${ROLE[group].group}</span>` : ''}
        <h2 id="${id}">${title}</h2>
        ${desc ? `<p>${desc}</p>` : ''}
      </div>
      <div class="mp-sec-h__acts">${acts}${note ? devnote(note) : ''}</div>
    </div>`;
}

function tabsBar(key, items, sel, label) {
  return `<div class="mp-tabs-wrap"><div class="mp-tabs" role="tablist" aria-label="${label}" data-tabs="${key}">
    ${items.map(([id, lbl]) => `<button class="mp-tab" type="button" role="tab" id="mpt-${key}-${id}" aria-controls="mpp-${key}-${id}" aria-selected="${id === sel}" tabindex="${id === sel ? 0 : -1}" data-tab="${key}:${id}">${lbl}</button>`).join('')}
  </div></div>`;
}

function renderSection(sec) {
  switch (sec) {
    case 'trayectoria': return secTrayectoria();
    case 'afiliaciones': return secAfiliaciones();
    case 'analisis': return secAnalisis();
    case 'menores': return secMenores();
    case 'vinculos': return secVinculos();
    case 'documentos': return secEmpty('doc', 'Documentos', third
      ? 'Documento de identidad, certificados médicos y soportes que pidan los organismos. Estamos terminando esta sección.'
      : 'Aquí vas a encontrar tu documento de identidad, certificados médicos y los soportes que te pidan tus organismos. Estamos terminando esta sección.');
    case 'configuracion': return secEmpty('gear', 'Configuración', 'Contraseña, notificaciones y privacidad de tu cuenta. Estamos terminando esta sección.');
    default: return secPerfil();
  }
}
function secEmpty(icon, title, text) {
  return `<section aria-labelledby="mpSecEmpty"><div class="mp-card mp-empty"><div class="mp-tile">${ic(icon)}</div><h3 id="mpSecEmpty">${title}</h3><p>${text}</p></div></section>`;
}

function secPerfil() {
  const tabs = TABS;
  if (!tabs.some((t) => t.id === state.tab.perfil)) state.tab.perfil = 'datos';
  const t = tabs.find((x) => x.id === state.tab.perfil);
  const editing = state.editing === t.id;
  const fields = t.fields.filter((f) => !f[3] || has(f[3]));
  const orgPuede = orgEdita && fields.some((f) => orgEditaCampo(f[0]));
  const bloqueado = (dt, lock) => lock || (orgEdita && !orgEditaCampo(dt));
  const notaCorreo = correoBloqueado && fields.some((f) => f[0] === 'Correo electrónico') ? ' El correo lo cambia solo la persona porque ya activó su cuenta.' : '';
  const notaOrg = !orgEdita ? '' : orgPuede
    ? `<p>Tu organismo puede actualizar ${fields.filter((f) => orgEditaCampo(f[0])).map((f) => f[0].toLowerCase()).join(' y ')}.${fields.some((f) => !orgEditaCampo(f[0])) ? ' El resto lo maneja la persona.' : ' Los demás datos personales los maneja la persona.'}${notaCorreo}</p>`
    : '<p>Estos datos los maneja la persona; tu organismo solo los consulta.</p>';
  return `
    <section aria-labelledby="mpH-perfil">
      <h2 class="mp-sr" id="mpH-perfil">Perfil</h2>
      <div class="mp-card">
        ${tabsBar('perfil', tabs.map((x) => [x.id, x.label]), t.id, 'Datos del perfil')}
        <div class="mp-panel" role="tabpanel" id="mpp-perfil-${t.id}" aria-labelledby="mpt-perfil-${t.id}">
          <div class="mp-panel-h">
            <div><h3>${t.title}</h3>${t.id === 'datos' && own ? '<p>Son los mismos para todos tus roles.</p>' : ''}${notaOrg}</div>
            <div class="mp-sec-h__acts">${(canEdit || orgPuede) && !editing ? `<button class="mp-btn mp-btn--sm" type="button" data-edit="${t.id}">${ic('edit', 'sm')}${orgPuede ? 'Editar datos básicos' : 'Editar'}</button>` : ''}${t.id === 'datos' ? devnote('perfil') : ''}</div>
          </div>
          <dl class="mp-fields">
            ${fields.map(([dt, dd, lock]) => `<div><dt>${dt}</dt>${editing
              ? `<dd><input value="${esc(dd)}" aria-label="${esc(dt)}"${bloqueado(dt, lock) ? ' disabled' : ''} data-field="${esc(dt)}"></dd>`
              : `<dd${dd === 'Prefiere no responder' ? ' class="is-empty"' : ''}>${esc(dd)}</dd>`}</div>`).join('')}
          </dl>
          ${editing ? `<div class="mp-edit-acts"><button class="mp-btn mp-btn--lg" type="button" data-edit-cancel>Cancelar</button><button class="mp-btn mp-btn--pri mp-btn--lg" type="button" data-edit-save="${t.id}">Guardar cambios</button></div>` : ''}
        </div>
      </div>
    </section>`;
}

function secTrayectoria() {
  const tab = state.tab.tray;
  const medals = TRAY.filter((r) => r.medal);
  return `
    <section aria-labelledby="mpH-tray">
      ${secHead({ group: 'deportista', id: 'mpH-tray', title: 'Trayectoria', desc: 'Resultados oficiales en eventos registrados en el SUID.', note: 'trayectoria' })}
      <div class="mp-result" aria-label="Último resultado">
        <div class="mp-ring" aria-hidden="true">2.º</div>
        <div>
          <p class="mp-result__k">Último resultado</p>
          <p class="mp-result__v">Plata · 500 m</p>
          <p class="mp-result__m">Juegos Nacionales 2025 · Final</p>
        </div>
        <ul class="mp-tally" aria-label="Medallero: 1 oro, 1 plata, 0 bronce">
          <li><b>1</b><span><i class="mp-gold"></i>oro</span></li>
          <li><b>1</b><span><i class="mp-silver"></i>plata</span></li>
          <li><b>0</b><span><i class="mp-bronze"></i>bronce</span></li>
        </ul>
      </div>
      <div class="mp-card">
        ${tabsBar('tray', [['tr', 'Trayectoria'], ['med', `Medallería (${medals.length})`]], tab, 'Trayectoria')}
        <div class="mp-panel" role="tabpanel" id="mpp-tray-${tab}" aria-labelledby="mpt-tray-${tab}">
          ${tab === 'tr' ? `
            <table class="mp-tbl">
              <thead><tr><th>Año</th><th>Evento</th><th>Prueba</th><th>Fase</th><th>Posición</th><th>Marca</th><th>Medalla</th></tr></thead>
              <tbody>${TRAY.map((r) => `
                <tr><td class="mp-yr">${r.yr}</td>
                  <td class="mp-ev"><strong>${r.ev}</strong><span>Patinaje</span>${r.cyc ? `<br><span class="mp-cyc">${ic('flame', 'sm')}Ciclo olímpico</span>` : ''}</td>
                  <td data-l="Prueba">${r.prueba}</td><td data-l="Fase">${r.fase}</td><td data-l="Posición">${r.pos}</td><td data-l="Marca">${r.marca}</td>
                  <td data-l="Medalla">${r.medal ? `<span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span>` : '<span class="mp-dash" aria-label="Sin medalla">—</span>'}</td></tr>`).join('')}
              </tbody>
            </table>` : `
            <div class="mp-medals">${medals.map((r) => `
              <div class="mp-mcard"><span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span><strong>${r.ev} ${r.yr}</strong><p>Patinaje · ${r.prueba} · ${r.marca}</p></div>`).join('')}
            </div>`}
        </div>
      </div>
    </section>`;
}

/* Acciones por fila según el visor. */
function rowActions(it, kind) {
  const solicitada = it.estado === 'solicitada' || it.estado === 'solicitado';
  if (own && solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-cancel="${kind}:${it.id}">Cancelar solicitud</button>`;
  if (own && kind === 'af' && it.estado === 'vinculado') return it.baja
    ? `<button class="mp-btn mp-btn--sm" type="button" data-nobaja="${it.id}">Cancelar retiro</button>`
    : `<button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-retiro="${it.id}">Retirarme</button>`;
  if (viewer.kind === 'org' && it.org === viewer.orgId) {
    if (solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-org="aprobar:${kind}:${it.id}">Aprobar</button><button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="rechazar:${kind}:${it.id}">Rechazar</button>`;
    if (it.estado === 'vinculado') return `<button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="desvincular:${kind}:${it.id}">Desvincular</button>`;
  }
  return '';
}
function orgRow(it, kind, aprueba) {
  const solicitada = it.estado === 'solicitada' || it.estado === 'solicitado';
  return `
    <li class="mp-row"><span class="mp-tile">${ic('building')}</span>
      <div class="mp-row__main"><strong>${esc(it.nombre)}</strong><span>${esc(it.sub)}</span>
        ${it.cadena && it.estado === 'vinculado' ? `<span class="mp-row__hint">Hereda: ${esc(it.cadena)}</span>` : ''}
        <span class="mp-row__hint">${esc(it.fecha)}${solicitada ? ` · Lo aprueba ${aprueba}` : ''}${it.baja ? ' · Retiro en trámite: el club debe confirmarlo' : ''}</span></div>
      <div class="mp-row__side">${pill(it.estado)}${rowActions(it, kind)}</div></li>`;
}

function secAfiliaciones() {
  const list = afiliacionesVis();
  return `
    <section aria-labelledby="mpH-afil">
      ${secHead({ group: 'deportista', id: 'mpH-afil', title: 'Afiliaciones',
        desc: viewer.kind === 'org' ? `Afiliaciones de ${P.corto} a clubes de tu jurisdicción. Cada club aprueba la suya.`
          : third ? 'Clubes en los que la persona está inscrita como deportista. El club aprueba cada solicitud.'
          : 'Clubes en los que estás inscrita como deportista. El club aprueba cada solicitud.',
        acts: own ? `<button class="mp-btn" type="button" data-solicitar-af>${ic('plus', 'sm')}Solicitar afiliación</button>` : '',
        note: 'afiliaciones' })}
      ${list.length ? `<ul class="mp-list">${list.map((a) => orgRow(a, 'af', 'el club')).join('')}</ul>`
        : `<div class="mp-card mp-empty"><div class="mp-tile">${ic('building')}</div><h3>Sin afiliaciones</h3><p>${own ? 'Solicita la afiliación a un club para competir con él.' : 'No tiene afiliaciones a clubes.'}</p></div>`}
      <div class="mp-note">${ic('info')}<span>${own ? 'Puedes estar en varios clubes a la vez, del mismo deporte o de otros. Cada club aprueba su afiliación y de cada uno heredas su liga y su federación. Mientras una está solicitada, sigues compitiendo con tus clubes actuales.' : 'La afiliación la aprueba el club. Al aprobarla, el deportista hereda la liga y la federación de ese club, sin perder las de sus otros clubes.'}</span></div>
    </section>`;
}

function secAnalisis() {
  const i = state.tab.eval;
  return `
    <section aria-labelledby="mpH-anal">
      ${secHead({ group: 'deportista', id: 'mpH-anal', title: `Análisis cualitativo <span class="mp-tag">${ic('eye')}Solo Comité Olímpico y ROOT</span>`,
        desc: 'Evaluaciones del metodólogo por prueba y evento.', note: 'analisis' })}
      <div class="mp-eval">
        <div class="mp-eval-h"><strong>Juegos Nacionales 2025 · 500 m</strong><span>14/11/2025 · Andrés Pineda, metodólogo</span></div>
        ${tabsBar('eval', EVAL.map(([l], k) => [String(k), l]), String(i), 'Dimensiones de la evaluación')}
        <p class="mp-eval-b" role="tabpanel" id="mpp-eval-${i}" aria-labelledby="mpt-eval-${i}">${EVAL[i][1]}</p>
      </div>
    </section>`;
}

function secMenores() {
  return `
    <section aria-labelledby="mpH-men">
      ${secHead({ group: 'tutor', id: 'mpH-men', title: third ? 'Menores a cargo' : 'Mis menores',
        desc: third ? 'Deportistas menores de edad cuyo perfil administra esta persona.' : 'Administras el perfil de los menores a tu cargo. Un menor solo puede tener el rol de deportista.',
        acts: own ? `<button class="mp-btn" type="button" data-menor-nuevo>${ic('plus', 'sm')}Registrar menor</button>` : '',
        note: 'menores' })}
      <div class="mp-card">
        <ul class="mp-minors">${MEN().map((m) => `
          <li class="mp-minor"><span class="mp-ava-s" aria-hidden="true">${m.ini}</span>
            <div><strong>${m.nombre}</strong><div class="mp-meta">${m.meta.map((x) => `<span>${x}</span>`).join('')}</div></div>
            <div class="mp-row__side">${pill(m.estado)}${viewer.kind === 'org' && !(m.org && scope.has(m.org))
              ? `<span class="mp-out" tabindex="0" title="Solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de él." aria-label="Fuera de tu jurisdicción: solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de él.">${ic('info', 'sm')}Fuera de tu jurisdicción</span>`
              : `<button class="mp-btn mp-btn--sm" type="button" data-menor="${m.id}">${own ? 'Gestionar perfil' : 'Ver perfil'}</button>`}</div></li>`).join('') || `<li class="mp-minor"><div><strong>Sin menores registrados</strong><div class="mp-meta"><span>Registra a un menor a tu cargo para administrar su perfil.</span></div></div></li>`}
        </ul>
      </div>
      <div class="mp-note">${ic('info')}<span>«En revisión» significa que se está validando el documento de parentesco del menor. ${third ? 'El tutor puede seguir editando sus datos mientras tanto.' : 'Puedes seguir editando sus datos mientras tanto.'} Mientras sea menor de edad, sus datos, documentos y afiliaciones los gestiona su tutor.</span></div>
    </section>`;
}

function secVinculos() {
  const list = vinculosVis();
  return `
    <section aria-labelledby="mpH-vin">
      ${secHead({ group: 'apoyo', id: 'mpH-vin', title: 'Vínculos',
        desc: viewer.kind === 'org' ? `Rol de apoyo de ${P.corto} y sus vínculos con organismos de tu jurisdicción.`
          : third ? 'Rol de apoyo y organismos con los que trabaja esta persona. Cada organismo aprueba el vínculo.'
          : 'Tu rol de apoyo y los organismos con los que trabajas. Cada organismo aprueba el vínculo.',
        acts: own ? `<button class="mp-btn" type="button" data-solicitar-vi>${ic('plus', 'sm')}Solicitar vínculo</button>` : '',
        note: 'vinculos' })}
      <h3 class="mp-sub-h">Rol de apoyo</h3>
      <ul class="mp-list">
        <li class="mp-row"><span class="mp-tile">${ic('whistle')}</span>
          <div class="mp-row__main"><strong>${esc(P.rolApoyo || 'Personal deportivo')}</strong><span>${esc(DEP.deporte)} · Rol principal</span></div>
          ${own ? `<div class="mp-row__side"><button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-addrole>${ic('plus', 'sm')}Agregar otro rol específico</button></div>` : ''}</li>
      </ul>
      <h3 class="mp-sub-h">Organismos</h3>
      ${list.length ? `<ul class="mp-list">${list.map((v) => orgRow(v, 'vi', v.aprueba)).join('')}</ul>` : '<p class="mp-note">Sin vínculos con organismos.</p>'}
      <div class="mp-note">${ic('info')}<span>Puedes vincularte a cualquier organismo: club, liga, federación o comité. Cada uno aprueba su vínculo. Ser personal de apoyo no requiere aprobación; trabajar para un organismo sí.</span></div>
    </section>`;
}

/* ─── Interacción ─── */
function go(sec) {
  state.section = sec;
  state.editing = null;
  const u = qs(); u.set('seccion', sec);
  history.replaceState(null, '', '?' + u.toString());
  render();
  const c = root.querySelector('#mpContent');
  if (c && window.matchMedia('(max-width: 900px)').matches) c.scrollIntoView({ block: 'start' });
  root.querySelector(`.mp-nav a[data-sec="${sec}"]`)?.focus({ preventScroll: true });
}

function syncTabFades() {
  root.querySelectorAll('.mp-tabs').forEach((t) => {
    const w = t.parentElement;
    const upd = () => {
      w.classList.toggle('has-more', t.scrollLeft + t.clientWidth < t.scrollWidth - 2);
      w.classList.toggle('has-less', t.scrollLeft > 2);
    };
    upd();
    t.addEventListener('scroll', upd, { passive: true });
  });
}

function bind() {
  root.querySelectorAll('[data-sec]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(a.dataset.sec); }));
  root.querySelectorAll('[data-go]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); go(a.dataset.go); }));
  root.querySelector('#mpPick')?.addEventListener('change', (e) => go(e.target.value));

  /* Pestañas: clic + flechas */
  root.querySelectorAll('[role="tablist"]').forEach((tl) => {
    const tabs = [...tl.querySelectorAll('[role="tab"]')];
    const sel = (b) => {
      const [k, id] = b.dataset.tab.split(':');
      if (k === 'eval') state.tab.eval = Number(id); else state.tab[k] = id;
      if (k === 'perfil') state.editing = null;
      render();
      root.querySelector(`[data-tab="${b.dataset.tab}"]`)?.focus();
    };
    tabs.forEach((b, i) => {
      b.addEventListener('click', () => sel(b));
      b.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); sel(tabs[(i + d + tabs.length) % tabs.length]); }
      });
    });
  });

  /* Edición en sitio */
  root.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => {
    state.editing = b.dataset.edit; render();
    root.querySelector('.mp-fields input:not(:disabled)')?.focus();
  }));
  root.querySelector('[data-edit-cancel]')?.addEventListener('click', () => { state.editing = null; render(); });
  root.querySelector('[data-edit-save]')?.addEventListener('click', (e) => {
    const t = TABS.find((x) => x.id === e.currentTarget.dataset.editSave);
    root.querySelectorAll('.mp-fields input:not(:disabled)').forEach((inp) => {
      const f = t.fields.find((x) => x[0] === inp.dataset.field); if (f) f[1] = inp.value;
    });
    state.editing = null; render();
    toast(viewer.kind === 'admin' ? 'Cambios guardados. Quedan registrados a tu nombre.' : orgEdita ? `Datos básicos actualizados. Quedan registrados a nombre de ${orgName}.` : 'Cambios guardados.');
  });

  /* Perfil propio: cancelar una solicitud, retirarse de un club, cancelar la baja. */
  const lista = (k) => (k === 'af' ? AFS() : VIS());
  root.querySelectorAll('[data-cancel]').forEach((b) => b.addEventListener('click', () => {
    const [k, id] = b.dataset.cancel.split(':');
    const it = lista(k).find((x) => x.id === id);
    confirmDlg({
      title: 'Cancelar solicitud',
      text: `${k === 'af' ? 'Se retira la solicitud de afiliación a' : 'Se retira la solicitud de vínculo con'} ${it.nombre}. Puedes volver a solicitarla cuando quieras.`,
      ok: 'Cancelar solicitud', back: 'Mantener solicitud',
      onOk: () => {
        if (k === 'af') retirarAfiliacion(PERSONA_ID, {}, it.org);
        else resolverVinculo(PERSONA_ID, it.org, 'Rechazada', { motivo: 'Retirada por la persona', responsable: P.nombre, rol: 'Personal deportivo' });
        render(); toast('Solicitud cancelada.');
      }
    });
  }));
  root.querySelectorAll('[data-retiro]').forEach((b) => b.addEventListener('click', () => {
    const it = AFS().find((x) => x.id === b.dataset.retiro);
    confirmDlg({
      title: `Retirarme de ${it.nombre}`,
      text: getOrganismo(it.org)?.estado === 'Suspendido'
        ? `${it.nombre} está suspendido: tu retiro queda en espera hasta que el club se reactive y lo confirme. Mientras tanto sigues afiliada y puedes afiliarte a otros clubes. Si el club es cancelado, tu afiliación termina sola.`
        : `El club confirma tu retiro. Mientras tanto sigues afiliada. Al confirmarlo dejas de heredar su liga y su federación; tus otros clubes no cambian.`,
      ok: 'Pedir el retiro', back: 'Volver',
      onOk: () => { crearSolicitudRetiro(PERSONA_ID, it.org); render(); toast(`Retiro enviado: ${it.nombre} debe confirmarlo.`); }
    });
  }));
  root.querySelectorAll('[data-nobaja]').forEach((b) => b.addEventListener('click', () => {
    const it = AFS().find((x) => x.id === b.dataset.nobaja);
    cancelarRetiro(PERSONA_ID, it.org); render(); toast('Retiro cancelado: sigues afiliada al club.');
  }));
  root.querySelector('[data-solicitar-af]')?.addEventListener('click', openSolicitarAfiliacion);
  root.querySelector('[data-solicitar-vi]')?.addEventListener('click', openSolicitarVinculo);
  root.querySelector('[data-menor-nuevo]')?.addEventListener('click', openRegistrarMenor);
  root.querySelectorAll('[data-menor]').forEach((b) => b.addEventListener('click', () => {
    const m = MEN().find((x) => x.id === b.dataset.menor);
    if (own && m.estado === 'revision') { toast(`${m.nombre} todavía está en revisión. Podrás ingresar cuando se valide el documento de parentesco.`); return; }
    const q = new URLSearchParams({ persona: m.id, ...(qs().get('role') ? { role: qs().get('role') } : {}), from: `perfil.html?${qs().toString()}` });
    window.location.href = `perfil.html?${q.toString()}`;
  }));

  /* Acciones de organismo: Aprobar / Rechazar / Desvincular (sobre los datos reales). */
  const solicitudDe = (org) => allSolicitudes().find((x) => x.deportistaId === PERSONA_ID && x.clubId === org && x.tipo !== 'retiro' && x.estado === 'Enviada') || crearSolicitud(PERSONA_ID, org);
  const quien = { responsable: getOrganismo(viewer.orgId)?.nombre || '', rol: qs().get('role') || '' };
  root.querySelectorAll('[data-org]').forEach((b) => b.addEventListener('click', () => {
    const [act, k, id] = b.dataset.org.split(':');
    const it = lista(k).find((x) => x.id === id);
    const fem = k === 'af';
    const que = fem ? 'la afiliación' : 'el vínculo';
    if (act === 'aprobar') {
      if (fem) resolverAfiliacion(solicitudDe(it.org).id, 'aprobada', quien);
      else resolverVinculo(PERSONA_ID, it.org, 'Vinculada', quien);
      render();
      toast(`${fem ? 'Afiliación aprobada' : 'Vínculo aprobado'}: ${P.corto} queda vinculada a ${it.nombre}.`);
      return;
    }
    confirmDlg(act === 'rechazar' ? {
      title: `Rechazar ${que}`, text: `${P.corto} recibe el rechazo con el motivo y puede volver a solicitar${fem ? 'la' : 'lo'}.`, ok: 'Rechazar', danger: true, motivo: true,
      onOk: (motivo) => {
        if (fem) resolverAfiliacion(solicitudDe(it.org).id, 'rechazada', { ...quien, motivo });
        else resolverVinculo(PERSONA_ID, it.org, 'Rechazada', { ...quien, motivo });
        render(); toast(`${fem ? 'Afiliación rechazada' : 'Vínculo rechazado'}.`);
      }
    } : {
      title: `Desvincular de ${it.nombre}`,
      text: fem ? `${P.corto} deja de estar afiliada a ${it.nombre} y pierde la liga y la federación que heredó de ese club. Sus otros clubes no cambian.` : `${P.corto} deja de figurar como personal de apoyo de ${it.nombre}.`,
      ok: 'Desvincular', danger: true, motivo: true,
      onOk: (motivo) => {
        if (fem) desvincularPorClub(PERSONA_ID, { clubId: it.org, motivo, responsable: quien.responsable });
        else resolverVinculo(PERSONA_ID, it.org, 'Terminada', { ...quien, motivo, fin: 'desvinculacion' });
        render(); toast('Desvinculación registrada.');
      }
    });
  }));

  root.querySelectorAll('[data-acct]').forEach((b) => b.addEventListener('click', () => {
    state.activa = !state.activa; render(); toast(state.activa ? 'Cuenta activada.' : 'Cuenta inactivada.');
  }));
  root.querySelectorAll('[data-addrole]').forEach((b) => b.addEventListener('click', openAddRole));
  root.querySelector('[data-pend-toggle]')?.addEventListener('click', () => { state.pendOpen = !state.pendOpen; render(); root.querySelector('[data-pend-toggle]')?.focus(); });
  root.querySelectorAll('[data-ejemplo]').forEach((b) => b.addEventListener('click', () => {
    const u = qs();
    if (b.dataset.ejemplo === ALL_ROLES.join(',')) u.delete('roles'); else u.set('roles', b.dataset.ejemplo);
    history.replaceState(null, '', '?' + u.toString());
    personaRoles = parseRoles();
    state.editing = null;
    render();
    root.querySelector(`[data-ejemplo="${b.dataset.ejemplo}"]`)?.focus();
  }));
  root.querySelectorAll('[data-soon]').forEach((b) => b.addEventListener('click', () => toast(`${b.dataset.soon}: disponible en una próxima fase de la demo.`)));
}

/* ─── Diálogos ─── */
function dialog(html, cls = '') {
  document.getElementById('mpDlg')?.remove();
  const d = document.createElement('dialog');
  d.id = 'mpDlg'; d.className = `mp-dlg ${cls}`; d.setAttribute('aria-labelledby', 'mpDlgT');
  d.innerHTML = SPRITE + html;
  document.body.appendChild(d);
  d.addEventListener('click', (e) => { if (e.target === d || e.target.closest('[data-close]')) d.close(); });
  d.addEventListener('close', () => d.remove());
  d.showModal();
  return d;
}
function openAddRole() {
  const ADD = {
    deportista: ['Elige tu deporte. Luego puedes solicitar afiliación a un club.', 'Agregar otro deporte', 'menor'],
    tutor: ['Registra a un menor de edad a tu cargo.', 'Registrar otro menor'],
    apoyo: ['Elige tu rol específico: entrenador, médico, fisioterapeuta…', 'Agregar otro rol específico']
  };
  const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">Agregar rol</h2><p>El rol se agrega a este mismo perfil.</p></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic('x')}</button></div>
    <div class="mp-opts">${ALL_ROLES.map((r) => {
      const ya = personaRoles.includes(r);
      return `<button class="mp-opt" type="button" data-opt="${r}"><span class="mp-tile">${ic(ROLE[r].icon)}</span>
        <span class="mp-opt__main"><strong>${ya ? ADD[r][1] : ROLE[r].name}</strong><span class="mp-opt__d">${ya ? `Ya eres ${ROLE[r].name.toLowerCase()}. ` : ''}${ADD[r][0]}</span></span></button>`;
    }).join('')}</div>
    <p class="mp-dlg__rule">Agregar un rol no requiere aprobación. El vínculo con un organismo sí: la afiliación a un club o el vínculo con una liga lo aprueba ese organismo.</p>`);
  d.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => {
    const r = b.dataset.opt; d.close();
    if (personaRoles.includes(r) && r === 'tutor') { go('menores'); return; }
    if (personaRoles.includes(r) && r === 'apoyo') { go('vinculos'); return; }
    toast(`${b.querySelector('strong').textContent}: disponible en una próxima fase de la demo.`);
  }));
}
/* ─── Fase 2 · diálogos de afiliación, vínculo y menor ─── */
/* Buscador común: lista organismos Activos por nombre o NIT (mín. 3 letras) y elige uno. */
function buscadorDlg({ title, sub, placeholder, buscar, meta, ok, onOk, rule }) {
  let sel = null;
  const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">${esc(title)}</h2><p>${esc(sub)}</p></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic('x')}</button></div>
    <div class="mp-dlg__b mp-busca"><input id="mpBusca" type="search" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" autocomplete="off">
      <ul class="mp-busca__res" id="mpBuscaRes" role="listbox" aria-label="Resultados"></ul></div>
    ${rule ? `<p class="mp-dlg__rule">${rule}</p>` : ''}
    <div class="mp-dlg__f"><button class="mp-btn" type="button" data-close>Volver</button>
      <button class="mp-btn mp-btn--pri" type="button" data-ok disabled>${esc(ok)}</button></div>`);
  const inp = d.querySelector('#mpBusca'); const res = d.querySelector('#mpBuscaRes'); const btn = d.querySelector('[data-ok]');
  const pinta = () => {
    const q = inp.value.trim();
    const items = q.length < 3 ? [] : buscar(q).slice(0, 8);
    res.innerHTML = q.length < 3 ? '<li class="mp-busca__hint">Escribe al menos 3 letras del nombre o del NIT.</li>'
      : items.length ? items.map((o) => `<li><button type="button" role="option" aria-selected="${sel === o.id}" class="mp-busca__opt${sel === o.id ? ' is-sel' : ''}" data-id="${o.id}"><strong>${esc(o.nombre)}</strong><span>${esc(meta(o))}</span></button></li>`).join('')
      : '<li class="mp-busca__hint">No encontramos un organismo activo con ese nombre. Si debería estar, comunícate con soporte.</li>';
    res.querySelectorAll('[data-id]').forEach((b) => b.addEventListener('click', () => { sel = b.dataset.id; btn.disabled = false; pinta(); }));
  };
  inp.addEventListener('input', () => { sel = null; btn.disabled = true; pinta(); });
  pinta(); inp.focus();
  btn.addEventListener('click', () => { if (!sel) return; d.close(); onOk(sel); });
}
function openSolicitarAfiliacion() {
  const ya = new Set(AFS().filter((a) => ['vinculado', 'solicitada'].includes(a.estado)).map((a) => a.org));
  buscadorDlg({
    title: 'Solicitar afiliación', sub: 'Busca el club. Solo aparecen clubes activos en el SUID.', placeholder: 'Nombre o NIT del club',
    buscar: (q) => buscarClubesActivos(q).filter((c) => !ya.has(c.id)),
    meta: (c) => `${c.deporte} · ${c.ubicacion ? c.ubicacion.ciudad : ''} · ${(getOrganismo(c.parentId) || {}).nombre || ''}`,
    ok: 'Enviar solicitud', rule: 'El club aprueba la afiliación. Puedes estar en varios clubes; de cada uno heredas su liga y su federación.',
    onOk: (id) => { crearSolicitud(PERSONA_ID, id); render(); toast(`Solicitud enviada a ${getOrganismo(id).nombre}. El club la confirma desde su bandeja.`); }
  });
}
function openSolicitarVinculo() {
  const ya = new Set(VIS().filter((v) => ['vinculado', 'solicitado'].includes(v.estado)).map((v) => v.org));
  const n = (x) => String(x || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  buscadorDlg({
    title: 'Solicitar vínculo', sub: `Busca el organismo con el que trabajas como ${(P.rolApoyo || 'personal deportivo').toLowerCase()}: club, liga, federación o comité.`, placeholder: 'Nombre o NIT del organismo',
    buscar: (q) => allOrganismos().filter((o) => o.estado === 'Activo' && !ya.has(o.id) && (n(o.nombre).includes(n(q)) || n(o.nit).includes(n(q)))),
    meta: (o) => `${TIPO_TXT[o.tipo]} · ${o.deporte !== '—' ? o.deporte : o.sector || ''}`,
    ok: 'Enviar solicitud', rule: 'El organismo aprueba el vínculo. Mientras tanto queda «Solicitado».',
    onOk: (id) => { solicitarVinculo(PERSONA_ID, id, P.rolApoyo); render(); toast(`Solicitud de vínculo enviada a ${getOrganismo(id).nombre}.`); }
  });
}
/* Registrar menor: mismo flujo del perfil de sports (modal de dos pasos: Documentos y Datos básicos).
   Suma lo que sports no valida en el front: que sea menor de 18 y que el documento no esté registrado. */
function openRegistrarMenor() {
  const st = { paso: 1, d: { vinculo: '', tipoDoc: 'TI', numDoc: '', archivo: '', acepta: false, nombre: '', segNombre: '', apellido: '', segApellido: '', sexo: '', fechaNac: '', deporte: '', depto: 'Valle del Cauca', ciudad: '' } };
  const d = dialog('<div id="mpMenor"></div>', 'mp-dlg--form');
  const box = d.querySelector('#mpMenor');
  const campo = (id, label, html, req) => `<div class="mp-f"><label for="${id}">${label}${req ? ' <span aria-hidden="true">*</span>' : ''}</label>${html}<p class="mp-f__err" id="${id}Err" hidden></p></div>`;
  const inp = (id, v, type = 'text', extra = '') => `<input id="${id}" type="${type}" value="${esc(v)}" ${extra}>`;
  const sel = (id, v, opts, ph) => `<select id="${id}"><option value="">${ph || 'Selecciona…'}</option>${opts.map((o) => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
  const pinta = () => {
    const x = st.d;
    box.innerHTML = `
      <div class="mp-dlg__h"><div><h2 id="mpDlgT">Registrar menor</h2><p>Paso ${st.paso} de 2 · ${st.paso === 1 ? 'Documentos' : 'Datos básicos'}</p></div>
        <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic('x')}</button></div>
      <div class="mp-dlg__b">
        <div class="mp-alert">${ic('info', 'sm')}<span>Solo tú, como tutor registrado, podrás administrar el perfil del menor, editar sus datos sensibles y hacer sus inscripciones.</span></div>
        ${st.paso === 1 ? `<div class="mp-form">
          ${campo('mVinculo', 'Tipo de vínculo', sel('mVinculo', x.vinculo, ['Padre/Madre', 'Tutor legal'], 'Padre | Tutor'), true)}
          <div class="mp-form__row">${campo('mTipoDoc', 'Tipo de documento', sel('mTipoDoc', x.tipoDoc, ['TI', 'RC'], 'Tipo'), true)}${campo('mNumDoc', 'Documento del menor', inp('mNumDoc', x.numDoc, 'text', 'inputmode="numeric" placeholder="# Documento"'), true)}</div>
          ${campo('mArchivo', 'Adjuntar documento de parentesco', `<input id="mArchivo" type="file" accept=".pdf,.jpg,.jpeg,.png"><span class="mp-f__hint">${x.archivo ? `Adjunto: ${esc(x.archivo)}` : 'Registro civil / Sentencia de tutela (JPG, PNG o PDF). Máx 10 MB'}</span>`, true)}
          <label class="mp-check"><input id="mAcepta" type="checkbox"${x.acepta ? ' checked' : ''}> Declaro ser el tutor legal y autorizo el tratamiento de los datos del menor.</label>
          <p class="mp-f__err" id="mAceptaErr" hidden></p>
        </div>` : `<div class="mp-form">
          <div class="mp-form__row">${campo('mNombre', 'Nombre', inp('mNombre', x.nombre), true)}${campo('mSegNombre', 'Segundo nombre', inp('mSegNombre', x.segNombre))}</div>
          <div class="mp-form__row">${campo('mApellido', 'Apellido', inp('mApellido', x.apellido), true)}${campo('mSegApellido', 'Segundo apellido', inp('mSegApellido', x.segApellido))}</div>
          <div class="mp-form__row">${campo('mSexo', 'Sexo', sel('mSexo', x.sexo, ['Hombre', 'Mujer']), true)}${campo('mFechaNac', 'Fecha de nacimiento', inp('mFechaNac', x.fechaNac, 'date'), true)}</div>
          ${campo('mDeporte', 'Deporte', sel('mDeporte', x.deporte, catalogoDeportes()), true)}
          <div class="mp-form__row">${campo('mDepto', 'Departamento', inp('mDepto', x.depto), true)}${campo('mCiudad', 'Ciudad', inp('mCiudad', x.ciudad), true)}</div>
        </div>`}
      </div>
      <div class="mp-dlg__f"><button class="mp-btn" type="button" ${st.paso === 1 ? 'data-close' : 'data-atras'}>${st.paso === 1 ? 'Cancelar' : 'Atrás'}</button>
        <button class="mp-btn mp-btn--pri" type="button" data-sig>${st.paso === 1 ? 'Siguiente' : 'Registrar'}</button></div>`;
    box.querySelector('#mArchivo')?.addEventListener('change', (e) => { st.d.archivo = e.target.files[0] ? e.target.files[0].name : ''; lee(); pinta(); });
    box.querySelector('[data-atras]')?.addEventListener('click', () => { lee(); st.paso = 1; pinta(); });
    box.querySelector('[data-sig]').addEventListener('click', siguiente);
  };
  const val = (id) => box.querySelector('#' + id)?.value.trim() ?? '';
  const lee = () => {
    const x = st.d;
    if (st.paso === 1) { x.vinculo = val('mVinculo'); x.tipoDoc = val('mTipoDoc'); x.numDoc = val('mNumDoc'); x.acepta = !!box.querySelector('#mAcepta')?.checked; }
    else { ['nombre', 'segNombre', 'apellido', 'segApellido', 'sexo', 'fechaNac', 'deporte', 'depto', 'ciudad'].forEach((k) => { x[k] = val('m' + k.charAt(0).toUpperCase() + k.slice(1)); }); }
  };
  const err = (id, msg) => { const e = box.querySelector('#' + id + 'Err'); if (e) { e.textContent = msg; e.hidden = false; } return true; };
  function siguiente() {
    lee(); box.querySelectorAll('.mp-f__err').forEach((e) => { e.hidden = true; });
    const x = st.d; let mal = false;
    if (st.paso === 1) {
      if (!x.vinculo) mal = err('mVinculo', 'Elige el tipo de vínculo.');
      if (!x.tipoDoc) mal = err('mTipoDoc', 'Elige el tipo.');
      if (!x.numDoc) mal = err('mNumDoc', 'El número de documento es obligatorio.');
      else if (allDeportistas().some((p) => String(p.numDoc) === x.numDoc)) mal = err('mNumDoc', 'Este documento ya está registrado en el SUID. Si es tu hijo o tu hija, comunícate con soporte para vincularlo.');
      if (!x.archivo) mal = err('mArchivo', 'Adjunta el documento de parentesco.');
      if (!x.acepta) mal = err('mAcepta', 'Debes aceptar para continuar.');
      if (!mal) { st.paso = 2; pinta(); }
      return;
    }
    ['mNombre', 'mApellido', 'mSexo', 'mFechaNac', 'mDeporte', 'mDepto', 'mCiudad'].forEach((id) => { if (!val(id)) mal = err(id, 'Campo obligatorio.'); });
    const e = edadDe(x.fechaNac);
    if (x.fechaNac && (e == null || e >= 18)) mal = err('mFechaNac', 'Tiene 18 años o más: debe registrarse por su cuenta en el registro público.');
    if (x.fechaNac && e != null && e < 0) mal = err('mFechaNac', 'La fecha no puede ser futura.');
    if (mal) return;
    const nombre = [x.nombre, x.segNombre, x.apellido, x.segApellido].filter(Boolean).join(' ');
    registrarMenor(PERSONA_ID, { nombre, tipoDoc: x.tipoDoc, numDoc: x.numDoc, deporte: x.deporte, fechaNac: x.fechaNac, parentesco: x.vinculo, sexo: x.sexo, docsEstado: 'revision', documentoParentesco: x.archivo, ubicacion: { depto: x.depto, ciudad: x.ciudad } });
    d.close();
    if (!personaRoles.includes('tutor')) personaRoles = parseRoles();
    go('menores');
    toast('Registro exitoso: el perfil del menor quedó vinculado a tu cuenta. Queda en revisión mientras se valida el documento de parentesco.');
  }
  pinta();
}

function confirmDlg({ title, text, ok, back = 'Volver', danger, motivo, onOk }) {
  const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">${esc(title)}</h2></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic('x')}</button></div>
    <p class="mp-dlg__b">${esc(text)}</p>
    ${motivo ? `<div class="mp-dlg__b"><label for="mpMotivo" style="display:block;font-weight:600;color:var(--naowee-color-text-primary);margin:12px 0 6px">Motivo</label>
      <textarea id="mpMotivo" rows="3" style="width:100%;border:1px solid var(--naowee-color-border-primary);border-radius:var(--naowee-border-radius-actions-inputs-default);padding:10px 12px;font:inherit;resize:vertical"></textarea></div>` : ''}
    <div class="mp-dlg__f"><button class="mp-btn" type="button" data-close>${esc(back)}</button>
      <button class="mp-btn ${danger ? 'mp-btn--danger-solid' : 'mp-btn--pri'}" type="button" data-ok>${esc(ok)}</button></div>`);
  d.querySelector('[data-ok]').addEventListener('click', () => {
    const m = d.querySelector('#mpMotivo');
    if (m && !m.value.trim()) { m.focus(); m.style.borderColor = 'var(--naowee-color-red-700)'; m.setAttribute('aria-invalid', 'true'); return; }
    d.close(); onOk(m ? m.value.trim() : '');
  });
}

let _t;
function toast(msg) {
  let el = document.getElementById('evToast');
  if (!el) { el = document.createElement('div'); el.id = 'evToast'; el.setAttribute('role', 'status'); document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('is-visible');
  clearTimeout(_t); _t = setTimeout(() => el.classList.remove('is-visible'), 2800);
}

/* ─── Notas para devs (solo demo) ─── */
const DEVNOTES = {
  quien: { title: 'Quién mira (visor)', sections: [
    { title: 'Hoy en el perfil migrado', items: ['<code>suite-mf-profile</code> (<code>ProfilePage.tsx</code>, ruta v2 <code>/home/profile/:userCode</code>) solo distingue perfil propio y administrador; hoy solo se abre desde Incentivos (guard ROOT e INCENTIVES_*).', 'No existe la vista de un organismo sobre una persona: un club no puede abrir el perfil de su deportista ni de su entrenador.'] },
    { title: 'Qué cambia', items: ['Un solo componente con un <b>visor</b>: propio (edita, agrega rol, Pendientes), organismo (solo lectura, solo las facetas ligadas a su jurisdicción, nunca tutor/menores; Aprobar/Rechazar sobre lo Solicitado a ese organismo y Desvincular sobre lo Vinculado), administrador (Consulta de usuario, ve y edita todo) y Comité Olímpico/ROOT (habilita Análisis cualitativo).', 'Desvincular desde el perfil: P-04, decisión de Producto pendiente de ratificar.', 'Un organismo ve todos los datos de la persona, sus facetas de deportista y los vínculos de apoyo con él o con organismos debajo, y la lista de menores a cargo en solo lectura. Ver «Quién puede ver este perfil».'] },
    { title: 'Qué falta en el back', items: ['Un endpoint de lectura para un organismo con jurisdicción (hoy <code>GET /v1/user/{code}</code> es propio o admin con <code>user:update_athlete</code>) que filtre campos por visor.', 'Afiliaciones y vínculos con estado y organismo dueño, para saber qué acciones mostrar.'] },
    { title: 'Solo demo', items: ['El visor sale de <code>?role=</code>: PERSONA, CLUB/LIGA/FEDERACION, MINDEPORTE (alias <code>?modo=consulta</code>) y <code>?visor=comite</code>.'] }
  ] },
  acceso: { title: 'Quién puede ver este perfil', sections: [
    { title: 'Regla (Arquitectura · Juan Manuel Armero, 08-10-2026)', items: [
      '<b>Ministerio</b> y <b>Comité Olímpico</b>: cualquier persona, todo el perfil. El Ministerio entra como administrador (Consulta de usuario: estado de la cuenta y edición).',
      '<b>Análisis cualitativo</b>: solo Comité Olímpico y ROOT. Nadie más (ni el Ministerio ni otros organismos).',
      '<b>Federación / Liga / Club</b>: solo personas dentro de su jerarquía deportiva (afiliadas o vinculadas a él o a un organismo debajo, por herencia) y, para clubes, quien le envió una solicitud pendiente. Cualquier otra persona: estado «Esta persona no está vinculada a…» en vez del perfil.',
      'Un organismo ve todos los datos (Datos, Ubicación, Contacto, Salud, Sociodemográfico, Datos adicionales, Biometría, Trayectoria), las afiliaciones y los vínculos de apoyo relacionados con él o con organismos debajo.',
      '<b>Menores a cargo</b>: el organismo ve la lista (nombre, documento, edad, deporte, vínculo, estado) en solo lectura. Abrir el perfil de un menor sigue la misma regla de jurisdicción: si no está en su árbol, la fila dice «Fuera de tu jurisdicción» en vez de «Ver perfil».',
      '<b>Ver el subárbol, actuar sobre el nivel inmediato</b>: solo el organismo directo aprueba, rechaza o desvincula; los niveles superiores solo ven.'] },
    { title: 'Qué falta en el back', items: ['Resolver la jurisdicción del visor contra las afiliaciones y vínculos de la persona (incluidas las solicitudes pendientes hacia un club) antes de devolver el perfil.'] },
    { title: 'Solo demo', items: ['<code>?role=LIGA&persona=ajena</code> muestra el estado fuera de jurisdicción. Laura está en Club Patín Cali → Liga de Patinaje del Valle → Fed. Colombiana de Patinaje, así que los tres la ven.', 'Con Club Patín Cali: Tomás (Patinaje) está afiliado al club y se puede abrir; Sara (Natación) no está en su árbol.'] }
  ] },
  perfil: { title: 'Perfil · datos personales', sections: [
    { title: 'Hoy en el perfil migrado', items: ['Datos de <code>GET /v1/user/{code}</code>; guardado con <code>PATCH /v1/user/{code}</code> enviando <code>individual_data</code> (permiso <code>user:update_athlete</code>).', 'Ya muestra secciones por <code>roles.includes(...)</code> (multi-rol listo para gating), pero la etiqueta del encabezado usa <code>roles[0]</code>. Las vistas viejas (perfil propio y "Consulta de usuario") usan <code>roles[0]</code> en todo.', 'La biometría sale a cualquiera, vacía si no es deportista.'] },
    { title: 'Qué cambia', items: ['Encabezado con todos los roles como chips (sin selector de rol). Datos comunes una sola vez: «Son los mismos para todos tus roles».', 'Biometría como grupo compacto en la franja del encabezado, solo con rol deportista y solo en Perfil y en las secciones de deportista.', '«Editar» es un botón secundario neutro; el naranja queda para lo activo y «Agregar rol».'] },
    { title: 'Edición desde un organismo', items: ['Reunión con Producto del 2026-10-09: club, liga y federación editan solo los <b>datos básicos</b> de contacto de la persona (dirección, teléfono y correo), en las pestañas Ubicación y Contacto. Los datos personales adicionales (identidad de género, orientación sexual, salud, etc.) quedan bajo control de la persona: el organismo solo los consulta.', 'El cambio queda registrado a nombre del organismo.', 'Correo (decisión 2026-10-14): el organismo lo cambia solo mientras la persona no haya activado su cuenta (<code>cuentaActivada: false</code> en los creados por un organismo). Después lo cambia solo ella, porque el reclamo de perfil manda el acceso al correo guardado.', 'Al crear son obligatorios documento, nombres, fecha de nacimiento, sexo, deporte y correo.'] },
    { title: 'Qué falta en el back', items: ['Nada para los datos; el encabezado debe leer <code>roles[]</code> completo en vez de <code>roles[0]</code>.', 'Un permiso de edición acotado para el organismo (solo dirección, teléfono y correo de personas de su jurisdicción).'] }
  ] },
  trayectoria: { title: 'Trayectoria', sections: [
    { title: 'Hoy en el perfil migrado', items: ['sport-records <code>GET /sport-records/api/v2/athletes/by-document/{doc}/history?view=trajectory</code>. Pestañas Trayectoria / Medallería.'] },
    { title: 'Qué cambia', items: ['Bloque «Último resultado» con la posición, la medalla y el medallero (oro · plata · bronce) arriba de la tabla. Es el único acento fuerte de la página.'] },
    { title: 'Qué falta en el back', items: ['Nada nuevo: el último resultado y el medallero se derivan de la misma respuesta.'] }
  ] },
  afiliaciones: { title: 'Afiliaciones (deportista)', sections: [
    { title: 'Hoy en el perfil migrado', items: ['No existen en el perfil. Viven aparte (Mi afiliación) y el modelo está en nao-docs (entidad de afiliación).'] },
    { title: 'Qué cambia', items: ['Lista de clubes con estado Vinculado / Solicitada / Rechazada / Desvinculado. En lo Solicitado, «Cancelar solicitud» en la misma fila y la nota «Lo aprueba el club».', 'El badge de la navegación cuenta solo lo pendiente.'] },
    { title: 'Fase 2 · en la demo ya funciona', items: ['Sale de la relación de afiliación (shared/organismos-data.js), no de datos fijos. «Solicitar afiliación» busca clubes Activos y crea la solicitud que el club ve en su bandeja.', 'Varios clubes a la vez: cada fila Vinculada muestra la cadena que hereda (liga · federación). «Retirarme» pide la baja de ESE club; el club la confirma y los otros clubes no cambian.', 'El organismo visor aprueba, rechaza (motivo) o desvincula sobre los datos reales; queda en la trazabilidad.', 'Vigencia (decisión 2026-10-14): «desde» y «hasta» son fechas de calendario sin hora. «Desde» es el día en que se aprueba; «hasta», el día en que termina (retiro, desvinculación o cancelación). Sin fechas futuras ni retroactivas. Vigente = Vinculada y sin «hasta».'] },
    { title: 'Qué falta en el back', items: ['Exponer las afiliaciones de la persona (varias, en clubes distintos) en el perfil, y cancelar una solicitud.'] }
  ] },
  analisis: { title: 'Análisis cualitativo', sections: [
    { title: 'Hoy en el perfil migrado', items: ['<code>…/evaluations</code> de sport-records; datos del lakehouse, no en vivo. Lo ven Comité Olímpico y ROOT.'] },
    { title: 'Qué cambia', items: ['Etiqueta visible «Solo Comité Olímpico y ROOT», sin candado. Para el resto de visores la sección no existe (no se muestra bloqueada).'] },
    { title: 'Qué falta en el back', items: ['Nada; el gating es el mismo.'] }
  ] },
  menores: { title: 'Menores a cargo (tutor legal)', sections: [
    { title: 'Hoy en el perfil migrado', items: ['Solo existían en el perfil viejo: <code>GET/POST /v1/user/me/dependents</code>, <code>GET/PATCH /v1/user/me/dependents/{code}</code>; estados Registrado / En revisión / Pendiente / Inactivo. En el perfil nuevo están marcados como no implementados.', 'El gateway ya acepta <code>GET /v1/user/{code}?include_dependents=true</code> (devuelve <code>dependents[]</code> y <code>guardians[]</code>); no está verificado que user-auth-ms lo responda para un usuario distinto del de la sesión.'] },
    { title: 'Qué cambia', items: ['Una sola tarjeta con filas (nombre, T.I., edad, deporte, vínculo, estado, Ver perfil) y la nota de qué significa «En revisión».', 'Regla: un menor solo puede ser deportista y lo administra su tutor. Un organismo ve la lista en solo lectura y abre solo a los menores de su jurisdicción.'] },
    { title: 'Fase 2 · Registrar menor (mismo flujo de sports)', items: ['Modal de dos pasos, igual al de <code>/profile</code> de suite-web-v2: <b>Documentos</b> (tipo de vínculo Padre | Tutor, documento TI o RC, documento de parentesco adjunto, consentimiento) y <b>Datos básicos</b> (nombres, sexo, fecha de nacimiento, deporte, departamento y ciudad). En sports va a <code>POST /user/me/dependents</code> y sube el parentesco por documentation-ms.', 'Suma lo que sports no valida en el front: menor de 18 por la fecha de nacimiento y documento no registrado ya en el SUID.', 'Queda <b>En revisión</b> mientras se valida el documento de parentesco; el tutor no puede entrar a su perfil hasta entonces (como en sports). Después, «Gestionar perfil» abre el perfil del menor con el aviso de que lo administra su tutor.', 'Solo el tutor registra al menor (propuesta de P-21, pendiente con Negocio). El menor queda autodeclarado: no pasa por la bandeja de ningún organismo.'] },
    { title: 'Qué falta en el back', items: ['Confirmar <code>include_dependents</code> para el visor administrador.'] }
  ] },
  vinculos: { title: 'Vínculos (personal de apoyo)', sections: [
    { title: 'Hoy en el perfil migrado', items: ['Solo existe <code>support_role_code/name</code>; la tarjeta «Rol / Principal» cae en «Personal deportivo» si no llega.', 'No existen profesión, certificaciones ni vínculos con organismos. El rol de apoyo multi-valor estaba en la vista vieja y no en la nueva.'] },
    { title: 'Qué cambia', items: ['Rol de apoyo y organismos con estado. Ser personal de apoyo no requiere aprobación; el vínculo con una liga o un club sí.'] },
    { title: 'Fase 2 · en la demo ya funciona', items: ['«Solicitar vínculo» busca cualquier organismo Activo (club, liga, federación o comité, P-05). Usa la misma relación de afiliación con <code>tipo: personal</code>.', 'Ese organismo lo ve en su bandeja, en «Solicitudes de vínculo», y aprueba o rechaza con motivo. Un vínculo de personal no cuenta como club del deportista.'] },
    { title: 'Qué falta en el back', items: ['Entidad de vínculo persona–organismo (estado, fechas, quién aprueba) y rol de apoyo multi-valor.'] }
  ] },
  pendientes: { title: 'Pendientes', sections: [
    { title: 'Hoy en el perfil migrado', items: ['No existe. El riel derecho tenía Biometría y «Rol / Principal».'] },
    { title: 'Qué cambia', items: ['Reemplaza a «Mis roles y vínculos» (repetía los roles por tercera vez). Bloque compacto arriba de los datos: solo lo que espera algo, una fila por pendiente con su acción; se colapsa si son más de 3 y sin pendientes no se muestra. Solo en el perfil propio.'] },
    { title: 'Qué falta en el back', items: ['Se arma con las afiliaciones, los vínculos y los menores; no necesita endpoint propio si esos tres existen.'] }
  ] },
  consulta: { title: 'Consulta de usuario (administrador)', sections: [
    { title: 'Hoy en el perfil migrado', items: ['La vista vieja tenía y la nueva no: estado Activo/Inactivo, «Volver al listado», rol de apoyo multi-valor y edición de organizaciones.'] },
    { title: 'Qué cambia', items: ['Mismo componente que el perfil propio con banner, «Volver al listado», estado de la cuenta y textos en tercera persona. Ve todas las facetas y puede editar.'] },
    { title: 'Qué falta en el back', items: ['Activar/inactivar cuenta desde el perfil y auditoría de los cambios del administrador.', 'Documentos y Configuración no tienen funcionalidad en ninguna versión.'] }
  ] }
};

/* Una sola nota en la barra: junta las de visor, acceso y consulta. */
const merge = (title, keys) => ({ title, sections: keys.flatMap((k) => DEVNOTES[k].sections.map((x) => ({ title: `${DEVNOTES[k].title} · ${x.title}`, items: x.items }))) });
DEVNOTES.barAdmin = merge('Consulta de usuario y visor', ['consulta', 'acceso', 'quien']);
DEVNOTES.barVisor = merge('Quién mira y quién puede ver', ['acceso', 'quien']);
DEVNOTES.barOwn = merge('Quién mira y quién puede ver', ['quien', 'acceso']);

/* ─── Arranque ─── */
export function mountPerfil(el) {
  root = el;
  if (!document.getElementById('mpSprite')) {
    const s = document.createElement('div'); s.id = 'mpSprite'; s.innerHTML = SPRITE; document.body.prepend(s);
  }
  root.classList.add('mp');
  render();
  let raf;
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(syncTabFades); });
}
