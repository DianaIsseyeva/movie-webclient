'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div
      className='mobile:fixed top-0 right-0 left-0 mobile:w-full z-50 p-5'
      style={{
        backgroundImage: 'linear-gradient(255deg, #6c5d88 0, #4a3e72 25%, #1f1f59 50%, #000042 75%, #00002f 100%)',
      }}
    >
      <div className='container flex justify-between mobile:px-4'>
        <nav className='w-full'>
          <ul className='flex items-center justify-between'>
            <li>
              <Link href='/'>
                <Image src='/logo.webp' width={70} height={70} alt='logo' className='rounded-lg' />
              </Link>
            </li>
            <li>
              <Link href='/favorite'>
                <p className='text-white'>Избранные</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
