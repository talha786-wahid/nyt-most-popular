import React from "react";
import { Link } from "react-router-dom";
import nytLogo from "@/assets/icons/nyt-logo.svg";

export const Header: React.FC = () => {
  return (
    <header role="banner" className="bg-white border-b border-gray-200">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={nytLogo}
              alt="NY Times Logo"
              width={32}
              height={32}
              className="object-contain"
              loading="lazy"
            />
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
