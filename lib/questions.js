'use strict'
const semver = require('semver')
const findIndex = require('lodash.findindex')

const PLATFORMS = [
  {
    name: 'Windows',
    value: 'win',
    platform: 'win32'
  }, {
    name: 'Mac',
    value: 'macos',
    platform: 'darwin'
  }, {
    name: 'Linux',
    value: 'linux',
    platform: 'linux'
  }
]
const ARCHS = ['x64', 'x86', 'armv6', 'armv7']
const NODE_VERS = [
  {
    name: 'v8',
    value: 8
  }, {
    name: 'v9',
    value: 9
  }, {
    name: 'v10',
    value: 10
  }, {
    name: 'v11',
    value: 11
  }, {
    name: 'v12',
    value: 12
  }
]

var questions = [
  {
    type: 'list',
    name: 'os',
    message: 'What\'s the target Platform?',
    choices: PLATFORMS,
    default: findIndex(PLATFORMS, {platform: process.platform}),
    filter: function (val) {
      return val.toLowerCase()
    }
  }, {
    type: 'input',
    name: 'rhost',
    message: 'What\'s the remote host?'
  }, {
    type: 'input',
    name: 'rport',
    message: 'What\'s the remote port?',
    validate: function (value) {
      var valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number
  }, {
    type: 'input',
    name: 'retry',
    message: 'Retry connection time (in seconds)',
    validate: function (value) {
      var valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number
  }, {
    type: 'list',
    name: 'architecture',
    message: 'What\'s the target Architecture?',
    choices: ARCHS,
    default: ARCHS.indexOf(process.arch),
    filter: function (val) {
      return val.toLowerCase()
    }
  }, {
    type: 'list',
    name: 'nodeVersion',
    message: 'Pick a Node.js version',
    choices: NODE_VERS,
    default: findIndex(NODE_VERS, {
      value: semver.major(process.version)
    }),
    filter: Number
  }, {
    type: 'confirm',
    name: 'compression',
    message: 'Compress executable with UPX?',
    default: true
  }
]

module.exports = questions
