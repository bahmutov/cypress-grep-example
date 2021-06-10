/// <reference types="../support" />

// check this file using TypeScript if available
// @ts-check

it('prints the page to PDF', { browser: '!firefox' }, () => {
  cy.visit('/')
  cy.get('.new-todo')
    .type('write Cypress tests{enter}')
    .type('use Cypress.automation{enter}')
    .type('???{enter}')
    .type('Profit!{enter}')

  cy.get('.todo-list li')
    .should('have.length', 4)
    .then(() => {
      // print the application to PDF
      // https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF
      return Cypress.automation('remote:debugger:protocol', {
        command: 'Page.printToPDF',
        params: {
          transferMode: 'ReturnAsBase64',
        },
      })
    })
})
