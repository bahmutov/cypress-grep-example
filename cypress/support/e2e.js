/// <reference types="cypress" />

require('./commands')

// load and register the grep feature
// https://github.com/bahmutov/cy-grep
require('@bahmutov/cy-grep')()

// https://github.com/dennisbergevin/cypress-plugin-grep-boxes
const {
  greppedTestToggle,
  addGrepButtons,
} = require('cypress-plugin-grep-boxes')
greppedTestToggle()
addGrepButtons()
