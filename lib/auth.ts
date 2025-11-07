import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function verifyAuth(request: Request): NextResponse | null {
  const token = request.headers.get('authorization')?.split(' ')[1]
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const jwtSecret = process.env.JWT_SECRET || 'default-secret'
    jwt.verify(token, jwtSecret)
    return null
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}