# Assignment 6 – Web Application with jQuery and Modern JavaScript

This package contains two independent parts as required.

## 📂 Structure
```
Assignment6/
├── PartA_Calculator_Login/
│   ├── login.html
│   └── calculator.html
├── PartB_Stopwatch/
│   └── stopwatch.html
└── style.css
```

> Open the HTML files directly in a modern browser (Chrome, Edge, Safari). The pages use the jQuery CDN.

---

## Part A – Calculator with User Login
- **Live validation** for `@northeastern.edu` email and password (min 8).
- **Login button disabled** until both fields are valid.
- **Hardcoded users**: `demo@northeastern.edu / Pass@123`, `husky@northeastern.edu / Husky@123`.
- On success: **session stored** in `sessionStorage` (or `localStorage` when "Remember me" is checked), **animated success**, **redirect** to `calculator.html` (2s).
- **Auth guard** on `calculator.html` redirects to login if not authenticated.
- Calculator uses a **single ES6 arrow function**:
  ```js
  const calculate = (num1, num2, operation) => { /* add | subtract | multiply | divide */ };
  ```
- Inline errors shown using jQuery—**no pop-up alerts**.
- **Logout** clears session and redirects with a fade-out.

## Part B – Event Stopwatch with Session Logging
- Timer in `HH:MM:SS`, large display, updates every second.
- **Async/Await + Promises** wrap `setInterval`/`clearInterval` logic.
- **Date** + **Event Name** required; fields **disabled while running**.
- **History saved to localStorage**; newest first.
- **Filter by date** and **statistics** (total sessions, total time).
- Styled notices and responsive layout.

---

## 🛠️ How to Run
1. Download and unzip `Gummadi_Sharath_Assignment6.zip`.
2. Open:
   - `PartA_Calculator_Login/login.html` → sign in, then use the calculator.
   - `PartB_Stopwatch/stopwatch.html` → start timing activities.
3. If you need offline use with no internet, replace the jQuery CDN with a local copy.

## ✅ Notes
- No alerts are used for error messages; inline messages are displayed beneath fields.
- Numeric input validation accepts **decimals** and **negatives**.
- Divider handles **divide-by-zero** gracefully.

---

## ✨ Bonus-ready Ideas (optional)
- CSV export for stopwatch sessions.
- Dark / Light theme toggle.
- Keyboard shortcuts for Pause/Resume.
