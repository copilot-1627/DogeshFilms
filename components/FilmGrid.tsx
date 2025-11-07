'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FilmCard from './FilmCard'

interface Film {
  id: number
  name: string
  thumbnailUrl: string
  movieUrl: string
  description: string
  status: string
  createdAt: string
}

export default function FilmGrid() {
  const searchParams = useSearchParams()
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchFilms()
  }, [searchParams])
  
  const fetchFilms = async () => {
    try {
      setLoading(true)
      const search = searchParams.get('search') || ''
      const response = await fetch(`/api/films?search=${encodeURIComponent(search)}`)
      const data = await response.json()
      setFilms(data.films || [])
    } catch (error) {
      console.error('Failed to fetch films:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-400 text-xl">Loading films...</div>
      </div>
    )
  }
  
  if (films.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-400 text-xl">No films found</div>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  )
}