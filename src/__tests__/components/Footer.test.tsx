import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../../components/Footer";

describe("Footer", () => {
  it("renders correctly", () => {
    render(<Footer />);

    // Check for container classes
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-gray-50", "border-t");

    // Check for about section
    const aboutHeading = screen.getByRole("heading", { name: "About" });
    expect(aboutHeading).toBeInTheDocument();

    // Check for links section
    const linksHeading = screen.getByRole("heading", { name: "Links" });
    expect(linksHeading).toBeInTheDocument();

    // Check for legal section
    const legalHeading = screen.getByRole("heading", { name: "Legal" });
    expect(legalHeading).toBeInTheDocument();

    // Check for copyright text
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} NY Times Most Popular. All rights reserved.`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("renders with correct structure", () => {
    const { container } = render(<Footer />);
    const footer = container.firstChild;
    expect(footer).toHaveClass("bg-gray-50", "border-t");
  });

  it("renders the about section", () => {
    render(<Footer />);
    const aboutText = screen.getByText(
      /This application displays the most popular articles/i
    );
    expect(aboutText).toBeInTheDocument();
  });

  it("renders the links section", () => {
    render(<Footer />);
    const apiLink = screen.getByRole("link", { name: "NY Times API" });
    expect(apiLink).toHaveAttribute("href", "https://developer.nytimes.com");

    const websiteLink = screen.getByRole("link", { name: "NY Times Website" });
    expect(websiteLink).toHaveAttribute("href", "https://www.nytimes.com");
  });

  it("renders the legal section", () => {
    render(<Footer />);
    const legalText = screen.getByText(/This product uses the NY Times API/i);
    expect(legalText).toBeInTheDocument();
  });

  it("renders the copyright notice with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© ${currentYear} NY Times Most Popular. All rights reserved.`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("applies correct hover styles to links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveClass(
        "text-gray-600",
        "hover:text-blue-600",
        "transition-colors"
      );
    });
  });
});
