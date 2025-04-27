import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/components/ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the error message with correct text and classes", () => {
    const testMessage = "Test error message";
    render(<ErrorMessage message={testMessage} />);

    const errorContainer = screen.getByRole("alert");
    expect(errorContainer).toBeInTheDocument();
    expect(errorContainer).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "min-h-[400px]"
    );

    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(testMessage);
    expect(errorMessage).toHaveClass("text-red-500", "text-lg");
  });

  it("renders different error messages correctly", () => {
    const messages = ["Network error", "Article not found", "Server error"];

    messages.forEach((message) => {
      const { unmount } = render(<ErrorMessage message={message} />);
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toHaveTextContent(message);
      unmount();
    });
  });
});
