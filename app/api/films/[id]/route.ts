import { NextResponse } from 'next/server'
import { getFilms } from '@/lib/films'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const films = await getFilms()
    const film = films.find(f => f.id === parseInt(params.id))
    
    if (!film) {
      return NextResponse.json({ error: 'Film not found' }, { status: 404 })
    }
    
    return NextResponse.json({ film })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch film' }, { status: 500 })
  }
}