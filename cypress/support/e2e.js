/// <reference types="cypress" />

require('./commands')

// register @bahmutov/cy-grep
const registerCypressGrep = require('@bahmutov/cy-grep')
registerCypressGrep()
