# PORTFOLIO - Pravinkumar N. (Intern Project)

A complete, recruiter-friendly personal portfolio built with **HTML5**, **CSS3**, and **vanilla JavaScript**. No frameworks. Dark theme is the default.

## Run the website

### Option A — VS Code / Cursor Live Preview

1. Open the `portfolio` folder.
2. Open `index.html`.
3. Use Live Preview / Live Server, or right-click `index.html` and open it in a browser.

### Option B — Simple local server (recommended)

From the `portfolio` folder:

```bash
npx --yes serve .
```

Then open the URL printed in the terminal (often `http://localhost:3000`).

Python alternative:

```bash
python -m http.server 5500
```

Open `http://localhost:5500`.

A local server is useful so the resume file check (`assets/resume.pdf`) works reliably. Opening the file with `file://` may block that check.

### Option C — Antigravity / Cursor browser preview

Serve the `portfolio` folder, then open the local URL in the built-in browser preview.

## File structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── resume.pdf   ← you provide this file
```

## Where to add your real details

All editable personal and project data lives at the top of `script.js`.

| What to add | Where |
| --- | --- |
| GitHub profile URL | `PROFILE.githubUrl` in `script.js` |
| Email address | `PROFILE.email` in `script.js` |
| Project GitHub repos | `PROJECTS[].github` in `script.js` |
| Live demo URLs (only if a real demo exists) | `PROJECTS[].liveDemo` in `script.js` |
| Resume PDF | Save your file as `assets/resume.pdf` |

Until those values are filled in, the site shows **clear placeholders**. It does not invent GitHub URLs, an email address, grades, or achievements.

The LinkedIn URL is already set to:

`https://www.linkedin.com/in/pravinkumar-nithiyanandan-ab074b381/`

## Resume

This project does **not** include a generated resume. Place your own PDF at:

`portfolio/assets/resume.pdf`

If the file is missing, the Download Resume buttons explain where to put it.

## Contact form

The form validates name, email, subject, and message in the browser. It does **not** send email. Connect a backend or email service later if you want messages delivered.

## Features

- Sticky navbar and mobile menu
- Typing animation for roles (respects `prefers-reduced-motion`)
- Scroll reveal with `IntersectionObserver`
- Active nav highlighting
- Project cards rendered from a JavaScript array
- Optional light theme toggle (dark remains default)
- Dynamic copyright year and back-to-top button
