import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<ArticlesPage />} />
              <Route path="/article/:id" element={<ArticleDetailPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
