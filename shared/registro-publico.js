/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — REGISTRO PÚBLICO (v1.5.0)
   Réplica del flujo /user-register de suite-web-v2 (hoy en el servicio de
   sports), ajustada a la jerarquía de organizaciones acordada con Negocio
   (nao-docs PR #30–#32) para migrarlo al servicio de SUID:
     · Persona → Deportista · Tutor · Personal deportivo. Cuenta activa de
       inmediato, sin bandeja. Pasos: Básicos · Deportivos (solo deportista) ·
       Sociodemográfico · Contacto.
     · Entidad → Federación · Liga · Club. Elige organismo superior Activo y
       deportes dentro de los del superior; queda En revisión en la bandeja de
       su superior. Pasos: Básicos · Documentos · Sede y contacto.
   Notas para devs (Solo demo) por paso: shared/devnotes.js.
   ═══════════════════════════════════════════════════════════════ */
import { allDeportistas, allOrganismos, getOrganismo, activosDeTipo, comitePorSector, addOrganismo, auditLog, readStore, writeStore } from './organismos-data.js';
import { mountDevnotes } from './devnotes.js?v=1.5.0';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const norm = (s) => [...String(s == null ? '' : s)].map((c) => c.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()).join('');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function applyMask(type, raw) {
  if (!raw) return '';
  if (type === 'tel') return String(raw).replace(/[^0-9+\-()\s]/g, '');
  if (type === 'numeric') return String(raw).replace(/[^0-9]/g, '');
  if (type === 'email') return String(raw).replace(/\s/g, '').toLowerCase();
  return String(raw);
}
function fileSizeFmt(b) { return b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(0) + ' KB' : (b / 1048576).toFixed(1) + ' MB'; }

const I = {
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  bang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>',
  api: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  athlete: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="M4 17l4-1 2-4 4 2 1 4"/><path d="M10 12l-2 5"/></svg>',
  staff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M17 11l2 2 4-4"/><path d="M2 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/></svg>',
  entity: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2"/><line x1="3" y1="9.5" x2="21" y2="9.5"/><line x1="8" y1="2.5" x2="8" y2="6.5"/><line x1="16" y1="2.5" x2="16" y2="6.5"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
};

const edadDe = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return null; const hoy = new Date(); let e = hoy.getFullYear() - (+m[1]); const mo = (hoy.getMonth() + 1) - (+m[2]); if (mo < 0 || (mo === 0 && hoy.getDate() < (+m[3]))) e--; return e; };
const edadTxt = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return ''; const hoy = new Date(); let meses = (hoy.getFullYear() - +m[1]) * 12 + (hoy.getMonth() + 1 - +m[2]); if (hoy.getDate() < +m[3]) meses--; return meses < 0 ? '' : `${Math.floor(meses / 12)} años ${meses % 12} meses`; };
I.person = I.athlete; I.company = I.entity;
I.guardian = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M2 21v-2a5 5 0 0 1 10 0v2"/><path d="M13 21v-1.5a4 4 0 0 1 8 0V21"/></svg>';
I.trophy = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>';
I.flag = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/></svg>';
I.shield = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
I.spin = '<svg class="rp-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>';

/* ═══════════════ Catálogos ═══════════════
   Valores tal cual los devuelve staging (GET /catalogs/*) salvo donde se marca. */
const opt = (arr) => arr.map((x) => (Array.isArray(x) ? { v: x[0], t: x[1] } : { v: x, t: x }));
const CAT = {
  tipoDoc: opt([['CC', 'CC'], ['CE', 'CE'], ['PA', 'PA']]),
  sexo: opt([['H', 'Hombre'], ['M', 'Mujer']]),
  nacionalidad: opt([['CO', 'Colombia'], ['VE', 'Venezuela'], ['EC', 'Ecuador'], ['PE', 'Perú'], ['BR', 'Brasil'], ['AR', 'Argentina'], ['MX', 'México'], ['US', 'Estados Unidos'], ['ES', 'España'], ['OT', 'Otro país']]),
  rolApoyo: opt(['Asistente Técnico', 'Auxiliar Discapacidad', 'Delegado', 'Directivo', 'Docente/Asistente', 'Docente/Entrenador', 'Fisioterapeuta', 'Kinesiólogo', 'Médico', 'Otros', 'Preparador Físico', 'Preparador de Porteros', 'Utilero']),
  tipoDeporte: opt([['CONJ', 'Conjunto'], ['IND', 'Individual'], ['PARA', 'Paradeporte']]),
  genero: opt(['Femenino', 'Masculino', 'Transgénero', 'No binario', 'No aplica', 'Otra']),
  orientacion: opt(['Agénero', 'Arromántico', 'Asexual', 'Bisexual', 'Gay', 'Heterosexual', 'Intersexual', 'Lesbiana', 'No aplica', 'Otra', 'Prefiero no decirlo', 'Queer', 'Transexual']),
  discapacidad: opt(['Ninguna', 'Auditiva', 'Física', 'Intelectual (Cognitiva)', 'Múltiple', 'No aplica', 'Parálisis Cerebral', 'Prefiero no decirlo', 'Psicosocial', 'Sordo-Ceguera', 'Visual']),
  etnia: opt([['NIN', 'Ninguna de las anteriores'], ['CAM', 'Comunidades campesinas'], ['ROM', 'Gitanos o Rrom'], ['AFRO', 'Negro(a) afrodescendiente afrocolombiano(a)'], ['NA', 'No aplica'], ['OTR', 'Otro'], ['PAL', 'Palenquero(a)'], ['PND', 'Prefiero no decirlo'], ['IND', 'Pueblos indígenas (IND)'], ['RAI', 'Raizales']]),
  comunidad: opt(['Ninguno', 'Ambiká Pijao', 'Arhuacos', 'Awá', 'Emberá Chamí', 'Nasa', 'Wayuu', 'Zenú']),
  victima: opt([['YES', 'Sí'], ['NO', 'No'], ['NA', 'No aplica'], ['PND', 'Prefiero no decirlo']]),
  priorizacion: opt(['Mujeres en estado de embarazo', 'Personas adultas mayores', 'Periodistas', 'Niños niñas y adolescentes', 'Personas con Discapacidad', 'Veteranos de la fuerza pública', 'Ninguno']),
  victimizacion: opt(['Ninguna', 'Abandono o despojo forzado de tierras', 'Acto terrorista / atentados / combates / enfrentamientos / hostigamientos', 'Amenaza', 'Homicidio masacre', 'Minas antipersonal, munición sin explotar, artefacto explosivo improvisado', 'Perdida de bienes muebles o inmuebles', 'Vinculación niños niñas adolescentes a actividades relacionadas con grupos armados']),
  zona: opt([['U', 'Urbano'], ['R', 'Rural']]),
  naturaleza: opt(['Pública', 'Privada', 'Mixta']),
  tamano: opt(['Micro, pequeñas y medianas empresas', 'Grandes Empresas', 'Organizaciones sin ánimo de lucro', 'No aplica']),
  sector: opt([['Olímpico', 'Olímpico'], ['Paralímpico', 'Paralímpico'], ['Sordolímpico', 'Sordolímpico']]),
  ambito: opt([['departamental', 'Departamental'], ['distrital', 'Distrital']]),
  tipoClub: opt([['promotor', 'Club promotor'], ['profesional', 'Club profesional'], ['escuela', 'Escuela deportiva']])
};
const MUNICIPIOS = {
  'Antioquia': ['Medellín', 'Bello', 'Itagüí', 'Envigado', 'Rionegro', 'Apartadó'], 'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Puerto Colombia'],
  'Bogotá D.C.': ['Bogotá'], 'Bolívar': ['Cartagena', 'Magangué', 'Turbaco'], 'Boyacá': ['Tunja', 'Duitama', 'Sogamoso'], 'Caldas': ['Manizales', 'La Dorada', 'Chinchiná'],
  'Cundinamarca': ['Soacha', 'Facatativá', 'Zipaquirá', 'Chía', 'Girardot', 'Fusagasugá'], 'Meta': ['Villavicencio', 'Acacías', 'Granada'], 'Nariño': ['Pasto', 'Tumaco', 'Ipiales'],
  'Risaralda': ['Pereira', 'Dosquebradas', 'Santa Rosa de Cabal'], 'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Barrancabermeja'], 'Tolima': ['Ibagué', 'Espinal', 'Melgar'],
  'Valle del Cauca': ['Cali', 'Buenaventura', 'Palmira', 'Tuluá', 'Cartago', 'Buga', 'Jamundí']
};
const DEPTOS = Object.keys(MUNICIPIOS).sort((a, b) => a.localeCompare(b, 'es'));

/* Deportes por federación (PR nao-docs #32): una federación gobierna uno o más
   deportes del catálogo; un deporte pertenece a una sola federación. El seed solo
   trae `deporte`; estas son las federaciones con varios deportes en catalog-ms. */
const DEPORTES_POR_FED = {
  'FED-038': ['Natación', 'Natación Artística', 'Polo Acuático'],
  'FED-040': ['Patinaje', 'Patinaje Artístico', 'Patinaje de Velocidad']
};
const deportesDe = (org) => {
  if (!org) return [];
  if (Array.isArray(org.deportes) && org.deportes.length) return org.deportes;
  if (DEPORTES_POR_FED[org.id]) return DEPORTES_POR_FED[org.id];
  return org.deporte && org.deporte !== '—' ? [org.deporte] : [];
};
const FEDERACIONES = () => allOrganismos().filter((o) => o.tipo === 'federacion');
/* Catálogo de deportes = unión de los deportes de las federaciones (demo; el real es GET /sports). */
/* Solo demo: deportes del catálogo que aún no tienen federación, para poder probar el alta de una federación. */
const SIN_FEDERACION = ['Breaking', 'Flag Football', 'Pádel', 'Skateboarding'];
const CATALOGO_DEPORTES = () => [...new Set([...FEDERACIONES().flatMap(deportesDe), ...SIN_FEDERACION])].sort((a, b) => a.localeCompare(b, 'es'));
/* Dueño de cada deporte: federación existente que ya lo gobierna (bloquea duplicar). */
const duenoDeporte = (dep, sector) => FEDERACIONES().find((f) => f.sector === sector && deportesDe(f).includes(dep) && !['Rechazado', 'Cancelado'].includes(f.estado));
const CONJUNTO = ['Baloncesto', 'Balonmano', 'Béisbol', 'Fútbol', 'Fútbol de Salón', 'Hockey', 'Polo Acuático', 'Rugby', 'Softbol', 'Voleibol'];
const deportesPorTipo = (t) => {
  const all = CATALOGO_DEPORTES();
  if (t === 'CONJ') return all.filter((d) => CONJUNTO.includes(d));
  if (t === 'PARA') return ['Boccia', 'Goalball', 'Para Atletismo', 'Para Natación', 'Baloncesto en silla de ruedas'];
  return all.filter((d) => !CONJUNTO.includes(d));
};

/* Documentos de la búsqueda simulada (Solo demo). */
const DOC_MENOR = '1098765432';
const docConCuenta = (num) => allDeportistas().some((d) => String(d.numDoc) === String(num).trim()) || allOrganismos().some((o) => o.repLegal && String(o.repLegal.numDoc) === String(num).trim());
const ROL_TXT = { ATHLETE: 'Deportista', LEGAL_GUARDIAN: 'Tutor', SUPPORT_STAFF: 'Personal deportivo' };
const ENT_TXT = { federacion: 'Federación', liga: 'Liga', club: 'Club' };
const SUPERIOR_TXT = { federacion: 'comité', liga: 'federación', club: 'liga' };
/* Rol de la demo que ve la bandeja de cada superior (para el enlace del resultado). */
const ROL_DE_ANCLA = { COC: 'COMITE', 'FED-040': 'FEDERACION', 'LIG-001': 'LIGA' };

/* ═══════════════ Estado ═══════════════ */
const blankD = () => ({
  tipoDoc: 'CC', numDoc: '', nombre: '', segNombre: '', apellido: '', segApellido: '', fechaNac: '', rolApoyo: '', sexo: '', nacionalidad: 'CO',
  tipoDeporte: '', deporte: '',
  genero: '', orientacion: '', discapacidad: '', etnia: '', comunidad: '', victima: '', priorizacion: '', victimizacion: '',
  depto: '', ciudad: '', zona: '', direccion: '', telefono: '', correo: '',
  nit: '', entNombre: '', naturaleza: '', tamano: '', sector: '', superiorId: '', filtroDeporte: '', deportes: [], ambito: '', tipoClub: '',
  repTipoDoc: 'CC', repDoc: '', repNombre: '', repApellido: '', repCorreo: '',
  docs: {}, aceptaPoliticas: false, aceptaComunicaciones: false
});
const STATE = { step: 0, created: false, _armedStep: null, nature: null, role: null, entTipo: null, lookup: 'idle', nitLookup: 'idle', result: null, d: blankD() };
const root = () => document.getElementById('rpRoot');
const isAthlete = () => STATE.role === 'ATHLETE';

/* Pasos: [clave, etiqueta del stepper | null]. Selección de naturaleza y de rol no
   llevan stepper (igual que /user-register). */
function stepDefs() {
  if (STATE.nature === 'entidad') return [['nature', null], ['enttipo', null], ['entbasicos', 'Básicos'], ['entdocs', 'Documentos'], ['contacto', 'Sede y contacto'], ['result', null]];
  const s = [['nature', null], ['role', null], ['basicos', 'Básicos']];
  if (isAthlete()) s.push(['deportivos', 'Deportivos']);
  return s.concat([['socio', 'Sociodemográfico'], ['contacto', 'Contacto'], ['result', null]]);
}
const stepKey = () => (stepDefs()[STATE.step] || ['result'])[0];
const lastStep = () => stepDefs().length - 2;

const DD_RERENDER = {
  depto: () => { STATE.d.ciudad = ''; },
  tipoDeporte: () => { STATE.d.deporte = ''; },
  etnia: () => { if (STATE.d.etnia !== 'IND') STATE.d.comunidad = ''; },
  victima: () => { if (STATE.d.victima !== 'YES') STATE.d.victimizacion = ''; },
  sector: () => { STATE.d.deportes = []; },
  superiorId: () => { STATE.d.deportes = []; },
  filtroDeporte: () => { STATE.d.superiorId = ''; STATE.d.deportes = []; },
  tipoDoc: () => { STATE.lookup = 'idle'; },
  fechaNac: () => {}
};

/* ═══════════════ Render ═══════════════ */
const SELECT_STEPS = ['nature', 'role', 'enttipo'];
const isSelectStep = () => SELECT_STEPS.includes(stepKey());
I.arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
I.arrowL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
function header() {
  const k = stepKey();
  let title = 'Crear cuenta', sub = 'Comienza indicando si eres persona natural o entidad jurídica', crumb = '';
  if (STATE.nature === 'persona') {
    sub = k === 'role' ? 'Regístrate como deportista, tutor o personal deportivo' : 'Regístrate con tu documento de identidad';
    if (k !== 'role' && STATE.role) { title = `Registro como ${ROL_TXT[STATE.role]}`; crumb = ROL_TXT[STATE.role]; }
  } else if (STATE.nature === 'entidad') {
    sub = 'Registra tu federación, liga o club';
    if (k !== 'enttipo' && STATE.entTipo) { title = `Registro como ${ENT_TXT[STATE.entTipo]}`; crumb = ENT_TXT[STATE.entTipo]; }
  }
  const center = isSelectStep();
  return `<div class="ur-head${center ? ' ur-head--center' : ''}">
      ${crumb ? `<div class="ur-crumbs">Registro ${I.chevR} ${esc(crumb)} ${I.chevR} <b>Formulario</b></div>` : ''}
      <h1 class="ur-title">${esc(title)}</h1><p class="ur-sub">${esc(sub)}</p>
    </div>
    <div class="ur-devnote-wrap${center ? ' ur-devnote-wrap--center' : ''}"><span class="wz-devnote" tabindex="0" role="button" data-devnote="${k}"></span></div>`;
}
function render() {
  if (STATE.created) return renderResult();
  root().innerHTML = `
    <div class="reg-wizard" id="rpWizard">
      ${header()}
      ${isSelectStep() ? '' : '<div class="ur-stepper" id="rpStepper"></div>'}
      <div class="reg-pane" id="rpPane"></div>
      <div id="rpFooter"></div>
    </div>`;
  renderStepper(); renderPane(); renderFooter(); bindPane();
}
function renderStepper() {
  const wrap = document.getElementById('rpStepper'); if (!wrap) return;
  const labeled = stepDefs().filter(([, l]) => l);
  const cur = labeled.findIndex(([k]) => k === stepKey());
  wrap.innerHTML = labeled.map(([, lbl], i) => `${i > 0 ? `<span class="ur-step-line${i <= cur ? ' ur-step-line--done' : ''}"></span>` : ''}<div class="ur-step${i < cur ? ' ur-step--done' : i === cur ? ' ur-step--active' : ''}"><span class="ur-step__n">${i < cur ? I.check : i + 1}</span><span class="ur-step__l">${lbl}</span></div>`).join('');
}
function renderPane() {
  const panes = { nature: paneNature, role: paneRole, basicos: paneBasicos, deportivos: paneDeportivos, socio: paneSocio, contacto: paneContacto, enttipo: paneEntTipo, entbasicos: paneEntBasicos, entdocs: paneEntDocs };
  document.getElementById('rpPane').innerHTML = panes[stepKey()]();
}
function renderFooter() {
  const f = document.getElementById('rpFooter');
  const k = stepKey();
  const sel = k === 'nature' ? STATE.nature : k === 'role' ? STATE.role : k === 'enttipo' ? STATE.entTipo : true;
  const label = k === 'role' ? 'Comenzar registro' : (STATE.step === lastStep() ? 'Crear cuenta' : 'Siguiente');
  const back = STATE.step > 0 ? `<button type="button" class="ur-back" id="rpBack">${I.arrowL} Volver</button>` : '';
  f.innerHTML = `<div class="ur-actions">${back}<button type="button" class="ur-btn${k === 'nature' ? ' ur-btn--block' : ''}" id="rpNext" ${sel ? '' : 'disabled'}>${label} ${k === 'nature' ? '' : I.arrowR}</button></div>
    ${isSelectStep() ? '<p class="ur-legal"><a href="#" onclick="return false">Politica de privacidad</a> y <a href="#" onclick="return false">Términos y condiciones</a></p>' : ''}`;
  document.getElementById('rpNext').addEventListener('click', next);
  document.getElementById('rpBack')?.addEventListener('click', () => { STATE._armedStep = null; STATE.step = Math.max(0, STATE.step - 1); render(); });
}

/* ── tarjetas (nwt-radio-card) ── */
function cards(key, items, value) {
  return `<div class="ur-cards">${items.map((t) => `
    <button type="button" class="ur-card ${value === t.v ? 'is-selected' : ''}" data-card="${key}" data-value="${t.v}">
      ${t.icon}<span class="ur-card__t">${t.t}</span><span class="ur-card__d">${t.d}</span>
    </button>`).join('')}</div>`;
}
function paneNature() {
  return cards('nature', [
    { v: 'persona', icon: I.person, t: 'Persona', d: 'Natural' },
    { v: 'entidad', icon: I.company, t: 'Entidad', d: 'Jurídica' }
  ], STATE.nature);
}
function paneRole() {
  return cards('role', [
    { v: 'ATHLETE', icon: I.athlete, t: 'Ciudadano', d: 'Deportista' },
    { v: 'LEGAL_GUARDIAN', icon: I.guardian, t: 'Padre', d: 'Tutor' },
    { v: 'SUPPORT_STAFF', icon: I.staff, t: 'Personal', d: 'Deportivo' }
  ], STATE.role);
}
function paneEntTipo() {
  return `${cards('entTipo', [
    { v: 'federacion', icon: I.trophy, t: 'Federación', d: 'Nacional' },
    { v: 'liga', icon: I.flag, t: 'Liga', d: 'Departamental' },
    { v: 'club', icon: I.shield, t: 'Club', d: 'Municipal' }
  ], STATE.entTipo)}
  ${msg('informative', '¿Eres un comité o un ente territorial?', 'Los comités los crea el Ministerio del Deporte. Los entes departamentales y municipales también los crea el Ministerio al invitarlos a sus eventos. No se registran por este formulario.')}`;
}

/* ── Persona · Básicos ── */
function lookupBox() {
  const st = STATE.lookup;
  if (st === 'checking') return `<div class="rp-lookup">${I.spin} Consultando registro en la base de datos...</div>`;
  if (st === 'ok') return `<div class="rp-lookup rp-lookup--ok">${I.check} No encontramos registros previos. Por favor completa el formulario.</div>`;
  return '';
}
function paneBasicos() {
  const d = STATE.d, st = STATE.lookup;
  const locked = st !== 'ok';
  const docField = `<div class="rp-doc" data-field="f-numDoc">
      <label class="naowee-textfield__label naowee-textfield__label--required">Tipo de documento</label>
      <div class="rp-doc__row">${ddInline('tipoDoc', CAT.tipoDoc, d.tipoDoc)}
        <div class="naowee-textfield__input-wrap"><input id="f-numDoc" class="naowee-textfield__input" placeholder="# Documento" inputmode="numeric" value="${esc(d.numDoc)}" data-model="numDoc" data-mask="numeric" maxlength="12"></div></div>
      ${lookupBox()}
      <p class="rp-demo-hint">Solo demo · prueba <code>${DOC_MENOR}</code> (menor de edad) o <code>1144556778</code> (ya tiene cuenta).</p>
    </div>`;
  if (st === 'minor') return `${isAthlete() ? minorInfo() : ''}<div class="reg-form">${docField}</div>${minorAlert('Por normativa, el registro debe completarlo su padre, madre o tutor legal.')}`;
  if (st === 'hasLogin') return `<div class="reg-form">${docField}</div>${hasLoginAlert()}`;
  const edad = edadDe(d.fechaNac);
  const menorPorFecha = edad != null && edad < 18;
  return `${isAthlete() ? minorInfo() : ''}
    <form class="reg-form rp-form-wide${locked ? ' rp-locked' : ''}" onsubmit="return false">
      ${docField}
      <div class="reg-grid-2">
        ${tf({ id: 'f-nombre', label: 'Nombre', required: true, path: 'nombre', value: d.nombre, placeholder: 'Primer nombre' })}
        ${tf({ id: 'f-segNombre', label: 'Segundo nombre', path: 'segNombre', value: d.segNombre, placeholder: 'Segundo nombre' })}
        ${tf({ id: 'f-apellido', label: 'Apellido', required: true, path: 'apellido', value: d.apellido, placeholder: 'Primer apellido' })}
        ${tf({ id: 'f-segApellido', label: 'Segundo apellido', path: 'segApellido', value: d.segApellido, placeholder: 'Segundo apellido' })}
        ${dateField({ id: 'f-fechaNac', label: 'Fecha de nacimiento', required: true, path: 'fechaNac' })}
        <div class="naowee-textfield"><label class="naowee-textfield__label">Edad</label><div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" disabled value="${esc(edadTxt(d.fechaNac))}"></div></div>
        ${STATE.role === 'SUPPORT_STAFF' ? dd('rolApoyo', 'Rol específico', CAT.rolApoyo, d.rolApoyo, true, true) : ''}
        ${dd('sexo', 'Sexo', CAT.sexo, d.sexo, true)}
        ${dd('nacionalidad', 'Nacionalidad', CAT.nacionalidad, d.nacionalidad, true, true)}
      </div>
      ${menorPorFecha && STATE.role !== 'LEGAL_GUARDIAN' ? minorAlert(`Encontramos que tiene ${edad} años y eres menor de edad. Por normativa, el registro debe completarlo su padre, madre o tutor legal.`) : ''}
      ${menorPorFecha && STATE.role === 'LEGAL_GUARDIAN' ? msg('negative', 'Debes ser mayor de edad', 'El padre, madre o tutor que se registra debe tener 18 años o más.') : ''}
      ${isAthlete() ? '' : consentChecks()}
    </form>`;
}
function minorInfo() { return msg('informative', '', 'Si eres menor de edad, el registro debe realizarlo tu padre, madre o tutor.'); }
function minorAlert(text) {
  return `<div class="naowee-message naowee-message--caution rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Deportista menor de edad detectado/a</p><p class="naowee-message__text">${esc(text)}</p>
    <button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" data-act="asTutor" style="margin-top:10px">Continuar como padre/tutor</button></div></div>`;
}
function hasLoginAlert() {
  return `<div class="naowee-message naowee-message--informative rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Ya tienes una cuenta registrada</p><p class="naowee-message__text">Hemos detectado que este número de documento ya está asociado a una cuenta. Inicia sesión o, si olvidaste tu contraseña, utiliza el enlace «¿Olvidaste tu contraseña?» para recuperarla.</p>
    <a class="naowee-btn naowee-btn--loud naowee-btn--small" href="index.html" style="margin-top:10px">Iniciar sesión</a></div></div>`;
}
function consentChecks() {
  return `<div class="rp-checks">
    ${checkbox('aceptaPoliticas', 'f-politicas', 'He leído y acepto las <strong>Políticas de Privacidad</strong> y el uso de datos gubernamentales para verificación.')}
    ${checkbox('aceptaComunicaciones', 'f-comunicaciones', 'Acepto recibir comunicaciones relacionadas con eventos y convocatorias.')}
  </div>`;
}
function checkbox(model, id, html) {
  return `<label class="naowee-checkbox" data-field="${id}" id="${id}"><input type="checkbox" ${STATE.d[model] ? 'checked' : ''} data-check="${model}"><span class="naowee-checkbox__box">${I.check}</span><span class="naowee-checkbox__label">${html}</span></label>`;
}

/* ── Persona · Deportivos (solo deportista) ── */
function paneDeportivos() {
  const d = STATE.d;
  return `<form class="reg-form" onsubmit="return false">
    ${dd('tipoDeporte', 'Tipo de deporte', CAT.tipoDeporte, d.tipoDeporte, true)}
    ${d.tipoDeporte ? dd('deporte', 'Deporte', opt(deportesPorTipo(d.tipoDeporte)), d.deporte, true, true) : ddDisabled('Deporte')}
    ${msg('informative', '', 'Quedarás registrado como <strong>deportista autodeclarado</strong>. Desde tu perfil podrás solicitar afiliación a uno o varios clubes.')}
    ${consentChecks()}
  </form>`;
}

/* ── Persona · Sociodemográfico ── */
function paneSocio() {
  const d = STATE.d;
  return `<p class="reg-pane__sub">Completa tu información sociodemográfica</p>
  <form class="reg-form rp-form-wide" onsubmit="return false"><div class="reg-grid-2">
    ${dd('genero', 'Identidad de género', CAT.genero, d.genero, true)}
    ${dd('orientacion', 'Orientación sexual', CAT.orientacion, d.orientacion, true)}
    ${dd('discapacidad', 'Discapacidad', CAT.discapacidad, d.discapacidad, true)}
    ${dd('etnia', 'Pertenencia étnica', CAT.etnia, d.etnia, true)}
    ${d.etnia === 'IND' ? dd('comunidad', 'Comunidad indígena', CAT.comunidad, d.comunidad, true, true) : ''}
    ${dd('victima', 'Víctima del conflicto armado', CAT.victima, d.victima, true)}
    ${dd('priorizacion', 'Priorización', CAT.priorizacion, d.priorizacion, true)}
    ${d.victima === 'YES' ? dd('victimizacion', 'Tipo de victimización', CAT.victimizacion, d.victimizacion, true) : ''}
  </div></form>`;
}

/* ── Contacto (persona) · Sede y contacto (entidad) ── */
function paneContacto() {
  const d = STATE.d;
  const ent = STATE.nature === 'entidad';
  return `<form class="reg-form rp-form-wide" onsubmit="return false">
    ${ent ? `<p class="reg-pane__sub">${STATE.entTipo === 'club' ? 'El municipio de la sede ubica al club en la jerarquía territorial.' : STATE.entTipo === 'liga' ? 'El departamento de la sede ubica a la liga en la jerarquía territorial.' : 'La federación es de cobertura nacional; indica la dirección de su sede.'}</p>` : ''}
    <div class="reg-grid-2">
      ${dd('depto', 'Departamento', opt(DEPTOS), d.depto, true, true)}
      ${d.depto ? dd('ciudad', ent ? 'Municipio' : 'Ciudad', opt(MUNICIPIOS[d.depto] || []), d.ciudad, true, true) : ddDisabled(ent ? 'Municipio' : 'Ciudad')}
      ${dd('zona', 'Zona', CAT.zona, d.zona, true)}
      ${tf({ id: 'f-direccion', label: 'Dirección', required: true, path: 'direccion', value: d.direccion, placeholder: 'Ingresa tu dirección' })}
      ${tf({ id: 'f-telefono', label: 'Telefono', required: true, path: 'telefono', value: d.telefono, mask: 'numeric', maxLength: 10, placeholder: '3001234567' })}
    </div>
    ${msg('informative', '', 'Usaremos este correo electronico para notificaciones y verificación.')}
    ${tf({ id: 'f-correo', label: 'Correo electrónico', required: true, path: 'correo', value: d.correo, mask: 'email', placeholder: 'nombre@correo.com' })}
  </form>`;
}

/* ── Entidad · Básicos ── */
function superiorOpts() {
  const t = STATE.entTipo, d = STATE.d;
  if (t === 'liga') return activosDeTipo('federacion').map((f) => ({ v: f.id, t: `${f.nombre} · ${deportesDe(f).join(', ')}` }));
  if (t === 'club') return activosDeTipo('liga').filter((l) => !d.filtroDeporte || deportesDe(l).includes(d.filtroDeporte))
    .map((l) => ({ v: l.id, t: `${l.nombre} · ${l.ubicacion?.depto || ''}` }));
  return [];
}
function deportesPermitidos() {
  const t = STATE.entTipo, d = STATE.d;
  if (t === 'federacion') return d.sector ? CATALOGO_DEPORTES() : [];
  return deportesDe(getOrganismo(d.superiorId));
}
function superiorSection() {
  const t = STATE.entTipo, d = STATE.d;
  if (t === 'federacion') {
    const com = d.sector ? comitePorSector(d.sector) : null;
    return `${dd('sector', 'Sector', CAT.sector, d.sector, true)}
      ${com ? `<p class="rp-inline-note">${I.check} Tu federación quedará adscrita al <strong>${esc(com.nombre)}</strong>.</p>` : ''}`;
  }
  const ops = superiorOpts();
  const filtro = t === 'club' ? dd('filtroDeporte', 'Deporte', opt([...new Set(activosDeTipo('liga').flatMap(deportesDe))].sort((a, b) => a.localeCompare(b, 'es'))), d.filtroDeporte, false, true) : '';
  const lista = ops.length
    ? dd('superiorId', t === 'liga' ? 'Federación a la que perteneces' : 'Liga a la que perteneces', ops, d.superiorId, true, true)
    : `<div class="naowee-message naowee-message--caution" data-field="dd-superiorId"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">No encontramos tu ${SUPERIOR_TXT[t]}</p><p class="naowee-message__text">Solo aparecen organismos activos. Si tu ${SUPERIOR_TXT[t]} no está en la lista, escríbenos a <strong>soporte@naowee.com</strong> y lo escalamos al Ministerio del Deporte.</p></div></div>`;
  return `${filtro}${lista}${ops.length ? `<p class="rp-inline-note">¿No aparece tu ${SUPERIOR_TXT[t]}? Escríbenos a <strong>soporte@naowee.com</strong> y lo escalamos al Ministerio del Deporte.</p>` : ''}`;
}
function deportesField() {
  const d = STATE.d, t = STATE.entTipo;
  const lista = deportesPermitidos();
  if (!lista.length) return `<div class="naowee-textfield" data-field="f-deportes"><label class="naowee-textfield__label naowee-textfield__label--required">Deportes</label><p class="rp-inline-note">${t === 'federacion' ? 'Elige el sector para ver los deportes.' : `Elige tu ${SUPERIOR_TXT[t]} para ver sus deportes.`}</p></div>`;
  const libres = t === 'federacion' ? lista.filter((dep) => !duenoDeporte(dep, d.sector)) : lista;
  const ocupados = lista.length - libres.length;
  const chips = libres.map((dep) => {
    const on = d.deportes.includes(dep);
    return `<button type="button" class="rp-chip${on ? ' is-on' : ''}" data-dep="${esc(dep)}">${on ? I.check : ''}${esc(dep)}</button>`;
  }).join('') + (ocupados ? `<p class="rp-inline-note">${ocupados} deportes no aparecen porque ya tienen federación en el sector ${esc(d.sector)}.</p>` : '');
  return `<div class="naowee-textfield" data-field="f-deportes"><label class="naowee-textfield__label naowee-textfield__label--required">Deportes</label>
    <p class="rp-inline-note">${t === 'federacion' ? 'Una federación puede gobernar varios deportes; cada deporte pertenece a una sola federación.' : `Elige entre los deportes de tu ${SUPERIOR_TXT[t]}.`}</p>
    <div class="rp-chips">${chips}</div></div>`;
}
function nitBox() {
  const st = STATE.nitLookup;
  if (st === 'checking') return `<div class="rp-lookup">${I.spin} Consultando registro en la base de datos...</div>`;
  if (st === 'ok') return `<div class="rp-lookup rp-lookup--ok">${I.check} No encontramos registros previos. Por favor completa el formulario.</div>`;
  return '';
}
function paneEntBasicos() {
  const d = STATE.d, st = STATE.nitLookup, t = STATE.entTipo;
  const nit = `${tf({ id: 'f-nit', label: 'NIT', required: true, path: 'nit', value: d.nit, placeholder: '# Documento', mask: 'nit', maxLength: 11 })}${nitBox()}
    <p class="rp-demo-hint">Solo demo · prueba <code>805010003-3</code> (en revisión) o <code>860077223-7</code> (ya tiene cuenta).</p>`;
  if (st === 'pending') return `<div class="reg-form">${nit}</div><div class="naowee-message naowee-message--informative rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Ya tienes una cuenta registrada</p><p class="naowee-message__text">Hemos detectado que este número de documento tiene pendiente un proceso de revisión por parte de su organismo superior. Te notificaremos por email cuando tu entidad sea aprobada o si requieres enviar documentación adicional.</p></div></div>`;
  if (st === 'hasLogin') return `<div class="reg-form">${nit}</div>${hasLoginAlert()}`;
  return `<form class="reg-form rp-form-wide${st !== 'ok' ? ' rp-locked' : ''}" onsubmit="return false">
    ${nit}
    <div class="reg-section-label">${t === 'federacion' ? 'Comité' : 'Organismo superior'}</div>
    ${superiorSection()}
    ${deportesField()}
    <div class="reg-section-label">Datos de la entidad</div>
    <div class="reg-grid-2">
      ${tf({ id: 'f-entNombre', label: 'Nombre de la entidad', required: true, path: 'entNombre', value: d.entNombre, placeholder: t === 'club' ? 'Ej: Club Patín Cali' : t === 'liga' ? 'Ej: Liga de Patinaje del Valle' : 'Ej: Federación Colombiana de …' })}
      ${t === 'liga' ? dd('ambito', 'Ámbito', CAT.ambito, d.ambito, true) : ''}
      ${t === 'club' ? dd('tipoClub', 'Tipo de club', CAT.tipoClub, d.tipoClub, true) : ''}
      ${dd('naturaleza', 'Naturaleza jurídica', CAT.naturaleza, d.naturaleza, true)}
      ${dd('tamano', 'Tamaño de la organización', CAT.tamano, d.tamano, true)}
    </div>
    <div class="reg-section-label">Datos del representante legal</div>
    <div class="reg-grid-2">
      ${dd('repTipoDoc', 'Tipo de documento', CAT.tipoDoc, d.repTipoDoc, true)}
      ${tf({ id: 'f-repDoc', label: 'Número de documento', required: true, path: 'repDoc', value: d.repDoc, mask: 'numeric', maxLength: 12 })}
      ${tf({ id: 'f-repNombre', label: 'Nombre', required: true, path: 'repNombre', value: d.repNombre })}
      ${tf({ id: 'f-repApellido', label: 'Apellido', required: true, path: 'repApellido', value: d.repApellido })}
    </div>
    ${tf({ id: 'f-repCorreo', label: 'Correo electrónico del representante', required: true, path: 'repCorreo', value: d.repCorreo, mask: 'email' })}
  </form>`;
}

/* ── Entidad · Documentos ── */
const DOCS_ENT = [{ id: 'rut', label: 'RUT', required: true }, { id: 'personeria', label: 'Certificado de personería juridica' }, { id: 'reconocimiento', label: 'Reconocimiento deportivo vigente' }];
function paneEntDocs() {
  return `${msg('informative', '', 'Los documentos deben ser legibles y firmados.')}
    <div class="reg-form">${DOCS_ENT.map((doc) => uploader(doc).replace(doc.required ? '' : 'naowee-file-uploader__label--required', '')).join('')}
    ${checkbox('aceptaPoliticas', 'f-politicas', 'Acepto políticas de privacidad y uso de datos gubernamentales')}</div>`;
}

/* ── dropdown compacto / deshabilitado ── */
function ddInline(key, opts, value) { return dd(key, '', opts, value, false).replace('<label class="naowee-dropdown__label">', '<label class="naowee-dropdown__label" hidden>').replace('class="naowee-dropdown"', 'class="naowee-dropdown rp-dd-inline"'); }
function ddDisabled(label) { return `<div class="naowee-dropdown is-disabled"><label class="naowee-dropdown__label naowee-dropdown__label--required">${esc(label)}</label><button type="button" class="naowee-dropdown__trigger" disabled><span class="naowee-dropdown__value is-placeholder">Seleccionar</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button></div>`; }
function msg(variant, title, html) {
  return `<div class="naowee-message naowee-message--${variant} rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body">${title ? `<p class="naowee-message__title">${esc(title)}</p>` : ''}<p class="naowee-message__text">${html}</p></div></div>`;
}

/* ═══════════════ Eventos ═══════════════ */
let _lookupT = null;
function runLookup() {
  clearTimeout(_lookupT);
  const n = STATE.d.numDoc.trim();
  const min = STATE.d.tipoDoc === 'CE' ? 6 : 7;
  if (n.length < min) { if (STATE.lookup !== 'idle') { STATE.lookup = 'idle'; renderPane(); bindPane(); refocus('f-numDoc'); } return; }
  STATE.lookup = 'checking'; renderPane(); bindPane(); refocus('f-numDoc');
  _lookupT = setTimeout(() => {
    STATE.lookup = n === DOC_MENOR ? 'minor' : docConCuenta(n) ? 'hasLogin' : 'ok';
    renderPane(); bindPane(); refocus('f-numDoc');
  }, 900);
}
let _nitT = null;
function runNitLookup() {
  clearTimeout(_nitT);
  const n = STATE.d.nit.replace(/\D/g, '');
  if (n.length < 9) { if (STATE.nitLookup !== 'idle') { STATE.nitLookup = 'idle'; renderPane(); bindPane(); refocus('f-nit'); } return; }
  STATE.nitLookup = 'checking'; renderPane(); bindPane(); refocus('f-nit');
  _nitT = setTimeout(() => {
    const org = allOrganismos().find((o) => String(o.nit || '').replace(/\D/g, '') === n);
    STATE.nitLookup = !org ? 'ok' : ['En revisión', 'Preinscrito', 'En corrección'].includes(org.estado) ? 'pending' : 'hasLogin';
    renderPane(); bindPane(); refocus('f-nit');
  }, 900);
}
function refocus(id) { const el = document.getElementById(id); if (el) { el.focus(); const v = el.value; try { el.setSelectionRange(v.length, v.length); } catch (_) {} } }
const nitMask = (v) => { const n = v.replace(/\D/g, '').slice(0, 10); return n.length > 9 ? `${n.slice(0, 9)}-${n.slice(9)}` : n; };

function bindPane() {
  closeDatePicker();
  root().querySelectorAll('input[data-model]').forEach((inp) => {
    inp.addEventListener('input', () => {
      if (inp.dataset.mask === 'nit') inp.value = nitMask(inp.value);
      else if (inp.dataset.mask) inp.value = applyMask(inp.dataset.mask, inp.value);
      STATE.d[inp.dataset.model] = inp.value;
      clearFieldError(inp.closest('[data-field]'));
      if (inp.dataset.model === 'numDoc') runLookup();
      if (inp.dataset.model === 'nit') runNitLookup();
    });
  });
  root().querySelectorAll('input[data-check]').forEach((cb) => cb.addEventListener('change', () => { STATE.d[cb.dataset.check] = cb.checked; cb.closest('[data-field]')?.classList.remove('naowee-checkbox--error'); }));
  root().querySelectorAll('[data-card]').forEach((c) => c.addEventListener('click', () => {
    const key = c.dataset.card, v = c.dataset.value;
    if (key === 'nature') { if (STATE.nature !== v) { STATE.role = null; STATE.entTipo = null; } STATE.nature = v; }
    if (key === 'role') STATE.role = v;
    if (key === 'entTipo') { if (STATE.entTipo !== v) { STATE.d.superiorId = ''; STATE.d.sector = ''; STATE.d.deportes = []; STATE.d.filtroDeporte = ''; } STATE.entTipo = v; }
    render();
  }));
  root().querySelectorAll('[data-dep]').forEach((b) => b.addEventListener('click', () => {
    const dep = b.dataset.dep, list = STATE.d.deportes;
    STATE.d.deportes = list.includes(dep) ? list.filter((x) => x !== dep) : [...list, dep];
    renderPane(); bindPane();
  }));
  root().querySelector('[data-act="asTutor"]')?.addEventListener('click', () => {
    const keep = { tipoDoc: STATE.d.tipoDoc };
    STATE.role = 'LEGAL_GUARDIAN'; STATE.lookup = 'idle'; STATE.d = { ...blankD(), ...keep };
    render();
  });
  root().querySelectorAll('[data-dd]').forEach(mountDD);
  root().querySelectorAll('[data-datefield]').forEach((f) => {
    const trig = f.querySelector('.naowee-datepicker-field__input');
    trig.addEventListener('click', () => openDatePicker(f));
    trig.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDatePicker(f); } });
  });
  root().querySelectorAll('[data-doc-input]').forEach((inp) => inp.addEventListener('change', () => onFilePick(inp)));
  root().querySelectorAll('[data-doc-remove]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); delete STATE.d.docs[b.dataset.docRemove]; renderPane(); bindPane(); }));
  mountDevnotes(DEVNOTES, root());
}
/* El datepicker canónico llama ageHint() al elegir fecha: re-render para la edad y la alerta de menor. */
function ageHint() {}

/* ═══════════════ Validación ═══════════════ */
function validate() {
  const d = STATE.d, errs = [], k = stepKey();
  const req = (id, ok, m, hard) => { if (!ok) errs.push({ field: id, kind: 'tf', msg: m, hard: !!hard }); };
  const reqDd = (key) => { if (!d[key]) errs.push({ field: 'dd-' + key, kind: 'dd' }); };
  const reqCheck = (id, model) => { if (!d[model]) errs.push({ field: id, kind: 'check', hard: true }); };
  if (k === 'nature') return STATE.nature ? [] : [{ field: null, kind: 'grid' }];
  if (k === 'role') return STATE.role ? [] : [{ field: null, kind: 'grid' }];
  if (k === 'enttipo') return STATE.entTipo ? [] : [{ field: null, kind: 'grid' }];
  if (k === 'basicos') {
    if (STATE.lookup !== 'ok') return [{ field: 'f-numDoc', kind: 'tf', msg: 'Verifica el documento para continuar', hard: true }];
    req('f-nombre', d.nombre.trim()); req('f-apellido', d.apellido.trim());
    if (!d.fechaNac) errs.push({ field: 'f-fechaNac', kind: 'tf', msg: 'Debe seleccionar fecha para persona mayor de edad' });
    const e = edadDe(d.fechaNac); if (e != null && e < 18) errs.push({ field: 'f-fechaNac', kind: 'tf', msg: 'Debe seleccionar fecha para persona mayor de edad', hard: true });
    if (STATE.role === 'SUPPORT_STAFF') reqDd('rolApoyo');
    reqDd('sexo'); reqDd('nacionalidad');
    if (!isAthlete()) reqCheck('f-politicas', 'aceptaPoliticas');
  }
  if (k === 'deportivos') { reqDd('tipoDeporte'); if (!d.deporte) errs.push({ field: 'dd-deporte', kind: 'dd' }); reqCheck('f-politicas', 'aceptaPoliticas'); }
  if (k === 'socio') {
    ['genero', 'orientacion', 'discapacidad', 'etnia', 'victima', 'priorizacion'].forEach(reqDd);
    if (d.etnia === 'IND') reqDd('comunidad');
    if (d.victima === 'YES') reqDd('victimizacion');
  }
  if (k === 'contacto') {
    reqDd('depto'); if (!d.ciudad) errs.push({ field: 'dd-ciudad', kind: 'dd' }); reqDd('zona');
    req('f-direccion', d.direccion.trim());
    req('f-telefono', /^\d{10}$/.test(d.telefono), 'El teléfono debe tener 10 dígitos');
    req('f-correo', EMAIL_RE.test(d.correo), 'Ingresa un correo válido');
  }
  if (k === 'entbasicos') {
    if (STATE.nitLookup !== 'ok') return [{ field: 'f-nit', kind: 'tf', msg: 'El NIT debe tener mínimo 9 dígitos', hard: true }];
    if (STATE.entTipo === 'federacion') { if (!d.sector) errs.push({ field: 'dd-sector', kind: 'dd', hard: true }); }
    else if (!d.superiorId) errs.push({ field: 'dd-superiorId', kind: 'dd', hard: true });
    if (!d.deportes.length) errs.push({ field: 'f-deportes', kind: 'tf', msg: 'Elige al menos un deporte', hard: true });
    req('f-entNombre', d.entNombre.trim());
    if (STATE.entTipo === 'liga') reqDd('ambito');
    if (STATE.entTipo === 'club') reqDd('tipoClub');
    reqDd('naturaleza'); reqDd('tamano');
    req('f-repDoc', d.repDoc.trim()); req('f-repNombre', d.repNombre.trim()); req('f-repApellido', d.repApellido.trim());
    req('f-repCorreo', EMAIL_RE.test(d.repCorreo), 'Ingresa un correo válido');
  }
  if (k === 'entdocs') {
    DOCS_ENT.filter((x) => x.required).forEach((doc) => { if (!d.docs[doc.id]) errs.push({ field: 'doc-' + doc.id, kind: 'file' }); });
    reqCheck('f-politicas', 'aceptaPoliticas');
  }
  return errs;
}
function next() {
  const errs = validate();
  if (errs.length) {
    shakeErrors(errs);
    if (errs.some((e) => e.hard || e.kind === 'grid')) { STATE._armedStep = null; setFooterHint('Hay validaciones obligatorias que <strong>no se pueden omitir</strong>: documento verificado, edad, organismo superior, deportes o aceptación de políticas.', true); return; }
    if (STATE._armedStep === STATE.step) { STATE._armedStep = null; advance(); return; }
    STATE._armedStep = STATE.step;
    setFooterHint('Faltan campos obligatorios — presiona <strong>“Siguiente”</strong> de nuevo para omitirlos (solo demo).', false);
    return;
  }
  STATE._armedStep = null; advance();
}
function advance() { if (STATE.step < lastStep()) { STATE.step++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; } submit(); }

/* ═══════════════ Envío ═══════════════ */
function submit() {
  const d = STATE.d;
  const nombre = [d.nombre, d.segNombre, d.apellido, d.segApellido].filter(Boolean).join(' ');
  if (STATE.nature === 'persona') {
    let id = null;
    if (isAthlete()) {
      const nuevos = readStore('deportistas-nuevos', []) || [];
      id = `DEP-N${String(nuevos.length + 1).padStart(3, '0')}`;
      nuevos.push({ id, nombre, tipoDoc: d.tipoDoc, numDoc: d.numDoc, deporte: d.deporte, modalidad: '', correo: d.correo, clubId: null, estado: 'autodeclarado', origen: 'registro-publico', fechaRegistro: new Date().toISOString().slice(0, 10) });
      writeStore('deportistas-nuevos', nuevos);
    }
    STATE.result = { tipo: 'persona', id, nombre, rol: ROL_TXT[STATE.role], fechaNac: d.fechaNac, correo: d.correo };
  } else {
    const t = STATE.entTipo;
    const parentId = t === 'federacion' ? comitePorSector(d.sector)?.id : d.superiorId;
    const org = addOrganismo({
      tipo: t, nombre: d.entNombre, nit: d.nit, sector: t === 'federacion' ? d.sector : getOrganismo(parentId)?.sector,
      deporte: d.deportes[0], deportes: [...d.deportes], parentId, estado: 'En revisión', origen: 'autorregistro',
      ...(t === 'liga' ? { ambito: d.ambito } : {}), ...(t === 'club' ? { tipoClub: d.tipoClub } : {}),
      ...(t === 'federacion' ? { validacion: { mindeporte: 'pendiente', comite: 'pendiente' } } : {}),
      naturaleza: d.naturaleza, tamano: d.tamano,
      repLegal: { tipoDoc: d.repTipoDoc, numDoc: d.repDoc, nombre: d.repNombre, apellido: d.repApellido, correo: d.repCorreo },
      ubicacion: { depto: d.depto, ciudad: d.ciudad, zona: d.zona === 'R' ? 'Rural' : 'Urbana', direccion: d.direccion },
      contacto: { telefono: d.telefono, correo: d.correo }, docs: { ...d.docs }
    });
    auditLog({ orgId: org.id, fecha: new Date().toISOString(), accion: 'Autorregistro', estado: 'En revisión', responsable: `${d.repNombre} ${d.repApellido}`.trim() || 'Representante legal', detalle: 'Registro público: queda en la bandeja de su organismo superior' });
    STATE.result = { tipo: 'entidad', org, superior: getOrganismo(parentId) };
  }
  STATE.created = true; render(); window.scrollTo({ top: 0 });
}

/* ═══════════════ Resultado ═══════════════ */
function renderResult() {
  const r = STATE.result;
  const persona = r.tipo === 'persona';
  const sup = r.superior;
  const esFed = !persona && r.org.tipo === 'federacion';
  const rolBandeja = !persona && sup ? ROL_DE_ANCLA[sup.id] : null;
  const siguiente = persona ? ({
    Deportista: 'Desde tu perfil podrás solicitar afiliación a uno o varios clubes. Hasta que un club la confirme, apareces como deportista autodeclarado.',
    Tutor: 'Desde tu perfil podrás registrar a tus hijos o menores a cargo con el documento de parentesco.',
    'Personal deportivo': 'Desde tu perfil podrás solicitar vínculo a un club, liga, federación o comité.'
  })[r.rol] : '';
  root().innerHTML = `<div class="reg-success ur-result">
    <div class="ur-devnote-wrap ur-devnote-wrap--center"><span class="wz-devnote" tabindex="0" role="button" data-devnote="${persona ? 'resultPersona' : 'resultEntidad'}"></span></div>
    <div class="ur-result__ava">${I.check}</div>
    ${persona ? `
      <h1 class="ur-title">¡Registro completado!</h1>
      <p>¡Ya formas parte! Registro recibido. Confirma tu email y empieza a superar tus marcas.</p>
      <p>¡Bienvenido! Tu cuenta ha sido creada correctamente. Hemos enviado un correo con la confirmación.</p>
      <div class="ur-profile"><strong>${esc(r.nombre)}</strong><span>${esc(r.rol)}${r.fechaNac ? ' · ' + esc(r.fechaNac.split('-').reverse().join('/')) : ''}</span></div>
      ${msg('informative', '', esc(siguiente))}
      ${msg('caution', '', 'Si no recibiste el correo, revisa bandeja de SPAM o solicita reenvío.')}
      <div class="ur-actions"><a class="ur-btn ur-btn--block" href="index.html">Ir a Iniciar sesión</a></div>`
    : `
      <h1 class="ur-title">¡Solicitud enviada!</h1>
      <p>Hemos recibido la solicitud de <strong>${esc(r.org.nombre)}</strong>. Queda <strong>en revisión</strong>.</p>
      <div class="ur-checks">
        <div>${I.check}<span><strong>Revisión por ${esFed ? 'el comité y el Ministerio del Deporte' : esc(sup?.nombre || 'tu organismo superior')}</strong>${esFed ? `El ${esc(sup?.nombre || 'comité')} y el Ministerio revisan tus documentos; la federación se activa con los dos avales.` : 'Revisa tus documentos y puede aprobar, devolver con motivo para que corrijas, o rechazar.'}</span></div>
        <div>${I.check}<span><strong>Activación</strong>Te notificaremos por email cuando tu entidad sea aprobada. El representante legal recibe el acceso como administrador de la entidad.</span></div>
      </div>
      <div class="ur-profile"><strong>${esc(r.org.nombre)}</strong><span>${esc(ENT_TXT[r.org.tipo])} · ${esc((r.org.deportes || []).join(', '))} · superior: ${esc(sup?.nombre || '—')}</span></div>`}
    <div class="ur-help"><b>💬 ¿NECESITAS AYUDA?</b>Si tienes dudas o problemas con la activación de tu cuenta, puedes comunicarte con el equipo de soporte <strong>soporte@naowee.com</strong></div>
    <div class="ur-demo-links">
      ${r.id ? `<a href="afiliacion.html?role=DEPORTISTA&id=${esc(r.id)}">Solo demo · ver perfil del deportista</a>` : ''}
      ${rolBandeja ? `<a href="bandeja.html?role=${rolBandeja}">Solo demo · bandeja de ${esc(sup.nombre)}</a>` : ''}
      ${esFed ? '<a href="bandeja.html?role=MINDEPORTE">Solo demo · bandeja del Ministerio</a>' : ''}
      ${persona ? '' : '<a href="jerarquia.html?role=MINDEPORTE">Solo demo · ver en la jerarquía</a>'}
      <button type="button" id="rpAnother">Registrar otro</button>
    </div>
  </div>`;
  document.getElementById('rpAnother').addEventListener('click', () => location.reload());
  mountDevnotes(DEVNOTES, root());
}

/* ═══════════════ Notas para devs (Solo demo) ═══════════════
   Base: /user-register de suite-web-v2 (origin/staging ee186813). Cada nota dice qué
   se mantiene, qué cambia con la jerarquía (nao-docs PR #30–#32) y qué valida el back. */
const DEVNOTES = {
  nature: { title: 'Selección de naturaleza', sections: [
    { title: 'Migración', items: ['Hoy vive en <code>sports</code>: <code>/user-register/select-nature</code> (suite-web-v2). Pasa al servicio de SUID con las mismas rutas y el mismo shell (logo SUID, "¿Ya tienes una cuenta? Inicia sesión").', 'Sin cambios funcionales en esta pantalla: Persona (Natural) · Entidad (Jurídica).'] },
    { title: 'Corregir al migrar', items: ['En la ruta de Entidad el header cae en "Crear cuenta" y el subtítulo de persona porque no se fija rol. Aquí el título sale de la naturaleza y del tipo de entidad.'] }
  ] },
  role: { title: 'Selección de rol (Persona)', sections: [
    { title: 'Se mantiene', items: ['Tres roles: <code>ATHLETE</code>, <code>LEGAL_GUARDIAN</code>, <code>SUPPORT_STAFF</code>. Textos de tarjetas iguales a producción.'] },
    { title: 'Regla de jerarquía', items: ['Las personas <b>no pasan por ninguna bandeja</b>: la cuenta queda activa de inmediato porque no pertenecen a ningún organismo todavía.', 'El vínculo con un organismo se pide después, desde el perfil (afiliación).'] }
  ] },
  basicos: { title: 'Básicos (Persona)', sections: [
    { title: 'Se mantiene de producción', items: ['Documento CC / CE / PA. Con 7 dígitos (6 para CE) consulta <code>GET /user/public/individual/search</code> tras 1 s; los demás campos quedan bloqueados hasta verificar.', '<code>isMinor</code> → alerta "Deportista menor de edad detectado/a" + "Continuar como padre/tutor" (cambia el rol a <code>LEGAL_GUARDIAN</code> y limpia el formulario).', '<code>hasLogin</code> → "Ya tienes una cuenta registrada" + Iniciar sesión.', 'Fecha de nacimiento: 18+ obligatorio, también para el tutor. "Rol específico" solo para personal deportivo (<code>/catalogs/support-personnel-role</code>).'] },
    { title: 'Menores (pendiente P-21)', items: ['Por ahora solo el tutor registra al menor, desde su perfil (<code>POST /user/me/dependents</code>). Si Negocio decide que un club o un municipio también puede, se agrega en el registro asistido, no aquí.'] },
    { title: 'Solo demo', items: ['La búsqueda está simulada: <code>1098765432</code> devuelve menor; un documento del seed devuelve cuenta existente.'] }
  ] },
  deportivos: { title: 'Deportivos (solo deportista)', sections: [
    { title: 'Se mantiene', items: ['Tipo de deporte (<code>/catalogs/sport_type</code>) → Deporte (<code>GET /sports?type=</code>). Se envía como <code>main_sport_code</code>.'] },
    { title: 'Regla de jerarquía', items: ['Aquí <b>no se elige club</b>. El deportista queda autodeclarado y pide afiliación desde su perfil; puede estar en varios clubes, del mismo deporte o de deportes distintos (P-13).'] },
    { title: 'Solo demo', items: ['La lista de deportes sale de las federaciones del seed; la real es el catálogo de catalog-ms.'] }
  ] },
  socio: { title: 'Sociodemográfico', sections: [
    { title: 'Se mantiene sin cambios', items: ['Ocho catálogos con los valores de staging. "Comunidad indígena" solo con etnia <code>IND</code>; "Tipo de victimización" solo con víctima <code>YES</code>. Al ocultarse se limpian.'] }
  ] },
  contacto: { title: 'Contacto / Sede', sections: [
    { title: 'Se mantiene', items: ['Departamento → Ciudad (<code>/locations/*</code>), Zona, Dirección con el modal estructurado de producción (aquí simplificado a un campo), Teléfono de 10 dígitos y correo.', 'Persona: llena <code>location</code>. <b>Corregir al migrar</b>: hoy también llena <code>birth_place</code> con la dirección de contacto.'] },
    { title: 'Entidad: ubicación territorial', items: ['Club → municipio; liga → departamento; federación → sede nacional. Es atributo del organismo, no su padre: la aprobación sigue la cadena deportiva.', 'Reemplaza la regla actual que deriva <code>department_code</code>/<code>municipality_code</code> de <code>organization_type</code>.'] }
  ] },
  enttipo: { title: 'Tipo de entidad', sections: [
    { title: 'Qué cambia vs producción', items: ['Hoy el tipo sale de <code>organization_level</code> (Nacional, Departamental, Municipal, Club) + "Tipo de entidad SND" + "Cobertura geográfica". Se reemplazan por <b>Federación · Liga · Club</b>; la cobertura se deriva del tipo.', 'Fuera del registro público: <b>Comité</b> (lo crea el Administrador Mindeporte y nace Activo) y <b>entes departamentales y municipales</b> (los crea el Ministerio al invitarlos a sus eventos, P-11).'] }
  ] },
  entbasicos: { title: 'Básicos (Entidad)', sections: [
    { title: 'Se mantiene', items: ['NIT con formato <code>#########-#</code> y consulta <code>GET /user/public/organization/search</code>. En revisión → mensaje de revisión pendiente; con cuenta → Iniciar sesión.', 'Naturaleza jurídica, tamaño y representante legal. <b>Corregir al migrar</b>: hoy no se envía el apellido del representante.'] },
    { title: 'Nuevo: organismo superior', items: ['Federación → elige sector y queda adscrita al comité del sector. Liga → elige federación. Club → filtra por deporte y elige liga; el departamento no filtra porque un club puede estar en una liga de otro departamento (P-20).', 'La lista solo trae organismos <b>Activos</b>. Si el suyo no está: soporte, que escala al Ministerio (P-17).', 'En el registro el club elige <b>una</b> liga (la que lo activa). Otras ligas de sus deportes se piden después como afiliación.'] },
    { title: 'Nuevo: deportes', items: ['Lista de deportes del catálogo. Federación: del catálogo, sin repetir deportes que ya tiene otra federación del mismo sector. Liga: de su federación. Club: de su liga.', 'SUP no es deporte: es modalidad de Surf. Las modalidades no se configuran en el organismo.'] },
    { title: 'Contrato propuesto', items: ['<code>POST /user/public/organization</code>: <code>organization_type</code> pasa a FEDERATION | LEAGUE | CLUB y se agregan <code>parent_organization_code</code> y <code>sport_codes[]</code>; deja de enviar <code>coverage_code</code> y <code>snd_sector_entity_code</code>.', 'El back valida: superior Activo y del tipo correcto, <code>sport_codes</code> ⊆ deportes del superior, NIT único, un deporte en una sola federación.'] }
  ] },
  entdocs: { title: 'Documentos (Entidad)', sections: [
    { title: 'Se mantiene', items: ['Requisitos desde <code>GET /documentation/processes/requirements/by-role?process_type=REGISTRATION&user_role=SPORTS_ORGANIZATION</code>: RUT obligatorio; personería y reconocimiento opcionales. Subida con <code>/files/public/presigned-upload</code> después de crear la cuenta.'] },
    { title: 'Corregir al migrar', items: ['Hoy la subida corre en segundo plano y los errores se silencian: la entidad puede quedar en revisión sin documentos. Mostrar el error y permitir reintentar.'] },
    { title: 'Pendiente', items: ['Requisitos por tipo de organismo (federación, liga, club) no están definidos; hoy son los mismos para todos.'] }
  ] },
  resultPersona: { title: 'Resultado (Persona)', sections: [
    { title: 'Se mantiene', items: ['Textos de producción. Cuenta activa; el correo trae el enlace para crear la contraseña.'] },
    { title: 'Nuevo', items: ['Siguiente paso según el rol: deportista → afiliación a uno o varios clubes; tutor → registrar menores; personal deportivo → vínculo con cualquier organismo (P-05).'] },
    { title: 'Solo demo', items: ['El deportista queda guardado como autodeclarado y aparece en "Ver mi perfil".'] }
  ] },
  resultEntidad: { title: 'Resultado (Entidad)', sections: [
    { title: 'Qué cambia vs producción', items: ['Hoy el título dice "¡Entidad pre-inscrita!". Preinscrito es el estado del cargue masivo; el autorregistro entra directo a <code>En revisión</code>, por eso aquí dice "¡Solicitud enviada!".', 'Hoy dice "Nuestro equipo verificará…" (revisión centralizada). Ahora revisa el <b>organismo superior</b>: la federación revisa la liga, la liga revisa el club.', 'Federación: el comité y el Ministerio, cada uno su aval. <b>Pendiente de confirmar</b> si esta doble validación existe (P-19).', 'Estado <code>En revisión</code> en la bandeja del superior; aprobar, devolver con motivo o rechazar. Al activarse, el representante legal es el administrador de la entidad (uno por organismo).'] },
    { title: 'Solo demo', items: ['La entidad se guarda en la jerarquía bajo su superior. Para ver la bandeja: Liga de Patinaje del Valle (rol LIGA), Federación de Patinaje (rol FEDERACION) o COC (rol COMITE).'] }
  ] }
};

/* ═══════════════ Helpers de campo, datepicker y errores (de la v1.4.1) ═══════════════ */
/* ═══════════════ Datepicker canónico (componente del DS) ═══════════════
   Reemplaza el <input type=date> nativo. El valor vive en STATE.d[path] como
   'YYYY-MM-DD' (compatible con edadDe/validate). Popover fijo anclado al campo,
   con vistas día → mes → año para elegir fechas de nacimiento rápidamente. */
const DP_MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DP_DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const DP_HOY = (() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
const dpISO = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
const dpParse = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null; };
const dpFmt = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; };

function dateField(o) {
  const val = STATE.d[o.path];
  return `<div class="naowee-datepicker-field" data-datefield="${o.path}" data-field="${o.id}" id="${o.id}">
    <label class="naowee-datepicker-field__label${o.required ? ' naowee-datepicker-field__label--required' : ''}">${esc(o.label)}</label>
    <div class="naowee-datepicker-field__input" role="button" tabindex="0" aria-haspopup="dialog">
      <span class="naowee-datepicker-field__icon">${I.cal}</span>
      <span class="naowee-datepicker-field__value${val ? '' : ' is-placeholder'}">${val ? esc(dpFmt(val)) : 'DD/MM/AAAA'}</span>
      <span class="naowee-datepicker-field__chevron">${I.chevron}</span>
    </div>
  </div>`;
}

let _dpCleanup = null;
function closeDatePicker() {
  document.getElementById('rpDatePop')?.remove();
  document.querySelectorAll('.naowee-datepicker-field--active').forEach((f) => f.classList.remove('naowee-datepicker-field--active'));
  if (_dpCleanup) { _dpCleanup(); _dpCleanup = null; }
}
function openDatePicker(fieldEl) {
  closeDatePicker();
  const path = fieldEl.dataset.datefield;
  const sel = dpParse(STATE.d[path]);
  const maxY = DP_HOY.getFullYear();
  const view = { y: (sel || DP_HOY).getFullYear(), m: (sel || DP_HOY).getMonth(), mode: 'days' };
  const pop = document.createElement('div');
  pop.className = 'naowee-datepicker naowee-datepicker--popover naowee-datepicker--compact';
  pop.id = 'rpDatePop';
  document.body.appendChild(pop);
  fieldEl.classList.add('naowee-datepicker-field--active');
  const trigger = fieldEl.querySelector('.naowee-datepicker-field__input');

  function anchor() {
    const r = trigger.getBoundingClientRect();
    const w = pop.offsetWidth || 290, h = pop.offsetHeight || 330;
    pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + 'px';
    const below = window.innerHeight - r.bottom;
    if (below < h + 12 && r.top > below) { pop.style.top = 'auto'; pop.style.bottom = (window.innerHeight - r.top + 6) + 'px'; }
    else { pop.style.bottom = 'auto'; pop.style.top = (r.bottom + 6) + 'px'; }
  }
  function pick(iso) {
    STATE.d[path] = iso; closeDatePicker(); renderPane(); bindPane(); ageHint();
    const f = document.getElementById(fieldEl.id); if (f) clearFieldError(f);
  }
  function days() {
    const startDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
    const dim = new Date(view.y, view.m + 1, 0).getDate();
    let cells = '';
    for (let i = 0; i < startDow; i++) cells += `<span class="naowee-datepicker__day naowee-datepicker__day--other-month"></span>`;
    for (let d = 1; d <= dim; d++) {
      const dt = new Date(view.y, view.m, d), iso = dpISO(dt);
      const isSel = sel && dpISO(sel) === iso, isToday = dpISO(DP_HOY) === iso, dis = dt > DP_HOY;
      cells += `<button type="button" class="naowee-datepicker__day${isSel ? ' naowee-datepicker__day--selected' : ''}${isToday && !isSel ? ' naowee-datepicker__day--today' : ''}${dis ? ' naowee-datepicker__day--disabled' : ''}" data-day="${iso}"${dis ? ' disabled' : ''}>${d}</button>`;
    }
    return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <button type="button" class="naowee-datepicker__month-selector" data-view="months"><span class="naowee-datepicker__month">${DP_MESES[view.m]} ${view.y}</span><span class="naowee-datepicker__month-chevron">${I.chevron}</span></button>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-mo="-1" aria-label="Mes anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-mo="1" aria-label="Mes siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__grid">${DP_DIAS.map((d) => `<span class="naowee-datepicker__weekday">${d}</span>`).join('')}</div>
      <div class="naowee-datepicker__grid">${cells}</div></div>`;
  }
  function months() {
    return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <button type="button" class="naowee-datepicker__month-selector" data-view="years"><span class="naowee-datepicker__month">${view.y}</span><span class="naowee-datepicker__month-chevron">${I.chevron}</span></button>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-yr="-1" aria-label="Año anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-yr="1" aria-label="Año siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__month-grid">${DP_MESES.map((mm, i) => `<button type="button" class="naowee-datepicker__month-item${i === view.m ? ' naowee-datepicker__month-item--selected' : ''}" data-month="${i}">${mm.slice(0, 3)}</button>`).join('')}</div></div>`;
  }
  function years() {
    const base = view.y - (view.y % 12); let items = '';
    for (let i = 0; i < 12; i++) { const yy = base + i, dis = yy > maxY; items += `<button type="button" class="naowee-datepicker__month-item${yy === view.y ? ' naowee-datepicker__month-item--selected' : ''}${dis ? ' naowee-datepicker__month-item--disabled' : ''}" data-year="${yy}"${dis ? ' disabled' : ''}>${yy}</button>`; }
    return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <span class="naowee-datepicker__month" style="padding:0 10px">${base} – ${base + 11}</span>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-yp="-12" aria-label="Anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-yp="12" aria-label="Siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__month-grid">${items}</div></div>`;
  }
  function draw() {
    pop.innerHTML = view.mode === 'years' ? years() : view.mode === 'months' ? months() : days();
    pop.querySelectorAll('[data-day]').forEach((b) => b.addEventListener('click', () => pick(b.dataset.day)));
    pop.querySelectorAll('[data-mo]').forEach((b) => b.addEventListener('click', () => { view.m += +b.dataset.mo; if (view.m < 0) { view.m = 11; view.y--; } if (view.m > 11) { view.m = 0; view.y++; } draw(); }));
    pop.querySelectorAll('[data-yr]').forEach((b) => b.addEventListener('click', () => { view.y += +b.dataset.yr; draw(); }));
    pop.querySelectorAll('[data-yp]').forEach((b) => b.addEventListener('click', () => { view.y += +b.dataset.yp; draw(); }));
    pop.querySelectorAll('[data-month]').forEach((b) => b.addEventListener('click', () => { view.m = +b.dataset.month; view.mode = 'days'; draw(); }));
    pop.querySelectorAll('[data-year]').forEach((b) => b.addEventListener('click', () => { view.y = +b.dataset.year; view.mode = 'months'; draw(); }));
    pop.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => { view.mode = b.dataset.view; draw(); }));
    anchor();
  }
  draw();
  requestAnimationFrame(() => pop.classList.add('naowee-datepicker--open'));
  /* Cierre por clic-fuera en POINTERDOWN (no 'click'): al navegar mes/año, draw()
     reconstruye el innerHTML del popover DENTRO del handler → el botón clicado se
     desprende del DOM y, si escucháramos 'click', al burbujear a document
     `pop.contains(e.target)` daría false (target ya detached) y cerraría el picker.
     En pointerdown el target sigue adjunto (el re-render ocurre después). */
  const onDoc = (e) => { if (!pop.contains(e.target) && !fieldEl.contains(e.target)) closeDatePicker(); };
  const onKey = (e) => { if (e.key === 'Escape') closeDatePicker(); };
  setTimeout(() => document.addEventListener('pointerdown', onDoc), 0);
  document.addEventListener('keydown', onKey);
  window.addEventListener('scroll', anchor, true);
  window.addEventListener('resize', anchor);
  _dpCleanup = () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); window.removeEventListener('scroll', anchor, true); window.removeEventListener('resize', anchor); };
}

/* ── Paso 2 — documentos (adaptativo) + políticas ── */
function tf(o) {
  const req = o.required ? ' naowee-textfield__label--required' : '';
  const attrs = [
    `id="${o.id}"`, `type="${o.type || 'text'}"`, 'class="naowee-textfield__input"',
    `placeholder="${esc(o.placeholder || '')}"`, `value="${esc(o.value || '')}"`, `data-model="${o.path}"`,
    o.mask ? `data-mask="${o.mask}"` : '', o.maxLength ? `maxlength="${o.maxLength}"` : '',
    o.mask === 'numeric' ? 'inputmode="numeric"' : (o.mask === 'tel' ? 'inputmode="tel"' : '')
  ].filter(Boolean).join(' ');
  return `<div class="naowee-textfield" data-field="${o.id}">
    <label class="naowee-textfield__label${req}" for="${o.id}">${esc(o.label)}</label>
    <div class="naowee-textfield__input-wrap"><input ${attrs}></div>
  </div>`;
}
function dd(key, label, opts, value, required, searchable) {
  const sel = opts.find((o) => o.v === value);
  return `<div class="naowee-dropdown" data-dd="${key}" data-field="dd-${key}" data-required="${required ? 1 : 0}" data-search="${searchable ? 1 : 0}" id="dd-${key}">
    <label class="naowee-dropdown__label${required ? ' naowee-dropdown__label--required' : ''}">${esc(label)}</label>
    <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="naowee-dropdown__value${sel ? '' : ' is-placeholder'}">${sel ? esc(sel.t) : 'Seleccionar'}</span>
      <span class="naowee-dropdown__chevron">${I.chevron}</span>
    </button>
    <div class="naowee-dropdown__menu" role="listbox" data-opts='${esc(JSON.stringify(opts))}'></div>
  </div>`;
}
function choiceGroup(key, label, opts, value, required) {
  const items = opts.map((o) => `
    <label class="reg-choice ${value === o.v ? 'is-selected' : ''}" data-choice="${key}" data-value="${o.v}">
      <input type="radio" name="${key}" value="${o.v}" ${value === o.v ? 'checked' : ''}>
      <span class="reg-choice__dot"></span>
      <span class="reg-choice__body"><span class="reg-choice__title">${esc(o.t)}</span>${o.d ? `<span class="reg-choice__desc">${esc(o.d)}</span>` : ''}</span>
    </label>`).join('');
  return `<div class="naowee-textfield" data-field="dd-${key}" style="gap:0">
    <label class="naowee-textfield__label${required ? ' naowee-textfield__label--required' : ''}">${esc(label)}</label>
    <div class="reg-choice-group" id="dd-${key}">${items}</div>
  </div>`;
}
function uploader(doc) {
  const f = STATE.d.docs[doc.id];
  const inner = f
    ? `<span class="naowee-file-uploader__placeholder naowee-file-uploader__placeholder--filled">${I.check}${esc(f)}</span>
       <button type="button" class="naowee-file-uploader__action" data-doc-remove="${doc.id}">${I.x} Quitar</button>`
    : `<span class="naowee-file-uploader__placeholder">Ningún archivo seleccionado · PDF, JPG o PNG</span>
       <label class="naowee-file-uploader__action">${I.upload} Subir archivo<input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" data-doc-input="${doc.id}"></label>`;
  return `<div class="naowee-file-uploader" data-field="doc-${doc.id}" id="doc-${doc.id}">
    <label class="naowee-file-uploader__label naowee-file-uploader__label--required">${esc(doc.label)}</label>
    <div class="naowee-file-uploader__input-wrap">${inner}</div>
  </div>`;
}
function mountDD(el) {
  const key = el.dataset.dd;
  const opts = JSON.parse(el.querySelector('.naowee-dropdown__menu').dataset.opts || '[]');
  const searchable = el.dataset.search === '1';
  const trigger = el.querySelector('.naowee-dropdown__trigger');
  const valueEl = el.querySelector('.naowee-dropdown__value');
  const menu = el.querySelector('.naowee-dropdown__menu');
  const cur = () => STATE.d[key];
  function build(filter) {
    const q = norm(filter || '');
    const list = opts.filter((o) => !q || norm(o.t).includes(q));
    let html = searchable ? `<div class="dd-search-wrap"><input type="text" class="dd-search-input" placeholder="Buscar…" aria-label="Buscar"></div>` : '';
    if (!list.length) html += `<div class="dd-empty">Sin coincidencias</div>`;
    html += list.map((o) => `<div class="naowee-dropdown__opt ${o.v === cur() ? 'is-selected' : ''}" role="option" data-value="${esc(o.v)}"><span class="naowee-dropdown__opt-main"><span class="naowee-dropdown__opt-name">${esc(o.t)}</span></span><span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join('');
    menu.innerHTML = html;
    if (searchable) { const si = menu.querySelector('.dd-search-input'); si.addEventListener('click', (e) => e.stopPropagation()); si.addEventListener('input', () => build(si.value)); setTimeout(() => si.focus(), 40); }
  }
  /* Ancla el menú (position:fixed) al trigger para escapar el overflow:hidden del
     wizard; abre hacia arriba si no cabe abajo; reposiciona en scroll/resize. */
  function anchor() {
    const r = trigger.getBoundingClientRect();
    menu.style.left = r.left + 'px';
    menu.style.width = r.width + 'px';
    menu.style.right = 'auto';
    const below = window.innerHeight - r.bottom;
    const flipUp = below < 240 && r.top > below;
    const space = (flipUp ? r.top : below) - 16;
    menu.style.maxHeight = Math.max(160, Math.min(300, space)) + 'px';
    if (flipUp) { menu.style.top = 'auto'; menu.style.bottom = (window.innerHeight - r.top + 6) + 'px'; }
    else { menu.style.bottom = 'auto'; menu.style.top = (r.bottom + 6) + 'px'; }
  }
  function open() {
    document.querySelectorAll('.naowee-dropdown--open').forEach((o) => { if (o !== el) o.classList.remove('naowee-dropdown--open'); });
    build(''); el.classList.add('naowee-dropdown--open'); trigger.setAttribute('aria-expanded', 'true');
    anchor();
    window.addEventListener('scroll', anchor, true);
    window.addEventListener('resize', anchor);
  }
  function close() {
    el.classList.remove('naowee-dropdown--open'); trigger.setAttribute('aria-expanded', 'false');
    window.removeEventListener('scroll', anchor, true);
    window.removeEventListener('resize', anchor);
  }
  trigger.addEventListener('click', (e) => { e.stopPropagation(); el.classList.contains('naowee-dropdown--open') ? close() : open(); });
  menu.addEventListener('click', (e) => {
    const opt = e.target.closest('.naowee-dropdown__opt'); if (!opt) return;
    const o = opts.find((x) => String(x.v) === opt.dataset.value); if (!o) return;
    STATE.d[key] = o.v;
    // Al cambiar el Departamento, el Municipio se recarga dependiente → re-render.
    if (DD_RERENDER[key]) { DD_RERENDER[key](); close(); renderPane(); bindPane(); return; }
    valueEl.textContent = o.t; valueEl.classList.remove('is-placeholder');
    el.classList.remove('naowee-dropdown--error'); close();
  });
  document.addEventListener('click', (e) => { if (!el.contains(e.target)) close(); });
}
function onFilePick(inp) {
  const f = inp.files && inp.files[0]; if (!f) return;
  const wrap = inp.closest('.naowee-file-uploader');
  if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) { fieldError(wrap, 'Formato no permitido. Usa PDF, JPG o PNG.'); inp.value = ''; return; }
  STATE.d.docs[inp.dataset.docInput] = f.name + ' · ' + fileSizeFmt(f.size);
  clearFieldError(wrap); renderPane(); bindPane();
}

/* ═══════════════ Validación ═══════════════ */
function fieldEl(field) { return field ? document.querySelector(`[data-field="${field}"]`) : null; }
function fieldError(el, msg) {
  if (!el) return;
  el.classList.add(el.classList.contains('naowee-file-uploader') ? 'naowee-file-uploader--error' : 'naowee-textfield--error');
  if (!el.querySelector('.naowee-helper')) {
    const h = document.createElement('div'); h.className = 'naowee-helper naowee-helper--negative';
    h.innerHTML = `<span class="naowee-helper__text"><span class="naowee-helper__badge">${I.bang}</span><span>${esc(msg)}</span></span>`;
    el.appendChild(h);
  }
}
function clearFieldError(el) { if (!el) return; el.classList.remove('naowee-textfield--error', 'naowee-file-uploader--error', 'naowee-checkbox--error', 'naowee-dropdown--error'); el.querySelector('.naowee-helper')?.remove(); el.querySelector('.reg-choice-group')?.classList.remove('is-error'); }
function shakeErrors(errs) {
  let first = null;
  errs.forEach((e) => {
    const el = e.field ? fieldEl(e.field) : document.querySelector('.reg-tipo-grid');
    if (!el) return; if (!first) first = el;
    if (e.kind === 'dd') el.classList.add('naowee-dropdown--error');
    else if (e.kind === 'choice') el.querySelector('.reg-choice-group')?.classList.add('is-error');
    else if (e.kind === 'tf') fieldError(el, e.msg || 'Este campo es obligatorio');
    else if (e.kind === 'file') fieldError(el, 'Adjunta este documento');
    else if (e.kind === 'check') el.classList.add('naowee-checkbox--error');
    el.classList.remove('naowee-shake'); void el.offsetWidth; el.classList.add('naowee-shake');
    setTimeout(() => el.classList.remove('naowee-shake'), 500);
  });
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function setFooterHint(html, hard) {
  const footer = document.getElementById('rpFooter'); if (!footer) return;
  let hint = document.getElementById('rpBypassHint');
  if (!hint) { hint = document.createElement('div'); hint.id = 'rpBypassHint'; footer.insertBefore(hint, footer.firstChild); }
  hint.className = 'reg-footer__hint' + (hard ? ' reg-footer__hint--hard' : '');
  hint.innerHTML = `${I.bang}<span>${html}</span>`;
}
function receiptRow(ico, k, v, tone) { return `<div class="reg-receipt__row"><span class="reg-receipt__ico${tone ? ' reg-receipt__ico--' + tone : ''}">${ico}</span><span class="reg-receipt__k">${esc(k)}</span><span class="reg-receipt__v">${esc(v)}</span></div>`; }
function fireConfetti() {
  const c = document.getElementById('rpConfetti'); if (!c) return;
  const cols = ['#FF7500', '#d74009', '#1f8923', '#1f78d1', '#7c3aed'];
  let html = '';
  for (let i = 0; i < 28; i++) html += `<span class="reg-confetti__bit" style="left:${Math.round((i * 37) % 100)}%;background:${cols[i % cols.length]};animation-delay:${(i % 7) * 60}ms"></span>`;
  c.innerHTML = html;
}


/* ═══════════════ Arranque ═══════════════ */
render();
