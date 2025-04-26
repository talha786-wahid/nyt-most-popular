export interface Article {
  id: number;
  title: string;
  abstract: string;
  url: string;
  published_date: string;
  byline: string;
  media: Media[];
}

export interface Media {
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
  "media-metadata": MediaMetadata[];
}

export interface MediaMetadata {
  url: string;
  format: string;
  height: number;
  width: number;
}

export interface ArticleResponse {
  status: string;
  copyright: string;
  num_results: number;
  results: Article[];
}

export type TimePeriod = 1 | 7 | 30;
