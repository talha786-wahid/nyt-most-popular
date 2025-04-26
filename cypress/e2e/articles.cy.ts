describe("Articles Page", () => {
  beforeEach(() => {
    // Mock initial API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      fixture: "articles.json",
    }).as("getArticles");

    cy.visit("/");
  });

  it("displays the header with correct title", () => {
    cy.wait("@getArticles");
    cy.get("header").should("be.visible");
    cy.get("header span.text-2xl").should("contain", "NY Times");
    cy.get("header span.text-sm").should("contain", "Most Popular");
  });

  it("shows loading state initially", () => {
    // Mock delayed API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", (req) => {
      req.reply({
        fixture: "articles.json",
        delay: 1000,
      });
    }).as("getArticlesDelayed");

    cy.visit("/");
    cy.get("[data-testid='loading-spinner']").should("be.visible");
    cy.wait("@getArticlesDelayed");
  });

  it("displays articles after loading", () => {
    cy.wait("@getArticles");
    cy.get("[data-testid='loading-spinner']").should("not.exist");
    cy.get("[data-testid='articles-feed']").should("be.visible");
    cy.get("[data-testid='article-card-link']").should(
      "have.length.at.least",
      1
    );
  });

  it("allows filtering articles by time period", () => {
    // Mock API response for 7-day period
    cy.intercept("GET", "**/mostpopular/v2/viewed/7.json*", {
      fixture: "articles.json",
    }).as("getArticles7Days");

    // Mock API response for 30-day period
    cy.intercept("GET", "**/mostpopular/v2/viewed/30.json*", {
      fixture: "articles.json",
    }).as("getArticles30Days");

    // Test each time period option
    cy.get("[data-testid='time-period-dropdown']").select("7");
    cy.wait("@getArticles7Days");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);

    cy.get("[data-testid='time-period-dropdown']").select("30");
    cy.wait("@getArticles30Days");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);
  });

  it("navigates to article detail when clicking on an article", () => {
    cy.get("[data-testid='loading-spinner']").should("not.exist");
    cy.get("[data-testid='article-card-link']").first().click();
    cy.url().should("include", "/article/");
  });

  it("handles error state gracefully", () => {
    // Mock error response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getArticlesError");

    cy.visit("/");
    cy.wait("@getArticlesError");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("handles empty state when no articles are returned", () => {
    // Mock empty response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      statusCode: 200,
      body: {
        status: "OK",
        results: [],
      },
    }).as("getEmptyArticles");

    cy.visit("/");
    cy.wait("@getEmptyArticles");
    cy.get("[data-testid='articles-feed']").should(
      "contain",
      "No articles found"
    );
  });

  it("maintains responsive layout on different screen sizes", () => {
    cy.get("[data-testid='loading-spinner']").should("not.exist");

    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("[data-testid='articles-feed']").should("be.visible");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("[data-testid='articles-feed']").should("be.visible");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("[data-testid='articles-feed']").should("be.visible");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);
  });

  it("handles network timeout gracefully", () => {
    // Mock timeout response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      forceNetworkError: true,
    }).as("getArticlesTimeout");

    cy.visit("/");
    cy.wait("@getArticlesTimeout");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("preserves time period selection after page reload", () => {
    // Mock API response for 7-day period
    cy.intercept("GET", "**/mostpopular/v2/viewed/7.json*", {
      fixture: "articles.json",
    }).as("getArticles7Days");

    // Select a time period
    cy.get("[data-testid='time-period-dropdown']").select("7");
    cy.wait("@getArticles7Days");

    // Mock API response for reload
    cy.intercept("GET", "**/mostpopular/v2/viewed/7.json*", {
      fixture: "articles.json",
    }).as("getArticles7DaysReload");

    // Reload the page
    cy.reload();
    cy.wait("@getArticles7DaysReload");

    // Verify the selection is preserved
    cy.get("[data-testid='time-period-dropdown']").should("have.value", "7");
  });
});
