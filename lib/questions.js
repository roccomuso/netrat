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
    name: 'v4',
    value: 4
  }, {
    name: 'v5',
    value: 5
  }, {
    name: 'v6',
    value: 6
  }, {
    name: 'v7',
    value: 7
  }, {
    name: 'v8',
    value: 8
  }
]

var questions = [
  {
    type: 'list',
    name: 'os',
    message: 'What\'s the target Platform?',
    choices: PLATFORMS,
    default: findIndex(PLATFORMS, {platform: process.platform}),
    filter: function(val) {
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
    validate: function(value) {
      var valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number
  }, {
    type: 'input',
    name: 'retry',
    message: 'Retry connection time (in seconds)',
    validate: function(value) {
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
    filter: function(val) {
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
  }
]

module.exports = questions
