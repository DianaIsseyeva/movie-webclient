'use client';
import { MovieController } from '@/api/controllers/movies';
import { MoviesType } from '@/common/types/movies-type';
import { useEffect, useState } from 'react';
import MovieItem from '../movie-item/MovieItem';

export default function Movies() {
  const [movies, setMovies] = useState<MoviesType>();

  useEffect(() => {
    const fetchAllMoviesData = async () => {
      try {
        const response = await MovieController.getAllMovies();
        if (response) {
          const filteredMovies = response.docs.filter(movie => movie.name !== null);
          setMovies({ ...response, docs: filteredMovies });
        }
      } catch (error) {
        console.error('Error fetching all movies:', error);
      }
    };
    fetchAllMoviesData();
  }, []);

  return (
    <div className='justify-items-center grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-10'>
      {movies &&
        movies.docs.map(movie => (
          <div className='p-3 bg-slate-400 rounded-lg h-full flex flex-col justify-between'>
            <MovieItem
              key={movie.id}
              name={movie.name}
              id={movie.id}
              poster={movie.poster}
              year={movie.year}
              rating={movie.rating}
            />
          </div>
        ))}
    </div>
  );
}
