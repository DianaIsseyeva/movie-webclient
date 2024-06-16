import { MovieType } from './movie-type';

export type MoviesType = {
  docs: Array<MovieType>;
  total: number;
  limit: number;
  page: number;
  pages: number;
};
