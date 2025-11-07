import { NextResponse } from 'next/server'
import { getFilms } from '@/lib/films'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    
    const allFilms = await getFilms()
    
    // Filter public films only
    let films = allFilms.filter(film => film.status === 'public')
    
    // Search functionality
    if (search) {
      films = films.filter(film => 
        film.name.toLowerCase().includes(search.toLowerCase()) ||
        film.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Sort by latest added (assuming higher ID = newer)
    films.sort((a, b) => b.id - a.id)
    
    return NextResponse.json({ films })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch films' }, { status: 500 })
  }
}