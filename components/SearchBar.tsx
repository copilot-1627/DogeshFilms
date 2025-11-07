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
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search films..."
          className="w-full px-6 py-4 bg-dark-surface text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  )
}