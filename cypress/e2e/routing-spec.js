// type definitions for Cypress and
// custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

import { TODO_ITEM_ONE, TODO_ITEM_THREE } from './utils'

describe('TodoMVC - React', { tags: '@routing' }, function () {
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

  context('Routing', function () {
    // New commands used here:
    // https://on.cypress.io/window
    // https://on.cypress.io/its
    // https://on.cypress.io/invoke
    // https://on.cypress.io/within

    beforeEach(function () {
      cy.createDefaultTodos()
    })

    it('should allow me to display active items', function () {
      cy.getTodos().eq(1).find('.toggle').check()

      cy.get('.filters').contains('Active').click()
      cy.location('hash').should('equal', '#/active')

      cy.getTodos().eq(0).should('contain', TODO_ITEM_ONE)

      cy.getTodos().eq(1).should('contain', TODO_ITEM_THREE)
    })

    it('should respect the back button', { tags: ['@smoke'] }, function () {
      cy.getTodos().eq(1).find('.toggle').check()

      cy.get('.filters').contains('Active').click()

      cy.get('.filters').contains('Completed').click()

      cy.getTodos().should('have.length', 1)
      cy.go('back')
      cy.getTodos().should('have.length', 2)
      cy.go('back')
      cy.getTodos().should('have.length', 3)
    })

    it('should allow me to display completed items', function () {
      cy.getTodos().eq(1).find('.toggle').check()

      cy.get('.filters').contains('Completed').click()

      cy.getTodos().should('have.length', 1)
    })

    it('should allow me to display all items', function () {
      cy.getTodos().eq(1).find('.toggle').check()

      cy.get('.filters').contains('Active').click()

      cy.get('.filters').contains('Completed').click()

      cy.get('.filters').contains('All').click()

      cy.getTodos().should('have.length', 3)
    })

    it('should highlight the currently applied filter', function () {
      // using a within here which will automatically scope
      // nested 'cy' queries to our parent element <ul.filters>
      cy.get('.filters').within(function () {
        cy.contains('All').should('have.class', 'selected')
        cy.contains('Active').click().should('have.class', 'selected')

        cy.contains('Completed').click().should('have.class', 'selected')
      })
    })
  })
})
