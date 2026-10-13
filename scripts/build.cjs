/* Empaqueta cada página en un script clásico (IIFE) para abrir los HTML con doble clic, sin servidor. */
const esbuild = require('/Users/jorge-guzman/Naowee/sdk-frontend-react/node_modules/esbuild');
const path = require('path');
const root = path.resolve(__dirname, '..');
const entries = {
  index: 'shared/entries/index.js', bandeja: 'shared/entries/bandeja.js', deportistas: 'shared/entries/deportistas.js',
  cargue: 'shared/entries/cargue.js', registro: 'shared/entries/registro.js', 'organismo-detalle': 'shared/entries/organismo-detalle.js',
  jerarquia: 'shared/entries/jerarquia.js', perfil: 'shared/entries/perfil.js', afiliacion: 'shared/afiliacion.js', 'registro-publico': 'shared/registro-publico.js'
};
esbuild.build({
  entryPoints: Object.fromEntries(Object.entries(entries).map(([k, v]) => [k, path.join(root, v)])),
  bundle: true, format: 'iife', target: 'es2019', outdir: path.join(root, 'shared/bundles'), logLevel: 'info'
}).catch(() => process.exit(1));
