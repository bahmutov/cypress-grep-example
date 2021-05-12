/// <reference types="cypress" />

declare namespace Cypress {
  // specify additional properties in the TestConfig object
  // in our case we will add "tags" property
  interface TestConfigOverrides {
    /**
     * List of tags for this test
     * @example a single tag
     *  it('logs in', { tags: '@smoke' }, () => { ... })
     * @example multiple tags
     *  it('works', { tags: ['@smoke', '@slow'] }, () => { ... })
     */
    tags: string | string[]
  }

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
  }
}
