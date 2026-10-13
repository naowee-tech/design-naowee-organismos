  import { ROLES, homeForRole } from '../sidebar.js';

  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const order = ['MINDEPORTE', 'COMITE', 'FEDERACION', 'LIGA', 'CLUB', 'DEPORTISTA', 'PERSONA'];
  const CTA = {
    MINDEPORTE: 'Abrir jerarquía', COMITE: 'Abrir jerarquía', FEDERACION: 'Abrir jerarquía',
    LIGA: 'Abrir jerarquía', CLUB: 'Abrir bandeja', DEPORTISTA: 'Abrir mi afiliación', PERSONA: 'Abrir mi perfil'
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
