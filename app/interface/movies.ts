export interface MOVIES {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | object;
  budget: number;
  genres: GENRELIST[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: null | string;
  popularity: number;
  poster_path: null | string;
  production_companies: PRODUCTIONCOMPANY[];
  production_countries: Array<object>;
  release_date: string;
  revenue: number;
  runtime: null | number;
  spoken_languages: Array<object>;
  status: string;
  tagline: null | string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GENRELIST {
  id: number;
  name: string;
}

export interface PRODUCTIONCOMPANY {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

// MOVIE SEARCH

export interface MOVIESEARCH {
  page: number;
  results: MOVIESEARCHRESULTS[];
  total_pages: number;
  total_results: number;
}

export interface MOVIESEARCHRESULTS {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: null | string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface INFOMOVIERESULTS{
  id: number;
  title: string;
}