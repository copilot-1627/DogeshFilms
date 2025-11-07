import FilmGrid from '@/components/FilmGrid'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Header Section */}
      <div className="border-b border-dark-border bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              DogeshFilms
            </h1>
            <SearchBar />
          </div>
        </div>
      </div>
      
      {/* Films Grid Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl text-gray-400 font-medium">Latest Films</h2>
        </div>
        <FilmGrid />
      </div>
    </main>
  )
}