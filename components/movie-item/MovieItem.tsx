import { MovieType } from '@/common/types';
import Image from 'next/image';

export default function MovieItem({ poster, name, year, rating }: Partial<MovieType>) {
  return (
    <div className='flex flex-col items-center justify-between'>
      <div className='relative w-[200px] h-[290px]'>
        <Image
          layout='fill'
          objectFit='cover'
          className='rounded'
          src={poster ? poster.url : '/default-poster.png'}
          alt='poster'
        />
      </div>
      <p>{name}</p>
      <p>год: {year}</p>
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
    </div>
  );
}
