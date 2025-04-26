import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { ArticleResponse, TimePeriod } from "@/types/article";
import { fetchArticles } from "@/services/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { NoImage } from "@/components/NoImage";
import { TimePeriodDropdown } from "@/components/TimePeriodDropdown";

const ArticleList = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>(1);

  const { data, isLoading, error, isFetching } = useQuery<ArticleResponse>({
    queryKey: ["mostViewedArticles", selectedPeriod],
    queryFn: () => fetchArticles(selectedPeriod),
  });

  const articles = data?.results || [];

  const renderContent = () => {
    if (isLoading || isFetching) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <ErrorMessage message="Failed to load articles" />;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
              {article.media?.[0]?.["media-metadata"]?.[2]?.url ? (
                <img
                  src={article.media[0]["media-metadata"][2].url}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <NoImage />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{article.byline}</p>
              <p className="text-gray-500 text-sm">
                {new Date(article.published_date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Most Viewed Articles</h1>
        <TimePeriodDropdown
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          disabled={isFetching}
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default ArticleList;
