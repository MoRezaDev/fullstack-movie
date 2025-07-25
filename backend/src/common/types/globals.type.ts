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
