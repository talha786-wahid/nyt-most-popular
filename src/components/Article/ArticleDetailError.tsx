import { BackButton } from "@/components/BackButton";

export const ArticleDetailError = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Article
        </h2>
        <p className="text-gray-600 mb-8">
          Unable to load the article. Please try again later.
        </p>
        <BackButton />
      </div>
    </div>
  );
};
