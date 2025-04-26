describe("Header Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the NY Times logo", () => {
    cy.get("header img[alt='NY Times Logo']").should("be.visible");
  });

  it("displays the correct title", () => {
    cy.get("header span.text-2xl").should("contain", "NY Times");
    cy.get("header span.text-sm").should("contain", "Most Popular");
  });

  it("contains navigation links", () => {
    cy.get("header nav").should("be.visible");
    cy.get("header nav a").should("have.length.at.least", 1);
  });

  it("navigates to the home page when clicking the logo", () => {
    cy.get("header a[href='/']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("applies correct styles to the header", () => {
    cy.get("header").should("have.class", "bg-white");
    cy.get("header").should("have.class", "border-b");
  });

  it("is responsive on different screen sizes", () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("header").should("be.visible");
    cy.get("header span.text-2xl").should("be.visible");

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("header").should("be.visible");
    cy.get("header span.text-2xl").should("be.visible");

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("header").should("be.visible");
    cy.get("header span.text-2xl").should("be.visible");
  });
});
