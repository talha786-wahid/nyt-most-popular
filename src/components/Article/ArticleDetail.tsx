import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/services/api";
import type { TimePeriod } from "@/types/article";
import { ArticleDetailLoading } from "./ArticleDetailLoading";
import { ArticleDetailError } from "./ArticleDetailError";
import { ArticleDetailNotFound } from "./ArticleDetailNotFound";
import { ArticleDetailContent } from "./ArticleDetailContent";

export const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", 1],
    queryFn: () => fetchArticles(1 as TimePeriod),
  });

  if (isLoading) {
    return <ArticleDetailLoading />;
  }

  if (error || !data) {
    return <ArticleDetailError />;
  }

  const article = data.results.find((a) => a.id === Number(id));

  if (!article) {
    return <ArticleDetailNotFound />;
  }

  return <ArticleDetailContent article={article} />;
};
