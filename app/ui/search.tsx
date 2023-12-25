'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

import { findCityCoords } from '../lib/weatherquery';


//The search component is responsible for searching for cities and querying the
//api for the result, it will be used on the Navbar
export default function Search({placeholder}: {placeholder: string}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    }
    else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)


  findCityCoords('Encinitas')

  return(
    <div>
      <input id='search' onChange={(e) => {
        handleSearch(e.target.value);
      }} placeholder={placeholder} className='bg-gray-300 h-9 p-2 rounded-lg' type="text" />
      <MagnifyingGlassIcon className='h-6 absolute right-6 top-5'/>
    </div>
  )
}
