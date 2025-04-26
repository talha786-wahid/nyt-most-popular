import type { Article } from "../types/article";
import { Link } from "react-router-dom";

const NoImage = () => (
  <div
    data-testid="no-image-container"
    className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded-xl mb-6"
  >
    <span className="text-gray-400">No Image Available</span>
  </div>
);

interface ArticleDetailContentProps {
  article: Article;
}

export default function ArticleDetailContent({
  article,
}: ArticleDetailContentProps) {
  const mediaMeta = article.media?.[0]?.["media-metadata"];
  const imageUrl = mediaMeta ? mediaMeta[mediaMeta.length - 1]?.url : undefined;
  const formattedDate = new Date(article.published_date).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 mb-10">
      <Link
        to="/"
        className="text-blue-500 hover:underline text-base mb-6 inline-block font-medium"
      >
        &larr; Back to Articles
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
        {article.title}
      </h1>
      <div className="text-gray-500 mb-6 flex flex-wrap items-center gap-2 text-base">
        <span className="font-bold">{article.byline}</span>
        <span>{formattedDate}</span>
      </div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full rounded-xl object-cover mb-6 shadow-md max-h-[400px]"
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
        />
      ) : (
        <NoImage />
      )}
      <div className="text-gray-700 text-base mb-8">{article.abstract}</div>
      <hr className="my-6 border-gray-200" />
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline flex items-center gap-1 text-base font-medium"
      >
        Read full article on NY Times
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 inline"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75V17.25H6.75V6.75h10.5zm0 0L6.75 17.25"
          />
        </svg>
      </a>
    </div>
  );
}
