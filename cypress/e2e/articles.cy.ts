describe("Articles Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the page title", () => {
    cy.get("h1").should("contain", "Most Popular Articles");
  });

  it("shows time period filters", () => {
    cy.get("button").should("have.length", 3);
    cy.get("button").first().should("contain", "1 Day");
    cy.get("button").last().should("contain", "30 Days");
  });

  it("loads and displays articles", () => {
    cy.get('[data-testid="article-card"]').should("exist");
    cy.get('[data-testid="article-card"]').should("have.length.greaterThan", 0);
  });

  it("changes time period when filter is clicked", () => {
    cy.get("button").contains("7 Days").click();
    cy.get("button").contains("7 Days").should("have.class", "bg-blue-500");
  });
});
