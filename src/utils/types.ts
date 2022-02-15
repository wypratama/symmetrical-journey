import { Key } from 'react';
import { Path } from 'react-router-dom';

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
  type?: 'movie';
}

export interface ISeries {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  original_language: string;
  genre_ids: number[];
  origin_country: string[];
  popularity: number;
  original_name: string;
  backdrop_path: string;
  type?: 'tv';
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

export interface ISeriesDetail extends ISeries {
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  homepage: string;
  genres: IGenre[];
  tagline: string;
  number_of_episodes: number;
  number_of_seasons: number;
  in_production: boolean;
}

export interface InitialState {
  movies: IMovie[] | [];
  series: IMovie[] | [];
  moviePageInfo: number;
  seriesPageInfo: number;
}

export interface APIResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
}

export interface IlistToDisplay {
  type: 'movies' | 'search' | 'series';
}

declare function useLocation(): Location;

export interface ILocation extends Path {
  state: { type: 'movie' | 'tv' };
  key: Key;
}
