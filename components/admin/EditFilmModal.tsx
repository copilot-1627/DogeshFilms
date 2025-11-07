'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'

interface Film {
  id: number
  name: string
  thumbnailUrl: string
  movieUrl: string
  description: string
  status: 'public' | 'private'
}

interface EditFilmModalProps {
  film: Film
  onClose: () => void
  onSuccess: () => void
}

export default function EditFilmModal({ film, onClose, onSuccess }: EditFilmModalProps) {
  const [formData, setFormData] = useState({
    name: film.name,
    thumbnailUrl: film.thumbnailUrl,
    movieUrl: film.movieUrl,
    description: film.description,
    status: film.status
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const token = Cookies.get('admin_token')
    if (!token) return
    
    try {
      const response = await fetch(`/api/admin/films/${film.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        onSuccess()
      } else {
        setError(data.error || 'Failed to update film')
      }
    } catch (err) {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
        <div className="p-6 border-b border-dark-border flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Edit Film</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Film Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Thumbnail URL *
            </label>
            <input
              type="url"
              value={formData.thumbnailUrl}
              onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
              required
              className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Movie URL *
            </label>
            <input
              type="url"
              value={formData.movieUrl}
              onChange={(e) => setFormData({ ...formData, movieUrl: e.target.value })}
              required
              className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-medium">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none resize-none"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">
              Status *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="public"
                  checked={formData.status === 'public'}
                  onChange={(e) => setFormData({ ...formData, status: 'public' })}
                  className="w-4 h-4"
                />
                <span className="text-white">Public</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="private"
                  checked={formData.status === 'private'}
                  onChange={(e) => setFormData({ ...formData, status: 'private' })}
                  className="w-4 h-4"
                />
                <span className="text-white">Private</span>
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-1">Private films won't appear on the main dashboard</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border hover:bg-dark-hover transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Film'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}