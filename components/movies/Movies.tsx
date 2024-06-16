'use client';
import { MovieController } from '@/api/controllers/movies';
import { MoviesType } from '@/common/types/movies-type';
import { useEffect, useState } from 'react';
import MovieItem from '../movie-item/MovieItem';

export default function Movies() {
  const [movies, setMovies] = useState<MoviesType | null>(null);

  useEffect(() => {
    (async () => {
      const response = await MovieController.getAllMovies();
      if (response) {
        const filteredMovies = response.docs.filter(movie => movie.name !== null);
        setMovies({ ...response, docs: filteredMovies });
      }
    })();
  }, []);

  return (
    <div className=' grid grid-cols-4 mobile:grid-cols-1 tablet:grid-cols-2'>
      {movies &&
        movies.docs.map(movie => (
          <MovieItem key={movie.id} poster={movie.poster} name={movie.name} year={movie.year} rating={movie.rating} />
        ))}
    </div>
  );
}
