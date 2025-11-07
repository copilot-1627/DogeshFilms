import { NextResponse } from 'next/server'
import { updateFilm, deleteFilm } from '@/lib/films'
import { verifyAuth } from '@/lib/auth'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authError = verifyAuth(request)
  if (authError) return authError
  
  try {
    const updates = await request.json()
    const updatedFilm = await updateFilm(parseInt(params.id), updates)
    
    if (!updatedFilm) {
      return NextResponse.json({ error: 'Film not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true, film: updatedFilm })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update film' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authError = verifyAuth(request)
  if (authError) return authError
  
  try {
    const success = await deleteFilm(parseInt(params.id))
    
    if (!success) {
      return NextResponse.json({ error: 'Film not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete film' }, { status: 500 })
  }
}