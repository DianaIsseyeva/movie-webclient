'use client';

import { MovieController } from '@/api/controllers/movies';
import { MovieType } from '@/common/types';
import MovieItem from '@/components/movie-item/MovieItem';
import { useCallback, useEffect, useState } from 'react';
export default function Movie({ params }: { params: { slug: string } }) {
  const [movie, setMovie] = useState<MovieType>();
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);

  const handleToggleFavorite = useCallback((id: number) => {
    const favorites = localStorage.getItem('favorites');
    let updatedFavorites = favorites ? JSON.parse(favorites) : [];

    if (updatedFavorites.includes(id)) {
      updatedFavorites = updatedFavorites.filter((favId: number) => favId !== id);
    } else {
      updatedFavorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoriteMoviesIds(updatedFavorites);
  }, []);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setFavoriteMoviesIds(parsedFavorites);
    }
  }, [handleToggleFavorite]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const testData = await MovieController.getMovieById(params.slug);
        if (testData.id) {
          setMovie(testData);
        }
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
          onFavoriteToggle={handleToggleFavorite}
          isFavorite={favoriteMoviesIds.includes(movie.id)}
        />
      )}
    </div>
  );
}
