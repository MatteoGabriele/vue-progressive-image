var path = require('path')
var webpack = require('webpack')
var name = require('../package.json').name
var combineLoaders = require('webpack-combine-loaders')

module.exports = {
  devtool: 'eval',
  entry: [
    './src'
  ],
  output: {
    path: path.resolve(__dirname, './../dist'),
    filename: name + '.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js'],
    component: path.resolve(__dirname, './src/component'),
    module: path.resolve(__dirname, './src/store/module')
  },
  eslint: {
    configFile: './.eslintrc',
    formatter: require('eslint-friendly-formatter')
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          retainLines: true,
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ])
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  postcss: function () {
    return [
      require('autoprefixer')
    ];
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
}
