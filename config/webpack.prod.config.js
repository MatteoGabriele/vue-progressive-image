var webpack = require('webpack')
var webpackDevConfig = require('./webpack.dev.config')
var vue = require('./rules/vue')
var merge = require('webpack-merge')
var CompressionPlugin = require("compression-webpack-plugin")
var banner = require('./banner')

vue.options.cssModules.localIdentName = '[hash:5]'

module.exports = merge.smart({}, webpackDevConfig, {
  module: {
    rules: [vue]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // this needs to be 'production' for reducing file size
        NODE_ENV: '"production"'
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false
      },
      comments: false,
      minimize: false
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.BannerPlugin({
      banner,
      raw: true
    })
  ]
})
