'use client'

interface DownloadProgressProps {
  fileName: string
  progress: number
  speed: string
  size: string
  timeRemaining: string
  onClose: () => void
}

export default function DownloadProgress({
  fileName,
  progress,
  speed,
  size,
  timeRemaining,
  onClose
}: DownloadProgressProps) {
  return (
    <div className="fixed bottom-4 right-4 w-96 bg-dark-surface border-2 border-green-500 rounded-lg shadow-2xl overflow-hidden z-50 animate-slide-up">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h3 className="text-white font-semibold text-sm">Downloading Film</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-3">
          <p className="text-gray-300 text-sm truncate mb-2">{fileName}</p>
          <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-green-400 text-xs mt-1 font-medium">{progress}% Complete</p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-dark-bg rounded p-2">
            <p className="text-gray-500 mb-1">Speed</p>
            <p className="text-white font-semibold">{speed}</p>
          </div>
          <div className="bg-dark-bg rounded p-2">
            <p className="text-gray-500 mb-1">Size</p>
            <p className="text-white font-semibold">{size}</p>
          </div>
          <div className="bg-dark-bg rounded p-2">
            <p className="text-gray-500 mb-1">Time Left</p>
            <p className="text-white font-semibold">{timeRemaining}</p>
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-green-500/20">
        <div 
          className="h-full bg-green-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}