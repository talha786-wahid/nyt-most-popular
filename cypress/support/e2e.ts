import "@testing-library/cypress/add-commands";
import "./commands";

Cypress.on("uncaught:exception", (err) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
