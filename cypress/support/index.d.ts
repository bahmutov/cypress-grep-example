/// <reference types="cypress" />

/**
 * The only allowed test tags in this project
 * Use an enum to define the allowed tags as strings,
 */
declare enum AllowedTag {
  '@smoke',
  '@misc',
  '@new-todo',
}

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
    tags?: AllowedTag | AllowedTag[]
    /**
     * Required suite test tags
     */
    requiredTags?: AllowedTag | AllowedTag[]
  }

  interface TestConfigOverrides {
    /**
     * Allowed test tags
     */
    tags?: AllowedTag | AllowedTag[]
    /**
     * Required test tags
     */
    requiredTags?: AllowedTag | AllowedTag[]
  }
}
