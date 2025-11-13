# React Job Portal – Assignment 9

This project implements a React-based Job Portal as described in Assignment 9.

It connects to the Node.js backend from Assignment 8 for **login** and **company image gallery**, and uses React Router, Axios, and Material UI.

## Features (Mapped to Requirements)

1. **Login and Session Management**
   - Login page that sends `username` and `password` to the Node.js backend (`POST /api/login`).
   - On success, a JWT/token from the backend is stored in `localStorage`.
   - Axios instance (`src/api.js`) automatically attaches the token to every request.
   - Logout button clears the token and redirects back to the login page.
   - Protected routes ensure only logged-in users can access the portal pages.

2. **Job Portal Pages and Routing**
   - Pages implemented as React components:
     - `Home` – welcome page with CTA to job listings.
     - `About` – explains portal and technologies.
     - `JobListings` – dynamic job list using provided data.
     - `Contact` – simple contact form.
     - `CompanyShowcase` – company image gallery.
   - Routing done with `react-router-dom` (v6) in `App.js`.
   - `Layout` component contains the Material UI navigation bar and shared layout.
   - Each page lives under `src/pages` with a clean folder structure.

3. **Job Listings with Frontend Data**
   - `src/data/jobPosts.js` contains the `jobPosts` array from the assignment, extended with:
     - `requiredSkills`
     - `salary`
   - `JobListings` uses `Array.map()` to render each job in a Material UI `Card`.
   - Each job shows:
     - Job Title
     - Description
     - Required Skills (as MUI `Chip`s)
     - Salary
     - Last updated
     - Apply link button

4. **Company Showcase with Image Gallery**
   - `CompanyShowcase` page fetches company list from backend via Axios:
     - Expects endpoint: `GET /api/companies`
     - Example response shape:
       ```json
       [
         { "id": 1, "name": "Awesome Tech", "imageUrl": "http://localhost:5000/uploads/awesome.png" }
       ]
       ```
   - Displays company name and image inside Material UI `Card`s arranged in a `Grid`.

5. **Material UI Components**
   - Used across the app:
     - `AppBar`, `Toolbar`, `Button`, `Typography`, `Box`
     - `Card`, `CardContent`, `CardMedia`, `Chip`, `Grid`
     - Form controls (`TextField`, `Alert`, `Avatar`) in the login and contact pages.
   - Ensures a clean, responsive UI. 

6. **Version Control and Documentation**
   - Include this project in a Git repository:
     ```bash
     git init
     git add .
     git commit -m "Assignment 9 - React Job Portal"
     ```
   - `.gitignore` file excludes `node_modules`, build artifacts, and environment files.
   - This `README.md` documents:
     - Setup
     - Folder structure
     - Navigation
     - Key features

## Project Structure

```text
webd9-job-portal/
  package.json
  .gitignore
  README.md
  src/
    index.js
    App.js
    api.js
    styles.css
    data/
      jobPosts.js
    components/
      Layout.js
      ProtectedRoute.js
    pages/
      Login.js
      Home.js
      About.js
      JobListings.js
      Contact.js
      CompanyShowcase.js
```

## Backend Requirements (Assignment 8 Integration)

Configure your Node.js backend (from Assignment 8) to expose:

1. **Login Endpoint**
   - `POST /api/login`
   - Request body:
     ```json
     { "username": "yourUsername", "password": "yourPassword" }
     ```
   - Response should include a token, e.g.:
     ```json
     { "token": "jwt-or-session-token" }
     ```

2. **Company Images Endpoint**
   - `GET /api/companies`
   - Returns an array of companies, each with at least:
     - `id`
     - `name`
     - `imageUrl` (public URL or static path)
   - Reuse the image upload / static file logic from your previous assignment.

Update `REACT_APP_API_BASE_URL` if needed.

## Running the Project

1. Install dependencies:

```bash
npm install
```

2. Make sure your Node.js backend (Assignment 8) is running, e.g.:

```bash
cd ../your-node-backend
npm start
```

3. In this React project, start the dev server:

```bash
npm start
```

4. Open `http://localhost:3000` in a browser.
   - You will first see the **Login** page.
   - Log in using valid credentials from your Node.js backend.
   - After successful login, you will be redirected to the **Home** page and can navigate to:
     - Home (`/`)
     - About (`/about`)
     - Job Listings (`/jobs`)
     - Company Showcase (`/companies`)
     - Contact (`/contact`)



- Ensure the backend API URLs in `src/api.js` match your actual endpoints.
- Add screenshots of key pages (optional, for documentation).
- Push the project to a Git repository (GitHub, GitLab, etc.) as required by your instructor.