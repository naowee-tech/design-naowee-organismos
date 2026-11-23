/* Empaqueta cada página en un script clásico (IIFE) para abrir los HTML con doble clic, sin servidor. */
const path = require('path');
const root = path.resolve(__dirname, '..');
/* esbuild: el del proyecto, el que indique ESBUILD_PATH (ruta a su carpeta) o el instalado globalmente. */
const esbuild = (() => {
  for (const c of [process.env.ESBUILD_PATH, path.join(root, 'node_modules/esbuild'), 'esbuild']) {
    if (!c) continue;
    try { return require(c); } catch (_) { /* siguiente candidato */ }
  }
  console.error('No se encontró esbuild. Instálalo (npm i -D esbuild) o apunta ESBUILD_PATH a su carpeta.');
  process.exit(1);
})();
const entries = {
  index: 'shared/entries/index.js', bandeja: 'shared/entries/bandeja.js', deportistas: 'shared/entries/deportistas.js',
  cargue: 'shared/entries/cargue.js', registro: 'shared/entries/registro.js', 'organismo-detalle': 'shared/entries/organismo-detalle.js',
  jerarquia: 'shared/entries/jerarquia.js', perfil: 'shared/entries/perfil.js', afiliacion: 'shared/afiliacion.js', 'registro-publico': 'shared/registro-publico.js', usuarios: 'shared/entries/usuarios.js', documentos: 'shared/entries/documentos.js'
};
esbuild.build({
  entryPoints: Object.fromEntries(Object.entries(entries).map(([k, v]) => [k, path.join(root, v)])),
  bundle: true, format: 'iife', target: 'es2019', outdir: path.join(root, 'shared/bundles'), logLevel: 'info'
}).catch(() => process.exit(1));
