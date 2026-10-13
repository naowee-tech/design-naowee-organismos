(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };

  // ../front/DEMO/naowee-organismos/shared/estados.js
  function estadoBadgeVariant(estado) {
    return BADGE_VARIANT[estado] || "neutral";
  }
  var BADGE_VARIANT;
  var init_estados = __esm({
    "../front/DEMO/naowee-organismos/shared/estados.js"() {
      BADGE_VARIANT = {
        "Preinscrito": "neutral",
        "En revisi\xF3n": "caution",
        "En correcci\xF3n": "caution",
        "Activo": "positive",
        "Rechazado": "negative",
        "Suspendido": "caution",
        "Inactivo": "neutral",
        "Cancelado": "negative"
      };
    }
  });

  // ../front/DEMO/naowee-organismos/shared/organismos-data.js
  function deportesDe(org) {
    if (!org) return [];
    if (Array.isArray(org.deportes) && org.deportes.length) return org.deportes.slice();
    if (DEPORTES_SEED[org.id]) return DEPORTES_SEED[org.id].slice();
    return org.deporte && org.deporte !== "\u2014" ? String(org.deporte).split(",").map((x) => x.trim()).filter(Boolean) : [];
  }
  function conDeportes(org) {
    const deportes = deportesDe(org);
    return { ...org, deportes, deporte: deportes.length ? deportes.join(", ") : org.deporte || "\u2014" };
  }
  function seedAfiliaciones() {
    const out = [];
    DEPORTISTAS.forEach((d) => {
      if (!d.clubId) return;
      out.push({ id: `AF-S${d.id.slice(4)}`, tipo: "deportista", sujetoId: d.id, organismoId: d.clubId, deporte: d.deporte, estado: "Vinculada", desde: d.id === "DEP-022" ? "2022-03-12" : AF_DESDE, origen: d.tutorId ? "tutor" : "solicitud" });
    });
    CLUBES.forEach((c) => {
      const estado = ["Activo", "Suspendido"].includes(c.estado) ? "Vinculada" : c.estado === "Rechazado" ? "Rechazada" : "Solicitada";
      out.push({ id: `AF-C${c.id.slice(4)}`, tipo: "club", sujetoId: c.id, organismoId: c.parentId, deporte: c.deporte, estado, desde: estado === "Vinculada" ? c.fechaRegistro : null, origen: "activacion" });
    });
    return [...out, ...AFILIACIONES_EXTRA];
  }
  function readStore(key, fallback = null) {
    try {
      const raw = sessionStorage.getItem(STORE_PREFIX + key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }
  function writeStore(key, value) {
    try {
      sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
    } catch (_) {
    }
  }
  function clearStore(key) {
    try {
      sessionStorage.removeItem(STORE_PREFIX + key);
    } catch (_) {
    }
  }
  function seedDemoData() {
    const seeded = function() {
      try {
        return localStorage.getItem(SEED_FLAG);
      } catch (_) {
        return null;
      }
    }();
    seedTrazabilidadDemo();
    if (seeded === SEED_VERSION) {
      return { seeded: false, version: SEED_VERSION };
    }
    if (readStore("organismos-nuevos") == null) writeStore("organismos-nuevos", []);
    if (readStore("organismos-overrides") == null) writeStore("organismos-overrides", {});
    if (readStore("deportistas-nuevos") == null) writeStore("deportistas-nuevos", []);
    if (readStore("deportistas-overrides") == null) writeStore("deportistas-overrides", {});
    if (readStore("solicitudes") == null) writeStore("solicitudes", []);
    if (readStore("cargues") == null) writeStore("cargues", []);
    if (readStore("audit") == null) writeStore("audit", []);
    writeStore("afiliaciones", seedAfiliaciones());
    clearStore("usuarios");
    writeStore("solicitudes", []);
    clearStore("preinscritos");
    try {
      localStorage.setItem(SEED_FLAG, SEED_VERSION);
    } catch (_) {
    }
    return { seeded: true, version: SEED_VERSION };
  }
  function applyOverride(org, overrides) {
    const ov = overrides[org.id];
    return ov ? { ...org, ...ov } : { ...org };
  }
  function allOrganismos() {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const overrides = readStore("organismos-overrides", {}) || {};
    const base = SEED_ORGANISMOS.map((o2) => conDeportes(applyOverride(o2, overrides)));
    const extra = nuevos.map(conDeportes);
    return [...base, ...extra];
  }
  function getOrganismo(id2) {
    return allOrganismos().find((o2) => o2.id === id2) || null;
  }
  function childrenOf(id2) {
    return (indexByParent(allOrganismos())[id2] || []).map((o2) => ({ ...o2 }));
  }
  function allDeportistas() {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const ov = readStore("deportistas-overrides", {}) || {};
    const base = SEED_DEPORTISTAS.map((d) => ov[d.id] ? { ...d, ...ov[d.id] } : { ...d });
    const clubesDe = {};
    allAfiliaciones().forEach((a) => {
      if (a.tipo === "deportista" && a.estado === "Vinculada") (clubesDe[a.sujetoId] = clubesDe[a.sujetoId] || []).push(a.organismoId);
    });
    return [...base, ...nuevos.map((d) => ({ ...d }))].map((d) => {
      const clubIds = clubesDe[d.id] || [];
      return { ...d, clubIds, clubId: clubIds[0] || null, estado: clubIds.length ? "vinculado" : "autodeclarado" };
    });
  }
  function allAfiliaciones() {
    let list = readStore("afiliaciones", null);
    if (!list) {
      list = seedAfiliaciones();
      writeStore("afiliaciones", list);
    }
    return list.map((a) => ({ ...a }));
  }
  function afiliacionesDe(sujetoId, { vigentes = false } = {}) {
    return allAfiliaciones().filter((a) => a.sujetoId === sujetoId && (!vigentes || a.estado === "Vinculada"));
  }
  function solicitarAfiliacion({ tipo = "deportista", sujetoId, organismoId, deporte = "", origen = "solicitud", proponenteId = null }) {
    const list = allAfiliaciones();
    const viva = list.find((a) => a.sujetoId === sujetoId && a.organismoId === organismoId && ["Solicitada", "Vinculada"].includes(a.estado));
    if (viva) return viva;
    const rec = { id: "AF-" + String(list.length + 1).padStart(4, "0"), tipo, sujetoId, organismoId, deporte, estado: "Solicitada", desde: null, hasta: null, origen, proponenteId, fecha: _todayISO() };
    writeStore("afiliaciones", [...list, rec]);
    return { ...rec };
  }
  function cambiarAfiliacion(sujetoId, organismoId, estado, meta = {}) {
    const list = allAfiliaciones();
    const desde = estado === "Terminada" ? ["Vinculada"] : ["Solicitada"];
    let i = list.findIndex((a) => a.sujetoId === sujetoId && a.organismoId === organismoId && desde.includes(a.estado));
    if (i < 0 && estado === "Vinculada") {
      list.push({ id: "AF-" + String(list.length + 1).padStart(4, "0"), tipo: meta.tipo || "deportista", sujetoId, organismoId, deporte: meta.deporte || "", estado: "Solicitada", origen: meta.origen || "club", fecha: _todayISO() });
      i = list.length - 1;
    }
    if (i < 0) return null;
    const hoy = _todayISO();
    list[i] = {
      ...list[i],
      estado,
      motivo: meta.motivo || list[i].motivo || "",
      ...estado === "Vinculada" ? { desde: hoy } : {},
      ...estado === "Terminada" ? { hasta: hoy, fin: meta.fin || "retiro" } : {}
    };
    writeStore("afiliaciones", list);
    return { ...list[i] };
  }
  function getDeportista(id2) {
    return allDeportistas().find((d) => d.id === id2) || null;
  }
  function indexByParent(orgs) {
    const idx = {};
    orgs.forEach((o2) => {
      (idx[o2.parentId] = idx[o2.parentId] || []).push(o2);
    });
    const byId = {};
    orgs.forEach((o2) => {
      byId[o2.id] = o2;
    });
    allAfiliaciones().forEach((a) => {
      const club = byId[a.sujetoId];
      if (a.tipo !== "club" || a.estado !== "Vinculada" || !club || club.parentId === a.organismoId) return;
      (idx[a.organismoId] = idx[a.organismoId] || []).push(club);
    });
    return idx;
  }
  function subtreeOf(id2) {
    const orgs = allOrganismos();
    const idx = indexByParent(orgs);
    const out = [];
    const stack = [...idx[id2] || []];
    const visto = /* @__PURE__ */ new Set();
    while (stack.length) {
      const node = stack.pop();
      if (visto.has(node.id)) continue;
      visto.add(node.id);
      out.push({ ...node });
      const kids = idx[node.id];
      if (kids) for (const k of kids) stack.push(k);
    }
    return out;
  }
  function ancestorsOf(id2) {
    const orgs = allOrganismos();
    const byId = {};
    orgs.forEach((o2) => {
      byId[o2.id] = o2;
    });
    const chain = [];
    let cur = byId[id2];
    const guard = /* @__PURE__ */ new Set();
    while (cur && cur.parentId != null && byId[cur.parentId] && !guard.has(cur.parentId)) {
      guard.add(cur.parentId);
      cur = byId[cur.parentId];
      chain.push({ ...cur });
    }
    return chain;
  }
  function deportistasOf(orgId) {
    const sub = subtreeOf(orgId);
    const self = getOrganismo(orgId);
    const clubIds = new Set(sub.filter((o2) => o2.tipo === "club").map((o2) => o2.id));
    if (self && self.tipo === "club") clubIds.add(self.id);
    const orgIds = /* @__PURE__ */ new Set([orgId, ...sub.map((o2) => o2.id)]);
    return allDeportistas().filter(esDeportista).filter((d) => d.clubIds.some((c) => clubIds.has(c)) || !d.clubIds.length && d.registradoPor && orgIds.has(d.registradoPor));
  }
  function countDescendants(orgId) {
    const sub = subtreeOf(orgId);
    const c = { federaciones: 0, ligas: 0, clubes: 0, deportistas: 0 };
    sub.forEach((o2) => {
      if (o2.tipo === "federacion") c.federaciones++;
      else if (o2.tipo === "liga") c.ligas++;
      else if (o2.tipo === "club") c.clubes++;
    });
    c.deportistas = deportistasOf(orgId).length;
    return c;
  }
  function updateOrganismo(id2, patch) {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const i = nuevos.findIndex((o2) => o2.id === id2);
    if (i >= 0) {
      nuevos[i] = { ...nuevos[i], ...patch };
      writeStore("organismos-nuevos", nuevos);
    } else {
      const overrides = readStore("organismos-overrides", {}) || {};
      overrides[id2] = { ...overrides[id2] || {}, ...patch };
      writeStore("organismos-overrides", overrides);
    }
    return getOrganismo(id2);
  }
  function setEstado(id2, estado, meta = {}) {
    const prev = getOrganismo(id2);
    const updated = updateOrganismo(id2, { estado, ...meta.patch || {} });
    if (updated && updated.tipo === "club" && updated.parentId) {
      if (estado === "Activo") cambiarAfiliacion(id2, updated.parentId, "Vinculada", { tipo: "club", origen: "activacion" });
      if (estado === "Rechazado") cambiarAfiliacion(id2, updated.parentId, "Rechazada", { motivo: meta.motivo });
      if (estado === "En revisi\xF3n") solicitarAfiliacion({ tipo: "club", sujetoId: id2, organismoId: updated.parentId, deporte: updated.deporte, origen: "activacion" });
    }
    auditLog({
      orgId: id2,
      notif: true,
      fecha: meta.fecha || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      responsable: meta.responsable || "",
      rol: meta.rol || "",
      accion: meta.accion || "Cambio de estado",
      de: prev ? prev.estado : "",
      a: estado,
      motivo: meta.motivo || ""
    });
    return updated;
  }
  function sancionar(id2, estado, meta = {}) {
    const o2 = getOrganismo(id2);
    if (!o2 || !["Suspendido", "Cancelado"].includes(estado)) return o2;
    if (!(o2.estado === "Activo" || estado === "Cancelado" && o2.estado === "Suspendido")) return o2;
    return setEstado(id2, estado, { ...meta, accion: estado === "Suspendido" ? "Suspendido por el Ministerio" : "Cancelado por el Ministerio" });
  }
  function reactivar(id2, meta = {}) {
    const o2 = getOrganismo(id2);
    if (!o2 || o2.estado !== "Suspendido") return o2;
    const extra = o2.tipo === "federacion" ? { validacion: { mindeporte: "pendiente", comite: "pendiente" } } : {};
    return setEstado(id2, "En revisi\xF3n", { ...meta, accion: "Reactivaci\xF3n: vuelve a revisi\xF3n", patch: extra });
  }
  function ultimoCambio(id2) {
    const o2 = getOrganismo(id2);
    return o2 ? allAudit(id2).find((a) => a.a === o2.estado && a.de !== a.a) || null : null;
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }
  function allAudit(orgId) {
    const list = (readStore("audit", []) || []).map((a) => ({ ...a }));
    return orgId ? list.filter((a) => a.orgId === orgId) : list;
  }
  function seedTrazabilidadDemo() {
    const mode = function() {
      try {
        return localStorage.getItem("naowee-organismos-demo-mode");
      } catch (_) {
        return null;
      }
    }();
    if (mode === "blank") return;
    seedCicloDemo();
    if (allAudit("FED-040").length) return;
    const trail = [
      // Fed. Patinaje: la cargó el Comité (Preinscrita), completó y envió; doble validación Comité + Ministerio
      { orgId: "FED-040", fecha: "2026-02-10", responsable: "Camilo Duarte", rol: "Comit\xE9 (COC)", accion: "Cargue masivo", de: "", a: "Preinscrito", motivo: "" },
      { orgId: "FED-040", fecha: "2026-02-12", responsable: "Alberto Herrera", rol: "Federaci\xF3n", accion: "Formulario enviado", de: "Preinscrito", a: "En revisi\xF3n", motivo: "" },
      { orgId: "FED-040", fecha: "2026-02-16", responsable: "Camilo Duarte", rol: "Comit\xE9 (COC)", accion: "Aval del Comit\xE9 registrado", de: "En revisi\xF3n", a: "En revisi\xF3n", motivo: "Doble validaci\xF3n: mitad del Comit\xE9 aprobada" },
      { orgId: "FED-040", fecha: "2026-02-20", responsable: "Mar\xEDa F. Rojas", rol: "Ministerio", accion: "Habilitada por el Ministerio", de: "En revisi\xF3n", a: "Activo", motivo: "Doble validaci\xF3n completa (Ministerio + Comit\xE9)" },
      // Liga del Valle: la cargó la Federación, completó y envió; la aprueba la Federación
      { orgId: "LIG-001", fecha: "2026-03-02", responsable: "Alberto Herrera", rol: "Federaci\xF3n", accion: "Cargue masivo", de: "", a: "Preinscrito", motivo: "" },
      { orgId: "LIG-001", fecha: "2026-03-05", responsable: "Sandra Mej\xEDa", rol: "Liga", accion: "Formulario enviado", de: "Preinscrito", a: "En revisi\xF3n", motivo: "" },
      { orgId: "LIG-001", fecha: "2026-03-08", responsable: "Alberto Herrera", rol: "Federaci\xF3n", accion: "Habilitada por la Federaci\xF3n", de: "En revisi\xF3n", a: "Activo", motivo: "Reconocimiento deportivo (IVC) verificado" },
      // Club Patín Cali: autorregistro público; la Liga devuelve a corrección, el club corrige y reenvía
      { orgId: "CLU-001", fecha: "2026-03-15", responsable: "\xD3scar Cardona", rol: "Club", accion: "Registro p\xFAblico", de: "", a: "En revisi\xF3n", motivo: "" },
      { orgId: "CLU-001", fecha: "2026-03-18", responsable: "Sandra Mej\xEDa", rol: "Liga", accion: "Correcci\xF3n solicitada", de: "En revisi\xF3n", a: "En correcci\xF3n", motivo: "Falta el reconocimiento del ente municipal" },
      { orgId: "CLU-001", fecha: "2026-03-21", responsable: "\xD3scar Cardona", rol: "Club", accion: "Corregido y reenviado", de: "En correcci\xF3n", a: "En revisi\xF3n", motivo: "" },
      { orgId: "CLU-001", fecha: "2026-03-25", responsable: "Sandra Mej\xEDa", rol: "Liga", accion: "Habilitado por la Liga", de: "En revisi\xF3n", a: "Activo", motivo: "Documentaci\xF3n completa" }
    ];
    trail.forEach((e) => auditLog(e));
  }
  function seedCicloDemo() {
    if (allAudit("CLU-012").length) return;
    const M = "Mar\xEDa F. Rojas";
    [
      { orgId: "CLU-002", fecha: "2026-06-10", responsable: "Sandra Mej\xEDa", rol: "Liga", accion: "Cargue masivo", de: "", a: "Preinscrito", motivo: "" },
      { orgId: "LIG-005", fecha: "2026-06-01", responsable: "M\xF3nica Mart\xEDnez Ospina", rol: "Federaci\xF3n", accion: "Cargue masivo", de: "", a: "Preinscrito", motivo: "" },
      { orgId: "FED-057", fecha: "2026-04-04", responsable: "Camilo Duarte", rol: "Comit\xE9 (COC)", accion: "Cargue masivo", de: "", a: "Preinscrito", motivo: "" },
      { orgId: "CLU-012", fecha: "2026-09-20", responsable: "Mauricio Gil Restrepo", rol: "Club", accion: "Registro p\xFAblico", de: "", a: "En revisi\xF3n", motivo: "" },
      { orgId: "CLU-012", fecha: "2026-09-24", responsable: "Sandra Mej\xEDa", rol: "Liga", accion: "Correcci\xF3n solicitada", de: "En revisi\xF3n", a: "En correcci\xF3n", motivo: "Documentaci\xF3n incompleta \u2014 falta el reconocimiento deportivo del ente municipal" },
      { orgId: "CLU-008", fecha: "2026-05-28", responsable: "Diego Ospina Mar\xEDn", rol: "Liga", accion: "Rechazado", de: "En revisi\xF3n", a: "Rechazado", motivo: "Reconocimiento deportivo no v\xE1lido o vencido \u2014 venci\xF3 en enero de 2026" },
      { orgId: "LIG-007", fecha: "2026-04-15", responsable: "\xC1ngela Naranjo Rodr\xEDguez", rol: "Federaci\xF3n", accion: "Rechazado", de: "En revisi\xF3n", a: "Rechazado", motivo: "Datos del representante legal incorrectos" },
      { orgId: "LIG-008", fecha: "2026-08-12", responsable: M, rol: "Ministerio", accion: "Suspendido por el Ministerio", de: "Activo", a: "Suspendido", motivo: "Investigaci\xF3n disciplinaria abierta por la Inspecci\xF3n, Vigilancia y Control" },
      { orgId: "CLU-010", fecha: "2026-07-30", responsable: M, rol: "Ministerio", accion: "Suspendido por el Ministerio", de: "Activo", a: "Suspendido", motivo: "Reconocimiento deportivo vencido sin renovar" },
      { orgId: "FED-037", fecha: "2026-06-18", responsable: M, rol: "Ministerio", accion: "Suspendido por el Ministerio", de: "Activo", a: "Suspendido", motivo: "No present\xF3 informe de gesti\xF3n anual" }
    ].forEach((e) => auditLog(e));
  }
  function allSolicitudes() {
    return (readStore("solicitudes", []) || []).map((s) => ({ ...s }));
  }
  function solicitudesDeClub(clubId) {
    return allSolicitudes().filter((s) => s.clubId === clubId);
  }
  function ligasDisponiblesPara(clubId) {
    const c = getOrganismo(clubId);
    if (!c) return [];
    const ya = new Set(afiliacionesDe(clubId).filter((a) => ["Solicitada", "Vinculada"].includes(a.estado)).map((a) => a.organismoId));
    return allOrganismos().filter((l) => l.tipo === "liga" && l.estado === "Activo" && !ya.has(l.id) && l.deportes.some((d) => c.deportes.includes(d)));
  }
  function solicitarLiga(clubId, ligaId, meta = {}) {
    const c = getOrganismo(clubId);
    const rec = solicitarAfiliacion({ tipo: "club", sujetoId: clubId, organismoId: ligaId, deporte: c ? c.deporte : "", origen: "solicitud" });
    auditLog({ orgId: clubId, fecha: _todayISO(), responsable: meta.responsable || "", rol: "Club", accion: `Afiliaci\xF3n solicitada a ${(getOrganismo(ligaId) || {}).nombre || ligaId}`, a: "Solicitada", notif: true });
    return rec;
  }
  function organismosDeTerritorio(t) {
    return allOrganismos().filter((o2) => (t.municipio ? o2.tipo === "club" : ["liga", "club"].includes(o2.tipo)) && enTerritorio(o2, t));
  }
  var COMITES, FEDERACIONES_COC, FEDERACIONES_FICTICIAS, LIGAS, CLUBES, DEPORTISTAS, SEED_ORGANISMOS, SEED_DEPORTISTAS, DEPORTES_SEED, AF_DESDE, AFILIACIONES_EXTRA, STORE_PREFIX, SEED_FLAG, SEED_VERSION, esDeportista, _todayISO, enTerritorio;
  var init_organismos_data = __esm({
    "../front/DEMO/naowee-organismos/shared/organismos-data.js"() {
      init_estados();
      COMITES = [
        { id: "COC", tipo: "comite", nombre: "Comit\xE9 Ol\xEDmpico Colombiano", nit: "860028097-1", sector: "Ol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000100", nombre: "Camilo", apellido: "Duarte", correo: "presidencia@coc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550001", correo: "contacto@coc.demo.co" }, fechaRegistro: "2025-11-02" },
        { id: "CPC", tipo: "comite", nombre: "Comit\xE9 Paral\xEDmpico Colombiano", nit: "830500110-4", sector: "Paral\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000101", nombre: "Marcela", apellido: "R\xEDos", correo: "presidencia@cpc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06" }, contacto: { telefono: "6014801515", correo: "contacto@paralimpicocol.demo.co" }, fechaRegistro: "2025-11-05" },
        { id: "FSC", tipo: "comite", nombre: "Federaci\xF3n Sordol\xEDmpica de Colombia", nit: "900700221-2", sector: "Sordol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000102", nombre: "Hern\xE1n", apellido: "P\xE9rez", correo: "presidencia@sordolimpico.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114" }, contacto: { telefono: "6045551020", correo: "contacto@sordolimpico.demo.co" }, fechaRegistro: "2025-11-08" }
      ];
      FEDERACIONES_COC = [
        { id: "FED-001", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Actividades Subacu\xE1ticas", nit: "890315463-9", sector: "Ol\xEDmpico", deporte: "Actividades Subacu\xE1ticas", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000001", nombre: "Andr\xE9s", apellido: "Vargas Guzm\xE1n", correo: "presidencia@fedeactividadessubac.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550002", correo: "contacto@fedeactividadessubac.demo.co" }, fechaRegistro: "2026-02-02" },
        { id: "FED-002", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Ajedrez", nit: "860016595-0", sector: "Ol\xEDmpico", deporte: "Ajedrez", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000002", nombre: "Carolina", apellido: "Pineda Zuluaga", correo: "presidencia@fedeajedrez.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550003", correo: "contacto@fedeajedrez.demo.co" }, fechaRegistro: "2026-03-03" },
        { id: "FED-003", tipo: "federacion", nombre: "Federaci\xF3n Arqueros de Colombia", nit: "811030815-6", sector: "Ol\xEDmpico", deporte: "Arqueros de Colombia", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000003", nombre: "Fernando", apellido: "Escobar C\xE1rdenas", correo: "presidencia@fedearquerosdecolomb.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Carrera 66B No. 31A -15" }, contacto: { telefono: "6015550004", correo: "contacto@fedearquerosdecolomb.demo.co" }, fechaRegistro: "2026-04-04" },
        { id: "FED-004", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Atletismo", nit: "860075776-9", sector: "Ol\xEDmpico", deporte: "Atletismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000004", nombre: "Diana", apellido: "Cano Reyes", correo: "presidencia@fedeatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550005", correo: "contacto@fedeatletismo.demo.co" }, fechaRegistro: "2026-05-05" },
        { id: "FED-005", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Automovilismo Deportivo", nit: "860047439-2", sector: "Ol\xEDmpico", deporte: "Automovilismo Deportivo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000005", nombre: "Ricardo", apellido: "Ram\xEDrez Castro", correo: "presidencia@fedeautomovilismodep.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 102 a No. 49a-24" }, contacto: { telefono: "6015550006", correo: "contacto@fedeautomovilismodep.demo.co" }, fechaRegistro: "2026-06-06" },
        { id: "FED-006", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de B\xE1dminton", nit: "900094889-8", sector: "Ol\xEDmpico", deporte: "B\xE1dminton", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000006", nombre: "Marcela", apellido: "C\xE1rdenas Escobar", correo: "presidencia@fedebadminton.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Transv. 21 BIS No. 60-35/39 Barrio San Luis" }, contacto: { telefono: "6015550007", correo: "contacto@fedebadminton.demo.co" }, fechaRegistro: "2026-01-07" },
        { id: "FED-007", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Baile Deportivo", nit: "900856525-3", sector: "Ol\xEDmpico", deporte: "Baile Deportivo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000007", nombre: "Juli\xE1n", apellido: "Salazar L\xF3pez", correo: "presidencia@fedebailedeportivo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 59A #2c-67" }, contacto: { telefono: "6015550008", correo: "contacto@fedebailedeportivo.demo.co" }, fechaRegistro: "2026-02-08" },
        { id: "FED-008", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Baloncesto", nit: "860038199-1", sector: "Ol\xEDmpico", deporte: "Baloncesto", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000008", nombre: "Paola", apellido: "Franco Arango", correo: "presidencia@fedebaloncesto.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avenida Carrera 30 # 64-81" }, contacto: { telefono: "6015550009", correo: "contacto@fedebaloncesto.demo.co" }, fechaRegistro: "2026-03-09" },
        { id: "FED-009", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Balonmano", nit: "900359754-1", sector: "Ol\xEDmpico", deporte: "Balonmano", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000009", nombre: "Sebasti\xE1n", apellido: "Hern\xE1ndez G\xF3mez", correo: "presidencia@fedebalonmano.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 36 No. 5B3-62 Piso 2 Oficina 201" }, contacto: { telefono: "6015550010", correo: "contacto@fedebalonmano.demo.co" }, fechaRegistro: "2026-04-10" },
        { id: "FED-010", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de B\xE9isbol", nit: "890480480-1", sector: "Ol\xEDmpico", deporte: "B\xE9isbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000010", nombre: "Natalia", apellido: "Mej\xEDa Su\xE1rez", correo: "presidencia@fedebeisbol.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Centro la Matuna Edificio CONCASA Of. 404" }, contacto: { telefono: "6015550011", correo: "contacto@fedebeisbol.demo.co" }, fechaRegistro: "2026-05-11" },
        { id: "FED-011", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Billar", nit: "860061869-4", sector: "Ol\xEDmpico", deporte: "Billar", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000011", nombre: "Camilo", apellido: "Arango Franco", correo: "presidencia@fedebillar.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 402" }, contacto: { telefono: "6015550012", correo: "contacto@fedebillar.demo.co" }, fechaRegistro: "2026-06-12" },
        { id: "FED-012", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Bowling", nit: "860533073-5", sector: "Ol\xEDmpico", deporte: "Bowling", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000012", nombre: "Adriana", apellido: "Bravo Rojas", correo: "presidencia@fedebowling.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avda. Calle 63 No. 68-99 2do. Piso Bolera El Salitre" }, contacto: { telefono: "6015550013", correo: "contacto@fedebowling.demo.co" }, fechaRegistro: "2026-01-13" },
        { id: "FED-013", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Boxeo", nit: "800231411-7", sector: "Ol\xEDmpico", deporte: "Boxeo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000013", nombre: "Mauricio", apellido: "Rodr\xEDguez Naranjo", correo: "presidencia@fedeboxeo.demo.co" }, ubicacion: { depto: "Atlantico", ciudad: "Barranquilla", zona: "Urbana", direccion: "Cra. 38 No. 52-52 Edificio JT Oficina 1" }, contacto: { telefono: "6015550014", correo: "contacto@fedeboxeo.demo.co" }, fechaRegistro: "2026-02-14" },
        { id: "FED-014", tipo: "federacion", nombre: "Federaci\xF3n Clubes de Bridge de Colombia", nit: "900572599-8", sector: "Ol\xEDmpico", deporte: "Bridge", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000014", nombre: "Luc\xEDa", apellido: "Castro Ram\xEDrez", correo: "presidencia@fedebridge.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 7 A No. 69 - 07 Barrio Quinta Camacho" }, contacto: { telefono: "6015550015", correo: "contacto@fedebridge.demo.co" }, fechaRegistro: "2026-03-15" },
        { id: "FED-015", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Canotaje", nit: "830083646-4", sector: "Ol\xEDmpico", deporte: "Canotaje", parentId: "COC", estado: "En revisi\xF3n", repLegal: { tipoDoc: "CC", numDoc: "10000015", nombre: "Gustavo", apellido: "Quintero Betancur", correo: "presidencia@fedecanotaje.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Transversal 21 bis No. 60-35/39 Teusaquillo" }, contacto: { telefono: "6015550016", correo: "contacto@fedecanotaje.demo.co" }, fechaRegistro: "2026-04-16" },
        { id: "FED-016", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Ciclismo", nit: "860020863-5", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000016", nombre: "\xC1ngela", apellido: "Naranjo Rodr\xEDguez", correo: "presidencia@fedeciclismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 47 No. 106 A - 37 Barrio Estoril" }, contacto: { telefono: "6015550017", correo: "contacto@fedeciclismo.demo.co" }, fechaRegistro: "2026-05-17" },
        { id: "FED-017", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Coleo", nit: "822003697-9", sector: "Ol\xEDmpico", deporte: "Coleo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000017", nombre: "Felipe", apellido: "Zuluaga Pineda", correo: "presidencia@fedecoleo.demo.co" }, ubicacion: { depto: "Meta", ciudad: "Villavicencio", zona: "Urbana", direccion: "Camino Ganadero Parque las Malocas Centro Ecuestre Of. 04" }, contacto: { telefono: "6015550018", correo: "contacto@fedecoleo.demo.co" }, fechaRegistro: "2026-06-18" },
        { id: "FED-018", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Deportes A\xE9reos", nit: "830066529-9", sector: "Ol\xEDmpico", deporte: "Deportes A\xE9reos", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000018", nombre: "Sandra", apellido: "Torres Duarte", correo: "presidencia@fededeportesaereos.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "carrera 26 # 72-73" }, contacto: { telefono: "6015550019", correo: "contacto@fededeportesaereos.demo.co" }, fechaRegistro: "2026-01-19" },
        { id: "FED-019", tipo: "federacion", nombre: "Federaci\xF3n Colombiana Deportiva Militar", nit: "800230729-9", sector: "Ol\xEDmpico", deporte: "Deportiva Militar", parentId: "COC", estado: "En revisi\xF3n", repLegal: { tipoDoc: "CC", numDoc: "10000019", nombre: "\xD3scar", apellido: "Su\xE1rez Mej\xEDa", correo: "presidencia@fededeportivamilitar.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 59a # 44b-29 Barrio la Esmeralda" }, contacto: { telefono: "6015550020", correo: "contacto@fededeportivamilitar.demo.co" }, fechaRegistro: "2026-02-20" },
        { id: "FED-020", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Disco Volador", nit: "901154209-1", sector: "Ol\xEDmpico", deporte: "Disco Volador", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000020", nombre: "Valeria", apellido: "Molina Cort\xE9s", correo: "presidencia@fedediscovolador.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550021", correo: "contacto@fedediscovolador.demo.co" }, fechaRegistro: "2026-03-21" },
        { id: "FED-021", tipo: "federacion", nombre: "Federaci\xF3n Ecuestre de Colombia", nit: "860025991-2", sector: "Ol\xEDmpico", deporte: "Ecuestre", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000021", nombre: "Hern\xE1n", apellido: "Duarte Torres", correo: "presidencia@fedeecuestre.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 98 No. 21 - 36 Oficina 602 Edificio Centro 98" }, contacto: { telefono: "6015550022", correo: "contacto@fedeecuestre.demo.co" }, fechaRegistro: "2026-04-22" },
        { id: "FED-022", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Escalada Deportiva", nit: "900645499-4", sector: "Ol\xEDmpico", deporte: "Escalada Deportiva", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000022", nombre: "Claudia", apellido: "L\xF3pez Salazar", correo: "presidencia@fedeescaladadeportiv.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 21 # 50-34" }, contacto: { telefono: "6015550023", correo: "contacto@fedeescaladadeportiv.demo.co" }, fechaRegistro: "2026-05-23" },
        { id: "FED-023", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Esgrima", nit: "830016532-8", sector: "Ol\xEDmpico", deporte: "Esgrima", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000023", nombre: "Rodrigo", apellido: "Ospina Mart\xEDnez", correo: "presidencia@fedeesgrima.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Avenida Ciudad de Quito #64-81 oficina 602" }, contacto: { telefono: "6015550024", correo: "contacto@fedeesgrima.demo.co" }, fechaRegistro: "2026-06-24" },
        { id: "FED-024", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Esqu\xED N\xE1utico y Wakeboard", nit: "860503520-8", sector: "Ol\xEDmpico", deporte: "Esqu\xED N\xE1utico y Wakeboard", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000024", nombre: "Patricia", apellido: "Betancur Quintero", correo: "presidencia@fedeesquinauticoywak.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550025", correo: "contacto@fedeesquinauticoywak.demo.co" }, fechaRegistro: "2026-01-25" },
        { id: "FED-025", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Fisicoculturismo", nit: "900134600-1", sector: "Ol\xEDmpico", deporte: "Fisicoculturismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000025", nombre: "Iv\xE1n", apellido: "Reyes Cano", correo: "presidencia@fedefisicoculturismo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 12 C No. 24 A - 119 Barrio Las Americas" }, contacto: { telefono: "6015550026", correo: "contacto@fedefisicoculturismo.demo.co" }, fechaRegistro: "2026-02-26" },
        { id: "FED-026", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de F\xFAtbol", nit: "860033879-9", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000026", nombre: "M\xF3nica", apellido: "Mart\xEDnez Ospina", correo: "presidencia@fedefutbol.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 45 A No. 94-06 Pisos 6 7 y 8" }, contacto: { telefono: "6015550027", correo: "contacto@fedefutbol.demo.co" }, fechaRegistro: "2026-03-27" },
        { id: "FED-027", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de F\xFAtbol de Sal\xF3n", nit: "860052688-1", sector: "Ol\xEDmpico", deporte: "F\xFAtbol de Sal\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000027", nombre: "Alberto", apellido: "Rojas Bravo", correo: "presidencia@fedefutboldesalon.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 26a #61c-07 Campin" }, contacto: { telefono: "6015550028", correo: "contacto@fedefutboldesalon.demo.co" }, fechaRegistro: "2026-04-01" },
        { id: "FED-028", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Gimnasia", nit: "860535259-7", sector: "Ol\xEDmpico", deporte: "Gimnasia", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000028", nombre: "Liliana", apellido: "Guzm\xE1n Vargas", correo: "presidencia@fedegimnasia.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550029", correo: "contacto@fedegimnasia.demo.co" }, fechaRegistro: "2026-05-02" },
        { id: "FED-029", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Golf", nit: "860006815-3", sector: "Ol\xEDmpico", deporte: "Golf", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000029", nombre: "Nicol\xE1s", apellido: "Cort\xE9s Molina", correo: "presidencia@fedegolf.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Carrera 7a No. 72 - 64 Interior 30 Chapinero" }, contacto: { telefono: "6015550030", correo: "contacto@fedegolf.demo.co" }, fechaRegistro: "2026-06-03" },
        { id: "FED-030", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Jiu-Jitsu", nit: "900123386-0", sector: "Ol\xEDmpico", deporte: "Jiu-Jitsu", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000030", nombre: "Beatriz", apellido: "G\xF3mez Hern\xE1ndez", correo: "presidencia@fedejiujitsu.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 7" }, contacto: { telefono: "6015550031", correo: "contacto@fedejiujitsu.demo.co" }, fechaRegistro: "2026-01-04" },
        { id: "FED-031", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Judo", nit: "860532945-8", sector: "Ol\xEDmpico", deporte: "Judo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000031", nombre: "Andr\xE9s", apellido: "Vargas Guzm\xE1n", correo: "presidencia@fedejudo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 4 Of. 407" }, contacto: { telefono: "6015550032", correo: "contacto@fedejudo.demo.co" }, fechaRegistro: "2026-02-05" },
        { id: "FED-032", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de K\xE1rate Do", nit: "800101126-5", sector: "Ol\xEDmpico", deporte: "K\xE1rate Do", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000032", nombre: "Carolina", apellido: "Pineda Zuluaga", correo: "presidencia@fedekaratedo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Piso 4" }, contacto: { telefono: "6015550033", correo: "contacto@fedekaratedo.demo.co" }, fechaRegistro: "2026-03-06" },
        { id: "FED-033", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Karts", nit: "860065896-1", sector: "Ol\xEDmpico", deporte: "Karts", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000033", nombre: "Fernando", apellido: "Escobar C\xE1rdenas", correo: "presidencia@fedekarts.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550034", correo: "contacto@fedekarts.demo.co" }, fechaRegistro: "2026-04-07" },
        { id: "FED-034", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Levantamiento de Pesas", nit: "890480912-1", sector: "Ol\xEDmpico", deporte: "Levantamiento de Pesas", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000034", nombre: "Diana", apellido: "Cano Reyes", correo: "presidencia@fedelevantamientodep.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 39 No. 9 - 31 Santiago de Cali" }, contacto: { telefono: "6015550035", correo: "contacto@fedelevantamientodep.demo.co" }, fechaRegistro: "2026-05-08" },
        { id: "FED-035", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Lucha", nit: "890310137-1", sector: "Ol\xEDmpico", deporte: "Lucha", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000035", nombre: "Ricardo", apellido: "Ram\xEDrez Castro", correo: "presidencia@fedelucha.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Calle 45 FF No. 75 - 37" }, contacto: { telefono: "6015550036", correo: "contacto@fedelucha.demo.co" }, fechaRegistro: "2026-06-09" },
        { id: "FED-036", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Motociclismo", nit: "800176937-3", sector: "Ol\xEDmpico", deporte: "Motociclismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000036", nombre: "Marcela", apellido: "C\xE1rdenas Escobar", correo: "presidencia@fedemotociclismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 706" }, contacto: { telefono: "6015550037", correo: "contacto@fedemotociclismo.demo.co" }, fechaRegistro: "2026-01-10" },
        { id: "FED-037", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Moton\xE1utica", nit: "811022609-1", sector: "Ol\xEDmpico", deporte: "Moton\xE1utica", parentId: "COC", estado: "Suspendido", repLegal: { tipoDoc: "CC", numDoc: "10000037", nombre: "Juli\xE1n", apellido: "Salazar L\xF3pez", correo: "presidencia@fedemotonautica.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 45 # 66B-15 Salitre Greco" }, contacto: { telefono: "6015550038", correo: "contacto@fedemotonautica.demo.co" }, fechaRegistro: "2026-02-11" },
        { id: "FED-038", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Nataci\xF3n", nit: "890308001-0", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000038", nombre: "Paola", apellido: "Franco Arango", correo: "presidencia@fedenatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 9B No. 27 - 49 Barrio Champana" }, contacto: { telefono: "6015550039", correo: "contacto@fedenatacion.demo.co" }, fechaRegistro: "2026-03-12" },
        { id: "FED-039", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Orientaci\xF3n", nit: "804013044-7", sector: "Ol\xEDmpico", deporte: "Orientaci\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000039", nombre: "Sebasti\xE1n", apellido: "Hern\xE1ndez G\xF3mez", correo: "presidencia@fedeorientacion.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550040", correo: "contacto@fedeorientacion.demo.co" }, fechaRegistro: "2026-04-13" },
        { id: "FED-040", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Patinaje", nit: "860077223-7", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000040", nombre: "Alberto", apellido: "Herrera", correo: "presidencia@fedepatinaje.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 74 No. 25 F - 10 Barrio Modelia" }, contacto: { telefono: "6015550041", correo: "contacto@fedepatinaje.demo.co" }, fechaRegistro: "2026-05-14" },
        { id: "FED-041", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Porrismo", nit: "901057369-6", sector: "Ol\xEDmpico", deporte: "Porrismo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000041", nombre: "Camilo", apellido: "Arango Franco", correo: "presidencia@fedeporrismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra 11 #146-75 Ed. 147" }, contacto: { telefono: "6015550042", correo: "contacto@fedeporrismo.demo.co" }, fechaRegistro: "2026-06-15" },
        { id: "FED-042", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Rugby", nit: "900429096-4", sector: "Ol\xEDmpico", deporte: "Rugby", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000042", nombre: "Adriana", apellido: "Bravo Rojas", correo: "presidencia@federugby.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Calle 59 #70-124" }, contacto: { telefono: "6015550043", correo: "contacto@federugby.demo.co" }, fechaRegistro: "2026-01-16" },
        { id: "FED-043", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Sambo", nit: "900262915-2", sector: "Ol\xEDmpico", deporte: "Sambo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000043", nombre: "Mauricio", apellido: "Rodr\xEDguez Naranjo", correo: "presidencia@fedesambo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 38A No. 7-05 El Templete" }, contacto: { telefono: "6015550044", correo: "contacto@fedesambo.demo.co" }, fechaRegistro: "2026-02-17" },
        { id: "FED-044", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Savate", nit: "901239083-7", sector: "Ol\xEDmpico", deporte: "Savate", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000044", nombre: "Luc\xEDa", apellido: "Castro Ram\xEDrez", correo: "presidencia@fedesavate.demo.co" }, ubicacion: { depto: "Tolima", ciudad: "Ibagu\xE9", zona: "Urbana", direccion: "Urbanizacion La Maria Parte Baja Casa 20" }, contacto: { telefono: "6015550045", correo: "contacto@fedesavate.demo.co" }, fechaRegistro: "2026-03-18" },
        { id: "FED-045", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Softbol", nit: "890401221-1", sector: "Ol\xEDmpico", deporte: "Softbol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000045", nombre: "Gustavo", apellido: "Quintero Betancur", correo: "presidencia@fedesoftbol.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Estadio de Softbol de Chiquinquira" }, contacto: { telefono: "6015550046", correo: "contacto@fedesoftbol.demo.co" }, fechaRegistro: "2026-04-19" },
        { id: "FED-046", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Squash", nit: "800045466-4", sector: "Ol\xEDmpico", deporte: "Squash", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000046", nombre: "\xC1ngela", apellido: "Naranjo Rodr\xEDguez", correo: "presidencia@fedesquash.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550047", correo: "contacto@fedesquash.demo.co" }, fechaRegistro: "2026-05-20" },
        { id: "FED-047", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Surf", nit: "901091612-5", sector: "Ol\xEDmpico", deporte: "Surf", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000047", nombre: "Felipe", apellido: "Zuluaga Pineda", correo: "presidencia@fedesurf.demo.co" }, ubicacion: { depto: "Bolivar", ciudad: "Cartagena", zona: "Urbana", direccion: "Isla Tierra Bomba Av. Principal Cabana Vista Hermosa" }, contacto: { telefono: "6015550048", correo: "contacto@fedesurf.demo.co" }, fechaRegistro: "2026-06-21" },
        { id: "FED-048", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Taekwondo", nit: "860524134-8", sector: "Ol\xEDmpico", deporte: "Taekwondo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000048", nombre: "Sandra", apellido: "Torres Duarte", correo: "presidencia@fedetaekwondo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 603" }, contacto: { telefono: "6015550049", correo: "contacto@fedetaekwondo.demo.co" }, fechaRegistro: "2026-01-22" },
        { id: "FED-049", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tejo", nit: "800078980-0", sector: "Ol\xEDmpico", deporte: "Tejo", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000049", nombre: "\xD3scar", apellido: "Su\xE1rez Mej\xEDa", correo: "presidencia@fedetejo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550050", correo: "contacto@fedetejo.demo.co" }, fechaRegistro: "2026-02-23" },
        { id: "FED-050", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tenis", nit: "860030468-1", sector: "Ol\xEDmpico", deporte: "Tenis", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000050", nombre: "Valeria", apellido: "Molina Cort\xE9s", correo: "presidencia@fedetenis.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Carrera 30 NQS No. 64A-70 Piso 5 Of. 506" }, contacto: { telefono: "6015550051", correo: "contacto@fedetenis.demo.co" }, fechaRegistro: "2026-03-24" },
        { id: "FED-051", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tenis de Mesa", nit: "890106273-1", sector: "Ol\xEDmpico", deporte: "Tenis de Mesa", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000051", nombre: "Hern\xE1n", apellido: "Duarte Torres", correo: "presidencia@fedetenisdemesa.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC costado occidental" }, contacto: { telefono: "6015550052", correo: "contacto@fedetenisdemesa.demo.co" }, fechaRegistro: "2026-04-25" },
        { id: "FED-052", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Tiro y Caza Deportiva", nit: "860008926-1", sector: "Ol\xEDmpico", deporte: "Tiro y Caza Deportiva", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000052", nombre: "Claudia", apellido: "L\xF3pez Salazar", correo: "presidencia@fedetiroycazadeporti.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC Oficina 606" }, contacto: { telefono: "6015550053", correo: "contacto@fedetiroycazadeporti.demo.co" }, fechaRegistro: "2026-05-26" },
        { id: "FED-053", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Triatl\xF3n", nit: "800009065-1", sector: "Ol\xEDmpico", deporte: "Triatl\xF3n", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000053", nombre: "Rodrigo", apellido: "Ospina Mart\xEDnez", correo: "presidencia@fedetriatlon.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Carrera 27 #5 OESTE - 05" }, contacto: { telefono: "6015550054", correo: "contacto@fedetriatlon.demo.co" }, fechaRegistro: "2026-06-27" },
        { id: "FED-054", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Vela", nit: "860045920-5", sector: "Ol\xEDmpico", deporte: "Vela", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000054", nombre: "Patricia", apellido: "Betancur Quintero", correo: "presidencia@fedevela.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 # 64-81 Edificio COC" }, contacto: { telefono: "6015550055", correo: "contacto@fedevela.demo.co" }, fechaRegistro: "2026-01-01" },
        { id: "FED-055", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Voleibol", nit: "860045666-9", sector: "Ol\xEDmpico", deporte: "Voleibol", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000055", nombre: "Iv\xE1n", apellido: "Reyes Cano", correo: "presidencia@fedevoleibol.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av Cra 30 # 64-81 Oficina 702" }, contacto: { telefono: "6015550056", correo: "contacto@fedevoleibol.demo.co" }, fechaRegistro: "2026-02-02" },
        { id: "FED-056", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Wushu", nit: "809011909-1", sector: "Ol\xEDmpico", deporte: "Wushu", parentId: "COC", estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000056", nombre: "M\xF3nica", apellido: "Mart\xEDnez Ospina", correo: "presidencia@fedewushu.demo.co" }, ubicacion: { depto: "Tolima", ciudad: "Ibagu\xE9", zona: "Urbana", direccion: "Calle 18 No 16-30 Urbanizacion la Aurora" }, contacto: { telefono: "6015550057", correo: "contacto@fedewushu.demo.co" }, fechaRegistro: "2026-03-03" },
        { id: "FED-057", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Remo", nit: "901375567-1", sector: "Ol\xEDmpico", deporte: "Remo", parentId: "COC", estado: "Preinscrito", repLegal: { tipoDoc: "CC", numDoc: "10000057", nombre: "Alberto", apellido: "Rojas Bravo", correo: "presidencia@federemo.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 9 # 37-06 Secretaria de Deportes de Cali" }, contacto: { telefono: "6015550058", correo: "contacto@federemo.demo.co" }, fechaRegistro: "2026-04-04" }
      ];
      FEDERACIONES_FICTICIAS = [
        { id: "FED-P01", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Para Atletismo", nit: "901500001-1", sector: "Paral\xEDmpico", deporte: "Para Atletismo", parentId: "CPC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000201", nombre: "Laura", apellido: "Mendoza R\xEDos", correo: "presidencia@fedeparaatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06 Of. 201" }, contacto: { telefono: "6014809090", correo: "contacto@fedeparaatletismo.demo.co" }, fechaRegistro: "2026-02-18" },
        { id: "FED-P02", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Para Nataci\xF3n", nit: "901500002-2", sector: "Paral\xEDmpico", deporte: "Para Nataci\xF3n", parentId: "CPC", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000202", nombre: "Diego", apellido: "Vargas Pe\xF1a", correo: "presidencia@fedeparanatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 36 # 5B-62" }, contacto: { telefono: "6024889090", correo: "contacto@fedeparanatacion.demo.co" }, fechaRegistro: "2026-05-09" },
        { id: "FED-S01", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Atletismo de Sordos", nit: "901500003-3", sector: "Sordol\xEDmpico", deporte: "Atletismo de Sordos", parentId: "FSC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000203", nombre: "Sof\xEDa", apellido: "Guerrero Le\xF3n", correo: "presidencia@fedesordosbaloncesto.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114 Of. 3" }, contacto: { telefono: "6045553030", correo: "contacto@fedesordosbaloncesto.demo.co" }, fechaRegistro: "2026-03-28" }
      ];
      LIGAS = [
        { id: "LIG-001", tipo: "liga", nombre: "Liga de Patinaje del Valle", nit: "805010001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000301", nombre: "Sandra", apellido: "Mej\xEDa", correo: "direccion@ligapatinajevalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-00 Unidad Deportiva Alberto Galindo" }, contacto: { telefono: "6024010101", correo: "contacto@ligapatinajevalle.demo.co" }, fechaRegistro: "2026-03-10" },
        { id: "LIG-002", tipo: "liga", nombre: "Liga de Patinaje de Antioquia", nit: "805010002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000302", nombre: "Carlos", apellido: "Estrada Ruiz", correo: "direccion@ligapatinajeant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 70 # 48-70 Estadio Atanasio Girardot" }, contacto: { telefono: "6044020202", correo: "contacto@ligapatinajeant.demo.co" }, fechaRegistro: "2026-03-14" },
        { id: "LIG-003", tipo: "liga", nombre: "Liga de Patinaje de Bogot\xE1", nit: "805010003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000303", nombre: "Paula", apellido: "Rinc\xF3n D\xEDaz", correo: "direccion@ligapatinajebogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014030303", correo: "contacto@ligapatinajebogota.demo.co" }, fechaRegistro: "2026-05-02" },
        { id: "LIG-004", tipo: "liga", nombre: "Liga de F\xFAtbol del Valle", nit: "805010004-4", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000304", nombre: "Andr\xE9s", apellido: "Lozano Gil", correo: "direccion@ligafutbolvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 50-00" }, contacto: { telefono: "6024040404", correo: "contacto@ligafutbolvalle.demo.co" }, fechaRegistro: "2026-02-22" },
        { id: "LIG-005", tipo: "liga", nombre: "Liga de F\xFAtbol de Antioquia", nit: "805010005-5", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000305", nombre: "Mariana", apellido: "Ospina Cano", correo: "direccion@ligafutbolant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 74 # 48-10" }, contacto: { telefono: "6044050505", correo: "contacto@ligafutbolant.demo.co" }, fechaRegistro: "2026-06-01" },
        { id: "LIG-006", tipo: "liga", nombre: "Liga de Nataci\xF3n del Valle", nit: "805010006-6", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "FED-038", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000306", nombre: "Diego", apellido: "Ospina Mar\xEDn", correo: "direccion@liganatacionvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-40 Complejo Acu\xE1tico" }, contacto: { telefono: "6024060606", correo: "contacto@liganatacionvalle.demo.co" }, fechaRegistro: "2026-02-28" },
        { id: "LIG-007", tipo: "liga", nombre: "Liga de Ciclismo de Antioquia", nit: "805010007-7", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000307", nombre: "Juli\xE1n", apellido: "C\xE1rdenas V\xE9lez", correo: "direccion@ligaciclismoant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Vel\xF3dromo Mart\xEDn Emilio Cochise Rodr\xEDguez" }, contacto: { telefono: "6044070707", correo: "contacto@ligaciclismoant.demo.co" }, fechaRegistro: "2026-04-11" },
        { id: "LIG-008", tipo: "liga", nombre: "Liga de Ciclismo de Bogot\xE1", nit: "805010008-8", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000308", nombre: "Natalia", apellido: "Pe\xF1a Rojas", correo: "direccion@ligaciclismobogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 57-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014080808", correo: "contacto@ligaciclismobogota.demo.co" }, fechaRegistro: "2026-01-30" }
      ];
      CLUBES = [
        { id: "CLU-001", tipo: "club", nombre: "Club Pat\xEDn Cali", nit: "805020001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "profesional", parentId: "LIG-001", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000401", nombre: "\xD3scar", apellido: "Cardona", correo: "admin@clubpatincali.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 39 # 5-20 Barrio San Fernando" }, contacto: { telefono: "6025010101", correo: "contacto@clubpatincali.demo.co" }, fechaRegistro: "2026-04-02" },
        { id: "CLU-002", tipo: "club", nombre: "Club Ruedas del Sur", nit: "805020002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "escuela", parentId: "LIG-001", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000402", nombre: "Carolina", apellido: "Zapata R\xEDos", correo: "admin@ruedasdelsur.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 30 # 28-15" }, contacto: { telefono: "6025020202", correo: "contacto@ruedasdelsur.demo.co" }, fechaRegistro: "2026-06-10" },
        { id: "CLU-003", tipo: "club", nombre: "Club Pat\xEDn Vallecaucano", nit: "805020003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-001", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000403", nombre: "Felipe", apellido: "Mu\xF1oz Cano", correo: "admin@patinvallecaucano.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 8 # 20-40" }, contacto: { telefono: "6025030303", correo: "contacto@patinvallecaucano.demo.co" }, fechaRegistro: "2026-04-15" },
        { id: "CLU-004", tipo: "club", nombre: "Club Patinaje Antioquia Norte", nit: "805020004-4", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-002", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000404", nombre: "Valentina", apellido: "R\xEDos Duque", correo: "admin@patinajeantnorte.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Bello", zona: "Urbana", direccion: "Calle 50 # 55-20" }, contacto: { telefono: "6045040404", correo: "contacto@patinajeantnorte.demo.co" }, fechaRegistro: "2026-04-20" },
        { id: "CLU-005", tipo: "club", nombre: "Club Velocidad Medell\xEDn", nit: "805020005-5", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "profesional", parentId: "LIG-002", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000405", nombre: "Santiago", apellido: "Herrera Cano", correo: "admin@velocidadmedellin.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 65 # 44-50" }, contacto: { telefono: "6045050505", correo: "contacto@velocidadmedellin.demo.co" }, fechaRegistro: "2026-05-18" },
        { id: "CLU-006", tipo: "club", nombre: "Club F\xFAtbol Cali Junior", nit: "805020006-6", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", tipoClub: "escuela", parentId: "LIG-004", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000406", nombre: "Camila", apellido: "Rojas V\xE9lez", correo: "admin@calijunior.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 16 # 100-00" }, contacto: { telefono: "6025060606", correo: "contacto@calijunior.demo.co" }, fechaRegistro: "2026-03-05" },
        { id: "CLU-007", tipo: "club", nombre: "Club Deportivo Aguas del Valle", nit: "805020007-7", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", tipoClub: "profesional", parentId: "LIG-006", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000407", nombre: "Isabella", apellido: "Torres Pe\xF1a", correo: "admin@aguasdelvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-42" }, contacto: { telefono: "6025070707", correo: "contacto@aguasdelvalle.demo.co" }, fechaRegistro: "2026-03-16" },
        { id: "CLU-008", tipo: "club", nombre: "Club Nataci\xF3n Pac\xEDfico", nit: "805020008-8", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", tipoClub: "promotor", parentId: "LIG-006", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000408", nombre: "Mateo", apellido: "Angulo Mena", correo: "admin@natacionpacifico.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Buenaventura", zona: "Urbana", direccion: "Cra. 3 # 5-30" }, contacto: { telefono: "6025080808", correo: "contacto@natacionpacifico.demo.co" }, fechaRegistro: "2026-05-25" },
        { id: "CLU-009", tipo: "club", nombre: "Club Pat\xEDn Bogot\xE1", nit: "805020009-9", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-003", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000409", nombre: "Daniela", apellido: "Su\xE1rez Gil", correo: "admin@patinbogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-20" }, contacto: { telefono: "6015090909", correo: "contacto@patinbogota.demo.co" }, fechaRegistro: "2026-05-12" },
        { id: "CLU-010", tipo: "club", nombre: "Club Rueda Libre Palmira", nit: "805020010-0", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "escuela", parentId: "LIG-001", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000410", nombre: "Andr\xE9s", apellido: "Caicedo Mora", correo: "admin@ruedalibrepalmira.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 31 # 29-10" }, contacto: { telefono: "6025101010", correo: "contacto@ruedalibrepalmira.demo.co" }, fechaRegistro: "2026-01-28" },
        /* Devuelto a corrección por la Liga del Valle (ciclo del organismo, Fase 1). */
        { id: "CLU-012", tipo: "club", nombre: "Club Halcones de Tulu\xE1", nit: "805020012-3", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "promotor", parentId: "LIG-001", estado: "En correcci\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000412", nombre: "Mauricio", apellido: "Gil Restrepo", correo: "admin@halconestulua.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Tulu\xE1", zona: "Urbana", direccion: "Cra. 26 # 30-12" }, contacto: { telefono: "6022240012", correo: "contacto@halconestulua.demo.co" }, fechaRegistro: "2026-09-20" },
        /* Bandeja de la segunda liga de Sandra Mejía (selector de contexto, P-15). */
        { id: "CLU-011", tipo: "club", nombre: "Club Delfines de Buga", nit: "805020011-1", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", tipoClub: "promotor", parentId: "LIG-006", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000411", nombre: "Lorena", apellido: "Gil Ocampo", correo: "admin@delfinesbuga.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Buga", zona: "Urbana", direccion: "Calle 4 # 14-30" }, contacto: { telefono: "6022360011", correo: "contacto@delfinesbuga.demo.co" }, fechaRegistro: "2026-09-28" }
      ];
      DEPORTISTAS = [
        { id: "DEP-001", nombre: "Valentina Ortiz", tipoDoc: "CC", numDoc: "1144556778", deporte: "Patinaje", modalidad: "Carreras", correo: "valentina.ortiz@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-002", nombre: "Mateo Restrepo", tipoDoc: "CC", numDoc: "1144200145", deporte: "Patinaje", modalidad: "Carreras", correo: "mateo.restrepo@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-003", nombre: "Laura Giraldo", tipoDoc: "CC", numDoc: "1130987654", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "laura.giraldo@correo.demo.co", clubId: "CLU-003", estado: "vinculado" },
        { id: "DEP-004", nombre: "Samuel Ruiz", tipoDoc: "TI", numDoc: "1028445566", deporte: "Patinaje", modalidad: "Carreras", correo: "samuel.ruiz@correo.demo.co", clubId: "CLU-004", estado: "vinculado" },
        { id: "DEP-005", nombre: "Isabella N\xFA\xF1ez", tipoDoc: "CC", numDoc: "1144778899", deporte: "Nataci\xF3n", modalidad: "Estilo libre", correo: "isabella.nunez@correo.demo.co", clubId: "CLU-007", estado: "vinculado" },
        { id: "DEP-006", nombre: "Tom\xE1s V\xE9lez", tipoDoc: "CC", numDoc: "1120334455", deporte: "F\xFAtbol", modalidad: "Campo", correo: "tomas.velez@correo.demo.co", clubId: "CLU-006", estado: "vinculado" },
        { id: "DEP-007", nombre: "Daniela C\xE1rdenas", tipoDoc: "CC", numDoc: "1144990011", deporte: "Patinaje", modalidad: "Carreras", correo: "daniela.cardenas@correo.demo.co", clubId: null, estado: "autodeclarado" },
        { id: "DEP-008", nombre: "Andr\xE9s Lozano", tipoDoc: "CC", numDoc: "1098223344", deporte: "Ciclismo", modalidad: "Ruta", correo: "andres.lozano@correo.demo.co", clubId: null, estado: "autodeclarado" },
        { id: "DEP-009", nombre: "Camila Su\xE1rez", tipoDoc: "CC", numDoc: "1144556001", deporte: "Nataci\xF3n", modalidad: "Mariposa", correo: "camila.suarez@correo.demo.co", clubId: null, estado: "autodeclarado" },
        { id: "DEP-010", nombre: "Juan D. Mar\xEDn", tipoDoc: "CC", numDoc: "1088776655", deporte: "Patinaje", modalidad: "Carreras", correo: "juan.marin@correo.demo.co", clubId: null, estado: "autodeclarado" },
        { id: "DEP-011", nombre: "Sara Betancur", tipoDoc: "TI", numDoc: "1029887766", deporte: "F\xFAtbol", modalidad: "Campo", correo: "sara.betancur@correo.demo.co", clubId: null, estado: "autodeclarado" },
        { id: "DEP-012", nombre: "Nicol\xE1s Ariza", tipoDoc: "CC", numDoc: "1144667788", deporte: "Patinaje", modalidad: "Carreras", correo: "nicolas.ariza@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        /* Resto del plantel de CLU-001 — Club Patín Cali (ORG-09 · «Mis deportistas»). */
        { id: "DEP-013", nombre: "Sof\xEDa Arango Cano", tipoDoc: "TI", numDoc: "1029334455", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "sofia.arango@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-014", nombre: "Emilio V\xE1squez Ruiz", tipoDoc: "CC", numDoc: "1144881122", deporte: "Patinaje", modalidad: "Carreras", correo: "emilio.vasquez@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-015", nombre: "Manuela Ospina D\xEDaz", tipoDoc: "TI", numDoc: "1029556677", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "manuela.ospina@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-016", nombre: "Juli\xE1n Bedoya Mesa", tipoDoc: "CC", numDoc: "1144773311", deporte: "Patinaje", modalidad: "Hockey en l\xEDnea", correo: "julian.bedoya@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-017", nombre: "Antonia Zapata Le\xF3n", tipoDoc: "CC", numDoc: "1144665544", deporte: "Patinaje", modalidad: "Carreras", correo: "antonia.zapata@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-018", nombre: "Felipe Quintero S\xE1enz", tipoDoc: "TI", numDoc: "1029778899", deporte: "Patinaje", modalidad: "Hockey en l\xEDnea", correo: "felipe.quintero@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-019", nombre: "Valeria Mosquera Renter\xEDa", tipoDoc: "CC", numDoc: "1144992277", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "valeria.mosquera@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-020", nombre: "Sebasti\xE1n Toro Aguirre", tipoDoc: "CC", numDoc: "1144110099", deporte: "Patinaje", modalidad: "Carreras", correo: "sebastian.toro@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-021", nombre: "Luciana Palacio Hoyos", tipoDoc: "TI", numDoc: "1029223344", deporte: "Patinaje", modalidad: "Freestyle", correo: "luciana.palacio@correo.demo.co", clubId: "CLU-001", estado: "vinculado" },
        /* Fase 2 · persona multi-rol: Laura es deportista, tutora de dos menores y entrenadora. */
        { id: "DEP-022", nombre: "Laura Marcela G\xF3mez Restrepo", tipoDoc: "CC", numDoc: "1032987456", deporte: "Patinaje", modalidad: "Carreras", correo: "laura.gomez@correo.co", fechaNac: "1992-05-03", rolApoyo: "Docente/Entrenador", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-023", nombre: "Tom\xE1s G\xF3mez", tipoDoc: "TI", numDoc: "1098765001", deporte: "Patinaje", modalidad: "Carreras", correo: "", fechaNac: "2014-02-10", sexo: "Hombre", tutorId: "DEP-022", parentesco: "Padre/Madre", clubId: "CLU-001", estado: "vinculado" },
        { id: "DEP-024", nombre: "Sara G\xF3mez", tipoDoc: "TI", numDoc: "1098765002", deporte: "Nataci\xF3n", modalidad: "Estilo libre", correo: "", fechaNac: "2017-06-21", sexo: "Mujer", docsEstado: "revision", tutorId: "DEP-022", parentesco: "Padre/Madre", clubId: null, estado: "autodeclarado" }
      ];
      SEED_ORGANISMOS = [
        ...COMITES,
        ...FEDERACIONES_COC,
        ...FEDERACIONES_FICTICIAS,
        ...LIGAS,
        ...CLUBES
      ];
      SEED_DEPORTISTAS = DEPORTISTAS;
      DEPORTES_SEED = {
        "FED-038": ["Nataci\xF3n", "Nataci\xF3n Art\xEDstica", "Polo Acu\xE1tico"],
        "FED-040": ["Patinaje", "Patinaje Art\xEDstico", "Patinaje de Velocidad"],
        "LIG-006": ["Nataci\xF3n", "Polo Acu\xE1tico"],
        "CLU-007": ["Nataci\xF3n", "Polo Acu\xE1tico"]
      };
      AF_DESDE = "2026-03-25";
      AFILIACIONES_EXTRA = [
        /* Multi-afiliación de deportes distintos: Mateo patina en Cali y nada en Aguas del Valle. */
        { id: "AF-S900", tipo: "deportista", sujetoId: "DEP-002", organismoId: "CLU-007", deporte: "Nataci\xF3n", estado: "Vinculada", desde: "2026-05-04", origen: "solicitud" },
        /* Laura: pidió un segundo club y trabaja como entrenadora (personal deportivo → cualquier organismo, P-05). */
        { id: "AF-S901", tipo: "deportista", sujetoId: "DEP-022", organismoId: "CLU-003", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-02", origen: "solicitud" },
        { id: "AF-P001", tipo: "personal", sujetoId: "DEP-022", organismoId: "LIG-001", deporte: "Patinaje", estado: "Vinculada", desde: "2024-01-20", origen: "solicitud", rol: "Docente/Entrenador" },
        { id: "AF-P002", tipo: "personal", sujetoId: "DEP-022", organismoId: "CLU-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-09-29", origen: "solicitud", rol: "Docente/Entrenador" },
        /* Un club ya activo en Antioquia pide entrar también a la liga del Valle (P-20): la liga solo aprueba el vínculo. */
        { id: "AF-C900", tipo: "club", sujetoId: "CLU-004", organismoId: "LIG-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-06", origen: "solicitud" }
      ];
      STORE_PREFIX = "naowee-organismos-";
      SEED_FLAG = STORE_PREFIX + "demo-seeded";
      SEED_VERSION = "0.5.0";
      esDeportista = (d) => d && d.esDeportista !== false;
      _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      enTerritorio = (o2, t) => o2.ubicacion && o2.ubicacion.depto === t.depto && (!t.municipio || o2.ubicacion.ciudad === t.municipio);
    }
  });

  // ../front/DEMO/naowee-organismos/shared/permissions.js
  function can(role3, accion, recurso) {
    const fila = PERMS[recurso];
    if (!fila) return false;
    const concedidas = fila[role3] || "";
    return concedidas.includes(accion);
  }
  function contextoDe(role3) {
    if (!TIPO_DE_ROL[role3]) return null;
    const valido = (id2) => {
      const o2 = id2 && getOrganismo(id2);
      return o2 && o2.tipo === TIPO_DE_ROL[role3] ? id2 : null;
    };
    let porUrl = null;
    try {
      porUrl = valido(new URLSearchParams(window.location.search).get("org"));
    } catch (_) {
    }
    if (porUrl) {
      try {
        sessionStorage.setItem(CTX_KEY + role3, porUrl);
      } catch (_) {
      }
      return porUrl;
    }
    try {
      return valido(sessionStorage.getItem(CTX_KEY + role3));
    } catch (_) {
      return null;
    }
  }
  function scopeFor(role3) {
    const ctx = contextoDe(role3);
    if (ctx) return ctx;
    return role3 in SCOPE ? SCOPE[role3] : null;
  }
  function territorioDe(role3) {
    if (role3 !== "TERRITORIAL") return null;
    let mun = null;
    try {
      mun = new URLSearchParams(window.location.search).get("territorio");
      if (mun) sessionStorage.setItem("naowee-organismos-territorio", mun);
      else mun = sessionStorage.getItem("naowee-organismos-territorio");
    } catch (_) {
    }
    if (mun && mun !== TER_DEFAULT.depto) {
      const club = getOrganismoByCiudad(mun);
      if (club) return { depto: club.ubicacion.depto, municipio: mun };
    }
    return { ...TER_DEFAULT };
  }
  function getOrganismoByCiudad(ciudad) {
    for (const id2 of ["CLU-001", "CLU-002", "CLU-003", "CLU-004", "CLU-005", "CLU-006", "CLU-007", "CLU-008", "CLU-009", "CLU-010", "CLU-011", "CLU-012"]) {
      const o2 = getOrganismo(id2);
      if (o2 && o2.ubicacion && o2.ubicacion.ciudad === ciudad) return o2;
    }
    return null;
  }
  function isGlobalScope(role3) {
    return scopeFor(role3) === null && role3 === "MINDEPORTE";
  }
  var ACCIONES, RECURSOS, PERMS, SCOPE, TIPO_DE_ROL, CTX_KEY, TER_DEFAULT;
  var init_permissions = __esm({
    "../front/DEMO/naowee-organismos/shared/permissions.js"() {
      init_organismos_data();
      ACCIONES = Object.freeze({
        CREAR: "C",
        LEER: "R",
        EDITAR: "U",
        APROBAR: "A",
        SANCIONAR: "S",
        RETIRAR: "X"
      });
      RECURSOS = Object.freeze([
        "comites",
        "federaciones",
        "ligas",
        "clubes",
        "deportistas",
        "solicitudes",
        "cargue",
        "auditoria"
      ]);
      PERMS = {
        comites: {
          MINDEPORTE: "CRUS",
          // único creador (ORG-01)
          COMITE: "RU",
          // el propio
          FEDERACION: "R",
          LIGA: "R",
          CLUB: "R",
          DEPORTISTA: "R",
          TERRITORIAL: "R"
        },
        federaciones: {
          MINDEPORTE: "RAS",
          // A = su mitad de la doble validación
          COMITE: "CRA",
          // C pre-registro/cargue · A = su mitad — solo su sector
          FEDERACION: "RU",
          // la propia
          LIGA: "R",
          CLUB: "R",
          DEPORTISTA: "R",
          TERRITORIAL: "R"
        },
        ligas: {
          MINDEPORTE: "RS",
          // S* supuesto
          COMITE: "R",
          // su sector
          FEDERACION: "CRA",
          // las suyas
          LIGA: "RU",
          // la propia
          CLUB: "R",
          DEPORTISTA: "R",
          TERRITORIAL: "R"
        },
        clubes: {
          MINDEPORTE: "RS",
          // S* supuesto
          COMITE: "R",
          FEDERACION: "R",
          // subárbol
          LIGA: "CRA",
          // los suyos
          CLUB: "RU",
          // el propio
          DEPORTISTA: "R",
          // solo buscar clubes Activos (se acota en la UI de afiliación)
          TERRITORIAL: "R"
        },
        deportistas: {
          MINDEPORTE: "R",
          COMITE: "CR",
          FEDERACION: "CR",
          LIGA: "CR",
          // C = registrar autodeclarados y proponer club (P-07)
          CLUB: "CRX",
          // sus afiliados · X = desvincular (ORG-10, ver nota)
          DEPORTISTA: "RU",
          // el propio (nunca documento / fecha nac.)
          TERRITORIAL: "CR"
          // registra autodeclarados y propone club (P-12); no aprueba
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
          MINDEPORTE: "R",
          // auditoría
          COMITE: "",
          FEDERACION: "",
          LIGA: "",
          CLUB: "RA",
          // las dirigidas a su club (ORG-05, único aprobador)
          DEPORTISTA: "CRX",
          // crea / ve estado / retira las propias
          TERRITORIAL: ""
        },
        cargue: {
          MINDEPORTE: "R",
          // historial global*
          COMITE: "CR",
          // federaciones
          FEDERACION: "CR",
          // ligas
          LIGA: "CR",
          // clubes
          CLUB: "",
          // cargue masivo de deportistas: pendiente (entrada en «Deportistas»)
          DEPORTISTA: "",
          TERRITORIAL: ""
        },
        auditoria: {
          MINDEPORTE: "R",
          COMITE: "R",
          FEDERACION: "R",
          LIGA: "R",
          CLUB: "R",
          DEPORTISTA: "R",
          TERRITORIAL: "R"
        }
      };
      SCOPE = {
        MINDEPORTE: null,
        COMITE: "COC",
        FEDERACION: "FED-040",
        LIGA: "LIG-001",
        CLUB: "CLU-001",
        DEPORTISTA: "DEP-001"
      };
      TIPO_DE_ROL = { COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club" };
      CTX_KEY = "naowee-organismos-ctx-";
      TER_DEFAULT = { depto: "Valle del Cauca" };
    }
  });

  // ../front/DEMO/naowee-organismos/shared/sidebar.js
  function getIcon(name) {
    return ICONS[name] || "";
  }
  function nivelesForRole(code) {
    const nivel = code === "TERRITORIAL" && (territorioDe(code) || {}).municipio ? "liga" : NIVEL_PROPIO[code];
    const propio = NIVEL_JERARQUIA_IDX(nivel);
    return NIVELES_JERARQUIA.slice(propio + 1).map(([n, label]) => ({ id: n, label }));
  }
  function personaDe(roleCode3) {
    let id2 = null;
    try {
      id2 = new URLSearchParams(window.location.search).get("como");
      if (id2 && (PERSONAS[id2] || id2 === "org")) sessionStorage.setItem(PERSONA_KEY, id2);
      else id2 = sessionStorage.getItem(PERSONA_KEY);
    } catch (_) {
    }
    if (id2 === "org") return null;
    if (!PERSONAS[id2]) id2 = PERSONA_POR_ROL[roleCode3] || null;
    const p = PERSONAS[id2];
    return p && p.contextos.some((c) => c.role === roleCode3) ? { id: id2, ...p } : null;
  }
  function getRoleFromQuery() {
    const params2 = new URLSearchParams(window.location.search);
    const code = params2.get("role");
    return ROLES[code] ? code : "MINDEPORTE";
  }
  function organismoNoActivo(code) {
    if (!ROLES_ORGANISMO.includes(code)) return null;
    const o2 = getOrganismo(scopeFor(code));
    return o2 && o2.estado !== "Activo" ? o2 : null;
  }
  function getMenuForRole(code) {
    if (organismoNoActivo(code)) return MENU_NO_ACTIVO;
    if (code === "TERRITORIAL") return [{ section: null, items: jerarquiaItems(code) }, ...MENU_BY_ROLE.TERRITORIAL.slice(1)];
    return MENU_BY_ROLE[code] || MENU_BY_ROLE.MINDEPORTE;
  }
  function homeForRole(code) {
    if (organismoNoActivo(code)) return "organismo-detalle.html";
    if (code === "CLUB") return "bandeja.html";
    if (code === "DEPORTISTA") return "perfil.html";
    if (code === "PERSONA") return "perfil.html";
    return "jerarquia.html";
  }
  function hrefForItem(item, roleCode3) {
    if (item.route && item.route.includes(".html")) {
      const sep = item.route.includes("?") ? "&" : "?";
      return `${item.route}${sep}role=${roleCode3}`;
    }
    return null;
  }
  function mountSidebar({ rootEl, roleCode: roleCode3, activeId }) {
    const role3 = ROLES[roleCode3] || ROLES.MINDEPORTE;
    const sections = getMenuForRole(role3.code);
    const isCollapsed = localStorage.getItem(COLLAPSED_KEY) === "1";
    rootEl.innerHTML = renderSidebar({ sections, activeId, isCollapsed, roleCode: role3.code });
    bindSidebarEvents(rootEl);
    setupTooltips(rootEl);
    return { role: role3, sections };
  }
  function renderSection(section, activeId, roleCode3) {
    return `
    ${section.section ? `<div class="nav-section">${section.section}</div>` : ""}
    ${section.items.map((it) => renderRow(it, activeId, roleCode3)).join("")}
  `;
  }
  function renderRow(item, activeId, roleCode3) {
    const isActive = item.id === activeId || item.id === "jerarquia" && String(activeId).startsWith("jerarquia-");
    const href = hrefForItem(item, roleCode3);
    const tag = href ? "a" : "div";
    const hrefAttr = href ? ` href="${href}"` : "";
    return `
    <${tag} class="nav-row ${item.child ? "nav-row--child" : ""} ${isActive ? "active" : ""}" data-id="${item.id}"${hrefAttr}>
      ${isActive && !item.child ? '<span class="active-bar" aria-hidden="true"></span>' : ""}
      <span class="icon">${getIcon(item.icon)}</span>
      <span class="lbl">${item.label}</span>
      ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ""}
    </${tag}>
  `;
  }
  function renderSidebar({ sections, activeId, isCollapsed, roleCode: roleCode3 }) {
    return `
    <aside class="sidebar ${isCollapsed ? "collapsed" : ""}" id="naoweeSidebar">
      <div class="sidebar-logo">
        <button class="burger-btn" id="sidebarToggle" type="button" aria-label="Colapsar men\xFA">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="#282834" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
        <img src="shared/logos/ministerio.svg" alt="Ministerio del Deporte" class="sb-logo-img"/>
        <div class="logo-sep"></div>
        <img src="shared/logos/suid.png" alt="SUID" class="sb-logo-img"/>
      </div>
      <nav class="sidebar-nav" id="sidebarNav" role="navigation" aria-label="Men\xFA principal">
        ${sections.map((s) => renderSection(s, activeId, roleCode3)).join("")}
      </nav>
    </aside>
  `;
  }
  function bindSidebarEvents(rootEl) {
    const sidebar = rootEl.querySelector(".sidebar");
    const toggle = rootEl.querySelector("#sidebarToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        localStorage.setItem(COLLAPSED_KEY, sidebar.classList.contains("collapsed") ? "1" : "0");
      });
    }
    rootEl.querySelectorAll(".nav-row:not([href])").forEach((row) => {
      row.addEventListener("click", () => {
        var _a;
        if (row.classList.contains("active")) return;
        flashPlaceholder(((_a = row.querySelector(".lbl")) == null ? void 0 : _a.textContent) || "Esta secci\xF3n");
        closeDrawer();
      });
    });
    rootEl.querySelectorAll(".nav-row[href]").forEach((row) => {
      row.addEventListener("click", closeDrawer);
    });
  }
  function flashPlaceholder(label) {
    let toast = document.getElementById("evToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "evToast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = `${label}: pantalla disponible en una pr\xF3xima fase de la demo.`;
    toast.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }
  function setupTooltips(rootEl) {
    const sidebar = rootEl.querySelector(".sidebar");
    if (!sidebar) return;
    if (!_tooltipEl) {
      _tooltipEl = document.createElement("div");
      _tooltipEl.className = "nav-tooltip";
      document.body.appendChild(_tooltipEl);
    }
    function show(row) {
      if (!sidebar.classList.contains("collapsed") || window.innerWidth < 1024) return;
      const lbl = row.querySelector(".lbl");
      if (!lbl) return;
      _tooltipEl.textContent = lbl.textContent.trim();
      const r = row.getBoundingClientRect();
      _tooltipEl.style.left = `${r.right + 12}px`;
      _tooltipEl.style.top = `${r.top + r.height / 2}px`;
      _tooltipEl.classList.add("is-visible");
    }
    function hide() {
      if (_tooltipEl) _tooltipEl.classList.remove("is-visible");
    }
    rootEl.querySelectorAll(".nav-row").forEach((row) => {
      row.addEventListener("mouseenter", () => show(row));
      row.addEventListener("mouseleave", hide);
    });
    new MutationObserver(hide).observe(sidebar, { attributes: true, attributeFilter: ["class"] });
  }
  function openDrawer() {
    document.body.classList.add("has-mobile-drawer-open");
  }
  function closeDrawer() {
    document.body.classList.remove("has-mobile-drawer-open");
  }
  function mountHeader({ headerEl, role: role3 }) {
    const initials = role3.avatar || (role3.userName || role3.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    headerEl.innerHTML = `
    <button class="header-burger" id="headerBurger" type="button" aria-label="Abrir men\xFA">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="profile-switcher" id="profileSwitcher">
      <div class="user-chip" id="userChipTrigger" role="button" tabindex="0" aria-haspopup="menu" aria-label="Mi cuenta">
        <div class="ava">
          <div class="ava-ring" style="background:${role3.color}22;color:${role3.color}">${initials}</div>
          <div class="ava-dot"></div>
        </div>
        <div class="user-info">
          <span class="user-name">${role3.userName}</span>
          <span class="user-role">${role3.label}</span>
        </div>
        <button class="user-chip__chevron" type="button" tabindex="-1" aria-hidden="true">${getIcon("chevron")}</button>
      </div>
      <div class="profile-dd profile-dd--identity-only" role="menu">
        <div class="profile-dd__header">
          <span class="ava-ring" style="width:42px;height:42px;font-size:14px;background:${role3.color}22;color:${role3.color}">${initials}</span>
          <div class="profile-dd__user">
            <strong>${role3.userName}</strong>
            <span class="profile-dd__doc">${getIcon("id")}${role3.userDoc || "\u2014"}</span>
            <span class="profile-dd__current-role" style="color:${role3.color}">
              <span class="profile-dd__check-ico">${getIcon("check")}</span>${role3.label}${role3.org && role3.org !== "\u2014" ? ` \xB7 ${role3.org}` : ""}
            </span>
          </div>
        </div>
        ${perfilesDemoHtml(role3.code)}
      </div>
    </div>
  `;
    bindHeaderEvents(headerEl);
    mountContexto(role3);
  }
  function inicialesOrg(nombre) {
    const w = String(nombre).split(/\s+/).filter((x) => x && !NO_INICIAL.has(x.toLowerCase()));
    const ini = w.length === 1 ? w[0].slice(0, 2) : w.slice(0, 2).map((x) => x[0]).join("");
    return (ini || String(nombre).slice(0, 2)).toUpperCase();
  }
  function pendientesDe(orgId) {
    const o2 = getOrganismo(orgId);
    if (!o2) return { n: 0, txt: "" };
    if (o2.tipo === "club") {
      const n2 = solicitudesDeClub(orgId).filter((x) => x.estado === "Enviada").length;
      return { n: n2, txt: n2 ? `${n2} ${n2 === 1 ? "solicitud" : "solicitudes"} por confirmar` : "" };
    }
    const hijo = { comite: ["federaci\xF3n", "federaciones"], federacion: ["liga", "ligas"], liga: ["club", "clubes"] }[o2.tipo];
    const n = allOrganismos().filter((x) => x.parentId === orgId && x.estado === "En revisi\xF3n").length;
    return { n, txt: n && hijo ? `${n} ${n === 1 ? hijo[0] : hijo[1]} por revisar` : "" };
  }
  function orgIco(o2, size) {
    const c = COLOR_TIPO[o2.tipo] || "#d74009";
    return `<span class="ctx-ico" aria-hidden="true" style="--tipo-color:${c};width:${size}px;height:${size}px">${inicialesOrg(o2.nombre)}</span>`;
  }
  function mountContexto(role3) {
    const lista = (role3.contextos || []).map((c) => ({ ...c, o: getOrganismo(c.org) })).filter((c) => c.o);
    const head = document.querySelector(".page-inner > .page-head, .page-inner .page-head");
    if (lista.length < 2 || !head || document.getElementById("ctxBar")) return;
    const actual = getOrganismo(scopeFor(role3.code)) || lista[0].o;
    const pagina = location.pathname.split("/").pop() || "index.html";
    const COMUNES = ["jerarquia.html", "bandeja.html", "cargue.html", "deportistas.html"];
    const destino = (rol) => COMUNES.includes(pagina) ? pagina : homeForRole(rol);
    const href = (c) => `${destino(c.role)}?role=${c.role}&org=${c.org}${role3.persona ? `&como=${role3.persona}` : ""}`;
    const deportesTxt = (o2) => o2.deportes.length > 2 ? `${o2.deportes[0]} y ${o2.deportes.length - 1} deportes m\xE1s` : o2.deporte;
    const meta = (o2) => `${TIPO_TXT[o2.tipo]} \xB7 ${deportesTxt(o2)} \xB7 ${o2.tipo === "federacion" ? "Nacional" : o2.ubicacion ? o2.ubicacion.depto : ""}`;
    const otros = lista.filter((c) => c.o.id !== actual.id).map((c) => ({ o: c.o, p: pendientesDe(c.o.id) })).filter((x) => x.p.n);
    const aviso = otros.length === 1 ? `${otros[0].p.txt} en ${otros[0].o.nombre}` : otros.length ? `${otros.reduce((a, x) => a + x.p.n, 0)} pendientes en tus otros organismos` : "";
    const bar = document.createElement("section");
    bar.className = "ctx-bar";
    bar.id = "ctxBar";
    bar.setAttribute("aria-label", "Organismo en el que trabajas");
    bar.innerHTML = `
    ${orgIco(actual, 38)}
    <div class="ctx-bar__txt">
      <span class="ctx-bar__lbl">Trabajas en</span>
      <span class="ctx-bar__name">${actual.nombre}<span class="ctx-bar__meta">${meta(actual)}</span></span>
    </div>
    ${aviso ? `<span class="ctx-bar__aviso">${aviso}</span>` : ""}
    <div class="naowee-dropdown ctx-dd" id="ctxDd">
      <button type="button" class="naowee-dropdown__trigger" id="ctxTrigger" aria-haspopup="listbox" aria-expanded="false" aria-controls="ctxMenu">
        <span class="ctx-dd__long">Cambiar de organismo</span><span class="ctx-dd__short">Cambiar</span>
        <span class="naowee-dropdown__chevron" aria-hidden="true">${getIcon("chevron")}</span>
      </button>
      <div class="naowee-dropdown__menu" id="ctxMenu" role="listbox" aria-label="Tus organismos">
        ${lista.map((c) => {
      const o2 = c.o;
      const p = pendientesDe(o2.id);
      const sel = o2.id === actual.id;
      return `<a class="naowee-dropdown__opt ctx-opt${sel ? " is-selected" : ""}" role="option" aria-selected="${sel}" href="${href(c)}">
            ${orgIco(o2, 34)}
            <span class="ctx-opt__txt">
              <span class="ctx-opt__name">${o2.nombre}</span>
              <span class="ctx-opt__meta">${meta(o2)}</span>
              <span class="ctx-opt__pend${p.n ? "" : " is-clear"}">${p.n ? p.txt : "Sin pendientes"}</span>
            </span>
            ${sel ? `<span class="naowee-dropdown__opt-check" aria-hidden="true">${getIcon("check")}</span>` : ""}
          </a>`;
    }).join("")}
      </div>
    </div>`;
    head.parentNode.insertBefore(bar, head);
    const dd = bar.querySelector("#ctxDd");
    const trg = bar.querySelector("#ctxTrigger");
    const set = (open) => {
      dd.classList.toggle("naowee-dropdown--open", open);
      trg.setAttribute("aria-expanded", String(open));
    };
    trg.addEventListener("click", (e) => {
      e.stopPropagation();
      set(!dd.classList.contains("naowee-dropdown--open"));
    });
    document.addEventListener("click", (e) => {
      if (!dd.contains(e.target)) set(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && dd.classList.contains("naowee-dropdown--open")) {
        set(false);
        trg.focus();
      }
    });
  }
  function perfilesDemoHtml(actual) {
    const codes = ["MINDEPORTE", "TERRITORIAL", "COMITE", "FEDERACION", "LIGA", "CLUB", "DEPORTISTA", ...esLocal() ? ["PERSONA"] : []];
    return `<div class="profile-dd__sep"></div>
    <div class="profile-dd__demo"><span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Solo demo</span> Cambiar de perfil</div>
    ${codes.map((c) => {
      const r = ROLES[c];
      const def = ROLE_DEFAULT[c] || r;
      return `<a class="profile-dd__item profile-dd__item--role profile-dd__perfil${c === actual && r.userName === def.userName ? " is-current" : ""}" href="${HOME_DEMO[c] || "jerarquia.html"}?role=${c}" data-perfil-chip="${c}">
        <span class="role-meta"><span>${def.userName}</span><small>${r.label}${def.org && def.org !== "\u2014" ? " \xB7 " + def.org : ""}</small></span>
      </a>`;
    }).join("")}
    <a class="profile-dd__item profile-dd__perfil profile-dd__casos" href="index.html#casos">Ver los casos para mostrar</a>`;
  }
  function bindHeaderEvents(headerEl) {
    const switcher = headerEl.querySelector("#profileSwitcher");
    const trigger = headerEl.querySelector("#userChipTrigger");
    const burger = headerEl.querySelector("#headerBurger");
    if (burger) burger.addEventListener("click", openDrawer);
    headerEl.querySelectorAll("[data-perfil-chip]").forEach((a) => a.addEventListener("click", () => {
      try {
        [PERSONA_KEY, "naowee-organismos-territorio", ...Object.keys(ROLES).map((r) => "naowee-organismos-ctx-" + r)].forEach((k) => sessionStorage.removeItem(k));
      } catch (_) {
      }
    }));
    if (!switcher || !trigger) return;
    const toggle = (e) => {
      e.stopPropagation();
      switcher.classList.toggle("open");
    };
    trigger.addEventListener("click", toggle);
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle(e);
      }
    });
    document.addEventListener("click", (e) => {
      if (!switcher.contains(e.target)) switcher.classList.remove("open");
    });
  }
  function mountBackdrop() {
    let bd = document.querySelector(".shell-backdrop");
    if (!bd) {
      bd = document.createElement("div");
      bd.className = "shell-backdrop";
      document.body.appendChild(bd);
    }
    bd.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", (e) => {
      var _a, _b;
      if (e.key === "Escape") {
        closeDrawer();
        (_a = document.getElementById("profileSwitcher")) == null ? void 0 : _a.classList.remove("open");
        (_b = document.getElementById("demoSwitcher")) == null ? void 0 : _b.classList.remove("is-open");
      }
    });
  }
  function getDemoMode() {
    const m = localStorage.getItem(MODE_KEY);
    return m === "blank" || m === "demo" ? m : "demo";
  }
  function demoToast(msg2) {
    let toast = document.getElementById("evToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "evToast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg2;
    toast.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }
  function mountDemoSwitcher({ roleCode: roleCode3 }) {
    const current = ROLES[roleCode3] || ROLES.MINDEPORTE;
    const renderItem = (p) => {
      const isActive = p.code === current.code;
      const ini = p.avatar || (p.userName || p.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
      return `
      <a class="demo-role-switcher__item ${isActive ? "is-active" : ""}"
         href="#" data-perfil="${p.code}">
        <span class="demo-role-switcher__item-avatar" style="background:${p.color}22;color:${p.color}">${ini}</span>
        <span class="demo-role-switcher__item-meta">
          <span class="demo-role-switcher__item-name">${p.userName || p.label}</span>
          <span class="demo-role-switcher__item-role">${p.label}${p.org && p.org !== "\u2014" ? ` \xB7 ${p.org}` : ""}</span>
        </span>
        ${isActive ? `<span class="demo-role-switcher__check">${getIcon("check")}</span>` : ""}
      </a>`;
    };
    const listHtml = ROLE_GROUPS.map((g) => {
      const items = g.codes.filter((c) => c !== "PERSONA" || esLocal()).map((c) => ROLES[c]).filter(Boolean).map(renderItem).join("");
      if (!items) return "";
      return `<div class="demo-role-switcher__group-label">${g.label}</div>${items}`;
    }).join("");
    const root2 = document.createElement("div");
    root2.className = "demo-role-switcher demo-role-switcher--inline";
    root2.id = "demoSwitcher";
    root2.innerHTML = `
    <button class="demo-role-switcher__toggle" id="demoSwitcherToggle" type="button" aria-haspopup="true" aria-expanded="false">
      <span class="demo-role-switcher__avatar" style="background:${current.color}22;color:${current.color}">${current.avatar || "OR"}</span>
      <span>Cambiar perfil</span>
      <span class="demo-role-switcher__chev">${getIcon("chevron")}</span>
    </button>
    <div class="demo-role-switcher__panel" id="demoSwitcherPanel" role="menu">
      <div class="demo-role-switcher__panel-label">CAMBIAR DE PERFIL (SIMULADO)</div>
      <div class="demo-role-switcher__list">${listHtml}</div>
      <div class="demo-role-switcher__mode-section">
        <div class="demo-role-switcher__mode-label">MODO DEMO</div>
        <div class="demo-role-switcher__mode-switch" role="group" aria-label="Modo demo">
          <button type="button" class="demo-role-switcher__mode-btn" data-mode="blank" title="Estado vac\xEDo \u2014 para recorrer el flujo paso a paso">Guiado \xB7 vac\xEDo</button>
          <button type="button" class="demo-role-switcher__mode-btn" data-mode="demo" title="Datos de ejemplo cargados para explorar">Libre \xB7 con datos</button>
        </div>
      </div>
      <div class="demo-role-switcher__panel-footer">
        <button type="button" class="demo-role-switcher__action" id="demoRestartTourBtn">${getIcon("refresh")}<span>Reiniciar tour</span></button>
        <button type="button" class="demo-role-switcher__action demo-role-switcher__action--quiet" id="demoResetBtn" title="Limpia el state de la demo">Reiniciar demo</button>
      </div>
    </div>
  `;
    const tourPanel = document.getElementById("ttPanel");
    if (tourPanel) tourPanel.insertBefore(root2, tourPanel.querySelector(".tt-panel-sub"));
    else document.body.appendChild(root2);
    bindDemoSwitcher(root2);
  }
  function bindDemoSwitcher(root2) {
    var _a, _b;
    const toggle = root2.querySelector("#demoSwitcherToggle");
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = root2.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (!root2.contains(e.target)) root2.classList.remove("is-open");
    });
    root2.querySelectorAll("[data-perfil]").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const next = item.getAttribute("data-perfil");
        if (!ROLES[next]) return;
        const params2 = new URLSearchParams(window.location.search);
        if (params2.get("role") === next && !params2.get("como")) {
          root2.classList.remove("is-open");
          return;
        }
        try {
          [PERSONA_KEY, "naowee-organismos-territorio", ...Object.keys(ROLES).map((r) => "naowee-organismos-ctx-" + r)].forEach((k) => sessionStorage.removeItem(k));
        } catch (_) {
        }
        window.location.href = `${homeForRole(next)}?role=${next}`;
      });
    });
    const syncMode = () => {
      const cur = getDemoMode();
      root2.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.mode === cur ? "true" : "false");
      });
    };
    syncMode();
    root2.querySelectorAll(".demo-role-switcher__mode-btn").forEach((b) => {
      b.addEventListener("click", (e) => {
        e.stopPropagation();
        const mode = b.dataset.mode;
        if (mode === getDemoMode()) return;
        localStorage.setItem(MODE_KEY, mode);
        syncMode();
        root2.classList.remove("is-open");
        window.dispatchEvent(new CustomEvent("organismos:demo-mode", { detail: { mode } }));
        setTimeout(() => demoToast(
          mode === "demo" ? "Modo libre: datos de ejemplo cargados." : "Modo guiado: estado vac\xEDo para recorrer el flujo."
        ), 160);
      });
    });
    (_a = root2.querySelector("#demoRestartTourBtn")) == null ? void 0 : _a.addEventListener("click", (e) => {
      e.stopPropagation();
      localStorage.removeItem(TOUR_KEY);
      root2.classList.remove("is-open");
      demoToast("Tour reiniciado \u2014 se mostrar\xE1 en tu pr\xF3xima visita.");
    });
    (_b = root2.querySelector("#demoResetBtn")) == null ? void 0 : _b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (window.confirm("\xBFReiniciar la demo? Se borran los organismos, solicitudes y datos que creaste y se restablecen el modo y el tour.")) {
        [sessionStorage, localStorage].forEach((store) => {
          for (let i = store.length - 1; i >= 0; i--) {
            const k = store.key(i);
            if (k && k.startsWith("naowee-organismos-")) store.removeItem(k);
          }
        });
        window.location.href = "index.html";
      }
    });
  }
  var COLLAPSED_KEY, ICONS, ROLES, NIVELES_JERARQUIA, NIVEL_JERARQUIA_IDX, NIVEL_PROPIO, jerarquiaItems, MENU_BY_ROLE, PERSONAS, PERSONA_KEY, PERSONA_POR_ROL, ROLE_DEFAULT, ROLES_ORGANISMO, MENU_NO_ACTIVO, _toastTimer, _tooltipEl, TIPO_TXT, COLOR_TIPO, NO_INICIAL, HOME_DEMO, MODE_KEY, TOUR_KEY, esLocal, ROLE_GROUPS;
  var init_sidebar = __esm({
    "../front/DEMO/naowee-organismos/shared/sidebar.js"() {
      init_permissions();
      init_organismos_data();
      COLLAPSED_KEY = "naowee-organismos-sidebar-collapsed";
      ICONS = {
        sitemap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v4M5 17v-2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2M12 11v3"/></svg>',
        inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
        upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
        filePlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
        link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
        id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c0-1.5 1.5-2.2 3-2.2s3 .7 3 2.2"/><line x1="15" y1="10" x2="18" y2="10"/><line x1="15" y1="13" x2="18" y2="13"/></svg>',
        user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
        users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
      };
      ICONS.user = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
      ICONS.doc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><polyline points="14 3 14 8 19 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>';
      ICONS.club = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/></svg>';
      ICONS.cal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>';
      ICONS.award = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M9 13.5L8 21l4-2 4 2-1-7.5"/></svg>';
      ICONS.gear = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>';
      ICONS.bell = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
      ICONS.shield = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><polyline points="9 12 11 14 15 10"/></svg>';
      ICONS.level = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="8" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>';
      ROLES = {
        MINDEPORTE: {
          code: "MINDEPORTE",
          label: "Admin Mindeporte",
          userName: "Mar\xEDa F. Rojas",
          userEmail: "maria.rojas@mindeporte.demo.co",
          userDoc: "CC 41.234.567",
          org: "Ministerio del Deporte",
          avatar: "MR",
          color: "#002B5B",
          short: "Rector\xEDa del SND \xB7 registra comit\xE9s, ve toda la jerarqu\xEDa y aprueba federaciones",
          group: "Rector\xEDa"
        },
        COMITE: {
          code: "COMITE",
          label: "Comit\xE9 (COC)",
          userName: "Camilo Duarte",
          userEmail: "cduarte@coc.demo.co",
          userDoc: "CC 79.456.123",
          org: "Comit\xE9 Ol\xEDmpico Colombiano",
          avatar: "CD",
          color: "#d74009",
          short: "Cabeza de sector \xB7 pre-registra y avala las federaciones de su sector",
          group: "Cabezas de sector"
        },
        FEDERACION: {
          code: "FEDERACION",
          label: "Federaci\xF3n",
          userName: "Alberto Herrera",
          userEmail: "presidencia@fedepatinaje.demo.co",
          userDoc: "CC 16.789.234",
          org: "Fed. Colombiana de Patinaje",
          avatar: "AH",
          color: "#1f78d1",
          short: "Aprueba sus ligas \xB7 cargue masivo de ligas de su deporte",
          group: "Organismos"
        },
        LIGA: {
          code: "LIGA",
          label: "Liga",
          userName: "Sandra Mej\xEDa",
          userEmail: "direccion@ligapatinajevalle.demo.co",
          userDoc: "CC 31.567.890",
          org: "Liga de Patinaje del Valle",
          avatar: "SM",
          color: "#7c3aed",
          short: "Aprueba sus clubes \xB7 cargue masivo de clubes de su liga",
          group: "Organismos"
        },
        CLUB: {
          code: "CLUB",
          label: "Club",
          userName: "\xD3scar Cardona",
          userEmail: "admin@clubpatincali.demo.co",
          userDoc: "CC 94.321.678",
          org: "Club Pat\xEDn Cali",
          avatar: "OC",
          color: "#1f8923",
          short: "Confirma la afiliaci\xF3n de sus deportistas",
          group: "Organismos"
        },
        DEPORTISTA: {
          code: "DEPORTISTA",
          label: "Deportista",
          userName: "Valentina Ortiz",
          userEmail: "valentina.ortiz@correo.demo.co",
          userDoc: "CC 1.144.556.778",
          org: "\u2014",
          avatar: "VO",
          color: "#0e7490",
          short: "Gestiona su afiliaci\xF3n a un club deportivo",
          group: "Personas",
          deportistaId: "DEP-001"
        },
        /* Fase 3 · usuario territorial: lo crea el Ministerio; consulta su territorio y registra
           deportistas autodeclarados con club propuesto (P-11, P-12). No aprueba. */
        TERRITORIAL: {
          code: "TERRITORIAL",
          label: "Encargado departamental",
          userName: "Ana Luc\xEDa Valencia",
          userEmail: "avalencia@valledelcauca.demo.gov.co",
          userDoc: "CC 66.912.345",
          org: "Valle del Cauca",
          avatar: "AV",
          color: "#b45309",
          short: "Consulta los organismos y deportistas de su territorio y registra deportistas autodeclarados",
          group: "Territorio"
        },
        /* v1.6.0 · perfil multi-rol: una persona con varias facetas
           (deportista + tutora legal + personal de apoyo) en un solo perfil. */
        PERSONA: {
          code: "PERSONA",
          label: "Persona multi-rol",
          userName: "Laura G\xF3mez",
          userEmail: "laura.gomez@correo.co",
          userDoc: "CC 1.032.987.456",
          org: "\u2014",
          avatar: "LG",
          color: "#0e7490",
          short: "Deportista, tutora legal y entrenadora: un solo perfil",
          group: "Personas"
        }
      };
      NIVELES_JERARQUIA = [["comite", "Comit\xE9s"], ["federacion", "Federaciones"], ["liga", "Ligas"], ["club", "Clubes"], ["deportista", "Deportistas"]];
      NIVEL_JERARQUIA_IDX = (n) => NIVELES_JERARQUIA.findIndex(([x]) => x === n);
      NIVEL_PROPIO = { MINDEPORTE: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista", TERRITORIAL: "federacion" };
      jerarquiaItems = (code) => {
        const hijos = nivelesForRole(code);
        if (hijos.length === 1) return [];
        return [
          { id: "jerarquia", label: "Jerarqu\xEDa SND", icon: "sitemap", route: "jerarquia.html" },
          ...hijos.map(({ id: id2, label }) => ({ id: `jerarquia-${id2}`, label, icon: "level", route: `jerarquia.html?nivel=${id2}`, child: true }))
        ];
      };
      MENU_BY_ROLE = {
        MINDEPORTE: [
          { section: null, items: jerarquiaItems("MINDEPORTE") },
          { section: "GESTI\xD3N", items: [
            { id: "bandeja", label: "Bandeja de aprobaciones", icon: "inbox", route: "bandeja.html" },
            { id: "registro", label: "Registro de organismo", icon: "filePlus", route: "registro.html" },
            { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }
          ] }
        ],
        COMITE: [
          { section: null, items: jerarquiaItems("COMITE") },
          { section: "MI SECTOR", items: [
            { id: "bandeja", label: "Mis federaciones", icon: "inbox", route: "bandeja.html" },
            { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
          ] },
          { section: "DEPORTISTAS", items: [
            { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
          ] },
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        FEDERACION: [
          { section: null, items: jerarquiaItems("FEDERACION") },
          { section: "MIS LIGAS", items: [
            { id: "bandeja", label: "Mis ligas", icon: "inbox", route: "bandeja.html" },
            { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
          ] },
          { section: "DEPORTISTAS", items: [
            { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
          ] },
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        LIGA: [
          { section: null, items: jerarquiaItems("LIGA") },
          { section: "MIS CLUBES", items: [
            { id: "bandeja", label: "Mis clubes", icon: "inbox", route: "bandeja.html" },
            { id: "cargue", label: "Cargue masivo", icon: "upload", route: "cargue.html" }
          ] },
          { section: "DEPORTISTAS", items: [
            { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" }
          ] },
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        CLUB: [
          { section: null, items: jerarquiaItems("CLUB") },
          /* «Mis deportistas» (ORG-09) primero: es el plantel ya afiliado — el
             estado permanente del club. La bandeja es el trabajo pendiente. */
          { section: "DEPORTISTAS", items: [
            { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" },
            { id: "bandeja", label: "Solicitudes de deportistas", icon: "inbox", route: "bandeja.html" }
          ] },
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        /* Fase 2: el perfil multi-rol es la ficha única de la persona; el carné sigue en afiliacion.html. */
        DEPORTISTA: [
          { section: null, items: [
            { id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html" },
            { id: "carne", label: "Carn\xE9 digital", icon: "id", route: "afiliacion.html?sec=carne" }
          ] }
        ],
        PERSONA: [
          { section: null, items: [{ id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html" }] }
        ],
        TERRITORIAL: [
          { section: null, items: jerarquiaItems("TERRITORIAL") },
          { section: "MI TERRITORIO", items: [
            { id: "deportistas", label: "Deportistas", icon: "users", route: "deportistas.html" }
          ] }
        ]
      };
      PERSONAS = {
        sandra: {
          userName: "Sandra Mej\xEDa",
          userEmail: "sandra.mejia@correo.demo.co",
          userDoc: "CC 31.567.890",
          avatar: "SM",
          contextos: [{ role: "LIGA", org: "LIG-001" }, { role: "LIGA", org: "LIG-006" }, { role: "FEDERACION", org: "FED-040" }]
        }
      };
      PERSONA_KEY = "naowee-organismos-persona";
      PERSONA_POR_ROL = { LIGA: "sandra" };
      ROLE_DEFAULT = Object.fromEntries(Object.entries(ROLES).map(([k, r]) => [k, { userName: r.userName, org: r.org }]));
      (function aplicarContexto() {
        try {
          const code = new URLSearchParams(window.location.search).get("role");
          if (!ROLES[code]) return;
          const p = personaDe(code);
          if (p) Object.assign(ROLES[code], { userName: p.userName, userEmail: p.userEmail, userDoc: p.userDoc, avatar: p.avatar, persona: p.id, contextos: p.contextos });
          const org = getOrganismo(scopeFor(code));
          if (org && contextoDe(code)) ROLES[code].org = org.nombre;
          const pid = new URLSearchParams(window.location.search).get("persona");
          const per = ["PERSONA", "DEPORTISTA"].includes(code) && pid && pid !== "laura" && pid !== "ajena" ? getDeportista(pid) : null;
          if (per && !per.tutorId) Object.assign(ROLES[code], {
            userName: per.nombre,
            userEmail: per.correo || "",
            userDoc: `${per.tipoDoc} ${per.numDoc}`,
            avatar: per.nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase(),
            label: per.esDeportista === false ? per.rolTutor ? "Tutor legal" : "Personal deportivo" : "Deportista"
          });
          const terr = territorioDe(code);
          if (terr) Object.assign(ROLES[code], { org: terr.municipio ? `${terr.municipio} (${terr.depto})` : terr.depto, label: terr.municipio ? "Encargado municipal" : "Encargado departamental" });
          if (!p && org && contextoDe(code) && org.repLegal && org.repLegal.nombre) {
            const nombre = `${org.repLegal.nombre} ${org.repLegal.apellido || ""}`.trim();
            Object.assign(ROLES[code], {
              userName: nombre,
              userEmail: org.repLegal.correo || "",
              userDoc: `${org.repLegal.tipoDoc || "CC"} ${org.repLegal.numDoc || ""}`,
              avatar: nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
            });
          }
        } catch (_) {
        }
      })();
      ROLES_ORGANISMO = ["COMITE", "FEDERACION", "LIGA", "CLUB"];
      MENU_NO_ACTIVO = [{ section: null, items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }] }];
      _toastTimer = null;
      _tooltipEl = null;
      TIPO_TXT = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
      COLOR_TIPO = { comite: "#d74009", federacion: "#1f78d1", liga: "#7c3aed", club: "#1f8923" };
      NO_INICIAL = /* @__PURE__ */ new Set(["liga", "club", "federaci\xF3n", "federacion", "comit\xE9", "comite", "colombiana", "colombiano", "de", "del", "la", "el", "los", "las", "y", "deportivo"]);
      HOME_DEMO = { CLUB: "bandeja.html", DEPORTISTA: "perfil.html", PERSONA: "perfil.html" };
      MODE_KEY = "naowee-organismos-demo-mode";
      TOUR_KEY = "naowee-organismos-tour-seen";
      esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
      ROLE_GROUPS = [
        { label: "Rector\xEDa", codes: ["MINDEPORTE"] },
        { label: "Territorio", codes: ["TERRITORIAL"] },
        { label: "Cabezas de sector", codes: ["COMITE"] },
        { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
        { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
      ];
    }
  });

  // ../front/DEMO/naowee-organismos/shared/devnotes.js
  function mountDevnotes(registry, root2 = document) {
    root2.querySelectorAll("[data-devnote]").forEach((el) => {
      if (el.dataset.mounted) return;
      const n = registry[el.dataset.devnote];
      if (!n) return;
      const list = (items) => `<ul>${(items || []).map((i) => `<li>${i}</li>`).join("")}</ul>`;
      const body = n.sections ? n.sections.map((s) => `<div class="wz-devnote__sec"><div class="wz-devnote__sec-title">${s.title}</div>${list(s.items)}</div>`).join("") : list(n.items);
      el.innerHTML = `<span class="naowee-badge">Solo demo</span>Notas para devs
      <span class="wz-devnote__pop" role="tooltip"><span class="wz-devnote__head">${n.title} <em>\xB7 nota para devs, no es parte del producto</em></span>${body}</span>`;
      el.dataset.mounted = "1";
    });
  }
  var init_devnotes = __esm({
    "../front/DEMO/naowee-organismos/shared/devnotes.js"() {
    }
  });

  // ../front/DEMO/naowee-organismos/shared/ciclo.js
  function revisor(o2) {
    const sup = o2.parentId ? getOrganismo(o2.parentId) : null;
    if (o2.tipo === "federacion") return { nombre: `${sup ? sup.nombre : "el Comit\xE9"} y el Ministerio`, corto: "el Comit\xE9 y el Ministerio" };
    return { nombre: sup ? sup.nombre : "tu superior", corto: sup ? `${EL[sup.tipo]} ${TIPO[sup.tipo]}` : "tu superior" };
  }
  function estadoPropioHtml(o2, roleCode3) {
    const rev = revisor(o2);
    const t = TIPO[o2.tipo];
    const cambio = ultimoCambio(o2.id);
    const desde = cambio ? fecha(cambio.fecha) : fecha(o2.enviadoFecha || o2.fechaRegistro);
    const envio = allAudit(o2.id).find((a) => a.a === "En revisi\xF3n" && a.de !== "En revisi\xF3n");
    const completar = `registro.html?role=${roleCode3}&completar=${encodeURIComponent(o2.id)}`;
    let titulo, texto, cta = "", hint = "", pasos = [];
    switch (o2.estado) {
      case "Preinscrito":
        titulo = "Completa tu registro y env\xEDalo";
        texto = `<strong>${esc(rev.nombre)}</strong> carg\xF3 los datos b\xE1sicos de tu ${t}. Rev\xEDsalos, completa lo que falta y sube los documentos.`;
        cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Completar registro</a>`;
        hint = `Al enviarlo llega a la bandeja de ${esc(rev.nombre)}.`;
        pasos = [paso("done", `Te carg\xF3 ${rev.corto}`, desde), paso("now", "Completar y enviar", "", true), paso("next", `Revisi\xF3n de ${rev.corto}`), paso("next", "Activo", "Se habilita tu men\xFA completo")];
        break;
      case "En revisi\xF3n":
        titulo = "Tu registro est\xE1 en revisi\xF3n";
        texto = `Lo est\xE1 revisando <strong>${esc(rev.nombre)}</strong>. Te avisamos por correo cuando decida. Mientras tanto no tienes nada pendiente.`;
        pasos = [paso("done", "Enviaste tu registro", envio ? fecha(envio.fecha) : desde), paso("now", `Revisi\xF3n de ${rev.corto}`, "", true), paso("next", "Activo", "Se habilita tu men\xFA completo")];
        break;
      case "En correcci\xF3n":
        titulo = "Corrige tu registro y reenv\xEDalo";
        texto = `<strong>${esc(rev.nombre)}</strong> revis\xF3 tu registro y te pide un ajuste. No empiezas de cero: tus datos y documentos siguen ah\xED y solo cambias lo necesario.`;
        cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Corregir y reenviar</a>`;
        hint = `Al reenviarlo vuelve a la bandeja de ${esc(rev.nombre)}.`;
        pasos = [paso("done", "Enviaste tu registro", ""), paso("warn", `${cap(rev.corto)} pidi\xF3 una correcci\xF3n`, desde), paso("now", "Corregir y reenviar", "", true), paso("next", "Nueva revisi\xF3n"), paso("next", "Activo", "Se habilita tu men\xFA completo")];
        break;
      case "Rechazado":
        titulo = "Tu registro fue rechazado";
        texto = `<strong>${esc(rev.nombre)}</strong> rechaz\xF3 tu registro. Puedes corregir lo que se indica y volver a enviarlo; tus datos siguen ah\xED.`;
        cta = `<a class="naowee-btn naowee-btn--loud" href="${completar}">${EDIT}Corregir y reenviar</a>`;
        hint = `Al reenviarlo vuelve a la bandeja de ${esc(rev.nombre)}.`;
        pasos = [paso("done", "Enviaste tu registro", ""), paso("neg", `${cap(rev.corto)} lo rechaz\xF3`, desde), paso("now", "Corregir y reenviar", "", true), paso("next", "Nueva revisi\xF3n"), paso("next", "Activo", "Se habilita tu men\xFA completo")];
        break;
      case "Suspendido":
        titulo = `Tu ${t} est\xE1 suspendid${EL[o2.tipo] === "la" ? "a" : "o"}`;
        texto = `El Ministerio suspendi\xF3 ${EL[o2.tipo]} ${t}. Mientras dure no puedes operar; lo que depende de ti no cambia de estado. Para volver, el Ministerio debe reactivarl${EL[o2.tipo] === "la" ? "a" : "o"} y ${esc(rev.corto)} revisar${o2.tipo === "federacion" ? "" : "l" + (EL[o2.tipo] === "la" ? "a" : "o")} de nuevo.`;
        pasos = [paso("done", "Activo", ""), paso("neg", "Suspendido por el Ministerio", desde, true), paso("next", "Reactivaci\xF3n del Ministerio"), paso("next", `Nueva revisi\xF3n de ${rev.corto}`)];
        break;
      case "Cancelado":
        titulo = `Tu ${t} fue cancelad${EL[o2.tipo] === "la" ? "a" : "o"}`;
        texto = `El Ministerio cancel\xF3 su registro: perdi\xF3 el reconocimiento en el SUID y no vuelve a operar. Si crees que es un error, comun\xEDcate con el Ministerio.`;
        break;
      default:
        return "";
    }
    const motivo = cambio && cambio.motivo ? `<div class="oc-motivo">
      <p class="oc-motivo__lbl">${o2.estado === "Suspendido" || o2.estado === "Cancelado" ? "Motivo" : o2.estado === "Rechazado" ? "Motivo del rechazo" : "Motivo de la devoluci\xF3n"}</p>
      <p class="oc-motivo__txt">${esc(cambio.motivo)}</p>
      <p class="oc-motivo__who"><b>${esc(cambio.responsable || "")}</b>${cambio.rol ? ` \xB7 ${esc(cambio.rol)}` : ""} \xB7 ${esc(fecha(cambio.fecha))}</p>
    </div>` : "";
    const club = o2.tipo === "club";
    const lo = EL[o2.tipo] === "la" ? "la" : "lo";
    const habil = o2.estado === "Suspendido" ? `cuando el Ministerio ${lo} reactive y ${esc(rev.corto)} ${lo} apruebe de nuevo` : o2.estado === "Cancelado" ? "" : `cuando ${esc(rev.corto)} apruebe tu registro`;
    const puede = [
      [true, "Consultar tu ficha y su historial"],
      ...cta ? [[true, "Editar tu registro y enviarlo"]] : [],
      ...club ? [[false, "Confirmar afiliaciones de deportistas"]] : [[false, "Aprobar o devolver registros"], [false, "Hacer cargues masivos"]],
      [false, "Registrar deportistas"]
    ];
    return `<section class="oc-status${pasos.length ? "" : " oc-status--single"}" aria-label="Estado de tu ${t}">
    <div class="oc-status__main">
      <div class="oc-status__head">${badge(o2.estado)}<span class="oc-status__since">desde el ${esc(desde)}</span></div>
      <h2 class="oc-status__title">${titulo}</h2>
      <p class="oc-status__text">${texto}</p>
      ${motivo}
      ${cta ? `<div class="oc-status__cta">${cta}<span class="oc-status__hint">${hint}</span></div>` : ""}
      <div class="oc-can">
        <p class="oc-can__title">Mientras tu ${t} no est\xE9 activ${EL[o2.tipo] === "la" ? "a" : "o"}</p>
        <ul class="oc-can__list">${puede.map(([si, txt]) => `<li class="${si ? "" : "is-no"}"><span class="oc-can__ico oc-can__ico--${si ? "yes" : "no"}">${si ? SI : NO}</span>${txt}</li>`).join("")}</ul>
        ${habil ? `<p class="oc-can__foot">El resto se habilita ${habil}.</p>` : ""}
      </div>
    </div>
    ${pasos.length ? `<div class="oc-cycle"><p class="oc-cycle__title">C\xF3mo sigue tu registro</p>${pasos.join("")}</div>` : ""}
  </section>`;
  }
  function sancionesHtml(o2) {
    if (!["Activo", "Suspendido", "Cancelado"].includes(o2.estado)) return "";
    const t = TIPO[o2.tipo];
    const rev = revisor(o2);
    const cambio = ultimoCambio(o2.id);
    const hist = allAudit(o2.id).filter(ES_SANCION);
    const accion = (id2, label, hint, cls) => `<div class="oc-act"><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small ${cls || ""}" data-sancion="${id2}">${label}</button><p class="oc-act__hint">${hint}</p></div>`;
    const acciones = o2.estado === "Activo" ? accion("suspender", "Suspender", "Temporal: no opera mientras dure y puedes reactivarl" + (EL[o2.tipo] === "la" ? "a" : "o") + " despu\xE9s.") : o2.estado === "Suspendido" ? accion("reactivar", "Reactivar", `Vuelve a revisi\xF3n de ${esc(rev.corto)}; no se activa directo.`) : "";
    const definitiva = o2.estado !== "Cancelado" ? `<div class="oc-def"><p class="oc-def__lbl">Acci\xF3n definitiva</p>${accion("cancelar", "Cancelar registro", `${cap(EL[o2.tipo])} ${t} pierde el reconocimiento en el SUID y no vuelve a operar.`, "oc-btn-neg")}</div>` : "";
    return `<section class="oc-status oc-sanc" aria-label="Estado y sanciones">
    <div class="oc-status__main">
      <p class="oc-sanc__title">Estado y sanciones</p>
      <div class="oc-status__head">${badge(o2.estado)}<span class="oc-status__since">${cambio ? "desde el " + esc(fecha(cambio.fecha)) : ""}</span></div>
      <p class="oc-status__text">${o2.estado === "Activo" ? `Opera con normalidad en el SUID.` : o2.estado === "Suspendido" ? "No puede aprobar, cargar ni confirmar afiliaciones mientras dure la suspensi\xF3n." : "Registro cancelado: no vuelve a operar."}</p>
      ${cambio && cambio.motivo && o2.estado !== "Activo" ? `<div class="oc-motivo"><p class="oc-motivo__lbl">Motivo</p><p class="oc-motivo__txt">${esc(cambio.motivo)}</p><p class="oc-motivo__who"><b>${esc(cambio.responsable || "")}</b> \xB7 ${esc(fecha(cambio.fecha))}</p></div>` : ""}
    </div>
    <div class="oc-sanc__side">
      ${acciones ? `<div class="oc-acts">${acciones}</div>` : ""}
      ${definitiva}
      <div class="oc-sanc__hist"><p class="oc-cycle__title">Historial de sanciones</p>
        ${hist.length ? hist.map((a) => `<div class="od-tl-row"><span class="od-tl-dot"></span><div><div class="od-tl-head"><strong>${esc(a.accion)}</strong></div><div class="od-tl-sub">${esc(fecha(a.fecha))}${a.responsable ? " \xB7 " + esc(a.responsable) : ""}${a.motivo ? " \xB7 " + esc(a.motivo) : ""}</div></div></div>`).join("") : `<p class="oc-act__hint">Sin sanciones registradas.</p>`}
      </div>
    </div>
  </section>`;
  }
  function abrirSancion(tipoAccion, o2, meta, onDone) {
    const t = TIPO[o2.tipo];
    const rev = revisor(o2);
    const cfg = {
      suspender: { titulo: `Suspender ${EL[o2.tipo]} ${t}`, ok: "Suspender", danger: false, consq: [
        `No podr\xE1 aprobar, cargar organismos ni confirmar afiliaciones mientras dure la suspensi\xF3n.`,
        `Lo que depende de ${EL[o2.tipo] === "la" ? "ella" : "\xE9l"} no cambia de estado; sus deportistas siguen vinculados.`,
        `Se le notifica por correo con el motivo. Lo puedes reactivar despu\xE9s.`
      ] },
      reactivar: { titulo: `Reactivar ${EL[o2.tipo]} ${t}`, ok: "Reactivar", danger: false, consq: [
        `No queda activ${EL[o2.tipo] === "la" ? "a" : "o"} de inmediato: vuelve a En revisi\xF3n en la bandeja de ${rev.nombre}, sobre los datos que ya tiene.`,
        `Cuando lo apruebe, recupera su operaci\xF3n normal.`
      ] },
      cancelar: { titulo: `Cancelar el registro ${EL[o2.tipo] === "el" ? "del" : "de la"} ${t}`, ok: "S\xED, cancelar definitivamente", danger: true, consq: [
        `Pierde el reconocimiento en el SUID y no vuelve a operar. No hay forma de deshacerlo.`,
        `No se borra: su ficha y su historial quedan para consulta.`,
        `Qu\xE9 pasa con sus deportistas y lo que depende de ${EL[o2.tipo] === "la" ? "ella" : "\xE9l"} est\xE1 pendiente de definir con Negocio.`
      ] }
    }[tipoAccion];
    const ov = document.createElement("div");
    ov.className = "reg-modal-overlay bj-modal-ov";
    ov.innerHTML = `<div class="reg-modal bj-modal bj-modal--sm oc-dlg" role="dialog" aria-modal="true" aria-labelledby="ocDlgT">
    <div class="reg-modal__head"><h3 class="reg-modal__title" id="ocDlgT">${esc(cfg.titulo)}</h3><button type="button" class="reg-modal__close" data-x aria-label="Cerrar">${NO}</button></div>
    <div class="reg-modal__body">
      <p class="oc-dlg__lead">Vas a ${tipoAccion === "cancelar" ? "cancelar el registro de" : tipoAccion} <strong>${esc(o2.nombre)}</strong> \xB7 NIT ${esc(o2.nit)}.</p>
      <div class="oc-dlg__consq"><p class="oc-motivo__lbl">Qu\xE9 pasa al confirmar</p><ul class="oc-consq">${cfg.consq.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>
      <div class="bj-field"><label class="bj-label" for="ocMot">Motivo <span class="bj-req">*</span></label>
        <select class="bj-select oc-select" id="ocMot"><option value="">Selecciona un motivo\u2026</option>${MOTIVOS[tipoAccion].map((m) => `<option>${esc(m)}</option>`).join("")}</select>
        <p class="bj-err" id="ocMotErr" hidden>Selecciona un motivo.</p></div>
      <div class="bj-field"><label class="bj-label" for="ocDet">Detalle${tipoAccion === "cancelar" ? ' <span class="bj-req">*</span>' : ""}</label>
        <div class="naowee-textfield__input-wrap bj-ta-wrap"><textarea id="ocDet" rows="3" placeholder="Lo que ver\xE1 ${esc(EL[o2.tipo])} ${esc(t)} en su notificaci\xF3n\u2026"></textarea></div>
        <p class="bj-err" id="ocDetErr" hidden>Escribe el detalle.</p></div>
      ${tipoAccion === "cancelar" ? `<label class="oc-check"><input type="checkbox" id="ocOk"> Entiendo que la cancelaci\xF3n no se puede deshacer.</label><p class="bj-err" id="ocOkErr" hidden>Confirma que entiendes que no tiene vuelta.</p>` : ""}
    </div>
    <div class="reg-modal__foot bj-modal__foot"><button type="button" class="naowee-btn naowee-btn--mute" data-x>Volver</button><button type="button" class="naowee-btn ${cfg.danger ? "bj-btn-danger" : "naowee-btn--loud"}" id="ocGo">${esc(cfg.ok)}</button></div>
  </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("is-open"));
    const opener = document.activeElement;
    const cerrar = () => {
      ov.classList.remove("is-open");
      setTimeout(() => ov.remove(), 340);
      document.removeEventListener("keydown", onKey);
      opener && opener.focus && opener.focus();
    };
    const onKey = (e) => {
      if (e.key === "Escape") cerrar();
    };
    document.addEventListener("keydown", onKey);
    setTimeout(() => ov.querySelector("#ocMot").focus(), 60);
    ov.addEventListener("click", (e) => {
      if (e.target === ov || e.target.closest("[data-x]")) cerrar();
    });
    ov.querySelector("#ocGo").addEventListener("click", () => {
      const mot = ov.querySelector("#ocMot").value;
      const det = ov.querySelector("#ocDet").value.trim();
      const okBox = ov.querySelector("#ocOk");
      const faltaDet = (tipoAccion === "cancelar" || mot === "Otro") && !det;
      ov.querySelector("#ocMotErr").hidden = !!mot;
      ov.querySelector("#ocDetErr").hidden = !faltaDet;
      if (okBox) ov.querySelector("#ocOkErr").hidden = okBox.checked;
      if (!mot || faltaDet || okBox && !okBox.checked) return;
      const motivo = det ? `${mot} \u2014 ${det}` : mot;
      const m = { ...meta, motivo };
      if (tipoAccion === "suspender") sancionar(o2.id, "Suspendido", m);
      else if (tipoAccion === "cancelar") sancionar(o2.id, "Cancelado", m);
      else reactivar(o2.id, m);
      cerrar();
      onDone && onDone(tipoAccion);
    });
  }
  var esc, MESES, fecha, badge, TIPO, EL, SI, NO, EDIT, paso, cap, MOTIVOS, ES_SANCION;
  var init_ciclo = __esm({
    "../front/DEMO/naowee-organismos/shared/ciclo.js"() {
      init_organismos_data();
      init_estados();
      esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      fecha = (iso) => {
        if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso || "";
        const [y, m, d] = iso.slice(0, 10).split("-");
        return `${Number(d)} ${MESES[Number(m) - 1]} ${y}`;
      };
      badge = (e) => `<span class="naowee-badge naowee-badge--${estadoBadgeVariant(e)} naowee-badge--quiet naowee-badge--small">${esc(e)}</span>`;
      TIPO = { comite: "comit\xE9", federacion: "federaci\xF3n", liga: "liga", club: "club" };
      EL = { comite: "el", federacion: "la", liga: "la", club: "el" };
      SI = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
      NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
      EDIT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
      paso = (cls, titulo, sub, aqui) => `<div class="od-tl-row oc-step--${cls}"><span class="od-tl-dot"></span><div>
  <div class="od-tl-head"><strong>${esc(titulo)}</strong>${aqui ? '<span class="oc-here">Est\xE1s aqu\xED</span>' : ""}</div>
  ${sub ? `<div class="od-tl-sub">${esc(sub)}</div>` : ""}</div></div>`;
      cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
      MOTIVOS = {
        suspender: ["Investigaci\xF3n disciplinaria en curso", "Reconocimiento deportivo vencido", "Incumplimiento de obligaciones de reporte", "Orden de autoridad competente", "Otro"],
        cancelar: ["P\xE9rdida del reconocimiento deportivo", "Disoluci\xF3n o liquidaci\xF3n de la entidad", "Sanci\xF3n en firme de autoridad competente", "Registro duplicado o fraudulento", "Otro"],
        reactivar: ["Se resolvi\xF3 la causa de la suspensi\xF3n", "Renov\xF3 el reconocimiento deportivo", "Decisi\xF3n de autoridad competente", "Otro"]
      };
      ES_SANCION = (a) => /Ministerio|Reactivación/.test(a.accion || "");
    }
  });

  // ../front/DEMO/naowee-organismos/shared/detalle.js
  var detalle_exports = {};
  function fmtDate(iso) {
    if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso || "\u2014";
    const [y, m, d] = iso.slice(0, 10).split("-");
    return `${Number(d)} ${MESES2[Number(m) - 1] || m} ${y}`;
  }
  function inJurisdiction(orgId) {
    if (isGlobalScope(roleCode)) return true;
    const terr = territorioDe(roleCode);
    if (terr) {
      const base = organismosDeTerritorio(terr).map((o2) => o2.id);
      return base.includes(orgId) || base.some((b) => subtreeOf(b).some((x) => x.id === orgId));
    }
    const scopeId = scopeFor(roleCode);
    if (roleCode === "DEPORTISTA") {
      const dep = allDeportistas().find((d) => d.id === scopeId);
      if (!dep || !dep.clubIds.length) return false;
      const chain = new Set(dep.clubIds.flatMap((c) => [c, ...ancestorsOf(c).map((a) => a.id)]));
      return chain.has(orgId);
    }
    if (orgId === scopeId) return true;
    return subtreeOf(scopeId).some((x) => x.id === orgId);
  }
  function badge2(estado) {
    return `<span class="naowee-badge naowee-badge--${estadoBadgeVariant(estado)} naowee-badge--quiet naowee-badge--small">${esc2(estado)}</span>`;
  }
  function depBadge(estado) {
    return estado === "vinculado" ? `<span class="naowee-badge naowee-badge--positive naowee-badge--quiet naowee-badge--small">Vinculado</span>` : `<span class="naowee-badge naowee-badge--informative naowee-badge--quiet naowee-badge--small">Autodeclarado</span>`;
  }
  function msg(variant, icon, html) {
    return `<div class="naowee-message naowee-message--${variant}"><span class="naowee-message__icon">${icon}</span><div class="naowee-message__body"><p class="naowee-message__text">${html}</p></div></div>`;
  }
  function emptyState(title, desc) {
    return `<div class="naowee-empty-state"><span class="naowee-empty-state__icon">${I.inbox}</span><p class="naowee-empty-state__title">${esc2(title)}</p><p class="naowee-empty-state__description">${esc2(desc)}</p></div>`;
  }
  function backBtnHtml() {
    return `<div class="od-back"><button type="button" class="naowee-btn naowee-btn--mute naowee-btn--small" id="odBack">${I.back}Volver</button><span class="wz-devnote" tabindex="0" role="button" data-devnote="detalle"></span></div>`;
  }
  function goBack() {
    const target = fromParam && /^[a-z-]+\.html$/.test(fromParam) ? `${fromParam}?role=${roleCode}` : `${homeForRole(roleCode)}?role=${roleCode}`;
    const ref = document.referrer;
    if (ref && ref.indexOf(window.location.origin) === 0 && ref !== window.location.href && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = target;
    }
  }
  function renderNotFound() {
    root.innerHTML = `${backBtnHtml()}
    <div class="naowee-card">
      <div class="naowee-empty-state">
        <span class="naowee-empty-state__icon">${I.building}</span>
        <span class="naowee-badge naowee-badge--neutral naowee-badge--quiet naowee-badge--small">Sin resultado</span>
        <p class="naowee-empty-state__title">Organismo no encontrado</p>
        <p class="naowee-empty-state__description">${id ? `No existe ning\xFAn organismo con el identificador <strong>${esc2(id)}</strong> en el SUID.` : "No se indic\xF3 qu\xE9 organismo abrir."} Vuelve a la jerarqu\xEDa y selecciona un organismo.</p>
      </div>
    </div>`;
    wireBack();
  }
  function renderNoAccess(o2) {
    root.innerHTML = `${backBtnHtml()}
    <div class="naowee-card">
      <div class="naowee-empty-state">
        <span class="naowee-empty-state__icon">${I.lock}</span>
        <span class="naowee-badge naowee-badge--neutral naowee-badge--quiet naowee-badge--small">Fuera de tu jurisdicci\xF3n</span>
        <p class="naowee-empty-state__title">Sin acceso a este organismo</p>
        <p class="naowee-empty-state__description">Como <strong>${esc2(role.label || roleCode)}</strong> solo puedes consultar los organismos de tu jurisdicci\xF3n (tu sub\xE1rbol del SND). Este organismo est\xE1 fuera de tu dependencia.</p>
      </div>
    </div>`;
    wireBack();
  }
  function breadcrumbHtml(o2) {
    const chain = [...ancestorsOf(o2.id)].reverse();
    const crumbs = chain.map((a) => inJurisdiction(a.id) ? `<a class="naowee-breadcrumb__item" href="organismo-detalle.html?id=${encodeURIComponent(a.id)}&role=${roleCode}">${esc2(a.nombre)}</a>` : `<span class="naowee-breadcrumb__static" title="Fuera de tu jurisdicci\xF3n">${esc2(a.nombre)}</span>`);
    crumbs.push(`<span class="naowee-breadcrumb__current" aria-current="page">${esc2(o2.nombre)}</span>`);
    return `<nav class="naowee-breadcrumb od-crumbs" aria-label="Ruta jer\xE1rquica ascendente">${crumbs.join(`<span class="naowee-breadcrumb__sep">${I.sep}</span>`)}</nav>`;
  }
  function heroHtml(o2) {
    const metaParts = [`NIT <b>${esc2(o2.nit)}</b>`];
    if (o2.deporte && o2.deporte !== "\u2014") metaParts.push(esc2(o2.deporte));
    if (o2.sector) metaParts.push(`Sector ${esc2(o2.sector)}`);
    const recurso = RECURSO_BY_TIPO[o2.tipo];
    const accionable = recurso && can(roleCode, "A", recurso) && o2.estado === "En revisi\xF3n";
    const bandejaLink = accionable ? `<a class="naowee-btn naowee-btn--mute naowee-btn--small" href="bandeja.html?role=${roleCode}">${I.inbox}Gestionar en la Bandeja</a>` : "";
    return `
    <div class="od-hero">
      <div class="od-hero__emoji">${EMOJI[o2.tipo] || "\u{1F3DB}\uFE0F"}</div>
      <div class="od-hero__main">
        <div class="od-hero__title-row">
          <h1 class="od-hero__name">${esc2(o2.nombre)}</h1>
          ${conBloqueEstado(o2) ? "" : badge2(o2.estado)}
        </div>
        <p class="od-hero__meta">${metaParts.join('<span class="od-dot">\xB7</span>')}</p>
      </div>
      <div class="od-hero__actions">
        ${roleCode === "MINDEPORTE" || esPropio(o2) ? "" : `<span class="od-ro" title="Perfil de solo lectura \u2014 las acciones viven en la Bandeja">${I.lock} Solo lectura</span>`}
        ${!esPropio(o2) && o2.estado !== "Activo" && ROL_DE_TIPO[o2.tipo] ? `<a class="naowee-btn naowee-btn--quiet naowee-btn--small" title="Solo demo: simula el acceso del administrador de este organismo" href="organismo-detalle.html?role=${ROL_DE_TIPO[o2.tipo]}&org=${encodeURIComponent(o2.id)}&como=org">Entrar como este organismo</a>` : ""}
        ${bandejaLink}
      </div>
    </div>`;
  }
  function ligasClubHtml(o2) {
    const afs = afiliacionesDe(o2.id).filter((a) => a.tipo === "club" && ["Vinculada", "Solicitada", "Rechazada"].includes(a.estado));
    const disp = ligasDisponiblesPara(o2.id);
    const EST = { Vinculada: ["positive", "Afiliado"], Solicitada: ["caution", "Solicitada"], Rechazada: ["negative", "Rechazada"] };
    return `<section class="oc-status oc-status--single od-ligas" aria-label="Ligas de tu club">
    <div class="oc-status__main">
      <p class="oc-sanc__title">Ligas de tu club</p>
      <p class="oc-status__text">Tu club puede estar en varias ligas de sus deportes. Cada liga aprueba su v\xEDnculo; de cada una heredan tus deportistas su cadena.</p>
      <ul class="od-ligas__list">${afs.map((a) => {
      const l = getOrganismo(a.organismoId) || {};
      const e = EST[a.estado];
      return `<li><span><strong>${esc2(l.nombre || a.organismoId)}</strong><small>${esc2(l.deporte || "")} \xB7 ${esc2(l.ubicacion ? l.ubicacion.depto : "")}${a.organismoId === o2.parentId ? " \xB7 la activ\xF3" : ""}${a.motivo && a.estado === "Rechazada" ? " \xB7 " + esc2(a.motivo) : ""}</small></span><span class="naowee-badge naowee-badge--${e[0]} naowee-badge--quiet naowee-badge--small">${e[1]}</span></li>`;
    }).join("")}</ul>
      <div class="oc-status__cta">${disp.length ? `<label class="od-ligas__pick"><span class="sr-only">Liga</span><select id="odLiga" class="oc-select"><option value="">Elige una liga de tus deportes\u2026</option>${disp.map((l) => `<option value="${l.id}">${esc2(l.nombre)} \xB7 ${esc2(l.deporte)}</option>`).join("")}</select></label><button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" id="odLigaOk">Solicitar afiliaci\xF3n</button>` : '<span class="oc-status__hint">No hay otras ligas activas de tus deportes.</span>'}</div>
    </div>
  </section>`;
  }
  function kvRow(k, v) {
    return v == null || v === "" ? "" : `<div class="od-kv__row"><dt>${esc2(k)}</dt><dd>${esc2(v)}</dd></div>`;
  }
  function infoPanel(o2) {
    const u = o2.ubicacion || {};
    const sede = [u.direccion, u.ciudad, u.depto].filter(Boolean).join(", ") + (u.zona ? ` (${u.zona})` : "");
    const c = o2.contacto || {};
    const contacto = [c.telefono, c.correo].filter(Boolean).join(" \xB7 ");
    const rows = [
      kvRow("Tipo de organismo", TYPE_LABEL[o2.tipo]),
      o2.tipo === "club" && o2.tipoClub ? kvRow("Tipo de club", cap2(o2.tipoClub)) : "",
      o2.tipo === "liga" ? kvRow("\xC1mbito", cap2(o2.ambito || "Departamental")) : "",
      kvRow("NIT / RUT", o2.nit),
      kvRow("Naturaleza jur\xEDdica", o2.naturaleza || "Privada, sin \xE1nimo de lucro"),
      kvRow("Cobertura geogr\xE1fica", o2.cobertura || COBERTURA_BY_TIPO[o2.tipo] || "\u2014"),
      o2.sector && o2.sector !== "\u2014" ? kvRow("Sector SND", o2.sector) : "",
      o2.deporte && o2.deporte !== "\u2014" ? kvRow("Deporte", o2.deporte) : "",
      kvRow("Sede / direcci\xF3n", sede.trim().replace(/^,\s*/, "") || "\u2014"),
      kvRow("Contacto institucional", contacto || "\u2014"),
      kvRow("Fecha de registro", fmtDate(o2.fechaRegistro))
    ].join("");
    return `<div class="od-block"><dl class="od-kv">${rows}</dl></div>`;
  }
  function repPanel(o2) {
    const r = o2.repLegal;
    if (!r) return emptyState("Sin representante legal", "Este organismo a\xFAn no registra los datos de su representante legal.");
    const rows = [
      kvRow("Nombre", `${r.nombre || ""} ${r.apellido || ""}`.trim() || "\u2014"),
      kvRow("Documento", `${r.tipoDoc || ""} ${r.numDoc || ""}`.trim() || "\u2014"),
      kvRow("Correo electr\xF3nico", r.correo || "\u2014")
    ].join("");
    return `<div class="od-block"><dl class="od-kv">${rows}</dl></div>
    <div class="od-block">${msg("informative", I.info, "Los datos del representante legal son <strong>demostrativos y anonimizados</strong> (el caso real del COC se mantiene sin datos personales, handoff \xA78.5.4).")}</div>`;
  }
  function docsPanel(o2) {
    const docs = o2.documentos || {};
    const present = Object.keys(DOC_LABELS).filter((k) => docs[k]);
    const acto = o2.actoAdministrativo && !docs.actoAdministrativo ? o2.actoAdministrativo : "";
    const rows = [];
    present.forEach((k) => {
      const f = docs[k];
      rows.push(docRow(DOC_LABELS[k], f && f.name || (typeof f === "string" ? f : "documento.pdf")));
    });
    if (acto) rows.push(docRow(DOC_LABELS.actoAdministrativo, esc2(acto)));
    if (!rows.length) {
      return `<div class="od-block">${msg(
        "caution",
        I.alert,
        "Este organismo a\xFAn no tiene <strong>soportes documentales</strong> adjuntos en el SUID (reconocimiento deportivo, aval, RUT, personer\xEDa). El reconocimiento deportivo es un acto legal <strong>externo (IVC)</strong>: el sistema lo valida y registra \u2014 no lo otorga."
      )}</div>`;
    }
    return `<div class="od-block">${rows.join("")}</div>
    <div class="od-block">${msg("informative", I.info, "El reconocimiento deportivo se tramita ante el <strong>IVC</strong> (Mindeporte / ente territorial). El SUID lo valida y registra como soporte; no lo emite.")}</div>`;
  }
  function docRow(label, file) {
    return `<div class="od-doc"><span class="od-doc__ico">${I.doc}</span><div style="min-width:0"><div class="od-doc__name">${esc2(label)}</div><div class="od-doc__file">${esc2(file)}</div></div><span class="od-doc__tag"><span class="naowee-badge naowee-badge--positive naowee-badge--quiet naowee-badge--small">Adjunto</span></span></div>`;
  }
  function countsHtml(o2) {
    const c = countDescendants(o2.id);
    const parts = [];
    if (o2.tipo === "comite") parts.push(seg(c.federaciones, "federaci\xF3n", "federaciones"));
    if (o2.tipo === "comite" || o2.tipo === "federacion") parts.push(seg(c.ligas, "liga", "ligas"));
    if (o2.tipo !== "club") parts.push(seg(c.clubes, "club", "clubes"));
    parts.push(seg(c.deportistas, "deportista", "deportistas"));
    return `<div class="od-counts">${parts.join("")}</div>`;
  }
  function hierPanel(o2) {
    const parent = o2.parentId ? getOrganismo(o2.parentId) : null;
    const parentLine = parent ? `<p class="od-parent">Pertenece a: ${inJurisdiction(parent.id) ? `<a href="organismo-detalle.html?id=${encodeURIComponent(parent.id)}&role=${roleCode}">${esc2(parent.nombre)}</a>` : `<strong>${esc2(parent.nombre)}</strong>`} \xB7 ${TYPE_LABEL[parent.tipo]}</p>` : `<p class="od-parent">Nodo ra\xEDz del SND (cabeza de sector, sin superior).</p>`;
    let listHtml;
    if (o2.tipo === "club") {
      const deps = deportistasOf(o2.id);
      listHtml = deps.length ? deps.map((d) => `
        <div class="od-child">
          <span class="od-child__emoji">${EMOJI.deportista}</span>
          <div class="od-child__main">
            <div class="od-child__name">${esc2(d.nombre)}</div>
            <div class="od-child__sub">${esc2(d.deporte)}${d.modalidad ? " \u2014 " + esc2(d.modalidad) : ""} \xB7 ${esc2(d.tipoDoc)} ${esc2(d.numDoc)}</div>
          </div>
          <span class="od-child__badge">${depBadge(d.estado)}</span>
        </div>`).join("") : emptyState("Sin deportistas afiliados", "Este club a\xFAn no tiene deportistas con afiliaci\xF3n confirmada.");
    } else {
      const kids = childrenOf(o2.id).sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
      listHtml = kids.length ? kids.map((k) => {
        const kc = countDescendants(k.id);
        const sub = k.tipo === "federacion" ? `${kc.ligas} ${kc.ligas === 1 ? "liga" : "ligas"} \xB7 ${kc.deportistas} dep.` : k.tipo === "liga" ? `${kc.clubes} ${kc.clubes === 1 ? "club" : "clubes"} \xB7 ${kc.deportistas} dep.` : `${kc.deportistas} ${kc.deportistas === 1 ? "deportista" : "deportistas"}`;
        const dep = k.deporte && k.deporte !== "\u2014" ? ` \xB7 ${esc2(k.deporte)}` : "";
        return `
            <a class="od-child" href="organismo-detalle.html?id=${encodeURIComponent(k.id)}&role=${roleCode}">
              <span class="od-child__emoji">${EMOJI[k.tipo]}</span>
              <div class="od-child__main">
                <div class="od-child__name">${esc2(k.nombre)}</div>
                <div class="od-child__sub">${TYPE_LABEL[k.tipo]}${dep} \xB7 <b>${esc2(sub)}</b></div>
              </div>
              <span class="od-child__badge">${badge2(k.estado)}</span>
              <span class="od-child__arrow">${I.arrow}</span>
            </a>`;
      }).join("") : emptyState("Sin organismos dependientes", `Este ${TYPE_LABEL[o2.tipo].toLowerCase()} a\xFAn no tiene organismos de nivel inferior registrados.`);
    }
    return `${countsHtml(o2)}${parentLine}<div class="od-children">${listHtml}</div>`;
  }
  function histPanel(o2) {
    const audit = allAudit(o2.id);
    if (!audit.length) {
      return emptyState(
        "Sin movimientos registrados",
        "El historial de trazabilidad (aprobaciones, rechazos y solicitudes de correcci\xF3n con su motivo) aparece aqu\xED cuando el organismo se gestiona desde la Bandeja (ORG-07)."
      );
    }
    const rows = audit.map((a, i) => {
      const trans = a.de && a.a ? `${esc2(a.de)} \u2192 ${esc2(a.a)}` : esc2(a.a || "");
      const quien = a.deportistaNombre ? ` \xB7 ${esc2(a.deportistaNombre)}` : "";
      const who = [a.responsable, a.rol && a.rol !== a.responsable ? a.rol : ""].filter(Boolean).join(" \xB7 ");
      const sub = [fmtDate(a.fecha), who, a.motivo].filter(Boolean).map(esc2).join(" \xB7 ") + (a.notif ? " \xB7 \u{1F514} notificado por email/app" : "");
      return `<div class="od-tl-row"><span class="od-tl-dot"></span><div><div class="od-tl-head"><strong>${esc2(a.accion || "Cambio de estado")}</strong>${trans ? " \xB7 " + trans : ""}${quien}</div><div class="od-tl-sub">${sub}</div></div></div>`;
    }).join("");
    return `<div class="od-block">${rows}</div>`;
  }
  function panelFor(tab, o2) {
    if (tab === "rep") return repPanel(o2);
    if (tab === "docs") return docsPanel(o2);
    if (tab === "hier") return hierPanel(o2);
    if (tab === "hist") return histPanel(o2);
    return infoPanel(o2);
  }
  function renderProfile(o2) {
    var _a;
    let active = "info";
    root.innerHTML = `${esPropio(o2) ? "" : breadcrumbHtml(o2)}
    ${esPropio(o2) ? '<div class="od-back"><span class="wz-devnote" tabindex="0" role="button" data-devnote="detalle"></span></div>' : backBtnHtml()}
    ${conBloqueEstado(o2) ? estadoPropioHtml(o2, roleCode) : ""}
    ${heroHtml(o2)}
    ${roleCode === "MINDEPORTE" ? sancionesHtml(o2) : ""}
    ${esPropio(o2) && o2.tipo === "club" && o2.estado === "Activo" ? ligasClubHtml(o2) : ""}
    <div class="naowee-card od-tabs-card">
      <div class="naowee-tabs" id="odTabs" role="tablist">
        ${TABS.map(([t, l]) => `<button type="button" class="naowee-tab ${t === active ? "naowee-tab--selected" : ""}" role="tab" data-tab="${t}" aria-selected="${t === active}">${esc2(l)}</button>`).join("")}
      </div>
      <div id="odPanel"></div>
    </div>`;
    const tabsEl = document.getElementById("odTabs");
    const panelEl = document.getElementById("odPanel");
    const paint = () => {
      panelEl.innerHTML = `<div class="od-panel" role="tabpanel" tabindex="0">${panelFor(active, o2)}</div>`;
    };
    tabsEl.querySelectorAll(".naowee-tab").forEach((btn) => btn.addEventListener("click", () => {
      active = btn.dataset.tab;
      tabsEl.querySelectorAll(".naowee-tab").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("naowee-tab--selected", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      paint();
    }));
    paint();
    wireBack();
    root.querySelectorAll("[data-sancion]").forEach((b) => b.addEventListener("click", () => {
      abrirSancion(b.dataset.sancion, o2, { responsable: role.userName || "Ministerio", rol: "Ministerio" }, (acc) => {
        const msgs = { suspender: "qued\xF3 suspendido", cancelar: "qued\xF3 con el registro cancelado", reactivar: "volvi\xF3 a revisi\xF3n de su superior" };
        window.naoweeToast && window.naoweeToast(`${o2.nombre} ${msgs[acc]}. Se le notific\xF3 por correo.`, "success");
        renderProfile(getOrganismo(o2.id));
      });
    }));
    (_a = root.querySelector("#odLigaOk")) == null ? void 0 : _a.addEventListener("click", () => {
      const v = root.querySelector("#odLiga").value;
      if (!v) {
        root.querySelector("#odLiga").focus();
        return;
      }
      solicitarLiga(o2.id, v, { responsable: role.userName || "" });
      window.naoweeToast && window.naoweeToast(`Solicitud enviada a ${getOrganismo(v).nombre}. La liga la aprueba desde su bandeja.`, "success");
      renderProfile(getOrganismo(o2.id));
    });
    mountDevnotes(DEVNOTES);
  }
  function wireBack() {
    var _a;
    (_a = document.getElementById("odBack")) == null ? void 0 : _a.addEventListener("click", goBack);
  }
  var params, roleCode, role, id, fromParam, root, esc2, cap2, EMOJI, TYPE_LABEL, RECURSO_BY_TIPO, COBERTURA_BY_TIPO, DOC_LABELS, I, MESES2, DEVNOTES, ROLES_ORG, esPropio, conBloqueEstado, ROL_DE_TIPO, seg, TABS, o;
  var init_detalle = __esm({
    "../front/DEMO/naowee-organismos/shared/detalle.js"() {
      init_sidebar();
      init_organismos_data();
      init_permissions();
      init_devnotes();
      init_estados();
      init_ciclo();
      params = new URLSearchParams(window.location.search);
      roleCode = getRoleFromQuery();
      role = ROLES[roleCode] || {};
      id = params.get("id") || (["COMITE", "FEDERACION", "LIGA", "CLUB"].includes(roleCode) ? scopeFor(roleCode) : "") || "";
      fromParam = params.get("from") || "";
      root = document.getElementById("detalleRoot");
      esc2 = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      cap2 = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
      EMOJI = { comite: "\u{1F3DB}\uFE0F", federacion: "\u{1F3C5}", liga: "\u{1F6A9}", club: "\u{1F6E1}\uFE0F", deportista: "\u{1F3C3}" };
      TYPE_LABEL = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club", deportista: "Deportista" };
      RECURSO_BY_TIPO = { comite: "comites", federacion: "federaciones", liga: "ligas", club: "clubes" };
      COBERTURA_BY_TIPO = { comite: "Nacional", federacion: "Nacional", liga: "Departamental", club: "Municipal" };
      DOC_LABELS = {
        actoAdministrativo: "Acto administrativo de reconocimiento",
        reconocimiento: "Reconocimiento deportivo (tr\xE1mite IVC)",
        reconocimientoMunicipal: "Reconocimiento del ente municipal",
        aval: "Aval del Comit\xE9",
        rut: "RUT",
        personeria: "Certificado de personer\xEDa jur\xEDdica"
      };
      I = {
        back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
        sep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>',
        arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
        doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
        inbox: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
        building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-4h6v4"/><path d="M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01"/></svg>'
      };
      MESES2 = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      DEVNOTES = { detalle: { title: "Ficha de organismo \xB7 c\xF3mo funciona por dentro", sections: [
        { title: "Navegaci\xF3n", items: [
          "Breadcrumb de ancestros arriba y \xABVolver\xBB debajo (<code>goBack</code>: <code>history.back()</code> si hay historial; si no, <code>?from=</code> o el inicio del rol).",
          "El alcance se valida con <code>scopeFor</code>: fuera de jurisdicci\xF3n muestra \xABsin acceso\xBB, sin datos.",
          "Si el organismo est\xE1 En revisi\xF3n y el rol puede aprobarlo, enlaza a la Bandeja: aprobar, devolver y rechazar viven all\xED."
        ] },
        { title: "\xABMi organismo\xBB (Fase 1)", items: [
          "Sin <code>?id</code>, el administrador abre su propio organismo. Si no est\xE1 <strong>Activo</strong> su men\xFA se reduce a \xABMi organismo\xBB (<code>organismoNoActivo</code> en shared/sidebar.js): no aprueba, no carga, no confirma afiliaciones.",
          "Arriba va el bloque de estado (<code>estadoPropioHtml</code>, shared/ciclo.js): qu\xE9 pas\xF3, el motivo con qui\xE9n y cu\xE1ndo (\xFAltimo cambio en la trazabilidad), qu\xE9 le toca, lo que puede y no puede hacer y el recorrido.",
          "Preinscrito, En correcci\xF3n y Rechazado llevan a <code>registro.html?completar=&lt;id&gt;</code>: el mismo asistente sin el paso Tipo y con el superior fijo. Al enviar queda <strong>En revisi\xF3n</strong> en la bandeja del superior (<code>enviarRegistro</code>); en federaciones los dos avales vuelven a empezar.",
          "Solo demo: \xABEntrar como \u2026\xBB (en esta ficha si el organismo no est\xE1 Activo, en la bandeja del superior y despu\xE9s de un cargue masivo) simula el acceso que le llega por correo al organismo. Su administrador es el representante legal. Para volver a un perfil de la demo, el chip de usuario tiene \xABCambiar de perfil\xBB."
        ] },
        { title: "Sanciones del Ministerio (Fase 1)", items: [
          "Solo el Ministerio ve \xABEstado y sanciones\xBB (<code>sancionesHtml</code>). Activo: Suspender. Suspendido: Reactivar. Activo o Suspendido: Cancelar registro, aparte como acci\xF3n definitiva.",
          "Cada acci\xF3n pide motivo; el detalle es obligatorio al cancelar o con \xABOtro\xBB, y cancelar exige confirmar que no tiene vuelta. Todo queda en la trazabilidad con responsable, fecha y motivo.",
          "Suspender no cambia el estado de lo que depende del organismo ni sus afiliaciones: solo bloquea sus acciones mientras dure (propuesta P-18).",
          "Reactivar no activa directo: vuelve a En revisi\xF3n en la bandeja del superior, sobre los datos que ya tiene (propuesta P-08). Causales y qu\xE9 pasa con los deportistas al cancelar siguen abiertos con Negocio."
        ] }
      ] } };
      ROLES_ORG = ["COMITE", "FEDERACION", "LIGA", "CLUB"];
      esPropio = (o2) => ROLES_ORG.includes(roleCode) && o2.id === scopeFor(roleCode);
      conBloqueEstado = (o2) => esPropio(o2) && o2.estado !== "Activo";
      ROL_DE_TIPO = { federacion: "FEDERACION", liga: "LIGA", club: "CLUB" };
      seg = (n, s, p) => `<span class="od-count"><b>${n}</b> ${n === 1 ? s : p}</span>`;
      TABS = [
        ["info", "Informaci\xF3n"],
        ["rep", "Representante legal"],
        ["docs", "Documentos"],
        ["hier", "Jerarqu\xEDa"],
        ["hist", "Historial"]
      ];
      seedTrazabilidadDemo();
      o = id ? getOrganismo(id) : null;
      if (!o) renderNotFound();
      else if (!inJurisdiction(id)) renderNoAccess(o);
      else renderProfile(o);
      mountDevnotes(DEVNOTES);
    }
  });

  // ../front/DEMO/naowee-organismos/shared/entries/organismo-detalle.js
  init_sidebar();
  init_organismos_data();
  seedDemoData();
  var roleCode2 = getRoleFromQuery();
  var role2 = ROLES[roleCode2];
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode: roleCode2, activeId: new URLSearchParams(location.search).get("id") ? "jerarquia" : "mi-organismo" });
  mountHeader({ headerEl: document.getElementById("topHeader"), role: role2 });
  mountBackdrop();
  mountDemoSwitcher({ roleCode: roleCode2 });
  Promise.resolve().then(() => init_detalle());
})();
