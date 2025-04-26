import { Link } from "react-router-dom";
import backArrow from "@/assets/icons/back-arrow.svg";

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
      <img
        src={backArrow}
        alt="Back"
        data-testid="back-arrow-icon"
        className="w-5 h-5 mr-2"
      />
      Back to Articles
    </Link>
  );
};
