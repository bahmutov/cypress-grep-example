// tip: the cy-grep type definitions in node_modules
// will load cypress type definitions too
/// <reference types="@bahmutov/cy-grep" />
/// <reference path="./node_modules/@bahmutov/cy-grep/src/tags-are-strings.d.ts" />

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
}
