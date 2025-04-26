import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "../services/api";
import type { TimePeriod } from "../types/article";

export const useArticles = (period: TimePeriod) => {
  return useQuery({
    queryKey: ["articles", period],
    queryFn: () => fetchArticles(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });
};
