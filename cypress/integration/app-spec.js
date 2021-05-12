// type definitions for Cypress and
// custom commands like "createDefaultTodos"
/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

import { TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE } from './utils'

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

  // a very simple example helpful during presentations
  it('adds 2 todos', { tags: '@smoke' }, function () {
    cy.get('.new-todo').type('learn testing{enter}').type('be cool{enter}')

    cy.get('.todo-list li').should('have.length', 2)
  })

  context('When page is initially opened', function () {
    it('should focus on the todo input field', function () {
      // get the currently focused element and assert
      // that it has class='new-todo'
      //
      // http://on.cypress.io/focused
      cy.focused().should('have.class', 'new-todo')
    })
  })

  context('No Todos', function () {
    it('should hide #main and #footer', function () {
      // Unlike the TodoMVC tests, we don't need to create
      // a gazillion helper functions which are difficult to
      // parse through. Instead we'll opt to use real selectors
      // so as to make our testing intentions as clear as possible.
      //
      // http://on.cypress.io/get
      cy.get('.todo-list li').should('not.exist')
      cy.get('.main').should('not.exist')
      cy.get('.footer').should('not.exist')
    })
  })

  context('New Todo', function () {
    // New commands used here:
    // https://on.cypress.io/type
    // https://on.cypress.io/eq
    // https://on.cypress.io/find
    // https://on.cypress.io/contains
    // https://on.cypress.io/should
    // https://on.cypress.io/as

    it('should allow me to add todo items', function () {
      // create 1st todo
      cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')

      // make sure the 1st label contains the 1st todo text
      cy.get('.todo-list li')
        .eq(0)
        .find('label')
        .should('contain', TODO_ITEM_ONE)

      // create 2nd todo
      cy.get('.new-todo').type(TODO_ITEM_TWO).type('{enter}')

      // make sure the 2nd label contains the 2nd todo text
      cy.get('.todo-list li')
        .eq(1)
        .find('label')
        .should('contain', TODO_ITEM_TWO)
    })

    it('adds items', function () {
      // create several todos then check the number of items in the list
      cy.get('.new-todo')
        .type('todo A{enter}')
        .type('todo B{enter}') // we can continue working with same element
        .type('todo C{enter}') // and keep adding new items
        .type('todo D{enter}')

      cy.get('.todo-list li').should('have.length', 4)
    })

    it('should clear text input field when an item is added', function () {
      cy.get('.new-todo').type(TODO_ITEM_ONE).type('{enter}')

      cy.get('.new-todo').should('have.text', '')
    })

    it('should append new items to the bottom of the list', function () {
      // this is an example of a custom command
      // defined in cypress/support/commands.js
      cy.createDefaultTodos().as('todos')

      // even though the text content is split across
      // multiple <span> and <strong> elements
      // `cy.contains` can verify this correctly
      cy.get('.todo-count').contains('3 items left')

      cy.get('@todos').eq(0).find('label').should('contain', TODO_ITEM_ONE)

      cy.get('@todos').eq(1).find('label').should('contain', TODO_ITEM_TWO)

      cy.get('@todos').eq(2).find('label').should('contain', TODO_ITEM_THREE)
    })

    it('should trim text input', function () {
      // this is an example of another custom command
      // since we repeat the todo creation over and over
      // again. It's up to you to decide when to abstract
      // repetitive behavior and roll that up into a custom
      // command vs explicitly writing the code.
      cy.createTodo(`    ${TODO_ITEM_ONE}    `)

      // we use as explicit assertion here about the text instead of
      // using 'contain' so we can specify the exact text of the element
      // does not have any whitespace around it
      cy.get('.todo-list li').eq(0).should('have.text', TODO_ITEM_ONE)
    })

    it('should show #main and #footer when items added', function () {
      cy.createTodo(TODO_ITEM_ONE)
      cy.get('.main').should('be.visible')
      cy.get('.footer').should('be.visible')
    })
  })

  context('Mark all as completed', function () {
    // New commands used here:
    // - cy.check    https://on.cypress.io/api/check
    // - cy.uncheck  https://on.cypress.io/api/uncheck

    beforeEach(function () {
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as('todos')
    })

    it('should allow me to mark all items as completed', function () {
      // complete all todos
      // we use 'check' instead of 'click'
      // because that indicates our intention much clearer
      cy.get('.toggle-all').check()

      // get each todo li and ensure its class is 'completed'
      cy.get('@todos').eq(0).should('have.class', 'completed')

      cy.get('@todos').eq(1).should('have.class', 'completed')

      cy.get('@todos').eq(2).should('have.class', 'completed')
    })

    it('should allow me to clear the complete state of all items', function () {
      // check and then immediately uncheck
      cy.get('.toggle-all').check().uncheck()

      cy.get('@todos').eq(0).should('not.have.class', 'completed')

      cy.get('@todos').eq(1).should('not.have.class', 'completed')

      cy.get('@todos').eq(2).should('not.have.class', 'completed')
    })

    it('complete all checkbox should update state when items are completed / cleared', function () {
      // alias the .toggle-all for reuse later
      cy.get('.toggle-all')
        .as('toggleAll')
        .check()
        // this assertion is silly here IMO but
        // it is what TodoMVC does
        .should('be.checked')

      // alias the first todo and then click it
      cy.get('.todo-list li').eq(0).as('firstTodo').find('.toggle').uncheck()

      // reference the .toggle-all element again
      // and make sure its not checked
      cy.get('@toggleAll').should('not.be.checked')

      // reference the first todo again and now toggle it
      cy.get('@firstTodo').find('.toggle').check()

      // assert the toggle all is checked again
      cy.get('@toggleAll').should('be.checked')
    })
  })

  context('Item', function () {
    // New commands used here:
    // - cy.clear    https://on.cypress.io/api/clear

    it('should allow me to mark items as complete', function () {
      // we are aliasing the return value of
      // our custom command 'createTodo'
      //
      // the return value is the <li> in the <ul.todos-list>
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()

      cy.get('@firstTodo').should('have.class', 'completed')

      cy.get('@secondTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').find('.toggle').check()

      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('have.class', 'completed')
    })

    it('should allow me to un-mark items as complete', function () {
      cy.createTodo(TODO_ITEM_ONE).as('firstTodo')
      cy.createTodo(TODO_ITEM_TWO).as('secondTodo')

      cy.get('@firstTodo').find('.toggle').check()

      cy.get('@firstTodo').should('have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')

      cy.get('@firstTodo').find('.toggle').uncheck()

      cy.get('@firstTodo').should('not.have.class', 'completed')
      cy.get('@secondTodo').should('not.have.class', 'completed')
    })

    it('should allow me to edit an item', function () {
      cy.createDefaultTodos().as('todos')

      cy.get('@todos')
        .eq(1)
        .as('secondTodo')
        // TODO: fix this, dblclick should
        // have been issued to label
        .find('label')
        .dblclick()

      // clear out the inputs current value
      // and type a new value
      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('buy some sausages')
        .type('{enter}')

      // explicitly assert about the text value
      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)

      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
  })

  context('Editing', function () {
    // New commands used here:
    // - cy.blur    https://on.cypress.io/api/blur

    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('should hide other controls when editing', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.toggle').should('not.be.visible')

      cy.get('@secondTodo').find('label').should('not.be.visible')
    })

    it('should save edits on blur', { tags: '@smoke' }, function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('buy some sausages')
        // we can just send the blur event directly
        // to the input instead of having to click
        // on another button on the page. though you
        // could do that its just more mental work
        .blur()

      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)

      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })

    it('should trim entered text', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo')
        .find('.edit')
        .clear()
        .type('    buy some sausages    ')
        .type('{enter}')

      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)

      cy.get('@secondTodo').should('contain', 'buy some sausages')
      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })

    it('should remove the item if an empty text string was entered', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.edit').clear().type('{enter}')

      cy.get('@todos').should('have.length', 2)
    })

    it('should cancel edits on escape', function () {
      cy.get('@todos').eq(1).as('secondTodo').find('label').dblclick()

      cy.get('@secondTodo').find('.edit').clear().type('foo{esc}')

      cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)

      cy.get('@todos').eq(1).should('contain', TODO_ITEM_TWO)

      cy.get('@todos').eq(2).should('contain', TODO_ITEM_THREE)
    })
  })

  context('Clear completed button', function () {
    beforeEach(function () {
      cy.createDefaultTodos().as('todos')
    })

    it('should display the correct text', function () {
      cy.get('@todos').eq(0).find('.toggle').check()

      cy.get('.clear-completed').contains('Clear completed')
    })

    it(
      'should remove completed items when clicked',
      { tags: '@smoke' },
      function () {
        cy.get('@todos').eq(1).find('.toggle').check()

        cy.get('.clear-completed').click()
        cy.get('@todos').should('have.length', 2)
        cy.get('@todos').eq(0).should('contain', TODO_ITEM_ONE)

        cy.get('@todos').eq(1).should('contain', TODO_ITEM_THREE)
      },
    )

    it('should be hidden when there are no items that are completed', function () {
      cy.get('@todos').eq(1).find('.toggle').check()

      cy.get('.clear-completed').should('be.visible').click()

      cy.get('.clear-completed').should('not.exist')
    })
  })
})
