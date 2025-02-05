// tip: the cy-grep type definitions in node_modules
// will load cypress type definitions too
/// <reference types="@bahmutov/cy-grep" />

/**
 * The only allowed test tags in this project
 */
type AllowedTag = '@smoke' | '@misc' | '@new-todo'

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
    tags?: AllowedTag | AllowedTag[]
    requiredTags?: AllowedTag | AllowedTag[]
  }

  interface TestConfigOverrides {
    tags?: AllowedTag | AllowedTag[]
    requiredTags?: AllowedTag | AllowedTag[]
  }
}
