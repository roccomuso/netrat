#!/usr/bin/env node
'use strict'
const inquirer = require('inquirer')
const questions = require('../lib/questions')


inquirer.prompt(questions).then(function (answers) {
  console.log('\nOutput receipt:');
  console.log(JSON.stringify(answers, null, '  '));
});
