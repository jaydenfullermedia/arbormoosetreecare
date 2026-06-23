# Arbor Moose Tree Care — demo site

A 5-page static website (plain HTML/CSS/JS, no build step) for a potential client pitch.

```
arbormoosetreecare/
├── index.html      Home
├── services.html   Services
├── areas.html      Areas Served
├── about.html      About
├── contact.html    Contact (quote form opens email; call/text buttons)
├── styles.css      Shared styles
├── main.js         Nav + scroll animations
└── render.yaml     Render deploy config
```

To preview locally, just double-click `index.html` — it opens in your browser. Or run a tiny local server from this folder: `python3 -m http.server` then visit http://localhost:8000.

---

## Deploy to Render for free

Render serves static sites for free. It deploys from a Git repo, so this is two short steps: push the folder to GitHub, then point Render at it.

### Step 1 — Put this folder on GitHub

1. Go to https://github.com/new and create a new **empty** repo named `arbormoosetreecare` (no README, no .gitignore).
2. Open Terminal, then run these commands (drag the folder into Terminal after `cd ` to autofill the path):

   ```bash
   cd ~/Desktop/arbormoosetreecare
   git init
   git add .
   git commit -m "Arbor Moose demo site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/arbormoosetreecare.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your GitHub username.

### Step 2 — Create the Static Site on Render

1. Go to https://dashboard.render.com and log in (free account).
2. Click **New +** → **Static Site**.
3. Connect your GitHub and pick the `arbormoosetreecare` repo.
4. Fill in:
   - **Name:** `arbormoosetreecare` (this becomes your URL)
   - **Branch:** `main`
   - **Build Command:** leave **empty**
   - **Publish Directory:** `.` (just a single dot)
5. Click **Create Static Site**.

Render builds it in under a minute and gives you a free live URL like
`https://arbormoosetreecare.onrender.com`. Every time you `git push`, Render redeploys automatically.

> Tip: the included `render.yaml` lets you skip the manual settings — on Render choose **New + → Blueprint** instead of Static Site and it reads the config for you.

### Custom domain (optional, also free)
In the Render dashboard for the site → **Settings → Custom Domains** → add the client's domain and follow the DNS instructions. Render issues a free SSL certificate automatically.

---

## Notes
- Photos are pulled from the client's existing Squarespace-hosted images. Before going live for real, download and host them in this repo (an `/images` folder) so the site doesn't depend on their old site staying up.
- The contact form opens the visitor's email app pre-filled (no backend needed). To capture submissions automatically later, wire it to a free Formspree endpoint.
