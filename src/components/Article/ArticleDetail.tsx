import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleById } from "@/services/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ArticleDetailError from "./ArticleDetailError";
import ArticleDetailContent from "./ArticleDetailContent";

function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ArticleDetailError error={error} />;
  if (!article)
    return <ArticleDetailError error={{ message: "Article not found" }} />;

  return <ArticleDetailContent article={article} />;
}

export default ArticleDetail;
