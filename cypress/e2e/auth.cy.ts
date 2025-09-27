/**
 * Basic authentication route flow E2E tests.
 * Note: Ensure the dev server is running (pnpm dev) before executing.
 */

describe("Authentication flows", () => {
  it("renders login page on /", () => {
    cy.visit("/");
    cy.contains("jr").should("be.visible");
  });

  it("redirects unauthenticated user from /dashboard/home to /", () => {
    cy.visit("/dashboard/home");
    cy.location("pathname").should("eq", "/");
    cy.contains("jr").should("be.visible");
  });
});