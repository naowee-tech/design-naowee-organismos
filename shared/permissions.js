/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — RBAC: matriz de permisos + jurisdicción por rol
   Registro de Organismos — Jerarquía SUID · v0.2.0

   Codifica la matriz de accesos §11.2 y la jurisdicción §11.1 del handoff.
   Los 6 roles de la demo (§11.1) están ANCLADOS a un organismo; su
   jurisdicción es el subárbol de ese ancla (scopeFor + subtreeOf).

   Acciones (leyenda §11.2):
     C crear/pre-registrar · R consultar · U editar datos ·
     A aprobar/rechazar/corrección · S sancionar (suspender/inactivar/cancelar) ·
     X retirar (lo propio). NO existe D (borrado duro) para NADIE — el ciclo
     de vida es por estados (ORG-07).
   `*` en el handoff = supuesto pendiente de confirmación del Ministerio (§6);
   en la demo se codifica como permiso real y se marca aquí en comentario.
   ═══════════════════════════════════════════════════════════════ */

import { getOrganismo } from './organismos-data.js';

export const ACCIONES = Object.freeze({
  CREAR: 'C', LEER: 'R', EDITAR: 'U', APROBAR: 'A', SANCIONAR: 'S', RETIRAR: 'X'
});

export const RECURSOS = Object.freeze([
  'comites', 'federaciones', 'ligas', 'clubes', 'deportistas', 'solicitudes', 'cargue', 'auditoria'
]);

/* Matriz §11.2 — PERMS[recurso][rol] = string con las acciones concedidas.
   Cadena vacía '' = sin acceso (—). */
const PERMS = {
  comites: {
    MINDEPORTE: 'CRUS',  // único creador (ORG-01)
    COMITE: 'RU',        // el propio
    FEDERACION: 'R', LIGA: 'R', CLUB: 'R', DEPORTISTA: 'R'
  },
  federaciones: {
    MINDEPORTE: 'RAS',   // A = su mitad de la doble validación
    COMITE: 'CRA',       // C pre-registro/cargue · A = su mitad — solo su sector
    FEDERACION: 'RU',    // la propia
    LIGA: 'R', CLUB: 'R', DEPORTISTA: 'R'
  },
  ligas: {
    MINDEPORTE: 'RS',    // S* supuesto
    COMITE: 'R',         // su sector
    FEDERACION: 'CRA',   // las suyas
    LIGA: 'RU',          // la propia
    CLUB: 'R', DEPORTISTA: 'R'
  },
  clubes: {
    MINDEPORTE: 'RS',    // S* supuesto
    COMITE: 'R',
    FEDERACION: 'R',     // subárbol
    LIGA: 'CRA',         // los suyos
    CLUB: 'RU',          // el propio
    DEPORTISTA: 'R'      // solo buscar clubes Activos (se acota en la UI de afiliación)
  },
  deportistas: {
    MINDEPORTE: 'R',
    COMITE: 'CR', FEDERACION: 'CR', LIGA: 'CR',   // C = registrar autodeclarados y proponer club (P-07)
    CLUB: 'CRX',         // sus afiliados · X = desvincular (ORG-10, ver nota)
    DEPORTISTA: 'RU'     // el propio (nunca documento / fecha nac.)
  },
  /* NOTA sobre deportistas[CLUB] = 'X' (desvincular):
     DECISIÓN DE PRODUCTO de Doug (2026-09-10) que responde la pregunta de
     Nicolás Mosquera en la mesa del 2026-09-08. VA MÁS ALLÁ del handoff §11.2
     y de la matriz oficial de negocio, que NO tienen columna de
     desvinculación — pendiente de validar (P-04).
     Alcance: solo sobre deportistas de SU propio club, con motivo obligatorio
     y traza. No es borrado (sigue sin existir D): el deportista vuelve a
     'autodeclarado' y puede re-afiliarse. */
  solicitudes: {
    MINDEPORTE: 'R',     // auditoría
    COMITE: '', FEDERACION: '', LIGA: '',
    CLUB: 'RA',          // las dirigidas a su club (ORG-05, único aprobador)
    DEPORTISTA: 'CRX'    // crea / ve estado / retira las propias
  },
  cargue: {
    MINDEPORTE: 'R',     // historial global*
    COMITE: 'CR',        // federaciones
    FEDERACION: 'CR',    // ligas
    LIGA: 'CR',          // clubes
    CLUB: '',            // cargue masivo de deportistas: pendiente (entrada en «Deportistas»)
    DEPORTISTA: ''
  },
  auditoria: {
    MINDEPORTE: 'R', COMITE: 'R', FEDERACION: 'R', LIGA: 'R', CLUB: 'R', DEPORTISTA: 'R'
  }
};

/* ¿El rol tiene la acción sobre el recurso? (enforcement en UI). */
export function can(role, accion, recurso) {
  const fila = PERMS[recurso];
  if (!fila) return false;
  const concedidas = fila[role] || '';
  return concedidas.includes(accion);
}

/* Todas las acciones que el rol puede ejecutar sobre el recurso (array). */
export function accionesDe(role, recurso) {
  const concedidas = (PERMS[recurso] && PERMS[recurso][role]) || '';
  return concedidas.split('');
}

/* ─── Jurisdicción (§11.1): orgId ANCLA de cada rol ───
   scopeFor devuelve el nodo raíz de la jurisdicción del rol:
     MINDEPORTE → null (raíz del SND: ve los 3 comités y todo debajo)
     COMITE     → 'COC'      (Comité Olímpico Colombiano)
     FEDERACION → 'FED-040'  (Fed. Col. de Patinaje)
     LIGA       → 'LIG-001'  (Liga de Patinaje del Valle)
     CLUB       → 'CLU-001'  (Club Patín Cali)
     DEPORTISTA → 'DEP-001'  (Valentina Ortiz — persona; su cadena heredada)
   IDs verificados contra el seed de organismos-data.js. */
const SCOPE = {
  MINDEPORTE: null,
  COMITE: 'COC',
  FEDERACION: 'FED-040',
  LIGA: 'LIG-001',
  CLUB: 'CLU-001',
  DEPORTISTA: 'DEP-001'
};

/* ─── Contexto: una persona administra varios organismos (P-15, A-6) ───
   El ancla por defecto de cada rol es la de SCOPE; si la persona tiene más de un
   organismo, el contexto elegido (?org=… o el último elegido en la sesión) la
   reemplaza. Solo vale un organismo del nivel del rol. */
const TIPO_DE_ROL = { COMITE: 'comite', FEDERACION: 'federacion', LIGA: 'liga', CLUB: 'club' };
const CTX_KEY = 'naowee-organismos-ctx-';
export function contextoDe(role) {
  if (!TIPO_DE_ROL[role]) return null;
  const valido = (id) => { const o = id && getOrganismo(id); return o && o.tipo === TIPO_DE_ROL[role] ? id : null; };
  let porUrl = null;
  try { porUrl = valido(new URLSearchParams(window.location.search).get('org')); } catch (_) {}
  if (porUrl) { try { sessionStorage.setItem(CTX_KEY + role, porUrl); } catch (_) {} return porUrl; }
  try { return valido(sessionStorage.getItem(CTX_KEY + role)); } catch (_) { return null; }
}

export function scopeFor(role) {
  const ctx = contextoDe(role);
  if (ctx) return ctx;
  return role in SCOPE ? SCOPE[role] : null;
}

/* ¿El rol ve TODO el SND? (solo Mindeporte — ancla en la raíz). */
export function isGlobalScope(role) {
  return scopeFor(role) === null && role === 'MINDEPORTE';
}
