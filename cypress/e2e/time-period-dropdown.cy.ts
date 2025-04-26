describe("Time Period Dropdown", () => {
  beforeEach(() => {
    // Mock initial API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      fixture: "articles.json",
    }).as("getArticles");

    cy.visit("/");
    cy.wait("@getArticles");
  });

  it("displays the dropdown", () => {
    cy.get("[data-testid='time-period-dropdown']").should("be.visible");
  });

  it("contains the correct options", () => {
    cy.get("[data-testid='time-period-dropdown'] option").should(
      "have.length",
      3
    );
    cy.get("[data-testid='time-period-dropdown'] option")
      .first()
      .should("have.value", "1");
    cy.get("[data-testid='time-period-dropdown'] option")
      .eq(1)
      .should("have.value", "7");
    cy.get("[data-testid='time-period-dropdown'] option")
      .eq(2)
      .should("have.value", "30");
  });

  it("changes the displayed articles when selecting a different time period", () => {
    // Mock API response for 7-day period
    cy.intercept("GET", "**/mostpopular/v2/viewed/7.json*", {
      fixture: "articles.json",
    }).as("getArticles7Days");

    // Change the time period
    cy.get("[data-testid='time-period-dropdown']").select("7");
    cy.wait("@getArticles7Days");

    // Check that articles are displayed
    cy.get("[data-testid='articles-feed']").should("be.visible");
    cy.get("[data-testid='article-card']").should("have.length.at.least", 1);
  });

  it("shows loading state when changing time period", () => {
    // Mock API response for 30-day period
    cy.intercept("GET", "**/mostpopular/v2/viewed/30.json*", {
      fixture: "articles.json",
      delay: 1000, // Add delay to ensure loading state is visible
    }).as("getArticles30Days");

    cy.get("[data-testid='time-period-dropdown']").select("30");
    cy.get("[data-testid='loading-spinner']").should("be.visible");
    cy.wait("@getArticles30Days");
    cy.get("[data-testid='loading-spinner']").should("not.exist");
  });

  it("preserves selection after page reload", () => {
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

  it("is responsive on different screen sizes", () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("[data-testid='time-period-dropdown']").should("be.visible");

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("[data-testid='time-period-dropdown']").should("be.visible");

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("[data-testid='time-period-dropdown']").should("be.visible");
  });

  it("handles error state when changing time period", () => {
    // Mock error response
    cy.intercept("GET", "**/mostpopular/v2/viewed/30.json*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getArticlesError");

    cy.get("[data-testid='time-period-dropdown']").select("30");
    cy.wait("@getArticlesError");
    cy.get("[data-testid='error-message']").should("be.visible");
  });
});
