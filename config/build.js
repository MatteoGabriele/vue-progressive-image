var fs = require('fs')
var zlib = require('zlib')
var banner = require('./banner')
var rollup = require('rollup')
var uglify = require('uglify-js')
var pack = require('../package.json')
var plugins = require('./plugins')

rollup.rollup({
  entry: 'src/index.js',
  plugins: plugins
})
.then(function (bundle) {
  return write('dist/' + pack.name + '.common.js', bundle.generate({
    format: 'cjs',
    banner: banner
  }).code)
})

.then(function () {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: plugins
  })
  .then(function (bundle) {
    return write('dist/' + pack.name + '.js', bundle.generate({
      format: 'umd',
      moduleName: classify(pack.name),
      banner: banner
    }).code)
  })
})
.then(function () {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: plugins
  })
  .then(function (bundle) {
    var code = bundle.generate({
      format: 'umd',
      moduleName: classify(pack.name)
    }).code
    var minified = banner + '\n' + uglify.minify(code, {
      fromString: true
    }).code
    return write('dist/' + pack.name + '.min.js', minified)
  })
  .then(zip)
})
.catch(logError)

function toUpper (_, c) {
  return c ? c.toUpperCase() : ''
}

const classifyRE = /(?:^|[-_/])(\w)/g
function classify (str) {
  return str.replace(classifyRE, toUpper)
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(dest + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip () {
  return new Promise(function (resolve, reject) {
    fs.readFile('dist/' + pack.name + '.min.js', function (err, buf) {
      if (err) return reject(err)
      zlib.gzip(buf, function (err, buf) {
        if (err) return reject(err)
        write('dist/' + pack.name + '.min.js.gz', buf).then(resolve)
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}
