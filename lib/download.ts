import https from 'https'
import http from 'http'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { pipeline } from 'stream'

const streamPipeline = promisify(pipeline)

export async function downloadFile(url: string, filename: string): Promise<any> {
  try {
    const downloadsDir = path.join(process.cwd(), 'public', 'films')
    
    // Ensure downloads directory exists
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true })
    }
    
    const sanitizedFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const ext = path.extname(url) || '.mkv'
    const filePath = path.join(downloadsDir, `${sanitizedFilename}${ext}`)
    
    // Start download (simplified - in production use chunked downloads)
    const protocol = url.startsWith('https') ? https : http
    
    return new Promise((resolve, reject) => {
      protocol.get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`))
          return
        }
        
        const writeStream = fs.createWriteStream(filePath)
        
        response.pipe(writeStream)
        
        writeStream.on('finish', () => {
          writeStream.close()
          resolve({
            success: true,
            path: `/films/${sanitizedFilename}${ext}`,
            message: 'Download completed'
          })
        })
        
        writeStream.on('error', (err) => {
          fs.unlink(filePath, () => {})
          reject(err)
        })
      }).on('error', reject)
    })
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}