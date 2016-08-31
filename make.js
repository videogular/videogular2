var path = require('path');
var Builder = require('systemjs-builder');
var builder = new Builder();
var libs = ['core', 'controls', 'overlay-play', 'slides'];
var config = {
  baseURL: '.',
  transpiler: 'typescript',
  typescriptOptions: {
    module: 'cjs'
  },
  map: {
    typescript: './node_modules/typescript/lib/typescript.js',
    '@angular': './node_modules/@angular',
    rxjs: './node_modules/rxjs'
  },
  paths: {
    '*': '*.js'
  },
  meta: {
    './node_modules/@angular/*': { build: false },
    './node_modules/rxjs/*': { build: false }
  }
};

builder.config(config);

for (var i=0, l=libs.length; i<l; i++) {
  builder
    .bundle(libs[i], path.resolve(__dirname, 'dist/', libs[i] + '.js'))
    .then(function() {
      console.log('Build complete.');
    })
    .catch(function(err) {
      console.log('Error', err);
    });
}
