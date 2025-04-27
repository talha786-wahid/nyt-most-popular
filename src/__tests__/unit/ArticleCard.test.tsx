import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { ArticleCard } from "@/components/Article";
import type { Article } from "@/types/article";
import { render } from "@/__tests__/setup";

const mockArticle: Article = {
  id: 1,
  title: "Test Article",
  abstract: "This is a test article abstract",
  url: "https://example.com",
  published_date: "2024-01-01",
  byline: "By Test Author",
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

const mockArticleWithoutImage: Article = {
  ...mockArticle,
  media: [],
};

describe("ArticleCard", () => {
  it("renders article information correctly", () => {
    render(<ArticleCard article={mockArticle} />);

    const card = screen.getByTestId("article-card");
    expect(card).toBeInTheDocument();

    const title = screen.getByTestId("article-title");
    expect(title).toHaveTextContent(mockArticle.title);

    const abstract = screen.getByTestId("article-abstract");
    expect(abstract).toHaveTextContent(mockArticle.abstract);

    const byline = screen.getByTestId("article-byline");
    expect(byline).toHaveTextContent(mockArticle.byline);

    const date = screen.getByTestId("article-date");
    expect(date).toBeInTheDocument();
  });

  it("renders image when available", () => {
    render(<ArticleCard article={mockArticle} />);

    const image = screen.getByTestId("article-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", mockArticle.title);
  });

  it("renders NoImage component when no image is available", () => {
    render(<ArticleCard article={mockArticleWithoutImage} />);

    const noImageContainer = screen.getByTestId("no-image-container");
    expect(noImageContainer).toBeInTheDocument();
    expect(noImageContainer).toHaveTextContent("No Image Available");
  });

  it("renders correct link href", () => {
    render(<ArticleCard article={mockArticle} />);

    const link = screen.getByTestId("article-card-link");
    expect(link).toHaveAttribute("href", `/article/${mockArticle.id}`);
  });
});
