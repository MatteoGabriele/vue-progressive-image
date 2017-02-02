var babel = require('rollup-plugin-babel')
var html = require('rollup-plugin-html')
var postcss = require('rollup-plugin-postcss')
var postcssModules = require('postcss-modules')
var cssExportMap = {}

module.exports = [
  postcss({
    extensions: [ '.css' ],
    plugins: [
      postcssModules({
        getJSON (id, exportTokens) {
          cssExportMap[id] = exportTokens;
        }
      }),
    ],
    getExport (id) {
      return cssExportMap[id];
    }
  }),
  html({
    include: '**/*.html'
  }),
  babel({
    babelrc: false,
    presets: ['es2015-rollup', 'stage-2']
  })
]
