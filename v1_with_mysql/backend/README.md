# Backend — v1 (MySQL)

Django REST API for the AI Solutions platform. Uses MySQL as the database.

## Prerequisites

- Python 3.10+
- MySQL 8.0+ running locally
- `pip` or `pip3`

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

## 3. Create the MySQL database

Log into MySQL and run:

```sql
CREATE DATABASE ai_solutions CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 4. Configure environment variables

Create a `.env` file in this folder (or export directly in your shell):

```env
DB_NAME=ai_solutions
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
```

> The app reads these via `os.getenv(...)` in `settings.py`. Defaults are shown above except for `DB_PASSWORD`.

## 5. Apply migrations

```bash
python manage.py migrate
```

## 6. Create a superuser (admin login)

```bash
python manage.py createsuperuser
```

## 7. Run the development server

```bash
python manage.py runserver
```

API is available at **http://localhost:8000/api/**
Django admin at **http://localhost:8000/admin/**

## Useful commands

```bash
python manage.py makemigrations   # Generate migrations after model changes
python manage.py migrate          # Apply pending migrations
python manage.py shell            # Django interactive shell
```
