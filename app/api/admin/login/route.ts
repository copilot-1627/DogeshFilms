import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    
    const adminUsername = process.env.ADMIN_USERNAME || 'magic'
    const adminPassword = process.env.ADMIN_PASSWORD || 'magic@123'
    const jwtSecret = process.env.JWT_SECRET || 'default-secret'
    
    if (username === adminUsername && password === adminPassword) {
      const token = jwt.sign({ username, role: 'admin' }, jwtSecret, {
        expiresIn: '24h'
      })
      
      return NextResponse.json({ success: true, token })
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}