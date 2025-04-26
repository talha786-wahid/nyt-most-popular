describe("Articles Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the header with correct title", () => {
    cy.get("header").should("be.visible");
    cy.get("h1").should("contain", "NY Times Most Popular Articles");
  });

  it("shows loading state initially", () => {
    cy.get("[data-testid='loading-spinner']").should("be.visible");
  });

  it("displays articles after loading", () => {
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);
  });

  it("allows filtering articles by time period", () => {
    cy.get("[data-testid='time-period-dropdown']").should("be.visible");

    // Test each time period option
    ["1", "7", "30"].forEach((days) => {
      cy.get("[data-testid='time-period-dropdown']").select(days);
      cy.get("[data-testid='loading-spinner']").should("be.visible");
      cy.get("[data-testid='article-card']").should("have.length.at.least", 1);
    });
  });

  it("navigates to article detail when clicking on an article", () => {
    cy.get("[data-testid='article-card']").first().click();
    cy.url().should("include", "/article/");
  });

  it("handles error state gracefully", () => {
    // Intercept the API call and force an error
    cy.intercept("GET", "**/mostpopular/v2/viewed/**", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getArticlesError");

    cy.visit("/");
    cy.wait("@getArticlesError");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("handles empty state when no articles are returned", () => {
    // Intercept the API call and return empty results
    cy.intercept("GET", "**/mostpopular/v2/viewed/**", {
      statusCode: 200,
      body: { results: [] },
    }).as("getEmptyArticles");

    cy.visit("/");
    cy.wait("@getEmptyArticles");
    cy.get("[data-testid='no-articles-message']").should("be.visible");
  });

  it("maintains responsive layout on different screen sizes", () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("[data-testid='article-card']").should("have.css", "width", "100%");

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("[data-testid='article-card']").should(
      "have.css",
      "width",
      "calc(50% - 12px)"
    );

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("[data-testid='article-card']").should(
      "have.css",
      "width",
      "calc(33.3333% - 12px)"
    );
  });

  it("handles network timeout gracefully", () => {
    // Intercept the API call and force a timeout
    cy.intercept("GET", "**/mostpopular/v2/viewed/**", {
      forceNetworkError: true,
    }).as("getArticlesTimeout");

    cy.visit("/");
    cy.wait("@getArticlesTimeout");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("preserves time period selection after page reload", () => {
    // Select a time period
    cy.get("[data-testid='time-period-dropdown']").select("7");

    // Reload the page
    cy.reload();

    // Verify the selection is preserved
    cy.get("[data-testid='time-period-dropdown']").should("have.value", "7");
  });
});
