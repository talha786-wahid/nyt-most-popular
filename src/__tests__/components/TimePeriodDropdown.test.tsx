import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { TimePeriodDropdown } from "@/components/TimePeriodDropdown";
import { render } from "@/__tests__/setup";

describe("TimePeriodDropdown", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders with correct options", () => {
    render(
      <TimePeriodDropdown selectedPeriod={1} onPeriodChange={mockOnChange} />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue("1");
    expect(options[1]).toHaveValue("7");
    expect(options[2]).toHaveValue("30");
  });

  it("calls onPeriodChange when selection changes", () => {
    render(
      <TimePeriodDropdown selectedPeriod={1} onPeriodChange={mockOnChange} />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "7" } });

    expect(mockOnChange).toHaveBeenCalledWith(7);
  });

  it("disables the dropdown when disabled prop is true", () => {
    render(
      <TimePeriodDropdown
        selectedPeriod={1}
        onPeriodChange={mockOnChange}
        disabled={true}
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    expect(select).toHaveClass("opacity-50", "cursor-not-allowed");
  });

  it("applies correct styling classes", () => {
    render(
      <TimePeriodDropdown selectedPeriod={1} onPeriodChange={mockOnChange} />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass(
      "appearance-none",
      "bg-white",
      "border",
      "border-gray-300",
      "rounded-lg",
      "px-4",
      "py-2",
      "pr-8",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500",
      "focus:border-transparent",
      "transition-opacity",
      "duration-200",
      "cursor-pointer"
    );
  });

  it("renders dropdown arrow icon", () => {
    render(
      <TimePeriodDropdown selectedPeriod={1} onPeriodChange={mockOnChange} />
    );

    const arrowIcon = screen.getByAltText("Dropdown arrow");
    expect(arrowIcon).toBeInTheDocument();
    expect(arrowIcon).toHaveClass("object-contain");
  });
});
