(() => {
  // organismos-data.js
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
  var SIN_FEDERACION = ["Breaking", "Flag Football", "P\xE1del", "Skateboarding", "Para Powerlifting", "Para B\xE1dminton", "Para Tenis de Mesa"];
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
  function catalogoDeportes() {
    const conFed = allOrganismos().filter((o) => o.tipo === "federacion").flatMap((o) => o.deportes);
    return [.../* @__PURE__ */ new Set([...conFed, ...SIN_FEDERACION])].sort((a, b) => a.localeCompare(b, "es"));
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
  var SEED_VERSION = "0.5.0";
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
  function indexByParent(orgs) {
    const idx = {};
    orgs.forEach((o) => {
      (idx[o.parentId] = idx[o.parentId] || []).push(o);
    });
    const byId = {};
    orgs.forEach((o) => {
      byId[o.id] = o;
    });
    allAfiliaciones().forEach((a) => {
      const club = byId[a.sujetoId];
      if (a.tipo !== "club" || a.estado !== "Vinculada" || !club || club.parentId === a.organismoId) return;
      (idx[a.organismoId] = idx[a.organismoId] || []).push(club);
    });
    return idx;
  }
  function subtreeOf(id) {
    const orgs = allOrganismos();
    const idx = indexByParent(orgs);
    const out = [];
    const stack = [...idx[id] || []];
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
  var _todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  var _norm = (s) => String(s == null ? "" : s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function allSolicitudes() {
    return (readStore("solicitudes", []) || []).map((s) => ({ ...s }));
  }
  function solicitudesDeClub(clubId) {
    return allSolicitudes().filter((s) => s.clubId === clubId);
  }
  function crearSolicitud(deportistaId, clubId, meta = {}) {
    const list = readStore("solicitudes", []) || [];
    const dep = getDeportista(deportistaId);
    const prev = list.find((s) => s.deportistaId === deportistaId && s.clubId === clubId && s.tipo !== "retiro" && s.estado === "Enviada");
    if (prev) return { ...prev };
    const origen = meta.origen || "solicitud";
    const rec = {
      id: "AF-" + String(list.length + 1).padStart(3, "0"),
      tipo: "afiliacion",
      deportistaId,
      clubId,
      estado: "Enviada",
      fecha: _todayISO(),
      origen,
      ...meta.proponenteId ? { proponenteId: meta.proponenteId } : {}
    };
    list.unshift(rec);
    writeStore("solicitudes", list);
    solicitarAfiliacion({ sujetoId: deportistaId, organismoId: clubId, deporte: dep ? dep.deporte : "", origen, proponenteId: meta.proponenteId || null });
    const proponente = meta.proponenteId ? getOrganismo(meta.proponenteId) : null;
    auditLog({
      orgId: clubId,
      deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: rec.fecha,
      responsable: proponente ? proponente.nombre : dep ? dep.nombre : "",
      rol: proponente ? proponente.tipo.toUpperCase() : "DEPORTISTA",
      accion: origen === "propuesta" ? "Club propuesto para el deportista" : "Solicitud de afiliaci\xF3n enviada",
      de: "",
      a: "Enviada",
      motivo: ""
    });
    return { ...rec };
  }
  function crearSolicitudRetiro(deportistaId, clubId) {
    const dep = getDeportista(deportistaId);
    const club = clubId || dep && dep.clubId;
    if (!dep || !club || !dep.clubIds.includes(club)) return null;
    const list = readStore("solicitudes", []) || [];
    const viva = list.find((s) => s.tipo === "retiro" && s.deportistaId === deportistaId && s.clubId === club && s.estado === "Enviada");
    if (viva) return { ...viva };
    const rec = {
      id: "RT-" + String(list.length + 1).padStart(3, "0"),
      tipo: "retiro",
      deportistaId,
      clubId: club,
      estado: "Enviada",
      fecha: _todayISO()
    };
    list.unshift(rec);
    writeStore("solicitudes", list);
    auditLog({
      orgId: club,
      deportistaId,
      deportistaNombre: dep.nombre,
      fecha: rec.fecha,
      responsable: dep.nombre,
      rol: "DEPORTISTA",
      accion: "Solicitud de baja enviada",
      de: "Vinculado",
      a: "Baja solicitada",
      motivo: ""
    });
    return { ...rec };
  }
  function retiroPendienteDe(deportistaId, clubId) {
    return allSolicitudes().find((s) => s.tipo === "retiro" && s.deportistaId === deportistaId && s.estado === "Enviada" && (!clubId || s.clubId === clubId)) || null;
  }
  function cancelarRetiro(deportistaId, clubId) {
    const dep = getDeportista(deportistaId);
    const list = readStore("solicitudes", []) || [];
    let club = null;
    const upd = list.map((s) => {
      if (s.tipo === "retiro" && s.deportistaId === deportistaId && s.estado === "Enviada" && (!clubId || s.clubId === clubId)) {
        club = s.clubId;
        return { ...s, estado: "Retirada", resueltaFecha: _todayISO() };
      }
      return s;
    });
    if (club) {
      writeStore("solicitudes", upd);
      auditLog({
        orgId: club,
        deportistaId,
        deportistaNombre: dep ? dep.nombre : "",
        fecha: _todayISO(),
        responsable: dep ? dep.nombre : "",
        rol: "DEPORTISTA",
        accion: "Solicitud de baja cancelada",
        de: "Baja solicitada",
        a: "Retirada",
        motivo: ""
      });
    }
    return getDeportista(deportistaId);
  }
  function resolverAfiliacion(solicitudId, resultado, meta = {}) {
    const list = readStore("solicitudes", []) || [];
    const i = list.findIndex((s2) => s2.id === solicitudId);
    if (i < 0) return null;
    const s = list[i];
    const esRetiro = s.tipo === "retiro";
    const estadoSol = resultado === "aprobada" ? "Aprobada" : "Rechazada";
    list[i] = { ...s, estado: estadoSol, motivo: meta.motivo || "", responsable: meta.responsable || "", resueltaFecha: _todayISO() };
    writeStore("solicitudes", list);
    const dep = getDeportista(s.deportistaId);
    if (esRetiro) {
      if (resultado === "aprobada") cambiarAfiliacion(s.deportistaId, s.clubId, "Terminada", { fin: "retiro" });
    } else {
      cambiarAfiliacion(s.deportistaId, s.clubId, resultado === "aprobada" ? "Vinculada" : "Rechazada", { motivo: meta.motivo });
    }
    auditLog({
      orgId: s.clubId,
      deportistaId: s.deportistaId,
      deportistaNombre: dep ? dep.nombre : "",
      fecha: _todayISO(),
      responsable: meta.responsable || "",
      rol: "CLUB",
      accion: esRetiro ? resultado === "aprobada" ? "Baja confirmada" : "Baja rechazada" : resultado === "aprobada" ? "Afiliaci\xF3n aprobada" : "Afiliaci\xF3n rechazada",
      de: esRetiro ? "Baja solicitada" : "Enviada",
      a: estadoSol,
      motivo: meta.motivo || "",
      notif: true
    });
    return { ...list[i] };
  }
  function retirarAfiliacion(deportistaId, meta = {}, clubId) {
    const dep = getDeportista(deportistaId);
    const list = readStore("solicitudes", []) || [];
    const clubes = /* @__PURE__ */ new Set();
    const upd = list.map((s) => {
      if (s.deportistaId === deportistaId && (s.estado === "Enviada" || s.estado === "Aprobada") && (!clubId || s.clubId === clubId)) {
        clubes.add(s.clubId);
        return { ...s, estado: "Retirada", resueltaFecha: _todayISO() };
      }
      return s;
    });
    writeStore("solicitudes", upd);
    if (dep) (clubId ? [clubId] : dep.clubIds).forEach((c) => clubes.add(c));
    clubes.forEach((c) => {
      const era = dep && dep.clubIds.includes(c);
      cambiarAfiliacion(deportistaId, c, era ? "Terminada" : "Rechazada", { fin: "retiro", motivo: era ? "" : "Retirada por el deportista" });
      auditLog({
        orgId: c,
        deportistaId,
        deportistaNombre: dep ? dep.nombre : "",
        fecha: _todayISO(),
        responsable: dep ? dep.nombre : "",
        rol: "DEPORTISTA",
        accion: "Afiliaci\xF3n retirada",
        de: era ? "Vinculado" : "Enviada",
        a: "Retirada",
        motivo: ""
      });
    });
    return getDeportista(deportistaId);
  }
  function desvincularPorClub(deportistaId, meta = {}) {
    const dep = getDeportista(deportistaId);
    const clubPrev = meta.clubId || dep && dep.clubId;
    if (!dep || !clubPrev || !dep.clubIds.includes(clubPrev)) return null;
    const list = readStore("solicitudes", []) || [];
    const cerradas = list.map((s) => s.deportistaId === deportistaId && s.clubId === clubPrev && (s.estado === "Enviada" || s.estado === "Aprobada") ? { ...s, estado: "Retirada", resueltaFecha: _todayISO() } : s);
    const registro = {
      id: "SOL-" + String(cerradas.length + 1).padStart(3, "0") + "-DSV",
      tipo: "desvinculacion",
      deportistaId,
      clubId: clubPrev,
      estado: "Desvinculado",
      fecha: _todayISO(),
      resueltaFecha: _todayISO(),
      motivo: meta.motivo || "",
      responsable: meta.responsable || ""
    };
    writeStore("solicitudes", [registro, ...cerradas]);
    cambiarAfiliacion(deportistaId, clubPrev, "Terminada", { fin: "desvinculacion", motivo: meta.motivo });
    const quedan = getDeportista(deportistaId).clubIds.length;
    auditLog({
      orgId: clubPrev,
      deportistaId,
      deportistaNombre: dep.nombre,
      fecha: _todayISO(),
      responsable: meta.responsable || "",
      rol: "CLUB",
      accion: "Deportista desvinculado",
      de: "Vinculado",
      a: quedan ? "Vinculado en otro club" : "Autodeclarado",
      motivo: meta.motivo || ""
    });
    return getDeportista(deportistaId);
  }
  function edadDe(fechaNac) {
    if (!fechaNac) return null;
    const [y, m, d] = fechaNac.split("-").map(Number);
    const h = /* @__PURE__ */ new Date();
    return h.getFullYear() - y - (h.getMonth() + 1 < m || h.getMonth() + 1 === m && h.getDate() < d ? 1 : 0);
  }
  function menoresDe(tutorId) {
    return allDeportistas().filter((d) => d.tutorId === tutorId);
  }
  function registrarMenor(tutorId, datos) {
    const nuevos = readStore("deportistas-nuevos", []) || [];
    const dep = { modalidad: "", correo: "", ...datos, id: `DEP-M${String(nuevos.length + 1).padStart(3, "0")}`, tutorId, origen: "tutor", fechaRegistro: _todayISO() };
    delete dep.clubId;
    delete dep.estado;
    nuevos.push(dep);
    writeStore("deportistas-nuevos", nuevos);
    const tutor = getDeportista(tutorId);
    auditLog({ orgId: "", fecha: _todayISO(), deportistaId: dep.id, deportistaNombre: dep.nombre, responsable: tutor ? tutor.nombre : "", rol: "Tutor", accion: "Menor registrado por su tutor" });
    return getDeportista(dep.id);
  }
  function solicitarVinculo(personaId, orgId, rol) {
    const p = getDeportista(personaId);
    const rec = solicitarAfiliacion({ tipo: "personal", sujetoId: personaId, organismoId: orgId, deporte: p ? p.deporte : "", origen: "solicitud" });
    if (rol) {
      const list = allAfiliaciones();
      const i = list.findIndex((a) => a.id === rec.id);
      if (i >= 0) {
        list[i] = { ...list[i], rol };
        writeStore("afiliaciones", list);
      }
    }
    auditLog({ orgId, fecha: _todayISO(), deportistaId: personaId, deportistaNombre: p ? p.nombre : "", responsable: p ? p.nombre : "", rol: "Personal deportivo", accion: "V\xEDnculo de personal solicitado", a: "Solicitado" });
    return rec;
  }
  function resolverVinculo(personaId, orgId, estado, meta = {}) {
    const p = getDeportista(personaId);
    const r = cambiarAfiliacion(personaId, orgId, estado, { tipo: "personal", ...meta });
    const ACC = { Vinculada: "V\xEDnculo de personal aprobado", Rechazada: "V\xEDnculo de personal rechazado", Terminada: "V\xEDnculo de personal terminado" };
    auditLog({ orgId, fecha: _todayISO(), deportistaId: personaId, deportistaNombre: p ? p.nombre : "", responsable: meta.responsable || "", rol: meta.rol || "", accion: ACC[estado] || "V\xEDnculo actualizado", a: estado, motivo: meta.motivo || "", notif: true });
    return r;
  }
  var nombreTerritorio = (t) => t.municipio ? `${t.municipio} (${t.depto})` : t.depto;
  var enTerritorio = (o, t) => o.ubicacion && o.ubicacion.depto === t.depto && (!t.municipio || o.ubicacion.ciudad === t.municipio);
  function organismosDeTerritorio(t) {
    return allOrganismos().filter((o) => (t.municipio ? o.tipo === "club" : ["liga", "club"].includes(o.tipo)) && enTerritorio(o, t));
  }
  function buscarClubesActivos(query) {
    const q = String(query || "").trim();
    if (q.length < 3) return [];
    const nq = _norm(q);
    return allOrganismos().filter((o) => o.tipo === "club" && o.estado === "Activo").filter((o) => _norm(o.nombre).includes(nq) || _norm(o.nit).includes(nq)).sort((a, b) => a.nombre.localeCompare(b.nombre, "es")).map((o) => ({ ...o }));
  }

  // permissions.js
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

  // sidebar.js
  var COLLAPSED_KEY = "naowee-organismos-sidebar-collapsed";
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
  function getIcon(name) {
    return ICONS[name] || "";
  }
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
  var NIVELES_JERARQUIA = [["comite", "Comit\xE9s"], ["federacion", "Federaciones"], ["liga", "Ligas"], ["club", "Clubes"], ["deportista", "Deportistas"]];
  var NIVEL_JERARQUIA_IDX = (n) => NIVELES_JERARQUIA.findIndex(([x]) => x === n);
  var NIVEL_PROPIO = { MINDEPORTE: null, MINISTRO: null, COMITE: "comite", FEDERACION: "federacion", LIGA: "liga", CLUB: "club", DEPORTISTA: "deportista", TERRITORIAL: "federacion" };
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
        { id: "bandeja", label: "Solicitudes de deportistas", icon: "inbox", route: "bandeja.html" }
      ] },
      { section: "MI ORGANISMO", items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }, { id: "eventos", label: "Eventos", icon: "cal", route: "organismo-detalle.html?tab=eventos" }, { id: "usuarios", label: "Usuarios", icon: "users", route: "usuarios.html" }] }
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
  function personaDe(roleCode2) {
    let id = null;
    try {
      id = new URLSearchParams(window.location.search).get("como");
      if (id && (PERSONAS[id] || id === "org")) sessionStorage.setItem(PERSONA_KEY, id);
      else id = sessionStorage.getItem(PERSONA_KEY);
    } catch (_) {
    }
    if (id === "org") return null;
    if (!PERSONAS[id]) id = PERSONA_POR_ROL[roleCode2] || null;
    const p = PERSONAS[id];
    return p && p.contextos.some((c) => c.role === roleCode2) ? { id, ...p } : null;
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
  var MENU_NO_ACTIVO = [{ section: null, items: [{ id: "mi-organismo", label: "Mi organismo", icon: "id", route: "organismo-detalle.html" }] }];
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
  function hrefForItem(item, roleCode2) {
    if (item.route && item.route.includes(".html")) {
      const sep = item.route.includes("?") ? "&" : "?";
      return `${item.route}${sep}role=${roleCode2}`;
    }
    return null;
  }
  function mountSidebar({ rootEl, roleCode: roleCode2, activeId: activeId2 }) {
    const role = ROLES[roleCode2] || ROLES.MINDEPORTE;
    const sections2 = getMenuForRole(role.code);
    const isCollapsed = localStorage.getItem(COLLAPSED_KEY) === "1";
    rootEl.innerHTML = renderSidebar({ sections: sections2, activeId: activeId2, isCollapsed, roleCode: role.code });
    bindSidebarEvents(rootEl);
    setupTooltips(rootEl);
    return { role, sections: sections2 };
  }
  function renderSection(section, activeId2, roleCode2) {
    return `
    ${section.section ? `<div class="nav-section">${section.section}</div>` : ""}
    ${section.items.map((it) => renderRow(it, activeId2, roleCode2)).join("")}
  `;
  }
  function renderRow(item, activeId2, roleCode2) {
    const isActive = item.id === activeId2 || item.id === "jerarquia" && String(activeId2).startsWith("jerarquia-");
    const href = hrefForItem(item, roleCode2);
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
  function renderSidebar({ sections: sections2, activeId: activeId2, isCollapsed, roleCode: roleCode2 }) {
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
        ${sections2.map((s) => renderSection(s, activeId2, roleCode2)).join("")}
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
        var _a4;
        if (row.classList.contains("active")) return;
        flashPlaceholder(((_a4 = row.querySelector(".lbl")) == null ? void 0 : _a4.textContent) || "Esta secci\xF3n");
        closeDrawer();
      });
    });
    rootEl.querySelectorAll(".nav-row[href]").forEach((row) => {
      row.addEventListener("click", closeDrawer);
    });
  }
  var _toastTimer = null;
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
  var _tooltipEl = null;
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
  function mountHeader({ headerEl, role }) {
    const initials = role.avatar || (role.userName || role.label).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    headerEl.innerHTML = `
    <button class="header-burger" id="headerBurger" type="button" aria-label="Abrir men\xFA">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
    <div class="profile-switcher" id="profileSwitcher">
      <div class="user-chip" id="userChipTrigger" role="button" tabindex="0" aria-haspopup="menu" aria-label="Mi cuenta">
        <div class="ava">
          <div class="ava-ring" style="background:${role.color}22;color:${role.color}">${initials}</div>
          <div class="ava-dot"></div>
        </div>
        <div class="user-info">
          <span class="user-name">${role.userName}</span>
          <span class="user-role">${role.label}</span>
        </div>
        <button class="user-chip__chevron" type="button" tabindex="-1" aria-hidden="true">${getIcon("chevron")}</button>
      </div>
      <div class="profile-dd profile-dd--identity-only" role="menu">
        <div class="profile-dd__header">
          <span class="ava-ring" style="width:42px;height:42px;font-size:14px;background:${role.color}22;color:${role.color}">${initials}</span>
          <div class="profile-dd__user">
            <strong>${role.userName}</strong>
            <span class="profile-dd__doc">${getIcon("id")}${role.userDoc || "\u2014"}</span>
            <span class="profile-dd__current-role" style="color:${role.color}">
              <span class="profile-dd__check-ico">${getIcon("check")}</span>${role.label}${role.org && role.org !== "\u2014" ? ` \xB7 ${role.org}` : ""}
            </span>
          </div>
        </div>
        ${perfilesDemoHtml(role.code)}
      </div>
    </div>
  `;
    bindHeaderEvents(headerEl);
    mountContexto(role);
  }
  var TIPO_TXT = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
  var COLOR_TIPO = { comite: "#d74009", federacion: "#1f78d1", liga: "#7c3aed", club: "#1f8923" };
  var NO_INICIAL = /* @__PURE__ */ new Set(["liga", "club", "federaci\xF3n", "federacion", "comit\xE9", "comite", "colombiana", "colombiano", "de", "del", "la", "el", "los", "las", "y", "deportivo"]);
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
  function mountContexto(role) {
    const lista = (role.contextos || []).map((c) => ({ ...c, o: getOrganismo(c.org) })).filter((c) => c.o);
    const head = document.querySelector(".page-inner > .page-head, .page-inner .page-head");
    if (lista.length < 2 || !head || document.getElementById("ctxBar")) return;
    const actual = getOrganismo(scopeFor(role.code)) || lista[0].o;
    const pagina = location.pathname.split("/").pop() || "index.html";
    const COMUNES = ["jerarquia.html", "bandeja.html", "cargue.html", "deportistas.html"];
    const destino = (rol) => COMUNES.includes(pagina) ? pagina : homeForRole(rol);
    const href = (c) => `${destino(c.role)}?role=${c.role}&org=${c.org}${role.persona ? `&como=${role.persona}` : ""}`;
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
      const sel = o.id === actual.id;
      return `<a class="naowee-dropdown__opt ctx-opt${sel ? " is-selected" : ""}" role="option" aria-selected="${sel}" href="${href(c)}">
            ${orgIco(o, 34)}
            <span class="ctx-opt__txt">
              <span class="ctx-opt__name">${o.nombre}</span>
              <span class="ctx-opt__meta">${meta(o)}</span>
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
  var HOME_DEMO = { CLUB: "bandeja.html", DEPORTISTA: "perfil.html", PERSONA: "perfil.html" };
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
      var _a4, _b;
      if (e.key === "Escape") {
        closeDrawer();
        (_a4 = document.getElementById("profileSwitcher")) == null ? void 0 : _a4.classList.remove("open");
        (_b = document.getElementById("demoSwitcher")) == null ? void 0 : _b.classList.remove("is-open");
      }
    });
  }
  var MODE_KEY = "naowee-organismos-demo-mode";
  var TOUR_KEY = "naowee-organismos-tour-seen";
  function getDemoMode() {
    const m = localStorage.getItem(MODE_KEY);
    return m === "blank" || m === "demo" ? m : "demo";
  }
  var esLocal = () => location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var ROLE_GROUPS = [
    { label: "Rector\xEDa", codes: ["MINDEPORTE", "MINISTRO"] },
    { label: "Territorio", codes: ["TERRITORIAL"] },
    { label: "Cabezas de sector", codes: ["COMITE"] },
    { label: "Organismos", codes: ["FEDERACION", "LIGA", "CLUB"] },
    { label: "Personas", codes: ["DEPORTISTA", "PERSONA"] }
  ];
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
  function mountDemoSwitcher({ roleCode: roleCode2 }) {
    const current = ROLES[roleCode2] || ROLES.MINDEPORTE;
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
    var _a4, _b;
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
    (_a4 = root2.querySelector("#demoRestartTourBtn")) == null ? void 0 : _a4.addEventListener("click", (e) => {
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

  // devnotes.js?v=1.7.0
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

  // deportista-detalle.js
  var MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  var TIER_LABEL = { olimpico: "Ol\xEDmpico", profesional: "Profesional", juvenil: "Juvenil", amateur: "Amateur" };
  var DOC_LABEL = { CC: "C\xE9dula de ciudadan\xEDa", TI: "Tarjeta de identidad", CE: "C\xE9dula de extranjer\xEDa", PA: "Pasaporte" };
  var DEPORTE_EMOJI = { Patinaje: "\u{1F6FC}", Nataci\u00F3n: "\u{1F3CA}", F\u00FAtbol: "\u26BD", Ciclismo: "\u{1F6B4}", Atletismo: "\u{1F3C3}", Baloncesto: "\u{1F3C0}" };
  var SANGRES = ["O+", "A+", "B+", "O-", "A-", "AB+"];
  var PERFIL_EXTRA = {
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

  // perfil.js
  var SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
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
  var ic = (id, cls = "") => `<svg class="i ${cls}" aria-hidden="true"><use href="#mp-${id}"/></svg>`;
  var esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var qs = () => new URLSearchParams(window.location.search);
  var ORG_ROLES = ["CLUB", "LIGA", "FEDERACION"];
  function resolveViewer() {
    const q = qs();
    const role = q.get("role");
    const comite = q.get("visor") === "comite" || role === "COMITE";
    let kind = "own";
    let shellRole = "PERSONA";
    if (q.get("modo") === "consulta" || role === "MINDEPORTE") {
      kind = "admin";
      shellRole = "MINDEPORTE";
    } else if (role === "DEPORTISTA") {
      kind = "own";
      shellRole = "DEPORTISTA";
    } else if (role === "TERRITORIAL") {
      kind = "org";
      shellRole = "TERRITORIAL";
    } else if (role === "MINISTRO") {
      kind = "org";
      shellRole = "MINISTRO";
    } else if (ORG_ROLES.includes(role)) {
      kind = "org";
      shellRole = role;
    } else if (comite) {
      kind = "comite";
      shellRole = "COMITE";
    }
    const orgId = kind === "org" ? scopeFor(role) : null;
    return { kind, shellRole, orgId, analisis: kind === "comite" };
  }
  var LAURA = "DEP-022";
  var PERSONA_ID = (() => {
    const q = qs();
    const id = q.get("persona");
    if (id && id !== "laura" && id !== "ajena" && getDeportista(id)) return id;
    return q.get("role") === "DEPORTISTA" ? "DEP-001" : LAURA;
  })();
  var DEP = getDeportista(PERSONA_ID);
  var DET = (() => {
    try {
      return buildDeportistaDetalle(DEP);
    } catch (_) {
      return null;
    }
  })();
  var _a;
  var edadP = (_a = edadDe(DEP.fechaNac)) != null ? _a : DET ? DET.edad : null;
  var P = PERSONA_ID === LAURA ? {
    nombre: "Laura Marcela G\xF3mez Restrepo",
    corto: "Laura",
    ini: "LG",
    doc: "C.C. 1.032.987.456",
    edad: `${edadP} a\xF1os`,
    deporte: "Patinaje (carreras)",
    depto: "Valle del Cauca",
    muni: "Cali",
    correo: "laura.gomez@correo.co",
    rolApoyo: "Docente/Entrenador"
  } : {
    nombre: DEP.nombre,
    corto: DEP.nombre.split(" ")[0],
    ini: DEP.nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase(),
    doc: `${DEP.tipoDoc === "TI" ? "T.I." : DEP.tipoDoc === "CC" ? "C.C." : DEP.tipoDoc} ${Number(DEP.numDoc).toLocaleString("es-CO")}`,
    edad: edadP != null ? `${edadP} a\xF1os` : "",
    deporte: `${DEP.deporte}${DEP.modalidad ? ` (${DEP.modalidad.toLowerCase()})` : ""}`,
    depto: DET ? DET.ubicacion.depto : "\u2014",
    muni: DET ? DET.ubicacion.municipio : "\u2014",
    correo: DEP.correo || (DET ? DET.contacto.correo : "\u2014"),
    rolApoyo: DEP.rolApoyo || ""
  };
  var TUTOR = DEP.tutorId ? getDeportista(DEP.tutorId) : null;
  var ALL_ROLES = ["deportista", "tutor", "apoyo"];
  var ROLE = {
    deportista: { name: "Deportista", icon: "run", group: "Como deportista", hint: DEP.deporte },
    tutor: { name: "Tutor legal", icon: "family", group: "Como tutor legal", hint: "" },
    apoyo: { name: "Personal de apoyo", icon: "whistle", group: "Como personal de apoyo", hint: P.rolApoyo }
  };
  var TABS = [
    { id: "datos", label: "Datos", title: "Datos personales", fields: [
      ["Nombre", "Laura"],
      ["Segundo nombre", "Marcela"],
      ["Apellido", "G\xF3mez"],
      ["Segundo apellido", "Restrepo"],
      ["Tipo de documento", "C\xE9dula de ciudadan\xEDa", "lock"],
      ["N\xFAmero de documento", "1.032.987.456", "lock"],
      ["Fecha expedici\xF3n documento", "14/08/2010"],
      ["Sexo", "Femenino"],
      ["Fecha de nacimiento", "03/05/1992"],
      ["Edad", "34 a\xF1os", "lock"],
      ["Departamento de nacimiento", "Valle del Cauca"],
      ["Municipio de nacimiento", "Cali"],
      ["Nacionalidad", "Colombiana"],
      ["Deporte principal", "Patinaje (carreras)", "", "deportista"]
    ] },
    { id: "ubic", label: "Ubicaci\xF3n", title: "Ubicaci\xF3n", fields: [
      ["Direcci\xF3n", "Calle 5 # 38-25, apto 402"],
      ["Departamento", "Valle del Cauca"],
      ["Municipio", "Cali"],
      ["Zona", "Urbana"]
    ] },
    { id: "cont", label: "Contacto", title: "Contacto", fields: [
      ["Tel\xE9fono", "315 482 7710"],
      ["Correo electr\xF3nico", "laura.gomez@correo.co"]
    ] },
    { id: "salud", label: "Salud", title: "Salud", sensitive: true, fields: [
      ["EPS", "Sura EPS"],
      ["Nombre del contacto de emergencia", "Andr\xE9s G\xF3mez Restrepo"],
      ["Tel\xE9fono de emergencia", "318 220 4419"],
      ["Relaci\xF3n con contacto de emergencia", "Hermano"],
      ["Protecci\xF3n menores", "No aplica"]
    ] },
    { id: "socio", label: "Sociodemogr\xE1fico", title: "Sociodemogr\xE1fico", sensitive: true, fields: [
      ["Identidad de g\xE9nero", "Mujer"],
      ["Orientaci\xF3n sexual", "Prefiere no responder"],
      ["Discapacidad", "Ninguna"],
      ["Pertenencia \xE9tnica", "Ninguna"],
      ["V\xEDctima del conflicto armado", "No"],
      ["Priorizaci\xF3n", "No aplica"]
    ] },
    { id: "adic", label: "Datos adicionales", title: "Datos adicionales", fields: [
      ["Talla de uniforme", "S"],
      ["Grado escolar", "Profesional"]
    ] }
  ];
  if (PERSONA_ID !== LAURA && DET) {
    const partes = DEP.nombre.split(/\s+/);
    const v = (x) => x || "\u2014";
    const VAL = {
      "Nombre": partes[0],
      "Segundo nombre": partes.length > 3 ? partes[1] : "",
      "Apellido": partes.length > 3 ? partes[2] : v(partes[1]),
      "Segundo apellido": partes.length > 3 ? v(partes[3]) : v(partes[2]),
      "Tipo de documento": DET.doc.tipo,
      "N\xFAmero de documento": Number(DEP.numDoc).toLocaleString("es-CO"),
      "Fecha expedici\xF3n documento": "\u2014",
      "Sexo": DEP.sexo === "Hombre" ? "Masculino" : DEP.sexo === "Mujer" ? "Femenino" : DET.sexo,
      "Fecha de nacimiento": DEP.fechaNac ? DEP.fechaNac.split("-").reverse().join("/") : DET.nacimiento,
      "Edad": P.edad,
      "Departamento de nacimiento": DET.ubicacion.depto,
      "Municipio de nacimiento": DET.ubicacion.municipio,
      "Nacionalidad": "Colombiana",
      "Deporte principal": P.deporte,
      "Direcci\xF3n": "\u2014",
      "Departamento": DET.ubicacion.depto,
      "Municipio": DET.ubicacion.municipio,
      "Zona": DET.ubicacion.zona,
      "Tel\xE9fono": DET.contacto.telefono,
      "Correo electr\xF3nico": P.correo,
      "Nombre del contacto de emergencia": TUTOR ? TUTOR.nombre : DET.contacto.emergenciaNombre,
      "Tel\xE9fono de emergencia": DET.contacto.emergenciaTel,
      "Relaci\xF3n con contacto de emergencia": TUTOR ? "Tutor legal" : "Familiar",
      "Protecci\xF3n menores": TUTOR ? "Tutor legal registrado" : "No aplica"
    };
    TABS.forEach((t) => t.fields.forEach((f) => {
      if (f[0] in VAL) f[1] = VAL[f[0]];
      else f[1] = "\u2014";
    }));
  }
  var TRAY = [
    { yr: 2025, ev: "Juegos Nacionales", prueba: "500 m", fase: "Final", pos: "2.\xBA", marca: "43,812 s", medal: "silver", cyc: true },
    { yr: 2024, ev: "Campeonato Nacional", prueba: "1000 m", fase: "Final", pos: "1.\xBA", marca: "1:27,405", medal: "gold", cyc: true },
    { yr: 2023, ev: "Juegos Departamentales", prueba: "500 m", fase: "Semifinal", pos: "4.\xBA", marca: "45,130 s", medal: null }
  ];
  var MEDAL = { gold: "Oro", silver: "Plata", bronze: "Bronce" };
  var EVAL = [
    ["T\xE9cnica", "Salida explosiva y buena posici\xF3n baja en la recta. Pierde eficiencia en la segunda curva por apertura del apoyo derecho."],
    ["T\xE1ctica", "Lee bien la carrera desde la segunda posici\xF3n; el adelantamiento final lleg\xF3 tarde para disputar el oro."],
    ["F\xEDsica", "Potencia anaer\xF3bica por encima del promedio de la categor\xEDa. Recuperaci\xF3n entre series mejorable."],
    ["Conclusiones", "Deportista con proyecci\xF3n para el ciclo ol\xEDmpico en distancias cortas."],
    ["Recomendaciones", "Trabajo espec\xEDfico de curva y bloques de resistencia a la velocidad en el pr\xF3ximo mesociclo."]
  ];
  var ESTADO = {
    vinculado: ["Vinculado", "ok"],
    solicitada: ["Solicitada", "wait"],
    solicitado: ["Solicitado", "wait"],
    rechazada: ["Rechazada", "no"],
    rechazado: ["Rechazado", "no"],
    desvinculado: ["Desvinculado", "off"],
    registrado: ["Registrado", "ok"],
    revision: ["En revisi\xF3n", "rev"],
    pendiente: ["Pendiente", "wait"],
    inactivo: ["Inactivo", "off"]
  };
  var pill = (e) => `<span class="mp-st mp-st--${ESTADO[e][1]}">${ESTADO[e][0]}</span>`;
  var viewer = resolveViewer();
  var own = viewer.kind === "own";
  var third = !own;
  var canEdit = viewer.kind === "own" || viewer.kind === "admin";
  var ROLES_DATOS = () => [
    ...DEP.esDeportista === false ? [] : ["deportista"],
    ...menoresDe(PERSONA_ID).length || DEP.rolTutor ? ["tutor"] : [],
    ...DEP.rolApoyo || afiliacionesDe(PERSONA_ID).some((a) => a.tipo === "personal") ? ["apoyo"] : []
  ];
  var parseRoles = () => {
    const base = ROLES_DATOS();
    const r = (qs().get("roles") || base.join(",")).split(",").map((s) => s.trim()).filter((s) => base.includes(s));
    return r.length ? r : base;
  };
  var personaRoles = parseRoles();
  var TERR = territorioDe(qs().get("role"));
  var scope = viewer.orgId ? /* @__PURE__ */ new Set([viewer.orgId, ...subtreeOf(viewer.orgId).map((o) => o.id)]) : TERR ? new Set(organismosDeTerritorio(TERR).flatMap((o) => [o.id, ...subtreeOf(o.id).map((x) => x.id)])) : null;
  var _a2;
  var orgName = viewer.orgId ? ((_a2 = getOrganismo(viewer.orgId)) == null ? void 0 : _a2.nombre) || "tu organismo" : TERR ? nombreTerritorio(TERR) : viewer.shellRole === "MINISTRO" ? "el Ministerio del Deporte (consulta)" : "";
  var state = {
    section: qs().get("seccion") === "analisis" && !resolveViewer().analisis ? "perfil" : qs().get("seccion") || "perfil",
    tab: { perfil: "datos", tray: "tr", eval: 0 },
    editing: null,
    activa: true,
    pendOpen: false
  };
  var dmy = (iso) => iso ? iso.slice(0, 10).split("-").reverse().join("/") : "";
  var TIPO_TXT2 = { comite: "Comit\xE9", federacion: "Federaci\xF3n", liga: "Liga", club: "Club" };
  var ARTICULO = { comite: "el comit\xE9", federacion: "la federaci\xF3n", liga: "la liga", club: "el club" };
  var EST_AF = { Vinculada: "vinculado", Solicitada: "solicitada", Rechazada: "rechazada", Terminada: "desvinculado" };
  var EST_VI = { Vinculada: "vinculado", Solicitada: "solicitado", Rechazada: "rechazado", Terminada: "desvinculado" };
  function itemDe(a, est) {
    const o = getOrganismo(a.organismoId) || {};
    const cadena = o.tipo === "club" ? ancestorsOf(o.id).filter((x) => x.tipo !== "comite").map((x) => x.nombre).join(" \xB7 ") : "";
    const fecha = a.estado === "Vinculada" ? `Desde ${dmy(a.desde)}` : a.estado === "Solicitada" ? `Enviada el ${dmy(a.fecha || a.desde) || "hoy"}` : a.estado === "Terminada" ? `Hasta ${dmy(a.hasta)}${a.fin === "desvinculacion" ? " \xB7 desvinculado por el club" : ""}` : `Rechazada${a.motivo ? ` \xB7 ${a.motivo}` : ""}`;
    return {
      id: a.id,
      org: a.organismoId,
      tipoOrg: o.tipo,
      nombre: o.nombre || a.organismoId,
      sub: [TIPO_TXT2[o.tipo], a.deporte || o.deporte, o.ubicacion ? o.ubicacion.ciudad : ""].filter(Boolean).join(" \xB7 "),
      cadena,
      estado: est[a.estado] || "pendiente",
      fecha,
      aprueba: ARTICULO[o.tipo] || "el organismo",
      motivo: a.motivo || "",
      touched: true,
      baja: a.tipo === "deportista" && a.estado === "Vinculada" && !!retiroPendienteDe(PERSONA_ID, a.organismoId)
    };
  }
  var AFS = () => afiliacionesDe(PERSONA_ID).filter((a) => a.tipo === "deportista").map((a) => itemDe(a, EST_AF));
  var VIS = () => afiliacionesDe(PERSONA_ID).filter((a) => a.tipo === "personal").map((a) => itemDe(a, EST_VI));
  var MEN = () => menoresDe(PERSONA_ID).map((m) => {
    const e = edadDe(m.fechaNac);
    const club = m.clubId ? getOrganismo(m.clubId) : null;
    return {
      id: m.id,
      ini: m.nombre.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase(),
      nombre: m.nombre,
      meta: [m.tipoDoc === "TI" ? "T.I." : m.tipoDoc === "RC" ? "R.C." : m.tipoDoc, e != null ? `${e} a\xF1os` : "", `${m.deporte}${club ? " \xB7 " + club.nombre : ""}`, `V\xEDnculo: ${m.parentesco || "Tutor legal"}`].filter(Boolean),
      estado: m.docsEstado === "revision" ? "revision" : "registrado",
      org: m.clubId
    };
  });
  ROLE.tutor.hint = (() => {
    const n = menoresDe(PERSONA_ID).length;
    return n ? `${n} menor${n > 1 ? "es" : ""}` : "";
  })();
  var VIVOS = ["vinculado", "solicitada", "solicitado"];
  var inScope = (it) => !scope || scope.has(it.org);
  var afiliacionesVis = () => AFS().filter((a) => inScope(a) && (VIVOS.includes(a.estado) || a.touched));
  var vinculosVis = () => VIS().filter((v) => inScope(v) && (VIVOS.includes(v.estado) || v.touched));
  function visibleRoles() {
    return personaRoles.filter((r) => {
      if (viewer.kind !== "org") return true;
      if (r === "deportista") return AFS().some(inScope);
      if (r === "apoyo") return VIS().some(inScope);
      return r === "tutor";
    });
  }
  var has = (r) => visibleRoles().includes(r);
  function sections() {
    const out = [{ id: "perfil", label: "Perfil", icon: "user" }];
    if (has("deportista")) {
      out.push({ id: "trayectoria", label: "Trayectoria", icon: "trophy", group: "deportista" });
      out.push({ id: "afiliaciones", label: "Afiliaciones", icon: "building", group: "deportista", pend: pendAfil() });
      if (viewer.analisis) out.push({ id: "analisis", label: "An\xE1lisis cualitativo", icon: "chart", group: "deportista", only: "Solo Comit\xE9 Ol\xEDmpico y ROOT" });
    }
    if (has("tutor")) out.push({ id: "menores", label: third ? "Menores" : "Mis menores", icon: "family", group: "tutor", pend: pendMen() });
    if (has("apoyo")) out.push({ id: "vinculos", label: "V\xEDnculos", icon: "link", group: "apoyo", pend: pendVin() });
    if (own || viewer.kind === "admin") out.push({ id: "documentos", label: "Documentos", icon: "doc", soon: true });
    if (own) out.push({ id: "configuracion", label: "Configuraci\xF3n", icon: "gear", soon: true });
    return out;
  }
  function pendAfil() {
    const n = afiliacionesVis().filter((a) => a.estado === "solicitada").length;
    return n ? { txt: `${n} solicitada${n > 1 ? "s" : ""}`, aria: `${n} afiliaci\xF3n${n > 1 ? "es" : ""} solicitada${n > 1 ? "s" : ""}, pendiente${n > 1 ? "s" : ""} de aprobaci\xF3n` } : null;
  }
  function pendMen() {
    const n = MEN().filter((m) => m.estado === "revision").length;
    return n ? { txt: `${n} en revisi\xF3n`, aria: `${n} menor${n > 1 ? "es" : ""} en revisi\xF3n`, rev: true } : null;
  }
  function pendVin() {
    const n = vinculosVis().filter((v) => v.estado === "solicitado").length;
    return n ? { txt: `${n} solicitado${n > 1 ? "s" : ""}`, aria: `${n} v\xEDnculo${n > 1 ? "s" : ""} solicitado${n > 1 ? "s" : ""}, pendiente${n > 1 ? "s" : ""} de aprobaci\xF3n` } : null;
  }
  function pendientes() {
    if (!own) return [];
    const out = [];
    if (personaRoles.includes("deportista")) AFS().filter((a) => a.estado === "solicitada").forEach((a) => out.push({ t: `Afiliaci\xF3n a ${a.nombre}`, sub: "La aprueba el club", estado: "solicitada", act: "cancel", kind: "af", id: a.id }));
    if (personaRoles.includes("tutor")) MEN().filter((m) => m.estado === "revision").forEach((m) => out.push({ t: m.nombre, sub: "El Ministerio valida sus documentos", estado: "revision", act: "ver", go: "menores" }));
    if (personaRoles.includes("apoyo")) VIS().filter((v) => v.estado === "solicitado").forEach((v) => out.push({ t: `V\xEDnculo con ${v.nombre}`, sub: `Lo aprueba ${v.aprueba}`, estado: "solicitado", act: "cancel", kind: "vi", id: v.id }));
    return out;
  }
  var root;
  var DEPORTISTA_SECS = ["perfil", "trayectoria", "afiliaciones", "analisis"];
  var devnote = (k) => `<span class="wz-devnote" tabindex="0" role="button" data-devnote="${k}"></span>`;
  function render() {
    const secs = sections();
    if (!secs.some((s) => s.id === state.section)) state.section = "perfil";
    const scrollTabs = {};
    root.querySelectorAll("[data-tabs]").forEach((t) => {
      scrollTabs[t.dataset.tabs] = t.scrollLeft;
    });
    const enJurisdiccion = personaRoles.includes("deportista") && AFS().some(inScope) || personaRoles.includes("apoyo") && VIS().some(inScope);
    if (viewer.kind === "org" && (qs().get("persona") === "ajena" || !enJurisdiccion)) {
      root.innerHTML = `
      ${renderTop(true)}
      <div class="mp-card mp-empty"><div class="mp-tile">${ic("building")}</div>
        <h3>Esta persona no est\xE1 vinculada a ${esc(orgName)}</h3>
        <p>Solo puedes ver el perfil de personas afiliadas o vinculadas a tu organismo o a uno que dependa de \xE9l${qs().get("role") === "CLUB" ? ", o que le hayan enviado una solicitud a tu club" : ""}.</p></div>`;
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
      <div class="mp-content" id="mpContent">${state.section === "perfil" ? renderPendientes() : ""}${renderSection2(state.section)}</div>
    </div>`;
    bind();
    root.querySelectorAll("[data-tabs]").forEach((t) => {
      if (scrollTabs[t.dataset.tabs]) t.scrollLeft = scrollTabs[t.dataset.tabs];
    });
    syncTabFades();
    mountDevnotes(DEVNOTES, root);
  }
  function renderTop(denied) {
    const q = qs();
    const from = q.get("from");
    if (own && TUTOR) {
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("family", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">Est\xE1s gestionando el perfil de <strong>${esc(P.corto)}</strong> como su tutor legal (${esc(TUTOR.nombre)}). Sus datos, documentos y afiliaciones los administras t\xFA mientras sea menor de edad.</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(from || "perfil.html?seccion=menores")}">${ic("left")}Volver a mi perfil</a></div>`;
    }
    if (viewer.kind === "admin") {
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("info", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text"><strong>Consulta de usuario</strong> \u2014 Esta vista es de consulta y edici\xF3n de datos del usuario. Los cambios que guardes quedan registrados a tu nombre.</p></div></div>
      <div class="mp-bar">
        <a class="mp-back" href="${esc(from || "jerarquia.html?role=MINDEPORTE")}" data-back>${ic("left")}Volver al listado</a>
        <div class="mp-bar__end">
          <div class="mp-acct"><span class="mp-acct__l">Estado de la cuenta</span>${state.activa ? '<span class="mp-st mp-st--ok">Activo</span>' : '<span class="mp-st mp-st--off">Inactivo</span>'}
            <button class="mp-btn mp-btn--sm" type="button" data-acct>${state.activa ? "Inactivar cuenta" : "Activar cuenta"}</button></div>
          ${devnote("barAdmin")}
        </div>
      </div>`;
    }
    if (viewer.kind === "org") {
      const back = from || (qs().get("role") === "CLUB" ? "deportistas.html?role=CLUB" : `jerarquia.html?role=${qs().get("role")}`);
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("eye", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">${denied ? `Est\xE1s consultando como <strong>${esc(orgName)}</strong>.` : `Est\xE1s viendo el perfil de una persona vinculada a <strong>${esc(orgName)}</strong>. Ves sus datos y lo que tiene relaci\xF3n con tu organismo.`}</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(back)}">${ic("left")}Volver</a><div class="mp-bar__end">${devnote("barVisor")}</div></div>`;
    }
    if (viewer.kind === "comite") {
      return `
      <div class="naowee-message naowee-message--informative mp-banner" role="status"><span class="naowee-message__icon">${ic("eye", "sm")}</span>
        <div class="naowee-message__body"><p class="naowee-message__text">Est\xE1s viendo el perfil como <strong>Comit\xE9 Ol\xEDmpico Colombiano</strong>: ves todo el perfil y el an\xE1lisis cualitativo, en solo lectura.</p></div></div>
      <div class="mp-bar"><a class="mp-back" href="${esc(from || "jerarquia.html?role=COMITE")}">${ic("left")}Volver</a><div class="mp-bar__end">${devnote("barVisor")}</div></div>`;
    }
    return "";
  }
  function renderHeader() {
    const vr = visibleRoles();
    const chips = vr.map((r) => {
      const go2 = r === "deportista" ? "trayectoria" : r === "tutor" ? "menores" : "vinculos";
      return `<li><a class="mp-rchip" href="?seccion=${go2}" data-go="${go2}"><span class="mp-ic">${ic(ROLE[r].icon)}</span><span class="mp-rchip__l">${ROLE[r].name}</span><small>${ROLE[r].hint}</small></a></li>`;
    }).join("");
    return `
    <section class="mp-hcard" aria-labelledby="mpName">
      <div class="mp-hcard__top">
        <div class="mp-ava" aria-hidden="true">${P.ini}</div>
        <div class="mp-hid">
          <h1 id="mpName">${P.nombre}</h1>
          <p class="mp-doc">${P.doc} \xB7 ${P.edad}</p>
          ${own ? `<div class="mp-hid__note">${devnote("barOwn")}</div>` : ""}
          <ul class="mp-roles" aria-label="Roles de la persona">${chips}
            ${own && !TUTOR ? `<li><button class="mp-addrole" type="button" data-addrole>${ic("plus", "sm")}Agregar rol</button></li>` : ""}</ul>
        </div>
      </div>
      <dl class="mp-hstrip">
        ${vr.includes("deportista") ? `<div><dt>Deporte principal</dt><dd>${P.deporte}</dd></div>` : ""}
        <div><dt>Departamento</dt><dd>${P.depto}</dd></div>
        <div><dt>Municipio</dt><dd>${P.muni}</dd></div>
        <div class="mp-hstrip__mail"><dt>Correo</dt><dd>${P.correo}</dd></div>
      </dl>
      ${vr.includes("deportista") && DEPORTISTA_SECS.includes(state.section) ? `
        <div class="mp-hbio" role="group" aria-label="Biometr\xEDa, actualizada el 15/09/2026">
          <span class="mp-hbio__t">Biometr\xEDa</span>
          <dl class="mp-bio">
            <div><dt>Altura</dt><dd>166 cm</dd></div><div><dt>Peso</dt><dd>58 kg</dd></div>
            <div><dt>Sangre</dt><dd>O+</dd></div><div><dt>IMC</dt><dd>21,0</dd></div>
          </dl>
          <span class="mp-hbio__d">Act. 15/09/2026</span>
        </div>` : ""}
    </section>`;
  }
  function navLink(s) {
    const cur = s.id === state.section ? ' aria-current="page"' : "";
    const pend = s.pend ? `<span class="mp-pend${s.pend.rev ? " mp-pend--rev" : ""}" aria-label="${esc(s.pend.aria)}">${s.pend.txt}</span>` : "";
    const soon = s.soon ? '<span class="mp-soon">Pronto</span>' : "";
    return `<li><a href="?seccion=${s.id}" data-sec="${s.id}"${cur}>${ic(s.icon)}<span class="mp-nav__l">${s.label}</span>${pend}${soon}</a>${s.only ? `<span class="mp-only">${s.only}</span>` : ""}</li>`;
  }
  function renderNav(secs) {
    const top = secs.filter((s) => !s.group && !s.soon);
    const tail = secs.filter((s) => s.soon);
    const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
    return `
    <nav class="mp-nav" aria-label="Secciones del perfil">
      <ul>${top.map(navLink).join("")}</ul>
      ${groups.map((g) => `
        <div class="mp-sgroup">
          <p class="mp-sgroup-h" id="mpg-${g}">${ic(ROLE[g].icon)}${ROLE[g].group}</p>
          <ul aria-labelledby="mpg-${g}">${secs.filter((s) => s.group === g).map(navLink).join("")}</ul>
        </div>`).join("")}
      ${tail.length ? `<div class="mp-sgroup"><ul>${tail.map(navLink).join("")}</ul></div>` : ""}
    </nav>`;
  }
  function renderPicker(secs) {
    const opt = (s) => `<option value="${s.id}"${s.id === state.section ? " selected" : ""}>${s.label}${s.pend ? ` (${s.pend.txt})` : ""}${s.soon ? " \xB7 pronto" : ""}</option>`;
    const groups = ALL_ROLES.filter((r) => secs.some((s) => s.group === r));
    return `
    <div class="mp-picker">
      <label for="mpPick">Secci\xF3n</label>
      <div class="mp-sel">
        <select id="mpPick">
          ${secs.filter((s) => !s.group && !s.soon).map(opt).join("")}
          ${groups.map((g) => `<optgroup label="${ROLE[g].group}">${secs.filter((s) => s.group === g).map(opt).join("")}</optgroup>`).join("")}
          ${secs.some((s) => s.soon) ? `<optgroup label="Cuenta">${secs.filter((s) => s.soon).map(opt).join("")}</optgroup>` : ""}
        </select>${ic("down")}
      </div>
    </div>`;
  }
  function renderPendientes() {
    const pend = pendientes();
    if (!pend.length) return "";
    const MAX = 3;
    const shown = state.pendOpen ? pend : pend.slice(0, MAX);
    return `
    <section class="mp-card mp-pend-card" aria-labelledby="mpPend">
      <div class="mp-pend-card__h"><h2 id="mpPend">Pendientes <span class="mp-pend-card__n">\xB7 ${pend.length}</span></h2>${devnote("pendientes")}</div>
      <ul class="mp-pendl">
        ${shown.map((p) => `
          <li><div class="mp-pendl__tx"><strong>${esc(p.t)}</strong><span class="mp-pendl__sub">${esc(p.sub)}</span></div>
            ${pill(p.estado)}
            ${p.act === "cancel" ? `<button class="mp-link" type="button" data-cancel="${p.kind}:${p.id}">Cancelar solicitud</button>` : `<button class="mp-link" type="button" data-go="${p.go}">Ver</button>`}</li>`).join("")}
      </ul>
      ${pend.length > MAX ? `<button class="mp-link mp-pend-card__more" type="button" data-pend-toggle aria-expanded="${!!state.pendOpen}">${state.pendOpen ? "Ver menos" : `Ver ${pend.length - MAX} m\xE1s`}</button>` : ""}
    </section>`;
  }
  var EJEMPLOS = [["deportista,tutor,apoyo", "Multi-rol"], ["deportista", "Solo deportista"], ["tutor", "Solo tutor legal"], ["apoyo", "Solo personal de apoyo"]];
  function renderExamples() {
    if (PERSONA_ID !== LAURA) return "";
    if (!own) return "";
    const cur = personaRoles.join(",");
    return `
    <div class="mp-demo" role="group" aria-label="Solo demo: ver ejemplo">
      <span class="naowee-badge">Solo demo</span><span class="mp-demo__l">Ver ejemplo:</span>
      <div class="mp-demo__seg">${EJEMPLOS.map(([v, l]) => `<button type="button" data-ejemplo="${v}" aria-pressed="${v === cur}">${l}</button>`).join("")}</div>
    </div>`;
  }
  function secHead({ group, id, title, desc, acts = "", note }) {
    return `
    <div class="mp-sec-h">
      <div>
        ${group ? `<span class="mp-eyebrow">${ic(ROLE[group].icon)}${ROLE[group].group}</span>` : ""}
        <h2 id="${id}">${title}</h2>
        ${desc ? `<p>${desc}</p>` : ""}
      </div>
      <div class="mp-sec-h__acts">${acts}${note ? devnote(note) : ""}</div>
    </div>`;
  }
  function tabsBar(key, items, sel, label) {
    return `<div class="mp-tabs-wrap"><div class="mp-tabs" role="tablist" aria-label="${label}" data-tabs="${key}">
    ${items.map(([id, lbl]) => `<button class="mp-tab" type="button" role="tab" id="mpt-${key}-${id}" aria-controls="mpp-${key}-${id}" aria-selected="${id === sel}" tabindex="${id === sel ? 0 : -1}" data-tab="${key}:${id}">${lbl}</button>`).join("")}
  </div></div>`;
  }
  function renderSection2(sec) {
    switch (sec) {
      case "trayectoria":
        return secTrayectoria();
      case "afiliaciones":
        return secAfiliaciones();
      case "analisis":
        return secAnalisis();
      case "menores":
        return secMenores();
      case "vinculos":
        return secVinculos();
      case "documentos":
        return secEmpty("doc", "Documentos", third ? "Documento de identidad, certificados m\xE9dicos y soportes que pidan los organismos. Estamos terminando esta secci\xF3n." : "Aqu\xED vas a encontrar tu documento de identidad, certificados m\xE9dicos y los soportes que te pidan tus organismos. Estamos terminando esta secci\xF3n.");
      case "configuracion":
        return secEmpty("gear", "Configuraci\xF3n", "Contrase\xF1a, notificaciones y privacidad de tu cuenta. Estamos terminando esta secci\xF3n.");
      default:
        return secPerfil();
    }
  }
  function secEmpty(icon, title, text) {
    return `<section aria-labelledby="mpSecEmpty"><div class="mp-card mp-empty"><div class="mp-tile">${ic(icon)}</div><h3 id="mpSecEmpty">${title}</h3><p>${text}</p></div></section>`;
  }
  function secPerfil() {
    const tabs = TABS;
    if (!tabs.some((t2) => t2.id === state.tab.perfil)) state.tab.perfil = "datos";
    const t = tabs.find((x) => x.id === state.tab.perfil);
    const editing = state.editing === t.id;
    const fields = t.fields.filter((f) => !f[3] || has(f[3]));
    return `
    <section aria-labelledby="mpH-perfil">
      <h2 class="mp-sr" id="mpH-perfil">Perfil</h2>
      <div class="mp-card">
        ${tabsBar("perfil", tabs.map((x) => [x.id, x.label]), t.id, "Datos del perfil")}
        <div class="mp-panel" role="tabpanel" id="mpp-perfil-${t.id}" aria-labelledby="mpt-perfil-${t.id}">
          <div class="mp-panel-h">
            <div><h3>${t.title}</h3>${t.id === "datos" && own ? "<p>Son los mismos para todos tus roles.</p>" : ""}</div>
            <div class="mp-sec-h__acts">${canEdit && !editing ? `<button class="mp-btn mp-btn--sm" type="button" data-edit="${t.id}">${ic("edit", "sm")}Editar</button>` : ""}${t.id === "datos" ? devnote("perfil") : ""}</div>
          </div>
          <dl class="mp-fields">
            ${fields.map(([dt, dd, lock]) => `<div><dt>${dt}</dt>${editing ? `<dd><input value="${esc(dd)}" aria-label="${esc(dt)}"${lock ? " disabled" : ""} data-field="${esc(dt)}"></dd>` : `<dd${dd === "Prefiere no responder" ? ' class="is-empty"' : ""}>${esc(dd)}</dd>`}</div>`).join("")}
          </dl>
          ${editing ? `<div class="mp-edit-acts"><button class="mp-btn mp-btn--lg" type="button" data-edit-cancel>Cancelar</button><button class="mp-btn mp-btn--pri mp-btn--lg" type="button" data-edit-save="${t.id}">Guardar cambios</button></div>` : ""}
        </div>
      </div>
    </section>`;
  }
  function secTrayectoria() {
    const tab = state.tab.tray;
    const medals = TRAY.filter((r) => r.medal);
    return `
    <section aria-labelledby="mpH-tray">
      ${secHead({ group: "deportista", id: "mpH-tray", title: "Trayectoria", desc: "Resultados oficiales en eventos registrados en el SUID.", note: "trayectoria" })}
      <div class="mp-result" aria-label="\xDAltimo resultado">
        <div class="mp-ring" aria-hidden="true">2.\xBA</div>
        <div>
          <p class="mp-result__k">\xDAltimo resultado</p>
          <p class="mp-result__v">Plata \xB7 500 m</p>
          <p class="mp-result__m">Juegos Nacionales 2025 \xB7 Final</p>
        </div>
        <ul class="mp-tally" aria-label="Medallero: 1 oro, 1 plata, 0 bronce">
          <li><b>1</b><span><i class="mp-gold"></i>oro</span></li>
          <li><b>1</b><span><i class="mp-silver"></i>plata</span></li>
          <li><b>0</b><span><i class="mp-bronze"></i>bronce</span></li>
        </ul>
      </div>
      <div class="mp-card">
        ${tabsBar("tray", [["tr", "Trayectoria"], ["med", `Medaller\xEDa (${medals.length})`]], tab, "Trayectoria")}
        <div class="mp-panel" role="tabpanel" id="mpp-tray-${tab}" aria-labelledby="mpt-tray-${tab}">
          ${tab === "tr" ? `
            <table class="mp-tbl">
              <thead><tr><th>A\xF1o</th><th>Evento</th><th>Prueba</th><th>Fase</th><th>Posici\xF3n</th><th>Marca</th><th>Medalla</th></tr></thead>
              <tbody>${TRAY.map((r) => `
                <tr><td class="mp-yr">${r.yr}</td>
                  <td class="mp-ev"><strong>${r.ev}</strong><span>Patinaje</span>${r.cyc ? `<br><span class="mp-cyc">${ic("flame", "sm")}Ciclo ol\xEDmpico</span>` : ""}</td>
                  <td data-l="Prueba">${r.prueba}</td><td data-l="Fase">${r.fase}</td><td data-l="Posici\xF3n">${r.pos}</td><td data-l="Marca">${r.marca}</td>
                  <td data-l="Medalla">${r.medal ? `<span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span>` : '<span class="mp-dash" aria-label="Sin medalla">\u2014</span>'}</td></tr>`).join("")}
              </tbody>
            </table>` : `
            <div class="mp-medals">${medals.map((r) => `
              <div class="mp-mcard"><span class="mp-medal"><i class="mp-${r.medal}"></i>${MEDAL[r.medal]}</span><strong>${r.ev} ${r.yr}</strong><p>Patinaje \xB7 ${r.prueba} \xB7 ${r.marca}</p></div>`).join("")}
            </div>`}
        </div>
      </div>
    </section>`;
  }
  function rowActions(it, kind) {
    const solicitada = it.estado === "solicitada" || it.estado === "solicitado";
    if (own && solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-cancel="${kind}:${it.id}">Cancelar solicitud</button>`;
    if (own && kind === "af" && it.estado === "vinculado") return it.baja ? `<button class="mp-btn mp-btn--sm" type="button" data-nobaja="${it.id}">Cancelar retiro</button>` : `<button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-retiro="${it.id}">Retirarme</button>`;
    if (viewer.kind === "org" && it.org === viewer.orgId) {
      if (solicitada) return `<button class="mp-btn mp-btn--sm" type="button" data-org="aprobar:${kind}:${it.id}">Aprobar</button><button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="rechazar:${kind}:${it.id}">Rechazar</button>`;
      if (it.estado === "vinculado") return `<button class="mp-btn mp-btn--sm mp-btn--danger" type="button" data-org="desvincular:${kind}:${it.id}">Desvincular</button>`;
    }
    return "";
  }
  function orgRow(it, kind, aprueba) {
    const solicitada = it.estado === "solicitada" || it.estado === "solicitado";
    return `
    <li class="mp-row"><span class="mp-tile">${ic("building")}</span>
      <div class="mp-row__main"><strong>${esc(it.nombre)}</strong><span>${esc(it.sub)}</span>
        ${it.cadena && it.estado === "vinculado" ? `<span class="mp-row__hint">Hereda: ${esc(it.cadena)}</span>` : ""}
        <span class="mp-row__hint">${esc(it.fecha)}${solicitada ? ` \xB7 Lo aprueba ${aprueba}` : ""}${it.baja ? " \xB7 Retiro en tr\xE1mite: el club debe confirmarlo" : ""}</span></div>
      <div class="mp-row__side">${pill(it.estado)}${rowActions(it, kind)}</div></li>`;
  }
  function secAfiliaciones() {
    const list = afiliacionesVis();
    return `
    <section aria-labelledby="mpH-afil">
      ${secHead({
      group: "deportista",
      id: "mpH-afil",
      title: "Afiliaciones",
      desc: viewer.kind === "org" ? `Afiliaciones de ${P.corto} a clubes de tu jurisdicci\xF3n. Cada club aprueba la suya.` : third ? "Clubes en los que la persona est\xE1 inscrita como deportista. El club aprueba cada solicitud." : "Clubes en los que est\xE1s inscrita como deportista. El club aprueba cada solicitud.",
      acts: own ? `<button class="mp-btn" type="button" data-solicitar-af>${ic("plus", "sm")}Solicitar afiliaci\xF3n</button>` : "",
      note: "afiliaciones"
    })}
      ${list.length ? `<ul class="mp-list">${list.map((a) => orgRow(a, "af", "el club")).join("")}</ul>` : `<div class="mp-card mp-empty"><div class="mp-tile">${ic("building")}</div><h3>Sin afiliaciones</h3><p>${own ? "Solicita la afiliaci\xF3n a un club para competir con \xE9l." : "No tiene afiliaciones a clubes."}</p></div>`}
      <div class="mp-note">${ic("info")}<span>${own ? "Puedes estar en varios clubes a la vez, del mismo deporte o de otros. Cada club aprueba su afiliaci\xF3n y de cada uno heredas su liga y su federaci\xF3n. Mientras una est\xE1 solicitada, sigues compitiendo con tus clubes actuales." : "La afiliaci\xF3n la aprueba el club. Al aprobarla, el deportista hereda la liga y la federaci\xF3n de ese club, sin perder las de sus otros clubes."}</span></div>
    </section>`;
  }
  function secAnalisis() {
    const i = state.tab.eval;
    return `
    <section aria-labelledby="mpH-anal">
      ${secHead({
      group: "deportista",
      id: "mpH-anal",
      title: `An\xE1lisis cualitativo <span class="mp-tag">${ic("eye")}Solo Comit\xE9 Ol\xEDmpico y ROOT</span>`,
      desc: "Evaluaciones del metod\xF3logo por prueba y evento.",
      note: "analisis"
    })}
      <div class="mp-eval">
        <div class="mp-eval-h"><strong>Juegos Nacionales 2025 \xB7 500 m</strong><span>14/11/2025 \xB7 Andr\xE9s Pineda, metod\xF3logo</span></div>
        ${tabsBar("eval", EVAL.map(([l], k) => [String(k), l]), String(i), "Dimensiones de la evaluaci\xF3n")}
        <p class="mp-eval-b" role="tabpanel" id="mpp-eval-${i}" aria-labelledby="mpt-eval-${i}">${EVAL[i][1]}</p>
      </div>
    </section>`;
  }
  function secMenores() {
    return `
    <section aria-labelledby="mpH-men">
      ${secHead({
      group: "tutor",
      id: "mpH-men",
      title: third ? "Menores a cargo" : "Mis menores",
      desc: third ? "Deportistas menores de edad cuyo perfil administra esta persona." : "Administras el perfil de los menores a tu cargo. Un menor solo puede tener el rol de deportista.",
      acts: own ? `<button class="mp-btn" type="button" data-menor-nuevo>${ic("plus", "sm")}Registrar menor</button>` : "",
      note: "menores"
    })}
      <div class="mp-card">
        <ul class="mp-minors">${MEN().map((m) => `
          <li class="mp-minor"><span class="mp-ava-s" aria-hidden="true">${m.ini}</span>
            <div><strong>${m.nombre}</strong><div class="mp-meta">${m.meta.map((x) => `<span>${x}</span>`).join("")}</div></div>
            <div class="mp-row__side">${pill(m.estado)}${viewer.kind === "org" && !(m.org && scope.has(m.org)) ? `<span class="mp-out" tabindex="0" title="Solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de \xE9l." aria-label="Fuera de tu jurisdicci\xF3n: solo puedes abrir el perfil de menores afiliados a ${esc(orgName)} o a un organismo que dependa de \xE9l.">${ic("info", "sm")}Fuera de tu jurisdicci\xF3n</span>` : `<button class="mp-btn mp-btn--sm" type="button" data-menor="${m.id}">${own ? "Gestionar perfil" : "Ver perfil"}</button>`}</div></li>`).join("") || `<li class="mp-minor"><div><strong>Sin menores registrados</strong><div class="mp-meta"><span>Registra a un menor a tu cargo para administrar su perfil.</span></div></div></li>`}
        </ul>
      </div>
      <div class="mp-note">${ic("info")}<span>\xABEn revisi\xF3n\xBB significa que se est\xE1 validando el documento de parentesco del menor. ${third ? "El tutor puede seguir editando sus datos mientras tanto." : "Puedes seguir editando sus datos mientras tanto."} Mientras sea menor de edad, sus datos, documentos y afiliaciones los gestiona su tutor.</span></div>
    </section>`;
  }
  function secVinculos() {
    const list = vinculosVis();
    return `
    <section aria-labelledby="mpH-vin">
      ${secHead({
      group: "apoyo",
      id: "mpH-vin",
      title: "V\xEDnculos",
      desc: viewer.kind === "org" ? `Rol de apoyo de ${P.corto} y sus v\xEDnculos con organismos de tu jurisdicci\xF3n.` : third ? "Rol de apoyo y organismos con los que trabaja esta persona. Cada organismo aprueba el v\xEDnculo." : "Tu rol de apoyo y los organismos con los que trabajas. Cada organismo aprueba el v\xEDnculo.",
      acts: own ? `<button class="mp-btn" type="button" data-solicitar-vi>${ic("plus", "sm")}Solicitar v\xEDnculo</button>` : "",
      note: "vinculos"
    })}
      <h3 class="mp-sub-h">Rol de apoyo</h3>
      <ul class="mp-list">
        <li class="mp-row"><span class="mp-tile">${ic("whistle")}</span>
          <div class="mp-row__main"><strong>${esc(P.rolApoyo || "Personal deportivo")}</strong><span>${esc(DEP.deporte)} \xB7 Rol principal</span></div>
          ${own ? `<div class="mp-row__side"><button class="mp-btn mp-btn--sm mp-btn--text" type="button" data-addrole>${ic("plus", "sm")}Agregar otro rol espec\xEDfico</button></div>` : ""}</li>
      </ul>
      <h3 class="mp-sub-h">Organismos</h3>
      ${list.length ? `<ul class="mp-list">${list.map((v) => orgRow(v, "vi", v.aprueba)).join("")}</ul>` : '<p class="mp-note">Sin v\xEDnculos con organismos.</p>'}
      <div class="mp-note">${ic("info")}<span>Puedes vincularte a cualquier organismo: club, liga, federaci\xF3n o comit\xE9. Cada uno aprueba su v\xEDnculo. Ser personal de apoyo no requiere aprobaci\xF3n; trabajar para un organismo s\xED.</span></div>
    </section>`;
  }
  function go(sec) {
    var _a4;
    state.section = sec;
    state.editing = null;
    const u = qs();
    u.set("seccion", sec);
    history.replaceState(null, "", "?" + u.toString());
    render();
    const c = root.querySelector("#mpContent");
    if (c && window.matchMedia("(max-width: 900px)").matches) c.scrollIntoView({ block: "start" });
    (_a4 = root.querySelector(`.mp-nav a[data-sec="${sec}"]`)) == null ? void 0 : _a4.focus({ preventScroll: true });
  }
  function syncTabFades() {
    root.querySelectorAll(".mp-tabs").forEach((t) => {
      const w = t.parentElement;
      const upd = () => {
        w.classList.toggle("has-more", t.scrollLeft + t.clientWidth < t.scrollWidth - 2);
        w.classList.toggle("has-less", t.scrollLeft > 2);
      };
      upd();
      t.addEventListener("scroll", upd, { passive: true });
    });
  }
  function bind() {
    var _a4, _b, _c, _d, _e, _f, _g, _h;
    root.querySelectorAll("[data-sec]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      go(a.dataset.sec);
    }));
    root.querySelectorAll("[data-go]").forEach((a) => a.addEventListener("click", (e) => {
      e.preventDefault();
      go(a.dataset.go);
    }));
    (_a4 = root.querySelector("#mpPick")) == null ? void 0 : _a4.addEventListener("change", (e) => go(e.target.value));
    root.querySelectorAll('[role="tablist"]').forEach((tl) => {
      const tabs = [...tl.querySelectorAll('[role="tab"]')];
      const sel = (b) => {
        var _a5;
        const [k, id] = b.dataset.tab.split(":");
        if (k === "eval") state.tab.eval = Number(id);
        else state.tab[k] = id;
        if (k === "perfil") state.editing = null;
        render();
        (_a5 = root.querySelector(`[data-tab="${b.dataset.tab}"]`)) == null ? void 0 : _a5.focus();
      };
      tabs.forEach((b, i) => {
        b.addEventListener("click", () => sel(b));
        b.addEventListener("keydown", (e) => {
          const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (d) {
            e.preventDefault();
            sel(tabs[(i + d + tabs.length) % tabs.length]);
          }
        });
      });
    });
    root.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => {
      var _a5;
      state.editing = b.dataset.edit;
      render();
      (_a5 = root.querySelector(".mp-fields input:not(:disabled)")) == null ? void 0 : _a5.focus();
    }));
    (_b = root.querySelector("[data-edit-cancel]")) == null ? void 0 : _b.addEventListener("click", () => {
      state.editing = null;
      render();
    });
    (_c = root.querySelector("[data-edit-save]")) == null ? void 0 : _c.addEventListener("click", (e) => {
      const t = TABS.find((x) => x.id === e.currentTarget.dataset.editSave);
      root.querySelectorAll(".mp-fields input:not(:disabled)").forEach((inp) => {
        const f = t.fields.find((x) => x[0] === inp.dataset.field);
        if (f) f[1] = inp.value;
      });
      state.editing = null;
      render();
      toast(viewer.kind === "admin" ? "Cambios guardados. Quedan registrados a tu nombre." : "Cambios guardados.");
    });
    const lista = (k) => k === "af" ? AFS() : VIS();
    root.querySelectorAll("[data-cancel]").forEach((b) => b.addEventListener("click", () => {
      const [k, id] = b.dataset.cancel.split(":");
      const it = lista(k).find((x) => x.id === id);
      confirmDlg({
        title: "Cancelar solicitud",
        text: `${k === "af" ? "Se retira la solicitud de afiliaci\xF3n a" : "Se retira la solicitud de v\xEDnculo con"} ${it.nombre}. Puedes volver a solicitarla cuando quieras.`,
        ok: "Cancelar solicitud",
        back: "Mantener solicitud",
        onOk: () => {
          if (k === "af") retirarAfiliacion(PERSONA_ID, {}, it.org);
          else resolverVinculo(PERSONA_ID, it.org, "Rechazada", { motivo: "Retirada por la persona", responsable: P.nombre, rol: "Personal deportivo" });
          render();
          toast("Solicitud cancelada.");
        }
      });
    }));
    root.querySelectorAll("[data-retiro]").forEach((b) => b.addEventListener("click", () => {
      const it = AFS().find((x) => x.id === b.dataset.retiro);
      confirmDlg({
        title: `Retirarme de ${it.nombre}`,
        text: `El club confirma tu retiro. Mientras tanto sigues afiliada. Al confirmarlo dejas de heredar su liga y su federaci\xF3n; tus otros clubes no cambian.`,
        ok: "Pedir el retiro",
        back: "Volver",
        onOk: () => {
          crearSolicitudRetiro(PERSONA_ID, it.org);
          render();
          toast(`Retiro enviado: ${it.nombre} debe confirmarlo.`);
        }
      });
    }));
    root.querySelectorAll("[data-nobaja]").forEach((b) => b.addEventListener("click", () => {
      const it = AFS().find((x) => x.id === b.dataset.nobaja);
      cancelarRetiro(PERSONA_ID, it.org);
      render();
      toast("Retiro cancelado: sigues afiliada al club.");
    }));
    (_d = root.querySelector("[data-solicitar-af]")) == null ? void 0 : _d.addEventListener("click", openSolicitarAfiliacion);
    (_e = root.querySelector("[data-solicitar-vi]")) == null ? void 0 : _e.addEventListener("click", openSolicitarVinculo);
    (_f = root.querySelector("[data-menor-nuevo]")) == null ? void 0 : _f.addEventListener("click", openRegistrarMenor);
    root.querySelectorAll("[data-menor]").forEach((b) => b.addEventListener("click", () => {
      const m = MEN().find((x) => x.id === b.dataset.menor);
      if (own && m.estado === "revision") {
        toast(`${m.nombre} todav\xEDa est\xE1 en revisi\xF3n. Podr\xE1s ingresar cuando se valide el documento de parentesco.`);
        return;
      }
      const q = new URLSearchParams({ persona: m.id, ...qs().get("role") ? { role: qs().get("role") } : {}, from: `perfil.html?${qs().toString()}` });
      window.location.href = `perfil.html?${q.toString()}`;
    }));
    const solicitudDe = (org) => allSolicitudes().find((x) => x.deportistaId === PERSONA_ID && x.clubId === org && x.tipo !== "retiro" && x.estado === "Enviada") || crearSolicitud(PERSONA_ID, org);
    const quien = { responsable: ((_g = getOrganismo(viewer.orgId)) == null ? void 0 : _g.nombre) || "", rol: qs().get("role") || "" };
    root.querySelectorAll("[data-org]").forEach((b) => b.addEventListener("click", () => {
      const [act, k, id] = b.dataset.org.split(":");
      const it = lista(k).find((x) => x.id === id);
      const fem = k === "af";
      const que = fem ? "la afiliaci\xF3n" : "el v\xEDnculo";
      if (act === "aprobar") {
        if (fem) resolverAfiliacion(solicitudDe(it.org).id, "aprobada", quien);
        else resolverVinculo(PERSONA_ID, it.org, "Vinculada", quien);
        render();
        toast(`${fem ? "Afiliaci\xF3n aprobada" : "V\xEDnculo aprobado"}: ${P.corto} queda vinculada a ${it.nombre}.`);
        return;
      }
      confirmDlg(act === "rechazar" ? {
        title: `Rechazar ${que}`,
        text: `${P.corto} recibe el rechazo con el motivo y puede volver a solicitar${fem ? "la" : "lo"}.`,
        ok: "Rechazar",
        danger: true,
        motivo: true,
        onOk: (motivo) => {
          if (fem) resolverAfiliacion(solicitudDe(it.org).id, "rechazada", { ...quien, motivo });
          else resolverVinculo(PERSONA_ID, it.org, "Rechazada", { ...quien, motivo });
          render();
          toast(`${fem ? "Afiliaci\xF3n rechazada" : "V\xEDnculo rechazado"}.`);
        }
      } : {
        title: `Desvincular de ${it.nombre}`,
        text: fem ? `${P.corto} deja de estar afiliada a ${it.nombre} y pierde la liga y la federaci\xF3n que hered\xF3 de ese club. Sus otros clubes no cambian.` : `${P.corto} deja de figurar como personal de apoyo de ${it.nombre}.`,
        ok: "Desvincular",
        danger: true,
        motivo: true,
        onOk: (motivo) => {
          if (fem) desvincularPorClub(PERSONA_ID, { clubId: it.org, motivo, responsable: quien.responsable });
          else resolverVinculo(PERSONA_ID, it.org, "Terminada", { ...quien, motivo, fin: "desvinculacion" });
          render();
          toast("Desvinculaci\xF3n registrada.");
        }
      });
    }));
    root.querySelectorAll("[data-acct]").forEach((b) => b.addEventListener("click", () => {
      state.activa = !state.activa;
      render();
      toast(state.activa ? "Cuenta activada." : "Cuenta inactivada.");
    }));
    root.querySelectorAll("[data-addrole]").forEach((b) => b.addEventListener("click", openAddRole));
    (_h = root.querySelector("[data-pend-toggle]")) == null ? void 0 : _h.addEventListener("click", () => {
      var _a5;
      state.pendOpen = !state.pendOpen;
      render();
      (_a5 = root.querySelector("[data-pend-toggle]")) == null ? void 0 : _a5.focus();
    });
    root.querySelectorAll("[data-ejemplo]").forEach((b) => b.addEventListener("click", () => {
      var _a5;
      const u = qs();
      if (b.dataset.ejemplo === ALL_ROLES.join(",")) u.delete("roles");
      else u.set("roles", b.dataset.ejemplo);
      history.replaceState(null, "", "?" + u.toString());
      personaRoles = parseRoles();
      state.editing = null;
      render();
      (_a5 = root.querySelector(`[data-ejemplo="${b.dataset.ejemplo}"]`)) == null ? void 0 : _a5.focus();
    }));
    root.querySelectorAll("[data-soon]").forEach((b) => b.addEventListener("click", () => toast(`${b.dataset.soon}: disponible en una pr\xF3xima fase de la demo.`)));
  }
  function dialog(html, cls = "") {
    var _a4;
    (_a4 = document.getElementById("mpDlg")) == null ? void 0 : _a4.remove();
    const d = document.createElement("dialog");
    d.id = "mpDlg";
    d.className = `mp-dlg ${cls}`;
    d.setAttribute("aria-labelledby", "mpDlgT");
    d.innerHTML = SPRITE + html;
    document.body.appendChild(d);
    d.addEventListener("click", (e) => {
      if (e.target === d || e.target.closest("[data-close]")) d.close();
    });
    d.addEventListener("close", () => d.remove());
    d.showModal();
    return d;
  }
  function openAddRole() {
    const ADD = {
      deportista: ["Elige tu deporte. Luego puedes solicitar afiliaci\xF3n a un club.", "Agregar otro deporte", "menor"],
      tutor: ["Registra a un menor de edad a tu cargo.", "Registrar otro menor"],
      apoyo: ["Elige tu rol espec\xEDfico: entrenador, m\xE9dico, fisioterapeuta\u2026", "Agregar otro rol espec\xEDfico"]
    };
    const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">Agregar rol</h2><p>El rol se agrega a este mismo perfil.</p></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
    <div class="mp-opts">${ALL_ROLES.map((r) => {
      const ya = personaRoles.includes(r);
      return `<button class="mp-opt" type="button" data-opt="${r}"><span class="mp-tile">${ic(ROLE[r].icon)}</span>
        <span class="mp-opt__main"><strong>${ya ? ADD[r][1] : ROLE[r].name}</strong><span class="mp-opt__d">${ya ? `Ya eres ${ROLE[r].name.toLowerCase()}. ` : ""}${ADD[r][0]}</span></span></button>`;
    }).join("")}</div>
    <p class="mp-dlg__rule">Agregar un rol no requiere aprobaci\xF3n. El v\xEDnculo con un organismo s\xED: la afiliaci\xF3n a un club o el v\xEDnculo con una liga lo aprueba ese organismo.</p>`);
    d.querySelectorAll("[data-opt]").forEach((b) => b.addEventListener("click", () => {
      const r = b.dataset.opt;
      d.close();
      if (personaRoles.includes(r) && r === "tutor") {
        go("menores");
        return;
      }
      if (personaRoles.includes(r) && r === "apoyo") {
        go("vinculos");
        return;
      }
      toast(`${b.querySelector("strong").textContent}: disponible en una pr\xF3xima fase de la demo.`);
    }));
  }
  function buscadorDlg({ title, sub, placeholder, buscar, meta, ok, onOk, rule }) {
    let sel = null;
    const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">${esc(title)}</h2><p>${esc(sub)}</p></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
    <div class="mp-dlg__b mp-busca"><input id="mpBusca" type="search" placeholder="${esc(placeholder)}" aria-label="${esc(placeholder)}" autocomplete="off">
      <ul class="mp-busca__res" id="mpBuscaRes" role="listbox" aria-label="Resultados"></ul></div>
    ${rule ? `<p class="mp-dlg__rule">${rule}</p>` : ""}
    <div class="mp-dlg__f"><button class="mp-btn" type="button" data-close>Volver</button>
      <button class="mp-btn mp-btn--pri" type="button" data-ok disabled>${esc(ok)}</button></div>`);
    const inp = d.querySelector("#mpBusca");
    const res = d.querySelector("#mpBuscaRes");
    const btn = d.querySelector("[data-ok]");
    const pinta = () => {
      const q = inp.value.trim();
      const items = q.length < 3 ? [] : buscar(q).slice(0, 8);
      res.innerHTML = q.length < 3 ? '<li class="mp-busca__hint">Escribe al menos 3 letras del nombre o del NIT.</li>' : items.length ? items.map((o) => `<li><button type="button" role="option" aria-selected="${sel === o.id}" class="mp-busca__opt${sel === o.id ? " is-sel" : ""}" data-id="${o.id}"><strong>${esc(o.nombre)}</strong><span>${esc(meta(o))}</span></button></li>`).join("") : '<li class="mp-busca__hint">No encontramos un organismo activo con ese nombre. Si deber\xEDa estar, comun\xEDcate con soporte.</li>';
      res.querySelectorAll("[data-id]").forEach((b) => b.addEventListener("click", () => {
        sel = b.dataset.id;
        btn.disabled = false;
        pinta();
      }));
    };
    inp.addEventListener("input", () => {
      sel = null;
      btn.disabled = true;
      pinta();
    });
    pinta();
    inp.focus();
    btn.addEventListener("click", () => {
      if (!sel) return;
      d.close();
      onOk(sel);
    });
  }
  function openSolicitarAfiliacion() {
    const ya = new Set(AFS().filter((a) => ["vinculado", "solicitada"].includes(a.estado)).map((a) => a.org));
    buscadorDlg({
      title: "Solicitar afiliaci\xF3n",
      sub: "Busca el club. Solo aparecen clubes activos en el SUID.",
      placeholder: "Nombre o NIT del club",
      buscar: (q) => buscarClubesActivos(q).filter((c) => !ya.has(c.id)),
      meta: (c) => `${c.deporte} \xB7 ${c.ubicacion ? c.ubicacion.ciudad : ""} \xB7 ${(getOrganismo(c.parentId) || {}).nombre || ""}`,
      ok: "Enviar solicitud",
      rule: "El club aprueba la afiliaci\xF3n. Puedes estar en varios clubes; de cada uno heredas su liga y su federaci\xF3n.",
      onOk: (id) => {
        crearSolicitud(PERSONA_ID, id);
        render();
        toast(`Solicitud enviada a ${getOrganismo(id).nombre}. El club la confirma desde su bandeja.`);
      }
    });
  }
  function openSolicitarVinculo() {
    const ya = new Set(VIS().filter((v) => ["vinculado", "solicitado"].includes(v.estado)).map((v) => v.org));
    const n = (x) => String(x || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    buscadorDlg({
      title: "Solicitar v\xEDnculo",
      sub: `Busca el organismo con el que trabajas como ${(P.rolApoyo || "personal deportivo").toLowerCase()}: club, liga, federaci\xF3n o comit\xE9.`,
      placeholder: "Nombre o NIT del organismo",
      buscar: (q) => allOrganismos().filter((o) => o.estado === "Activo" && !ya.has(o.id) && (n(o.nombre).includes(n(q)) || n(o.nit).includes(n(q)))),
      meta: (o) => `${TIPO_TXT2[o.tipo]} \xB7 ${o.deporte !== "\u2014" ? o.deporte : o.sector || ""}`,
      ok: "Enviar solicitud",
      rule: "El organismo aprueba el v\xEDnculo. Mientras tanto queda \xABSolicitado\xBB.",
      onOk: (id) => {
        solicitarVinculo(PERSONA_ID, id, P.rolApoyo);
        render();
        toast(`Solicitud de v\xEDnculo enviada a ${getOrganismo(id).nombre}.`);
      }
    });
  }
  function openRegistrarMenor() {
    const st = { paso: 1, d: { vinculo: "", tipoDoc: "TI", numDoc: "", archivo: "", acepta: false, nombre: "", segNombre: "", apellido: "", segApellido: "", sexo: "", fechaNac: "", deporte: "", depto: "Valle del Cauca", ciudad: "" } };
    const d = dialog('<div id="mpMenor"></div>', "mp-dlg--form");
    const box = d.querySelector("#mpMenor");
    const campo = (id, label, html, req) => `<div class="mp-f"><label for="${id}">${label}${req ? ' <span aria-hidden="true">*</span>' : ""}</label>${html}<p class="mp-f__err" id="${id}Err" hidden></p></div>`;
    const inp = (id, v, type = "text", extra = "") => `<input id="${id}" type="${type}" value="${esc(v)}" ${extra}>`;
    const sel = (id, v, opts, ph) => `<select id="${id}"><option value="">${ph || "Selecciona\u2026"}</option>${opts.map((o) => `<option${o === v ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`;
    const pinta = () => {
      var _a4, _b;
      const x = st.d;
      box.innerHTML = `
      <div class="mp-dlg__h"><div><h2 id="mpDlgT">Registrar menor</h2><p>Paso ${st.paso} de 2 \xB7 ${st.paso === 1 ? "Documentos" : "Datos b\xE1sicos"}</p></div>
        <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
      <div class="mp-dlg__b">
        <div class="mp-alert">${ic("info", "sm")}<span>Solo t\xFA, como tutor registrado, podr\xE1s administrar el perfil del menor, editar sus datos sensibles y hacer sus inscripciones.</span></div>
        ${st.paso === 1 ? `<div class="mp-form">
          ${campo("mVinculo", "Tipo de v\xEDnculo", sel("mVinculo", x.vinculo, ["Padre/Madre", "Tutor legal"], "Padre | Tutor"), true)}
          <div class="mp-form__row">${campo("mTipoDoc", "Tipo de documento", sel("mTipoDoc", x.tipoDoc, ["TI", "RC"], "Tipo"), true)}${campo("mNumDoc", "Documento del menor", inp("mNumDoc", x.numDoc, "text", 'inputmode="numeric" placeholder="# Documento"'), true)}</div>
          ${campo("mArchivo", "Adjuntar documento de parentesco", `<input id="mArchivo" type="file" accept=".pdf,.jpg,.jpeg,.png"><span class="mp-f__hint">${x.archivo ? `Adjunto: ${esc(x.archivo)}` : "Registro civil / Sentencia de tutela (JPG, PNG o PDF). M\xE1x 10 MB"}</span>`, true)}
          <label class="mp-check"><input id="mAcepta" type="checkbox"${x.acepta ? " checked" : ""}> Declaro ser el tutor legal y autorizo el tratamiento de los datos del menor.</label>
          <p class="mp-f__err" id="mAceptaErr" hidden></p>
        </div>` : `<div class="mp-form">
          <div class="mp-form__row">${campo("mNombre", "Nombre", inp("mNombre", x.nombre), true)}${campo("mSegNombre", "Segundo nombre", inp("mSegNombre", x.segNombre))}</div>
          <div class="mp-form__row">${campo("mApellido", "Apellido", inp("mApellido", x.apellido), true)}${campo("mSegApellido", "Segundo apellido", inp("mSegApellido", x.segApellido))}</div>
          <div class="mp-form__row">${campo("mSexo", "Sexo", sel("mSexo", x.sexo, ["Hombre", "Mujer"]), true)}${campo("mFechaNac", "Fecha de nacimiento", inp("mFechaNac", x.fechaNac, "date"), true)}</div>
          ${campo("mDeporte", "Deporte", sel("mDeporte", x.deporte, catalogoDeportes()), true)}
          <div class="mp-form__row">${campo("mDepto", "Departamento", inp("mDepto", x.depto), true)}${campo("mCiudad", "Ciudad", inp("mCiudad", x.ciudad), true)}</div>
        </div>`}
      </div>
      <div class="mp-dlg__f"><button class="mp-btn" type="button" ${st.paso === 1 ? "data-close" : "data-atras"}>${st.paso === 1 ? "Cancelar" : "Atr\xE1s"}</button>
        <button class="mp-btn mp-btn--pri" type="button" data-sig>${st.paso === 1 ? "Siguiente" : "Registrar"}</button></div>`;
      (_a4 = box.querySelector("#mArchivo")) == null ? void 0 : _a4.addEventListener("change", (e) => {
        st.d.archivo = e.target.files[0] ? e.target.files[0].name : "";
        lee();
        pinta();
      });
      (_b = box.querySelector("[data-atras]")) == null ? void 0 : _b.addEventListener("click", () => {
        lee();
        st.paso = 1;
        pinta();
      });
      box.querySelector("[data-sig]").addEventListener("click", siguiente);
    };
    const val = (id) => {
      var _a4, _b;
      return (_b = (_a4 = box.querySelector("#" + id)) == null ? void 0 : _a4.value.trim()) != null ? _b : "";
    };
    const lee = () => {
      var _a4;
      const x = st.d;
      if (st.paso === 1) {
        x.vinculo = val("mVinculo");
        x.tipoDoc = val("mTipoDoc");
        x.numDoc = val("mNumDoc");
        x.acepta = !!((_a4 = box.querySelector("#mAcepta")) == null ? void 0 : _a4.checked);
      } else {
        ["nombre", "segNombre", "apellido", "segApellido", "sexo", "fechaNac", "deporte", "depto", "ciudad"].forEach((k) => {
          x[k] = val("m" + k.charAt(0).toUpperCase() + k.slice(1));
        });
      }
    };
    const err = (id, msg) => {
      const e = box.querySelector("#" + id + "Err");
      if (e) {
        e.textContent = msg;
        e.hidden = false;
      }
      return true;
    };
    function siguiente() {
      lee();
      box.querySelectorAll(".mp-f__err").forEach((e2) => {
        e2.hidden = true;
      });
      const x = st.d;
      let mal = false;
      if (st.paso === 1) {
        if (!x.vinculo) mal = err("mVinculo", "Elige el tipo de v\xEDnculo.");
        if (!x.tipoDoc) mal = err("mTipoDoc", "Elige el tipo.");
        if (!x.numDoc) mal = err("mNumDoc", "El n\xFAmero de documento es obligatorio.");
        else if (allDeportistas().some((p) => String(p.numDoc) === x.numDoc)) mal = err("mNumDoc", "Este documento ya est\xE1 registrado en el SUID. Si es tu hijo o tu hija, comun\xEDcate con soporte para vincularlo.");
        if (!x.archivo) mal = err("mArchivo", "Adjunta el documento de parentesco.");
        if (!x.acepta) mal = err("mAcepta", "Debes aceptar para continuar.");
        if (!mal) {
          st.paso = 2;
          pinta();
        }
        return;
      }
      ["mNombre", "mApellido", "mSexo", "mFechaNac", "mDeporte", "mDepto", "mCiudad"].forEach((id) => {
        if (!val(id)) mal = err(id, "Campo obligatorio.");
      });
      const e = edadDe(x.fechaNac);
      if (x.fechaNac && (e == null || e >= 18)) mal = err("mFechaNac", "Tiene 18 a\xF1os o m\xE1s: debe registrarse por su cuenta en el registro p\xFAblico.");
      if (x.fechaNac && e != null && e < 0) mal = err("mFechaNac", "La fecha no puede ser futura.");
      if (mal) return;
      const nombre = [x.nombre, x.segNombre, x.apellido, x.segApellido].filter(Boolean).join(" ");
      registrarMenor(PERSONA_ID, { nombre, tipoDoc: x.tipoDoc, numDoc: x.numDoc, deporte: x.deporte, fechaNac: x.fechaNac, parentesco: x.vinculo, sexo: x.sexo, docsEstado: "revision", documentoParentesco: x.archivo, ubicacion: { depto: x.depto, ciudad: x.ciudad } });
      d.close();
      if (!personaRoles.includes("tutor")) personaRoles = parseRoles();
      go("menores");
      toast("Registro exitoso: el perfil del menor qued\xF3 vinculado a tu cuenta. Queda en revisi\xF3n mientras se valida el documento de parentesco.");
    }
    pinta();
  }
  function confirmDlg({ title, text, ok, back = "Volver", danger, motivo, onOk }) {
    const d = dialog(`
    <div class="mp-dlg__h"><div><h2 id="mpDlgT">${esc(title)}</h2></div>
      <button class="mp-x" type="button" aria-label="Cerrar" data-close>${ic("x")}</button></div>
    <p class="mp-dlg__b">${esc(text)}</p>
    ${motivo ? `<div class="mp-dlg__b"><label for="mpMotivo" style="display:block;font-weight:600;color:var(--naowee-color-text-primary);margin:12px 0 6px">Motivo</label>
      <textarea id="mpMotivo" rows="3" style="width:100%;border:1px solid var(--naowee-color-border-primary);border-radius:var(--naowee-border-radius-actions-inputs-default);padding:10px 12px;font:inherit;resize:vertical"></textarea></div>` : ""}
    <div class="mp-dlg__f"><button class="mp-btn" type="button" data-close>${esc(back)}</button>
      <button class="mp-btn ${danger ? "mp-btn--danger-solid" : "mp-btn--pri"}" type="button" data-ok>${esc(ok)}</button></div>`);
    d.querySelector("[data-ok]").addEventListener("click", () => {
      const m = d.querySelector("#mpMotivo");
      if (m && !m.value.trim()) {
        m.focus();
        m.style.borderColor = "var(--naowee-color-red-700)";
        m.setAttribute("aria-invalid", "true");
        return;
      }
      d.close();
      onOk(m ? m.value.trim() : "");
    });
  }
  var _t;
  function toast(msg) {
    let el = document.getElementById("evToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "evToast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(_t);
    _t = setTimeout(() => el.classList.remove("is-visible"), 2800);
  }
  var DEVNOTES = {
    quien: { title: "Qui\xE9n mira (visor)", sections: [
      { title: "Hoy en el perfil migrado", items: ["<code>suite-mf-profile</code> (<code>ProfilePage.tsx</code>, ruta v2 <code>/home/profile/:userCode</code>) solo distingue perfil propio y administrador; hoy solo se abre desde Incentivos (guard ROOT e INCENTIVES_*).", "No existe la vista de un organismo sobre una persona: un club no puede abrir el perfil de su deportista ni de su entrenador."] },
      { title: "Qu\xE9 cambia", items: ["Un solo componente con un <b>visor</b>: propio (edita, agrega rol, Pendientes), organismo (solo lectura, solo las facetas ligadas a su jurisdicci\xF3n, nunca tutor/menores; Aprobar/Rechazar sobre lo Solicitado a ese organismo y Desvincular sobre lo Vinculado), administrador (Consulta de usuario, ve y edita todo) y Comit\xE9 Ol\xEDmpico/ROOT (habilita An\xE1lisis cualitativo).", "Desvincular desde el perfil: P-04, decisi\xF3n de Producto pendiente de ratificar.", "Un organismo ve todos los datos de la persona, sus facetas de deportista y los v\xEDnculos de apoyo con \xE9l o con organismos debajo, y la lista de menores a cargo en solo lectura. Ver \xABQui\xE9n puede ver este perfil\xBB."] },
      { title: "Qu\xE9 falta en el back", items: ["Un endpoint de lectura para un organismo con jurisdicci\xF3n (hoy <code>GET /v1/user/{code}</code> es propio o admin con <code>user:update_athlete</code>) que filtre campos por visor.", "Afiliaciones y v\xEDnculos con estado y organismo due\xF1o, para saber qu\xE9 acciones mostrar."] },
      { title: "Solo demo", items: ["El visor sale de <code>?role=</code>: PERSONA, CLUB/LIGA/FEDERACION, MINDEPORTE (alias <code>?modo=consulta</code>) y <code>?visor=comite</code>."] }
    ] },
    acceso: { title: "Qui\xE9n puede ver este perfil", sections: [
      { title: "Regla (Arquitectura \xB7 Juan Manuel Armero, 08-10-2026)", items: [
        "<b>Ministerio</b> y <b>Comit\xE9 Ol\xEDmpico</b>: cualquier persona, todo el perfil. El Ministerio entra como administrador (Consulta de usuario: estado de la cuenta y edici\xF3n).",
        "<b>An\xE1lisis cualitativo</b>: solo Comit\xE9 Ol\xEDmpico y ROOT. Nadie m\xE1s (ni el Ministerio ni otros organismos).",
        "<b>Federaci\xF3n / Liga / Club</b>: solo personas dentro de su jerarqu\xEDa deportiva (afiliadas o vinculadas a \xE9l o a un organismo debajo, por herencia) y, para clubes, quien le envi\xF3 una solicitud pendiente. Cualquier otra persona: estado \xABEsta persona no est\xE1 vinculada a\u2026\xBB en vez del perfil.",
        "Un organismo ve todos los datos (Datos, Ubicaci\xF3n, Contacto, Salud, Sociodemogr\xE1fico, Datos adicionales, Biometr\xEDa, Trayectoria), las afiliaciones y los v\xEDnculos de apoyo relacionados con \xE9l o con organismos debajo.",
        "<b>Menores a cargo</b>: el organismo ve la lista (nombre, documento, edad, deporte, v\xEDnculo, estado) en solo lectura. Abrir el perfil de un menor sigue la misma regla de jurisdicci\xF3n: si no est\xE1 en su \xE1rbol, la fila dice \xABFuera de tu jurisdicci\xF3n\xBB en vez de \xABVer perfil\xBB.",
        "<b>Ver el sub\xE1rbol, actuar sobre el nivel inmediato</b>: solo el organismo directo aprueba, rechaza o desvincula; los niveles superiores solo ven."
      ] },
      { title: "Qu\xE9 falta en el back", items: ["Resolver la jurisdicci\xF3n del visor contra las afiliaciones y v\xEDnculos de la persona (incluidas las solicitudes pendientes hacia un club) antes de devolver el perfil."] },
      { title: "Solo demo", items: ["<code>?role=LIGA&persona=ajena</code> muestra el estado fuera de jurisdicci\xF3n. Laura est\xE1 en Club Pat\xEDn Cali \u2192 Liga de Patinaje del Valle \u2192 Fed. Colombiana de Patinaje, as\xED que los tres la ven.", "Con Club Pat\xEDn Cali: Tom\xE1s (Patinaje) est\xE1 afiliado al club y se puede abrir; Sara (Nataci\xF3n) no est\xE1 en su \xE1rbol."] }
    ] },
    perfil: { title: "Perfil \xB7 datos personales", sections: [
      { title: "Hoy en el perfil migrado", items: ["Datos de <code>GET /v1/user/{code}</code>; guardado con <code>PATCH /v1/user/{code}</code> enviando <code>individual_data</code> (permiso <code>user:update_athlete</code>).", 'Ya muestra secciones por <code>roles.includes(...)</code> (multi-rol listo para gating), pero la etiqueta del encabezado usa <code>roles[0]</code>. Las vistas viejas (perfil propio y "Consulta de usuario") usan <code>roles[0]</code> en todo.', "La biometr\xEDa sale a cualquiera, vac\xEDa si no es deportista."] },
      { title: "Qu\xE9 cambia", items: ["Encabezado con todos los roles como chips (sin selector de rol). Datos comunes una sola vez: \xABSon los mismos para todos tus roles\xBB.", "Biometr\xEDa como grupo compacto en la franja del encabezado, solo con rol deportista y solo en Perfil y en las secciones de deportista.", "\xABEditar\xBB es un bot\xF3n secundario neutro; el naranja queda para lo activo y \xABAgregar rol\xBB."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada para los datos; el encabezado debe leer <code>roles[]</code> completo en vez de <code>roles[0]</code>."] }
    ] },
    trayectoria: { title: "Trayectoria", sections: [
      { title: "Hoy en el perfil migrado", items: ["sport-records <code>GET /sport-records/api/v2/athletes/by-document/{doc}/history?view=trajectory</code>. Pesta\xF1as Trayectoria / Medaller\xEDa."] },
      { title: "Qu\xE9 cambia", items: ["Bloque \xAB\xDAltimo resultado\xBB con la posici\xF3n, la medalla y el medallero (oro \xB7 plata \xB7 bronce) arriba de la tabla. Es el \xFAnico acento fuerte de la p\xE1gina."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada nuevo: el \xFAltimo resultado y el medallero se derivan de la misma respuesta."] }
    ] },
    afiliaciones: { title: "Afiliaciones (deportista)", sections: [
      { title: "Hoy en el perfil migrado", items: ["No existen en el perfil. Viven aparte (Mi afiliaci\xF3n) y el modelo est\xE1 en nao-docs (entidad de afiliaci\xF3n)."] },
      { title: "Qu\xE9 cambia", items: ["Lista de clubes con estado Vinculado / Solicitada / Rechazada / Desvinculado. En lo Solicitado, \xABCancelar solicitud\xBB en la misma fila y la nota \xABLo aprueba el club\xBB.", "El badge de la navegaci\xF3n cuenta solo lo pendiente."] },
      { title: "Fase 2 \xB7 en la demo ya funciona", items: ["Sale de la relaci\xF3n de afiliaci\xF3n (shared/organismos-data.js), no de datos fijos. \xABSolicitar afiliaci\xF3n\xBB busca clubes Activos y crea la solicitud que el club ve en su bandeja.", "Varios clubes a la vez: cada fila Vinculada muestra la cadena que hereda (liga \xB7 federaci\xF3n). \xABRetirarme\xBB pide la baja de ESE club; el club la confirma y los otros clubes no cambian.", "El organismo visor aprueba, rechaza (motivo) o desvincula sobre los datos reales; queda en la trazabilidad."] },
      { title: "Qu\xE9 falta en el back", items: ["Exponer las afiliaciones de la persona (varias, en clubes distintos) en el perfil, y cancelar una solicitud."] }
    ] },
    analisis: { title: "An\xE1lisis cualitativo", sections: [
      { title: "Hoy en el perfil migrado", items: ["<code>\u2026/evaluations</code> de sport-records; datos del lakehouse, no en vivo. Lo ven Comit\xE9 Ol\xEDmpico y ROOT."] },
      { title: "Qu\xE9 cambia", items: ["Etiqueta visible \xABSolo Comit\xE9 Ol\xEDmpico y ROOT\xBB, sin candado. Para el resto de visores la secci\xF3n no existe (no se muestra bloqueada)."] },
      { title: "Qu\xE9 falta en el back", items: ["Nada; el gating es el mismo."] }
    ] },
    menores: { title: "Menores a cargo (tutor legal)", sections: [
      { title: "Hoy en el perfil migrado", items: ["Solo exist\xEDan en el perfil viejo: <code>GET/POST /v1/user/me/dependents</code>, <code>GET/PATCH /v1/user/me/dependents/{code}</code>; estados Registrado / En revisi\xF3n / Pendiente / Inactivo. En el perfil nuevo est\xE1n marcados como no implementados.", "El gateway ya acepta <code>GET /v1/user/{code}?include_dependents=true</code> (devuelve <code>dependents[]</code> y <code>guardians[]</code>); no est\xE1 verificado que user-auth-ms lo responda para un usuario distinto del de la sesi\xF3n."] },
      { title: "Qu\xE9 cambia", items: ["Una sola tarjeta con filas (nombre, T.I., edad, deporte, v\xEDnculo, estado, Ver perfil) y la nota de qu\xE9 significa \xABEn revisi\xF3n\xBB.", "Regla: un menor solo puede ser deportista y lo administra su tutor. Un organismo ve la lista en solo lectura y abre solo a los menores de su jurisdicci\xF3n."] },
      { title: "Fase 2 \xB7 Registrar menor (mismo flujo de sports)", items: ["Modal de dos pasos, igual al de <code>/profile</code> de suite-web-v2: <b>Documentos</b> (tipo de v\xEDnculo Padre | Tutor, documento TI o RC, documento de parentesco adjunto, consentimiento) y <b>Datos b\xE1sicos</b> (nombres, sexo, fecha de nacimiento, deporte, departamento y ciudad). En sports va a <code>POST /user/me/dependents</code> y sube el parentesco por documentation-ms.", "Suma lo que sports no valida en el front: menor de 18 por la fecha de nacimiento y documento no registrado ya en el SUID.", "Queda <b>En revisi\xF3n</b> mientras se valida el documento de parentesco; el tutor no puede entrar a su perfil hasta entonces (como en sports). Despu\xE9s, \xABGestionar perfil\xBB abre el perfil del menor con el aviso de que lo administra su tutor.", "Solo el tutor registra al menor (propuesta de P-21, pendiente con Negocio). El menor queda autodeclarado: no pasa por la bandeja de ning\xFAn organismo."] },
      { title: "Qu\xE9 falta en el back", items: ["Confirmar <code>include_dependents</code> para el visor administrador."] }
    ] },
    vinculos: { title: "V\xEDnculos (personal de apoyo)", sections: [
      { title: "Hoy en el perfil migrado", items: ["Solo existe <code>support_role_code/name</code>; la tarjeta \xABRol / Principal\xBB cae en \xABPersonal deportivo\xBB si no llega.", "No existen profesi\xF3n, certificaciones ni v\xEDnculos con organismos. El rol de apoyo multi-valor estaba en la vista vieja y no en la nueva."] },
      { title: "Qu\xE9 cambia", items: ["Rol de apoyo y organismos con estado. Ser personal de apoyo no requiere aprobaci\xF3n; el v\xEDnculo con una liga o un club s\xED."] },
      { title: "Fase 2 \xB7 en la demo ya funciona", items: ["\xABSolicitar v\xEDnculo\xBB busca cualquier organismo Activo (club, liga, federaci\xF3n o comit\xE9, P-05). Usa la misma relaci\xF3n de afiliaci\xF3n con <code>tipo: personal</code>.", "Ese organismo lo ve en su bandeja, en \xABSolicitudes de v\xEDnculo\xBB, y aprueba o rechaza con motivo. Un v\xEDnculo de personal no cuenta como club del deportista."] },
      { title: "Qu\xE9 falta en el back", items: ["Entidad de v\xEDnculo persona\u2013organismo (estado, fechas, qui\xE9n aprueba) y rol de apoyo multi-valor."] }
    ] },
    pendientes: { title: "Pendientes", sections: [
      { title: "Hoy en el perfil migrado", items: ["No existe. El riel derecho ten\xEDa Biometr\xEDa y \xABRol / Principal\xBB."] },
      { title: "Qu\xE9 cambia", items: ["Reemplaza a \xABMis roles y v\xEDnculos\xBB (repet\xEDa los roles por tercera vez). Bloque compacto arriba de los datos: solo lo que espera algo, una fila por pendiente con su acci\xF3n; se colapsa si son m\xE1s de 3 y sin pendientes no se muestra. Solo en el perfil propio."] },
      { title: "Qu\xE9 falta en el back", items: ["Se arma con las afiliaciones, los v\xEDnculos y los menores; no necesita endpoint propio si esos tres existen."] }
    ] },
    consulta: { title: "Consulta de usuario (administrador)", sections: [
      { title: "Hoy en el perfil migrado", items: ["La vista vieja ten\xEDa y la nueva no: estado Activo/Inactivo, \xABVolver al listado\xBB, rol de apoyo multi-valor y edici\xF3n de organizaciones."] },
      { title: "Qu\xE9 cambia", items: ["Mismo componente que el perfil propio con banner, \xABVolver al listado\xBB, estado de la cuenta y textos en tercera persona. Ve todas las facetas y puede editar."] },
      { title: "Qu\xE9 falta en el back", items: ["Activar/inactivar cuenta desde el perfil y auditor\xEDa de los cambios del administrador.", "Documentos y Configuraci\xF3n no tienen funcionalidad en ninguna versi\xF3n."] }
    ] }
  };
  var merge = (title, keys) => ({ title, sections: keys.flatMap((k) => DEVNOTES[k].sections.map((x) => ({ title: `${DEVNOTES[k].title} \xB7 ${x.title}`, items: x.items }))) });
  DEVNOTES.barAdmin = merge("Consulta de usuario y visor", ["consulta", "acceso", "quien"]);
  DEVNOTES.barVisor = merge("Qui\xE9n mira y qui\xE9n puede ver", ["acceso", "quien"]);
  DEVNOTES.barOwn = merge("Qui\xE9n mira y qui\xE9n puede ver", ["quien", "acceso"]);
  function mountPerfil(el) {
    root = el;
    if (!document.getElementById("mpSprite")) {
      const s = document.createElement("div");
      s.id = "mpSprite";
      s.innerHTML = SPRITE;
      document.body.prepend(s);
    }
    root.classList.add("mp");
    render();
    let raf;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncTabFades);
    });
  }

  // entries/perfil.js
  seedDemoData();
  var viewer2 = resolveViewer();
  var roleCode = viewer2.shellRole;
  var activeId = ["PERSONA", "DEPORTISTA"].includes(roleCode) ? "perfil" : roleCode === "CLUB" ? "deportistas" : null;
  mountSidebar({ rootEl: document.getElementById("sidebarRoot"), roleCode, activeId });
  var _a3;
  if (window.matchMedia("(min-width: 1024px)").matches) (_a3 = document.getElementById("naoweeSidebar")) == null ? void 0 : _a3.classList.add("collapsed");
  mountHeader({ headerEl: document.getElementById("topHeader"), role: ROLES[roleCode] });
  mountBackdrop();
  mountDemoSwitcher({ roleCode });
  mountPerfil(document.getElementById("perfilRoot"));
})();
