import { notFound } from 'next/navigation'
import Link from 'next/link'
import VideoPlayer from '@/components/VideoPlayer'
import { getFilms } from '@/lib/films'

async function getFilm(id: string) {
  try {
    // Server-side: directly use the films library
    const films = await getFilms()
    const film = films.find(f => f.id === parseInt(id))
    return film || null
  } catch (error) {
    console.error('Error fetching film:', error)
    return null
  }
}

export default async function WatchPage({ params }: { params: { id: string } }) {
  const film = await getFilm(params.id)
  
  if (!film) {
    notFound()
  }
  
  return (
    <main className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Films
        </Link>
        
        <div className="max-w-6xl mx-auto">
          <VideoPlayer src={film.movieUrl} title={film.name} />
          
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {film.name}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              {film.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}