import type { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="flex items-center justify-center min-h-[400px]"
      role="alert"
    >
      <div className="text-red-500 text-lg" data-testid="error-message">
        {message}
      </div>
    </div>
  );
};

ErrorMessage.displayName = "ErrorMessage";
