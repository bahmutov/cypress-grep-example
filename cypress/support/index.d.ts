/// <reference types="@bahmutov/cy-grep" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Create several Todo items via UI
     * @example
     * cy.createDefaultTodos()
     */
    createDefaultTodos(): Chainable<any>
    /**
     * Creates one Todo using UI
     * @example
     * cy.createTodo('new item')
     */
    createTodo(title: string): Chainable<any>
    /**
     * Returns the todo LI items
     */
    getTodos(): Chainable<JQuery>
  }
}
