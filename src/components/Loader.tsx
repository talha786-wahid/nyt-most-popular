import React from "react";

export const Loader: React.FC = () => {
  return (
    <div
      data-testid="loader-container"
      className="flex justify-center items-center h-64"
    >
      <div
        data-testid="loader-spinner"
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
        aria-label="Loading"
      />
    </div>
  );
};
