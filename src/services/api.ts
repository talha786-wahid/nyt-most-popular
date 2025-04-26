import axios from "axios";
import type { ArticleResponse, TimePeriod, Article } from "@/types/article";

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

export const fetchArticle = async (id: number): Promise<Article> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/1.json`, {
      params: {
        "api-key": API_KEY,
      },
    });
    const article = response.data.results.find(
      (article: Article) => article.id === id
    );
    if (!article) {
      throw new Error("Article not found");
    }
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    throw error;
  }
};

export const fetchArticleById = async (id: string) => {
  return fetchArticle(Number(id));
};
