(() => {
  // ../front/DEMO/naowee-organismos/shared/organismos-data.js
  var COMITES = [
    { id: "COC", tipo: "comite", nombre: "Comit\xE9 Ol\xEDmpico Colombiano", nit: "860028097-1", sector: "Ol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000100", nombre: "Camilo", apellido: "Duarte", correo: "presidencia@coc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Av. Cra. 30 (NQS) # 64-81" }, contacto: { telefono: "6015550001", correo: "contacto@coc.demo.co" }, fechaRegistro: "2025-11-02" },
    { id: "CPC", tipo: "comite", nombre: "Comit\xE9 Paral\xEDmpico Colombiano", nit: "830500110-4", sector: "Paral\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000101", nombre: "Marcela", apellido: "R\xEDos", correo: "presidencia@cpc.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06" }, contacto: { telefono: "6014801515", correo: "contacto@paralimpicocol.demo.co" }, fechaRegistro: "2025-11-05" },
    { id: "FSC", tipo: "comite", nombre: "Federaci\xF3n Sordol\xEDmpica de Colombia", nit: "900700221-2", sector: "Sordol\xEDmpico", deporte: "\u2014", parentId: null, estado: "Activo", repLegal: { tipoDoc: "CC", numDoc: "10000102", nombre: "Hern\xE1n", apellido: "P\xE9rez", correo: "presidencia@sordolimpico.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114" }, contacto: { telefono: "6045551020", correo: "contacto@sordolimpico.demo.co" }, fechaRegistro: "2025-11-08" }
  ];
  var FEDERACIONES_COC = [
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
  var FEDERACIONES_FICTICIAS = [
    { id: "FED-P01", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Para Atletismo", nit: "901500001-1", sector: "Paral\xEDmpico", deporte: "Para Atletismo", parentId: "CPC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000201", nombre: "Laura", apellido: "Mendoza R\xEDos", correo: "presidencia@fedeparaatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06 Of. 201" }, contacto: { telefono: "6014809090", correo: "contacto@fedeparaatletismo.demo.co" }, fechaRegistro: "2026-02-18" },
    { id: "FED-P02", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Para Nataci\xF3n", nit: "901500002-2", sector: "Paral\xEDmpico", deporte: "Para Nataci\xF3n", parentId: "CPC", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000202", nombre: "Diego", apellido: "Vargas Pe\xF1a", correo: "presidencia@fedeparanatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 36 # 5B-62" }, contacto: { telefono: "6024889090", correo: "contacto@fedeparanatacion.demo.co" }, fechaRegistro: "2026-05-09" },
    { id: "FED-S01", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Atletismo de Sordos", nit: "901500003-3", sector: "Sordol\xEDmpico", deporte: "Atletismo de Sordos", parentId: "FSC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000203", nombre: "Sof\xEDa", apellido: "Guerrero Le\xF3n", correo: "presidencia@fedesordosbaloncesto.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114 Of. 3" }, contacto: { telefono: "6045553030", correo: "contacto@fedesordosbaloncesto.demo.co" }, fechaRegistro: "2026-03-28" }
  ];
  var LIGAS = [
    { id: "LIG-001", tipo: "liga", nombre: "Liga de Patinaje del Valle", nit: "805010001-1", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000301", nombre: "Sandra", apellido: "Mej\xEDa", correo: "direccion@ligapatinajevalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-00 Unidad Deportiva Alberto Galindo" }, contacto: { telefono: "6024010101", correo: "contacto@ligapatinajevalle.demo.co" }, fechaRegistro: "2026-03-10" },
    { id: "LIG-002", tipo: "liga", nombre: "Liga de Patinaje de Antioquia", nit: "805010002-2", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000302", nombre: "Carlos", apellido: "Estrada Ruiz", correo: "direccion@ligapatinajeant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 70 # 48-70 Estadio Atanasio Girardot" }, contacto: { telefono: "6044020202", correo: "contacto@ligapatinajeant.demo.co" }, fechaRegistro: "2026-03-14" },
    { id: "LIG-003", tipo: "liga", nombre: "Liga de Patinaje de Bogot\xE1", nit: "805010003-3", sector: "Ol\xEDmpico", deporte: "Patinaje", parentId: "FED-040", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000303", nombre: "Paula", apellido: "Rinc\xF3n D\xEDaz", correo: "direccion@ligapatinajebogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 63-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014030303", correo: "contacto@ligapatinajebogota.demo.co" }, fechaRegistro: "2026-05-02" },
    { id: "LIG-004", tipo: "liga", nombre: "Liga de F\xFAtbol del Valle", nit: "805010004-4", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000304", nombre: "Andr\xE9s", apellido: "Lozano Gil", correo: "direccion@ligafutbolvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 50-00" }, contacto: { telefono: "6024040404", correo: "contacto@ligafutbolvalle.demo.co" }, fechaRegistro: "2026-02-22" },
    { id: "LIG-005", tipo: "liga", nombre: "Liga de F\xFAtbol de Antioquia", nit: "805010005-5", sector: "Ol\xEDmpico", deporte: "F\xFAtbol", parentId: "FED-026", estado: "Preinscrito", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000305", nombre: "Mariana", apellido: "Ospina Cano", correo: "direccion@ligafutbolant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 74 # 48-10" }, contacto: { telefono: "6044050505", correo: "contacto@ligafutbolant.demo.co" }, fechaRegistro: "2026-06-01" },
    { id: "LIG-006", tipo: "liga", nombre: "Liga de Nataci\xF3n del Valle", nit: "805010006-6", sector: "Ol\xEDmpico", deporte: "Nataci\xF3n", parentId: "FED-038", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000306", nombre: "Diego", apellido: "Ospina Mar\xEDn", correo: "direccion@liganatacionvalle.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Calle 5 # 42-40 Complejo Acu\xE1tico" }, contacto: { telefono: "6024060606", correo: "contacto@liganatacionvalle.demo.co" }, fechaRegistro: "2026-02-28" },
    { id: "LIG-007", tipo: "liga", nombre: "Liga de Ciclismo de Antioquia", nit: "805010007-7", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Rechazado", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000307", nombre: "Juli\xE1n", apellido: "C\xE1rdenas V\xE9lez", correo: "direccion@ligaciclismoant.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Vel\xF3dromo Mart\xEDn Emilio Cochise Rodr\xEDguez" }, contacto: { telefono: "6044070707", correo: "contacto@ligaciclismoant.demo.co" }, fechaRegistro: "2026-04-11" },
    { id: "LIG-008", tipo: "liga", nombre: "Liga de Ciclismo de Bogot\xE1", nit: "805010008-8", sector: "Ol\xEDmpico", deporte: "Ciclismo", parentId: "FED-016", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000308", nombre: "Natalia", apellido: "Pe\xF1a Rojas", correo: "direccion@ligaciclismobogota.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Cra. 60 # 57-00 Unidad Deportiva El Salitre" }, contacto: { telefono: "6014080808", correo: "contacto@ligaciclismobogota.demo.co" }, fechaRegistro: "2026-01-30" }
  ];
  var CLUBES = [
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
  var DEPORTISTAS = [
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
  var SEED_ORGANISMOS = [
    ...COMITES,
    ...FEDERACIONES_COC,
    ...FEDERACIONES_FICTICIAS,
    ...LIGAS,
    ...CLUBES
  ];
  var SEED_DEPORTISTAS = DEPORTISTAS;
  var DEPORTES_SEED = {
    "FED-038": ["Nataci\xF3n", "Nataci\xF3n Art\xEDstica", "Polo Acu\xE1tico"],
    "FED-040": ["Patinaje", "Patinaje Art\xEDstico", "Patinaje de Velocidad"],
    "LIG-006": ["Nataci\xF3n", "Polo Acu\xE1tico"],
    "CLU-007": ["Nataci\xF3n", "Polo Acu\xE1tico"]
  };
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
  var AF_DESDE = "2026-03-25";
  var AFILIACIONES_EXTRA = [
    /* Multi-afiliación de deportes distintos: Mateo patina en Cali y nada en Aguas del Valle. */
    { id: "AF-S900", tipo: "deportista", sujetoId: "DEP-002", organismoId: "CLU-007", deporte: "Nataci\xF3n", estado: "Vinculada", desde: "2026-05-04", origen: "solicitud" },
    /* Laura: pidió un segundo club y trabaja como entrenadora (personal deportivo → cualquier organismo, P-05). */
    { id: "AF-S901", tipo: "deportista", sujetoId: "DEP-022", organismoId: "CLU-003", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-02", origen: "solicitud" },
    { id: "AF-P001", tipo: "personal", sujetoId: "DEP-022", organismoId: "LIG-001", deporte: "Patinaje", estado: "Vinculada", desde: "2024-01-20", origen: "solicitud", rol: "Docente/Entrenador" },
    { id: "AF-P002", tipo: "personal", sujetoId: "DEP-022", organismoId: "CLU-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-09-29", origen: "solicitud", rol: "Docente/Entrenador" },
    /* Un club ya activo en Antioquia pide entrar también a la liga del Valle (P-20): la liga solo aprueba el vínculo. */
    { id: "AF-C900", tipo: "club", sujetoId: "CLU-004", organismoId: "LIG-001", deporte: "Patinaje", estado: "Solicitada", desde: null, fecha: "2026-10-06", origen: "solicitud" }
  ];
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
  var STORE_PREFIX = "naowee-organismos-";
  var SEED_FLAG = STORE_PREFIX + "demo-seeded";
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
  function getDeportista(id) {
    return allDeportistas().find((d) => d.id === id) || null;
  }

  // ../front/DEMO/naowee-organismos/shared/permissions.js
  var ACCIONES = Object.freeze({
    CREAR: "C",
    LEER: "R",
    EDITAR: "U",
    APROBAR: "A",
    SANCIONAR: "S",
    RETIRAR: "X"
  });
  var RECURSOS = Object.freeze([
    "comites",
    "federaciones",
    "ligas",
    "clubes",
    "deportistas",
    "solicitudes",
    "cargue",
    "auditoria"
  ]);
  var SCOPE = {
    MINDEPORTE: null,
    COMITE: "COC",
    FEDERACION: "FED-040",
    LIGA: "LIG-001",
    CLUB: "CLU-001",
    DEPORTISTA: "DEP-001"
  };
  var TIPO_DE_ROL = { COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club" };
  var CTX_KEY = "naowee-organismos-ctx-";
  function contextoDe(role) {
    if (!TIPO_DE_ROL[role]) return null;
    const valido = (id) => {
      const o = id && getOrganismo(id);
      return o && o.tipo === TIPO_DE_ROL[role] ? id : null;
    };
    let porUrl = null;
    try {
      porUrl = valido(new URLSearchParams(window.location.search).get("org"));
    } catch (_) {
    }
    if (porUrl) {
      try {
        sessionStorage.setItem(CTX_KEY + role, porUrl);
      } catch (_) {
      }
      return porUrl;
    }
    try {
      return valido(sessionStorage.getItem(CTX_KEY + role));
    } catch (_) {
      return null;
    }
  }
  function scopeFor(role) {
    const ctx = contextoDe(role);
    if (ctx) return ctx;
    return role in SCOPE ? SCOPE[role] : null;
  }
  var TER_DEFAULT = { depto: "Valle del Cauca" };
  function territorioDe(role) {
    if (role !== "TERRITORIAL") return null;
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

  // ../front/DEMO/naowee-organismos/shared/sidebar.js
  var ICONS = {
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
  var ROLES = {
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
  var NIVELES_JERARQUIA = [["comite", "Comit\xE9s"], ["federacion", "Federaciones"], ["liga", "Ligas"], ["club", "Clubes"], ["deportista", "Deportistas"]];
  var NIVEL_JERARQUIA_IDX = (n) => NIVELES_JERARQUIA.findIndex(([x]) => x === n);
  var NIVEL_PROPIO = { MINDEPORTE: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista", TERRITORIAL: "federacion" };
  function nivelesForRole(code) {
    const nivel = code === "TERRITORIAL" && (territorioDe(code) || {}).municipio ? "liga" : NIVEL_PROPIO[code];
    const propio = NIVEL_JERARQUIA_IDX(nivel);
    return NIVELES_JERARQUIA.slice(propio + 1).map(([n, label]) => ({ id: n, label }));
  }
  var jerarquiaItems = (code) => {
    const hijos = nivelesForRole(code);
    if (hijos.length === 1) return [];
    return [
      { id: "jerarquia", label: "Jerarqu\xEDa SND", icon: "sitemap", route: "jerarquia.html" },
      ...hijos.map(({ id, label }) => ({ id: `jerarquia-${id}`, label, icon: "level", route: `jerarquia.html?nivel=${id}`, child: true }))
    ];
  };
  var MENU_BY_ROLE = {
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
  var PERSONAS = {
    sandra: {
      userName: "Sandra Mej\xEDa",
      userEmail: "sandra.mejia@correo.demo.co",
      userDoc: "CC 31.567.890",
      avatar: "SM",
      contextos: [{ role: "LIGA", org: "LIG-001" }, { role: "LIGA", org: "LIG-006" }, { role: "FEDERACION", org: "FED-040" }]
    }
  };
  var PERSONA_KEY = "naowee-organismos-persona";
  var PERSONA_POR_ROL = { LIGA: "sandra" };
  function personaDe(roleCode) {
    let id = null;
    try {
      id = new URLSearchParams(window.location.search).get("como");
      if (id && (PERSONAS[id] || id === "org")) sessionStorage.setItem(PERSONA_KEY, id);
      else id = sessionStorage.getItem(PERSONA_KEY);
    } catch (_) {
    }
    if (id === "org") return null;
    if (!PERSONAS[id]) id = PERSONA_POR_ROL[roleCode] || null;
    const p = PERSONAS[id];
    return p && p.contextos.some((c) => c.role === roleCode) ? { id, ...p } : null;
  }
  var ROLE_DEFAULT = Object.fromEntries(Object.entries(ROLES).map(([k, r]) => [k, { userName: r.userName, org: r.org }]));
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
  var ROLES_ORGANISMO = ["COMITE", "FEDERACION", "LIGA", "CLUB"];
  function organismoNoActivo(code) {
    if (!ROLES_ORGANISMO.includes(code)) return null;
    const o = getOrganismo(scopeFor(code));
    return o && o.estado !== "Activo" ? o : null;
  }
  function homeForRole(code) {
    if (organismoNoActivo(code)) return "organismo-detalle.html";
    if (code === "CLUB") return "bandeja.html";
    if (code === "DEPORTISTA") return "perfil.html";
    if (code === "PERSONA") return "perfil.html";
    return "jerarquia.html";
  }
  var esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

  // ../front/DEMO/naowee-organismos/shared/entries/index.js
  try {
    Object.keys(sessionStorage).filter((k) => k === "naowee-organismos-persona" || k === "naowee-organismos-territorio" || k.startsWith("naowee-organismos-ctx-")).forEach((k) => sessionStorage.removeItem(k));
  } catch (_) {
  }
  var ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var order = ["MINDEPORTE", "TERRITORIAL", "COMITE", "FEDERACION", "LIGA", "CLUB", "DEPORTISTA", ...esLocal() ? ["PERSONA"] : []];
  var CTA = {
    MINDEPORTE: "Abrir jerarqu\xEDa",
    COMITE: "Abrir jerarqu\xEDa",
    FEDERACION: "Abrir jerarqu\xEDa",
    LIGA: "Abrir jerarqu\xEDa",
    TERRITORIAL: "Abrir jerarqu\xEDa",
    CLUB: "Abrir bandeja",
    DEPORTISTA: "Abrir mi perfil",
    PERSONA: "Abrir mi perfil"
  };
  document.getElementById("grid").innerHTML = order.map((code) => {
    const r = ROLES[code];
    const initials = r.avatar || r.userName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    const orgLine = r.org && r.org !== "\u2014" ? `<div class="role-card__org">${r.org}</div>` : "";
    return `
      <a class="role-card" href="${homeForRole(r.code)}?role=${r.code}" style="--role-color:${r.color}">
        <div class="role-card__top">
          <span class="role-card__avatar">${initials}</span>
          <div>
            <div class="role-card__name">${r.label}</div>
            ${orgLine}
            <div class="role-card__tag">${r.group}</div>
          </div>
        </div>
        <p class="role-card__desc">${r.short}.</p>
        <span class="role-card__cta">${CTA[code] || "Abrir"} ${ARROW}</span>
      </a>`;
  }).join("");
  var CASOS = [
    { color: "#7c3aed", quien: "Sandra Mej\xEDa \xB7 Liga", titulo: "Una persona, varios organismos", desc: "La franja \xABTrabajas en\xBB cambia entre sus dos ligas y la federaci\xF3n; avisa los pendientes de las otras.", href: "bandeja.html?role=LIGA&org=LIG-001&como=sandra" },
    { color: "#1f78d1", quien: "Sandra Mej\xEDa \xB7 Federaci\xF3n", titulo: "No decide sobre lo que tambi\xE9n administra", desc: "Desde la federaci\xF3n ve su propia liga marcada y no puede aprobarla ni devolverla (P-24).", href: "bandeja.html?role=FEDERACION&org=FED-040&como=sandra&f=Todos" },
    { color: "#1f8923", quien: "Club Ruedas del Sur", titulo: "Club preinscrito completa su registro", desc: "Lo carg\xF3 la liga; completa datos y documentos y lo env\xEDa a revisi\xF3n.", href: "organismo-detalle.html?role=CLUB&org=CLU-002&como=org" },
    { color: "#1f8923", quien: "Club Halcones de Tulu\xE1", titulo: "Club devuelto a correcci\xF3n", desc: "Ve el motivo de la liga, corrige y reenv\xEDa; vuelve a la bandeja de la liga.", href: "organismo-detalle.html?role=CLUB&org=CLU-012&como=org" },
    { color: "#1f8923", quien: "Club Rueda Libre Palmira", titulo: "Club suspendido, visto desde adentro", desc: "Su men\xFA queda en \xABMi organismo\xBB: qu\xE9 pas\xF3, el motivo y qu\xE9 puede hacer.", href: "organismo-detalle.html?role=CLUB&org=CLU-010&como=org" },
    { color: "#002B5B", quien: "Mar\xEDa F. Rojas \xB7 Ministerio", titulo: "El Ministerio sanciona un club", desc: "Suspender, reactivar (vuelve a revisi\xF3n) y cancelar el registro como acci\xF3n definitiva.", href: "organismo-detalle.html?role=MINDEPORTE&id=CLU-003" },
    { color: "#7c3aed", quien: "Sandra Mej\xEDa \xB7 Liga", titulo: "La liga registra un deportista y le propone club", desc: "Queda autodeclarado; la propuesta llega a la bandeja del club, que la confirma.", href: "deportistas.html?role=LIGA&org=LIG-001&como=sandra" },
    { color: "#1f8923", quien: "\xD3scar Cardona \xB7 Club", titulo: "El club confirma solicitudes y propuestas", desc: "Aprobar suma el club al deportista sin quitarle los que ya tiene.", href: "bandeja.html?role=CLUB" },
    { color: "#0e7490", quien: "Laura G\xF3mez \xB7 deportista, tutora y entrenadora", titulo: "La tutora registra a un menor", desc: "Mismo flujo de sports: documentos y datos b\xE1sicos. Queda en revisi\xF3n mientras se valida el parentesco.", href: "perfil.html?role=PERSONA&seccion=menores" },
    { color: "#0e7490", quien: "Laura G\xF3mez \xB7 deportista", titulo: "Afiliarse a un segundo club", desc: "Busca el club y pide afiliaci\xF3n; ve la cadena que hereda de cada club y puede retirarse de uno.", href: "perfil.html?role=PERSONA&seccion=afiliaciones" },
    { color: "#1f8923", quien: "\xD3scar Cardona \xB7 Club", titulo: "El club asocia a un autodeclarado", desc: "En \xABMis deportistas\xBB, \xABAsociar autodeclarado\xBB busca a quien ya est\xE1 en el SUID sin club.", href: "deportistas.html?role=CLUB" },
    { color: "#1f8923", quien: "\xD3scar Cardona \xB7 Club", titulo: "El club pide entrar a otra liga", desc: "Desde \xABMi organismo\xBB elige otra liga de su deporte; esa liga aprueba solo el v\xEDnculo (P-20).", href: "organismo-detalle.html?role=CLUB" },
    { color: "#b45309", quien: "Ana Luc\xEDa Valencia \xB7 Encargada departamental", titulo: "El territorio consulta su departamento", desc: "Ve las ligas y clubes ubicados en el Valle y sus deportistas, en solo lectura. No aprueba nada.", href: "jerarquia.html?role=TERRITORIAL&territorio=Valle del Cauca" },
    { color: "#b45309", quien: "Encargado municipal \xB7 Cali", titulo: "El municipio registra un deportista", desc: "Lo registra autodeclarado y le propone un club de su municipio; el club lo confirma.", href: "deportistas.html?role=TERRITORIAL&territorio=Cali" },
    { color: "#d74009", quien: "Camilo Duarte \xB7 Comit\xE9 Ol\xEDmpico", titulo: "Usuarios del organismo", desc: "Cuenta principal y usuarios internos: invita un gestor; el metod\xF3logo lo invita el gestor. Desactivar no borra.", href: "usuarios.html?role=COMITE" },
    { color: "#002B5B", quien: "Mar\xEDa F. Rojas \xB7 Ministerio", titulo: "Administradores y territoriales", desc: "Los administradores del Ministerio los crea Naowee; el Ministerio crea los usuarios territoriales.", href: "usuarios.html?role=MINDEPORTE" },
    { color: "#7c3aed", quien: "Sandra Mej\xEDa \xB7 Liga de Nataci\xF3n", titulo: "Un deportista en dos clubes", desc: "Mateo Restrepo patina en Cali y nada en Aguas del Valle: aparece en las dos ligas y cuenta una vez.", href: "deportistas.html?role=LIGA&org=LIG-006&como=sandra" }
  ];
  document.getElementById("casosGrid").innerHTML = CASOS.map((c) => `
    <a class="role-card" href="${c.href}" style="--role-color:${c.color}">
      <div class="role-card__top"><div>
        <div class="role-card__name">${c.titulo}</div>
        <div class="role-card__org">${c.quien}</div>
      </div></div>
      <p class="role-card__desc">${c.desc}</p>
      <span class="role-card__cta">Abrir ${ARROW}</span>
    </a>`).join("");
})();
