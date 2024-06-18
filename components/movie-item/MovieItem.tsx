import { MovieType } from '@/common/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export default function MovieItem({ id, poster, name, year, rating, description, genres }: Partial<MovieType>) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);
      setIsFavorite(parsedFavorites.includes(id));
    }
  }, []);

  const handleToggleFavorite = () => {
    const favorites = localStorage.getItem('favorites');
    let updatedFavorites = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter((favId: number) => favId !== id);
    } else {
      updatedFavorites.push(id);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='flex flex-col items-start justify-between'>
      <div className='relative max-w-full min-w-[240px] mobile:min-w-[300px] tablet:min-w-[240px] h-[320px]'>
        <Image
          layout='fill'
          objectFit='cover'
          className='rounded'
          src={poster ? poster.url : '/default-poster.png'}
          alt='poster'
        />
      </div>

      <div className='flex-grow'>
        <div className='flex items-center justify-between'>
          <Link href={`/movie/${id}`}>
            <p className='text-lg font-semibold'>{name}</p>
          </Link>
          <IconButton className='' aria-label='add to favorites' onClick={handleToggleFavorite}>
            <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
          </IconButton>
        </div>
        {description && <p>{description}</p>}
        <p>год: {year}</p>
      </div>

      <div>
        {rating && (
          <div>
            {rating.kp >= 0 && <p>kp: {rating.kp}</p>}
            {rating.await >= 0 && <p>await: {rating.await}</p>}
            {rating.filmCritics >= 0 && <p>filmCritics: {rating.filmCritics}</p>}
            {rating.imdb >= 0 && <p>imdb: {rating.imdb}</p>}
            {rating.russianFilmCritics >= 0 && <p>russianFilmCritics: {rating.russianFilmCritics}</p>}
            {rating.tmdb >= 0 && <p>tmdb: {rating.tmdb}</p>}
          </div>
        )}
        <p>
          Жанры:{' '}
          {genres &&
            genres.map((genre, index) => (
              <span key={index}>
                {genre.name}
                {index < genres.length - 1 && ', '}
              </span>
            ))}
        </p>
      </div>
    </div>
  );
}
