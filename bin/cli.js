#!/usr/bin/env node
'use strict'
const debug = require('debug')('netrat')
const inquirer = require('inquirer')
const questions = require('../lib/questions')
const builder = require('../lib/builder')
const LOGO = require('../other/logo.js')

console.log(LOGO)

inquirer.prompt(questions).then(function (answers) {
  debug('\nOutput receipt:')
  debug(JSON.stringify(answers, null, 2))
  builder(answers, process.cwd())
})
