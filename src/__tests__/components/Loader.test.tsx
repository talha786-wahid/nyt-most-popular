import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Loader } from "../../components/Loader";

describe("Loader", () => {
  it("renders with correct container classes", () => {
    render(<Loader />);
    const container = screen.getByTestId("loader-container");
    expect(container).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "h-64"
    );
  });

  it("renders the spinner with correct classes", () => {
    render(<Loader />);
    const spinner = screen.getByTestId("loader-spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      "animate-spin",
      "rounded-full",
      "h-12",
      "w-12",
      "border-t-2",
      "border-b-2",
      "border-blue-500"
    );
  });

  it("has correct accessibility attributes", () => {
    render(<Loader />);
    const spinner = screen.getByTestId("loader-spinner");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
  });
});
