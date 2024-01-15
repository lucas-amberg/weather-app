'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';


//The search component is responsible for searching for cities and querying the
//api for the result, it will be used on the Navbar
export default function Search({placeholder, darkMode}: {placeholder: string, darkMode: boolean}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Light mode styles
  let searchBg = 'bg-gray-300'
  let searchText = ''
  let iconColor = ''

  // Sets to dark mode
  if (darkMode) {
    searchBg = 'bg-gray-700'
    searchText = 'text-white'
    iconColor = 'fill-gray-300'
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    console.log('ran')
    if (term) {
      params.set('query', term);
    }
    else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return(
    <div>
      <input id='search' onChange={(e) => {
        handleSearch(e.target.value);
      }} placeholder={placeholder} defaultValue={searchParams.get('query')?.toString()} className={`h-9 p-2 rounded-lg ${searchBg} ${searchText}`} type="text" />
      <MagnifyingGlassIcon className={`${iconColor} h-6 absolute right-6 top-5`}/>
    </div>
  )
}
