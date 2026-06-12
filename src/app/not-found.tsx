'use client';

import Link from 'next/link';
import { useEffect } from 'react'

export default function Error() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center select-none'>
      <div className='lg:w-2/3 w-full flex flex-col items-center gap-5'>
        <span className='text-2xl font-semibold'>404 - Not Found</span>
        <Link href={"/"} className='indigobtn'>Go Back Home</Link>
      </div>
    </div>
  )
}
