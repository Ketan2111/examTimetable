# College Exam Timetable Management System

Simple exam timetable management system using:

- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT in HTTP-only cookies

## Project Structure

```text
backend/
  database/schema.sql
  src/
frontend/
  app/
  components/
  lib/
```

## Setup

1. Create a MySQL database.
2. Run `backend/database/schema.sql`.
3. Copy `backend/.env.example` to `backend/.env` and update the values.
4. Copy `frontend/.env.example` to `frontend/.env.local`.
5. Install dependencies:

```bash
npm run install:all
```

6. Run the apps in separate terminals:

```bash
npm run dev:backend
npm run dev:frontend
```

## Create Login Accounts

Create users from the backend after setting up the database and `backend/.env`.

Admin:

```bash
npm run create-user --prefix backend -- --role=admin --name="Admin Name" --email=admin@example.com --password="Password123"
```

Student:

```bash
npm run create-user --prefix backend -- --role=student --name="Student Name" --email=student@example.com --password="Password123" --academicYear="2nd Year" --section=A
```
