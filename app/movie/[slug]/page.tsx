'use client';

import { MovieController } from '@/api/controllers/movies';
import { MovieType } from '@/common/types';
import MovieItem from '@/components/movie-item/MovieItem';
import { useEffect, useState } from 'react';

export default function Movie({ params }: { params: { slug: string } }) {
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const testData = await MovieController.getMovieById(params.slug);
        setMovie(testData);
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };
    fetchMovieData();
  }, []);

  return (
    <div className='container mx-auto max-w-[70%] mt-[50px]'>
      {movie && (
        <MovieItem
          key={movie.id}
          name={movie.name}
          description={movie.description}
          id={movie.id}
          poster={movie.poster}
          year={movie.year}
          rating={movie.rating}
          genres={movie.genres}
        />
      )}
    </div>
  );
}
