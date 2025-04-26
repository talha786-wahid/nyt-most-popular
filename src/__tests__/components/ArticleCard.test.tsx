import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { render } from "../../__tests__/setup";
import { ArticleCard } from "../../components/ArticleCard";
import type { Article } from "../../types/article";

const mockArticle: Article = {
  id: 1,
  title: "Test Article",
  abstract: "This is a test article",
  byline: "Test Author",
  published_date: "2024-01-01",
  url: "https://example.com",
  media: [],
};

describe("ArticleCard", () => {
  it("renders article card with correct content", () => {
    render(<ArticleCard article={mockArticle} />);

    const cardLink = screen.getByTestId("article-card-link");
    expect(cardLink).toBeInTheDocument();
    expect(cardLink).toHaveClass(
      "flex",
      "flex-col",
      "h-full",
      "w-full",
      "bg-white",
      "border-0",
      "rounded-xl",
      "shadow-md",
      "hover:shadow-lg",
      "transition-shadow",
      "cursor-pointer"
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("This is a test article")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("1/1/2024")).toBeInTheDocument();
  });

  it("renders article link with correct attributes", () => {
    render(<ArticleCard article={mockArticle} />);

    const link = screen.getByTestId("article-card-link");
    expect(link).toHaveAttribute("href", "/article/1");
  });

  it("renders article image when available", () => {
    const articleWithImage: Article = {
      ...mockArticle,
      media: [
        {
          type: "image",
          subtype: "photo",
          caption: "Test caption",
          copyright: "Test copyright",
          "media-metadata": [
            {
              url: "https://example.com/image.jpg",
              format: "Standard Thumbnail",
              height: 75,
              width: 75,
            },
          ],
        },
      ],
    };

    render(<ArticleCard article={articleWithImage} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", "Test Article");
  });

  it("renders NoImage component when no image is available", () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTestId("no-image-container")).toBeInTheDocument();
  });
});
