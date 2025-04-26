import axios from "axios";
import type { ArticleResponse, TimePeriod } from "../types/article";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const fetchArticles = async (
  period: TimePeriod
): Promise<ArticleResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${period}.json`, {
      params: {
        "api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
