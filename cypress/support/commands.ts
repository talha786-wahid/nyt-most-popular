declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("getByTestId", (selector) => {
  return cy.get(`[data-testid=${selector}]`);
});
