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

    const errorMessage = screen.getByText(testMessage);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500", "text-lg");
  });

  it("renders different error messages correctly", () => {
    const messages = ["Network error", "Article not found", "Server error"];

    messages.forEach((message) => {
      const { unmount } = render(<ErrorMessage message={message} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      unmount();
    });
  });
});
