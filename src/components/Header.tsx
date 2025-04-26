import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header role="banner" className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.236l8 4v7.528l-8 4-8-4V8.236l8-4z" />
              <path d="M12 6.236L4 10.236v3.528l8 4 8-4v-3.528l-8-4z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">NY Times</span>
              <span className="text-sm text-gray-600">Most Popular</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <a
              href="https://developer.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              API Docs
            </a>
            <a
              href="https://www.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              NY Times
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
