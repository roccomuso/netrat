const debug = require('debug')('netrat')
const path = require('path')
const rootDir = path.join(__dirname, '../')
const which = require('npm-which')(rootDir)

const pathToPkg = which.sync('pkg')
debug('pkg found in', pathToPkg)

function builder (options, destination) {

}

module.exports = builder
