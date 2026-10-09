(() => {
  // shared/organismos-data.js
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
    { id: "FED-P01", tipo: "federacion", nombre: "Federaci\xF3n Paral\xEDmpica de Atletismo", nit: "901500001-1", sector: "Paral\xEDmpico", deporte: "Atletismo", parentId: "CPC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000201", nombre: "Laura", apellido: "Mendoza R\xEDos", correo: "presidencia@fedeparaatletismo.demo.co" }, ubicacion: { depto: "Cundinamarca", ciudad: "Bogot\xE1", zona: "Urbana", direccion: "Calle 63 # 47-06 Of. 201" }, contacto: { telefono: "6014809090", correo: "contacto@fedeparaatletismo.demo.co" }, fechaRegistro: "2026-02-18" },
    { id: "FED-P02", tipo: "federacion", nombre: "Federaci\xF3n Colombiana de Nataci\xF3n Paral\xEDmpica", nit: "901500002-2", sector: "Paral\xEDmpico", deporte: "Nataci\xF3n", parentId: "CPC", estado: "En revisi\xF3n", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000202", nombre: "Diego", apellido: "Vargas Pe\xF1a", correo: "presidencia@fedeparanatacion.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Cali", zona: "Urbana", direccion: "Cra. 36 # 5B-62" }, contacto: { telefono: "6024889090", correo: "contacto@fedeparanatacion.demo.co" }, fechaRegistro: "2026-05-09" },
    { id: "FED-S01", tipo: "federacion", nombre: "Federaci\xF3n Deportiva de Sordos de Baloncesto", nit: "901500003-3", sector: "Sordol\xEDmpico", deporte: "Baloncesto", parentId: "FSC", estado: "Activo", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000203", nombre: "Sof\xEDa", apellido: "Guerrero Le\xF3n", correo: "presidencia@fedesordosbaloncesto.demo.co" }, ubicacion: { depto: "Antioquia", ciudad: "Medell\xEDn", zona: "Urbana", direccion: "Cra. 48 # 20-114 Of. 3" }, contacto: { telefono: "6045553030", correo: "contacto@fedesordosbaloncesto.demo.co" }, fechaRegistro: "2026-03-28" }
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
    { id: "CLU-010", tipo: "club", nombre: "Club Rueda Libre Palmira", nit: "805020010-0", sector: "Ol\xEDmpico", deporte: "Patinaje", tipoClub: "escuela", parentId: "LIG-001", estado: "Suspendido", ficticio: true, repLegal: { tipoDoc: "CC", numDoc: "10000410", nombre: "Andr\xE9s", apellido: "Caicedo Mora", correo: "admin@ruedalibrepalmira.demo.co" }, ubicacion: { depto: "Valle del Cauca", ciudad: "Palmira", zona: "Urbana", direccion: "Calle 31 # 29-10" }, contacto: { telefono: "6025101010", correo: "contacto@ruedalibrepalmira.demo.co" }, fechaRegistro: "2026-01-28" }
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
    { id: "DEP-021", nombre: "Luciana Palacio Hoyos", tipoDoc: "TI", numDoc: "1029223344", deporte: "Patinaje", modalidad: "Freestyle", correo: "luciana.palacio@correo.demo.co", clubId: "CLU-001", estado: "vinculado" }
  ];
  var SEED_ORGANISMOS = [
    ...COMITES,
    ...FEDERACIONES_COC,
    ...FEDERACIONES_FICTICIAS,
    ...LIGAS,
    ...CLUBES
  ];
  var SEED_DEPORTISTAS = DEPORTISTAS;
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
    const base = SEED_ORGANISMOS.map((o) => applyOverride(o, overrides));
    const extra = nuevos.map((o) => ({ ...o }));
    return [...base, ...extra];
  }
  function getOrganismo(id) {
    return allOrganismos().find((o) => o.id === id) || null;
  }
  function allDeportistas() {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const ov = readStore("deportistas-overrides", {}) || {};
    const base = SEED_DEPORTISTAS.map((d) => ov[d.id] ? { ...d, ...ov[d.id] } : { ...d });
    return [...base, ...nuevos.map((d) => ({ ...d }))];
  }
  var ID_PREFIX = { comite: "COM", federacion: "FED", liga: "LIG", club: "CLU" };
  function nextOrgId(tipo) {
    const prefix = ID_PREFIX[tipo] || "ORG";
    const nuevos = readStore("organismos-nuevos", []) || [];
    const n = nuevos.filter((o) => o.tipo === tipo).length + 1;
    return `${prefix}-N${String(n).padStart(3, "0")}`;
  }
  function addOrganismo(org) {
    const nuevos = readStore("organismos-nuevos", []) || [];
    const record = {
      estado: "Preinscrito",
      ficticio: true,
      fechaRegistro: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      ...org,
      id: org.id || nextOrgId(org.tipo)
    };
    nuevos.push(record);
    writeStore("organismos-nuevos", nuevos);
    return { ...record };
  }
  function activosDeTipo(tipo) {
    return allOrganismos().filter((o) => o.tipo === tipo && o.estado === "Activo").sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((o) => ({ ...o }));
  }
  function comitePorSector(sector) {
    return allOrganismos().find((o) => o.tipo === "comite" && o.sector === sector) || null;
  }
  function auditLog(entry) {
    const list = readStore("audit", []) || [];
    const record = { id: "AU-" + String(list.length + 1).padStart(4, "0"), ...entry };
    list.unshift(record);
    writeStore("audit", list);
    return { ...record };
  }

  // shared/devnotes.js?v=1.5.0
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

  // shared/registro-publico.js
  var esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m]);
  var norm = (s) => [...String(s == null ? "" : s)].map((c) => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()).join("");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function applyMask(type, raw) {
    if (!raw) return "";
    if (type === "tel") return String(raw).replace(/[^0-9+\-()\s]/g, "");
    if (type === "numeric") return String(raw).replace(/[^0-9]/g, "");
    if (type === "email") return String(raw).replace(/\s/g, "").toLowerCase();
    return String(raw);
  }
  function fileSizeFmt(b) {
    return b < 1024 ? b + " B" : b < 1048576 ? (b / 1024).toFixed(0) + " KB" : (b / 1048576).toFixed(1) + " MB";
  }
  var I = {
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
  var edadDe = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return null;
    const hoy = /* @__PURE__ */ new Date();
    let e = hoy.getFullYear() - +m[1];
    const mo = hoy.getMonth() + 1 - +m[2];
    if (mo < 0 || mo === 0 && hoy.getDate() < +m[3]) e--;
    return e;
  };
  var edadTxt = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    if (!m) return "";
    const hoy = /* @__PURE__ */ new Date();
    let meses = (hoy.getFullYear() - +m[1]) * 12 + (hoy.getMonth() + 1 - +m[2]);
    if (hoy.getDate() < +m[3]) meses--;
    return meses < 0 ? "" : `${Math.floor(meses / 12)} a\xF1os ${meses % 12} meses`;
  };
  I.person = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7v1"/></svg>';
  I.company = I.entity;
  I.guardian = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M2 21v-2a5 5 0 0 1 10 0v2"/><path d="M13 21v-1.5a4 4 0 0 1 8 0V21"/></svg>';
  I.trophy = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/></svg>';
  I.flag = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4"/><path d="M4 4h12l-2 4 2 4H4"/></svg>';
  I.shield = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  I.spin = '<svg class="rp-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9"/></svg>';
  var opt = (arr) => arr.map((x) => Array.isArray(x) ? { v: x[0], t: x[1] } : { v: x, t: x });
  var CAT = {
    tipoDoc: opt([["CC", "CC"], ["CE", "CE"], ["PA", "PA"]]),
    sexo: opt([["H", "Hombre"], ["M", "Mujer"]]),
    nacionalidad: opt([["CO", "Colombia"], ["VE", "Venezuela"], ["EC", "Ecuador"], ["PE", "Per\xFA"], ["BR", "Brasil"], ["AR", "Argentina"], ["MX", "M\xE9xico"], ["US", "Estados Unidos"], ["ES", "Espa\xF1a"], ["OT", "Otro pa\xEDs"]]),
    rolApoyo: opt(["Asistente T\xE9cnico", "Auxiliar Discapacidad", "Delegado", "Directivo", "Docente/Asistente", "Docente/Entrenador", "Fisioterapeuta", "Kinesi\xF3logo", "M\xE9dico", "Otros", "Preparador F\xEDsico", "Preparador de Porteros", "Utilero"]),
    tipoDeporte: opt([["CONJ", "Conjunto"], ["IND", "Individual"], ["PARA", "Paradeporte"]]),
    genero: opt(["Femenino", "Masculino", "Transg\xE9nero", "No binario", "No aplica", "Otra"]),
    orientacion: opt(["Ag\xE9nero", "Arrom\xE1ntico", "Asexual", "Bisexual", "Gay", "Heterosexual", "Intersexual", "Lesbiana", "No aplica", "Otra", "Prefiero no decirlo", "Queer", "Transexual"]),
    discapacidad: opt(["Ninguna", "Auditiva", "F\xEDsica", "Intelectual (Cognitiva)", "M\xFAltiple", "No aplica", "Par\xE1lisis Cerebral", "Prefiero no decirlo", "Psicosocial", "Sordo-Ceguera", "Visual"]),
    etnia: opt([["NIN", "Ninguna de las anteriores"], ["CAM", "Comunidades campesinas"], ["ROM", "Gitanos o Rrom"], ["AFRO", "Negro(a) afrodescendiente afrocolombiano(a)"], ["NA", "No aplica"], ["OTR", "Otro"], ["PAL", "Palenquero(a)"], ["PND", "Prefiero no decirlo"], ["IND", "Pueblos ind\xEDgenas (IND)"], ["RAI", "Raizales"]]),
    comunidad: opt(["Ninguno", "Ambik\xE1 Pijao", "Arhuacos", "Aw\xE1", "Ember\xE1 Cham\xED", "Nasa", "Wayuu", "Zen\xFA"]),
    victima: opt([["YES", "S\xED"], ["NO", "No"], ["NA", "No aplica"], ["PND", "Prefiero no decirlo"]]),
    priorizacion: opt(["Mujeres en estado de embarazo", "Personas adultas mayores", "Periodistas", "Ni\xF1os ni\xF1as y adolescentes", "Personas con Discapacidad", "Veteranos de la fuerza p\xFAblica", "Ninguno"]),
    victimizacion: opt(["Ninguna", "Abandono o despojo forzado de tierras", "Acto terrorista / atentados / combates / enfrentamientos / hostigamientos", "Amenaza", "Homicidio masacre", "Minas antipersonal, munici\xF3n sin explotar, artefacto explosivo improvisado", "Perdida de bienes muebles o inmuebles", "Vinculaci\xF3n ni\xF1os ni\xF1as adolescentes a actividades relacionadas con grupos armados"]),
    zona: opt([["U", "Urbano"], ["R", "Rural"]]),
    naturaleza: opt(["P\xFAblica", "Privada", "Mixta"]),
    tamano: opt(["Micro, peque\xF1as y medianas empresas", "Grandes Empresas", "Organizaciones sin \xE1nimo de lucro", "No aplica"]),
    sector: opt([["Ol\xEDmpico", "Ol\xEDmpico"], ["Paral\xEDmpico", "Paral\xEDmpico"], ["Sordol\xEDmpico", "Sordol\xEDmpico"]]),
    ambito: opt([["departamental", "Departamental"], ["distrital", "Distrital"]]),
    tipoClub: opt([["promotor", "Club promotor"], ["profesional", "Club profesional"], ["escuela", "Escuela deportiva"]])
  };
  var MUNICIPIOS = {
    "Antioquia": ["Medell\xEDn", "Bello", "Itag\xFC\xED", "Envigado", "Rionegro", "Apartad\xF3"],
    "Atl\xE1ntico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"],
    "Bogot\xE1 D.C.": ["Bogot\xE1"],
    "Bol\xEDvar": ["Cartagena", "Magangu\xE9", "Turbaco"],
    "Boyac\xE1": ["Tunja", "Duitama", "Sogamoso"],
    "Caldas": ["Manizales", "La Dorada", "Chinchin\xE1"],
    "Cundinamarca": ["Soacha", "Facatativ\xE1", "Zipaquir\xE1", "Ch\xEDa", "Girardot", "Fusagasug\xE1"],
    "Meta": ["Villavicencio", "Acac\xEDas", "Granada"],
    "Nari\xF1o": ["Pasto", "Tumaco", "Ipiales"],
    "Risaralda": ["Pereira", "Dosquebradas", "Santa Rosa de Cabal"],
    "Santander": ["Bucaramanga", "Floridablanca", "Gir\xF3n", "Barrancabermeja"],
    "Tolima": ["Ibagu\xE9", "Espinal", "Melgar"],
    "Valle del Cauca": ["Cali", "Buenaventura", "Palmira", "Tulu\xE1", "Cartago", "Buga", "Jamund\xED"]
  };
  var DEPTOS = Object.keys(MUNICIPIOS).sort((a, b) => a.localeCompare(b, "es"));
  var DEPORTES_POR_FED = {
    "FED-038": ["Nataci\xF3n", "Nataci\xF3n Art\xEDstica", "Polo Acu\xE1tico"],
    "FED-040": ["Patinaje", "Patinaje Art\xEDstico", "Patinaje de Velocidad"]
  };
  var deportesDe = (org) => {
    if (!org) return [];
    if (Array.isArray(org.deportes) && org.deportes.length) return org.deportes;
    if (DEPORTES_POR_FED[org.id]) return DEPORTES_POR_FED[org.id];
    return org.deporte && org.deporte !== "\u2014" ? [org.deporte] : [];
  };
  var FEDERACIONES = () => allOrganismos().filter((o) => o.tipo === "federacion");
  var SIN_FEDERACION = ["Breaking", "Flag Football", "P\xE1del", "Skateboarding"];
  var CATALOGO_DEPORTES = () => [.../* @__PURE__ */ new Set([...FEDERACIONES().flatMap(deportesDe), ...SIN_FEDERACION])].sort((a, b) => a.localeCompare(b, "es"));
  var duenoDeporte = (dep, sector) => FEDERACIONES().find((f) => f.sector === sector && deportesDe(f).includes(dep) && !["Rechazado", "Cancelado"].includes(f.estado));
  var CONJUNTO = ["Baloncesto", "Balonmano", "B\xE9isbol", "F\xFAtbol", "F\xFAtbol de Sal\xF3n", "Hockey", "Polo Acu\xE1tico", "Rugby", "Softbol", "Voleibol"];
  var deportesPorTipo = (t) => {
    const all = CATALOGO_DEPORTES();
    if (t === "CONJ") return all.filter((d) => CONJUNTO.includes(d));
    if (t === "PARA") return ["Boccia", "Goalball", "Para Atletismo", "Para Nataci\xF3n", "Baloncesto en silla de ruedas"];
    return all.filter((d) => !CONJUNTO.includes(d));
  };
  var DOC_MENOR = "1098765432";
  var DOC_SIN_RECLAMAR = "1055512345";
  var SIN_RECLAMAR = { emailHint: "ju\u2022\u2022\u2022\u2022\u2022z@colegiosanjose.edu.co" };
  var docConCuenta = (num) => allDeportistas().some((d) => String(d.numDoc) === String(num).trim()) || allOrganismos().some((o) => o.repLegal && String(o.repLegal.numDoc) === String(num).trim());
  var ROL_TXT = { ATHLETE: "Deportista", LEGAL_GUARDIAN: "Tutor", SUPPORT_STAFF: "Personal deportivo" };
  var ENT_TXT = { federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
  var SUPERIOR_TXT = { federacion: "comit\xE9", liga: "federaci\xF3n", club: "liga" };
  var ROL_DE_ANCLA = { COC: "COMITE", "FED-040": "FEDERACION", "LIG-001": "LIGA" };
  var blankD = () => ({
    tipoDoc: "CC",
    numDoc: "",
    nombre: "",
    segNombre: "",
    apellido: "",
    segApellido: "",
    fechaNac: "",
    rolApoyo: "",
    sexo: "",
    nacionalidad: "CO",
    tipoDeporte: "",
    deporte: "",
    genero: "",
    orientacion: "",
    discapacidad: "",
    etnia: "",
    comunidad: "",
    victima: "",
    priorizacion: "",
    victimizacion: "",
    depto: "",
    ciudad: "",
    zona: "",
    direccion: "",
    telefono: "",
    correo: "",
    nit: "",
    entNombre: "",
    naturaleza: "",
    tamano: "",
    sector: "",
    superiorId: "",
    filtroDeporte: "",
    deportes: [],
    ambito: "",
    tipoClub: "",
    repTipoDoc: "CC",
    repDoc: "",
    repNombre: "",
    repApellido: "",
    repCorreo: "",
    docs: {},
    aceptaPoliticas: false,
    aceptaComunicaciones: false
  });
  var STATE = { step: 0, created: false, _armedStep: null, nature: null, role: null, entTipo: null, lookup: "idle", nitLookup: "idle", claim: null, result: null, d: blankD() };
  var root = () => document.getElementById("rpRoot");
  var isAthlete = () => STATE.role === "ATHLETE";
  function stepDefs() {
    if (STATE.nature === "entidad") return [["nature", null], ["enttipo", null], ["entbasicos", "B\xE1sicos"], ["entdocs", "Documentos"], ["contacto", "Sede y contacto"], ["result", null]];
    const s = [["nature", null], ["role", null], ["basicos", "B\xE1sicos"]];
    if (isAthlete()) s.push(["deportivos", "Deportivos"]);
    return s.concat([["socio", "Sociodemogr\xE1fico"], ["contacto", "Contacto"], ["result", null]]);
  }
  var stepKey = () => (stepDefs()[STATE.step] || ["result"])[0];
  var lastStep = () => stepDefs().length - 2;
  var DD_RERENDER = {
    depto: () => {
      STATE.d.ciudad = "";
    },
    tipoDeporte: () => {
      STATE.d.deporte = "";
    },
    etnia: () => {
      if (STATE.d.etnia !== "IND") STATE.d.comunidad = "";
    },
    victima: () => {
      if (STATE.d.victima !== "YES") STATE.d.victimizacion = "";
    },
    sector: () => {
      STATE.d.deportes = [];
    },
    superiorId: () => {
      STATE.d.deportes = [];
    },
    filtroDeporte: () => {
      STATE.d.superiorId = "";
      STATE.d.deportes = [];
    },
    tipoDoc: () => {
      STATE.lookup = "idle";
    },
    fechaNac: () => {
    }
  };
  var SELECT_STEPS = ["nature", "role", "enttipo"];
  var isSelectStep = () => SELECT_STEPS.includes(stepKey());
  I.arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  I.wand = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 3l1.8 4.7L17.5 9.5l-4.7 1.8L11 16l-1.8-4.7L4.5 9.5l4.7-1.8z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/></svg>';
  I.arrowL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
  function header() {
    const k = stepKey();
    let title = "Crear cuenta", sub = "Comienza indicando si eres persona natural o entidad jur\xEDdica", crumb = "";
    if (k === "nature") {
    } else if (STATE.nature === "persona") {
      sub = k === "role" ? "Reg\xEDstrate como deportista, tutor o personal deportivo" : "Reg\xEDstrate con tu documento de identidad";
      if (k !== "role" && STATE.role) {
        title = `Registro como ${ROL_TXT[STATE.role]}`;
        crumb = ROL_TXT[STATE.role];
      }
    } else if (STATE.nature === "entidad") {
      sub = "Registra tu federaci\xF3n, liga o club";
      if (k !== "enttipo" && STATE.entTipo) {
        title = `Registro como ${ENT_TXT[STATE.entTipo]}`;
        crumb = ENT_TXT[STATE.entTipo];
      }
    }
    STATE._view = title;
    const center = isSelectStep();
    return `<div class="ur-head${center ? " ur-head--center" : ""}">
      ${crumb ? `<div class="ur-crumbs">Registro ${I.chevR} ${esc(crumb)} ${I.chevR} <b>Formulario</b></div>` : ""}
      <h1 class="ur-title">${esc(title)}</h1><p class="ur-sub">${esc(sub)}</p>
    </div>
    <div class="ur-devnote-wrap${center ? " ur-devnote-wrap--center" : ""}"><button type="button" class="ur-fill" id="rpFill" aria-label="Llenar este paso con datos de ejemplo" title="Solo demo \xB7 llenar este paso con datos de ejemplo">${I.wand}</button><span class="wz-devnote" tabindex="0" role="button" data-devnote="${k}"></span></div>`;
  }
  function render() {
    if (STATE.created) {
      setView("Registro");
      return renderResult();
    }
    root().innerHTML = `
    <div class="reg-wizard" id="rpWizard">
      ${header()}
      ${isSelectStep() ? "" : '<div class="ur-stepper" id="rpStepper"></div>'}
      <div class="reg-pane" id="rpPane"></div>
      <div id="rpFooter"></div>
    </div>`;
    renderStepper();
    renderPane();
    renderFooter();
    bindPane();
    setView(STATE._view);
    syncTopbar();
  }
  function syncTopbar() {
    const top = document.getElementById("urTop");
    if (!top) return;
    const t = document.querySelector(".ur-title");
    top.classList.toggle("is-stuck", window.scrollY > 0);
    top.classList.toggle("is-view", !!t && t.getBoundingClientRect().bottom < top.offsetHeight);
  }
  function setView(txt) {
    const v = document.getElementById("urView");
    if (v) v.textContent = txt;
  }
  window.addEventListener("scroll", syncTopbar, { passive: true });
  window.addEventListener("resize", syncTopbar);
  (() => {
    const btn = document.getElementById("urMenuBtn"), pop = document.getElementById("urMenuPop");
    if (!btn) return;
    const close = () => {
      pop.hidden = true;
      btn.setAttribute("aria-expanded", "false");
    };
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      pop.hidden = !pop.hidden;
      btn.setAttribute("aria-expanded", String(!pop.hidden));
    });
    document.addEventListener("click", (e) => {
      if (!pop.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  })();
  function renderStepper() {
    const wrap = document.getElementById("rpStepper");
    if (!wrap) return;
    const labeled = stepDefs().filter(([, l]) => l);
    const cur = labeled.findIndex(([k]) => k === stepKey());
    wrap.innerHTML = labeled.map(([, lbl], i) => `${i > 0 ? `<span class="ur-step-line${i <= cur ? " ur-step-line--done" : ""}"></span>` : ""}<div class="ur-step${i < cur ? " ur-step--done" : i === cur ? " ur-step--active" : ""}"><span class="ur-step__n">${i < cur ? I.check : i + 1}</span><span class="ur-step__l">${lbl}</span></div>`).join("");
  }
  function renderPane() {
    const panes = { nature: paneNature, role: paneRole, basicos: paneBasicos, deportivos: paneDeportivos, socio: paneSocio, contacto: paneContacto, enttipo: paneEntTipo, entbasicos: paneEntBasicos, entdocs: paneEntDocs };
    document.getElementById("rpPane").innerHTML = panes[stepKey()]();
  }
  function renderFooter() {
    var _a;
    const f = document.getElementById("rpFooter");
    const k = stepKey();
    const sel = k === "nature" ? STATE.nature : k === "role" ? STATE.role : k === "enttipo" ? STATE.entTipo : true;
    const label = k === "role" ? "Comenzar registro" : STATE.step === lastStep() ? "Crear cuenta" : "Siguiente";
    const back = STATE.step > 0 ? `<button type="button" class="ur-back" id="rpBack">${I.chevL} Volver</button>` : "";
    const pct = Math.round((STATE.step + 1) / (stepDefs().length - 1) * 100);
    f.innerHTML = `${isSelectStep() ? '<p class="ur-legal"><a href="#" onclick="return false">Pol\xEDtica de privacidad</a> y <a href="#" onclick="return false">T\xE9rminos y condiciones</a></p>' : ""}
    <div class="ur-bar"><div class="ur-bar__progress" role="progressbar" aria-label="Avance de la inscripci\xF3n" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><span style="width:${pct}%"></span></div>
    <div class="ur-actions">${back}<button type="button" class="ur-btn${k === "nature" ? " ur-btn--block" : ""}" id="rpNext" ${sel ? "" : "disabled"}>${label} ${label === "Siguiente" ? I.chevR : I.arrowR}</button></div></div>`;
    document.getElementById("rpNext").addEventListener("click", next);
    (_a = document.getElementById("rpBack")) == null ? void 0 : _a.addEventListener("click", () => {
      STATE._armedStep = null;
      STATE.step = Math.max(0, STATE.step - 1);
      render();
    });
  }
  function cards(key, items, value) {
    return `<div class="ur-cards">${items.map((t) => `
    <button type="button" class="ur-card ${value === t.v ? "is-selected" : ""}" data-card="${key}" data-value="${t.v}">
      ${t.icon}<span class="ur-card__t">${t.t}</span><span class="ur-card__d">${t.d}</span>
    </button>`).join("")}</div>`;
  }
  function paneNature() {
    return cards("nature", [
      { v: "persona", icon: I.person, t: "Persona", d: "Natural" },
      { v: "entidad", icon: I.company, t: "Entidad", d: "Jur\xEDdica" }
    ], STATE.nature);
  }
  function paneRole() {
    return cards("role", [
      { v: "ATHLETE", icon: I.athlete, t: "Ciudadano", d: "Deportista" },
      { v: "LEGAL_GUARDIAN", icon: I.guardian, t: "Padre", d: "Tutor" },
      { v: "SUPPORT_STAFF", icon: I.staff, t: "Personal", d: "Deportivo" }
    ], STATE.role);
  }
  function paneEntTipo() {
    return `${cards("entTipo", [
      { v: "federacion", icon: I.trophy, t: "Federaci\xF3n", d: "Nacional" },
      { v: "liga", icon: I.flag, t: "Liga", d: "Departamental" },
      { v: "club", icon: I.shield, t: "Club", d: "Municipal" }
    ], STATE.entTipo)}
  ${msg("informative", "\xBFEres un comit\xE9 o un ente territorial?", "Los comit\xE9s los crea el Ministerio del Deporte. Los entes departamentales y municipales tambi\xE9n los crea el Ministerio al invitarlos a sus eventos. No se registran por este formulario.")}`;
  }
  function lookupBox() {
    const st = STATE.lookup;
    if (st === "checking") return `<div class="rp-lookup">${I.spin} Consultando registro en la base de datos...</div>`;
    if (st === "ok" && STATE.claim) return `<div class="rp-lookup rp-lookup--ok">${I.check} Vas a reclamar tu perfil. Completa o corrige tus datos; el correo se mantiene.</div>`;
    if (st === "ok") return `<div class="rp-lookup rp-lookup--ok">${I.check} No encontramos registros previos. Por favor completa el formulario.</div>`;
    return "";
  }
  function paneBasicos() {
    const d = STATE.d, st = STATE.lookup;
    const locked = st !== "ok";
    const docField = `<div class="rp-doc" data-field="f-numDoc">
      <label class="naowee-textfield__label naowee-textfield__label--required">Tipo de documento</label>
      <div class="rp-doc__row">${ddInline("tipoDoc", CAT.tipoDoc, d.tipoDoc)}
        <div class="naowee-textfield__input-wrap"><input id="f-numDoc" class="naowee-textfield__input" placeholder="# Documento" inputmode="numeric" value="${esc(d.numDoc)}" data-model="numDoc" data-mask="numeric" maxlength="12"></div></div>
      ${lookupBox()}
      <p class="rp-demo-hint">Solo demo \xB7 prueba <button type="button" class="rp-demo-fill" data-fill="numDoc" data-value="${DOC_MENOR}">${DOC_MENOR}</button> (menor de edad), <button type="button" class="rp-demo-fill" data-fill="numDoc" data-value="${DOC_SIN_RECLAMAR}">${DOC_SIN_RECLAMAR}</button> (perfil sin reclamar) <button type="button" class="rp-demo-fill" data-fill="numDoc" data-value="1144556778">1144556778</button> (ya tiene cuenta) o <button type="button" class="rp-demo-fill" data-fill="numDoc" data-ok="1" data-value="1020304050">1020304050</button> (sin registro: puede avanzar).</p>
    </div>`;
    if (st === "minor") return `${isAthlete() ? minorInfo() : ""}<div class="reg-form">${docField}</div>${minorAlert("Por normativa, el registro debe completarlo su padre, madre o tutor legal.")}`;
    if (st === "hasLogin") return `<div class="reg-form">${docField}</div>${hasLoginAlert()}`;
    if (st === "unclaimed") return `<div class="reg-form">${docField}</div>${unclaimedAlert()}`;
    if (st === "notMine") return `<div class="reg-form">${docField}</div>${notMineAlert()}`;
    if (locked) return `${isAthlete() ? minorInfo() : ""}<div class="reg-form">${docField}</div>`;
    const edad = edadDe(d.fechaNac);
    const menorPorFecha = edad != null && edad < 18;
    return `${isAthlete() ? minorInfo() : ""}
    <form class="reg-form rp-form-wide${locked ? " rp-locked" : ""}" onsubmit="return false">
      ${docField}
      <div class="reg-grid-2">
        ${tf({ id: "f-nombre", label: "Nombre", required: true, path: "nombre", value: d.nombre, placeholder: "Primer nombre" })}
        ${tf({ id: "f-segNombre", label: "Segundo nombre", path: "segNombre", value: d.segNombre, placeholder: "Segundo nombre" })}
        ${tf({ id: "f-apellido", label: "Apellido", required: true, path: "apellido", value: d.apellido, placeholder: "Primer apellido" })}
        ${tf({ id: "f-segApellido", label: "Segundo apellido", path: "segApellido", value: d.segApellido, placeholder: "Segundo apellido" })}
        ${dateField({ id: "f-fechaNac", label: "Fecha de nacimiento", required: true, path: "fechaNac" })}
        <div class="naowee-textfield"><label class="naowee-textfield__label">Edad</label><div class="naowee-textfield__input-wrap"><input class="naowee-textfield__input" disabled value="${esc(edadTxt(d.fechaNac))}"></div></div>
        ${STATE.role === "SUPPORT_STAFF" ? dd("rolApoyo", "Rol espec\xEDfico", CAT.rolApoyo, d.rolApoyo, true, true) : ""}
        ${dd("sexo", "Sexo", CAT.sexo, d.sexo, true)}
        ${dd("nacionalidad", "Nacionalidad", CAT.nacionalidad, d.nacionalidad, true, true)}
      </div>
      ${menorPorFecha && STATE.role !== "LEGAL_GUARDIAN" ? minorAlert(`Encontramos que tiene ${edad} a\xF1os y eres menor de edad. Por normativa, el registro debe completarlo su padre, madre o tutor legal.`) : ""}
      ${menorPorFecha && STATE.role === "LEGAL_GUARDIAN" ? msg("negative", "Debes ser mayor de edad", "El padre, madre o tutor que se registra debe tener 18 a\xF1os o m\xE1s.") : ""}
      ${isAthlete() ? "" : consentChecks()}
    </form>`;
  }
  function unclaimedAlert() {
    return `<div class="naowee-message naowee-message--informative rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body">
    <p class="naowee-message__title">Ya tenemos un registro con este documento</p>
    <p class="naowee-message__text">Est\xE1 asociado al correo <strong>${esc(SIN_RECLAMAR.emailHint)}</strong>. Si es tuyo, completa el registro para reclamar tu perfil: tus datos se actualizan con lo que ingreses y el correo se mantiene.</p>
    <div class="rp-alert__actions"><button type="button" class="ur-btn" data-act="claim">Continuar con este correo</button><button type="button" class="ur-back" data-act="notMine">Ese correo no es m\xEDo</button></div>
  </div></div>`;
  }
  function notMineAlert() {
    return `<div class="naowee-message naowee-message--caution rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body">
    <p class="naowee-message__title">Escr\xEDbenos para cambiar el correo</p>
    <p class="naowee-message__text">Por seguridad, el correo de un perfil existente no se cambia desde este formulario. Escribe a <strong>soporte@naowee.com</strong> con tu tipo y n\xFAmero de documento (${esc(STATE.d.tipoDoc)} ${esc(STATE.d.numDoc)}) y una foto de tu documento de identidad; verificamos que eres t\xFA y actualizamos el correo.</p>
    <div class="rp-alert__actions"><button type="button" class="ur-back" data-act="backToClaim">Volver</button></div>
  </div></div>`;
  }
  function minorInfo() {
    return msg("informative", "", "Si eres menor de edad, el registro debe realizarlo tu padre, madre o tutor.");
  }
  function minorAlert(text) {
    return `<div class="naowee-message naowee-message--caution rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Deportista menor de edad detectado/a</p><p class="naowee-message__text">${esc(text)}</p>
    <button type="button" class="naowee-btn naowee-btn--loud naowee-btn--small" data-act="asTutor" style="margin-top:10px">Continuar como padre/tutor</button></div></div>`;
  }
  function hasLoginAlert() {
    return `<div class="naowee-message naowee-message--informative rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Ya tienes una cuenta registrada</p><p class="naowee-message__text">Hemos detectado que este n\xFAmero de documento ya est\xE1 asociado a una cuenta. Inicia sesi\xF3n o, si olvidaste tu contrase\xF1a, utiliza el enlace \xAB\xBFOlvidaste tu contrase\xF1a?\xBB para recuperarla.</p>
    <a class="naowee-btn naowee-btn--loud naowee-btn--small" href="index.html" style="margin-top:10px">Iniciar sesi\xF3n</a></div></div>`;
  }
  function consentChecks() {
    return `<div class="rp-checks">
    ${checkbox("aceptaPoliticas", "f-politicas", "He le\xEDdo y acepto las <strong>Pol\xEDticas de Privacidad</strong> y el uso de datos gubernamentales para verificaci\xF3n.")}
    ${checkbox("aceptaComunicaciones", "f-comunicaciones", "Acepto recibir comunicaciones relacionadas con eventos y convocatorias.")}
  </div>`;
  }
  function checkbox(model, id, html) {
    return `<label class="naowee-checkbox" data-field="${id}" id="${id}"><input type="checkbox" ${STATE.d[model] ? "checked" : ""} data-check="${model}"><span class="naowee-checkbox__box">${I.check}</span><span class="naowee-checkbox__label">${html}</span></label>`;
  }
  function paneDeportivos() {
    const d = STATE.d;
    return `<form class="reg-form" onsubmit="return false">
    ${dd("tipoDeporte", "Tipo de deporte", CAT.tipoDeporte, d.tipoDeporte, true)}
    ${d.tipoDeporte ? dd("deporte", "Deporte", opt(deportesPorTipo(d.tipoDeporte)), d.deporte, true, true) : ddDisabled("Deporte")}
    ${msg("informative", "", "Quedar\xE1s registrado como <strong>deportista autodeclarado</strong>. Desde tu perfil podr\xE1s solicitar afiliaci\xF3n a uno o varios clubes.")}
    ${consentChecks()}
  </form>`;
  }
  function paneSocio() {
    const d = STATE.d;
    return `<p class="reg-pane__sub">Completa tu informaci\xF3n sociodemogr\xE1fica</p>
  <form class="reg-form rp-form-wide" onsubmit="return false"><div class="reg-grid-2">
    ${dd("genero", "Identidad de g\xE9nero", CAT.genero, d.genero, true)}
    ${dd("orientacion", "Orientaci\xF3n sexual", CAT.orientacion, d.orientacion, true)}
    ${dd("discapacidad", "Discapacidad", CAT.discapacidad, d.discapacidad, true)}
    ${dd("etnia", "Pertenencia \xE9tnica", CAT.etnia, d.etnia, true)}
    ${d.etnia === "IND" ? dd("comunidad", "Comunidad ind\xEDgena", CAT.comunidad, d.comunidad, true, true) : ""}
    ${dd("victima", "V\xEDctima del conflicto armado", CAT.victima, d.victima, true)}
    ${dd("priorizacion", "Priorizaci\xF3n", CAT.priorizacion, d.priorizacion, true)}
    ${d.victima === "YES" ? dd("victimizacion", "Tipo de victimizaci\xF3n", CAT.victimizacion, d.victimizacion, true) : ""}
  </div></form>`;
  }
  function paneContacto() {
    const d = STATE.d;
    const ent = STATE.nature === "entidad";
    return `<form class="reg-form rp-form-wide" onsubmit="return false">
    ${ent ? `<p class="reg-pane__sub">${STATE.entTipo === "club" ? "El municipio de la sede ubica al club en la jerarqu\xEDa territorial." : STATE.entTipo === "liga" ? "El departamento de la sede ubica a la liga en la jerarqu\xEDa territorial." : "La federaci\xF3n es de cobertura nacional; indica la direcci\xF3n de su sede."}</p>` : ""}
    <div class="reg-grid-2">
      ${dd("depto", "Departamento", opt(DEPTOS), d.depto, true, true)}
      ${d.depto ? dd("ciudad", ent ? "Municipio" : "Ciudad", opt(MUNICIPIOS[d.depto] || []), d.ciudad, true, true) : ddDisabled(ent ? "Municipio" : "Ciudad")}
      ${dd("zona", "Zona", CAT.zona, d.zona, true)}
      ${tf({ id: "f-direccion", label: "Direcci\xF3n", required: true, path: "direccion", value: d.direccion, placeholder: "Ingresa tu direcci\xF3n" })}
      ${tf({ id: "f-telefono", label: "Telefono", required: true, path: "telefono", value: d.telefono, mask: "numeric", maxLength: 10, placeholder: "3001234567" })}
    </div>
    ${STATE.claim && !ent ? `<div class="naowee-textfield"><label class="naowee-textfield__label">Correo electr\xF3nico</label><div class="naowee-textfield__input-wrap rp-locked-field"><input class="naowee-textfield__input" disabled value="${esc(STATE.claim.emailHint)}"></div>
      <p class="rp-inline-note">Es el correo de tu perfil y no se puede cambiar aqu\xED. \xBFNo es tuyo? Escribe a <strong>soporte@naowee.com</strong>.</p></div>` : `${msg("informative", "", "Usaremos este correo electronico para notificaciones y verificaci\xF3n.")}
    ${tf({ id: "f-correo", label: "Correo electr\xF3nico", required: true, path: "correo", value: d.correo, mask: "email", placeholder: "nombre@correo.com" })}`}
  </form>`;
  }
  function superiorOpts() {
    const t = STATE.entTipo, d = STATE.d;
    if (t === "liga") return activosDeTipo("federacion").map((f) => ({ v: f.id, t: `${f.nombre} \xB7 ${deportesDe(f).join(", ")}` }));
    if (t === "club") return activosDeTipo("liga").filter((l) => !d.filtroDeporte || deportesDe(l).includes(d.filtroDeporte)).map((l) => {
      var _a;
      return { v: l.id, t: `${l.nombre} \xB7 ${((_a = l.ubicacion) == null ? void 0 : _a.depto) || ""}` };
    });
    return [];
  }
  function deportesPermitidos() {
    const t = STATE.entTipo, d = STATE.d;
    if (t === "federacion") return d.sector ? CATALOGO_DEPORTES() : [];
    return deportesDe(getOrganismo(d.superiorId));
  }
  function superiorSection() {
    const t = STATE.entTipo, d = STATE.d;
    if (t === "federacion") {
      const com = d.sector ? comitePorSector(d.sector) : null;
      return `${dd("sector", "Sector", CAT.sector, d.sector, true)}
      ${com ? `<p class="rp-inline-note">${I.check} Tu federaci\xF3n quedar\xE1 adscrita al <strong>${esc(com.nombre)}</strong>.</p>` : ""}`;
    }
    const ops = superiorOpts();
    const filtro = t === "club" ? dd("filtroDeporte", "Deporte", opt([...new Set(activosDeTipo("liga").flatMap(deportesDe))].sort((a, b) => a.localeCompare(b, "es"))), d.filtroDeporte, false, true) : "";
    const lista = ops.length ? dd("superiorId", t === "liga" ? "Federaci\xF3n a la que perteneces" : "Liga a la que perteneces", ops, d.superiorId, true, true) : `<div class="naowee-message naowee-message--caution" data-field="dd-superiorId"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">No encontramos tu ${SUPERIOR_TXT[t]}</p><p class="naowee-message__text">Solo aparecen organismos activos. Si tu ${SUPERIOR_TXT[t]} no est\xE1 en la lista, escr\xEDbenos a <strong>soporte@naowee.com</strong> y lo escalamos al Ministerio del Deporte.</p></div></div>`;
    return `${filtro}${lista}${ops.length ? `<p class="rp-inline-note">\xBFNo aparece tu ${SUPERIOR_TXT[t]}? Escr\xEDbenos a <strong>soporte@naowee.com</strong> y lo escalamos al Ministerio del Deporte.</p>` : ""}`;
  }
  function deportesField() {
    const d = STATE.d, t = STATE.entTipo;
    const lista = deportesPermitidos();
    if (!lista.length) return `<div class="naowee-textfield" data-field="f-deportes"><label class="naowee-textfield__label naowee-textfield__label--required">Deportes</label><p class="rp-inline-note">${t === "federacion" ? "Elige el sector para ver los deportes." : `Elige tu ${SUPERIOR_TXT[t]} para ver sus deportes.`}</p></div>`;
    const libres = t === "federacion" ? lista.filter((dep) => !duenoDeporte(dep, d.sector)) : lista;
    const ocupados = lista.length - libres.length;
    const chips = libres.map((dep) => {
      const on = d.deportes.includes(dep);
      return `<button type="button" class="rp-chip${on ? " is-on" : ""}" data-dep="${esc(dep)}">${on ? I.check : ""}${esc(dep)}</button>`;
    }).join("") + (ocupados ? `<p class="rp-inline-note">${ocupados} deportes no aparecen porque ya tienen federaci\xF3n en el sector ${esc(d.sector)}.</p>` : "");
    return `<div class="naowee-textfield" data-field="f-deportes"><label class="naowee-textfield__label naowee-textfield__label--required">Deportes</label>
    <p class="rp-inline-note">${t === "federacion" ? "Una federaci\xF3n puede gobernar varios deportes; cada deporte pertenece a una sola federaci\xF3n." : `Elige entre los deportes de tu ${SUPERIOR_TXT[t]}.`}</p>
    <div class="rp-chips">${chips}</div></div>`;
  }
  function nitBox() {
    const st = STATE.nitLookup;
    if (st === "checking") return `<div class="rp-lookup">${I.spin} Consultando registro en la base de datos...</div>`;
    if (st === "ok") return `<div class="rp-lookup rp-lookup--ok">${I.check} No encontramos registros previos. Por favor completa el formulario.</div>`;
    return "";
  }
  function paneEntBasicos() {
    const d = STATE.d, st = STATE.nitLookup, t = STATE.entTipo;
    const nit = `${tf({ id: "f-nit", label: "NIT", required: true, path: "nit", value: d.nit, placeholder: "# Documento", mask: "nit", maxLength: 11 })}${nitBox()}
    <p class="rp-demo-hint">Solo demo \xB7 prueba <button type="button" class="rp-demo-fill" data-fill="nit" data-value="805010003-3">805010003-3</button> (en revisi\xF3n), <button type="button" class="rp-demo-fill" data-fill="nit" data-value="860077223-7">860077223-7</button> (ya tiene cuenta) o <button type="button" class="rp-demo-fill" data-fill="nit" data-ok="1" data-value="900123456-1">900123456-1</button> (sin registro: puede avanzar).</p>`;
    if (st === "pending") return `<div class="reg-form">${nit}</div><div class="naowee-message naowee-message--informative rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body"><p class="naowee-message__title">Ya tienes una cuenta registrada</p><p class="naowee-message__text">Hemos detectado que este n\xFAmero de documento tiene pendiente un proceso de revisi\xF3n por parte de su organismo superior. Te notificaremos por email cuando tu entidad sea aprobada o si requieres enviar documentaci\xF3n adicional.</p></div></div>`;
    if (st === "hasLogin") return `<div class="reg-form">${nit}</div>${hasLoginAlert()}`;
    if (st !== "ok") return `<div class="reg-form">${nit}</div>`;
    return `<form class="reg-form rp-form-wide" onsubmit="return false">
    ${nit}
    <div class="reg-section-label">${t === "federacion" ? "Comit\xE9" : "Organismo superior"}</div>
    ${superiorSection()}
    ${deportesField()}
    <div class="reg-section-label">Datos de la entidad</div>
    <div class="reg-grid-2">
      ${tf({ id: "f-entNombre", label: "Nombre de la entidad", required: true, path: "entNombre", value: d.entNombre, placeholder: t === "club" ? "Ej: Club Pat\xEDn Cali" : t === "liga" ? "Ej: Liga de Patinaje del Valle" : "Ej: Federaci\xF3n Colombiana de \u2026" })}
      ${t === "liga" ? dd("ambito", "\xC1mbito", CAT.ambito, d.ambito, true) : ""}
      ${t === "club" ? dd("tipoClub", "Tipo de club", CAT.tipoClub, d.tipoClub, true) : ""}
      ${dd("naturaleza", "Naturaleza jur\xEDdica", CAT.naturaleza, d.naturaleza, true)}
      ${dd("tamano", "Tama\xF1o de la organizaci\xF3n", CAT.tamano, d.tamano, true)}
    </div>
    <div class="reg-section-label">Datos del representante legal</div>
    <div class="reg-grid-2">
      ${dd("repTipoDoc", "Tipo de documento", CAT.tipoDoc, d.repTipoDoc, true)}
      ${tf({ id: "f-repDoc", label: "N\xFAmero de documento", required: true, path: "repDoc", value: d.repDoc, mask: "numeric", maxLength: 12 })}
      ${tf({ id: "f-repNombre", label: "Nombre", required: true, path: "repNombre", value: d.repNombre })}
      ${tf({ id: "f-repApellido", label: "Apellido", required: true, path: "repApellido", value: d.repApellido })}
    </div>
    ${tf({ id: "f-repCorreo", label: "Correo electr\xF3nico del representante", required: true, path: "repCorreo", value: d.repCorreo, mask: "email" })}
  </form>`;
  }
  var DOCS_ENT = [{ id: "rut", label: "RUT", required: true }, { id: "personeria", label: "Certificado de personer\xEDa juridica" }, { id: "reconocimiento", label: "Reconocimiento deportivo vigente" }];
  function paneEntDocs() {
    return `${msg("informative", "", "Los documentos deben ser legibles y firmados.")}
    <div class="reg-form">${DOCS_ENT.map((doc) => uploader(doc).replace(doc.required ? "" : "naowee-file-uploader__label--required", "")).join("")}
    ${checkbox("aceptaPoliticas", "f-politicas", "Acepto pol\xEDticas de privacidad y uso de datos gubernamentales")}</div>`;
  }
  function ddInline(key, opts, value) {
    return dd(key, "", opts, value, false).replace('<label class="naowee-dropdown__label">', '<label class="naowee-dropdown__label" hidden>').replace('class="naowee-dropdown"', 'class="naowee-dropdown rp-dd-inline"');
  }
  function ddDisabled(label) {
    return `<div class="naowee-dropdown is-disabled"><label class="naowee-dropdown__label naowee-dropdown__label--required">${esc(label)}</label><button type="button" class="naowee-dropdown__trigger" disabled><span class="naowee-dropdown__value is-placeholder">Seleccionar</span><span class="naowee-dropdown__chevron">${I.chevron}</span></button></div>`;
  }
  function msg(variant, title, html) {
    return `<div class="naowee-message naowee-message--${variant} rp-alert"><span class="naowee-message__icon">${I.bang}</span><div class="naowee-message__body">${title ? `<p class="naowee-message__title">${esc(title)}</p>` : ""}<p class="naowee-message__text">${html}</p></div></div>`;
  }
  var _lookupT = null;
  function runLookup() {
    clearTimeout(_lookupT);
    const n = STATE.d.numDoc.trim();
    const min = STATE.d.tipoDoc === "CE" ? 6 : 7;
    if (n.length < min) {
      if (STATE.lookup !== "idle") {
        STATE.lookup = "idle";
        renderPane();
        bindPane();
        refocus("f-numDoc");
      }
      return;
    }
    STATE.lookup = "checking";
    renderPane();
    bindPane();
    refocus("f-numDoc");
    _lookupT = setTimeout(() => {
      STATE.claim = null;
      STATE.lookup = n === DOC_MENOR ? "minor" : n === DOC_SIN_RECLAMAR ? "unclaimed" : docConCuenta(n) ? "hasLogin" : "ok";
      if (STATE._demoFill && STATE.lookup === "ok") demoFill();
      STATE._demoFill = false;
      renderPane();
      bindPane();
      refocus("f-numDoc");
    }, 900);
  }
  var _nitT = null;
  function runNitLookup() {
    clearTimeout(_nitT);
    const n = STATE.d.nit.replace(/\D/g, "");
    if (n.length < 9) {
      if (STATE.nitLookup !== "idle") {
        STATE.nitLookup = "idle";
        renderPane();
        bindPane();
        refocus("f-nit");
      }
      return;
    }
    STATE.nitLookup = "checking";
    renderPane();
    bindPane();
    refocus("f-nit");
    _nitT = setTimeout(() => {
      const org = allOrganismos().find((o) => String(o.nit || "").replace(/\D/g, "") === n);
      STATE.nitLookup = !org ? "ok" : ["En revisi\xF3n", "Preinscrito", "En correcci\xF3n"].includes(org.estado) ? "pending" : "hasLogin";
      if (STATE._demoFill && STATE.nitLookup === "ok") demoFill();
      STATE._demoFill = false;
      renderPane();
      bindPane();
      refocus("f-nit");
    }, 900);
  }
  function demoFill() {
    var _a;
    const d = STATE.d, k = stepKey();
    const blank = (key, v) => {
      if (!d[key] || Array.isArray(d[key]) && !d[key].length) d[key] = v;
    };
    if (k === "nature") {
      if (!STATE.nature) STATE.nature = "persona";
    } else if (k === "role") {
      if (!STATE.role) STATE.role = "ATHLETE";
    } else if (k === "enttipo") {
      if (!STATE.entTipo) STATE.entTipo = "club";
    } else if (k === "basicos") {
      if (STATE.lookup !== "ok") {
        d.numDoc = "1020304050";
        STATE.lookup = "ok";
        STATE.claim = null;
      }
      blank("nombre", "Ana");
      blank("apellido", "G\xF3mez");
      blank("sexo", "M");
      blank("nacionalidad", "CO");
      const e = edadDe(d.fechaNac);
      if (!d.fechaNac || e != null && e < 18) d.fechaNac = "1995-04-12";
      if (STATE.role === "SUPPORT_STAFF") blank("rolApoyo", CAT.rolApoyo[0].v);
      d.aceptaPoliticas = true;
    } else if (k === "deportivos") {
      blank("tipoDeporte", CAT.tipoDeporte[0].v);
      if (!deportesPorTipo(d.tipoDeporte).includes(d.deporte)) d.deporte = deportesPorTipo(d.tipoDeporte)[0] || "";
      d.aceptaPoliticas = true;
    } else if (k === "socio") {
      ["genero", "orientacion", "discapacidad", "etnia", "victima", "priorizacion"].forEach((key) => blank(key, CAT[key][0].v));
      if (d.etnia === "IND") blank("comunidad", CAT.comunidad[0].v);
      if (d.victima === "YES") blank("victimizacion", CAT.victimizacion[0].v);
    } else if (k === "contacto") {
      blank("depto", Object.keys(MUNICIPIOS)[0]);
      if (!(MUNICIPIOS[d.depto] || []).includes(d.ciudad)) d.ciudad = (MUNICIPIOS[d.depto] || [])[0] || "";
      blank("zona", "U");
      blank("direccion", "Calle 10 # 20-30");
      blank("telefono", "3001234567");
      blank("correo", "ana.gomez@ejemplo.co");
    } else if (k === "entbasicos") {
      const t = STATE.entTipo;
      if (STATE.nitLookup !== "ok") {
        d.nit = "900123456-1";
        STATE.nitLookup = "ok";
      }
      if (t === "federacion") {
        blank("sector", "Ol\xEDmpico");
        blank("deportes", [SIN_FEDERACION[0]]);
      } else {
        blank("superiorId", ((_a = superiorOpts()[0]) == null ? void 0 : _a.v) || "");
        blank("deportes", deportesPermitidos().slice(0, 1));
      }
      blank("entNombre", "Entidad de Ejemplo");
      blank("naturaleza", "Privada");
      blank("tamano", "No aplica");
      blank("repDoc", "1020304050");
      blank("repNombre", "Ana");
      blank("repApellido", "G\xF3mez");
      blank("repCorreo", "ana.gomez@ejemplo.co");
      if (t === "liga") blank("ambito", "departamental");
      if (t === "club") blank("tipoClub", "promotor");
    } else if (k === "entdocs") {
      DOCS_ENT.forEach((doc) => {
        if (!d.docs[doc.id]) d.docs[doc.id] = `${doc.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf \xB7 120 KB`;
      });
      d.aceptaPoliticas = true;
    }
  }
  function fillStep() {
    var _a;
    demoFill();
    STATE._armedStep = null;
    (_a = document.getElementById("rpBypassHint")) == null ? void 0 : _a.remove();
    if (["nature", "role", "enttipo"].includes(stepKey())) render();
    else {
      renderPane();
      bindPane();
    }
  }
  function refocus(id) {
    const el = document.getElementById(id);
    if (el) {
      el.focus();
      const v = el.value;
      try {
        el.setSelectionRange(v.length, v.length);
      } catch (_) {
      }
    }
  }
  var nitMask = (v) => {
    const n = v.replace(/\D/g, "").slice(0, 10);
    return n.length > 9 ? `${n.slice(0, 9)}-${n.slice(9)}` : n;
  };
  function bindPane() {
    var _a, _b, _c, _d;
    closeDatePicker();
    root().querySelectorAll("input[data-model]").forEach((inp) => {
      inp.addEventListener("input", (e) => {
        if (e.isTrusted) STATE._demoFill = false;
        if (inp.dataset.mask === "nit") inp.value = nitMask(inp.value);
        else if (inp.dataset.mask) inp.value = applyMask(inp.dataset.mask, inp.value);
        STATE.d[inp.dataset.model] = inp.value;
        clearFieldError(inp.closest("[data-field]"));
        if (inp.dataset.model === "numDoc") runLookup();
        if (inp.dataset.model === "nit") runNitLookup();
      });
    });
    root().querySelectorAll("input[data-check]").forEach((cb) => cb.addEventListener("change", () => {
      var _a2;
      STATE.d[cb.dataset.check] = cb.checked;
      (_a2 = cb.closest("[data-field]")) == null ? void 0 : _a2.classList.remove("naowee-checkbox--error");
    }));
    root().querySelectorAll("[data-card]").forEach((c) => c.addEventListener("click", () => {
      const key = c.dataset.card, v = c.dataset.value;
      if (STATE[key] === v) {
        STATE[key] = null;
        if (key === "nature") {
          STATE.role = null;
          STATE.entTipo = null;
        }
        render();
        return;
      }
      if (key === "nature") {
        if (STATE.nature !== v) {
          STATE.role = null;
          STATE.entTipo = null;
        }
        STATE.nature = v;
      }
      if (key === "role") STATE.role = v;
      if (key === "entTipo") {
        if (STATE.entTipo !== v) {
          STATE.d.superiorId = "";
          STATE.d.sector = "";
          STATE.d.deportes = [];
          STATE.d.filtroDeporte = "";
        }
        STATE.entTipo = v;
      }
      render();
    }));
    root().querySelectorAll("[data-dep]").forEach((b) => b.addEventListener("click", () => {
      const dep = b.dataset.dep, list = STATE.d.deportes;
      STATE.d.deportes = list.includes(dep) ? list.filter((x) => x !== dep) : [...list, dep];
      renderPane();
      bindPane();
    }));
    (_a = root().querySelector('[data-act="claim"]')) == null ? void 0 : _a.addEventListener("click", () => {
      STATE.claim = { ...SIN_RECLAMAR };
      STATE.lookup = "ok";
      renderPane();
      bindPane();
    });
    (_b = root().querySelector('[data-act="notMine"]')) == null ? void 0 : _b.addEventListener("click", () => {
      STATE.lookup = "notMine";
      renderPane();
      bindPane();
    });
    (_c = root().querySelector('[data-act="backToClaim"]')) == null ? void 0 : _c.addEventListener("click", () => {
      STATE.lookup = "unclaimed";
      renderPane();
      bindPane();
    });
    (_d = root().querySelector('[data-act="asTutor"]')) == null ? void 0 : _d.addEventListener("click", () => {
      const keep = { tipoDoc: STATE.d.tipoDoc };
      STATE.role = "LEGAL_GUARDIAN";
      STATE.lookup = "idle";
      STATE.d = { ...blankD(), ...keep };
      render();
    });
    root().querySelectorAll("[data-dd]").forEach(mountDD);
    root().querySelectorAll("[data-datefield]").forEach((f) => {
      const trig = f.querySelector(".naowee-datepicker-field__input");
      trig.addEventListener("click", () => openDatePicker(f));
      trig.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDatePicker(f);
        }
      });
    });
    root().querySelectorAll("[data-fill]").forEach((b) => b.addEventListener("click", () => {
      const inp = root().querySelector(`input[data-model="${b.dataset.fill}"]`);
      if (!inp) return;
      STATE._demoFill = !!b.dataset.ok;
      inp.value = b.dataset.value;
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    }));
    const fillBtn = document.getElementById("rpFill");
    if (fillBtn) fillBtn.onclick = fillStep;
    root().querySelectorAll("[data-doc-input]").forEach((inp) => inp.addEventListener("change", () => onFilePick(inp)));
    root().querySelectorAll("[data-doc-remove]").forEach((b) => b.addEventListener("click", (e) => {
      e.preventDefault();
      delete STATE.d.docs[b.dataset.docRemove];
      renderPane();
      bindPane();
    }));
    mountDevnotes(DEVNOTES, root());
  }
  function ageHint() {
  }
  function validate() {
    const d = STATE.d, errs = [], k = stepKey();
    const req = (id, ok, m, hard) => {
      if (!ok) errs.push({ field: id, kind: "tf", msg: m, hard: !!hard });
    };
    const reqDd = (key) => {
      if (!d[key]) errs.push({ field: "dd-" + key, kind: "dd" });
    };
    const reqCheck = (id, model) => {
      if (!d[model]) errs.push({ field: id, kind: "check", hard: true });
    };
    if (k === "nature") return STATE.nature ? [] : [{ field: null, kind: "grid" }];
    if (k === "role") return STATE.role ? [] : [{ field: null, kind: "grid" }];
    if (k === "enttipo") return STATE.entTipo ? [] : [{ field: null, kind: "grid" }];
    if (k === "basicos") {
      if (STATE.lookup !== "ok") return [{ field: "f-numDoc", kind: "tf", msg: "Verifica el documento para continuar", hard: true }];
      req("f-nombre", d.nombre.trim());
      req("f-apellido", d.apellido.trim());
      if (!d.fechaNac) errs.push({ field: "f-fechaNac", kind: "tf", msg: "Debe seleccionar fecha para persona mayor de edad" });
      const e = edadDe(d.fechaNac);
      if (e != null && e < 18) errs.push({ field: "f-fechaNac", kind: "tf", msg: "Debe seleccionar fecha para persona mayor de edad", hard: true });
      if (STATE.role === "SUPPORT_STAFF") reqDd("rolApoyo");
      reqDd("sexo");
      reqDd("nacionalidad");
      if (!isAthlete()) reqCheck("f-politicas", "aceptaPoliticas");
    }
    if (k === "deportivos") {
      reqDd("tipoDeporte");
      if (!d.deporte) errs.push({ field: "dd-deporte", kind: "dd" });
      reqCheck("f-politicas", "aceptaPoliticas");
    }
    if (k === "socio") {
      ["genero", "orientacion", "discapacidad", "etnia", "victima", "priorizacion"].forEach(reqDd);
      if (d.etnia === "IND") reqDd("comunidad");
      if (d.victima === "YES") reqDd("victimizacion");
    }
    if (k === "contacto") {
      reqDd("depto");
      if (!d.ciudad) errs.push({ field: "dd-ciudad", kind: "dd" });
      reqDd("zona");
      req("f-direccion", d.direccion.trim());
      req("f-telefono", /^\d{10}$/.test(d.telefono), "El tel\xE9fono debe tener 10 d\xEDgitos");
      if (!(STATE.claim && STATE.nature === "persona")) req("f-correo", EMAIL_RE.test(d.correo), "Ingresa un correo v\xE1lido");
    }
    if (k === "entbasicos") {
      if (STATE.nitLookup !== "ok") return [{ field: "f-nit", kind: "tf", msg: "El NIT debe tener m\xEDnimo 9 d\xEDgitos", hard: true }];
      if (STATE.entTipo === "federacion") {
        if (!d.sector) errs.push({ field: "dd-sector", kind: "dd", hard: true });
      } else if (!d.superiorId) errs.push({ field: "dd-superiorId", kind: "dd", hard: true });
      if (!d.deportes.length) errs.push({ field: "f-deportes", kind: "tf", msg: "Elige al menos un deporte", hard: true });
      req("f-entNombre", d.entNombre.trim());
      if (STATE.entTipo === "liga") reqDd("ambito");
      if (STATE.entTipo === "club") reqDd("tipoClub");
      reqDd("naturaleza");
      reqDd("tamano");
      req("f-repDoc", d.repDoc.trim());
      req("f-repNombre", d.repNombre.trim());
      req("f-repApellido", d.repApellido.trim());
      req("f-repCorreo", EMAIL_RE.test(d.repCorreo), "Ingresa un correo v\xE1lido");
    }
    if (k === "entdocs") {
      DOCS_ENT.filter((x) => x.required).forEach((doc) => {
        if (!d.docs[doc.id]) errs.push({ field: "doc-" + doc.id, kind: "file" });
      });
      reqCheck("f-politicas", "aceptaPoliticas");
    }
    return errs;
  }
  function next() {
    const errs = validate();
    if (errs.length) {
      shakeErrors(errs);
      if (errs.some((e) => e.hard || e.kind === "grid")) {
        STATE._armedStep = null;
        setFooterHint("Hay validaciones obligatorias que <strong>no se pueden omitir</strong>: documento verificado, edad, organismo superior, deportes o aceptaci\xF3n de pol\xEDticas.", true);
        return;
      }
      if (STATE._armedStep === STATE.step) {
        STATE._armedStep = null;
        advance();
        return;
      }
      STATE._armedStep = STATE.step;
      setFooterHint("Faltan campos obligatorios \u2014 presiona <strong>\u201CSiguiente\u201D</strong> de nuevo para omitirlos (solo demo).", false);
      return;
    }
    STATE._armedStep = null;
    advance();
  }
  function advance() {
    if (STATE.step < lastStep()) {
      STATE.step++;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    submit();
  }
  function submit() {
    var _a, _b;
    const d = STATE.d;
    const nombre = [d.nombre, d.segNombre, d.apellido, d.segApellido].filter(Boolean).join(" ");
    if (STATE.nature === "persona") {
      let id = null;
      if (isAthlete()) {
        const nuevos = readStore("deportistas-nuevos", []) || [];
        id = `DEP-N${String(nuevos.length + 1).padStart(3, "0")}`;
        nuevos.push({ id, nombre, tipoDoc: d.tipoDoc, numDoc: d.numDoc, deporte: d.deporte, modalidad: "", correo: d.correo, clubId: null, estado: "autodeclarado", origen: "registro-publico", fechaRegistro: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
        writeStore("deportistas-nuevos", nuevos);
      }
      STATE.result = { tipo: "persona", id, nombre, rol: ROL_TXT[STATE.role], fechaNac: d.fechaNac, correo: STATE.claim ? STATE.claim.emailHint : d.correo, reclamado: !!STATE.claim, doc: `${d.tipoDoc} ${d.numDoc}`, ubicacion: [d.ciudad, d.depto].filter(Boolean).join(", "), telefono: d.telefono, deporte: isAthlete() ? d.deporte : "" };
    } else {
      const t = STATE.entTipo;
      const parentId = t === "federacion" ? (_a = comitePorSector(d.sector)) == null ? void 0 : _a.id : d.superiorId;
      const org = addOrganismo({
        tipo: t,
        nombre: d.entNombre,
        nit: d.nit,
        sector: t === "federacion" ? d.sector : (_b = getOrganismo(parentId)) == null ? void 0 : _b.sector,
        deporte: d.deportes[0],
        deportes: [...d.deportes],
        parentId,
        estado: "En revisi\xF3n",
        origen: "autorregistro",
        ...t === "liga" ? { ambito: d.ambito } : {},
        ...t === "club" ? { tipoClub: d.tipoClub } : {},
        ...t === "federacion" ? { validacion: { mindeporte: "pendiente", comite: "pendiente" } } : {},
        naturaleza: d.naturaleza,
        tamano: d.tamano,
        repLegal: { tipoDoc: d.repTipoDoc, numDoc: d.repDoc, nombre: d.repNombre, apellido: d.repApellido, correo: d.repCorreo },
        ubicacion: { depto: d.depto, ciudad: d.ciudad, zona: d.zona === "R" ? "Rural" : "Urbana", direccion: d.direccion },
        contacto: { telefono: d.telefono, correo: d.correo },
        docs: { ...d.docs }
      });
      auditLog({ orgId: org.id, fecha: (/* @__PURE__ */ new Date()).toISOString(), accion: "Autorregistro", estado: "En revisi\xF3n", responsable: `${d.repNombre} ${d.repApellido}`.trim() || "Representante legal", detalle: "Registro p\xFAblico: queda en la bandeja de su organismo superior" });
      STATE.result = { tipo: "entidad", org, superior: getOrganismo(parentId) };
    }
    STATE.created = true;
    render();
    window.scrollTo({ top: 0 });
  }
  var profileRows = (rows) => `<dl class="ur-profile__rows">${rows.filter(([, v]) => v).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(String(v))}</dd></div>`).join("")}</dl>`;
  function renderResult() {
    var _a, _b, _c, _d, _e, _f, _g;
    const r = STATE.result;
    const persona = r.tipo === "persona";
    const sup = r.superior;
    const esFed = !persona && r.org.tipo === "federacion";
    const rolBandeja = !persona && sup ? ROL_DE_ANCLA[sup.id] : null;
    const siguiente = persona ? {
      Deportista: "Desde tu perfil podr\xE1s solicitar afiliaci\xF3n a uno o varios clubes. Hasta que un club la confirme, apareces como deportista autodeclarado.",
      Tutor: "Desde tu perfil podr\xE1s registrar a tus hijos o menores a cargo con el documento de parentesco.",
      "Personal deportivo": "Desde tu perfil podr\xE1s solicitar v\xEDnculo a un club, liga, federaci\xF3n o comit\xE9."
    }[r.rol] : "";
    root().innerHTML = `<div class="reg-success ur-result">
    <div class="ur-devnote-wrap ur-devnote-wrap--center"><span class="wz-devnote" tabindex="0" role="button" data-devnote="${persona ? "resultPersona" : "resultEntidad"}"></span></div>
    <div class="ur-result__ava">${I.check}</div>
    ${persona ? `
      ${r.reclamado ? `<h1 class="ur-title">\xA1Perfil reclamado!</h1>
      <p>Actualizamos tu perfil con los datos que ingresaste y activamos tu cuenta.</p>
      <p>Enviamos el enlace para crear tu contrase\xF1a a <strong>${esc(r.correo)}</strong>.</p>` : `<h1 class="ur-title">\xA1Registro completado!</h1>
      <p>\xA1Ya formas parte! Registro recibido. Confirma tu email y empieza a superar tus marcas.</p>
      <p>\xA1Bienvenido! Tu cuenta ha sido creada correctamente. Hemos enviado un correo con la confirmaci\xF3n.</p>`}
      <div class="ur-profile"><div class="ur-profile__head"><strong>${esc(r.nombre)}</strong><span class="ur-badge">Cuenta activa</span></div>
        ${profileRows([["Rol", r.rol], ["Documento", r.doc], ["Fecha de nacimiento", r.fechaNac ? r.fechaNac.split("-").reverse().join("/") : ""], ["Deporte", r.deporte], ["Correo", r.correo], ["Tel\xE9fono", r.telefono], ["Ubicaci\xF3n", r.ubicacion]])}</div>
      ${msg("informative", "", esc(siguiente))}
      ${msg("caution", "", "Si no recibiste el correo, revisa bandeja de SPAM o solicita reenv\xEDo.")}
      <div class="ur-actions"><a class="ur-btn ur-btn--block" href="index.html">Ir a Iniciar sesi\xF3n</a></div>` : `
      <h1 class="ur-title">\xA1Solicitud enviada!</h1>
      <p>Hemos recibido la solicitud de <strong>${esc(r.org.nombre)}</strong>. Queda <strong>en revisi\xF3n</strong>.</p>
      <div class="ur-checks">
        <div>${I.check}<span><strong>Revisi\xF3n por ${esFed ? "el comit\xE9 y el Ministerio del Deporte" : esc((sup == null ? void 0 : sup.nombre) || "tu organismo superior")}</strong>${esFed ? `El ${esc((sup == null ? void 0 : sup.nombre) || "comit\xE9")} y el Ministerio revisan tus documentos; la federaci\xF3n se activa con los dos avales.` : "Revisa tus documentos y puede aprobar, devolver con motivo para que corrijas, o rechazar."}</span></div>
        <div>${I.check}<span><strong>Activaci\xF3n</strong>Te notificaremos por email cuando tu entidad sea aprobada. El representante legal recibe el acceso como administrador de la entidad.</span></div>
      </div>
      <div class="ur-profile"><div class="ur-profile__head"><strong>${esc(r.org.nombre)}</strong><span class="ur-badge ur-badge--review">En revisi\xF3n</span></div>
        ${profileRows([["Tipo", ENT_TXT[r.org.tipo]], ["NIT", r.org.nit], ["Deportes", (r.org.deportes || []).join(", ")], ["Organismo superior", sup == null ? void 0 : sup.nombre], ["Representante legal", [(_a = r.org.repLegal) == null ? void 0 : _a.nombre, (_b = r.org.repLegal) == null ? void 0 : _b.apellido].filter(Boolean).join(" ") + (((_c = r.org.repLegal) == null ? void 0 : _c.numDoc) ? ` \xB7 ${r.org.repLegal.tipoDoc} ${r.org.repLegal.numDoc}` : "")], ["Sede", [(_d = r.org.ubicacion) == null ? void 0 : _d.ciudad, (_e = r.org.ubicacion) == null ? void 0 : _e.depto].filter(Boolean).join(", ")], ["Contacto", [(_f = r.org.contacto) == null ? void 0 : _f.correo, (_g = r.org.contacto) == null ? void 0 : _g.telefono].filter(Boolean).join(" \xB7 ")], ["Documentos", `${Object.keys(r.org.docs || {}).length} adjuntos`]])}</div>`}
    <div class="ur-help"><b>\u{1F4AC} \xBFNECESITAS AYUDA?</b>Si tienes dudas o problemas con la activaci\xF3n de tu cuenta, puedes comunicarte con el equipo de soporte <strong>soporte@naowee.com</strong></div>
    <div class="ur-demo-links">
      ${r.id ? `<a href="afiliacion.html?role=DEPORTISTA&id=${esc(r.id)}">Solo demo \xB7 ver perfil del deportista</a>` : ""}
      ${rolBandeja ? `<a href="bandeja.html?role=${rolBandeja}">Solo demo \xB7 bandeja de ${esc(sup.nombre)}</a>` : ""}
      ${esFed ? '<a href="bandeja.html?role=MINDEPORTE">Solo demo \xB7 bandeja del Ministerio</a>' : ""}
      ${persona ? "" : '<a href="jerarquia.html?role=MINDEPORTE">Solo demo \xB7 ver en la jerarqu\xEDa</a>'}
      <button type="button" id="rpAnother">Registrar otro</button>
    </div>
  </div>`;
    document.getElementById("rpAnother").addEventListener("click", () => location.reload());
    mountDevnotes(DEVNOTES, root());
  }
  var DEVNOTES = {
    nature: { title: "Selecci\xF3n de naturaleza", sections: [
      { title: "Migraci\xF3n", items: ['Hoy vive en <code>sports</code>: <code>/user-register/select-nature</code> (suite-web-v2). Pasa al servicio de SUID con las mismas rutas y el mismo shell (logo SUID, "\xBFYa tienes una cuenta? Inicia sesi\xF3n").', "Sin cambios funcionales en esta pantalla: Persona (Natural) \xB7 Entidad (Jur\xEDdica)."] },
      { title: "Corregir al migrar", items: ['En la ruta de Entidad el header cae en "Crear cuenta" y el subt\xEDtulo de persona porque no se fija rol. Aqu\xED el t\xEDtulo sale de la naturaleza y del tipo de entidad.'] }
    ] },
    role: { title: "Selecci\xF3n de rol (Persona)", sections: [
      { title: "Se mantiene", items: ["Tres roles: <code>ATHLETE</code>, <code>LEGAL_GUARDIAN</code>, <code>SUPPORT_STAFF</code>. Textos de tarjetas iguales a producci\xF3n."] },
      { title: "Regla de jerarqu\xEDa", items: ["Las personas <b>no pasan por ninguna bandeja</b>: la cuenta queda activa de inmediato porque no pertenecen a ning\xFAn organismo todav\xEDa.", "El v\xEDnculo con un organismo se pide despu\xE9s, desde el perfil (afiliaci\xF3n)."] }
    ] },
    basicos: { title: "B\xE1sicos (Persona)", sections: [
      { title: "Se mantiene de producci\xF3n", items: ["Documento CC / CE / PA. Con 7 d\xEDgitos (6 para CE) consulta <code>GET /user/public/individual/search</code> tras 1 s; los dem\xE1s campos quedan bloqueados hasta verificar.", '<code>isMinor</code> \u2192 alerta "Deportista menor de edad detectado/a" + "Continuar como padre/tutor" (cambia el rol a <code>LEGAL_GUARDIAN</code> y limpia el formulario).', '<code>hasLogin</code> \u2192 "Ya tienes una cuenta registrada" + Iniciar sesi\xF3n.', 'Fecha de nacimiento: 18+ obligatorio, tambi\xE9n para el tutor. "Rol espec\xEDfico" solo para personal deportivo (<code>/catalogs/support-personnel-role</code>).'] },
      { title: "Perfil existente sin reclamar (reconciliaci\xF3n)", items: [
        "Caso: el documento existe con <code>has_login=false</code> porque lo cre\xF3 otro actor (una instituci\xF3n al inscribirlo en un evento, un cargue) con <b>su</b> correo. Se detecta en la b\xFAsqueda, no al final del formulario.",
        'Se muestra el correo <b>enmascarado</b> y sin opci\xF3n de editar: dos primeras letras y la \xFAltima del usuario y el dominio completo (<code>ju\u2022\u2022\u2022\u2022\u2022z@colegiosanjose.edu.co</code>), para que la persona lo reconozca. El enmascarado lo hace el back. No se muestra qui\xE9n cre\xF3 el registro: averiguarlo exige cruzar todos los eventos y no aporta para reconocer el correo. "Continuar con este correo" sigue el formulario normal y reclama el perfil. "Ese correo no es m\xEDo" lleva a soporte, que verifica identidad y cambia el correo.',
        "Regla: al reclamar, <b>los datos del perfil se actualizan con lo que ingrese el usuario, excepto el correo</b> (y el documento, que es la llave). Ah\xED queda reclamado: <code>has_login=true</code>, mismo <code>user_code</code>, cuenta en Keycloak y correo para crear la contrase\xF1a.",
        "<b>Hoy en user-auth-ms</b> (<code>publicActivateExisting</code>, <code>registration/service.go</code>): solo reclama si el usuario escribe el <b>mismo</b> correo guardado; si escribe otro devuelve 409 <code>document_registered_different_email</code> al final. Y solo actualiza tel\xE9fono, nacionalidad, ubicaci\xF3n, zona, deporte y rol de apoyo: nombres, fecha de nacimiento, sexo y sociodemogr\xE1fico se descartan sin avisar.",
        "<b>Cambios de back</b>: (1) la b\xFAsqueda devuelve <code>email_hint</code> enmascarado; (2) el registro permite reclamar sin enviar correo (usa el guardado) y actualiza todos los campos del formulario menos correo y documento; (3) el reclamo queda en auditor\xEDa con los valores anteriores.",
        "<b>Seguridad</b>: hoy <code>GET /user/public/individual/search</code> devuelve el perfil completo (correo, tel\xE9fono, direcci\xF3n, fecha de nacimiento) a cualquiera que escriba un documento. Debe devolver solo <code>has_login</code>, <code>is_minor</code>, <code>can_create_account</code> y <code>email_hint</code>."
      ] },
      { title: "Menores (pendiente P-21)", items: ["Por ahora solo el tutor registra al menor, desde su perfil (<code>POST /user/me/dependents</code>). Si Negocio decide que un club o un municipio tambi\xE9n puede, se agrega en el registro asistido, no aqu\xED."] },
      { title: "Solo demo", items: ["La b\xFAsqueda est\xE1 simulada: <code>1098765432</code> devuelve menor; <code>1055512345</code> devuelve perfil sin reclamar; un documento del seed devuelve cuenta existente; <code>1020304050</code> (o cualquier otro) no tiene registro y deja avanzar. Los ejemplos bajo el campo son botones: tocarlos llena el documento y dispara la b\xFAsqueda; el que no tiene registro adem\xE1s deja el formulario lleno para poder dar Siguiente."] }
    ] },
    deportivos: { title: "Deportivos (solo deportista)", sections: [
      { title: "Se mantiene", items: ["Tipo de deporte (<code>/catalogs/sport_type</code>) \u2192 Deporte (<code>GET /sports?type=</code>). Se env\xEDa como <code>main_sport_code</code>."] },
      { title: "Regla de jerarqu\xEDa", items: ["Aqu\xED <b>no se elige club</b>. El deportista queda autodeclarado y pide afiliaci\xF3n desde su perfil; puede estar en varios clubes, del mismo deporte o de deportes distintos (P-13)."] },
      { title: "Solo demo", items: ["La lista de deportes sale de las federaciones del seed; la real es el cat\xE1logo de catalog-ms."] }
    ] },
    socio: { title: "Sociodemogr\xE1fico", sections: [
      { title: "Se mantiene sin cambios", items: ['Ocho cat\xE1logos con los valores de staging. "Comunidad ind\xEDgena" solo con etnia <code>IND</code>; "Tipo de victimizaci\xF3n" solo con v\xEDctima <code>YES</code>. Al ocultarse se limpian.'] }
    ] },
    contacto: { title: "Contacto / Sede", sections: [
      { title: "Se mantiene", items: ["Departamento \u2192 Ciudad (<code>/locations/*</code>), Zona, Direcci\xF3n con el modal estructurado de producci\xF3n (aqu\xED simplificado a un campo), Tel\xE9fono de 10 d\xEDgitos y correo.", "Persona: llena <code>location</code>. <b>Corregir al migrar</b>: hoy tambi\xE9n llena <code>birth_place</code> con la direcci\xF3n de contacto."] },
      { title: "Entidad: ubicaci\xF3n territorial", items: ["Club \u2192 municipio; liga \u2192 departamento; federaci\xF3n \u2192 sede nacional. Es atributo del organismo, no su padre: la aprobaci\xF3n sigue la cadena deportiva.", "Reemplaza la regla actual que deriva <code>department_code</code>/<code>municipality_code</code> de <code>organization_type</code>.", "La organizaci\xF3n no tiene <code>zone</code>/<code>is_vereda</code> en user-auth-ms: agregarlo o quitar Zona del formulario de entidad."] }
    ] },
    enttipo: { title: "Tipo de entidad", sections: [
      { title: "Qu\xE9 cambia vs producci\xF3n", items: ['Hoy el tipo sale de <code>organization_level</code> (Nacional, Departamental, Municipal, Club) + "Tipo de entidad SND" + "Cobertura geogr\xE1fica". Se reemplazan por <b>Federaci\xF3n \xB7 Liga \xB7 Club</b>; la cobertura se deriva del tipo.', "Fuera del registro p\xFAblico: <b>Comit\xE9</b> (lo crea el Administrador Mindeporte y nace Activo) y <b>entes departamentales y municipales</b> (los crea el Ministerio al invitarlos a sus eventos, P-11)."] }
    ] },
    entbasicos: { title: "B\xE1sicos (Entidad)", sections: [
      { title: "Se mantiene", items: ["NIT con formato <code>#########-#</code> y consulta <code>GET /user/public/organization/search</code>. En revisi\xF3n \u2192 mensaje de revisi\xF3n pendiente; con cuenta \u2192 Iniciar sesi\xF3n.", "Naturaleza jur\xEDdica, tama\xF1o y representante legal. <b>Corregir al migrar</b>: hoy no se env\xEDa el apellido del representante."] },
      { title: "Solo demo", items: ["La b\xFAsqueda de NIT est\xE1 simulada: <code>805010003-3</code> devuelve en revisi\xF3n y <code>860077223-7</code> cuenta existente; <code>900123456-1</code> (o cualquier otro) no tiene registro y deja avanzar. Los ejemplos bajo el campo son botones que lo llenan y disparan la b\xFAsqueda; el que no tiene registro adem\xE1s deja el formulario lleno para poder dar Siguiente."] },
      { title: "Nuevo: organismo superior", items: ["Federaci\xF3n \u2192 elige sector y queda adscrita al comit\xE9 del sector. Liga \u2192 elige federaci\xF3n. Club \u2192 filtra por deporte y elige liga; el departamento no filtra porque un club puede estar en una liga de otro departamento (P-20).", "La lista solo trae organismos <b>Activos</b>. Si el suyo no est\xE1: soporte, que escala al Ministerio (P-17).", "En el registro el club elige <b>una</b> liga (la que lo activa). Otras ligas de sus deportes se piden despu\xE9s como afiliaci\xF3n."] },
      { title: "Nuevo: deportes", items: ["Lista de deportes del cat\xE1logo. Federaci\xF3n: del cat\xE1logo, sin repetir deportes que ya tiene otra federaci\xF3n del mismo sector. Liga: de su federaci\xF3n. Club: de su liga.", "SUP no es deporte: es modalidad de Surf. Las modalidades no se configuran en el organismo."] },
      { title: "Contrato propuesto", items: ["<code>POST /user/public/organization</code>: <code>organization_type</code> pasa a FEDERATION | LEAGUE | CLUB y se agregan <code>parent_organization_code</code> y <code>sport_codes[]</code>; deja de enviar <code>coverage_code</code> y <code>snd_sector_entity_code</code>.", "El back valida: superior Activo y del tipo correcto, <code>sport_codes</code> \u2286 deportes del superior, NIT \xFAnico, un deporte en una sola federaci\xF3n."] },
      { title: "Brecha con user-auth-ms (revisado 07-10-2026, rama staging)", items: [
        "<b>Ya soportado</b> en <code>organizations_details</code>: NIT \xFAnico, nombre, naturaleza jur\xEDdica, tama\xF1o, representante (tipo y n\xFAmero de documento, nombre, correo), departamento, municipio, direcci\xF3n, tel\xE9fono y correo. Estados <code>PENDING_REVIEW</code>, <code>REJECTED</code>, <code>SUSPENDED</code>.",
        "<b>Tipo</b>: <code>organization_type</code> acepta <code>FEDERATION</code> y <code>CLUB</code>, pero no <code>LEAGUE</code>. No agregar otro valor al <code>oneof</code>: los tipos deben ser cat\xE1logo.",
        "<b>Subordinaci\xF3n configurable</b>: comit\xE9 \u2192 federaci\xF3n \u2192 liga \u2192 club es el esquema de SUID, no una regla del c\xF3digo. Cada proyecto declara su esquema con reglas (tipo padre, tipo hijo, varios padres, deporte compartido, qui\xE9n aprueba). El alta y la bandeja leen las reglas; no preguntan por tipos concretos. Ver nao-docs, Modelo \u2192 Pendientes t\xE9cnicos.",
        "<b>Superior</b>: no hay relaci\xF3n entre organizaciones; el <code>HierarchyPath</code> del token ABAC es solo territorial (<code>/COL/{dpto}/{mun}/</code>). Como un club puede estar en varias ligas (P-20), se necesita una tabla de afiliaci\xF3n (hijo, padre, estado, vigencia), no una columna <code>parent_code</code>.",
        "<b>Deportes</b>: no existe la lista; solo <code>federation_code</code> (un texto). Tabla organizaci\xF3n \u2194 deporte, con un deporte en una sola federaci\xF3n por sector y cada nivel dentro de su superior.",
        "<b>Sin campo</b>: \xE1mbito de la liga (el cat\xE1logo <code>COVERAGE</code> no tiene Distrital), tipo de club, apellido del representante (hoy el front lo descarta).",
        "<b>Estados que faltan</b>: En correcci\xF3n (devuelto con motivo), Preinscrito (cargue masivo), Cancelado. Tampoco hay d\xF3nde guardar los dos avales de la federaci\xF3n (P-19).",
        "<b>Revisor</b>: un <code>PENDING_REVIEW</code> no tiene revisor asignado; para que caiga en la bandeja del superior hace falta la relaci\xF3n de afiliaci\xF3n y una jurisdicci\xF3n por jerarqu\xEDa deportiva.",
        "<b>Obligatorios que sobran</b>: el DTO p\xFAblico exige <code>coverage_code</code> y <code>snd_sector_entity_code</code>; volverlos opcionales o derivarlos del tipo.",
        "Cada cambio se replica en el gateway (<code>internal/contracts/userAuthMs.go</code>) y en su Bruno."
      ] }
    ] },
    entdocs: { title: "Documentos (Entidad)", sections: [
      { title: "Se mantiene", items: ["Requisitos desde <code>GET /documentation/processes/requirements/by-role?process_type=REGISTRATION&user_role=SPORTS_ORGANIZATION</code>: RUT obligatorio; personer\xEDa y reconocimiento opcionales. Subida con <code>/files/public/presigned-upload</code> despu\xE9s de crear la cuenta."] },
      { title: "Corregir al migrar", items: ["Hoy la subida corre en segundo plano y los errores se silencian: la entidad puede quedar en revisi\xF3n sin documentos. Mostrar el error y permitir reintentar."] },
      { title: "Pendiente", items: ["Requisitos por tipo de organismo (federaci\xF3n, liga, club) no est\xE1n definidos; hoy son los mismos para todos."] }
    ] },
    resultPersona: { title: "Resultado (Persona)", sections: [
      { title: "Se mantiene", items: ["Textos de producci\xF3n. Cuenta activa; el correo trae el enlace para crear la contrase\xF1a."] },
      { title: "Nuevo", items: ["Siguiente paso seg\xFAn el rol: deportista \u2192 afiliaci\xF3n a uno o varios clubes; tutor \u2192 registrar menores; personal deportivo \u2192 v\xEDnculo con cualquier organismo (P-05)."] },
      { title: "Solo demo", items: ['El deportista queda guardado como autodeclarado y aparece en "Ver mi perfil".', 'Los enlaces "Solo demo" al pie de la pantalla tambi\xE9n se ocultan con el switch de notas para devs (queda "Registrar otro").'] }
    ] },
    resultEntidad: { title: "Resultado (Entidad)", sections: [
      { title: "Qu\xE9 cambia vs producci\xF3n", items: ['Hoy el t\xEDtulo dice "\xA1Entidad pre-inscrita!". Preinscrito es el estado del cargue masivo; el autorregistro entra directo a <code>En revisi\xF3n</code>, por eso aqu\xED dice "\xA1Solicitud enviada!".', 'Hoy dice "Nuestro equipo verificar\xE1\u2026" (revisi\xF3n centralizada). Ahora revisa el <b>organismo superior</b>: la federaci\xF3n revisa la liga, la liga revisa el club.', "Federaci\xF3n: el comit\xE9 y el Ministerio, cada uno su aval. <b>Pendiente de confirmar</b> si esta doble validaci\xF3n existe (P-19).", "Estado <code>En revisi\xF3n</code> en la bandeja del superior; aprobar, devolver con motivo o rechazar. Al activarse, el representante legal es el administrador de la entidad (uno por organismo)."] },
      { title: "Solo demo", items: ["La entidad se guarda en la jerarqu\xEDa bajo su superior. Para ver la bandeja: Liga de Patinaje del Valle (rol LIGA), Federaci\xF3n de Patinaje (rol FEDERACION) o COC (rol COMITE).", 'Los enlaces "Solo demo" al pie de la pantalla tambi\xE9n se ocultan con el switch de notas para devs (queda "Registrar otro").'] }
    ] }
  };
  var SHELL_NOTE = { title: "Shell del registro (todos los pasos)", items: [
    "Las acciones van en una <b>barra fija inferior</b>: Volver a la izquierda y Siguiente / Crear cuenta a la derecha, alineados con la columna del formulario. Progreso de 2px = paso actual / pasos del flujo (sin contar el resultado). Chevrones para navegar, flecha para las acciones finales. Hoy los botones van en el flujo del formulario; es solo presentaci\xF3n, sin cambios de contrato.",
    "<b>Navbar superior fijo</b>: al bajar queda pegado y muestra al centro el nombre de la vista (el t\xEDtulo ya sali\xF3 de pantalla). En m\xF3vil: logo a la izquierda; a la derecha nombre de la vista y men\xFA (iniciar sesi\xF3n, pol\xEDtica de privacidad, t\xE9rminos).",
    "Las tarjetas de selecci\xF3n se <b>deseleccionan</b> al tocar la ya elegida; Siguiente vuelve a deshabilitarse.",
    '<b>Solo demo</b>: el bot\xF3n de destellos junto a esta nota llena lo que falte del paso (archivos simulados incluidos) para poder seguir en cualquier rol. El panel del recorrido ("Recorrido por HU") trae un switch para ocultar estas notas.',
    'Se quit\xF3 el pie "Hecho by Naowee"; la versi\xF3n sigue en la pastilla de la demo. Queda 200px de aire bajo el contenido para poder subirlo por encima de la barra.'
  ] };
  var FLUJO_DOC = { title: "Flujo: primero el documento", items: [
    "Solo se muestra el campo de documento. Al verificarlo, el resultado decide lo que sigue: <b>sin registro previo</b> \u2192 aparece el formulario; <b>caso de error</b> (menor de edad, ya tiene cuenta, perfil sin reclamar, en revisi\xF3n) \u2192 se muestra ese caso y el formulario no aparece.",
    "Hoy producci\xF3n muestra el formulario completo bloqueado hasta verificar; aqu\xED se revela, para que cada resultado se lea como un camino."
  ] };
  Object.keys(DEVNOTES).filter((k) => !k.startsWith("result")).forEach((k) => DEVNOTES[k].sections.push(SHELL_NOTE));
  ["basicos", "entbasicos"].forEach((k) => DEVNOTES[k].sections.push(FLUJO_DOC));
  var DP_MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var DP_DIAS = ["L", "M", "X", "J", "V", "S", "D"];
  var DP_HOY = (() => {
    const n = /* @__PURE__ */ new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  })();
  var dpISO = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  var dpParse = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  };
  var dpFmt = (iso) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
    return m ? `${m[3]}/${m[2]}/${m[1]}` : "";
  };
  function dateField(o) {
    const val = STATE.d[o.path];
    return `<div class="naowee-datepicker-field" data-datefield="${o.path}" data-field="${o.id}" id="${o.id}">
    <label class="naowee-datepicker-field__label${o.required ? " naowee-datepicker-field__label--required" : ""}">${esc(o.label)}</label>
    <div class="naowee-datepicker-field__input" role="button" tabindex="0" aria-haspopup="dialog">
      <span class="naowee-datepicker-field__icon">${I.cal}</span>
      <span class="naowee-datepicker-field__value${val ? "" : " is-placeholder"}">${val ? esc(dpFmt(val)) : "DD/MM/AAAA"}</span>
      <span class="naowee-datepicker-field__chevron">${I.chevron}</span>
    </div>
  </div>`;
  }
  var _dpCleanup = null;
  function closeDatePicker() {
    var _a;
    (_a = document.getElementById("rpDatePop")) == null ? void 0 : _a.remove();
    document.querySelectorAll(".naowee-datepicker-field--active").forEach((f) => f.classList.remove("naowee-datepicker-field--active"));
    if (_dpCleanup) {
      _dpCleanup();
      _dpCleanup = null;
    }
  }
  function openDatePicker(fieldEl2) {
    closeDatePicker();
    const path = fieldEl2.dataset.datefield;
    const sel = dpParse(STATE.d[path]);
    const maxY = DP_HOY.getFullYear();
    const view = { y: (sel || DP_HOY).getFullYear(), m: (sel || DP_HOY).getMonth(), mode: "days" };
    const pop = document.createElement("div");
    pop.className = "naowee-datepicker naowee-datepicker--popover naowee-datepicker--compact";
    pop.id = "rpDatePop";
    document.body.appendChild(pop);
    fieldEl2.classList.add("naowee-datepicker-field--active");
    const trigger = fieldEl2.querySelector(".naowee-datepicker-field__input");
    function anchor() {
      const r = trigger.getBoundingClientRect();
      const w = pop.offsetWidth || 290, h = pop.offsetHeight || 330;
      pop.style.left = Math.max(8, Math.min(r.left, window.innerWidth - w - 8)) + "px";
      const below = window.innerHeight - r.bottom;
      if (below < h + 12 && r.top > below) {
        pop.style.top = "auto";
        pop.style.bottom = window.innerHeight - r.top + 6 + "px";
      } else {
        pop.style.bottom = "auto";
        pop.style.top = r.bottom + 6 + "px";
      }
    }
    function pick(iso) {
      STATE.d[path] = iso;
      closeDatePicker();
      renderPane();
      bindPane();
      ageHint();
      const f = document.getElementById(fieldEl2.id);
      if (f) clearFieldError(f);
    }
    function days() {
      const startDow = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
      const dim = new Date(view.y, view.m + 1, 0).getDate();
      let cells = "";
      for (let i = 0; i < startDow; i++) cells += `<span class="naowee-datepicker__day naowee-datepicker__day--other-month"></span>`;
      for (let d = 1; d <= dim; d++) {
        const dt = new Date(view.y, view.m, d), iso = dpISO(dt);
        const isSel = sel && dpISO(sel) === iso, isToday = dpISO(DP_HOY) === iso, dis = dt > DP_HOY;
        cells += `<button type="button" class="naowee-datepicker__day${isSel ? " naowee-datepicker__day--selected" : ""}${isToday && !isSel ? " naowee-datepicker__day--today" : ""}${dis ? " naowee-datepicker__day--disabled" : ""}" data-day="${iso}"${dis ? " disabled" : ""}>${d}</button>`;
      }
      return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <button type="button" class="naowee-datepicker__month-selector" data-view="months"><span class="naowee-datepicker__month">${DP_MESES[view.m]} ${view.y}</span><span class="naowee-datepicker__month-chevron">${I.chevron}</span></button>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-mo="-1" aria-label="Mes anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-mo="1" aria-label="Mes siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__grid">${DP_DIAS.map((d) => `<span class="naowee-datepicker__weekday">${d}</span>`).join("")}</div>
      <div class="naowee-datepicker__grid">${cells}</div></div>`;
    }
    function months() {
      return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <button type="button" class="naowee-datepicker__month-selector" data-view="years"><span class="naowee-datepicker__month">${view.y}</span><span class="naowee-datepicker__month-chevron">${I.chevron}</span></button>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-yr="-1" aria-label="A\xF1o anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-yr="1" aria-label="A\xF1o siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__month-grid">${DP_MESES.map((mm, i) => `<button type="button" class="naowee-datepicker__month-item${i === view.m ? " naowee-datepicker__month-item--selected" : ""}" data-month="${i}">${mm.slice(0, 3)}</button>`).join("")}</div></div>`;
    }
    function years() {
      const base = view.y - view.y % 12;
      let items = "";
      for (let i = 0; i < 12; i++) {
        const yy = base + i, dis = yy > maxY;
        items += `<button type="button" class="naowee-datepicker__month-item${yy === view.y ? " naowee-datepicker__month-item--selected" : ""}${dis ? " naowee-datepicker__month-item--disabled" : ""}" data-year="${yy}"${dis ? " disabled" : ""}>${yy}</button>`;
      }
      return `<div class="naowee-datepicker__calendar"><div class="naowee-datepicker__header">
      <span class="naowee-datepicker__month" style="padding:0 10px">${base} \u2013 ${base + 11}</span>
      <div class="naowee-datepicker__controls"><button type="button" class="naowee-datepicker__nav" data-yp="-12" aria-label="Anterior">${I.chevL}</button><button type="button" class="naowee-datepicker__nav" data-yp="12" aria-label="Siguiente">${I.chevR}</button></div>
      </div>
      <div class="naowee-datepicker__month-grid">${items}</div></div>`;
    }
    function draw() {
      pop.innerHTML = view.mode === "years" ? years() : view.mode === "months" ? months() : days();
      pop.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => pick(b.dataset.day)));
      pop.querySelectorAll("[data-mo]").forEach((b) => b.addEventListener("click", () => {
        view.m += +b.dataset.mo;
        if (view.m < 0) {
          view.m = 11;
          view.y--;
        }
        if (view.m > 11) {
          view.m = 0;
          view.y++;
        }
        draw();
      }));
      pop.querySelectorAll("[data-yr]").forEach((b) => b.addEventListener("click", () => {
        view.y += +b.dataset.yr;
        draw();
      }));
      pop.querySelectorAll("[data-yp]").forEach((b) => b.addEventListener("click", () => {
        view.y += +b.dataset.yp;
        draw();
      }));
      pop.querySelectorAll("[data-month]").forEach((b) => b.addEventListener("click", () => {
        view.m = +b.dataset.month;
        view.mode = "days";
        draw();
      }));
      pop.querySelectorAll("[data-year]").forEach((b) => b.addEventListener("click", () => {
        view.y = +b.dataset.year;
        view.mode = "months";
        draw();
      }));
      pop.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => {
        view.mode = b.dataset.view;
        draw();
      }));
      anchor();
    }
    draw();
    requestAnimationFrame(() => pop.classList.add("naowee-datepicker--open"));
    const onDoc = (e) => {
      if (!pop.contains(e.target) && !fieldEl2.contains(e.target)) closeDatePicker();
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeDatePicker();
    };
    setTimeout(() => document.addEventListener("pointerdown", onDoc), 0);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", anchor, true);
    window.addEventListener("resize", anchor);
    _dpCleanup = () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", anchor, true);
      window.removeEventListener("resize", anchor);
    };
  }
  function tf(o) {
    const req = o.required ? " naowee-textfield__label--required" : "";
    const attrs = [
      `id="${o.id}"`,
      `type="${o.type || "text"}"`,
      'class="naowee-textfield__input"',
      `placeholder="${esc(o.placeholder || "")}"`,
      `value="${esc(o.value || "")}"`,
      `data-model="${o.path}"`,
      o.mask ? `data-mask="${o.mask}"` : "",
      o.maxLength ? `maxlength="${o.maxLength}"` : "",
      o.mask === "numeric" ? 'inputmode="numeric"' : o.mask === "tel" ? 'inputmode="tel"' : ""
    ].filter(Boolean).join(" ");
    return `<div class="naowee-textfield" data-field="${o.id}">
    <label class="naowee-textfield__label${req}" for="${o.id}">${esc(o.label)}</label>
    <div class="naowee-textfield__input-wrap"><input ${attrs}></div>
  </div>`;
  }
  function dd(key, label, opts, value, required, searchable) {
    const sel = opts.find((o) => o.v === value);
    return `<div class="naowee-dropdown" data-dd="${key}" data-field="dd-${key}" data-required="${required ? 1 : 0}" data-search="${searchable ? 1 : 0}" id="dd-${key}">
    <label class="naowee-dropdown__label${required ? " naowee-dropdown__label--required" : ""}">${esc(label)}</label>
    <button type="button" class="naowee-dropdown__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="naowee-dropdown__value${sel ? "" : " is-placeholder"}">${sel ? esc(sel.t) : "Seleccionar"}</span>
      <span class="naowee-dropdown__chevron">${I.chevron}</span>
    </button>
    <div class="naowee-dropdown__menu" role="listbox" data-opts='${esc(JSON.stringify(opts))}'></div>
  </div>`;
  }
  function uploader(doc) {
    const f = STATE.d.docs[doc.id];
    const inner = f ? `<span class="naowee-file-uploader__placeholder naowee-file-uploader__placeholder--filled">${I.check}${esc(f)}</span>
       <button type="button" class="naowee-file-uploader__action" data-doc-remove="${doc.id}">${I.x} Quitar</button>` : `<span class="naowee-file-uploader__placeholder">Ning\xFAn archivo seleccionado \xB7 PDF, JPG o PNG</span>
       <label class="naowee-file-uploader__action">${I.upload} Subir archivo<input type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" data-doc-input="${doc.id}"></label>`;
    return `<div class="naowee-file-uploader" data-field="doc-${doc.id}" id="doc-${doc.id}">
    <label class="naowee-file-uploader__label naowee-file-uploader__label--required">${esc(doc.label)}</label>
    <div class="naowee-file-uploader__input-wrap">${inner}</div>
  </div>`;
  }
  function mountDD(el) {
    const key = el.dataset.dd;
    const opts = JSON.parse(el.querySelector(".naowee-dropdown__menu").dataset.opts || "[]");
    const searchable = el.dataset.search === "1";
    const trigger = el.querySelector(".naowee-dropdown__trigger");
    const valueEl = el.querySelector(".naowee-dropdown__value");
    const menu = el.querySelector(".naowee-dropdown__menu");
    const cur = () => STATE.d[key];
    function build(filter) {
      const q = norm(filter || "");
      const list = opts.filter((o) => !q || norm(o.t).includes(q));
      let html = searchable ? `<div class="dd-search-wrap"><input type="text" class="dd-search-input" placeholder="Buscar\u2026" aria-label="Buscar"></div>` : "";
      if (!list.length) html += `<div class="dd-empty">Sin coincidencias</div>`;
      html += list.map((o) => `<div class="naowee-dropdown__opt ${o.v === cur() ? "is-selected" : ""}" role="option" data-value="${esc(o.v)}"><span class="naowee-dropdown__opt-main"><span class="naowee-dropdown__opt-name">${esc(o.t)}</span></span><span class="naowee-dropdown__opt-check">${I.check}</span></div>`).join("");
      menu.innerHTML = html;
      if (searchable) {
        const si = menu.querySelector(".dd-search-input");
        si.addEventListener("click", (e) => e.stopPropagation());
        si.addEventListener("input", () => build(si.value));
        setTimeout(() => si.focus(), 40);
      }
    }
    function anchor() {
      const r = trigger.getBoundingClientRect();
      menu.style.left = r.left + "px";
      menu.style.width = r.width + "px";
      menu.style.right = "auto";
      const below = window.innerHeight - r.bottom;
      const flipUp = below < 240 && r.top > below;
      const space = (flipUp ? r.top : below) - 16;
      menu.style.maxHeight = Math.max(160, Math.min(300, space)) + "px";
      if (flipUp) {
        menu.style.top = "auto";
        menu.style.bottom = window.innerHeight - r.top + 6 + "px";
      } else {
        menu.style.bottom = "auto";
        menu.style.top = r.bottom + 6 + "px";
      }
    }
    function open() {
      document.querySelectorAll(".naowee-dropdown--open").forEach((o) => {
        if (o !== el) o.classList.remove("naowee-dropdown--open");
      });
      build("");
      el.classList.add("naowee-dropdown--open");
      trigger.setAttribute("aria-expanded", "true");
      anchor();
      window.addEventListener("scroll", anchor, true);
      window.addEventListener("resize", anchor);
    }
    function close() {
      el.classList.remove("naowee-dropdown--open");
      trigger.setAttribute("aria-expanded", "false");
      window.removeEventListener("scroll", anchor, true);
      window.removeEventListener("resize", anchor);
    }
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      el.classList.contains("naowee-dropdown--open") ? close() : open();
    });
    menu.addEventListener("click", (e) => {
      const opt2 = e.target.closest(".naowee-dropdown__opt");
      if (!opt2) return;
      const o = opts.find((x) => String(x.v) === opt2.dataset.value);
      if (!o) return;
      STATE.d[key] = o.v;
      if (DD_RERENDER[key]) {
        DD_RERENDER[key]();
        close();
        renderPane();
        bindPane();
        return;
      }
      valueEl.textContent = o.t;
      valueEl.classList.remove("is-placeholder");
      el.classList.remove("naowee-dropdown--error");
      close();
    });
    document.addEventListener("click", (e) => {
      if (!el.contains(e.target)) close();
    });
  }
  function onFilePick(inp) {
    const f = inp.files && inp.files[0];
    if (!f) return;
    const wrap = inp.closest(".naowee-file-uploader");
    if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) {
      fieldError(wrap, "Formato no permitido. Usa PDF, JPG o PNG.");
      inp.value = "";
      return;
    }
    STATE.d.docs[inp.dataset.docInput] = f.name + " \xB7 " + fileSizeFmt(f.size);
    clearFieldError(wrap);
    renderPane();
    bindPane();
  }
  function fieldEl(field) {
    return field ? document.querySelector(`[data-field="${field}"]`) : null;
  }
  function fieldError(el, msg2) {
    if (!el) return;
    el.classList.add(el.classList.contains("naowee-file-uploader") ? "naowee-file-uploader--error" : "naowee-textfield--error");
    if (!el.querySelector(".naowee-helper")) {
      const h = document.createElement("div");
      h.className = "naowee-helper naowee-helper--negative";
      h.innerHTML = `<span class="naowee-helper__text"><span class="naowee-helper__badge">${I.bang}</span><span>${esc(msg2)}</span></span>`;
      el.appendChild(h);
    }
  }
  function clearFieldError(el) {
    var _a, _b;
    if (!el) return;
    el.classList.remove("naowee-textfield--error", "naowee-file-uploader--error", "naowee-checkbox--error", "naowee-dropdown--error");
    (_a = el.querySelector(".naowee-helper")) == null ? void 0 : _a.remove();
    (_b = el.querySelector(".reg-choice-group")) == null ? void 0 : _b.classList.remove("is-error");
  }
  function shakeErrors(errs) {
    let first = null;
    errs.forEach((e) => {
      var _a;
      const el = e.field ? fieldEl(e.field) : document.querySelector(".reg-tipo-grid");
      if (!el) return;
      if (!first) first = el;
      if (e.kind === "dd") el.classList.add("naowee-dropdown--error");
      else if (e.kind === "choice") (_a = el.querySelector(".reg-choice-group")) == null ? void 0 : _a.classList.add("is-error");
      else if (e.kind === "tf") fieldError(el, e.msg || "Este campo es obligatorio");
      else if (e.kind === "file") fieldError(el, "Adjunta este documento");
      else if (e.kind === "check") el.classList.add("naowee-checkbox--error");
      el.classList.remove("naowee-shake");
      void el.offsetWidth;
      el.classList.add("naowee-shake");
      setTimeout(() => el.classList.remove("naowee-shake"), 500);
    });
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function setFooterHint(html, hard) {
    const footer = document.getElementById("rpFooter");
    if (!footer) return;
    let hint = document.getElementById("rpBypassHint");
    if (!hint) {
      hint = document.createElement("div");
      hint.id = "rpBypassHint";
      footer.insertBefore(hint, footer.firstChild);
    }
    hint.className = "reg-footer__hint" + (hard ? " reg-footer__hint--hard" : "");
    hint.innerHTML = `${I.bang}<span>${html}</span>`;
  }
  render();
})();
