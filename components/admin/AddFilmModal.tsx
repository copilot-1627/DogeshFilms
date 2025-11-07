'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import DownloadProgress from './DownloadProgress'

interface AddFilmModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddFilmModal({ onClose, onSuccess }: AddFilmModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    thumbnailUrl: '',
    movieUrl: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [downloadProgress, setDownloadProgress] = useState<{
    show: boolean
    fileName: string
    progress: number
    speed: string
    size: string
    timeRemaining: string
  }>({
    show: false,
    fileName: '',
    progress: 0,
    speed: '0 MB/s',
    size: '0 MB',
    timeRemaining: 'Calculating...'
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const token = Cookies.get('admin_token')
    if (!token) return
    
    // Show download progress
    setDownloadProgress({
      show: true,
      fileName: formData.name,
      progress: 0,
      speed: '0 MB/s',
      size: 'Calculating...',
      timeRemaining: 'Calculating...'
    })
    
    // Simulate download progress
    const progressInterval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = Math.min(prev.progress + Math.random() * 15, 95)
        const speeds = ['2.5 MB/s', '3.8 MB/s', '5.2 MB/s', '4.1 MB/s', '6.3 MB/s']
        const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)]
        
        return {
          ...prev,
          progress: newProgress,
          speed: randomSpeed,
          size: '450 MB',
          timeRemaining: `${Math.ceil((100 - newProgress) / 5)}s`
        }
      })
    }, 800)
    
    try {
      const response = await fetch('/api/admin/films', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      clearInterval(progressInterval)
      
      if (response.ok) {
        // Complete the progress
        setDownloadProgress(prev => ({
          ...prev,
          progress: 100,
          timeRemaining: 'Complete!'
        }))
        
        setTimeout(() => {
          setDownloadProgress(prev => ({ ...prev, show: false }))
          onSuccess()
        }, 2000)
      } else {
        clearInterval(progressInterval)
        setDownloadProgress(prev => ({ ...prev, show: false }))
        setError(data.error || 'Failed to add film')
      }
    } catch (err) {
      clearInterval(progressInterval)
      setDownloadProgress(prev => ({ ...prev, show: false }))
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div className="bg-dark-surface rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-dark-border">
          <div className="p-6 border-b border-dark-border flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Add New Film</h2>
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
                placeholder="My Awesome Film"
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
                placeholder="https://example.com/thumbnail.png"
              />
              <p className="text-gray-500 text-sm mt-1">Direct link to thumbnail image (jpg, png)</p>
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
                placeholder="https://example.com/movie.mkv"
              />
              <p className="text-gray-500 text-sm mt-1">Direct link to video file (mp4, mkv, webm, etc.)</p>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2 font-medium">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-dark-bg text-white rounded-lg border border-dark-border focus:border-gray-500 focus:outline-none resize-none"
                placeholder="Brief description of your film..."
              />
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
                {loading ? 'Adding Film...' : 'Add Film'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {downloadProgress.show && (
        <DownloadProgress
          fileName={downloadProgress.fileName}
          progress={downloadProgress.progress}
          speed={downloadProgress.speed}
          size={downloadProgress.size}
          timeRemaining={downloadProgress.timeRemaining}
          onClose={() => setDownloadProgress(prev => ({ ...prev, show: false }))}
        />
      )}
    </>
  )
}