import { memo } from "react";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/types/article";

interface ArticlesFeedProps {
  articles: Article[];
}

const ArticlesFeed = memo(({ articles }: ArticlesFeedProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
});

ArticlesFeed.displayName = "ArticlesFeed";

export default ArticlesFeed;
