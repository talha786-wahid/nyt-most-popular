import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <div className="min-h-screen flex flex-col">
        <header className="w-full">
          <Header />
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 min-h-[700px]">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>

        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
