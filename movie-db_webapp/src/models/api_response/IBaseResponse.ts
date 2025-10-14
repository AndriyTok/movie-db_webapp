import type IMovie from "../movies/IMovie.ts";

export interface IBaseResponse {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}