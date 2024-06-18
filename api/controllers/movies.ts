import { GenreType, MovieType } from '@/common/types';
import { MoviesType } from '@/common/types/movies-type';
import { BaseController } from './base';

const KINOPOISK_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

export class MovieController extends BaseController {
  public static async getAllMovies(pageNumber: number, genres: string[] = []): Promise<MoviesType> {
    let url = `${KINOPOISK_ENDPOINT}/v1.4/movie?page=${pageNumber}&limit=50`;

    if (genres.length) {
      const genreParams = genres.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');
      url += `&${genreParams}`;
    }

    return this.get<MoviesType>(url);
  }

  public static getMovieById(filmId: string) {
    return this.get<MovieType>(`${KINOPOISK_ENDPOINT}/v1.4/movie/${filmId}`);
  }

  public static getGenres() {
    return this.get<GenreType[]>(`${KINOPOISK_ENDPOINT}/v1/movie/possible-values-by-field?field=genres.name`);
  }
}
