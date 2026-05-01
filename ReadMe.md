> ⚠️ **Academic Notice:** This project is submitted as a CS50W final project.
> If you are currently enrolled in CS50W, do not copy or adapt this code.

Haichi (配置) : Browser-based distributed display controller active
Managing content across multiple displays is painful; proprietary software, manual sync, fiddly OS utilities.

Haichi (Japanese for arrangement) solves this with a zero-install web app, it allows the user to controll the content on the other displays: sign in, drag, done.

It's built as a React (Typescript) SPA (single-page application) talking to a Django REST backend. State is managed client-side, metadata lives in PostgreSQL, and media is offloaded to object storage (S3 / MinIO locally) to keep the database lean.
