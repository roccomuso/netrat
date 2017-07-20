const debug = require('debug')('netrat')
const spawn = require('child_process').spawn
const path = require('path')
const rootDir = path.join(__dirname, '../')
const which = require('npm-which')(rootDir)

const pathToPkg = which.sync('pkg')
debug('pkg found in', pathToPkg)

function builder (opt, destination) {
  // options: {os, rhost, rport, retry, architecture, nodeVersion}
  var pkgArgs = `-t node${opt.nodeVersion}-${opt.os}-${opt.architecture}`
  startPkg(pkgArgs)
}

function startPkg (args) {
  var sh = spawn(pathToPkg, args)

  sh.stdout.pipe(process.stdout)
  sh.on('exit', function (code, signal) {
    debug('pkg exit with', code, signal)
    // TODO: boxen: success or fail

  })
}

module.exports = builder
