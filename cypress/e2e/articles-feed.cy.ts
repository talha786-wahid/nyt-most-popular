describe("Articles Feed", () => {
  beforeEach(() => {
    // Mock the API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      fixture: "articles.json",
    }).as("getArticles");

    cy.visit("/");
    cy.wait("@getArticles");
  });

  it("should display articles in a grid layout", () => {
    cy.get("[data-testid='articles-feed']")
      .should("be.visible")
      .and("have.class", "grid");

    // Check for grid columns
    cy.get("[data-testid='articles-feed']")
      .should("have.class", "grid-cols-1")
      .and("have.class", "sm:grid-cols-2")
      .and("have.class", "md:grid-cols-3");
  });

  it("should navigate to article details when clicking an article", () => {
    // Mock the article detail API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      fixture: "articles.json",
    }).as("getArticleDetail");

    cy.get("[data-testid='article-card-link']").first().click();
    cy.url().should("include", "/article/");
    cy.wait("@getArticleDetail");
  });

  it("should display article information correctly", () => {
    cy.get("[data-testid='article-card']")
      .first()
      .within(() => {
        // Check title
        cy.get("[data-testid='article-title']")
          .should("be.visible")
          .and("contain", "Test Article 1");

        // Check abstract
        cy.get("[data-testid='article-abstract']")
          .should("be.visible")
          .and("contain", "This is a test article abstract 1");

        // Check byline
        cy.get("[data-testid='article-byline']")
          .should("be.visible")
          .and("contain", "By Test Author 1");

        // Check date
        cy.get("[data-testid='article-date']")
          .should("be.visible")
          .invoke("text")
          .should("match", /\d{1,2}\/\d{1,2}\/\d{4}/); // Match date format MM/DD/YYYY

        // Check image
        cy.get("[data-testid='article-image']")
          .should("be.visible")
          .and("have.attr", "src", "https://via.placeholder.com/150");
      });
  });

  it("should handle empty state", () => {
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

  it("should handle error state", () => {
    // Mock error response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getArticlesError");

    cy.visit("/");
    cy.wait("@getArticlesError");

    cy.get("[data-testid='error-message']").should("be.visible");
  });
});
