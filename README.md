# Mini Full-Stack Search Application

A full-stack TypeScript application that provides a real-time search interface for querying a local FAQ dataset, featuring relevance-based ranking and result summaries.

## Features

- 🔍 Real-time search with debouncing
- 📊 Relevance-based result ranking
- 💡 Smart snippet generation
- 📝 Automated result summaries
- 🔗 Source tracking
- ⚡ Optimized performance
- 🛡️ Error boundaries & handling

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Express + TypeScript
- Styling: CSS
- Build Tool: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Usama-Tariq/Dev_UsamaTariq_TaskA.git
cd Dev_UsamaTariq_TaskA
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

or simply

```bash
npm i && npm run dev
```

This will start both the frontend (port 5173) and backend (port 4000) in development mode.

## API Documentation

### Search Endpoint

```http
POST /api/search
```

#### Request Body

```json
{
  "query": "string"
}
```

#### Success Response (200)

```json
{
  "query": "string",
  "results": [
    {
      "id": "string",
      "title": "string",
      "snippet": "string"
    }
  ],
  "summary": "string",
  "sources": ["string"],
  "message": "string"
}
```

#### Error Response (400)

```json
{
  "error": "Query is required and cannot be empty."
}
```

### Health Check Endpoint

```http
GET /api/health
```

#### Success Response (200)

```json
{
  "status": "ok",
  "uptimeSeconds": "number",
  "timestamp": "string",
  "env": "string"
}
```

## Architecture

### Frontend Structure

```
src/
├── app/                  # App core components
├── features/            # Feature-based modules
│   └── search/         # Search feature components
├── shared/             # Shared utilities and components
│   ├── api/           # API utilities
│   ├── components/    # Shared components
│   └── hooks/         # Custom hooks
└── types/              # TypeScript declarations
```

### Backend Structure

```
server/
├── config/             # Configuration
├── features/          # Feature modules
│   └── search/       # Search implementation
├── middleware/        # Express middleware
└── routes/            # API routes
```

## Search Algorithm

The search implementation uses a weighted scoring system:

- Title matches: 2 points per term
- Body matches: 1 point per term
- Case-insensitive matching
- Top 3 results returned, ordered by relevance

## Development

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:client` - Start frontend only
- `npm run dev:server` - Start backend only
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Notes

- Maximum of 3 results returned per search
- Results are ordered by relevance score
- Empty queries return 400 status code
- No matches return empty array with friendly message
- Automatic summary generation for results
- Source tracking included in response
