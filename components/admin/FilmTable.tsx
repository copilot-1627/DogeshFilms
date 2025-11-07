'use client'

interface Film {
  id: number
  name: string
  thumbnailUrl: string
  status: 'public' | 'private'
  createdAt: string
}

interface FilmTableProps {
  films: Film[]
  onEdit: (film: Film) => void
  onDelete: (id: number) => void
}

export default function FilmTable({ films, onEdit, onDelete }: FilmTableProps) {
  return (
    <div className="bg-dark-surface rounded-lg border border-dark-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-dark-hover">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Created At</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-border">
            {films.map((film) => (
              <tr key={film.id} className="hover:bg-dark-hover transition-colors">
                <td className="px-6 py-4 text-white">{film.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={film.thumbnailUrl}
                      alt={film.name}
                      className="w-16 h-10 object-cover rounded"
                    />
                    <span className="text-white font-medium">{film.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    film.status === 'public' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {film.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">
                  {new Date(film.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(film)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(film.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {films.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No films added yet
        </div>
      )}
    </div>
  )
}