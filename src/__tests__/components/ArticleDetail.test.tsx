import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { ArticleDetail } from "@/components/Article";
import * as api from "@/services/api";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient for testing
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Don't retry failed queries in tests
      },
    },
  });

// Mock article
const mockArticle = {
  id: "1",
  title: "Test Article",
  byline: "Test Author",
  body: "This is a test article content.",
};

// Create a wrapper component with future flags enabled
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter
    initialEntries={["/article/1"]}
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/article/:id" element={children} />
    </Routes>
  </MemoryRouter>
);

describe("ArticleDetail", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state", async () => {
    vi.spyOn(api, "fetchArticleById").mockImplementation(
      () => new Promise(() => {}) // Pending promise to keep spinner
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <TestWrapper>
          <ArticleDetail />
        </TestWrapper>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("shows error state", async () => {
    vi.spyOn(api, "fetchArticleById").mockRejectedValue(
      new Error("Network Error")
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <TestWrapper>
          <ArticleDetail />
        </TestWrapper>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error loading article/i)).toBeInTheDocument();
    });
  });

  it("shows article content", async () => {
    vi.spyOn(api, "fetchArticleById").mockResolvedValue(mockArticle as any);

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <TestWrapper>
          <ArticleDetail />
        </TestWrapper>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
    });
  });
});
