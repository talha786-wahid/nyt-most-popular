import { Link } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  className?: string;
}

export const BackButton = ({ to = "/", className = "" }: BackButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center text-blue-500 hover:text-blue-600 font-medium ${className}`}
    >
      <svg
        data-testid="back-arrow-icon"
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      Back to Articles
    </Link>
  );
};
