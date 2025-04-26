import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { render } from "../../__tests__/setup";
import { BackButton } from "../../components/BackButton";

describe("BackButton", () => {
  it("renders with default props", () => {
    render(<BackButton />);
    const link = screen.getByRole("link", { name: "Back to Articles" });
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
    const link = screen.getByRole("link", { name: "Back to Articles" });
    expect(link).toHaveAttribute("href", "/custom");
  });

  it("applies custom className", () => {
    render(<BackButton className="custom-class" />);
    const link = screen.getByRole("link", { name: "Back to Articles" });
    expect(link).toHaveClass("custom-class");
  });

  it("contains back arrow icon", () => {
    render(<BackButton />);
    const svg = screen.getByTestId("back-arrow-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-5", "h-5", "mr-2");
  });
});
