'use client';

import { MovieController } from '@/api/controllers/movies';
import { toggleFavorite } from '@/common/helper/toggle-favorite';
import { MoviesType } from '@/common/types';
import MovieItem from '@/components/movie-item/MovieItem';
import { Pagination } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export default function Favorite() {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState<number[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MoviesType>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await MovieController.getAllMovies(currentPage, [], '', '', '', '', '', favoriteMoviesIds);
        if (response.docs) {
          setFavoriteMovies(response);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (favoriteMoviesIds.length > 0) {
      fetchFavoriteMovies();
    }
  }, [favoriteMoviesIds]);

  const handleToggleFavorite = useCallback((id: number) => {
    const updatedFavorites = toggleFavorite(id);
    setFavoriteMoviesIds(updatedFavorites);
  }, []);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setFavoriteMoviesIds(parsedFavorites);
    }
  }, [handleToggleFavorite]);

  return (
    <div>
      {favoriteMovies ? (
        <div>
          <div className='justify-items-center grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-10'>
            {favoriteMovies.docs?.map(movie => (
              <div key={movie.id} className='p-3 bg-slate-400 rounded-lg h-full flex flex-col justify-between'>
                <MovieItem
                  name={movie.name}
                  id={movie.id}
                  poster={movie.poster}
                  year={movie.year}
                  rating={movie.rating}
                  onFavoriteToggle={handleToggleFavorite}
                  isFavorite={favoriteMoviesIds.includes(movie.id)}
                />
              </div>
            ))}
          </div>
          <Pagination onChange={(_, page) => setCurrentPage(page)} count={10} className='my-10 flex justify-center' />
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <p>В избранных нет фильмов</p>
        </div>
      )}
    </div>
  );
}
