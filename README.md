CodeChef VIT — Weekly Challenge 1 (Frontend)
=================================================

Stack: Next.js (App Router) + TypeScript + Tailwind CSS

Pages
-----
- Landing: `/` — title and CTA to play
- Game: `/game` — tap the moving target for 30s to score points
- Game Over: `/game-over?score=NUMBER` — show score, save to leaderboard
- Leaderboard: `/leaderboard` — top local scores (localStorage)

Run locally
-----------

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Notes
-----
- Leaderboard is stored in browser `localStorage` under key `leaderboard:v1`.
- No backend required for the game portion.
