/* SOLO DEMO · notas para devs. No son parte del producto.
   Registro por clave: { title, items?: [html], sections?: [{ title, items: [html] }] }.
   mountDevnotes(registry) llena cada [data-devnote] vacío; llamarlo después de cada render. */
export function mountDevnotes(registry, root = document) {
  root.querySelectorAll('[data-devnote]').forEach((el) => {
    if (el.dataset.mounted) return;
    const n = registry[el.dataset.devnote];
    if (!n) return;
    const list = (items) => `<ul>${(items || []).map((i) => `<li>${i}</li>`).join('')}</ul>`;
    const body = n.sections
      ? n.sections.map((s) => `<div class="wz-devnote__sec"><div class="wz-devnote__sec-title">${s.title}</div>${list(s.items)}</div>`).join('')
      : list(n.items);
    el.innerHTML = `<span class="naowee-badge">Solo demo</span>Notas para devs
      <span class="wz-devnote__pop" role="tooltip"><span class="wz-devnote__head">${n.title} <em>· nota para devs, no es parte del producto</em></span>${body}</span>`;
    el.dataset.mounted = '1';
  });
}
