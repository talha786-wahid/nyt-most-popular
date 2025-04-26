import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders the loading spinner with correct classes", () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByRole("status");
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "min-h-[400px]"
    );

    const spinner = screen.getByTestId("loading-spinner");
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
});
