# ZUŠ – Web Client

Frontend application for a Základní umělecká škola (Czech elementary art school). Provides a public-facing portal for visitors and a protected admin panel for content management.

## Tech Stack

- **React 19** + **Vite 6**
- **React Router 7** (SPA routing)
- **Bootstrap 5** + react-bootstrap + **bootstrap-icons** (UI)
- **TinyMCE 6** (rich text editor)
- **Sass** (styling)
- **yet-another-react-lightbox** (photo gallery)
- **Google Programmable Search Engine** (site-wide search on `/vyhledavani`)

## Development

The backend must be running on `http://localhost:8080` — Vite automatically proxies `/api`, `/uploads`, and `/carousel-photos` to it.

```bash
npm install
npm run dev
```

App will be available at `http://localhost:5173`.

For the search page (`/vyhledavani`) to work locally, copy `.env.example` to `.env.local` and set `VITE_GOOGLE_CSE_ID` to your Google Programmable Search Engine ID (`cx`).

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

News, About the School, History, Study Focus, School Achievements, Entrance Exams, Group Training, Music Theory, School Fees, Photo Gallery, Video Gallery, Files, Notice Board (incl. Annual Reports), Contacts, School Support, Calendar, and the homepage hero carousel photos.

The public site also has a search page (`/vyhledavani`) backed by Google Programmable Search — client-side only, no backend involvement.

## Production Deployment (Docker)

Multi-stage build: Node 20 compiles `/dist`, Nginx Alpine serves it and proxies `/api`, `/uploads`, and `/carousel-photos` to the backend service at `http://backend:8080`.

```bash
docker build --build-arg VITE_GOOGLE_CSE_ID=<your-cse-id> -t zus-client .
```

`VITE_GOOGLE_CSE_ID` must be passed as a build arg — Vite inlines `VITE_*` vars at build time, so a runtime env var on the Nginx container would never reach the bundle.

The Nginx config (`nginx.conf`) expects the backend to be reachable under the name `backend` within the Docker Compose network.

### CI/CD

`.github/workflows/deploy.yml` runs lint + build on every push to `main`, then deploys to the server over SSH (`~/apps/deploy.sh`).
