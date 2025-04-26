import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services/api";
import { NoImage } from "./NoImage";
import type { TimePeriod } from "../types/article";

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", 1],
    queryFn: () => fetchArticles(1 as TimePeriod),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="animate-pulse max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Article
          </h2>
          <p className="text-gray-600 mb-8">
            Unable to load the article. Please try again later.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        </div>
      </div>
    );
  }

  const article = data.results.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        </div>
      </div>
    );
  }

  const mainImage =
    article.media[0]?.["media-metadata"]?.find(
      (meta) => meta.format === "mediumThreeByTwo440"
    )?.url || article.media[0]?.["media-metadata"]?.[2]?.url;

  const publishedDate = new Date(article.published_date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium mb-8"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-8">
            <span className="font-medium">{article.byline}</span>
            <span className="mx-2">•</span>
            <span>{publishedDate}</span>
          </div>

          <div className="mb-8 aspect-[16/9] overflow-hidden rounded-lg">
            {mainImage ? (
              <img
                src={mainImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <NoImage />
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">{article.abstract}</p>

            <div className="mt-8 pt-8 border-t">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
              >
                Read full article on NY Times
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
