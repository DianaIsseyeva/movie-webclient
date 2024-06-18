import { GenreType, MovieType } from '@/common/types';
import { MoviesType } from '@/common/types/movies-type';
import { BaseController } from './base';

const KINOPOISK_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

export class MovieController extends BaseController {
  public static getAllMovies(
    pageNumber: number,
    genres: string[],
    ratingType: string,
    minRating: string,
    maxRating: string,
    minYear: string,
    maxYear: string,
    ids?: number[]
  ) {
    const genresQuery = genres.map(genre => `genres.name=${encodeURIComponent(genre)}`).join('&');
    const ratingQuery = ratingType ? `&rating.${ratingType}=${minRating}-${maxRating}` : '';
    const yearQuery = `&year=${minYear}-${maxYear}`;
    const idsQuery = ids && ids.length > 0 ? `&id=${ids.join(',')}` : '';
    const url = `${KINOPOISK_ENDPOINT}/v1.4/movie?page=${pageNumber}&limit=50${
      genresQuery ? `&${genresQuery}` : ''
    }${ratingQuery}${yearQuery}${idsQuery}`;

    return this.get<MoviesType>(url);
  }

  public static getMovieById(filmId: string) {
    return this.get<MovieType>(`${KINOPOISK_ENDPOINT}/v1.4/movie/${filmId}`);
  }

  public static getGenres() {
    return this.get<GenreType[]>(`${KINOPOISK_ENDPOINT}/v1/movie/possible-values-by-field?field=genres.name`);
  }
}
