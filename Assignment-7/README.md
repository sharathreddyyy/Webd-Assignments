# Assignment 7 — Two‑Page Website with CSS Grid, Flexbox, and SASS/SCSS

**Domain:** _Northeastern Cricket Hub_ (two related pages: `index.html` and `schedule.html`).  
This project demonstrates rich UI, **two Grid layouts**, **two Flexbox layouts**, and advanced **SASS/SCSS** features with a clean, modular structure.

---

## ✅ Requirements Coverage

### 1) Domain
- Two pages in one domain (not a portfolio): **Home** and **Schedule** for a cricket club.

### 2) CSS Layout
- **Grid (2+):**
  - `gallery-grid` (Home) – mosaic media grid.
  - `pricing-grid` (Home) – responsive pricing cards.
  - `cta-grid` (Schedule) – extra grid to show involvement CTAs.
- **Flexbox (2+):**
  - Header navigation (`.site-header .container`, `.main-nav`).
  - Hero section (`.hero`) — split content + art.
  - Program cards row (`.card-row`).
  - Schedule rows (`.schedule__row`).

### 3) SASS/SCSS Features (with file references)
- **Variables**: `utilities/_variables.scss`  
  Color tokens, fonts, dark theme tokens, ` $primary-rgb` for shadow tints.
- **CSS Custom Properties**: defined in `:root` in `scss/main.scss` (`--radius`, `--shadow`, `--brand`).
- **Nesting**: used across components (e.g., `.section { &__title {…} }`).
- **Interpolation**: `.gap-#{$i}` utilities generated in a `@for` loop.
- **Placeholder Selectors**: `%card` in `components/_cards.scss` reused by `.card` and `.price`.
- **Mixins**: `utilities/_mixins.scss` (`card`, `button-base`, `breakpoint`).
- **Functions**: `utilities/_functions.scss` (`spacing()`, `tint()`), used widely.
- **Additional 3–4 SASS Features:**
  - **Maps** with `@each`: `utilities/_maps.scss` generates `.text-{key}` / `.bg-{key}` classes and exposes `$brand`.
  - **Control Directives (`@for`, `@each`, `@if`)**: loops for utilities, dark‑mode opt‑in, etc.
  - **@extend**: `%card` extended by `.price` and `.card`.
  - **Modular file structure** with partials + `@use` across folders.

### 4) File Organization
```
Assignment-7-Project/
├── assets/
│   ├── img/ (SVG placeholders)
│   └── js/main.js
├── css/
│   └── styles.css          # precompiled snapshot for immediate preview
├── scss/
│   ├── base/_reset.scss
│   ├── components/_buttons.scss
│   ├── components/_cards.scss
│   ├── layout/_footer.scss
│   ├── layout/_grid.scss
│   ├── layout/_header.scss
│   ├── main.scss           # entry point, uses all partials
│   └── utilities/
│       ├── _functions.scss
│       ├── _maps.scss
│       ├── _mixins.scss
│       └── _variables.scss
├── index.html
├── schedule.html
└── README.md
```

### 5) Design and UI
- Clean modern design (Inter font), sticky translucent header, soft shadows, rounded corners, responsive hero, and lively color accents.
- Ready‑to‑use SVG illustrations to avoid broken images.

### 6) Documentation
- This README includes a summary of all SASS/SCSS features and setup instructions (below).

### 7) Submission
- **GitHub**: create a **private** repo using your NEU email and push this folder.  
- **Canvas**: upload the ZIP generated here and add the GitHub URL in remarks.
- Note: Both timestamps are considered by the rubric.

---

## ▶️ How to Run Locally

You have two options:

### Option A — Quick Preview (no build)
Simply open `index.html` and `schedule.html` in a browser.  
The `css/styles.css` is a precompiled snapshot so everything renders immediately.

### Option B — Build SCSS yourself (recommended)
1. Install Sass (any one method):
   - **npm**: `npm install -g sass`
   - **Homebrew (macOS)**: `brew install sass/sass/sass`
2. From project root, run:
   ```bash
   sass --watch scss:css
   ```
   This will compile `scss/main.scss` into `css/main.css` (or `css/styles.css` if you change the output filename).  
   Then open `index.html` to see live changes.

> If you compile to `css/main.css`, remember to update the `<link>` in both HTML files or output as `css/styles.css` to match this project.

---

## 🔍 Where each requirement is demonstrated

- **Grid**: `.gallery-grid`, `.pricing-grid`, `.cta-grid`
- **Flexbox**: `.site-header .container`, `.hero`, `.card-row`, `.schedule__row`
- **Variables**: `utilities/_variables.scss`
- **Custom Properties**: `:root` in `scss/main.scss`
- **Nesting**: `.section { &__title { … } }`
- **Interpolation**: `.gap-#{$i}` in loop
- **Placeholder**: `%card` in `components/_cards.scss`
- **Mixins**: `@include card`, `@include breakpoint(md)`
- **Functions**: `spacing()`, `tint()`
- **Maps + @each**: `utilities/_maps.scss`
- **@extend**: `.price` and `.card` extend `%card`
- **@if**: dark mode guard in `main.scss`

---

## ✍️ Notes / Customization

- Tweak theme tokens in `utilities/_variables.scss`.
- Add more gallery images to `assets/img/` — the grid will adapt.
- Use utility classes like `.gap-1`…`.gap-6`, `.text-accent`, `.bg-warning` generated from SASS maps/loops.

---

## 📦 GitHub & Canvas Submission Steps

```bash
# from folder containing Assignment-7-Project
git init
git branch -M main
git remote add origin https://github.com/<your-username>/assignment-7-cricket-hub.git
git add .
git commit -m "Assignment 7: two-page site with Grid/Flex + advanced SCSS"
git push -u origin main
```

- Make the repo **Private** and add your instructor/TA as a collaborator if requested.
- Upload the **ZIP** of this folder to Canvas.
- Paste the **GitHub URL** into Canvas remarks.

Good luck, and happy hacking! 🏏
