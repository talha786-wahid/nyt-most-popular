export const ArticleDetailLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="animate-pulse max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
        <div className="h-64 bg-gray-200 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
