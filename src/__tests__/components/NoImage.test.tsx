import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { NoImage } from "../../components/NoImage";

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

  it("renders the image placeholder SVG", () => {
    render(<NoImage />);
    const svg = screen.getByTestId("no-image-svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("w-16", "h-16", "text-gray-400");
  });

  it("has correct SVG path", () => {
    render(<NoImage />);
    const svg = screen.getByTestId("no-image-svg");
    const path = svg.querySelector("path");
    expect(path).toHaveAttribute(
      "d",
      "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    );
  });
});
