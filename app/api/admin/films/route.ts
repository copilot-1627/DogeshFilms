import { NextResponse } from 'next/server'
import { getFilms, addFilm } from '@/lib/films'
import { verifyAuth } from '@/lib/auth'
import { downloadFile } from '@/lib/download'

export async function GET(request: Request) {
  const authError = verifyAuth(request)
  if (authError) return authError
  
  try {
    const films = await getFilms()
    return NextResponse.json({ films })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch films' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authError = verifyAuth(request)
  if (authError) return authError
  
  try {
    const { name, thumbnailUrl, movieUrl, description } = await request.json()
    
    if (!name || !thumbnailUrl || !movieUrl || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Start downloading the movie file
    const downloadStatus = await downloadFile(movieUrl, name)
    
    const newFilm = await addFilm({
      name,
      thumbnailUrl,
      movieUrl,
      description,
      status: 'public'
    })
    
    return NextResponse.json({ 
      success: true, 
      film: newFilm,
      downloadStatus 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}