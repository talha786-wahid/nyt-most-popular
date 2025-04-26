import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/__tests__/setup";
import { BackButton } from "@/components/BackButton";

describe("BackButton", () => {
  it("renders with default props", () => {
    render(<BackButton />);
    const link = screen.getByRole("link", { name: /Back to Articles/i });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveClass(
      "inline-flex",
      "items-center",
      "text-blue-500",
      "hover:text-blue-600",
      "font-medium"
    );
  });

  it("renders with custom destination", () => {
    render(<BackButton to="/custom" />);
    const link = screen.getByRole("link", { name: /Back to Articles/i });
    expect(link).toHaveAttribute("href", "/custom");
  });

  it("applies custom className", () => {
    render(<BackButton className="custom-class" />);
    const link = screen.getByRole("link", { name: /Back to Articles/i });
    expect(link).toHaveClass("custom-class");
  });

  it("contains back arrow icon", () => {
    render(<BackButton />);
    const img = screen.getByTestId("back-arrow-icon");
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass("w-5", "h-5", "mr-2");
    expect(img).toHaveAttribute("alt", "Back");
  });
});
