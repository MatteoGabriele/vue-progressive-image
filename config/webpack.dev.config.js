var webpack = require('webpack')
var babel = require('./rules/babel')
var vue = require('./rules/vue')

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    path: './dist',
    filename: 'vue-progressive-image.js'
  },
  module: {
    rules: [babel, vue]
  },
  plugins: []
}
