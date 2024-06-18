import Movies from '@/components/movies/Movies';

export default function Home() {
  return (
    <main className='container mx-auto mt-20'>
      <div className='h-full'>
        <Movies />
      </div>
    </main>
  );
}
