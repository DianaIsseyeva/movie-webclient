'use client';

import { MovieController } from '@/api/controllers/movies';
import { MoviesType, MovieType } from '@/common/types';
import { Backdrop, CircularProgress, Pagination } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Filter from '../filter/Filter';
import MovieItem from '../movie-item/MovieItem';

export default function Movies() {
  const [movies, setMovies] = useState<MoviesType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedRatingType, setSelectedRatingType] = useState<string>('');
  const [minRating, setMinRating] = useState<string>('0');
  const [maxRating, setMaxRating] = useState<string>('10');
  const [minYear, setMinYear] = useState<string>('1990');
  const [maxYear, setMaxYear] = useState<string>(new Date().getFullYear().toString());
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

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await MovieController.getAllMovies(
        currentPage,
        selectedGenres,
        selectedRatingType,
        minRating,
        maxRating,
        minYear,
        maxYear
      );
      if (response.docs) {
        const filteredMovies = response.docs.filter((movie: MovieType) => movie.name !== null);
        setMovies({ ...response, docs: filteredMovies });
      }
    } catch (error) {
      console.error('Error fetching all movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [currentPage]);

  const handleFilterChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleRatingTypeChange = (ratingType: string) => {
    setSelectedRatingType(ratingType);
  };

  const handleRatingChange = (min: string, max: string) => {
    setMinRating(min);
    setMaxRating(max);
  };

  const handleYearChange = (min: string, max: string) => {
    setMinYear(min);
    setMaxYear(max);
  };

  const handleApplyFilters = () => {
    fetchMovies();
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedRatingType('');
    setMinRating('0');
    setMaxRating('10');
    setMinYear('1990');
    setMaxYear(new Date().getFullYear().toString());
    setCurrentPage(1);
    fetchMovies();
  };

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  return (
    <div>
      <Filter
        selectedGenres={selectedGenres}
        onFilterChange={handleFilterChange}
        selectedRatingType={selectedRatingType}
        onRatingTypeChange={handleRatingTypeChange}
        minRating={minRating}
        maxRating={maxRating}
        onRatingChange={handleRatingChange}
        minYear={minYear}
        maxYear={maxYear}
        onYearChange={handleYearChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
      {movies && (
        <div>
          <div className='justify-items-center grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-10'>
            {movies.docs.map(movie => (
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
      )}
    </div>
  );
}
