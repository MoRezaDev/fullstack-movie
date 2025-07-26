export type decodedUser = {
  userId: string;
};

export type RequestWithUser = Request & {
  user: {
    userId: string;
  };
};

export type OmdbSeriesResponse = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: 'series';
  totalSeasons: string;
  Response: 'True' | 'False';
};

export type JikanResponse = {
  data: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
      images: {
        image_url: string;
        small_image_url: string;
        medium_image_url: string;
        large_image_url: string;
        maximum_image_url: string;
      };
    };
    approved: boolean;
    titles: {
      type: string;
      title: string;
    }[];
    title: string;
    title_english: string;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: {
      from: string;
      to: string | null;
      prop: {
        from: {
          day: number;
          month: number;
          year: number;
        };
        to: {
          day: number | null;
          month: number | null;
          year: number | null;
        };
      };
      string: string;
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string;
    year: number;
    broadcast: {
      day: string;
      time: string;
      timezone: string;
      string: string;
    };
    producers: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    licensors: any[];
    studios: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    genres: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    explicit_genres: any[];
    themes: any[];
    demographics: {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }[];
    relations: {
      relation: string;
      entry: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
      }[];
    }[];
    theme: {
      openings: string[];
      endings: string[];
    };
    external: {
      name: string;
      url: string;
    }[];
    streaming: {
      name: string;
      url: string;
    }[];
  };
};
