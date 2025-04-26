import { memo } from "react";
import { ArticleCard } from "@/components/Article";
import type { Article } from "@/types/article";

interface ArticlesFeedProps {
  articles: Article[];
}

const ArticlesFeed = memo(({ articles }: ArticlesFeedProps) => {
  return (
    <div
      data-testid="articles-feed"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {articles.map((article) => (
        <div key={article.id} className="h-full flex">
          <ArticleCard article={article} />
        </div>
      ))}
    </div>
  );
});

export default ArticlesFeed;
