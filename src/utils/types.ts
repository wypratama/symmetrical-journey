export interface IVideo {
  id: string;
}

export interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  popularity: number;
  genre_ids: number[];
  video: IVideo[] | boolean;
  original_language: string;
}

export interface IProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface ISpokenLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IMovieDetail extends IMovie {
  budget: number;
  homepage: string;
  imdb_id: string;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: ISpokenLanguage[];
  status: string;
  tagline: string;
  videos: IVideo[] | boolean;
  genres: IGenre[];
}

export interface InitialState {
  movies: IMovie[] | [];
  series: IMovie[] | [];
  moviePageInfo: number;
}

export interface APIResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IlistToDisplay {
  type: 'movies' | 'search';
}
