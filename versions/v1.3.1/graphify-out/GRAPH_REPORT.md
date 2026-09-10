# Graph Report - naowee-organismos  (2026-07-17)

## Corpus Check
- 233 files · ~1,004,861 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 8493 nodes · 22791 edges · 216 communities (182 shown, 34 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 570 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `34e8140b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- registro.js
- registro.js
- registro.js
- registro.js
- registro.js
- registro.js
- registro.js
- afiliacion.js
- bandeja.js
- bandeja.js
- bandeja.js
- bandeja.js
- bandeja.js
- bandeja.js
- registro-publico.js
- registro-publico.js
- bandeja.js
- afiliacion.js
- afiliacion.js
- afiliacion.js
- afiliacion.js
- afiliacion.js
- afiliacion.js
- registro-publico.js
- registro-publico.js
- detalle.js
- registro-publico.js
- registro-publico.js
- detalle.js
- registro-publico.js
- detalle.js
- detalle.js
- detalle.js
- detalle.js
- detalle.js
- organismos-data.js
- organismos-data.js
- organismos-data.js
- organismos-data.js
- organismos-data.js
- organismos-data.js
- organismos-data.js
- qr.js
- cargue.js
- cargue.js
- cargue.js
- cargue.js
- cargue.js
- cargue.js
- cargue.js
- sidebar.js
- sidebar.js
- sidebar.js
- sidebar.js
- sidebar.js
- sidebar.js
- sidebar.js
- tour.js
- tour.js
- tour.js
- tour.js
- tour.js
- tour.js
- tour.js
- deportista-detalle.js
- deportista-detalle.js
- deportista-detalle.js
- deportista-detalle.js
- deportista-detalle.js
- deportista-detalle.js
- deportista-detalle.js
- Naowee · Registro de Organismos — Jerarquía SUID
- estados.js
- estados.js
- estados.js
- naowee-footer.js
- naowee-footer.js
- naowee-footer.js
- naowee-footer.js
- naowee-footer.js
- naowee-footer.js
- naowee-footer.js
- ORG_ESTADOS
- ORG_ESTADOS
- ORG_ESTADOS
- ORG_ESTADOS
- ORG_ESTADOS
- ORG_ESTADOS
- ORG_ESTADOS
- registro.js
- afiliacion.js
- registro-publico.js
- registro-publico.js
- bandeja.js
- bandeja.js
- afiliacion.js
- detalle.js
- detalle.js
- organismos-data.js
- organismos-data.js
- qr.js
- cargue.js
- cargue.js
- bindPane
- sidebar.js
- sidebar.js
- tour.js
- tour.js
- deportista-detalle.js
- deportista-detalle.js
- estados.js
- estados.js
- renderSuccess
- estados.js
- estados.js
- naowee-footer.js
- naowee-footer.js
- ORG_ESTADOS
- ORG_ESTADOS
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- naowee-footer.js
- ORG_ESTADOS
- registro-publico.js
- bandeja.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- estados.js
- estados.js
- naowee-footer.js
- ORG_ESTADOS
- registro-publico.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- naowee-footer.js
- ORG_ESTADOS
- registro.js
- afiliacion.js
- registro-publico.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- render
- esc
- tour.js
- deportista-detalle.js
- estados.js
- renderSuccess
- estados.js
- naowee-footer.js
- ORG_ESTADOS
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- estados.js
- naowee-footer.js
- ORG_ESTADOS
- bandeja.js
- afiliacion.js
- registro-publico.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- estados.js
- naowee-footer.js
- ORG_ESTADOS
- bandeja.js
- afiliacion.js
- registro-publico.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- estados.js
- naowee-footer.js
- ORG_ESTADOS
- registro.js
- bandeja.js
- registro-publico.js
- afiliacion.js
- detalle.js
- organismos-data.js
- qr.js
- cargue.js
- sidebar.js
- tour.js
- deportista-detalle.js
- naowee-footer.js
- ORG_ESTADOS

## God Nodes (most connected - your core abstractions)
1. `getOrganismo()` - 29 edges
2. `getOrganismo()` - 29 edges
3. `getOrganismo()` - 29 edges
4. `getOrganismo()` - 29 edges
5. `getOrganismo()` - 29 edges
6. `getOrganismo()` - 29 edges
7. `getOrganismo()` - 29 edges
8. `getOrganismo()` - 29 edges
9. `getOrganismo()` - 29 edges
10. `getOrganismo()` - 29 edges

## Surprising Connections (you probably didn't know these)
- `refresh()` --calls--> `buildDeportistaDetalle()`  [EXTRACTED]
  shared/afiliacion.js → shared/deportista-detalle.js
- `refresh()` --calls--> `getDeportista()`  [EXTRACTED]
  shared/afiliacion.js → shared/organismos-data.js
- `bindPanel()` --calls--> `cancelarRetiro()`  [EXTRACTED]
  shared/afiliacion.js → shared/organismos-data.js
- `bindPanel()` --calls--> `retirarAfiliacion()`  [EXTRACTED]
  shared/afiliacion.js → shared/organismos-data.js
- `miclubHTML()` --calls--> `getOrganismo()`  [EXTRACTED]
  shared/afiliacion.js → shared/organismos-data.js

## Import Cycles
- None detected.

## Communities (216 total, 34 thin omitted)

### Community 0 - "registro.js"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), comitePorSector(), actoUploader(), AMBITOS, applyMask(), back(), bindPane() (+71 more)

### Community 1 - "registro.js"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), comitePorSector(), actoUploader(), AMBITOS, applyMask(), back(), bindPane() (+71 more)

### Community 2 - "registro.js"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+71 more)

### Community 3 - "registro.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 4 - "registro.js"
Cohesion: 0.06
Nodes (80): activosDeTipo(), clearStore(), comitePorSector(), actoUploader(), AMBITOS, applyMask(), back(), bindPane() (+72 more)

### Community 5 - "registro.js"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), comitePorSector(), actoUploader(), AMBITOS, applyMask(), back(), bindPane() (+71 more)

### Community 6 - "registro.js"
Cohesion: 0.06
Nodes (76): clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup(), clearFieldError() (+68 more)

### Community 7 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 8 - "bandeja.js"
Cohesion: 0.07
Nodes (77): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), capFirst(), closeModal(), cubiertoPorRolAnclado(), doApprove() (+69 more)

### Community 9 - "bandeja.js"
Cohesion: 0.09
Nodes (64): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), closeModal(), doApprove(), doApproveAfil() (+56 more)

### Community 10 - "bandeja.js"
Cohesion: 0.08
Nodes (69): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), closeModal(), doApprove(), doApproveAfil(), doApprovePre() (+61 more)

### Community 11 - "bandeja.js"
Cohesion: 0.08
Nodes (69): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), closeModal(), doApprove(), doApproveAfil(), doApprovePre() (+61 more)

### Community 12 - "bandeja.js"
Cohesion: 0.07
Nodes (76): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+68 more)

### Community 13 - "bandeja.js"
Cohesion: 0.08
Nodes (72): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+64 more)

### Community 14 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 15 - "registro-publico.js"
Cohesion: 0.06
Nodes (63): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+55 more)

### Community 16 - "bandeja.js"
Cohesion: 0.08
Nodes (69): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), closeModal(), doApprove(), doApproveAfil(), doApprovePre() (+61 more)

### Community 17 - "afiliacion.js"
Cohesion: 0.09
Nodes (58): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+50 more)

### Community 18 - "afiliacion.js"
Cohesion: 0.09
Nodes (59): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+51 more)

### Community 19 - "afiliacion.js"
Cohesion: 0.09
Nodes (59): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+51 more)

### Community 20 - "afiliacion.js"
Cohesion: 0.09
Nodes (59): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+51 more)

### Community 21 - "afiliacion.js"
Cohesion: 0.09
Nodes (58): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+50 more)

### Community 22 - "afiliacion.js"
Cohesion: 0.09
Nodes (58): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+50 more)

### Community 23 - "registro-publico.js"
Cohesion: 0.08
Nodes (54): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), dd() (+46 more)

### Community 24 - "registro-publico.js"
Cohesion: 0.07
Nodes (62): seedBandejaDemo(), activosDeTipo(), allOrganismos(), applyOverride(), comitePorSector(), ddOptions(), advance(), ageHint() (+54 more)

### Community 25 - "detalle.js"
Cohesion: 0.08
Nodes (52): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+44 more)

### Community 26 - "registro-publico.js"
Cohesion: 0.08
Nodes (51): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), dd() (+43 more)

### Community 27 - "registro-publico.js"
Cohesion: 0.08
Nodes (51): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), dd() (+43 more)

### Community 28 - "detalle.js"
Cohesion: 0.08
Nodes (49): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+41 more)

### Community 29 - "registro-publico.js"
Cohesion: 0.08
Nodes (51): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), dd() (+43 more)

### Community 30 - "detalle.js"
Cohesion: 0.08
Nodes (52): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+44 more)

### Community 31 - "detalle.js"
Cohesion: 0.08
Nodes (49): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+41 more)

### Community 32 - "detalle.js"
Cohesion: 0.07
Nodes (56): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+48 more)

### Community 33 - "detalle.js"
Cohesion: 0.08
Nodes (49): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+41 more)

### Community 34 - "detalle.js"
Cohesion: 0.07
Nodes (52): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+44 more)

### Community 35 - "organismos-data.js"
Cohesion: 0.13
Nodes (37): bandejaOrgs(), seedBandejaDemo(), addOrganismo(), allAudit(), allDeportistas(), allOrganismos(), applyOverride(), auditLog() (+29 more)

### Community 36 - "organismos-data.js"
Cohesion: 0.12
Nodes (42): bandejaOrgs(), seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), allAudit(), allCargues(), allOrganismos(), allPreinscritos() (+34 more)

### Community 37 - "organismos-data.js"
Cohesion: 0.12
Nodes (43): seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos(), applyOverride() (+35 more)

### Community 38 - "organismos-data.js"
Cohesion: 0.15
Nodes (34): seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), auditLog(), cancelarRetiro() (+26 more)

### Community 39 - "organismos-data.js"
Cohesion: 0.15
Nodes (36): seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allPreinscritos(), auditLog(), cancelarRetiro() (+28 more)

### Community 40 - "organismos-data.js"
Cohesion: 0.13
Nodes (37): bandejaOrgs(), seedBandejaDemo(), addOrganismo(), allAudit(), allDeportistas(), allOrganismos(), applyOverride(), auditLog() (+29 more)

### Community 41 - "organismos-data.js"
Cohesion: 0.13
Nodes (37): bandejaOrgs(), seedBandejaDemo(), addOrganismo(), allAudit(), allDeportistas(), allOrganismos(), applyOverride(), auditLog() (+29 more)

### Community 42 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 43 - "cargue.js"
Cohesion: 0.11
Nodes (33): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+25 more)

### Community 44 - "cargue.js"
Cohesion: 0.11
Nodes (33): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+25 more)

### Community 45 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 46 - "cargue.js"
Cohesion: 0.11
Nodes (32): seedBandejaDemo(), COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS (+24 more)

### Community 47 - "cargue.js"
Cohesion: 0.11
Nodes (31): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+23 more)

### Community 48 - "cargue.js"
Cohesion: 0.13
Nodes (28): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+20 more)

### Community 49 - "cargue.js"
Cohesion: 0.11
Nodes (33): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+25 more)

### Community 50 - "sidebar.js"
Cohesion: 0.14
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getIcon(), getMenuForRole() (+15 more)

### Community 51 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 52 - "sidebar.js"
Cohesion: 0.14
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getIcon(), getMenuForRole() (+15 more)

### Community 53 - "sidebar.js"
Cohesion: 0.14
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getIcon(), getMenuForRole() (+15 more)

### Community 54 - "sidebar.js"
Cohesion: 0.14
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getIcon(), getMenuForRole() (+15 more)

### Community 55 - "sidebar.js"
Cohesion: 0.13
Nodes (25): seedBandejaDemo(), bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode() (+17 more)

### Community 56 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 57 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 58 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 59 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 60 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 61 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 62 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 63 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 64 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 65 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 66 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 67 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 68 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 69 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 70 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 71 - "Naowee · Registro de Organismos — Jerarquía SUID"
Cohesion: 0.20
Nodes (9): Cómo correr, Datos demo, Estructura, La jerarquía (el corazón del módulo), Naowee · Registro de Organismos — Jerarquía SUID, Pantallas e historias de usuario (ORG-01 … ORG-08), Recorrido guiado por HU 🧭, Roles de la demo (profile switcher) (+1 more)

### Community 72 - "estados.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 73 - "estados.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 74 - "estados.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 89 - "registro.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 90 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 91 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 92 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 93 - "bandeja.js"
Cohesion: 0.07
Nodes (80): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+72 more)

### Community 94 - "bandeja.js"
Cohesion: 0.07
Nodes (79): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+71 more)

### Community 95 - "afiliacion.js"
Cohesion: 0.09
Nodes (59): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), closeAsociarModal() (+51 more)

### Community 96 - "detalle.js"
Cohesion: 0.08
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 97 - "detalle.js"
Cohesion: 0.09
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 98 - "organismos-data.js"
Cohesion: 0.12
Nodes (43): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), allAudit(), allCargues(), allDeportistas(), allOrganismos(), applyOverride() (+35 more)

### Community 99 - "organismos-data.js"
Cohesion: 0.11
Nodes (44): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos() (+36 more)

### Community 100 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 101 - "cargue.js"
Cohesion: 0.12
Nodes (29): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+21 more)

### Community 102 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 103 - "bindPane"
Cohesion: 0.07
Nodes (80): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+72 more)

### Community 104 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 105 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 106 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 107 - "tour.js"
Cohesion: 0.26
Nodes (16): boot(), buildUrl(), endTour(), findTarget(), injectCSS(), mk(), paint(), placeSpot() (+8 more)

### Community 108 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 109 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 110 - "estados.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 111 - "estados.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 112 - "renderSuccess"
Cohesion: 0.07
Nodes (67): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+59 more)

### Community 113 - "estados.js"
Cohesion: 0.07
Nodes (80): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+72 more)

### Community 114 - "estados.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 119 - "detalle.js"
Cohesion: 0.09
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 120 - "organismos-data.js"
Cohesion: 0.11
Nodes (45): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos() (+37 more)

### Community 121 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 122 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 123 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 124 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 125 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 128 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 129 - "bandeja.js"
Cohesion: 0.07
Nodes (80): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+72 more)

### Community 130 - "detalle.js"
Cohesion: 0.09
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 131 - "organismos-data.js"
Cohesion: 0.11
Nodes (44): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos() (+36 more)

### Community 132 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 133 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 134 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 135 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 136 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 137 - "estados.js"
Cohesion: 0.07
Nodes (80): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+72 more)

### Community 138 - "estados.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 141 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 142 - "detalle.js"
Cohesion: 0.09
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 143 - "organismos-data.js"
Cohesion: 0.11
Nodes (44): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos() (+36 more)

### Community 144 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 145 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 146 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 147 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 148 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 151 - "registro.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 152 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 153 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 154 - "detalle.js"
Cohesion: 0.09
Nodes (47): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+39 more)

### Community 155 - "organismos-data.js"
Cohesion: 0.11
Nodes (44): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos() (+36 more)

### Community 156 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 157 - "cargue.js"
Cohesion: 0.12
Nodes (30): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+22 more)

### Community 158 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 159 - "render"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+71 more)

### Community 160 - "esc"
Cohesion: 0.08
Nodes (72): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+64 more)

### Community 161 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 162 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 163 - "estados.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 164 - "renderSuccess"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 165 - "estados.js"
Cohesion: 0.07
Nodes (55): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+47 more)

### Community 168 - "organismos-data.js"
Cohesion: 0.12
Nodes (42): seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos(), applyOverride() (+34 more)

### Community 169 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 170 - "cargue.js"
Cohesion: 0.13
Nodes (28): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+20 more)

### Community 171 - "sidebar.js"
Cohesion: 0.13
Nodes (25): seedBandejaDemo(), bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode() (+17 more)

### Community 172 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 173 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 174 - "estados.js"
Cohesion: 0.06
Nodes (79): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+71 more)

### Community 177 - "bandeja.js"
Cohesion: 0.08
Nodes (73): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+65 more)

### Community 178 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 179 - "registro-publico.js"
Cohesion: 0.06
Nodes (68): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+60 more)

### Community 180 - "detalle.js"
Cohesion: 0.07
Nodes (52): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+44 more)

### Community 181 - "organismos-data.js"
Cohesion: 0.11
Nodes (45): seedCarguesDemo(), addOrganismo(), addOrganismosBulk(), allAudit(), allCargues(), allDeportistas(), allOrganismos(), applyOverride() (+37 more)

### Community 182 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 183 - "cargue.js"
Cohesion: 0.13
Nodes (28): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+20 more)

### Community 184 - "sidebar.js"
Cohesion: 0.13
Nodes (25): seedBandejaDemo(), bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode() (+17 more)

### Community 185 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 186 - "deportista-detalle.js"
Cohesion: 0.22
Nodes (12): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+4 more)

### Community 187 - "estados.js"
Cohesion: 0.06
Nodes (78): activosDeTipo(), clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup() (+70 more)

### Community 190 - "bandeja.js"
Cohesion: 0.08
Nodes (73): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), bandejaOrgs(), capFirst(), closeModal(), cubiertoPorRolAnclado() (+65 more)

### Community 191 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 192 - "registro-publico.js"
Cohesion: 0.07
Nodes (67): advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError(), closeDatePicker() (+59 more)

### Community 193 - "detalle.js"
Cohesion: 0.08
Nodes (54): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+46 more)

### Community 194 - "organismos-data.js"
Cohesion: 0.13
Nodes (39): seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), allCargues(), allOrganismos(), applyOverride(), auditLog(), buscarClubesActivos() (+31 more)

### Community 195 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 196 - "cargue.js"
Cohesion: 0.11
Nodes (31): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+23 more)

### Community 197 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 198 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 199 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

### Community 200 - "estados.js"
Cohesion: 0.29
Nodes (6): BADGE_VARIANT, ESTADO_DESC, ESTADOS, ESTADOS_SOLICITUD, resolverFederacion(), TRANSICIONES

### Community 203 - "registro.js"
Cohesion: 0.06
Nodes (78): clearStore(), actoUploader(), AMBITOS, applyMask(), back(), bindPane(), choiceGroup(), clearFieldError() (+70 more)

### Community 204 - "bandeja.js"
Cohesion: 0.07
Nodes (76): AFIL_ESTADO, AFIL_SOL_VARIANT, afilById(), badge(), capFirst(), closeModal(), cubiertoPorRolAnclado(), doApprove() (+68 more)

### Community 205 - "registro-publico.js"
Cohesion: 0.06
Nodes (69): activosDeTipo(), advance(), ageHint(), applyMask(), bindPane(), checkDup(), choiceGroup(), clearFieldError() (+61 more)

### Community 206 - "afiliacion.js"
Cohesion: 0.08
Nodes (70): affState(), affStatePillHTML(), ancestorsChainPreview(), asideHTML(), ATLETA, bindPanel(), bioTile(), carneHTML() (+62 more)

### Community 207 - "detalle.js"
Cohesion: 0.08
Nodes (54): backBtnHtml(), badge(), breadcrumbHtml(), cap(), COBERTURA_BY_TIPO, countsHtml(), depBadge(), DOC_LABELS (+46 more)

### Community 208 - "organismos-data.js"
Cohesion: 0.13
Nodes (40): bandejaOrgs(), seedBandejaDemo(), seedCarguesDemo(), addOrganismo(), allCargues(), allOrganismos(), allPreinscritos(), applyOverride() (+32 more)

### Community 209 - "qr.js"
Cohesion: 0.12
Nodes (17): appendBits(), Ecc, ECC_CODEWORDS_PER_BLOCK, ECL_MAP, getBit(), getNumDataCodewords(), getNumRawDataModules(), getTotalBits() (+9 more)

### Community 210 - "cargue.js"
Cohesion: 0.11
Nodes (31): COL, commit(), DEMO_CARGUES, downloadTemplate(), esc(), fmtSize(), HEADERS, I (+23 more)

### Community 211 - "sidebar.js"
Cohesion: 0.15
Nodes (23): bindDemoSwitcher(), bindHeaderEvents(), bindSidebarEvents(), closeDrawer(), demoToast(), flashPlaceholder(), getDemoMode(), getIcon() (+15 more)

### Community 212 - "tour.js"
Cohesion: 0.24
Nodes (18): boot(), buildUrl(), endTour(), findTarget(), hideBackdrop(), injectCSS(), mk(), paint() (+10 more)

### Community 213 - "deportista-detalle.js"
Cohesion: 0.23
Nodes (11): anio(), buildDeportistaDetalle(), DEPORTE_EMOJI, DOC_LABEL, fmtFecha(), MESES, PERFIL_EXTRA, SANGRES (+3 more)

## Knowledge Gaps
- **1986 isolated node(s):** `I`, `TIER`, `MEDAL_EMOJI`, `DEPORTE_EMOJI`, `SOL_EMOJI` (+1981 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **34 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getOrganismo()` connect `bandeja.js` to `detalle.js`, `organismos-data.js`, `cargue.js`, `deportista-detalle.js`, `estados.js`, `afiliacion.js`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `getOrganismo()` connect `estados.js` to `estados.js`, `detalle.js`, `organismos-data.js`, `cargue.js`, `estados.js`, `deportista-detalle.js`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **Why does `getOrganismo()` connect `bandeja.js` to `registro.js`, `afiliacion.js`, `detalle.js`, `organismos-data.js`, `cargue.js`, `deportista-detalle.js`?**
  _High betweenness centrality (0.001) - this node is a cross-community bridge._
- **What connects `I`, `TIER`, `MEDAL_EMOJI` to the rest of the system?**
  _1986 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `registro.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05994710549515134 - nodes in this community are weakly interconnected._
- **Should `registro.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05994710549515134 - nodes in this community are weakly interconnected._
- **Should `registro.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05994710549515134 - nodes in this community are weakly interconnected._