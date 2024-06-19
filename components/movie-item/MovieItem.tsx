import { MovieType } from '@/common/types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import Link from 'next/link';

type MovieItemProps = Partial<MovieType> & {
  onFavoriteToggle: (id: number) => void;
  isFavorite: boolean;
};

export default function MovieItem({
  id,
  poster,
  name,
  year,
  rating,
  description,
  genres,
  onFavoriteToggle,
  isFavorite,
}: MovieItemProps) {
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
          <IconButton
            className=''
            aria-label='add to favorites'
            onClick={() => {
              id && onFavoriteToggle(id);
            }}
          >
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
