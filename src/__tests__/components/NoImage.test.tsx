import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NoImage } from "@/components/NoImage";

describe("NoImage", () => {
  it("renders with correct container classes", () => {
    render(<NoImage />);
    const container = screen.getByTestId("no-image-container");
    expect(container).toHaveClass(
      "w-full",
      "h-full",
      "min-h-[200px]",
      "bg-gray-100",
      "flex",
      "items-center",
      "justify-center"
    );
  });

  it("renders the image placeholder", () => {
    render(<NoImage />);
    const img = screen.getByTestId("no-image-svg");
    expect(img).toBeInTheDocument();
    expect(img).toHaveClass("w-16", "h-16", "text-gray-400");
    expect(img).toHaveAttribute("alt", "No image available");
  });

  it("has correct image source", () => {
    render(<NoImage />);
    const img = screen.getByTestId("no-image-svg");
    expect(img).toHaveAttribute("src");
    // We can't test the exact src value as it will be a URL, but we can verify it exists
  });
});
