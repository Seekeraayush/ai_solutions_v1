# Backend — v2 (SQLite)

Django REST API for the AI Solutions platform. Uses SQLite — no database server required.

## Prerequisites

- Python 3.10+

## 1. Create & activate virtual environment

```bash
python -m venv .venv
source .venv/bin/activate        # macOS / Linux
# .venv\Scripts\activate         # Windows
```

## 2. Install dependencies

```bash
pip install -r requirements.txt
```

## 3. Apply migrations

SQLite creates the database file automatically on first run.

```bash
python manage.py migrate
```

## 4. Create a superuser (admin login)

```bash
python manage.py createsuperuser
```

## 5. Run the development server

```bash
python manage.py runserver
```

API available at **http://localhost:8000/api/**
Django admin at **http://localhost:8000/admin/**

## Useful commands

```bash
python manage.py makemigrations   # Generate migrations after model changes
python manage.py migrate          # Apply pending migrations
python manage.py shell            # Django interactive shell
```
