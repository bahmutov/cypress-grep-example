// type definitions for Cypress and
// custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

import { TODO_ITEM_ONE, TODO_ITEM_TWO, getTodos } from './utils'

describe('TodoMVC - React', function () {
  beforeEach(function () {
    // By default Cypress will automatically
    // clear the Local Storage prior to each
    // test which ensures no todos carry over
    // between tests.
    //
    // Go out and visit our local web server
    // before each test, which serves us the
    // TodoMVC App we want to test against
    //
    // We've set our baseUrl to be http://localhost:8888
    // which is automatically prepended to cy.visit
    //
    // https://on.cypress.io/api/visit
    cy.visit('/')
  })

  afterEach(() => {
    // In firefox, blur handlers will fire upon navigation if there is an activeElement.
    // Since todos are updated on blur after editing,
    // this is needed to blur activeElement after each test to prevent state leakage between tests.
    cy.window().then((win) => {
      // @ts-ignore
      win.document.activeElement.blur()
    })
  })

  const getFirstTodo = () => getTodos().eq(0)
  const getSecondTodo = () => getTodos().eq(1)

  context('Persistence', function () {
    it('should persist its data', { tags: '@smoke' }, function () {
      // mimicking TodoMVC tests
      // by writing out this function
      function testState() {
        getFirstTodo()
          .should('contain', TODO_ITEM_ONE)
          .and('have.class', 'completed')

        getSecondTodo()
          .should('contain', TODO_ITEM_TWO)
          .and('not.have.class', 'completed')
      }

      cy.createTodo(TODO_ITEM_ONE)
      cy.createTodo(TODO_ITEM_TWO)
      getFirstTodo()
        .find('.toggle')
        .check()
        .then(testState)

        .reload()
        .then(testState)
    })
  })
})
