const { build } = require('esbuild');

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  external: ['./node_modules/*'],
  bundle: true,
  format: 'cjs',
  target: 'node16',
  platform: 'node',
  logLevel: 'info',
});
