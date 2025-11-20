# Assignment 10 - Admin & Employee Portal with Redux 

This project implements the requirements for Assignment 10:

- Backend:
  - POST `/api/user/create` with required `type` field (`admin` or `employee`) and validation.
  - GET `/api/users` returns all users **without passwords**.
  - POST `/api/user/login` authenticates and returns JWT + user (including `type`).
  - POST `/api/create/job` for admins to add jobs.
  - GET `/api/jobs` to list jobs.
  - Role-based authorization using JWT and middleware.

- Frontend:
  - React app using **Redux Toolkit** for state management.
  - Login required for all protected routes.
  - Admin-only:
    - `/admin/employees`: table of all users (name, email, type).
    - `/add-job`: form to create new jobs.
  - Employee-only:
    - `/jobs`: list of jobs from backend in card layout.
  - Uses **Material UI** components for layout, forms, tables and cards.

## Running the backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Running the frontend

```bash
cd frontend
npm install
npm start
```

Make sure the backend is running on `http://localhost:5000` so the frontend can communicate with it.

