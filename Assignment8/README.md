# Assignment 8 — Secure RESTful APIs (Node.js, Express, MongoDB)

This project implements the full requirements from *Assignment 8 – Building Secure RESTful APIs with Node.js, Express, and MongoDB*【7†files_uploaded_in_conversation】.

## Features
- User endpoints: **POST /user/create**, **PUT /user/edit**, **DELETE /user/delete**, **GET /user/getAll**
- **POST /user/uploadImage** — one image per user; JPEG/PNG/GIF only; path saved to DB
- **POST /user/login** — email + password authentication with bcrypt compare
- Validation with **Joi** (full name, email, strong password)
- Passwords hashed with **bcrypt**
- Proper HTTP status codes and clear error messages
- Swagger docs at **/api-docs**
- Postman collection included

## Quick Start
1. Install dependencies
   ```bash
   npm install
   ```
2. Copy env
   ```bash
   cp .env.example .env
   ```
3. (Local MongoDB) Ensure MongoDB is running at `mongodb://localhost:27017/usersDB`.
4. Start the server
   ```bash
   npm start
   ```
5. Open Swagger: http://localhost:3000/api-docs

## Endpoints (Summary)
- **POST /user/create** — body: `{ fullName, email, password }` → **201** on success
- **PUT /user/edit** — body: `{ email, [fullName], [password] }` (email immutable) → **200**
- **DELETE /user/delete** — body: `{ email }` → **200**
- **GET /user/getAll** — returns `{ users: [{ fullName, email, password }] }` → **200**
- **POST /user/uploadImage** — form-data: `email` (text), `image` (file) → **201**
- **POST /user/login** — body: `{ email, password }` → **200**

## Validation Rules
- **Full Name**: alphabetic + spaces only
- **Email**: valid email format
- **Password**: min 8, includes uppercase, lowercase, digit, special char

## Notes
- Uploaded files are stored in `./images` and served at `/images/<filename>`.
- If a user already has an image, upload returns **400** with message: *"Image already exists for this user."*
- Invalid image formats return **400** with message: *"Invalid file format. Only JPEG, PNG, and GIF are allowed."*

## Postman
Import `Assignment8.postman_collection.json`, set `{{baseUrl}}` to `http://localhost:3000`.

---


