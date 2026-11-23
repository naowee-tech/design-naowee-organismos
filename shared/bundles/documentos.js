(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // shared/estados.js
  var init_estados = __esm({
    "shared/estados.js"() {
    }
  });

  // shared/organismos-data.js
  function deportesComiteSeed(id) {
    if (!_deportesComite[id]) {
      const feds = SEED_ORGANISMOS.filter((o) => o.tipo === "federacion" && o.parentId === id).flatMap((o) => deportesDe(o));
      _deportesComite[id] = [.../* @__PURE__ */ new Set([...feds, ...DEPORTES_COMITE_EXTRA[id]])].sort((a, b) => a.localeCompare(b, "es"));
    }
    return _deportesComite[id].slice();
  }
  function deportesDe(org) {
    if (!org) return [];
    if (Array.isArray(org.deportes) && org.deportes.length) return org.deportes.slice();
    if (DEPORTES_SEED[org.id]) return DEPORTES_SEED[org.id].slice();
    if (org.tipo === "comite") return DEPORTES_COMITE_EXTRA[org.id] ? deportesComiteSeed(org.id) : [];
    return org.deporte && org.deporte !== "\u2014" ? String(org.deporte).split(",").map((x) => x.trim()).filter(Boolean) : [];
  }
  function conDeportes(org) {
    const deportes = deportesDe(org);
    if (org.tipo === "comite") return { ...org, deportes, deporte: "\u2014" };
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
    const base = SEED_ORGANISMOS.map((o) => conDeportes(applyOverride(o, overrides)));
    const extra = nuevos.map(conDeportes);
    return [...base, ...extra];
  }
  function getOrganismo(id) {
    return allOrganismos().find((o) => o.id === id) || null;
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
  function getDeportista(id) {
    return allDeportistas().find((d) => d.id === id) || null;
  }
  function ancestorsOf(id) {
    const orgs = allOrganismos();
    const byId = {};
    orgs.forEach((o) => {
      byId[o.id] = o;
    });
    const chain = [];
    let cur = byId[id];
    const guard = /* @__PURE__ */ new Set();
    while (cur && cur.parentId != null && byId[cur.parentId] && !guard.has(cur.parentId)) {
      guard.add(cur.parentId);
      cur = byId[cur.parentId];
      chain.push({ ...cur });
    }
    return chain;
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
  function resolverAfiliacion(solicitudId, resultado, meta = {}) {
    const list = readStore("solicitudes", []) || [];
    const i = list.findIndex((s2) => s2.id === solicitudId);
    if (i < 0) return null;
    const s = list[i];
    const esRetiro = s.tipo === "retiro";
    const estadoSol = resultado === "aprobada" ? "Aprobada" : "Rechazada";
    list[i] = {
      ...s,
      estado: estadoSol,
      motivo: meta.motivo || "",
      responsable: meta.responsable || "",
      resueltaFecha: _todayISO(),
      ...s.documento ? { documento: { ...s.documento, estado: resultado === "aprobada" ? "Aprobado" : "Rechazado", revisadoPor: meta.responsable || "", rolRevisor: meta.rol || "CLUB", revisadoFecha: _todayISO(), revisadoAt: _nowISO() } } : {}
    };
    writeStore("solicitudes", list);
    const dep = getDeportista(s.deportistaId);
    if (esRetiro) {
      if (resultado === "aprobada") cambiarAfiliacion(s.deportistaId, s.clubId, "Terminada", { fin: "retiro" });
    } else {
      const yaVinculado = afiliacionesDe(s.deportistaId, { vigentes: true }).some((a) => a.organismoId === s.clubId && a.tipo === "deportista");
      if (!yaVinculado) cambiarAfiliacion(s.deportistaId, s.clubId, resultado === "aprobada" ? "Vinculada" : "Rechazada", { motivo: meta.motivo });
    }
    auditLog({
      orgId: s.clubId,
      deportistaId: s.deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: _todayISO(),
      responsable: meta.responsable || "",
      rol: meta.rol || "CLUB",
      accion: esRetiro ? resultado === "aprobada" ? "Baja confirmada" : "Baja rechazada" : s.documento ? resultado === "aprobada" ? "Documento de parentesco aprobado \xB7 menor afiliado" : "Documento de parentesco rechazado" : resultado === "aprobada" ? "Afiliaci\xF3n aprobada" : "Afiliaci\xF3n rechazada",
      de: esRetiro ? "Baja solicitada" : "Enviada",
      a: estadoSol,
      motivo: meta.motivo || "",
      notif: true
    });
    return { ...list[i] };
  }
  function seedMenoresDemo() {
    const list = readStore("solicitudes", []) || [];
    if (list.some((s) => s.demoMenor)) return;
    list.unshift({
      id: "AF-DM1",
      tipo: "afiliacion",
      deportistaId: "DEP-025",
      clubId: "CLU-001",
      estado: "Enviada",
      fecha: "2026-11-18",
      origen: "tutor",
      esMenor: true,
      tutorId: "DEP-022",
      documento: { nombre: "registro-civil-mateo.pdf", estado: "Pendiente", cargado: "2026-11-18" },
      demoMenor: true
    });
    list.unshift({
      id: "AF-DM2",
      tipo: "afiliacion",
      deportistaId: "DEP-024",
      clubId: "CLU-007",
      estado: "Rechazada",
      fecha: "2026-11-12",
      origen: "tutor",
      esMenor: true,
      tutorId: "DEP-022",
      motivo: "El documento est\xE1 borroso: no se alcanza a leer el nombre del padre o la madre. Carga una copia n\xEDtida del registro civil.",
      responsable: "Isabella Torres Pe\xF1a",
      resueltaFecha: "2026-11-14",
      documento: { nombre: "registro-civil-sara.jpg", estado: "Rechazado", cargado: "2026-11-12", revisadoPor: "Isabella Torres Pe\xF1a", rolRevisor: "CLUB", revisadoFecha: "2026-11-14" },
      demoMenor: true
    });
    list[1].documento.cargadoAt = "2026-11-18T09:12:00";
    list[1].tutorNombre = "Laura Marcela G\xF3mez Restrepo";
    list[0].documento.cargadoAt = "2026-11-12T10:40:00";
    list[0].documento.revision = { por: "Isabella Torres Pe\xF1a", rol: "CLUB", at: "2026-11-14T08:50:00" };
    list[0].documento.revisadoAt = "2026-11-14T09:05:00";
    list.unshift({
      id: "AF-DM3",
      tipo: "afiliacion",
      deportistaId: "DEP-018",
      clubId: "CLU-001",
      estado: "Enviada",
      fecha: "2026-11-19",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Andr\xE9s Quintero Mora",
      tutorDoc: "CC 79.456.210",
      documento: { nombre: "registro-civil-felipe.pdf", estado: "Pendiente", cargado: "2026-11-19", cargadoAt: "2026-11-19T16:40:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM4",
      tipo: "afiliacion",
      deportistaId: "DEP-023",
      clubId: "CLU-001",
      estado: "Aprobada",
      fecha: "2026-11-02",
      origen: "tutor",
      esMenor: true,
      tutorId: "DEP-022",
      tutorNombre: "Laura Marcela G\xF3mez Restrepo",
      responsable: "\xD3scar Cardona",
      resueltaFecha: "2026-11-03",
      documento: { nombre: "registro-civil-tomas.pdf", estado: "Aprobado", cargado: "2026-11-02", cargadoAt: "2026-11-02T11:05:00", revision: { por: "\xD3scar Cardona", rol: "CLUB", at: "2026-11-03T13:48:00" }, revisadoPor: "\xD3scar Cardona", rolRevisor: "CLUB", revisadoFecha: "2026-11-03", revisadoAt: "2026-11-03T14:10:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM5",
      tipo: "afiliacion",
      deportistaId: "DEP-021",
      clubId: "CLU-001",
      estado: "Rechazada",
      fecha: "2026-11-10",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Diana Hoyos Giraldo",
      tutorDoc: "CC 52.331.908",
      motivo: "La imagen no permite validar los datos: baja calidad y poca iluminaci\xF3n.",
      responsable: "\xD3scar Cardona",
      resueltaFecha: "2026-11-11",
      documento: { nombre: "registro-civil-luciana.pdf", estado: "Rechazado", cargado: "2026-11-10", cargadoAt: "2026-11-10T08:30:00", revision: { por: "\xD3scar Cardona", rol: "REVISOR", at: "2026-11-11T09:52:00" }, revisadoPor: "\xD3scar Cardona", rolRevisor: "REVISOR", revisadoFecha: "2026-11-11", revisadoAt: "2026-11-11T10:05:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM6",
      tipo: "afiliacion",
      deportistaId: "DEP-015",
      clubId: "CLU-001",
      estado: "Rechazada",
      fecha: "2026-11-05",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Jorge Ospina C\xE1rdenas",
      tutorDoc: "CC 16.789.455",
      motivo: "El documento est\xE1 cortado: no se alcanza a ver la fecha de nacimiento.",
      responsable: "Ana Luc\xEDa Mora",
      resueltaFecha: "2026-11-06",
      documento: { nombre: "registro-civil-manuela.jpg", estado: "Rechazado", cargado: "2026-11-05", cargadoAt: "2026-11-05T10:15:00", revision: { por: "Ana Luc\xEDa Mora", rol: "REVISOR", at: "2026-11-06T09:40:00" }, revisadoPor: "Ana Luc\xEDa Mora", rolRevisor: "REVISOR", revisadoFecha: "2026-11-06", revisadoAt: "2026-11-06T09:55:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM7",
      tipo: "afiliacion",
      deportistaId: "DEP-015",
      clubId: "CLU-001",
      estado: "Aprobada",
      fecha: "2026-11-08",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Jorge Ospina C\xE1rdenas",
      tutorDoc: "CC 16.789.455",
      responsable: "\xD3scar Cardona",
      resueltaFecha: "2026-11-09",
      documento: { nombre: "registro-civil-manuela.pdf", estado: "Aprobado", cargado: "2026-11-08", cargadoAt: "2026-11-08T14:20:00", corregido: true, revision: { por: "\xD3scar Cardona", rol: "CLUB", at: "2026-11-09T10:30:00" }, revisadoPor: "\xD3scar Cardona", rolRevisor: "CLUB", revisadoFecha: "2026-11-09", revisadoAt: "2026-11-09T10:41:00" },
      demoMenor: true
    });
    list.unshift({
      id: "AF-DM8",
      tipo: "afiliacion",
      deportistaId: "DEP-026",
      clubId: "CLU-001",
      estado: "Enviada",
      fecha: "2026-11-20",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Paola Mena Duque",
      tutorDoc: "CC 43.120.987",
      documento: { nombre: "registro-civil-isabella.pdf", estado: "Pendiente", cargado: "2026-11-20", cargadoAt: "2026-11-20T08:15:00" },
      demoMenor: true
    });
    list.unshift({
      id: "AF-DM9",
      tipo: "afiliacion",
      deportistaId: "DEP-027",
      clubId: "CLU-001",
      estado: "Enviada",
      fecha: "2026-11-19",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Mauricio Cruz P\xE9rez",
      tutorDoc: "CC 71.220.456",
      documento: { nombre: "sentencia-tutela-juan-esteban.pdf", estado: "Pendiente", cargado: "2026-11-19", cargadoAt: "2026-11-19T10:05:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM10",
      tipo: "afiliacion",
      deportistaId: "DEP-013",
      clubId: "CLU-001",
      estado: "Aprobada",
      fecha: "2026-10-28",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Gloria Cano Ruiz",
      tutorDoc: "CC 38.456.120",
      responsable: "\xD3scar Cardona",
      resueltaFecha: "2026-10-29",
      documento: { nombre: "registro-civil-sofia.pdf", estado: "Aprobado", cargado: "2026-10-28", cargadoAt: "2026-10-28T15:20:00", revision: { por: "\xD3scar Cardona", rol: "REVISOR", at: "2026-10-29T08:55:00" }, revisadoPor: "\xD3scar Cardona", rolRevisor: "REVISOR", revisadoFecha: "2026-10-29", revisadoAt: "2026-10-29T09:12:00" },
      demoMenor: true
    });
    list.push({
      id: "AF-DM11",
      tipo: "afiliacion",
      deportistaId: "DEP-028",
      clubId: "CLU-001",
      estado: "Rechazada",
      fecha: "2026-11-13",
      origen: "tutor",
      esMenor: true,
      tutorId: null,
      tutorNombre: "Camila R\xEDos Ospina",
      tutorDoc: "CC 1.144.201.330",
      motivo: "El documento no corresponde a la menor: el nombre no coincide con el de la tarjeta de identidad.",
      responsable: "\xD3scar Cardona",
      resueltaFecha: "2026-11-14",
      documento: { nombre: "registro-civil-salome.jpg", estado: "Rechazado", cargado: "2026-11-13", cargadoAt: "2026-11-13T17:45:00", revision: { por: "\xD3scar Cardona", rol: "CLUB", at: "2026-11-14T11:10:00" }, revisadoPor: "\xD3scar Cardona", rolRevisor: "CLUB", revisadoFecha: "2026-11-14", revisadoAt: "2026-11-14T11:24:00" },
      demoMenor: true
    });
    writeStore("solicitudes", list);
    solicitarAfiliacion({ sujetoId: "DEP-026", organismoId: "CLU-001", deporte: "Patinaje", origen: "tutor" });
    solicitarAfiliacion({ sujetoId: "DEP-027", organismoId: "CLU-001", deporte: "Patinaje", origen: "tutor" });
    solicitarAfiliacion({ sujetoId: "DEP-028", organismoId: "CLU-001", deporte: "Patinaje", origen: "tutor" });
    cambiarAfiliacion("DEP-028", "CLU-001", "Rechazada", { motivo: "El documento no corresponde a la menor: el nombre no coincide con el de la tarjeta de identidad." });
    solicitarAfiliacion({ sujetoId: "DEP-025", organismoId: "CLU-001", deporte: "Patinaje", origen: "tutor" });
    solicitarAfiliacion({ sujetoId: "DEP-024", organismoId: "CLU-007", deporte: "Nataci\xF3n", origen: "tutor" });
    cambiarAfiliacion("DEP-024", "CLU-007", "Rechazada", { motivo: list[0].motivo });
    auditLog({ orgId: "CLU-001", deportistaId: "DEP-025", deportistaNombre: "Mateo G\xF3mez", fecha: "2026-11-18", responsable: "Laura Marcela G\xF3mez Restrepo", rol: "Tutor", accion: "Documento de parentesco cargado por el tutor", de: "", a: "Enviada", motivo: "" });
    auditLog({ orgId: "CLU-007", deportistaId: "DEP-024", deportistaNombre: "Sara G\xF3mez", fecha: "2026-11-14", responsable: "Isabella Torres Pe\xF1a", rol: "CLUB", accion: "Documento de parentesco rechazado", de: "Enviada", a: "Rechazada", motivo: list[0].motivo });
  }
  function seedAfiliacionesDemo(mode) {
    if (mode !== "demo") return;
    seedMenoresDemo();
    const list = readStore("solicitudes", []) || [];
    if (list.some((s) => s.demoSeed)) return;
    const seeds = [
      { deportistaId: "DEP-010", clubId: "CLU-001", fecha: "2026-07-12" },
      // Juan D. Marín · Patinaje
      { deportistaId: "DEP-007", clubId: "CLU-001", fecha: "2026-07-13" },
      // Daniela Cárdenas · Patinaje
      { deportistaId: "DEP-022", clubId: "CLU-003", fecha: "2026-10-02" }
      // Laura · su segundo club
    ];
    seeds.forEach((s, idx) => {
      list.unshift({ id: "AF-D" + (idx + 1), tipo: "afiliacion", deportistaId: s.deportistaId, clubId: s.clubId, estado: "Enviada", fecha: s.fecha, origen: "solicitud", demoSeed: true });
      const dep = getDeportista(s.deportistaId);
      solicitarAfiliacion({ sujetoId: s.deportistaId, organismoId: s.clubId, deporte: dep ? dep.deporte : "" });
    });
    writeStore("solicitudes", list);
  }
  var COMITES, FEDERACIONES_COC, FEDERACIONES_FICTICIAS, LIGAS, CLUBES, DEPORTISTAS, SEED_ORGANISMOS, SEED_DEPORTISTAS, DEPORTES_SEED, DEPORTES_COMITE_EXTRA, _deportesComite, AF_DESDE, AFILIACIONES_EXTRA, STORE_PREFIX, SEED_FLAG, SEED_VERSION, _todayISO, _nowISO;
  var init_organismos_data = __esm({
    "shared/organismos-data.js"() {
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
        { id: "DEP-024", nombre: "Sara G\xF3mez", tipoDoc: "TI", numDoc: "1098765002", deporte: "Nataci\xF3n", modalidad: "Estilo libre", correo: "", fechaNac: "2017-06-21", sexo: "Mujer", tutorId: "DEP-022", parentesco: "Padre/Madre", clubId: null, estado: "autodeclarado" },
        /* v1.10.0 · Óscar Cardona como persona: administra el club y, con su segundo rol, revisa documentos. No es deportista. */
        { id: "DEP-029", nombre: "\xD3scar Cardona", tipoDoc: "CC", numDoc: "94321678", deporte: "Patinaje", modalidad: "", correo: "admin@clubpatincali.demo.co", fechaNac: "1985-04-12", sexo: "Hombre", esDeportista: false, usuarioInterno: true, rolInterno: "Revisor de documentos", clubId: null, estado: "autodeclarado" },
        /* v1.10.0 · usuarios internos invitados por el club como revisores de documentos (su perfil trae solo los datos del formulario). */
        { id: "DEP-030", nombre: "Ana Luc\xEDa Mora", tipoDoc: "CC", numDoc: "52118790", deporte: "Patinaje", modalidad: "", correo: "ana.mora@clubpatincali.demo.co", fechaNac: "1990-08-21", sexo: "Mujer", esDeportista: false, usuarioInterno: true, rolInterno: "Revisor de documentos", clubId: null, estado: "autodeclarado" },
        { id: "DEP-031", nombre: "Juli\xE1n P\xE9rez Mora", tipoDoc: "CC", numDoc: "1144220118", deporte: "Patinaje", modalidad: "", correo: "julian.perez@clubpatincali.demo.co", fechaNac: "1998-02-14", sexo: "Hombre", esDeportista: false, usuarioInterno: true, rolInterno: "Revisor de documentos", clubId: null, estado: "autodeclarado" },
        /* v1.10.0 · más menores de ejemplo para «Revisión documental» (autodeclarados, sin club; los tutores son ficticios). */
        { id: "DEP-026", nombre: "Isabella Rojas Mena", tipoDoc: "TI", numDoc: "1103456789", deporte: "Patinaje", modalidad: "Art\xEDstico", correo: "", fechaNac: "2012-03-08", sexo: "Mujer", parentesco: "Padre/Madre", clubId: null, estado: "autodeclarado" },
        { id: "DEP-027", nombre: "Juan Esteban Cruz", tipoDoc: "TI", numDoc: "1104567890", deporte: "Patinaje", modalidad: "Carreras", correo: "", fechaNac: "2010-11-22", sexo: "Hombre", parentesco: "Tutor legal", clubId: null, estado: "autodeclarado" },
        { id: "DEP-028", nombre: "Salom\xE9 Vargas R\xEDos", tipoDoc: "TI", numDoc: "1105678901", deporte: "Patinaje", modalidad: "Hockey en l\xEDnea", correo: "", fechaNac: "2013-06-17", sexo: "Mujer", parentesco: "Padre/Madre", clubId: null, estado: "autodeclarado" },
        /* v1.10.0 · menor cuyo documento de parentesco espera al club (lo siembra seedAfiliacionesDemo). */
        { id: "DEP-025", nombre: "Mateo G\xF3mez", tipoDoc: "TI", numDoc: "1098765003", deporte: "Patinaje", modalidad: "Carreras", correo: "", fechaNac: "2015-09-04", sexo: "Hombre", tutorId: "DEP-022", parentesco: "Padre/Madre", clubId: null, estado: "autodeclarado" }
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
      DEPORTES_COMITE_EXTRA = {
        COC: ["Breaking", "Flag Football", "P\xE1del", "Skateboarding"],
        CPC: ["Para Powerlifting", "Para B\xE1dminton", "Para Tenis de Mesa"],
        FSC: ["Nataci\xF3n de Sordos"]
      };
      _deportesComite = {};
      AF_DESDE = "2026-03-25";
      AFILIACIONES_EXTRA = [
        /* Multi-afiliación de deportes distintos: Mateo patina en Cali y nada en Aguas del Valle. */
        { id: "AF-S900", tipo: "deportista", sujetoId: "DEP-002", organismoId: "CLU-007", deporte: "Nataci\xF3n", estado: "Vinculada", desde: "2026-05-04", origen: "solicitud" },
        /* Laura: pidió un segundo club y trabaja como entrenadora (personal deportivo → cualquier organismo, P-05). */
        { id: "AF-S901", tipo: "deportista", sujetoId: "DEP-022", organismoId: "CLU-003", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-02", origen: "solicitud" },
        { id: "AF-P001", tipo: "personal", sujetoId: "DEP-022", organismoId: "LIG-001", deporte: "Patinaje", estado: "Vinculada", desde: "2024-01-20", origen: "solicitud", rol: "Docente/Entrenador" },
        { id: "AF-P002", tipo: "personal", sujetoId: "DEP-022", organismoId: "CLU-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-09-29", origen: "solicitud", rol: "Docente/Entrenador" },
        { id: "AF-P003", tipo: "personal", sujetoId: "DEP-029", organismoId: "CLU-001", deporte: "Patinaje", estado: "Vinculada", desde: "2026-10-01", origen: "solicitud", rol: "Revisor de documentos" },
        /* Un club ya activo en Antioquia pide entrar también a la liga del Valle (P-20): la liga solo aprueba el vínculo. */
        { id: "AF-C900", tipo: "club", sujetoId: "CLU-004", organismoId: "LIG-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-06", origen: "solicitud" }
      ];
      STORE_PREFIX = "naowee-organismos-";
      SEED_FLAG = STORE_PREFIX + "demo-seeded";
      SEED_VERSION = "0.6.4";
      _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      _nowISO = () => (/* @__PURE__ */ new Date()).toISOString();
    }
  });

  // shared/permissions.js
  function can(role3, accion, recurso) {
    const fila = PERMS[recurso];
    if (!fila) return false;
    const concedidas = fila[role3] || "";
    return concedidas.includes(accion);
  }
  function contextoDe(role3) {
    if (!TIPO_DE_ROL[role3]) return null;
    const valido = (id) => {
      const o = id && getOrganismo(id);
      return o && o.tipo === TIPO_DE_ROL[role3] ? id : null;
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
    for (const id of ["CLU-001", "CLU-002", "CLU-003", "CLU-004", "CLU-005", "CLU-006", "CLU-007", "CLU-008", "CLU-009", "CLU-010", "CLU-011", "CLU-012"]) {
      const o = getOrganismo(id);
      if (o && o.ubicacion && o.ubicacion.ciudad === ciudad) return o;
    }
    return null;
  }
  var ACCIONES, RECURSOS, PERMS, SCOPE, TIPO_DE_ROL, CTX_KEY, TER_DEFAULT;
  var init_permissions = __esm({
    "shared/permissions.js"() {
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
          TERRITORIAL: "R",
          MINISTRO: "R"
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
          TERRITORIAL: "R",
          MINISTRO: "R"
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
          TERRITORIAL: "R",
          MINISTRO: "R"
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
          TERRITORIAL: "R",
          MINISTRO: "R"
        },
        deportistas: {
          MINDEPORTE: "R",
          COMITE: "CR",
          FEDERACION: "CR",
          LIGA: "CR",
          // C = registrar (uno a uno o carga masiva) con club propuesto que el club confirma (P-07 respondida 2026-10-09: todos los organismos)
          CLUB: "CRX",
          // sus afiliados · X = desvincular (ORG-10, ver nota)
          DEPORTISTA: "RU",
          // el propio (nunca documento / fecha nac.)
          TERRITORIAL: "CR",
          // registra uno a uno con club propuesto (P-12); sin carga masiva; no aprueba
          MINISTRO: "R"
        },
        /* NOTA sobre deportistas[CLUB] = 'X' (desvincular):
           DECISIÓN DE PRODUCTO de Doug (2026-09-10) que responde la pregunta de
           Nicolás Mosquera en la mesa del 2026-09-08. VA MÁS ALLÁ del handoff §11.2
           y de la matriz oficial de negocio, que NO tienen columna de
           desvinculación — cerrada el 2026-10-13 (P-04/P-10): sin apelación, aviso al deportista y a la liga.
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
          TERRITORIAL: "",
          MINISTRO: "R"
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
          // cargue de ORGANISMOS: el club no tiene nivel abajo. Su carga masiva de deportistas va por deportistas[CLUB] 'C' («Deportistas» › Cargue masivo)
          DEPORTISTA: "",
          TERRITORIAL: "",
          MINISTRO: "R"
        },
        auditoria: {
          MINDEPORTE: "R",
          COMITE: "R",
          FEDERACION: "R",
          LIGA: "R",
          CLUB: "R",
          DEPORTISTA: "R",
          TERRITORIAL: "R",
          MINISTRO: "R"
        }
      };
      SCOPE = {
        MINDEPORTE: null,
        COMITE: "COC",
        FEDERACION: "FED-040",
        LIGA: "LIG-001",
        CLUB: "CLU-001",
        REVISOR_DOC: "CLU-001",
        // v1.10.0: mismo club que el administrador
        DEPORTISTA: "DEP-001"
      };
      TIPO_DE_ROL = { COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club" };
      CTX_KEY = "naowee-organismos-ctx-";
      TER_DEFAULT = { depto: "Valle del Cauca" };
    }
  });

  // shared/sidebar.js
  function getIcon(name) {
    return ICONS[name] || "";
  }
  function nivelesForRole(code) {
    const nivel = code === "TERRITORIAL" && (territorioDe(code) || {}).municipio ? "liga" : NIVEL_PROPIO[code];
    const propio = NIVEL_JERARQUIA_IDX(nivel);
    return NIVELES_JERARQUIA.slice(propio + 1).map(([n, label]) => ({ id: n, label }));
  }
  function personaDe(roleCode3) {
    let id = null;
    try {
      id = new URLSearchParams(window.location.search).get("como");
      if (id && (PERSONAS[id] || id === "org")) sessionStorage.setItem(PERSONA_KEY, id);
      else id = sessionStorage.getItem(PERSONA_KEY);
    } catch (_) {
    }
    if (id === "org") return null;
    if (!PERSONAS[id]) id = PERSONA_POR_ROL[roleCode3] || null;
    const p = PERSONAS[id];
    return p && p.contextos.some((c) => c.role === roleCode3) ? { id, ...p } : null;
  }
  function getRoleFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("role");
    return ROLES[code] ? code : "MINDEPORTE";
  }
  function organismoNoActivo(code) {
    if (!ROLES_ORGANISMO.includes(code)) return null;
    const o = getOrganismo(scopeFor(code));
    return o && o.estado !== "Activo" ? o : null;
  }
  function getMenuForRole(code) {
    if (organismoNoActivo(code)) return MENU_NO_ACTIVO;
    if (code === "TERRITORIAL") return [{ section: null, items: jerarquiaItems(code) }, ...MENU_BY_ROLE.TERRITORIAL.slice(1)];
    return MENU_BY_ROLE[code] || MENU_BY_ROLE.MINDEPORTE;
  }
  function homeForRole(code) {
    if (organismoNoActivo(code)) return "organismo-detalle.html";
    if (code === "CLUB") return "bandeja.html";
    if (code === "REVISOR_DOC") return "documentos.html";
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
    if (item.id === "documentos" && roleCode3 === "CLUB") {
      const n = solicitudesDeClub(scopeFor(roleCode3)).filter((x) => x.esMenor && x.estado === "Enviada").length;
      item = { ...item, badge: n || "" };
    }
    return `
    <${tag} class="nav-row ${item.child ? "nav-row--child" : ""} ${isActive ? "active" : ""}" data-id="${item.id}"${hrefAttr}>
      ${isActive && !item.child ? '<span class="active-bar" aria-hidden="true"></span>' : ""}
      <span class="icon">${getIcon(item.icon)}</span>
      <span class="lbl">${item.label}</span>
      ${item.badge ? `<span class="nav-badge${item.id === "documentos" ? " nav-badge--count" : ""}">${item.badge}</span>` : ""}
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
    let toast2 = document.getElementById("evToast");
    if (!toast2) {
      toast2 = document.createElement("div");
      toast2.id = "evToast";
      toast2.setAttribute("role", "status");
      document.body.appendChild(toast2);
    }
    toast2.textContent = `${label}: pantalla disponible en una pr\xF3xima fase de la demo.`;
    toast2.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast2.classList.remove("is-visible"), 2600);
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
    ${rolDemoHtml(role3.code)}
    ${notifHtml(role3.code)}
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
    bindRolDemo(headerEl);
    bindNotif(headerEl, role3.code);
    mountContexto(role3);
  }
  function inicialesOrg(nombre) {
    const w = String(nombre).split(/\s+/).filter((x) => x && !NO_INICIAL.has(x.toLowerCase()));
    const ini = w.length === 1 ? w[0].slice(0, 2) : w.slice(0, 2).map((x) => x[0]).join("");
    return (ini || String(nombre).slice(0, 2)).toUpperCase();
  }
  function pendientesDe(orgId) {
    const o = getOrganismo(orgId);
    if (!o) return { n: 0, txt: "" };
    if (o.tipo === "club") {
      const n2 = solicitudesDeClub(orgId).filter((x) => x.estado === "Enviada").length;
      return { n: n2, txt: n2 ? `${n2} ${n2 === 1 ? "solicitud" : "solicitudes"} por confirmar` : "" };
    }
    const hijo = { comite: ["federaci\xF3n", "federaciones"], federacion: ["liga", "ligas"], liga: ["club", "clubes"] }[o.tipo];
    const n = allOrganismos().filter((x) => x.parentId === orgId && x.estado === "En revisi\xF3n").length;
    return { n, txt: n && hijo ? `${n} ${n === 1 ? hijo[0] : hijo[1]} por revisar` : "" };
  }
  function orgIco(o, size) {
    const c = COLOR_TIPO[o.tipo] || "#d74009";
    return `<span class="ctx-ico" aria-hidden="true" style="--tipo-color:${c};width:${size}px;height:${size}px">${inicialesOrg(o.nombre)}</span>`;
  }
  function hrefRol(code, pagina) {
    const comunes = code === "CLUB" ? ["documentos.html", "deportistas.html", "bandeja.html"] : ["documentos.html"];
    return `${comunes.includes(pagina) ? pagina : homeForRole(code)}?role=${code}`;
  }
  function rolDemoHtml(code) {
    if (!esRolDelClub(code)) return "";
    const pagina = location.pathname.split("/").pop() || "index.html";
    const actual = ROLES_DEL_CLUB.find((x) => x.code === code);
    const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
    return `<div class="mp-hdr-tools" id="roleDemoHdr"><div class="mp-demo"><span class="naowee-badge">Solo demo</span>
    <div class="naowee-dropdown mp-demo__dd" id="roleDemoDd">
      <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Cambiar de rol">
        <span class="naowee-dropdown__value">${actual.nombre}</span><span class="naowee-dropdown__chevron">${getIcon("chevron")}</span>
      </button>
      <div class="naowee-dropdown__menu" role="listbox" aria-label="Tus roles en este club">
        ${ROLES_DEL_CLUB.map((x) => `<a class="naowee-dropdown__opt${x.code === code ? " is-selected" : ""}" role="option" aria-selected="${x.code === code}" href="${hrefRol(x.code, pagina)}">${x.nombre}${x.code === code ? `<span class="naowee-dropdown__opt-check" aria-hidden="true">${CHECK}</span>` : ""}</a>`).join("")}
      </div>
    </div></div></div>`;
  }
  function notificaciones(code) {
    const club = scopeFor(code);
    return solicitudesDeClub(club).filter((x) => x.esMenor && x.estado === "Enviada" && x.documento).map((x) => {
      const dep = getDeportista(x.deportistaId) || {};
      const tutor = x.tutorId ? getDeportista(x.tutorId) : null;
      const at = new Date(x.documento.cargadoAt || x.documento.cargado + "T12:00:00");
      return { id: x.id, at, tutor: (tutor ? tutor.nombre : x.tutorNombre) || "El tutor", menor: dep.nombre || "un menor", corregido: !!x.documento.corregido };
    }).sort((a, b) => b.at - a.at);
  }
  function notifHtml(code) {
    if (!esRolDelClub(code)) return "";
    const list = notificaciones(code);
    const leidas = leidasNotif();
    const n = list.filter((x) => !leidas.includes(x.id)).length;
    const fmt = (d) => `${d.getDate()} ${MES_N[d.getMonth()]} ${d.getFullYear()} \xB7 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return `<div class="hdr-bell" id="hdrBell">
    <button type="button" class="hdr-bell__btn" id="hdrBellBtn" aria-haspopup="true" aria-expanded="false" aria-label="Notificaciones${n ? `, ${n} sin leer` : ""}">${getIcon("bell")}${n ? `<span class="hdr-bell__n">${n}</span>` : ""}</button>
    <div class="hdr-bell__panel" id="hdrBellPanel" role="dialog" aria-label="Notificaciones">
      <div class="hdr-bell__h"><strong>Notificaciones</strong><button type="button" class="hdr-bell__all" id="hdrBellAll"${n ? "" : " disabled"}>Marcar como le\xEDdas</button></div>
      ${list.length ? `<ul class="hdr-bell__l">${list.map((x) => `<li><a class="hdr-bell__i${leidas.includes(x.id) ? " is-read" : ""}" href="documentos.html?role=${code}&sol=${x.id}"><span class="hdr-bell__dot" aria-hidden="true"></span>
        <span class="hdr-bell__t"><strong>Hay documentos pendientes de revisi\xF3n</strong>
        <span>${x.tutor} ${x.corregido ? "corrigi\xF3" : "carg\xF3"} el documento de parentesco de ${x.menor}.</span><small>${fmt(x.at)}</small></span></a></li>`).join("")}</ul>` : '<p class="hdr-bell__empty">No hay documentos pendientes de revisi\xF3n.</p>'}
    </div></div>`;
  }
  function bindNotif(headerEl, code) {
    const box = headerEl.querySelector("#hdrBell");
    if (!box) return;
    const btn = box.querySelector("#hdrBellBtn");
    const set = (open) => {
      box.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      set(!box.classList.contains("open"));
    });
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) set(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && box.classList.contains("open")) {
        set(false);
        btn.focus();
      }
    });
    const all = box.querySelector("#hdrBellAll");
    all.addEventListener("click", () => {
      try {
        sessionStorage.setItem(NOTIF_KEY, JSON.stringify(notificaciones(code).map((x) => x.id)));
      } catch (_) {
      }
      box.querySelectorAll(".hdr-bell__i").forEach((a) => a.classList.add("is-read"));
      const n = box.querySelector(".hdr-bell__n");
      if (n) n.remove();
      all.disabled = true;
      btn.setAttribute("aria-label", "Notificaciones");
    });
  }
  function bindRolDemo(headerEl) {
    const dd = headerEl.querySelector("#roleDemoDd");
    if (!dd) return;
    const trg = dd.querySelector(".naowee-dropdown__trigger");
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
  function mountContexto(role3) {
    const lista = (role3.contextos || []).map((c) => ({ ...c, o: getOrganismo(c.org) })).filter((c) => c.o);
    const head = document.querySelector(".page-inner > .page-head, .page-inner .page-head");
    if (lista.length < 2 || !head || document.getElementById("ctxBar")) return;
    const actual = getOrganismo(scopeFor(role3.code)) || lista[0].o;
    const pagina = location.pathname.split("/").pop() || "index.html";
    const COMUNES = ["jerarquia.html", "bandeja.html", "cargue.html", "deportistas.html"];
    const destino = (rol) => COMUNES.includes(pagina) ? pagina : homeForRole(rol);
    const href = (c) => `${destino(c.role)}?role=${c.role}&org=${c.org}${role3.persona ? `&como=${role3.persona}` : ""}`;
    const deportesTxt = (o) => o.deportes.length > 2 ? `${o.deportes[0]} y ${o.deportes.length - 1} deportes m\xE1s` : o.deporte;
    const meta = (o) => `${TIPO_TXT[o.tipo]} \xB7 ${deportesTxt(o)} \xB7 ${o.tipo === "federacion" ? "Nacional" : o.ubicacion ? o.ubicacion.depto : ""}`;
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
      const o = c.o;
      const p = pendientesDe(o.id);
      const sel2 = o.id === actual.id;
      return `<a class="naowee-dropdown__opt ctx-opt${sel2 ? " is-selected" : ""}" role="option" aria-selected="${sel2}" href="${href(c)}">
            ${orgIco(o, 34)}
            <span class="ctx-opt__txt">
              <span class="ctx-opt__name">${o.nombre}</span>
              <span class="ctx-opt__meta">${meta(o)}</span>
              <span class="ctx-opt__pend${p.n ? "" : " is-clear"}">${p.n ? p.txt : "Sin pendientes"}</span>
            </span>
            ${sel2 ? `<span class="naowee-dropdown__opt-check" aria-hidden="true">${getIcon("check")}</span>` : ""}
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
    const codes = ["MINDEPORTE", "MINISTRO", "TERRITORIAL", "COMITE", "FEDERACION", "LIGA", "CLUB", "DEPORTISTA", ...esLocal() ? ["PERSONA"] : []];
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
  function demoToast(msg) {
    let toast2 = document.getElementById("evToast");
    if (!toast2) {
      toast2 = document.createElement("div");
      toast2.id = "evToast";
      toast2.setAttribute("role", "status");
      document.body.appendChild(toast2);
    }
    toast2.textContent = msg;
    toast2.classList.add("is-visible");
    clearTimeout(_toastTimer);
    _toastTimer = setTimeout(() => toast2.classList.remove("is-visible"), 2600);
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
        const params = new URLSearchParams(window.location.search);
        if (params.get("role") === next && !params.get("como")) {
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
  var COLLAPSED_KEY, ICONS, ROLES, NIVELES_JERARQUIA, NIVEL_JERARQUIA_IDX, NIVEL_PROPIO, jerarquiaItems, MENU_BY_ROLE, PERSONAS, PERSONA_KEY, PERSONA_POR_ROL, ROLE_DEFAULT, ROLES_ORGANISMO, MENU_NO_ACTIVO, _toastTimer, _tooltipEl, TIPO_TXT, COLOR_TIPO, NO_INICIAL, ROLES_DEL_CLUB, esRolDelClub, NOTIF_KEY, MES_N, leidasNotif, HOME_DEMO, MODE_KEY, TOUR_KEY, esLocal, ROLE_GROUPS;
  var init_sidebar = __esm({
    "shared/sidebar.js"() {
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
        bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
        checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.4 2.4 4.6-5"/></svg>',
        doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
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
        /* v1.10.0 · la misma persona (Óscar) con un segundo rol dentro del mismo club: solo revisa documentos y ve su perfil. */
        REVISOR_DOC: {
          code: "REVISOR_DOC",
          label: "Revisor de documentos",
          userName: "\xD3scar Cardona",
          userEmail: "admin@clubpatincali.demo.co",
          userDoc: "CC 94.321.678",
          org: "Club Pat\xEDn Cali",
          avatar: "OC",
          color: "#1f8923",
          short: "Revisa los documentos de parentesco de los menores",
          group: "Organismos",
          personaId: "DEP-029"
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
        /* Ministro (P-01, propuesta): visualizador anclado a la raíz. Consulta todo el SND —jerarquía,
           deportistas, eventos y fichas— sin aprobar, sancionar ni crear nada. Lo crea Naowee. */
        MINISTRO: {
          code: "MINISTRO",
          label: "Ministro (consulta)",
          userName: "Despacho del Ministro",
          userEmail: "despacho@mindeporte.demo.co",
          userDoc: "Cuenta institucional",
          org: "Ministerio del Deporte",
          avatar: "DM",
          color: "#334155",
          short: "Consulta todo el SND sin aprobar, sancionar ni crear",
          group: "Rector\xEDa"
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
      NIVEL_PROPIO = { MINDEPORTE: null, MINISTRO: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista", TERRITORIAL: "federacion" };
      jerarquiaItems = (code) => {
        const hijos = nivelesForRole(code);
        if (hijos.length === 1) return [];
        return [
          { id: "jerarquia", label: "Jerarqu\xEDa SND", icon: "sitemap", route: "jerarquia.html" },
          ...hijos.map(({ id, label }) => ({ id: `jerarquia-${id}`, label, icon: "level", route: `jerarquia.html?nivel=${id}`, child: true }))
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
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "eventos", label: "Eventos", icon: "cal", route: "organismo-detalle.html?tab=eventos" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
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
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "eventos", label: "Eventos", icon: "cal", route: "organismo-detalle.html?tab=eventos" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
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
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "eventos", label: "Eventos", icon: "cal", route: "organismo-detalle.html?tab=eventos" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        CLUB: [
          { section: null, items: jerarquiaItems("CLUB") },
          /* «Mis deportistas» (ORG-09) primero: es el plantel ya afiliado — el
             estado permanente del club. La bandeja es el trabajo pendiente. */
          { section: "DEPORTISTAS", items: [
            { id: "deportistas", label: "Mis deportistas", icon: "users", route: "deportistas.html" },
            { id: "bandeja", label: "Solicitudes de deportistas", icon: "inbox", route: "bandeja.html" },
            { id: "documentos", label: "Revisi\xF3n documental", icon: "checkCircle", route: "documentos.html" }
          ] },
          { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "eventos", label: "Eventos", icon: "cal", route: "organismo-detalle.html?tab=eventos" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
        ],
        /* Fase 2: el perfil multi-rol es la ficha única de la persona; el carné sigue en afiliacion.html. */
        REVISOR_DOC: [
          { section: null, items: [
            { id: "documentos", label: "Revisi\xF3n documental", icon: "checkCircle", route: "documentos.html" },
            { id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html?persona=DEP-029" }
          ] }
        ],
        DEPORTISTA: [
          { section: null, items: [
            { id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html" },
            { id: "carne", label: "Carn\xE9 digital", icon: "id", route: "afiliacion.html?sec=carne" }
          ] }
        ],
        PERSONA: [
          { section: null, items: [{ id: "perfil", label: "Mi perfil", icon: "user", route: "perfil.html" }] }
        ],
        MINISTRO: [
          { section: null, items: jerarquiaItems("MINISTRO") },
          { section: "CONSULTA", items: [
            { id: "deportistas", label: "Deportistas", icon: "users", route: "deportistas.html" }
          ] }
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
      ROLES_DEL_CLUB = [
        { code: "CLUB", nombre: "Administrador del club", desc: "Confirma afiliaciones, gestiona deportistas y usuarios, y revisa documentos." },
        { code: "REVISOR_DOC", nombre: "Revisor de documentos", desc: "Revisa los documentos de parentesco de los menores y ve su perfil." }
      ];
      esRolDelClub = (code) => ROLES_DEL_CLUB.some((x) => x.code === code);
      NOTIF_KEY = "naowee-organismos-notif-leidas";
      MES_N = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      leidasNotif = () => {
        try {
          return JSON.parse(sessionStorage.getItem(NOTIF_KEY) || "[]");
        } catch (_) {
          return [];
        }
      };
      HOME_DEMO = { CLUB: "bandeja.html", DEPORTISTA: "perfil.html", PERSONA: "perfil.html" };
      MODE_KEY = "naowee-organismos-demo-mode";
      TOUR_KEY = "naowee-organismos-tour-seen";
      esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
      ROLE_GROUPS = [
        { label: "Rector\xEDa", codes: ["MINDEPORTE", "MINISTRO"] },
        { label: "Territorio", codes: ["TERRITORIAL"] },
        { label: "Cabezas de sector", codes: ["COMITE"] },
        { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
        { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
      ];
    }
  });

  // shared/deportista-detalle.js
  function seedFromDoc(numDoc) {
    let h = 2166136261 >>> 0;
    const s = String(numDoc || "");
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function fmtFecha(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? `${m[3]} ${MESES[+m[2] - 1]} ${m[1]}` : iso || "";
  }
  function anio(iso) {
    const m = /(\d{4})/.exec(iso || "");
    return m ? m[1] : iso || "";
  }
  function slugCorreo(n, a) {
    return `${n}.${a}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z.]/g, "");
  }
  function buildDeportistaDetalle(dep) {
    if (!dep) return null;
    const w = dep.nombre.trim().split(/\s+/);
    let nombre = w[0] || "", segundoNombre = "", apellido = "", segundoApellido = "";
    if (w.length >= 4) {
      segundoNombre = w[1];
      apellido = w[2];
      segundoApellido = w.slice(3).join(" ");
    } else if (w.length === 3) {
      segundoNombre = w[1];
      apellido = w[2];
    } else {
      apellido = w.slice(1).join(" ");
    }
    const x = PERFIL_EXTRA[dep.id] || {};
    const seed = seedFromDoc(dep.numDoc);
    const sexo = x.sexo || (seed % 2 === 0 ? "F" : "M");
    const tier = x.tier || "amateur";
    const alt = x.alt || 158 + seed % 32;
    const peso = x.peso || 52 + (seed >> 3) % 38;
    const sangre = x.sangre || SANGRES[seed % SANGRES.length];
    const edad = x.edad || 16 + (seed >> 5) % 22;
    const imc = alt && peso ? (peso / Math.pow(alt / 100, 2)).toFixed(1) : "\u2014";
    const inscripciones = x.inscripciones || [];
    const resultados = x.resultados || [];
    const medalleria = x.medalleria || [];
    const club = dep.clubId ? getOrganismo(dep.clubId) : null;
    const chain = dep.clubId ? ancestorsOf(dep.clubId) : [];
    const liga = chain.find((o) => o.tipo === "liga") || null;
    const federacion = chain.find((o) => o.tipo === "federacion") || null;
    const comite = chain.find((o) => o.tipo === "comite") || null;
    const emoji = DEPORTE_EMOJI[dep.deporte] || "\u{1F3C5}";
    const slug = slugCorreo(nombre, apellido);
    const compl = Math.min(96, 60 + medalleria.length * 8 + inscripciones.length * 4 + (dep.clubId ? 10 : 0));
    return {
      id: dep.id,
      estado: dep.estado,
      clubId: dep.clubId,
      nombre,
      segundoNombre,
      apellido,
      segundoApellido,
      nombreCompleto: dep.nombre,
      avatar: (nombre[0] || "") + (apellido[0] || ""),
      tier,
      tierLabel: TIER_LABEL[tier],
      deporte: dep.deporte,
      deporteEmoji: emoji,
      modalidad: dep.modalidad,
      doc: { tipo: DOC_LABEL[dep.tipoDoc] || dep.tipoDoc, tipoCorto: dep.tipoDoc, numero: dep.numDoc },
      nacimiento: x.nac || "\u2014",
      edad,
      sexo: sexo === "F" ? "Femenino" : "Masculino",
      genero: sexo === "F" ? "Femenino" : "Masculino",
      sangre,
      nacionalidad: { pais: "Colombia", iso: "co" },
      /* Cadena real (objetos organismo) + nombres para pintar. */
      club,
      liga,
      federacion,
      comite,
      clubNombre: club ? club.nombre : null,
      ligaNombre: liga ? liga.nombre : null,
      federacionNombre: federacion ? federacion.nombre : null,
      comiteNombre: comite ? comite.nombre : null,
      manoHabil: seed % 5 === 0 ? "Izquierda" : "Derecha",
      aniosPractica: Math.max(2, edad - 12),
      ubicacion: { depto: x.depto || "Valle del Cauca", municipio: x.ciudad || "Cali", zona: "Urbana", barrio: "Centro", direccion: "Por definir" },
      contacto: {
        correo: dep.correo || `${slug}@correo.demo.co`,
        telefono: `+57 31${seed % 9} 555 0${(100 + seed % 800).toString().slice(-3)}`,
        emergenciaNombre: "Contacto familiar",
        emergenciaTel: "+57 320 555 0142"
      },
      biometria: { altura: alt + " cm", peso: peso + " kg", sangre, imc },
      completitud: compl,
      documentos: [
        { nombre: "Documento de identidad", sub: "Verificado", estado: "verificado", subido: true },
        { nombre: "Certificado m\xE9dico deportivo", sub: "Vigente", estado: "vigente", subido: true },
        { nombre: "Afiliaci\xF3n EPS", sub: "Documento requerido \u2014 a\xFAn no lo has subido", estado: "requerido", subido: false },
        { nombre: "Consentimiento de tratamiento de datos", sub: "Falta firmar", estado: "pendiente", subido: true }
      ],
      inscripciones: inscripciones.map((e) => ({ evento: e.evento, prueba: e.prueba, fecha: fmtFecha(e.fecha), estado: e.estado })),
      resultados: resultados.map((r) => ({ evento: r.evento, prueba: r.prueba, ranking: r.ranking, fecha: anio(r.fecha) })),
      medalleria: medalleria.map((m) => ({ evento: m.evento, prueba: m.prueba, medalla: m.medalla, fecha: anio(m.fecha), deporte: m.deporte || dep.deporte }))
    };
  }
  var MESES, TIER_LABEL, DOC_LABEL, DEPORTE_EMOJI, SANGRES, PERFIL_EXTRA;
  var init_deportista_detalle = __esm({
    "shared/deportista-detalle.js"() {
      init_organismos_data();
      MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
      TIER_LABEL = { olimpico: "Ol\xEDmpico", profesional: "Profesional", juvenil: "Juvenil", amateur: "Amateur" };
      DOC_LABEL = { CC: "C\xE9dula de ciudadan\xEDa", TI: "Tarjeta de identidad", CE: "C\xE9dula de extranjer\xEDa", PA: "Pasaporte" };
      DEPORTE_EMOJI = { Patinaje: "\u{1F6FC}", Nataci\u00F3n: "\u{1F3CA}", F\u00FAtbol: "\u26BD", Ciclismo: "\u{1F6B4}", Atletismo: "\u{1F3C3}", Baloncesto: "\u{1F3C0}" };
      SANGRES = ["O+", "A+", "B+", "O-", "A-", "AB+"];
      PERFIL_EXTRA = {
        "DEP-001": {
          // Valentina Ortiz — hilo conductor, Club Patín Cali
          sexo: "F",
          tier: "olimpico",
          nac: "14 mar 1998",
          edad: 28,
          sangre: "O+",
          alt: 168,
          peso: 61,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [
            { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", fecha: "2025-04-18", estado: "finalizado" },
            { evento: "Juegos Regionales Valle 2025", prueba: "1000m", fecha: "2025-07-10", estado: "finalizado" },
            { evento: "Copa Panamericana de Patinaje 2026", prueba: "500m sprint", fecha: "2026-03-22", estado: "activo" }
          ],
          resultados: [
            { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", ranking: 1, fecha: "2025-04-18" },
            { evento: "Juegos Regionales Valle 2025", prueba: "1000m", ranking: 2, fecha: "2025-07-10" }
          ],
          medalleria: [
            { evento: "Campeonato Nacional de Patinaje 2025", prueba: "500m sprint", medalla: "Oro", fecha: "2025-04-18" },
            { evento: "Juegos Regionales Valle 2025", prueba: "1000m", medalla: "Plata", fecha: "2025-07-10" }
          ]
        },
        "DEP-002": {
          // Mateo Restrepo — Club Patín Cali
          sexo: "M",
          tier: "profesional",
          nac: "02 sep 1999",
          edad: 26,
          sangre: "A+",
          alt: 176,
          peso: 72,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", fecha: "2025-04-18", estado: "finalizado" }],
          resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", ranking: 3, fecha: "2025-04-18" }],
          medalleria: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "1000m", medalla: "Bronce", fecha: "2025-04-18" }]
        },
        "DEP-003": { sexo: "F", tier: "juvenil", nac: "11 jun 2005", edad: 20, sangre: "B+", alt: 162, peso: 55, ciudad: "Pereira", depto: "Risaralda" },
        "DEP-004": { sexo: "M", tier: "juvenil", nac: "30 ene 2008", edad: 17, sangre: "O+", alt: 170, peso: 60, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-005": {
          sexo: "F",
          tier: "profesional",
          nac: "19 abr 1997",
          edad: 28,
          sangre: "A-",
          alt: 171,
          peso: 63,
          ciudad: "Medell\xEDn",
          depto: "Antioquia",
          inscripciones: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", fecha: "2025-05-12", estado: "finalizado" }],
          resultados: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", ranking: 2, fecha: "2025-05-12" }],
          medalleria: [{ evento: "Copa Nacional de Nataci\xF3n 2025", prueba: "100m libre", medalla: "Plata", fecha: "2025-05-12" }]
        },
        "DEP-006": { sexo: "M", tier: "amateur", nac: "05 dic 1996", edad: 29, sangre: "O+", alt: 179, peso: 76, ciudad: "Bogot\xE1", depto: "Bogot\xE1 D.C." },
        "DEP-007": { sexo: "F", tier: "amateur", nac: "22 oct 2001", edad: 24, sangre: "A+", alt: 165, peso: 58, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-008": { sexo: "M", tier: "amateur", nac: "14 jul 1999", edad: 26, sangre: "B+", alt: 177, peso: 70, ciudad: "Tunja", depto: "Boyac\xE1" },
        "DEP-009": { sexo: "F", tier: "amateur", nac: "03 feb 2000", edad: 25, sangre: "O-", alt: 169, peso: 60, ciudad: "Medell\xEDn", depto: "Antioquia" },
        "DEP-010": { sexo: "M", tier: "amateur", nac: "28 ago 2002", edad: 23, sangre: "A+", alt: 174, peso: 68, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-011": { sexo: "F", tier: "juvenil", nac: "16 mar 2007", edad: 18, sangre: "O+", alt: 160, peso: 54, ciudad: "Barranquilla", depto: "Atl\xE1ntico" },
        "DEP-012": {
          sexo: "M",
          tier: "profesional",
          nac: "09 nov 1998",
          edad: 27,
          sangre: "AB+",
          alt: 178,
          peso: 73,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [{ evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", fecha: "2025-07-10", estado: "finalizado" }],
          resultados: [{ evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", ranking: 4, fecha: "2025-07-10" }],
          medalleria: []
        },
        /* ─── Resto del plantel de CLU-001 (ORG-09 · «Mis deportistas») ───
           Categorías y edades deliberadamente variadas: alimentan los filtros
           condicionales y el KPI de menores de edad (consentimiento del tutor). */
        "DEP-013": { sexo: "F", tier: "juvenil", nac: "14 may 2009", edad: 16, sangre: "O+", alt: 158, peso: 49, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-014": {
          sexo: "M",
          tier: "profesional",
          nac: "21 jul 1997",
          edad: 28,
          sangre: "A+",
          alt: 180,
          peso: 75,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "10.000m puntos", fecha: "2025-04-19", estado: "finalizado" }],
          resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "10.000m puntos", ranking: 5, fecha: "2025-04-19" }],
          medalleria: []
        },
        "DEP-015": { sexo: "F", tier: "juvenil", nac: "03 oct 2010", edad: 15, sangre: "B+", alt: 155, peso: 46, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-016": { sexo: "M", tier: "amateur", nac: "17 mar 2000", edad: 25, sangre: "O-", alt: 175, peso: 71, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-017": {
          sexo: "F",
          tier: "olimpico",
          nac: "28 ene 1996",
          edad: 29,
          sangre: "A+",
          alt: 170,
          peso: 62,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [
            { evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", fecha: "2025-04-18", estado: "finalizado" },
            { evento: "Copa Panamericana de Patinaje 2026", prueba: "200m contrarreloj", fecha: "2026-03-22", estado: "activo" }
          ],
          resultados: [{ evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", ranking: 1, fecha: "2025-04-18" }],
          medalleria: [
            { evento: "Campeonato Nacional de Patinaje 2025", prueba: "200m contrarreloj", medalla: "Oro", fecha: "2025-04-18" },
            { evento: "Juegos Regionales Valle 2025", prueba: "500m sprint", medalla: "Bronce", fecha: "2025-07-10" }
          ]
        },
        "DEP-018": { sexo: "M", tier: "juvenil", nac: "08 feb 2009", edad: 17, sangre: "O+", alt: 172, peso: 63, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-019": {
          sexo: "F",
          tier: "profesional",
          nac: "12 dic 1999",
          edad: 26,
          sangre: "AB+",
          alt: 164,
          peso: 56,
          ciudad: "Cali",
          depto: "Valle del Cauca",
          inscripciones: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", fecha: "2025-09-06", estado: "finalizado" }],
          resultados: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", ranking: 2, fecha: "2025-09-06" }],
          medalleria: [{ evento: "Nacional de Patinaje Art\xEDstico 2025", prueba: "Libre individual", medalla: "Plata", fecha: "2025-09-06" }]
        },
        "DEP-020": { sexo: "M", tier: "amateur", nac: "05 jun 2001", edad: 24, sangre: "A-", alt: 177, peso: 70, ciudad: "Cali", depto: "Valle del Cauca" },
        "DEP-021": { sexo: "F", tier: "juvenil", nac: "19 sep 2011", edad: 14, sangre: "O+", alt: 152, peso: 43, ciudad: "Cali", depto: "Valle del Cauca" }
      };
    }
  });

  // shared/documentos.js
  var documentos_exports = {};
  function filas() {
    const sols = solicitudesDeClub(scopeId).filter((s) => s.esMenor && s.documento && ["Enviada", "Aprobada", "Rechazada"].includes(s.estado));
    const grupos = /* @__PURE__ */ new Map();
    sols.forEach((s) => {
      const k = s.deportistaId;
      (grupos.get(k) || grupos.set(k, []).get(k)).push(s);
    });
    return [...grupos.values()].map((g) => {
      g.sort((a, b) => String(a.documento.cargadoAt || a.documento.cargado).localeCompare(String(b.documento.cargadoAt || b.documento.cargado)));
      const s = g[g.length - 1];
      const dep = getDeportista(s.deportistaId) || {};
      const tutor = s.tutorId ? getDeportista(s.tutorId) : null;
      const d = s.documento;
      let der = null;
      try {
        der = buildDeportistaDetalle(dep);
      } catch (_) {
      }
      const est = s.estado === "Enviada" ? "p" : s.estado === "Aprobada" ? "a" : "r";
      return {
        id: s.id,
        sol: s,
        dep,
        est,
        grupo: g,
        menor: dep.nombre || "\u2014",
        ini: iniciales(dep.nombre),
        docMenor: `${dep.tipoDoc || ""} ${dep.numDoc || ""}`.trim(),
        edad: dep.fechaNac ? edadDe(dep.fechaNac) : der ? der.edad : null,
        nac: dep.fechaNac ? nacFmt(dep.fechaNac) : der && der.nac ? der.nac : "\u2014",
        deporte: dep.deporte || "",
        tutor: tutor ? tutor.nombre : s.tutorNombre || "\u2014",
        tutorDoc: tutor ? `${tutor.tipoDoc} ${tutor.numDoc}` : s.tutorDoc || "\u2014",
        vinculo: dep.parentesco || "Padre/Madre",
        tipoDoc: dep.parentesco === "Tutor legal" ? "Sentencia de tutela" : "Registro civil",
        archivo: d.nombre,
        enviado: d.cargadoAt || d.cargado,
        corregido: !!d.corregido,
        revision: d.revision || null,
        decidio: d.revisadoPor ? { por: d.revisadoPor, rol: ROL_TXT[d.rolRevisor] || "Club", at: d.revisadoAt || d.revisadoFecha } : null,
        nota: s.motivo || ""
      };
    }).sort((a, b) => String(b.enviado).localeCompare(String(a.enviado)));
  }
  function setSel(id) {
    sel = id;
    const u = new URLSearchParams(location.search);
    if (id) u.set("sol", id);
    else u.delete("sol");
    history.replaceState(null, "", "?" + u.toString());
    render();
    window.scrollTo(0, 0);
  }
  function dropdown(key, label, opts) {
    const cur = opts.find((o) => o[0] === F[key]) || opts[0];
    return `<div class="naowee-dropdown dx-dd" data-k="${key}"><button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox"><span class="naowee-dropdown__value">${label}: ${esc(cur[1])}</span><span class="naowee-dropdown__chevron">${ic("chev")}</span></button>
    <div class="naowee-dropdown__menu" role="listbox">${opts.map((o) => `<div class="naowee-dropdown__opt${o[0] === F[key] ? " naowee-dropdown__opt--selected" : ""}" role="option" data-v="${esc(o[0])}">${esc(o[1])}</div>`).join("")}</div></div>`;
  }
  function renderLista() {
    let all = filas();
    if (esRevisor) all = all.filter((r) => accionesPendientes(r) || r.decidio && r.decidio.rol === "Revisor" && r.decidio.por === role.userName);
    const c = { p: 0, a: 0, r: 0 };
    all.forEach((r) => {
      c[r.est]++;
    });
    const deps = ["Todos", ...new Set(all.map((r) => r.deporte).filter(Boolean))];
    const q = norm(F.q);
    const view = all.filter((r) => {
      const k = r.est;
      return (F.est === "Todos" || k === F.est) && (F.dep === "Todos" || r.deporte === F.dep) && (F.por === "Todos" || r.decidio && r.decidio.rol === F.por) && (!q || norm(r.menor + " " + r.tutor + " " + r.archivo).includes(q));
    });
    const K = [["pu", "doc", "Por revisar", c.p, "Esperando decisi\xF3n"], ["gr", "chk", "Aprobados", c.a, "Menores afiliados"], ["pk", "x", "Rechazados", c.r, "Devueltos con nota"]];
    root.innerHTML = `
    <div class="dx-kpis">${K.map((k) => `<div class="dx-kpi"><span class="dx-kpi__t"><span class="dx-kpi__l">${k[2]}</span><span class="dx-kic dx-kic--${k[0]}">${ic(k[1])}</span></span><span class="dx-kpi__v">${k[3]}</span><span class="dx-kpi__f">${k[4]}</span></div>`).join("")}</div>
    <div class="naowee-card dx-panel">
      <div class="dx-bar"><div class="dx-bar__l">
        <label class="dx-search">${ic("search")}<input id="dxQ" placeholder="Buscar menor, tutor o documento" aria-label="Buscar" value="${esc(F.q)}"></label>
        ${dropdown("dep", "Deporte", deps.map((d) => [d, d]))}${dropdown("est", "Estado", EST_OPTS)}${dropdown("por", "Decidi\xF3", [["Todos", "Todos"], ["Club", "Club"], ["Revisor", "Revisor"]])}
      </div></div>
      ${view.length ? `<div class="dx-tw"><table class="dx-table">
        <thead><tr><th>Menor</th><th>Tutor</th><th>Enviado</th><th>Estado</th><th>Historial</th><th class="dx-r">Acciones</th></tr></thead>
        <tbody>${view.map((r, i) => `<tr>
          <td><div class="dx-who"><span class="dx-av dx-av--c${i % 5}">${esc(r.ini)}</span><div><strong>${esc(r.menor)}</strong><span class="dx-sub">${esc(r.docMenor)}${r.edad != null ? " \xB7 " + r.edad + " a\xF1os" : ""}</span></div></div></td>
          <td><strong class="dx-n">${esc(r.tutor)}</strong><span class="dx-sub">${esc(r.vinculo)} \xB7 ${esc(r.tipoDoc)}</span></td>
          <td>${fmtL(r.enviado)}${r.corregido ? ' <span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Corregido</span>' : ""}</td>
          <td>${badge(r.est)}</td>
          <td>${r.decidio ? `<div>${fmtL(r.decidio.at)}</div><span class="dx-de">De ${esc(r.decidio.por)} <span class="dx-tag">${r.decidio.rol}</span></span>` : '<span class="dx-sub">\u2014</span>'}</td>
          <td class="dx-r"><button type="button" class="dx-alink" data-rev="${esc(r.id)}">${ic("eye")}${accionesPendientes(r) && puede ? "Revisar" : "Ver"}</button></td></tr>`).join("")}</tbody></table></div>` : `<div class="dx-empty"><strong>Sin documentos</strong>No hay documentos que coincidan con el filtro.</div>`}
      <div class="dx-pg">P\xE1gina <input value="1" aria-label="P\xE1gina actual" readonly> de <b>1</b><span class="dx-pg__b"><button type="button" disabled aria-label="Anterior">${ic("chl")}</button><button type="button" disabled aria-label="Siguiente">${ic("chr")}</button></span></div>
    </div>`;
    const q$ = root.querySelector("#dxQ");
    q$.addEventListener("input", () => {
      F.q = q$.value;
      const pos = q$.selectionStart;
      renderLista();
      const n = root.querySelector("#dxQ");
      n.focus();
      n.setSelectionRange(pos, pos);
    });
    root.querySelectorAll(".dx-dd").forEach((dd) => {
      dd.querySelector(".naowee-dropdown__trigger").addEventListener("click", (e) => {
        e.stopPropagation();
        const o = dd.classList.contains("naowee-dropdown--open");
        cerrarDd();
        if (!o) dd.classList.add("naowee-dropdown--open");
      });
      dd.querySelectorAll(".naowee-dropdown__opt").forEach((o) => o.addEventListener("click", () => {
        F[dd.dataset.k] = o.dataset.v;
        renderLista();
      }));
    });
    root.querySelectorAll("[data-rev]").forEach((b) => b.addEventListener("click", () => abrir(b.dataset.rev)));
  }
  function cerrarDd() {
    document.querySelectorAll(".dx-dd.naowee-dropdown--open").forEach((d) => d.classList.remove("naowee-dropdown--open"));
  }
  function abrir(id) {
    rv = { chk: false, dec: null, nota: "", tab: "req", shut: false, zoom: 1 };
    setSel(id);
  }
  function reqHtml(r, p) {
    const acts = p ? `<button type="button" class="dx-ib${rv.dec === "r" ? " is-r" : ""}" id="dxR" data-tip="Rechazar documento" aria-label="Rechazar documento" aria-pressed="${rv.dec === "r"}">${ic("ban")}</button><button type="button" class="dx-ib${rv.dec === "a" ? " is-a" : ""}" id="dxA" data-tip="Aprobar documento" aria-label="Aprobar documento" aria-pressed="${rv.dec === "a"}">${ic("chk")}</button>` : '<span class="dx-sub">\u2014</span>';
    return `<table class="dx-t2"><thead><tr><th>Documento</th><th>Estado</th><th class="dx-c">Acciones</th></tr></thead>
      <tbody><tr><td><span class="dx-dn">${esc(r.tipoDoc)}</span></td><td>${badge(r.est)}</td><td class="dx-c dx-nw">${acts}</td></tr></tbody></table>
    ${p && rv.dec === "r" ? `<div class="dx-nota"><label for="dxNota">Nota<span>*</span></label><textarea id="dxNota" placeholder="Explica por qu\xE9 se rechaza y qu\xE9 debe corregir el tutor.">${esc(rv.nota)}</textarea><p class="dx-err" id="dxErr" hidden>Escribe una nota para rechazar el documento.</p></div>` : ""}
    <div class="dx-acc${rv.shut ? " is-shut" : ""}"><button type="button" id="dxAcc" aria-expanded="${!rv.shut}">Datos del menor${ic("up")}</button><div class="dx-acc__b">
      <div class="dx-nm"><span class="dx-av dx-av--c3">${esc(r.ini)}</span>${esc(r.menor)}</div>
      <div class="dx-pv"><div class="dx-pv__t"><button type="button" id="dxZi" aria-label="Acercar">${ic("zin")}</button><button type="button" id="dxZo" aria-label="Alejar">${ic("zout")}</button><button type="button" id="dxDl" aria-label="Descargar">${ic("dwn")}</button></div><div class="dx-pv__b" aria-label="Vista previa de ${esc(r.archivo)}">${MOCK(r)}</div></div>
    </div></div>`;
  }
  function histHtml(r) {
    const ev = [];
    r.grupo.forEach((s) => {
      const d = s.documento;
      ev.push({ t: "Enviado", ic: "docc", cls: "", corr: !!d.corregido, desc: `El formulario con documento <b>${esc(d.nombre)}</b> ha sido enviado exitosamente y est\xE1 pendiente de revisi\xF3n.`, at: d.cargadoAt || d.cargado, por: r.tutor, tutor: true });
      if (s.estado === "Aprobada") ev.push({ t: "Aprobaci\xF3n", ic: "chk", cls: "ok", desc: `El documento <b>${esc(d.nombre)}</b> ha sido validado correctamente y el menor qued\xF3 afiliado.`, at: d.revisadoAt || d.revisadoFecha, por: d.revisadoPor });
      if (s.estado === "Rechazada") ev.push({ t: "Rechazado", ic: "docx", cls: "no", help: s.motivo, desc: `El documento <b>${esc(d.nombre)}</b> ha sido rechazado, revisar notas del revisor.`, at: d.revisadoAt || d.revisadoFecha, por: d.revisadoPor });
    });
    ev.reverse();
    return `<ul class="dx-tl">${ev.map((e) => `<li><span class="dx-rail"><span class="dx-ti${e.cls ? " dx-ti--" + e.cls : ""}">${ic(e.ic)}</span></span>
    <div><div class="dx-tt">${e.t}${e.corr ? ' <span class="naowee-badge naowee-badge--caution naowee-badge--quiet naowee-badge--small">Corregido</span>' : ""}${e.help ? ` <span class="dx-hlp" title="Nota: ${esc(e.help)}">${ic("help", "dx-hq")}</span>` : ""}</div><div class="dx-td">${e.desc}</div></div>
    <div class="dx-who2"><div class="dx-tdt"><div>${fmtH(e.at)}</div><span>${esc(e.por)}</span></div><span class="dx-av2 ${e.tutor ? "is-t" : "is-r"}">${esc(iniciales(e.por))}</span></div></li>`).join("")}</ul>`;
  }
  function seleccionados() {
    return rv.chk ? 1 : 0;
  }
  function renderRev() {
    const r = filas().find((x) => x.id === sel);
    if (!r) {
      setSel(null);
      return;
    }
    const p = puede && accionesPendientes(r);
    const canSend = p && rv.dec && (rv.dec === "a" || rv.nota.trim());
    const n = String(r.id).replace(/\D/g, "").slice(-3).padStart(3, "0");
    root.innerHTML = `
    <nav class="dx-crumb" aria-label="Ruta"><a href="#" id="dxBk">Aprobaci\xF3n de documentos</a><span aria-hidden="true">\u203A</span><b>${esc(r.menor)}</b></nav>
    <div class="dx-rh"><h2>${esc(r.menor)}</h2><p>Documento de parentesco enviado \xB7 solicitud #SUID 2026 \u2022 ${n} \xB7 ${esc((getOrganismo(scopeId) || {}).nombre || "Tu club")}</p></div>
    <div class="dx-split">
      <div class="dx-lp">${p && seleccionados() >= 2 ? `<div class="dx-bulk"><button type="button" class="dx-tlink" id="dxBkR">Rechazar documentos</button><button type="button" class="dx-tlink" id="dxBkA">Aprobar documentos</button></div>` : ""}
        <table class="dx-t2"><thead><tr><th class="dx-ck"><input class="dx-cb" type="checkbox" id="dxAll" aria-label="Seleccionar todos" ${p ? "" : "disabled"} ${rv.chk ? "checked" : ""}></th><th>Documento</th><th>Estado</th><th>Fecha de cargue</th></tr></thead>
        <tbody><tr><td class="dx-ck"><input class="dx-cb" type="checkbox" id="dxOne" aria-label="Seleccionar documento" ${p ? "" : "disabled"} ${rv.chk ? "checked" : ""}></td><td><span class="dx-dn">${ic("doc")}${esc(r.tipoDoc)} ${ic("help", "dx-hq")}</span></td><td>${badge(r.est)}</td><td class="dx-nw">${fmtCargue(r.enviado)}</td></tr></tbody></table></div>
      <div class="dx-rp"><h3 class="dx-rt">Detalle del documento</h3>
        <div class="dx-rtabs" role="tablist"><button type="button" class="dx-rtab" role="tab" data-t="req" aria-selected="${rv.tab === "req"}">Requerimientos</button><button type="button" class="dx-rtab" role="tab" data-t="his" aria-selected="${rv.tab === "his"}">Historial</button></div>
        <div class="dx-rbody">${rv.tab === "req" ? reqHtml(r, p) : histHtml(r)}</div>
        ${p ? `<div class="dx-rf"><button type="button" class="naowee-btn naowee-btn--loud naowee-btn--large" id="dxSend" ${canSend ? "" : "disabled"}>Enviar</button></div>` : ""}
      </div>
    </div>`;
    wireRev(r, p);
  }
  function wireRev(r, p) {
    root.querySelector("#dxBk").addEventListener("click", (e) => {
      e.preventDefault();
      setSel(null);
    });
    root.querySelectorAll(".dx-rtab").forEach((b) => b.addEventListener("click", () => {
      rv.tab = b.dataset.t;
      renderRev();
    }));
    if (!p) return;
    const marcar = (v) => {
      rv.chk = v;
      renderRev();
    };
    root.querySelector("#dxAll").addEventListener("change", (e) => marcar(e.target.checked));
    root.querySelector("#dxOne").addEventListener("change", (e) => marcar(e.target.checked));
    root.querySelector("#dxSend").addEventListener("click", () => {
      if (rv.dec === "r" && !rv.nota.trim()) {
        const e = root.querySelector("#dxErr");
        if (e) e.hidden = false;
        return;
      }
      confirmar(r, rv.dec);
    });
    if (rv.tab !== "req") return;
    root.querySelector("#dxA").addEventListener("click", () => {
      rv.dec = rv.dec === "a" ? null : "a";
      renderRev();
    });
    root.querySelector("#dxR").addEventListener("click", () => {
      rv.dec = rv.dec === "r" ? null : "r";
      renderRev();
      const n = root.querySelector("#dxNota");
      if (n) n.focus();
    });
    root.querySelector("#dxAcc").addEventListener("click", () => {
      rv.shut = !rv.shut;
      renderRev();
    });
    root.querySelector("#dxZi").addEventListener("click", () => {
      rv.zoom = Math.min(1.5, rv.zoom + 0.1);
      renderRev();
    });
    root.querySelector("#dxZo").addEventListener("click", () => {
      rv.zoom = Math.max(0.7, rv.zoom - 0.1);
      renderRev();
    });
    root.querySelector("#dxDl").addEventListener("click", () => toast("Descarga simulada de " + r.archivo));
    const nota = root.querySelector("#dxNota");
    if (nota) nota.addEventListener("input", () => {
      rv.nota = nota.value;
      const b = root.querySelector("#dxSend");
      if (b) b.disabled = !rv.nota.trim();
      const e = root.querySelector("#dxErr");
      if (e) e.hidden = true;
    });
  }
  function confirmar(r, est) {
    const ok = est === "a";
    const club = (getOrganismo(scopeId) || {}).nombre || "tu club";
    const ov = document.createElement("div");
    ov.className = "dx-ov";
    ov.innerHTML = `<div class="dx-dlg" role="dialog" aria-modal="true" aria-labelledby="dxCt"><div class="dx-dlg__i"><span class="dx-dlg__k">${ic("chk")}</span><h3 id="dxCt">${ok ? "\xA1Aprobaci\xF3n de documento!" : "\xA1Rechazo de documento!"}</h3>
    <p>${ok ? `El documento ha sido aprobado exitosamente y el menor qued\xF3 afiliado a ${esc(club)}. Se notific\xF3 al tutor sobre la decisi\xF3n.` : "El documento ha sido rechazado exitosamente y se ha notificado al tutor sobre la decisi\xF3n. Aseg\xFArate de que las razones del rechazo sean claras para facilitar futuras correcciones."}</p></div>
    <div class="dx-dlg__f"><button type="button" class="dx-tlink" id="dxCc">Cancelar</button><button type="button" class="naowee-btn naowee-btn--loud naowee-btn--large" id="dxCa">Aceptar</button></div></div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("is-open"));
    const cerrar = () => {
      ov.classList.remove("is-open");
      setTimeout(() => ov.remove(), 200);
    };
    ov.querySelector("#dxCa").focus();
    ov.querySelector("#dxCc").addEventListener("click", cerrar);
    ov.addEventListener("click", (e) => {
      if (e.target === ov) cerrar();
    });
    ov.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrar();
    });
    ov.querySelector("#dxCa").addEventListener("click", () => {
      cerrar();
      resolverAfiliacion(r.id, ok ? "aprobada" : "rechazada", { motivo: ok ? "" : rv.nota.trim(), responsable: role.userName || "Administrador del club", rol: ROL_DECISION });
      toast(ok ? `${r.menor} qued\xF3 afiliado a ${club}` : `Documento de ${r.menor} rechazado. El tutor fue notificado.`);
      setSel(null);
    });
  }
  function render() {
    const t = document.getElementById("pageTitle"), s = document.getElementById("pageSub");
    const head = document.querySelector(".page-head");
    if (roleCode !== "CLUB" && !esRevisor) {
      root.innerHTML = '<div class="dx-empty"><strong>Esta vista es del club</strong>Entra como administrador de un club para revisar los documentos de parentesco de los menores.</div>';
      return;
    }
    if (sel) {
      if (head) head.hidden = true;
      renderRev();
      return;
    }
    if (head) head.hidden = false;
    if (t) t.textContent = "Aprobaci\xF3n de documentos";
    if (s) s.textContent = "Revisa el documento de parentesco de los menores. Si se aprueba, el menor queda afiliado al club y hereda su liga y federaci\xF3n.";
    renderLista();
  }
  var roleCode, role, scopeId, esRevisor, puede, ROL_DECISION, root, esc, norm, toast, MES_L, MES_H, hora, dt, fmtL, fmtH, fmtCargue, nacFmt, edadDe, iniciales, ROL_TXT, EST, badge, accionesPendientes, P, ic, F, sel, rv, EST_OPTS, MOCK;
  var init_documentos = __esm({
    "shared/documentos.js"() {
      init_sidebar();
      init_organismos_data();
      init_permissions();
      init_deportista_detalle();
      roleCode = getRoleFromQuery();
      role = ROLES[roleCode] || {};
      scopeId = scopeFor(roleCode);
      esRevisor = roleCode === "REVISOR_DOC";
      puede = roleCode === "CLUB" && can(roleCode, "A", "solicitudes") || esRevisor;
      ROL_DECISION = esRevisor ? "REVISOR" : "CLUB";
      root = document.getElementById("docRoot");
      esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
      norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      toast = (t, v) => {
        if (window.naoweeToast) window.naoweeToast(t, v || "success");
      };
      MES_L = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
      MES_H = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      hora = (d) => {
        const h = d.getHours();
        return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
      };
      dt = (iso) => iso ? new Date(String(iso).length === 10 ? iso + "T12:00:00" : iso) : null;
      fmtL = (iso) => {
        const d = dt(iso);
        return d ? `${MES_L[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ${hora(d)}` : "\u2014";
      };
      fmtH = (iso) => {
        const d = dt(iso);
        return d ? `${MES_H[d.getMonth()]}, ${String(d.getDate()).padStart(2, "0")} ${d.getFullYear()}. ${hora(d)}` : "\u2014";
      };
      fmtCargue = (iso) => {
        const d = dt(iso);
        return d ? `${MES_L[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : "\u2014";
      };
      nacFmt = (iso) => {
        const d = dt(iso);
        return d ? `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}` : "\u2014";
      };
      edadDe = (iso) => {
        const d = dt(iso);
        if (!d) return null;
        const n = /* @__PURE__ */ new Date();
        let e = n.getFullYear() - d.getFullYear();
        if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) e--;
        return e;
      };
      iniciales = (n) => String(n || "").split(" ").filter(Boolean).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
      ROL_TXT = { CLUB: "Club", REVISOR: "Revisor" };
      EST = { p: ["Pendiente", "caution"], a: ["Aprobado", "positive"], r: ["Rechazado", "negative"] };
      badge = (k) => `<span class="naowee-badge naowee-badge--${EST[k][1]} naowee-badge--quiet">${EST[k][0]}</span>`;
      accionesPendientes = (r) => r.est === "p";
      P = {
        eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
        doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
        chk: '<path d="M20 6 9 17l-5-5"/>',
        x: '<path d="M6 6l12 12M18 6 6 18"/>',
        ban: '<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
        help: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5M12 16.8h.01"/>',
        up: '<path d="m6 15 6-6 6 6"/>',
        zin: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
        zout: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/>',
        dwn: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
        search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
        chev: '<path d="m6 9 6 6 6-6"/>',
        chl: '<path d="m15 18-6-6 6-6"/>',
        chr: '<path d="m9 18 6-6-6-6"/>',
        inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"/>',
        clk: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
        docx: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8M14 3v5h5v3M8 12h6M8 16h3M16 15l4 4M20 15l-4 4"/>',
        doce: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M14 3v5h5v3"/><path d="M11 17s1.5-3 5-3 5 3 5 3-1.5 3-5 3-5-3-5-3z"/><circle cx="16" cy="17" r="1"/>',
        docc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 3v5h5v4M8 12h6M8 16h3M15 18l2 2 4-4"/>'
      };
      ic = (n, c = "") => `<svg class="dx-i ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
      F = { q: "", dep: "Todos", est: "p", por: "Todos" };
      sel = new URLSearchParams(location.search).get("sol") || null;
      rv = { chk: false, dec: null, nota: "", tab: "req", shut: false, zoom: 1 };
      EST_OPTS = [["Todos", "Todos"], ["p", "Pendientes"], ["a", "Aprobados"], ["r", "Rechazados"]];
      document.addEventListener("click", cerrarDd);
      MOCK = (r) => `<div class="dx-page" style="transform:scale(${rv.zoom})"><div class="dx-page__t">${esc(r.tipoDoc.toUpperCase())}</div><div class="dx-l dx-l--m"></div><div class="dx-l dx-l--s"></div><div class="dx-box"><span class="dx-hl">Nombre: ${esc(r.menor)}</span><span class="dx-hl">Fecha de nacimiento: ${esc(r.nac)}</span></div><div class="dx-l dx-l--m"></div><div class="dx-box"><span class="dx-hl">${esc(r.vinculo)}: ${esc(r.tutor)}</span></div><div class="dx-l dx-l--s"></div><div class="dx-l dx-l--m"></div></div>`;
      render();
    }
  });

  // shared/devnotes.js
  var devnotes_exports = {};
  __export(devnotes_exports, {
    mountDevnotes: () => mountDevnotes
  });
  function mountDevnotes(registry, root2 = document) {
    root2.querySelectorAll("[data-devnote]").forEach((el) => {
      if (el.dataset.mounted) return;
      const n = registry[el.dataset.devnote];
      if (!n) return;
      if (el.closest(".page-head")) el.dataset.nobadge = "1";
      const list = (items) => `<ul>${(items || []).map((i) => `<li>${i}</li>`).join("")}</ul>`;
      const body = n.sections ? n.sections.map((s) => `<div class="wz-devnote__sec"><div class="wz-devnote__sec-title">${s.title}</div>${list(s.items)}</div>`).join("") : list(n.items);
      el.innerHTML = `${el.dataset.nobadge ? "" : '<span class="naowee-badge">Solo demo</span>'}Notas para devs
      <span class="wz-devnote__pop" role="tooltip"><span class="wz-devnote__head">${n.title} <em>\xB7 nota para devs, no es parte del producto</em></span>${body}</span>`;
      el.dataset.mounted = "1";
      if (el.closest(".page-head")) {
        el.classList.add("wz-devnote--fab");
        document.body.appendChild(el);
      }
    });
  }
  var init_devnotes = __esm({
    "shared/devnotes.js"() {
    }
  });

  // shared/entries/documentos.js
  init_sidebar();
  init_organismos_data();
  seedDemoData();
  seedAfiliacionesDemo(getDemoMode());
  var roleCode2 = getRoleFromQuery();
  var role2 = ROLES[roleCode2];
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode: roleCode2, activeId: "documentos" });
  mountHeader({ headerEl: document.getElementById("topHeader"), role: role2 });
  mountBackdrop();
  mountDemoSwitcher({ roleCode: roleCode2 });
  Promise.resolve().then(() => init_documentos());
  Promise.resolve().then(() => (init_devnotes(), devnotes_exports)).then(({ mountDevnotes: mountDevnotes2 }) => {
    const revisor = roleCode2 === "REVISOR_DOC";
    mountDevnotes2({ documentos: { title: revisor ? "Revisi\xF3n documental \xB7 vista del revisor de documentos" : "Revisi\xF3n documental \xB7 vista del administrador del club", sections: [
      { title: "Qu\xE9 resuelve", items: [
        "Hallazgo de QA sobre DEP-1029 y DEP-1030: el tutor ve\xEDa \xABEl Ministerio valida sus documentos\xBB, pero esa aprobaci\xF3n solo exist\xEDa en SPORT (<code>Documentaci\xF3n \u2192 Aprobaci\xF3n</code>), sin ruta desde el SUID. PROD-96 la mueve al club, dentro del SUID.",
        "El tutor elige el club al registrar al menor; el documento de parentesco llega a la <b>Revisi\xF3n documental</b> de ese club. No pasa por \xABSolicitudes de deportistas\xBB.",
        "Tres estados: <b>Pendiente</b>, <b>Aprobado</b> y <b>Rechazado</b>. Abrir un documento no cambia su estado: si nadie decide, sigue pendiente y cuenta en el contador del men\xFA."
      ] },
      { title: revisor ? "Qu\xE9 puede hacer el revisor" : "Qu\xE9 puede hacer el administrador del club", items: revisor ? [
        "Ve solo lo que tiene <b>pendiente</b> y los documentos que <b>\xE9l mismo decidi\xF3</b>; el administrador ve todos los del club. Su men\xFA es <b>Revisi\xF3n documental</b> y <b>Mi perfil</b>, nada m\xE1s.",
        "Puede aprobar y rechazar, igual que el administrador. Rechazar exige una <b>nota</b>. Su decisi\xF3n queda en el historial con la etiqueta <b>Revisor</b>.",
        "No ve deportistas, solicitudes, usuarios ni los datos del organismo, y no invita a nadie."
      ] : [
        "Ve todos los documentos del club (pendientes, aprobados y rechazados), filtra por deporte, estado y qui\xE9n decidi\xF3, y decide cualquiera.",
        "Invita al <b>Revisor de documentos</b> desde \xABUsuarios\xBB: el rol solo existe en clubes y solo lo crea el administrador del organismo.",
        "Un mismo usuario puede tener los dos roles en el club; el selector \xABSolo demo\xBB del encabezado cambia de uno a otro."
      ] },
      { title: "Decisi\xF3n e historial", items: [
        "Una sola decisi\xF3n: <b>aprobar</b> el documento afilia al menor (queda vinculado al club y hereda su liga y su federaci\xF3n); <b>rechazar</b> exige una nota que el tutor ve en su perfil, desde donde recarga el documento o elige otro club.",
        "La vista pide confirmaci\xF3n antes de registrar. Cada documento guarda su l\xEDnea de tiempo: <b>Enviado</b> (con <b>Corregido</b> si el tutor lo recarg\xF3), y <b>Aprobaci\xF3n</b> o <b>Rechazado</b>, con qui\xE9n, cu\xE1ndo y con qu\xE9 rol (Club o Revisor). Tambi\xE9n queda en la auditor\xEDa del club."
      ] },
      { title: "Notificaciones", items: [
        "La campana del encabezado (administrador del club y revisor) trae <b>un aviso por cada documento pendiente</b>: \xABHay documentos pendientes de revisi\xF3n\xBB, con qui\xE9n lo carg\xF3, de qu\xE9 menor y cu\xE1ndo. Cada aviso lleva a la revisi\xF3n de ese documento.",
        "<b>Marcar como le\xEDdas</b> apaga los puntos y el contador; queda guardado en la sesi\xF3n del navegador (demo). Si el tutor recarga un documento, el aviso dice \xABcorrigi\xF3\xBB."
      ] },
      { title: "Qu\xE9 falta en el back", items: [
        "Estado del documento por menor y club, nota de rechazo, qui\xE9n y cu\xE1ndo decide, y el rol <b>Revisor de documentos</b> (alcance: solo revisi\xF3n y su perfil). Pendiente con Back (DEP-1029) y Front (DEP-1030).",
        "Aviso al tutor cuando se decide, y la vista previa real del documento (hoy es una p\xE1gina simulada)."
      ] },
      { title: "Solo demo", items: [
        "Los menores de ejemplo y sus tutores (varios ficticios) los siembra <code>seedMenoresDemo</code>. \xABDescargar\xBB es simulado y los cambios viven en la sesi\xF3n del navegador.",
        revisor ? "Se entra con <code>?role=REVISOR_DOC</code> (\xD3scar Cardona con su segundo rol)." : "Se entra con <code>?role=CLUB</code>."
      ] }
    ] } });
  });
})();
