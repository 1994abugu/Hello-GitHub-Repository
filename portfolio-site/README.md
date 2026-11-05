# Nnamdi Jude-Thaddeus — Portfolio

A static portfolio site (plain HTML, CSS and vanilla JavaScript). No build step, no framework, no dependencies.
It was exported from a Claude Artifact and is designed to run anywhere that can serve static files.

## Project structure

```
.
├── index.html                  # All markup: home page + the Orderific case study (#orderific)
├── css/
│   └── styles.css              # All styles (design tokens, layout, animations, responsive rules)
├── js/                         # One small script per feature, loaded with `defer` in this order
│   ├── reveal.js               # Scroll/load fade-in animations
│   ├── heading-rotator.js      # "Selected Work" heading that cycles every 3 seconds
│   ├── card-videos.js          # Plays/pauses single-video project cards when on screen
│   ├── wave-mesh.js            # Dotted wave canvas background (pointer + click ripples)
│   ├── video-playlists.js      # Two-video playlists (Orderific, ChatSupport, case-study frame)
│   ├── back-to-top.js          # Footer back-to-top button
│   ├── footer-reveal.js        # Footer entrance animation
│   ├── case-study-router.js    # Opens/closes the Orderific case study via the #orderific hash
│   ├── figma-modal.js          # "View Figma Link" popup
│   ├── flow-diagram.js         # Step-by-step reveal of the flow diagram
│   ├── annotations.js          # Numbered, expandable annotations on the 3 screenshots
│   ├── research-list.js        # Staggered reveal of the research list
│   └── resume-viewer.js        # "View Resume" pop-up viewer
├── assets/
│   ├── Nnamdi-Jude-Thaddeus-Resume.pdf
│   ├── images/                 # avatar, about photo, client logos, posters, case-study screenshots, resume pages
│   └── videos/                 # Project card videos (H.264 MP4, no audio)
├── favicon.svg
├── robots.txt
├── vercel.json                 # Clean URLs, cache + security headers
└── package.json                # Only used for the optional local preview scripts
```

## Run locally

```bash
npm run dev          # serves the folder at http://localhost:3000  (uses `npx serve`)
# or any static server, e.g.
python3 -m http.server 3000
```

Open `http://localhost:3000`. Do not open `index.html` by double-clicking it: browsers block some features on `file://`.

## Deploy

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/new and import the GitHub repository.
2. Framework Preset: **Other**.
3. Build Command: leave empty. Output Directory: leave empty (the project root is served).
4. Click **Deploy**. Every push to `main` redeploys automatically.

Or with the CLI: `npm i -g vercel`, then run `vercel` in this folder (and `vercel --prod` to publish).

## Things you can edit

| What | Where |
| --- | --- |
| Texts, links, social URLs, email, phone | `index.html` |
| Colours, spacing, type sizes | `css/styles.css` (`:root` variables at the top, then per-section rules) |
| Project videos | replace files in `assets/videos/` (keep the file names, or update `index.html`) |
| Résumé | replace `assets/Nnamdi-Jude-Thaddeus-Resume.pdf` (and `assets/images/resume/page-*.jpg` used by the viewer) |
| Client logos | `assets/images/clients/` |

## Notes

- **Layout scale:** the page is designed on a 697px-wide frame; `html { font-size }` scales everything (`rem`) with the window width, capped at 2px per rem.
- **Case study route:** the Orderific page is opened with the URL hash `#orderific` (no server routing needed).
- **Fonts:** Poppins and Inter load from Google Fonts. To self-host them, download the font files into `assets/fonts/` and replace the `<link>` in `index.html` with `@font-face` rules.
- **Placeholder links:** the Telegram and Behance links in the footer and the "View More" button still point to `#`.
- **Videos:** MP4 (H.264) works in all modern browsers. They are muted and loop, and pause when off-screen or when the tab is hidden.
- **Reduced motion:** all animations respect `prefers-reduced-motion`.
