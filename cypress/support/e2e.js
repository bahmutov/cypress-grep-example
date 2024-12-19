/// <reference types="cypress" />

// @ts-ignore
require('./commands')

// load and register the grep feature
// https://github.com/bahmutov/cy-grep
// @ts-ignore
require('@bahmutov/cy-grep')()
