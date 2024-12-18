/// <reference types="cypress" />

/**
 * The only allowed test tags in this project
 */
type AllowedTag = '@smoke' | '@misc' | '@new-todo'
type TestTags = AllowedTag | AllowedTag[]

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

  interface SuiteConfigOverrides {
    /**
     * Allowed suite test tags
     */
    tags?: TestTags
    /**
     * Required suite test tags
     */
    requiredTags?: TestTags
  }

  interface TestConfigOverrides {
    /**
     * Allowed test tags
     */
    tags?: TestTags
    /**
     * Required test tags
     */
    requiredTags?: TestTags
  }
}
