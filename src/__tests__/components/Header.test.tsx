import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { render } from "../../__tests__/setup";
import { Header } from "../../components/Header";

describe("Header", () => {
  it("renders with correct structure", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("bg-white", "border-b", "border-gray-200");
  });

  it("renders NY Times logo and title", () => {
    render(<Header />);

    const nyTimesElements = screen.getAllByText("NY Times");
    expect(nyTimesElements).toHaveLength(2);
    expect(nyTimesElements[0]).toHaveClass(
      "text-2xl",
      "font-bold",
      "text-gray-900"
    );
    expect(nyTimesElements[1]).toHaveClass("text-gray-600");
  });

  it("renders external links", () => {
    render(<Header />);

    const apiDocsLink = screen.getByText("API Docs");
    expect(apiDocsLink).toHaveAttribute(
      "href",
      "https://developer.nytimes.com"
    );
    expect(apiDocsLink).toHaveAttribute("target", "_blank");
    expect(apiDocsLink).toHaveAttribute("rel", "noopener noreferrer");

    const nyTimesLinks = screen.getAllByText("NY Times");
    const externalNyTimesLink = nyTimesLinks.find(
      (link) => link.getAttribute("href") === "https://www.nytimes.com"
    );
    expect(externalNyTimesLink).toBeInTheDocument();
    expect(externalNyTimesLink).toHaveAttribute("target", "_blank");
    expect(externalNyTimesLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies correct hover styles to external links", () => {
    render(<Header />);

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    externalLinks.forEach((link) => {
      expect(link).toHaveClass(
        "text-gray-600 hover:text-blue-600 transition-colors"
      );
    });
  });
});
