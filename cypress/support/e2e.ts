/**
 * Cypress E2E support file.
 * Registers mochawesome and sets up global hooks.
 */
import "cypress-mochawesome-reporter/register";

beforeEach(() => {
  // Clear session state before each test
  cy.clearCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});