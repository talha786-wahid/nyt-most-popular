import { memo } from "react";
import type { TimePeriod } from "@/types/article";
import dropdownArrow from "@/assets/icons/dropdown-arrow.svg";

interface TimePeriodDropdownProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
  disabled?: boolean;
}

const TIME_PERIODS: { value: TimePeriod; label: string }[] = [
  { value: 1, label: "Last 24 Hours" },
  { value: 7, label: "Last 7 Days" },
  { value: 30, label: "Last 30 Days" },
];

export const TimePeriodDropdown = memo(
  ({
    selectedPeriod,
    onPeriodChange,
    disabled = false,
  }: TimePeriodDropdownProps) => {
    return (
      <div className="relative">
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(Number(e.target.value) as TimePeriod)}
          disabled={disabled}
          className={`appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-opacity duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {TIME_PERIODS.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <img src={dropdownArrow} alt="Dropdown arrow" className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

TimePeriodDropdown.displayName = "TimePeriodDropdown";
