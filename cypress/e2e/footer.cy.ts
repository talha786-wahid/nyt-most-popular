describe("Footer Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the footer", () => {
    cy.get("footer").should("be.visible");
  });

  it("contains copyright information", () => {
    cy.get("footer").should("contain", "©");
    cy.get("footer").should("contain", new Date().getFullYear().toString());
  });

  it("contains links to external resources", () => {
    cy.get("footer a").should("have.length.at.least", 1);
  });

  it("opens external links in a new tab", () => {
    cy.get("footer a").first().should("have.attr", "target", "_blank");
    cy.get("footer a")
      .first()
      .should("have.attr", "rel", "noopener noreferrer");
  });

  it("applies correct styles to the footer", () => {
    cy.get("footer").should("have.class", "bg-gray-50");
    cy.get("footer").should("have.class", "border-t");
  });

  it("is responsive on different screen sizes", () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("footer").should("be.visible");

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("footer").should("be.visible");

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("footer").should("be.visible");
  });
});
