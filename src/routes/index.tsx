import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const ArticlesPage = lazy(() =>
  import("@/pages/ArticlesPage").then((module) => ({
    default: module.ArticlesPage,
  }))
);
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetailPage"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article/:id" element={<ArticleDetailPage />} />
      </Routes>
    </Suspense>
  );
};
