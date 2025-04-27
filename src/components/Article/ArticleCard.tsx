import { memo } from "react";
import { Link } from "react-router-dom";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

const NoImage = () => (
  <div
    data-testid="no-image-container"
    className="w-full aspect-video bg-gray-100 flex items-center justify-center rounded-t-xl"
  >
    <span className="text-gray-400">No Image Available</span>
  </div>
);

const ArticleCard = memo(({ article }: ArticleCardProps) => {
  const formattedDate = new Date(article.published_date).toLocaleDateString();
  const mediaMeta = article.media?.[0]?.["media-metadata"];
  const imageUrl = mediaMeta ? mediaMeta[mediaMeta.length - 1]?.url : undefined;

  return (
    <Link
      to={`/article/${article.id}`}
      className="flex flex-col h-full w-full bg-white border border-gray-200 rounded-xl transition-shadow cursor-pointer"
      data-testid="article-card-link"
    >
      <div data-testid="article-card">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            width={640}
            height={360}
            className="aspect-video object-cover rounded-t-xl"
            data-testid="article-image"
            loading="lazy"
          />
        ) : (
          <NoImage />
        )}
        <div className="flex flex-col flex-1 p-6">
          <h2
            className="text-xl font-bold text-gray-900 mb-2 line-clamp-2"
            data-testid="article-title"
          >
            {article.title}
          </h2>
          <p
            className="text-gray-600 mb-4 line-clamp-3 flex-1"
            data-testid="article-abstract"
          >
            {article.abstract}
          </p>
          <div className="mt-auto">
            <div
              className="text-gray-500 text-sm mb-1 font-bold"
              data-testid="article-byline"
            >
              {article.byline}
            </div>
            <div
              className="text-gray-400 text-sm mb-2"
              data-testid="article-date"
            >
              {formattedDate}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ArticleCard;
