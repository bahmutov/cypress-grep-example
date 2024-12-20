/// <reference types="cypress" />

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
  }

  type TestTag = import('./test-tags').TestTag

  interface SuiteConfigOverrides {
    /**
     * Allowed suite test tags
     */
    tags?: TestTag | TestTag[]
    /**
     * Required suite test tags
     */
    requiredTags?: TestTag | TestTag[]
  }

  interface TestConfigOverrides {
    /**
     * Allowed test tags
     */
    tags?: TestTag | TestTag[]
    /**
     * Required test tags
     */
    requiredTags?: TestTag | TestTag[]
  }
}
