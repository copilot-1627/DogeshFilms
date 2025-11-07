'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/?search=${encodeURIComponent(search)}`)
    } else {
      router.push('/')
    }
  }
  
  const handleClear = () => {
    setSearch('')
    router.push('/')
  }
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search films..."
          className="w-full pl-12 pr-24 py-3 bg-dark-bg text-white text-sm rounded-full border border-dark-border focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500/20 transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-1.5 bg-white text-black text-sm rounded-full hover:bg-gray-200 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  )
}