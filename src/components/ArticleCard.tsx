import { memo } from "react";
import { Link } from "react-router-dom";
import type { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard = memo(({ article }: ArticleCardProps) => {
  const formattedDate = new Date(article.published_date).toLocaleDateString();

  return (
    <Link
      to={article.url}
      className="block"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{article.abstract}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{article.byline}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
});

ArticleCard.displayName = "ArticleCard";
