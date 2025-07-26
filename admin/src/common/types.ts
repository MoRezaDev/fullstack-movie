export type movieType = {
  title: string;

  description: string;

  year: number;

  duration: string;

  rating?: string;

  imdb_id: string;

  stars?: string | string[];

  director?: string;

  images_url?: string[];

  genre: string[] | string;

  has_subtitle?: boolean;

  has_dub?: boolean;

  poster?: string;

  language?: string[] | string;

  createdAt: string | number;
};

export type SeriesType = {
  id?: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  status: string;
  rating: string;
  stars: string[];
  director: string;
  poster?: string;
  images_url?: string[];
  genre: string[];
  has_subtitle: boolean;
  has_dub: boolean;
  imdb_id: string;
  language: string[];
  total_seasons: number;
  country: string;
  released: string;
  postId?: string | null;
  post?: {
    id: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AnimeType = {
  id: string;
  mal_id: string;
  mal_url: string;
  images_url: string[];
  poster?: string;
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  episodes: string;
  status: string;
  aired_from: string;
  duration: string;
  rating: string;
  mal_score: string;
  mal_scored_by: string;
  mal_rank: string;
  mal_popularity: string;
  description: string;
  season: string;
  year: number;
  broadcast: string;
  genre: string[];
  demographics: string[];
  streaming: string[];

  has_subtitle: boolean;
  has_dub: boolean;

  postId?: string;
  post?: {
    id: string;
    // Add more Post props if needed
  };

  createdAt: string; // Date as ISO string (if you're serializing it from DB)
  updatedAt: string;
};
