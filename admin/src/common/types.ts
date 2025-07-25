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
  id: string;
  title: string;
  description: string;
  year: number;
  duration: string;
  status: string;
  rating: string;
  stars: string[];
  director: string;
  poster: string;
  images_url: string[];
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
  createdAt: string;
  updatedAt: string;
};
