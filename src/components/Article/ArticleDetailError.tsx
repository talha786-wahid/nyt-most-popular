interface ArticleDetailErrorProps {
  error: { message?: string };
}

export default function ArticleDetailError({ error }: ArticleDetailErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-red-600 font-semibold text-lg mb-2">
        Error loading article
      </div>
      <div className="text-gray-500">
        {error.message || "An unknown error occurred."}
      </div>
    </div>
  );
}
