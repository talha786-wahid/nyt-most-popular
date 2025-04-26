export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <p className="text-gray-600">
              This application displays the most popular articles from The New
              York Times using their public API.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://developer.nytimes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  NY Times API
                </a>
              </li>
              <li>
                <a
                  href="https://www.nytimes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  NY Times Website
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
            <p className="text-gray-600">
              This product uses the NY Times API but is not endorsed or
              certified by The New York Times.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-500">
          <p>© {currentYear} NY Times Most Popular. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
