'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Film {
  id: number
  name: string
  thumbnailUrl: string
  description: string
}

export default function FilmCard({ film }: { film: Film }) {
  return (
    <Link 
      href={`/watch/${film.id}`}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-dark-surface">
        <Image
          src={film.thumbnailUrl}
          alt={film.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-sm text-gray-300 line-clamp-2">{film.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors line-clamp-1">
          {film.name}
        </h3>
      </div>
    </Link>
  )
}