export default function ArticleDetailNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-gray-600 font-semibold text-lg mb-2">
        Article Not Found
      </div>
      <div className="text-gray-500">
        The article you are looking for does not exist.
      </div>
    </div>
  );
}
