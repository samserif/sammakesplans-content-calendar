# Sammakesplans Content Calendar

A content tracker for Samantha Provenza, Travel Designer. Built with Vite + React, deployed to GitHub Pages.

**Live site:** https://samserif.github.io/sammakesplans-content-calendar/

---

## 🖥️ Starting a work session

Every time you want to work on the project, open Terminal and run:

```bash
cd ~/claude/projects/sammakesplans-content-calendar
npm run dev
```

This starts a local preview at **http://localhost:5173** — you can see changes live as you make them.

---

## 💬 Working with Claude

Open Claude and say things like:
- *"Add a new platform called TikTok with color #000000"*
- *"Add a search bar to filter by keyword"*
- *"Change the header color to navy"*
- *"Add a way to export the calendar as CSV"*

Claude will edit the files directly. You'll see changes instantly in your browser at localhost:5173.

---

## 🚀 Deploying changes to your live site

Once you're happy with changes, run these 3 commands:

```bash
cd ~/claude/projects/sammakesplans-content-calendar
git add .
git commit -m "describe what you changed"
git push
```

GitHub Actions will automatically rebuild and deploy. Live site updates in about **60 seconds**.

---

## 📋 Typical day-to-day example

1. Open Terminal → `npm run dev`
2. Open Claude → *"Update the August 20 Substack post script with this copy: ..."*
3. Check localhost:5173 to confirm it looks right
4. `git add . && git commit -m "Update August Substack copy" && git push`
5. Done — live in 60 seconds

---

## 🔄 If you work on a different Mac or need to start fresh

```bash
git clone git@github.com:samserif/sammakesplans-content-calendar.git
cd sammakesplans-content-calendar
npm install
npm run dev
```

---

## ⚠️ One thing to know about data

Content edits made **on the live site** (status changes, new posts) are saved in that browser's localStorage only — they don't sync back to the code.

Treat the seed data in `src/data/seed.js` as your source of truth. When you want a change to be permanent, ask Claude to update that file, then push.

---

## 📁 Project structure

```
src/
  App.jsx              # Main app, state, layout
  data/
    constants.js       # Brand colors, platforms, themes, statuses
    seed.js            # All content items
  components/
    CalendarView.jsx   # Monthly calendar grid
    BoardView.jsx      # Kanban board by status
    DetailPanel.jsx    # Side panel for viewing a post
    EditModal.jsx      # Modal for adding/editing a post
  hooks/
    useStorage.js      # localStorage wrapper (swap for Supabase here later)
```
