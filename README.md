# ZUŠ – Web Client

Frontend application for a Základní umělecká škola (Czech elementary art school). Provides a public-facing portal for visitors and a protected admin panel for content management.

## Tech Stack

- **React 19** + **Vite 6**
- **React Router 7** (SPA routing)
- **Bootstrap 5** + react-bootstrap (UI)
- **TinyMCE 6** (rich text editor)
- **Sass** (styling)

## Development

The backend must be running on `http://localhost:8080` — Vite automatically proxies `/api`, `/uploads`, and `/search` to it.

```bash
npm install
npm run dev
```

App will be available at `http://localhost:5173`.

### Other commands

```bash
npm run build     # production build to /dist
npm run lint      # ESLint
npm run preview   # preview the production build locally
```

## Architecture

The app has two surfaces with separate layouts:

- **Public portal** (`/`) — read-only pages for visitors
- **Admin panel** (`/admin/*`) — protected CMS; accessible only to authenticated users with the `isAdmin` flag

Authentication uses cookies. Session state is managed by `SessionProvider` (React Context) via `GET /api/auth`.

### Managed content areas

News, About the School, History, Study Focus, School Achievements, Entrance Exams, Group Training, Music Theory, School Fees, Photo Gallery, Video Gallery, Files, Notice Board, Contacts, School Support, Calendar.

## Production Deployment (Docker)

Multi-stage build: Node 20 compiles `/dist`, Nginx Alpine serves it and proxies API requests to the backend service at `http://backend:8080`.

```bash
docker build -t zus-client .
```

The Nginx config (`nginx.conf`) expects the backend to be reachable under the name `backend` within the Docker Compose network.
