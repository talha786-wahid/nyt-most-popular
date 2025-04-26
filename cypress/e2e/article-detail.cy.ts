describe("Article Detail Page", () => {
  beforeEach(() => {
    // Mock the initial articles API response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      fixture: "articles.json",
    }).as("getArticles");

    // Visit the home page first
    cy.visit("/");
    cy.wait("@getArticles");

    // Click on the first article to navigate to detail page
    cy.get("[data-testid='article-card-link']").first().click();

    // Verify we're on the article detail page
    cy.url().should("include", "/article/");
  });

  it("displays the article title", () => {
    cy.get("[data-testid='article-title']")
      .should("be.visible")
      .and("contain", "Test Article 1");
  });

  it("displays the article content", () => {
    cy.get("[data-testid='article-content']")
      .should("be.visible")
      .and("contain", "This is a test article abstract 1");
  });

  it("displays the article metadata", () => {
    cy.get("[data-testid='article-metadata']").should("be.visible");
    cy.get("[data-testid='article-byline']")
      .should("be.visible")
      .and("contain", "By Test Author 1");
    cy.get("[data-testid='article-date']").should("be.visible");
  });

  it("displays the article image when available", () => {
    cy.get("[data-testid='article-image']")
      .should("be.visible")
      .and("have.attr", "src", "https://via.placeholder.com/150");
  });

  it("displays a fallback when no image is available", () => {
    // Mock the API response with an article without an image
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      statusCode: 200,
      body: {
        status: "OK",
        results: [
          {
            id: 1,
            title: "Test Article",
            abstract: "This is a test article",
            byline: "Test Author",
            published_date: "2024-01-01",
            url: "https://example.com",
            media: [],
          },
        ],
      },
    }).as("getArticleWithoutImage");

    cy.visit("/");
    cy.wait("@getArticleWithoutImage");
    cy.get("[data-testid='article-card-link']").first().click();

    // Check for the no-image component
    cy.get("[data-testid='no-image-container']").should("be.visible");
  });

  it("navigates back to the articles list when clicking the back button", () => {
    cy.get("a").contains("Back to Articles").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("handles error state gracefully", () => {
    // Mock error response
    cy.intercept("GET", "**/mostpopular/v2/viewed/1.json*", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getArticleError");

    cy.visit("/");
    cy.wait("@getArticleError");
    cy.get("[data-testid='error-message']").should("be.visible");
  });

  it("is responsive on different screen sizes", () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get("[data-testid='article-content']").should("be.visible");

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get("[data-testid='article-content']").should("be.visible");

    // Test desktop layout
    cy.viewport(1024, 768);
    cy.get("[data-testid='article-content']").should("be.visible");
  });
});
