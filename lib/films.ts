import fs from 'fs/promises'
import path from 'path'

export interface Film {
  id: number
  name: string
  thumbnailUrl: string
  movieUrl: string
  description: string
  status: 'public' | 'private'
  createdAt: string
}

const filmsFilePath = path.join(process.cwd(), 'data', 'films.json')

async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function ensureFilmsFile() {
  await ensureDataDir()
  try {
    await fs.access(filmsFilePath)
  } catch {
    await fs.writeFile(filmsFilePath, JSON.stringify([]))
  }
}

export async function getFilms(): Promise<Film[]> {
  await ensureFilmsFile()
  const data = await fs.readFile(filmsFilePath, 'utf-8')
  return JSON.parse(data)
}

export async function addFilm(filmData: Omit<Film, 'id' | 'createdAt'>): Promise<Film> {
  const films = await getFilms()
  const newFilm: Film = {
    ...filmData,
    id: films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1,
    createdAt: new Date().toISOString()
  }
  films.push(newFilm)
  await fs.writeFile(filmsFilePath, JSON.stringify(films, null, 2))
  return newFilm
}

export async function updateFilm(id: number, updates: Partial<Film>): Promise<Film | null> {
  const films = await getFilms()
  const index = films.findIndex(f => f.id === id)
  
  if (index === -1) return null
  
  films[index] = { ...films[index], ...updates }
  await fs.writeFile(filmsFilePath, JSON.stringify(films, null, 2))
  return films[index]
}

export async function deleteFilm(id: number): Promise<boolean> {
  const films = await getFilms()
  const newFilms = films.filter(f => f.id !== id)
  
  if (newFilms.length === films.length) return false
  
  await fs.writeFile(filmsFilePath, JSON.stringify(newFilms, null, 2))
  return true
}