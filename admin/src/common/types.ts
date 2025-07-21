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
