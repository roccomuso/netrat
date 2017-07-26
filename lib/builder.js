const debug = require('debug')('netrat')
const path = require('path')
const os = require('os')
const fs = require('fs')
const boxen = require('boxen')
const exec = require('pkg').exec
const Mustache = require('mustache')
const SEED_PATH = path.join(__dirname, 'seed', 'shell.mustache')
var OUT_NAME = 'netrat'

function builder (opts, destination) {
  // options: {os, rhost, rport, retry, architecture, nodeVersion}
  var stubPath = genStubFromTemplate(SEED_PATH, opts)

  OUT_NAME += (opts.os === 'win') ? '.exe' : ''
  var pkgArgs = ['--target', `node${opts.nodeVersion}-${opts.os}-${opts.architecture}`, '--output', path.join(destination, OUT_NAME)]
  debug('pkg params:', pkgArgs.join(' '))
  startPkg(stubPath, pkgArgs)
}

function startPkg (stubPath, args) {
  debug('starting pkg build')
  var input = [stubPath].concat(args)
  exec(input).then(success).catch(fail)
}

function genStubFromTemplate (seedPath, opts) {
  debug('generating stub')
  var seed = fs.readFileSync(seedPath).toString()
  var file = Mustache.render(seed, opts)
  var outPath = path.join(seedPath, '../netrat-shell.js')
  fs.writeFileSync(outPath, file)
  // return path
  return outPath
}

function success (out) {
  debug('pkg build success')
  if (out) console.log(out)
  console.log(boxen('\u2714 Build succeed!', {padding: 1, margin: 1, align: 'center', borderColor: 'green'}))
}

function fail (err) {
  debug('pkg build failed', err || '')
  console.log(boxen('\u274c Build failed!', {padding: 1, margin: 1, align: 'center', borderColor: 'red'}))
}

module.exports = builder
