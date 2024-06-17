import { MovieType } from '@/common/types';
import Image from 'next/image';
import Link from 'next/link';

export default function MovieItem({ id, poster, name, year, rating, description, genres }: Partial<MovieType>) {
  return (
    <div className=''>
      <Link className='flex flex-col items-start justify-between h-full' href={`/movie/${id}`}>
        <div className='relative w-[290px] h-[320px]'>
          <Image
            layout='fill'
            objectFit='cover'
            className='rounded'
            src={poster ? poster.url : '/default-poster.png'}
            alt='poster'
          />
        </div>
        <div className='flex-grow'>
          <p className='text-lg font-semibold'>{name}</p>
          {description && <p>{description}</p>}
          <p>год: {year}</p>
        </div>
        <div className='mt-auto'>
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
      </Link>
    </div>
  );
}
