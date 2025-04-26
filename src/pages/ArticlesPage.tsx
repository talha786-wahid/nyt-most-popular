import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ArticlesFeed from "@/components/ArticlesFeed";
import { TimePeriodDropdown } from "@/components/TimePeriodDropdown";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { fetchArticles } from "@/services/api";
import type { TimePeriod } from "@/types/article";

const TIME_PERIOD_KEY = "selectedTimePeriod";

export function ArticlesPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(() => {
    const saved = localStorage.getItem(TIME_PERIOD_KEY);
    return (saved ? parseInt(saved, 10) : 1) as TimePeriod;
  });

  useEffect(() => {
    localStorage.setItem(TIME_PERIOD_KEY, timePeriod.toString());
  }, [timePeriod]);

  const {
    data: articles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles", timePeriod],
    queryFn: async () => {
      const response = await fetchArticles(timePeriod);
      return response.results;
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Most Popular Articles
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 text-base">Available Period:</span>
          <TimePeriodDropdown
            selectedPeriod={timePeriod}
            onPeriodChange={setTimePeriod}
          />
        </div>
      </div>
      <div className="min-h-[400px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 z-10 rounded-2xl">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <ErrorMessage message="Failed to load articles. Please try again later." />
        )}
        <ArticlesFeed articles={articles || []} isLoading={isLoading} />
      </div>
    </div>
  );
}
