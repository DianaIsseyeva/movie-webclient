'use client';

import { MoviesType, MovieType } from '@/common/types';
import { Backdrop, CircularProgress, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Filter from '../filter/Filter';
import MovieItem from '../movie-item/MovieItem';
import { MovieController } from '@/api/controllers/movies';

export default function Movies() {
  const [movies, setMovies] = useState<MoviesType>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await MovieController.getAllMovies(currentPage, selectedGenres);
      if (response) {
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
  }, [currentPage, selectedGenres]);

  const pageNumberHandler = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  if (isLoading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  const filteredMovies = selectedGenres.length
    ? movies?.docs.filter((movie: MovieType) => movie.genres?.some(genre => selectedGenres.includes(genre.name)))
    : movies?.docs;

  return (
    <div>
      <Filter selectedGenres={selectedGenres} onFilterChange={handleFilterChange} />
      {movies && (
        <div>
          <div className='justify-items-center grid grid-cols-4 tablet:grid-cols-3 mobile:grid-cols-1 gap-10'>
            {filteredMovies?.map(movie => (
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
          <Pagination
            onChange={(_, page) => pageNumberHandler(page)}
            count={10}
            className='my-10 flex justify-center'
          />
        </div>
      )}
    </div>
  );
}
