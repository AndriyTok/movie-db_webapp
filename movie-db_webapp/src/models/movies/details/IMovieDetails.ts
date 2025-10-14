import type IGenre from "../../genres/IGenre.ts";
import type {Production_company} from "./Production_company.ts";
import type {Production_country} from "./Production_country.ts";
import type {Spoken_language} from "./Speaken_language.ts";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Production_company[];
  production_countries: Production_country[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}