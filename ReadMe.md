> ⚠️ **Academic Notice:** This project is submitted as a CS50W final project.
> If you are currently enrolled in CS50W, do not copy or adapt this code.

# Haichi (配置) : Browser-based distributed display controller

Managing content across multiple displays is painful; proprietary software, manual sync, fiddly OS utilities. Haichi (Japanese for arrangement) solves this with a zero-install web app, it allows the user to controll the content on the other displays: sign in, drag, done. It's built as a React (Typescript) SPA (single-page application) talking to a Django REST backend. State is managed client-side, metadata lives in PostgreSQL, and media is offloaded to object storage (S3 / MinIO locally) to keep the database lean.

---

## Overview

Haichi lets a **master** browser remotely control what images are shown across any number of **slave** browsers with zero client installation. Intended use cases include digital signage, restaurant menus, event scoreboards, and collaborative image sharing.

The master operates in two modes:

- **CREATE** — build display groups, register screens, define container layouts, organize images into groups, and assign image groups to containers
- **CONTROL** — update the active image inside any container across all registered displays in real-time

The server is **stateless by design**: all session state lives in the database, and slave displays poll the REST API for current state. This reduces backend complexity and keeps the system straightforward to scale.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Backend | Django 6, Django REST Framework, Gunicorn |
| Database | PostgreSQL 17 |
| Object Storage | MinIO (S3-compatible) |
| Reverse Proxy | Nginx |
| Containerization | Docker, Docker Compose |

**Key Python packages:** `django-storages`, `boto3`, `django-environ`, `psycopg2-binary`, `Pillow`

---

## System Architecture
<img width="1739" height="1286" alt="system_arch_haichi" src="https://github.com/user-attachments/assets/9fe1156b-5e3b-4920-8417-a9e3fb34c639" />

```
Browser (React App)
      │
      ├── HTTP GET  :80        → Nginx → React static build
      ├── HTTP POST :8000/api/ → Django REST API
      └── HTTP GET  :9000/*   → Nginx → MinIO (image files)

Docker Compose services:
  react-frontend  (port 80)   — Nginx serving compiled React app
  django-web      (port 8000) — Gunicorn + Django REST API
  miniobucket     (port 9000) — MinIO S3-compatible object storage
  db              (port 5432) — PostgreSQL 17
  nginx           (port 9000/9001) — MinIO reverse proxy
```

Images are uploaded to MinIO via `django-storages` (S3 backend). Django stores only the object URL in PostgreSQL — the browser fetches images directly from MinIO, keeping the API server stateless and avoiding unnecessary data transfer.

---

## Database Schema

```
DISPLAY_GROUP  ──< REGISTERED_DISPLAY ──< CONTAINER >── IMG_GROUP
                                                              │
                                                         IMG_GROUP_IMG
                                                              │
                                                            IMG
```

| Model | Purpose |
|---|---|
| `DISPLAY_GROUP` | A named workspace that groups related displays together |
| `REGISTERED_DISPLAY` | A single screen with a JSON layout spec defining its containers |
| `CONTAINER` | One image slot within a display; references an `IMG_GROUP` and tracks the active image |
| `IMG_GROUP` | A named collection of images that can be cycled through a container |
| `IMG_GROUP_IMG` | Join table linking images to image groups (many-to-many) |
| `IMG` | A single image file stored in MinIO; holds the object URL |

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Haichi_CS50-Final_v0.0
   ```

2. Copy the environment template and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Key variables to configure:
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   POSTGRES_DB_NAME=haichi
   POSTGRES_USERNAME=dbuser
   POSTGRES_PASSWORD=dbpassword
   MINIO_ROOT_USER=minioadmin
   MINIO_ROOT_PASSWORD=minioadmin
   MINIO_BUCKET_NAME=haichi-images
   ```

3. Build and start all services:
   ```bash
   docker compose up --build
   ```

### Service Ports

| Service | URL |
|---|---|
| React App | `http://localhost:80` |
| Django API | `http://localhost:8000` |
| MinIO (S3) | `http://localhost:9000` |
| MinIO Console | `http://localhost:9001` |
| PostgreSQL | `localhost:5432` |
| Vite Dev Server | `http://localhost:5173` |

### Django Admin

Once running, access the Django admin panel at `http://localhost:8000/admin/`. All six database models are registered and browsable.

---

## Project Structure

```
Haichi_CS50-Final_v0.0/
├── docker-compose.yaml        # Orchestrates all services
├── nginx.conf                 # MinIO reverse proxy config
├── .env.example               # Environment variable template
│
├── Django/HaichiAPI/
│   ├── Dockerfile             # Multi-stage build (builder + slim runtime)
│   ├── requirements.txt       # Python dependencies
│   ├── manage.py
│   ├── HaichiAPI/             # Django project config (settings, urls, wsgi)
│   └── DISPLAY/               # Core Django app
│       ├── models.py          # All database models
│       ├── admin.py           # Admin panel registration
│       └── views.py           # API views (in progress)
│
├── React/haichi/
│   ├── Dockerfile             # Multi-stage build (Vite build + Nginx serve)
│   ├── src/
│   │   ├── main.tsx
│   │   └── App.tsx
│   └── vite.config.ts
│
└── Docs/
    ├── ARCHITECTURE.md        # Design notes, ERD, and architecture diagrams
    └── Systems-Architecture-Diagram-Dev.svg
```

---

## Status

This project is in active development as a CS50W final project.

**Completed**
- Full Docker Compose environment (Django, React, PostgreSQL, MinIO, Nginx)
- Multi-stage Dockerfiles for both the Django and React services
- All database models defined with proper relationships and docstrings
- MinIO S3 storage configured via `django-storages`
- Django admin panel with all models registered
- Environment variable configuration via `django-environ`

**In Progress**
- Django REST Framework API views and URL routing
- React frontend — display group management UI, CREATE and CONTROL modes

---

## License

MIT — see [LICENSE.txt](LICENSE.txt)
