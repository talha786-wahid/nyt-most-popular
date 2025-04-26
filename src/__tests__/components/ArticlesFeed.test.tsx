import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/__tests__/setup";
import ArticlesFeed from "@/components/ArticlesFeed";
import type { Article } from "@/types/article";

const mockArticles: Article[] = [
  {
    id: 1,
    title: "Test Article 1",
    abstract: "This is test article 1",
    byline: "By Test Author 1",
    published_date: "2024-01-01",
    url: "https://example.com/1",
    media: [],
  },
  {
    id: 2,
    title: "Test Article 2",
    abstract: "This is test article 2",
    byline: "By Test Author 2",
    published_date: "2024-01-02",
    url: "https://example.com/2",
    media: [],
  },
];

describe("ArticlesFeed", () => {
  it("renders articles in a grid", () => {
    render(<ArticlesFeed articles={mockArticles} />);

    const grid = screen.getByTestId("articles-feed");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "gap-4"
    );

    expect(screen.getByText("Test Article 1")).toBeInTheDocument();
    expect(screen.getByText("Test Article 2")).toBeInTheDocument();
  });

  it("renders empty state when no articles are provided", () => {
    render(<ArticlesFeed articles={[]} />);

    const grid = screen.getByTestId("articles-feed");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveTextContent("No articles found");
    expect(grid).toHaveClass(
      "min-h-[200px]",
      "flex",
      "items-center",
      "justify-center",
      "text-gray-500"
    );
  });

  it("does not render empty state when loading", () => {
    render(<ArticlesFeed articles={[]} isLoading={true} />);

    const grid = screen.getByTestId("articles-feed");
    expect(grid).toBeInTheDocument();
    expect(grid).not.toHaveTextContent("No articles found");
    expect(grid).toHaveClass(
      "grid",
      "grid-cols-1",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "gap-4"
    );
  });
});
