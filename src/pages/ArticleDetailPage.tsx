import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchArticleById } from "@/services/api";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";

function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return <ErrorMessage message="Failed to load article details" />;
  }

  const mediaMeta = article.media?.[0]?.["media-metadata"];
  const imageUrl = mediaMeta ? mediaMeta[mediaMeta.length - 1]?.url : undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Articles
      </Link>
      <article>
        <h1
          className="text-3xl font-bold text-gray-900 mb-4"
          data-testid="article-title"
        >
          {article.title}
        </h1>
        <div className="text-gray-500 mb-6" data-testid="article-metadata">
          <p className="font-bold" data-testid="article-byline">
            {article.byline}
          </p>
          <p className="text-sm" data-testid="article-date">
            {new Date(article.published_date).toLocaleDateString()}
          </p>
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
            data-testid="article-image"
          />
        ) : (
          <div
            className="w-full aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center"
            data-testid="no-image-container"
          >
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="prose max-w-none" data-testid="article-content">
          <p className="text-gray-700">{article.abstract}</p>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 text-blue-500 hover:underline flex items-center gap-1 text-base font-medium"
        >
          Read full article on NY Times &rarr;
        </a>
      </article>
    </div>
  );
}

export default ArticleDetailPage;
