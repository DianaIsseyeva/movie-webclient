'use client';

import { MovieController } from '@/api/controllers/movies';
import { MoviesType } from '@/common/types';
import MovieItem from '@/components/movie-item/MovieItem';
import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Favorite() {
  const [favoriteMoviesIds, setFavoriteMoviesIds] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState<MoviesType>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setFavoriteMoviesIds(parsedFavorites);
    }
  }, []);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await MovieController.getAllMovies(1, [], '', '', '', '', '', favoriteMoviesIds);
        if (response) {
          setFavoriteMovies(response);
        }
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteMovies]);

  return (
    <div>
      {favoriteMovies && (
        <div>
          <div className='justify-items-center grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-10'>
            {favoriteMovies.docs.map(movie => (
              <div key={movie.id} className='p-3 bg-slate-400 rounded-lg h-full flex flex-col justify-between'>
                <MovieItem
                  name={movie.name}
                  id={movie.id}
                  poster={movie.poster}
                  year={movie.year}
                  rating={movie.rating}
                />
              </div>
            ))}
          </div>
          <Pagination onChange={(_, page) => setCurrentPage(page)} count={10} className='my-10 flex justify-center' />
        </div>
      )}
    </div>
  );
}
