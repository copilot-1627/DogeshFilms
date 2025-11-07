import FilmGrid from '@/components/FilmGrid'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            DogeshFilms
          </h1>
          <p className="text-gray-400">Your Personal Film Collection</p>
        </div>
        
        <SearchBar />
        
        <div className="mt-8">
          <FilmGrid />
        </div>
      </div>
    </main>
  )
}