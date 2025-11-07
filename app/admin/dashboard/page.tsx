'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import AddFilmModal from '@/components/admin/AddFilmModal'
import EditFilmModal from '@/components/admin/EditFilmModal'
import FilmTable from '@/components/admin/FilmTable'

interface Film {
  id: number
  name: string
  thumbnailUrl: string
  movieUrl: string
  description: string
  status: 'public' | 'private'
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingFilm, setEditingFilm] = useState<Film | null>(null)
  
  useEffect(() => {
    const token = Cookies.get('admin_token')
    if (!token) {
      router.push('/admin')
      return
    }
    fetchFilms()
  }, [])
  
  const fetchFilms = async () => {
    const token = Cookies.get('admin_token')
    if (!token) return
    
    try {
      const response = await fetch('/api/admin/films', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setFilms(data.films || [])
      }
    } catch (error) {
      console.error('Failed to fetch films:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleLogout = () => {
    Cookies.remove('admin_token')
    router.push('/admin')
  }
  
  const handleFilmAdded = () => {
    setShowAddModal(false)
    fetchFilms()
  }
  
  const handleFilmUpdated = () => {
    setEditingFilm(null)
    fetchFilms()
  }
  
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this film?')) return
    
    const token = Cookies.get('admin_token')
    if (!token) return
    
    try {
      const response = await fetch(`/api/admin/films/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        fetchFilms()
      }
    } catch (error) {
      console.error('Failed to delete film:', error)
    }
  }
  
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage DogeshFilms</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            + Add New Film
          </button>
        </div>
        
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading films...</div>
        ) : (
          <FilmTable
            films={films}
            onEdit={setEditingFilm}
            onDelete={handleDelete}
          />
        )}
      </div>
      
      {showAddModal && (
        <AddFilmModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleFilmAdded}
        />
      )}
      
      {editingFilm && (
        <EditFilmModal
          film={editingFilm}
          onClose={() => setEditingFilm(null)}
          onSuccess={handleFilmUpdated}
        />
      )}
    </div>
  )
}