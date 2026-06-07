# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack web application for an AI solutions consulting company. Consists of a React marketing site with an admin dashboard backed by a Django REST API.

## Development Commands

### Frontend (`/frontend`)

> **Package manager: yarn** — always use `yarn` instead of `npm` for this project.

```bash
yarn dev           # Start Vite dev server at http://localhost:5173
yarn build         # Production build
yarn lint          # Run ESLint
yarn preview       # Preview production build
yarn add <pkg>     # Install a package
yarn remove <pkg>  # Remove a package
```

### Backend (`/backend`)



```bash
python manage.py runserver          # Start Django dev server at http://localhost:8000
python manage.py makemigrations     # Create migration files after model changes
python manage.py migrate            # Apply migrations
python manage.py createsuperuser    # Create admin user
```

Both servers must run simultaneously during development. The frontend proxies API calls to `http://localhost:8000/api/`.

## Architecture

### Frontend (`/frontend/src`)

- **`App.jsx`** — Root router. Navbar, Footer, and ChatWidget are hidden on `/admin*` routes.
- **`context/AuthContext.jsx`** — JWT state (accessToken, refreshToken) stored in localStorage. Exposes `login`/`logout` and listens for `auth-logout` events from the API interceptor.
- **`services/api.js`** — Axios instance pointed at `http://localhost:8000/api/`. Attaches JWT to all requests; silently refreshes on 401; dispatches `auth-logout` event when refresh fails.
- **`pages/`** — Route-level components (public marketing pages + admin views).
- **`components/`** — Shared UI components.

### Backend (`/backend/api`)

Single Django app with five models: `CustomerInquiry`, `GalleryItem`, `Event`, `Service`, `Testimonial`. All exposed via DRF viewsets. JWT issued by `djangorestframework-simplejwt` (60-min access tokens, 1-day refresh tokens).

### Database

MySQL only. Configure via environment variables: `DB_NAME` (default: `ai_solutions`), `DB_USER` (default: `root`), `DB_PASSWORD`, `DB_HOST` (default: `127.0.0.1`), `DB_PORT` (default: `3306`).

### Styling

Tailwind with a custom navy palette (`navy-50` through `navy-950`, base `#0F172A`) and blue accent (`#2563EB`). Global component classes (`.btn-primary`, `.btn-secondary`, `.glass-card`, `.glass-nav`) are defined in `frontend/src/index.css`. Glassmorphism effects use `backdrop-blur` with custom box-shadows defined in `tailwind.config.js`.