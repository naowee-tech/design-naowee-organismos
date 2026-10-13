  import { ROLES, homeForRole, esLocal } from '../sidebar.js';
  /* Elegir perfil desde el inicio es entrar como otra persona: se olvidan persona y contexto de la sesión. */
  try { Object.keys(sessionStorage).filter((k) => k === 'naowee-organismos-persona' || k === 'naowee-organismos-territorio' || k.startsWith('naowee-organismos-ctx-')).forEach((k) => sessionStorage.removeItem(k)); } catch (_) {}

  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const order = ['MINDEPORTE', 'MINISTRO', 'TERRITORIAL', 'COMITE', 'FEDERACION', 'LIGA', 'CLUB', 'DEPORTISTA', ...(esLocal() ? ['PERSONA'] : [])];
  const CTA = {
    MINDEPORTE: 'Abrir jerarquía', MINISTRO: 'Abrir jerarquía', COMITE: 'Abrir jerarquía', FEDERACION: 'Abrir jerarquía',
    LIGA: 'Abrir jerarquía', TERRITORIAL: 'Abrir jerarquía', CLUB: 'Abrir bandeja', DEPORTISTA: 'Abrir mi perfil', PERSONA: 'Abrir mi perfil'
  };

  document.getElementById('grid').innerHTML = order.map((code) => {
    const r = ROLES[code];
    const initials = r.avatar || r.userName.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
    const orgLine = r.org && r.org !== '—' ? `<div class="role-card__org">${r.org}</div>` : '';
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
        <span class="role-card__cta">${CTA[code] || 'Abrir'} ${ARROW}</span>
      </a>`;
  }).join('');


  /* Casos para mostrar: cada tarjeta abre una pantalla con la persona y el organismo ya puestos. */
  const CASOS = [
    { color: '#7c3aed', quien: 'Sandra Mejía · Liga', titulo: 'Una persona, varios organismos', desc: 'La franja «Trabajas en» cambia entre sus dos ligas y la federación; avisa los pendientes de las otras.', href: 'bandeja.html?role=LIGA&org=LIG-001&como=sandra' },
    { color: '#1f78d1', quien: 'Sandra Mejía · Federación', titulo: 'No decide sobre lo que también administra', desc: 'Desde la federación ve su propia liga marcada y no puede aprobarla ni devolverla (P-24).', href: 'bandeja.html?role=FEDERACION&org=FED-040&como=sandra&f=Todos' },
    { color: '#1f8923', quien: 'Club Ruedas del Sur', titulo: 'Club preinscrito completa su registro', desc: 'Lo cargó la liga; completa datos y documentos y lo envía a revisión.', href: 'organismo-detalle.html?role=CLUB&org=CLU-002&como=org' },
    { color: '#1f8923', quien: 'Club Halcones de Tuluá', titulo: 'Club devuelto a corrección', desc: 'Ve el motivo de la liga, corrige y reenvía; vuelve a la bandeja de la liga.', href: 'organismo-detalle.html?role=CLUB&org=CLU-012&como=org' },
    { color: '#1f8923', quien: 'Club Rueda Libre Palmira', titulo: 'Club suspendido, visto desde adentro', desc: 'Su menú queda en «Mi organismo»: qué pasó, el motivo y qué puede hacer.', href: 'organismo-detalle.html?role=CLUB&org=CLU-010&como=org' },
    { color: '#002B5B', quien: 'María F. Rojas · Ministerio', titulo: 'El Ministerio sanciona un club', desc: 'Suspender, reactivar (vuelve a revisión) y cancelar el registro como acción definitiva.', href: 'organismo-detalle.html?role=MINDEPORTE&id=CLU-003' },
    { color: '#7c3aed', quien: 'Sandra Mejía · Liga', titulo: 'La liga registra un deportista y le propone club', desc: 'El club es obligatorio y queda como propuesta que el club confirma. Si el documento ya existe, no se crea otro.', href: 'deportistas.html?role=LIGA&org=LIG-001&como=sandra' },
    { color: '#7c3aed', quien: 'Sandra Mejía · Liga', titulo: 'Carga masiva de deportistas', desc: 'Plantilla con su club: nuevas, ya en el SUID y errores por fila. Los clubes confirman las propuestas en su bandeja.', href: 'deportistas.html?role=LIGA&org=LIG-001&como=sandra&vista=cargue' },
    { color: '#1f8923', quien: 'Óscar Cardona · Club', titulo: 'El club confirma solicitudes y propuestas', desc: 'Aprobar suma el club al deportista sin quitarle los que ya tiene.', href: 'bandeja.html?role=CLUB' },
    { color: '#0e7490', quien: 'Laura Gómez · deportista, tutora y entrenadora', titulo: 'La tutora registra a un menor', desc: 'Mismo flujo de sports: documentos y datos básicos. Queda en revisión mientras se valida el parentesco.', href: 'perfil.html?role=PERSONA&seccion=menores' },
    { color: '#0e7490', quien: 'Laura Gómez · deportista', titulo: 'Afiliarse a un segundo club', desc: 'Busca el club y pide afiliación; ve la cadena que hereda de cada club y puede retirarse de uno.', href: 'perfil.html?role=PERSONA&seccion=afiliaciones' },
    { color: '#1f8923', quien: 'Óscar Cardona · Club', titulo: 'El club asocia a un autodeclarado', desc: 'En «Mis deportistas», «Asociar autodeclarado» busca a quien ya está en el SUID sin club.', href: 'deportistas.html?role=CLUB' },
    { color: '#1f8923', quien: 'Óscar Cardona · Club', titulo: 'El club pide entrar a otra liga', desc: 'Desde «Mi organismo» elige otra liga de su deporte; esa liga aprueba solo el vínculo (P-20).', href: 'organismo-detalle.html?role=CLUB' },
    { color: '#b45309', quien: 'Ana Lucía Valencia · Encargada departamental', titulo: 'El territorio consulta su departamento', desc: 'Ve las ligas y clubes ubicados en el Valle y sus deportistas, en solo lectura. No aprueba nada.', href: 'jerarquia.html?role=TERRITORIAL&territorio=Valle del Cauca' },
    { color: '#b45309', quien: 'Encargado municipal · Cali', titulo: 'El municipio registra un deportista', desc: 'Lo registra autodeclarado y le propone un club de su municipio; el club lo confirma.', href: 'deportistas.html?role=TERRITORIAL&territorio=Cali' },
    { color: '#d74009', quien: 'Camilo Duarte · Comité Olímpico', titulo: 'Usuarios del organismo', desc: 'Cuenta principal y usuarios internos: invita un gestor; el metodólogo lo invita el gestor. Desactivar no borra.', href: 'usuarios.html?role=COMITE' },
    { color: '#002B5B', quien: 'María F. Rojas · Ministerio', titulo: 'Administradores y territoriales', desc: 'Los administradores del Ministerio los crea Naowee y serán por módulo; el Ministerio crea los usuarios territoriales.', href: 'usuarios.html?role=MINDEPORTE' },
    { color: '#334155', quien: 'Despacho del Ministro', titulo: 'El Ministro consulta todo el SND', desc: 'Visualizador de la raíz (P-01): ve jerarquía, fichas, eventos y deportistas sin aprobar ni sancionar.', href: 'jerarquia.html?role=MINISTRO' },
    { color: '#d74009', quien: 'Camilo Duarte · Comité Olímpico', titulo: 'Eventos de la jurisdicción', desc: 'El Comité ve los eventos del Ciclo Olímpico y los de las federaciones, ligas y clubes que dependen de él.', href: 'organismo-detalle.html?role=COMITE&tab=eventos' },
    { color: '#7c3aed', quien: 'Sandra Mejía · Liga de Natación', titulo: 'Un deportista en dos clubes', desc: 'Mateo Restrepo patina en Cali y nada en Aguas del Valle: aparece en las dos ligas y cuenta una vez.', href: 'deportistas.html?role=LIGA&org=LIG-006&como=sandra' }
  ];
  document.getElementById('casosGrid').innerHTML = CASOS.map((c) => `
    <a class="role-card" href="${c.href}" style="--role-color:${c.color}">
      <div class="role-card__top"><div>
        <div class="role-card__name">${c.titulo}</div>
        <div class="role-card__org">${c.quien}</div>
      </div></div>
      <p class="role-card__desc">${c.desc}</p>
      <span class="role-card__cta">Abrir ${ARROW}</span>
    </a>`).join('');
