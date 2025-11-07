# DogeshFilms

A modern film sharing platform built with Next.js 14, Tailwind CSS, and TypeScript.

## Features

- 🎬 Browse and watch your personal film collection
- 🔍 Search films by name and description
- 📱 Fully responsive design with mobile support
- 🎮 Advanced video player with keyboard shortcuts (YouTube-style)
- 👨‍💼 Admin panel for managing films
- 🔒 Secure authentication for admin access
- 📥 Download progress tracking
- 🌙 Modern dark theme UI

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/copilot-1627/DogeshFilms.git
cd DogeshFilms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```
ADMIN_USERNAME=magic
ADMIN_PASSWORD=magic@123
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

## Admin Panel

Access at `/admin` with:
- Username: `magic`
- Password: `magic@123`

## Video Player Shortcuts

### Keyboard
- **Space/K**: Play/Pause
- **Arrow Left/Right**: Seek 5s
- **J/L**: Seek 10s
- **F**: Fullscreen
- **M**: Mute

### Mobile
- Double-tap sides to seek

## Tech Stack

- Next.js 14
- Tailwind CSS
- TypeScript
- JWT Authentication

## License

MIT
