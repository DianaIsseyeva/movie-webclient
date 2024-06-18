'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div
      className='mobile:fixed top-0 right-0 left-0 mobile:w-full z-50'
      style={{
        backgroundImage: 'linear-gradient(255deg, #6c5d88 0, #4a3e72 25%, #1f1f59 50%, #000042 75%, #00002f 100%)',
      }}
    >
      <div className='container flex justify-between mobile:px-4'>
        <nav>
          <ul>
            <li>
              <Link href='/'>
                <Image src='/logo.webp' width={100} height={100} alt='logo' />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
