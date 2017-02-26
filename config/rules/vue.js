module.exports = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    js: 'babel-loader',
    cssModules: {
      importLoaders: 1,
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      camelCase: true
    }
  }
}
