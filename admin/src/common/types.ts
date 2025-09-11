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

export type MovieDataType = {
  id: string;
  title: string;
  type: string;
  description: string;
  year: number;
  duration: string;
  rating: string;
  stars: string[];
  director: string;
  images_url: string[];
  genre: string[];
  has_subtitle: boolean;
  has_dub: boolean;
  imdb_id: string;
  poster: string;
  language: string[];
  postId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SeriesDataType = {
  id: string;
  title: string;
  description: string;
  year: number;
  type: string;
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
  postId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AnimeDataType = {
  id: string;
  mal_id: string;
  mal_url: string;
  images_url: string[];
  poster: string;
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
  postId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DownloadLinksMovieType = {
  link_url: { title: string; link: string };
};

export type DownloadLinksSeriesOrAnimeType = {
  episode: string;
  season: number;
  link_url: { title: string; link: string }[];
  quality: string;
};

export type PostDtoType = {
  title: string;
  extra_info: string;
  download_info: string;
  description: string;
  is_premium: boolean;
  slug: string;
  download_links: DownloadLinksMovieType | DownloadLinksSeriesOrAnimeType;
  id: string;
  content: string;
};

export type PostType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  is_premium: boolean;
  status: string | null;
  extra_info: string | null;
  download_info: string | null;
  like_count: number;
  views: number;
  createdAt: string;
  updatedAt: string;

  anime: AnimeType;
  series: SeriesType;

  movie: movieType;

  likes: any[]; // You can define LikeDto if needed

  download_links: {
    id: string;
    episode: string | null;
    season: string | null;
    link_url: {
      link: string;
      title: string;
    };
    quality: string | null;
    postId?: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type DownloadLinkBoxProps<T> = {
  dataState: T[];
  setDataState: React.Dispatch<React.SetStateAction<T[]>>;
  submitHandler?: (e: React.FormEvent) => void;
  isPending: boolean;
};

export type UserType = {
  id: string;
  mobile: string;
  name: string | null;
  is_premium: boolean;
  plan_name: string;
  expire_date: string | null; // could also be Date | null if parsed
  createdAt: string; // or Date
  updatedAt: string; // or Date
  watchlist: any[]; // can replace `any` with proper item type later
  comments: any[];
  likes: any[];
  subscriptions: any[];
};
