import { BackButton } from "@/components/BackButton";

export const ArticleDetailNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Article Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The article you're looking for doesn't exist.
        </p>
        <BackButton />
      </div>
    </div>
  );
};
