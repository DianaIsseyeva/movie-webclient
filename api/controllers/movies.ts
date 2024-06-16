import { MovieType } from '@/common/types';
import { BaseController } from './base';
import { MoviesType } from '@/common/types/movies-type';

const KINOPOISK_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

export class MovieController extends BaseController {
  public static getAllMovies() {
    return this.get<MoviesType>(`${KINOPOISK_ENDPOINT}/movie?page=1&limit=50`);
  }

  public static getMovieById(filmId: string) {
    return this.get<MovieType>(`${KINOPOISK_ENDPOINT}/movie?id=${filmId}`);
  }
}