import { render, screen } from "@testing-library/react";
import { ArticleCard } from "../../components/ArticleCard";
import type { Article } from "../../types/article";

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

describe("ArticleCard", () => {
  it("renders article information correctly", () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
    expect(screen.getByText("1/1/2024")).toBeInTheDocument();
    expect(screen.getByAltText(mockArticle.title)).toBeInTheDocument();
  });

  it("links to the correct article URL", () => {
    render(<ArticleCard article={mockArticle} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/article/${mockArticle.id}`);
  });
});
