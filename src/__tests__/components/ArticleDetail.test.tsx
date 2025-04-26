import { screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { render } from "../../__tests__/setup";
import ArticleDetail from "../../components/ArticleDetail";
import * as api from "../../services/api";
import type { Article } from "../../types/article";
const mockArticle = {
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

describe("ArticleDetail", () => {
  it("shows loading state", async () => {
    vi.spyOn(api, "fetchArticleById").mockReturnValue(new Promise(() => {}));
    render(<ArticleDetail />, { route: "/article/1" });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows error state", async () => {
    vi.spyOn(api, "fetchArticleById").mockRejectedValue({
      message: "Failed to fetch",
    });
    render(<ArticleDetail />, { route: "/article/1" });
    await waitFor(() => {
      expect(screen.getByText(/error loading article/i)).toBeInTheDocument();
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it("shows not found state", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue({} as Article);
    render(<ArticleDetail />, { route: "/article/999" });
    await waitFor(() => {
      expect(screen.getByText(/article not found/i)).toBeInTheDocument();
    });
  });

  it("shows article content", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue(mockArticle);
    render(<ArticleDetail />, { route: "/article/1" });
    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
      expect(screen.getByText("1/1/2024")).toBeInTheDocument();
      expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
    });
  });
});
