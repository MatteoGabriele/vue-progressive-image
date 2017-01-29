const testsContext = require.context('.', true, /\.spec$/)

testsContext.keys().forEach(testsContext)

module.exports = testsContext
