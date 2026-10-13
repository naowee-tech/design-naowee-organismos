/* ═══════════════════════════════════════════════════════════════
   NAOWEE ORGANISMOS — Ciclo del organismo en la ficha (Fase 1)
   Dos piezas que se montan dentro de organismo-detalle.html:
     · estadoPropioHtml: «Mi organismo» del administrador cuando su organismo
       NO está Activo: estado, motivo (quién, cuándo), qué le toca, el recorrido
       y lo que puede y no puede hacer mientras tanto.
     · sancionesHtml + abrirSancion: «Estado y sanciones» del Ministerio:
       suspender, reactivar y cancelar el registro, con motivo y consecuencia.
   Ronda de diseño 2026-10-13: «Mi organismo» de la variante A (bloque sobre la
   ficha + recorrido vertical) con el título como instrucción y la lista ✓/✗ de
   la B; sanciones de la B (estado + acción con su consecuencia + historial), en
   bloque sobre las pestañas y con «Cancelar registro» aparte como definitiva.
   ═══════════════════════════════════════════════════════════════ */
import { getOrganismo, ultimoCambio, allAudit, sancionar, reactivar } from './organismos-data.js';
import { estadoBadgeVariant } from './estados.js';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const fecha = (iso) => {
  if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso || '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${Number(d)} ${MESES[Number(m) - 1]} ${y}`;
};
const badge = (e) => `<span class="naowee-badge naowee-badge--${estadoBadgeVariant(e)} naowee-badge--quiet naowee-badge--small">${esc(e)}</span>`;
const TIPO = { comite: 'comité', federacion: 'federación', liga: 'liga', club: 'club' };
const EL = { comite: 'el', federacion: 'la', liga: 'la', club: 'el' };
const SI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
const EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';

/* Quién revisa al organismo: su superior; la federación, el Comité y el Ministerio. */
function revisor(o) {
  const sup = o.parentId ? getOrganismo(o.parentId) : null;
  if (o.tipo === 'federacion') return { nombre: `${sup ? sup.nombre : 'el Comité'} y el Ministerio`, corto: 'el Comité y el Ministerio' };
  return { nombre: sup ? sup.nombre : 'tu superior', corto: sup ? `${EL[sup.tipo]} ${TIPO[sup.tipo]}` : 'tu superior' };
}
const paso = (cls, titulo, sub, aqui) => `<div class="od-tl-row oc-step--${cls}"><span class="od-tl-dot"></span><div>
  <div class="od-tl-head"><strong>${esc(titulo)}</strong>${aqui ? '<span class="oc-here">Estás aquí</span>' : ''}</div>
  ${sub ? `<div class="od-tl-sub">${esc(sub)}</div>` : ''}</div></div>`;

/* ─── «Mi organismo» (administrador, organismo no Activo) ─── */
export function estadoPropioHtml(o, roleCode) {
  const rev = revisor(o);
  const t = TIPO[o.tipo];
  const cambio = ultimoCambio(o.id);
  const desde = cambio ? fecha(cambio.fecha) : fecha(o.enviadoFecha || o.fechaRegistro);
  const envio = allAudit(o.id).find((a) => a.a === 'En revisión' && a.de !== 'En revisión');
  const completar = `registro.html?role=${roleCode}&completar=${encodeURIComponent(o.id)}`;
  let titulo, texto, cta = '', hint = '', pasos = [];
  switch (o.estado) {
    case 'Preinscrito':
      titulo = 'Completa tu registro y envíalo';
      texto = `<strong>${esc(rev.nombre)}</strong> cargó los datos básicos de tu ${t}. Revísalos, completa lo que falta y sube los documentos.`;
      cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Completar registro</a>`;
      hint = `Al enviarlo llega a la bandeja de ${esc(rev.nombre)}.`;
      pasos = [paso('done', `Te cargó ${rev.corto}`, desde), paso('now', 'Completar y enviar', '', true), paso('next', `Revisión de ${rev.corto}`), paso('next', 'Activo', 'Se habilita tu menú completo')];
      break;
    case 'En revisión':
      titulo = 'Tu registro está en revisión';
      texto = `Lo está revisando <strong>${esc(rev.nombre)}</strong>. Te avisamos por correo cuando decida. Mientras tanto no tienes nada pendiente.`;
      pasos = [paso('done', 'Enviaste tu registro', envio ? fecha(envio.fecha) : desde), paso('now', `Revisión de ${rev.corto}`, '', true), paso('next', 'Activo', 'Se habilita tu menú completo')];
      break;
    case 'En corrección':
      titulo = 'Corrige tu registro y reenvíalo';
      texto = `<strong>${esc(rev.nombre)}</strong> revisó tu registro y te pide un ajuste. No empiezas de cero: tus datos y documentos siguen ahí y solo cambias lo necesario.`;
      cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Corregir y reenviar</a>`;
      hint = `Al reenviarlo vuelve a la bandeja de ${esc(rev.nombre)}.`;
      pasos = [paso('done', 'Enviaste tu registro', ''), paso('warn', `${cap(rev.corto)} pidió una corrección`, desde), paso('now', 'Corregir y reenviar', '', true), paso('next', 'Nueva revisión'), paso('next', 'Activo', 'Se habilita tu menú completo')];
      break;
    case 'Rechazado':
      titulo = 'Tu registro fue rechazado';
      texto = `<strong>${esc(rev.nombre)}</strong> rechazó tu registro. Puedes corregir lo que se indica y volver a enviarlo; tus datos siguen ahí.`;
      cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Corregir y reenviar</a>`;
      hint = `Al reenviarlo vuelve a la bandeja de ${esc(rev.nombre)}.`;
      pasos = [paso('done', 'Enviaste tu registro', ''), paso('neg', `${cap(rev.corto)} lo rechazó`, desde), paso('now', 'Corregir y reenviar', '', true), paso('next', 'Nueva revisión'), paso('next', 'Activo', 'Se habilita tu menú completo')];
      break;
    case 'Suspendido':
      titulo = `Tu ${t} está suspendid${EL[o.tipo] === 'la' ? 'a' : 'o'}`;
      texto = `El Ministerio suspendió ${EL[o.tipo]} ${t}. Mientras dure no puedes operar; lo que depende de ti no cambia de estado. Para volver, el Ministerio debe reactivarl${EL[o.tipo] === 'la' ? 'a' : 'o'} y ${esc(rev.corto)} revisar${o.tipo === 'federacion' ? '' : 'l' + (EL[o.tipo] === 'la' ? 'a' : 'o')} de nuevo.`;
      pasos = [paso('done', 'Activo', ''), paso('neg', 'Suspendido por el Ministerio', desde, true), paso('next', 'Reactivación del Ministerio'), paso('next', `Nueva revisión de ${rev.corto}`)];
      break;
    case 'Cancelado':
      titulo = `Tu ${t} fue cancelad${EL[o.tipo] === 'la' ? 'a' : 'o'}`;
      texto = `El Ministerio canceló su registro: perdió el reconocimiento en el SUID y no vuelve a operar. Si crees que es un error, comunícate con el Ministerio.`;
      break;
    default:
      return '';
  }
  const motivo = cambio && cambio.motivo ? `<div class="oc-motivo">
      <p class="oc-motivo__lbl">${o.estado === 'Suspendido' || o.estado === 'Cancelado' ? 'Motivo' : o.estado === 'Rechazado' ? 'Motivo del rechazo' : 'Motivo de la devolución'}</p>
      <p class="oc-motivo__txt">${esc(cambio.motivo)}</p>
      <p class="oc-motivo__who"><b>${esc(cambio.responsable || '')}</b>${cambio.rol ? ` · ${esc(cambio.rol)}` : ''} · ${esc(fecha(cambio.fecha))}</p>
    </div>` : '';
  const club = o.tipo === 'club';
  const lo = EL[o.tipo] === 'la' ? 'la' : 'lo';
  const habil = o.estado === 'Suspendido' ? `cuando el Ministerio ${lo} reactive y ${esc(rev.corto)} ${lo} apruebe de nuevo` : o.estado === 'Cancelado' ? '' : `cuando ${esc(rev.corto)} apruebe tu registro`;
  const puede = [
    [true, 'Consultar tu ficha y su historial'],
    ...(cta ? [[true, 'Editar tu registro y enviarlo']] : []),
    ...(club ? [[false, 'Confirmar afiliaciones de deportistas']] : [[false, 'Aprobar o devolver registros'], [false, 'Hacer cargues masivos']]),
    [false, 'Registrar deportistas']
  ];
  return `<section class="oc-status${pasos.length ? '' : ' oc-status--single'}" aria-label="Estado de tu ${t}">
    <div class="oc-status__main">
      <div class="oc-status__head">${badge(o.estado)}<span class="oc-status__since">desde el ${esc(desde)}</span></div>
      <h2 class="oc-status__title">${titulo}</h2>
      <p class="oc-status__text">${texto}</p>
      ${motivo}
      ${cta ? `<div class="oc-status__cta">${cta}<span class="oc-status__hint">${hint}</span></div>` : ''}
      <div class="oc-can">
        <p class="oc-can__title">Mientras tu ${t} no esté activ${EL[o.tipo] === 'la' ? 'a' : 'o'}</p>
        <ul class="oc-can__list">${puede.map(([si, txt]) => `<li class="${si ? '' : 'is-no'}"><span class="oc-can__ico oc-can__ico--${si ? 'yes' : 'no'}">${si ? SI : NO}</span>${txt}</li>`).join('')}</ul>
        ${habil ? `<p class="oc-can__foot">El resto se habilita ${habil}.</p>` : ''}
      </div>
    </div>
    ${pasos.length ? `<div class="oc-cycle"><p class="oc-cycle__title">Cómo sigue tu registro</p>${pasos.join('')}</div>` : ''}
  </section>`;
}
const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/* ─── «Estado y sanciones» (Ministerio) ─── */
const MOTIVOS = {
  suspender: ['Investigación disciplinaria en curso', 'Reconocimiento deportivo vencido', 'Incumplimiento de obligaciones de reporte', 'Orden de autoridad competente', 'Otro'],
  cancelar: ['Pérdida del reconocimiento deportivo', 'Disolución o liquidación de la entidad', 'Sanción en firme de autoridad competente', 'Registro duplicado o fraudulento', 'Otro'],
  reactivar: ['Se resolvió la causa de la suspensión', 'Renovó el reconocimiento deportivo', 'Decisión de autoridad competente', 'Otro']
};
const ES_SANCION = (a) => /Ministerio|Reactivación/.test(a.accion || '');

export function sancionesHtml(o) {
  if (!['Activo', 'Suspendido', 'Cancelado'].includes(o.estado)) return '';
  const t = TIPO[o.tipo];
  const rev = revisor(o);
  const cambio = ultimoCambio(o.id);
  const hist = allAudit(o.id).filter(ES_SANCION);
  const accion = (id, label, hint, cls) => `<div class="oc-act"><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small ${cls || ''}" data-sancion="${id}">${label}</button><p class="oc-act__hint">${hint}</p></div>`;
  const acciones = o.estado === 'Activo'
    ? accion('suspender', 'Suspender', 'Temporal: no opera mientras dure y puedes reactivarl' + (EL[o.tipo] === 'la' ? 'a' : 'o') + ' después.')
    : o.estado === 'Suspendido'
      ? accion('reactivar', 'Reactivar', `Vuelve a revisión de ${esc(rev.corto)}; no se activa directo.`)
      : '';
  const definitiva = o.estado !== 'Cancelado'
    ? `<div class="oc-def"><p class="oc-def__lbl">Acción definitiva</p>${accion('cancelar', 'Cancelar registro', `${cap(EL[o.tipo])} ${t} pierde el reconocimiento en el SUID y no vuelve a operar.`, 'oc-btn-neg')}</div>`
    : '';
  return `<section class="oc-status oc-sanc" aria-label="Estado y sanciones">
    <div class="oc-status__main">
      <p class="oc-sanc__title">Estado y sanciones</p>
      <div class="oc-status__head">${badge(o.estado)}<span class="oc-status__since">${cambio ? 'desde el ' + esc(fecha(cambio.fecha)) : ''}</span></div>
      <p class="oc-status__text">${o.estado === 'Activo' ? `Opera con normalidad en el SUID.` : o.estado === 'Suspendido' ? 'No puede aprobar, cargar ni confirmar afiliaciones mientras dure la suspensión.' : 'Registro cancelado: no vuelve a operar.'}</p>
      ${cambio && cambio.motivo && o.estado !== 'Activo' ? `<div class="oc-motivo"><p class="oc-motivo__lbl">Motivo</p><p class="oc-motivo__txt">${esc(cambio.motivo)}</p><p class="oc-motivo__who"><b>${esc(cambio.responsable || '')}</b> · ${esc(fecha(cambio.fecha))}</p></div>` : ''}
    </div>
    <div class="oc-sanc__side">
      ${acciones ? `<div class="oc-acts">${acciones}</div>` : ''}
      ${definitiva}
      <div class="oc-sanc__hist"><p class="oc-cycle__title">Historial de sanciones</p>
        ${hist.length ? hist.map((a) => `<div class="od-tl-row"><span class="od-tl-dot"></span><div><div class="od-tl-head"><strong>${esc(a.accion)}</strong></div><div class="od-tl-sub">${esc(fecha(a.fecha))}${a.responsable ? ' · ' + esc(a.responsable) : ''}${a.motivo ? ' · ' + esc(a.motivo) : ''}</div></div></div>`).join('') : `<p class="oc-act__hint">Sin sanciones registradas.</p>`}
      </div>
    </div>
  </section>`;
}

/* Diálogo de sanción: resumen, consecuencias, motivo obligatorio y detalle (siempre obligatorio
   al cancelar). Cancelar además pide confirmar que no tiene vuelta. Enter nunca confirma. */
export function abrirSancion(tipoAccion, o, meta, onDone) {
  const t = TIPO[o.tipo];
  const rev = revisor(o);
  const cfg = {
    suspender: { titulo: `Suspender ${EL[o.tipo]} ${t}`, ok: 'Suspender', danger: false, consq: [
      `No podrá aprobar, cargar organismos ni confirmar afiliaciones mientras dure la suspensión.`,
      `Lo que depende de ${EL[o.tipo] === 'la' ? 'ella' : 'él'} no cambia de estado; sus deportistas siguen vinculados.`,
      `Se le notifica por correo con el motivo. Lo puedes reactivar después.`] },
    reactivar: { titulo: `Reactivar ${EL[o.tipo]} ${t}`, ok: 'Reactivar', danger: false, consq: [
      `No queda activ${EL[o.tipo] === 'la' ? 'a' : 'o'} de inmediato: vuelve a En revisión en la bandeja de ${rev.nombre}, sobre los datos que ya tiene.`,
      `Cuando lo apruebe, recupera su operación normal.`] },
    cancelar: { titulo: `Cancelar el registro ${EL[o.tipo] === 'el' ? 'del' : 'de la'} ${t}`, ok: 'Sí, cancelar definitivamente', danger: true, consq: [
      `Pierde el reconocimiento en el SUID y no vuelve a operar. No hay forma de deshacerlo.`,
      `No se borra: su ficha y su historial quedan para consulta.`,
      `Qué pasa con sus deportistas y lo que depende de ${EL[o.tipo] === 'la' ? 'ella' : 'él'} está pendiente de definir con Negocio.`] }
  }[tipoAccion];
  const ov = document.createElement('div');
  ov.className = 'reg-modal-overlay bj-modal-ov';
  ov.innerHTML = `<div class="reg-modal bj-modal bj-modal--sm oc-dlg" role="dialog" aria-modal="true" aria-labelledby="ocDlgT">
    <div class="reg-modal__head"><h3 class="reg-modal__title" id="ocDlgT">${esc(cfg.titulo)}</h3><button type="button" class="reg-modal__close" data-x aria-label="Cerrar">${NO}</button></div>
    <div class="reg-modal__body">
      <p class="oc-dlg__lead">Vas a ${tipoAccion === 'cancelar' ? 'cancelar el registro de' : tipoAccion} <strong>${esc(o.nombre)}</strong> · NIT ${esc(o.nit)}.</p>
      <div class="oc-dlg__consq"><p class="oc-motivo__lbl">Qué pasa al confirmar</p><ul class="oc-consq">${cfg.consq.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>
      <div class="bj-field"><label class="bj-label" for="ocMot">Motivo <span class="bj-req">*</span></label>
        <select class="bj-select oc-select" id="ocMot"><option value="">Selecciona un motivo…</option>${MOTIVOS[tipoAccion].map((m) => `<option>${esc(m)}</option>`).join('')}</select>
        <p class="bj-err" id="ocMotErr" hidden>Selecciona un motivo.</p></div>
      <div class="bj-field"><label class="bj-label" for="ocDet">Detalle${tipoAccion === 'cancelar' ? ' <span class="bj-req">*</span>' : ''}</label>
        <div class="naowee-textfield__input-wrap bj-ta-wrap"><textarea id="ocDet" rows="3" placeholder="Lo que verá ${esc(EL[o.tipo])} ${esc(t)} en su notificación…"></textarea></div>
        <p class="bj-err" id="ocDetErr" hidden>Escribe el detalle.</p></div>
      ${tipoAccion === 'cancelar' ? `<label class="oc-check"><input type="checkbox" id="ocOk"> Entiendo que la cancelación no se puede deshacer.</label><p class="bj-err" id="ocOkErr" hidden>Confirma que entiendes que no tiene vuelta.</p>` : ''}
    </div>
    <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" data-x>Volver</button><button type="button" class="naowee-btn ${cfg.danger ? 'bj-btn-danger' : 'naowee-btn--loud'}" id="ocGo">${esc(cfg.ok)}</button></div>
  </div>`;
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('is-open'));
  const opener = document.activeElement;
  const cerrar = () => { ov.classList.remove('is-open'); setTimeout(() => ov.remove(), 340); document.removeEventListener('keydown', onKey); opener && opener.focus && opener.focus(); };
  const onKey = (e) => { if (e.key === 'Escape') cerrar(); };
  document.addEventListener('keydown', onKey);
  setTimeout(() => ov.querySelector('#ocMot').focus(), 60);
  ov.addEventListener('click', (e) => { if (e.target === ov || e.target.closest('[data-x]')) cerrar(); });
  ov.querySelector('#ocGo').addEventListener('click', () => {
    const mot = ov.querySelector('#ocMot').value;
    const det = ov.querySelector('#ocDet').value.trim();
    const okBox = ov.querySelector('#ocOk');
    const faltaDet = (tipoAccion === 'cancelar' || mot === 'Otro') && !det;
    ov.querySelector('#ocMotErr').hidden = !!mot;
    ov.querySelector('#ocDetErr').hidden = !faltaDet;
    if (okBox) ov.querySelector('#ocOkErr').hidden = okBox.checked;
    if (!mot || faltaDet || (okBox && !okBox.checked)) return;
    const motivo = det ? `${mot} — ${det}` : mot;
    const m = { ...meta, motivo };
    if (tipoAccion === 'suspender') sancionar(o.id, 'Suspendido', m);
    else if (tipoAccion === 'cancelar') sancionar(o.id, 'Cancelado', m);
    else reactivar(o.id, m);
    cerrar();
    onDone && onDone(tipoAccion);
  });
}
