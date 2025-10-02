# Minesweeper Online - Implementation Plan

This document describes the step-by-step implementation plan for building an online Minesweeper game on a 10x10 grid using **React**, **Next.js**, **Prisma**, **MySQL**, **NextAuth**, and **Tailwind CSS** for styling.  
The game will allow users to register/login, play Minesweeper, submit their scores, and view a global leaderboard.

---

## 1. Project Setup

1. **Clone the Repository**

   - Repo: [ai-vecka-1-workshop-vibe-coding](https://github.com/Chas-Henrik/ai-vecka-1-workshop-vibe-coding/tree/main/next-js-app)
   - Navigate to the Next.js app folder:
     ```bash
     cd next-js-app
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

````

3. **Set up GitHub (if not already)**

   * Ensure a `.gitignore` file excludes `node_modules`, `.env`, etc.

4. **Environment Variables**

   * Create `.env` file with:

     ```
     DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
     NEXTAUTH_SECRET="your-random-secret"
     NEXTAUTH_URL="http://localhost:3000"
     ```

---

## 2. Add Tailwind CSS

1. **Install Tailwind**

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Configure `tailwind.config.js`**

   ```js
   module.exports = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx,mdx}",
       "./components/**/*.{js,ts,jsx,tsx,mdx}",
       "./app/**/*.{js,ts,jsx,tsx,mdx}"
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. **Update Global Styles**
   In `styles/globals.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Verify**

   * Test in `pages/index.tsx`:

     ```tsx
     <h1 className="text-4xl font-bold text-blue-600">Tailwind Works 🚀</h1>
     ```

---

## 3. Database Design (Prisma + MySQL)

1. **Initialize Prisma**

   ```bash
   npx prisma init
   ```

2. **Schema Models (`prisma/schema.prisma`)**

   ```prisma
   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     name      String?
     password  String
     scores    Score[]
     createdAt DateTime @default(now())
   }

   model Score {
     id        Int      @id @default(autoincrement())
     value     Int
     user      User     @relation(fields: [userId], references: [id])
     userId    Int
     createdAt DateTime @default(now())
   }
   ```

3. **Run Migration**

   ```bash
   npx prisma migrate dev --name init
   ```

---

## 4. Authentication (NextAuth)

1. **Install NextAuth (already in deps)**

   * Create file: `pages/api/auth/[...nextauth].ts`

2. **Providers**

   * Use **Credentials Provider** for email/password.

3. **Password Hashing**

   * Install bcrypt:

     ```bash
     npm install bcrypt
     ```
   * Hash passwords on registration.

4. **Registration API**

   * `pages/api/auth/register.ts`
   * Accepts `email`, `password`, `name`.
   * Stores hashed password in DB.

5. **Login**

   * NextAuth validates credentials against DB.
   * Returns session with `id`, `email`, `name`.

---

## 5. Game Logic (Frontend)

1. **GameBoard Component**

   * `components/GameBoard.tsx`
   * 10x10 grid (`grid grid-cols-10 gap-1` with Tailwind).
   * Each cell: hidden, revealed, flagged.
   * Reveal logic:

     * Show number of adjacent mines.
     * Recursive flood-fill for empty cells.

2. **Scoring Rules**

   * +1 per safe reveal
   * -5 for hitting a mine
   * +50 bonus for winning

3. **State Management**

   * Local React state or Zustand.
   * Track revealed/flagged cells, mine positions, score, game over status.

4. **UI/UX**

   * Tailwind for styles:

     * Hidden cell: `bg-gray-300 hover:bg-gray-400`
     * Revealed: `bg-white`
     * Flagged: `bg-red-500`
   * Buttons: Restart, Submit Score.
   * Show score + timer.

---

## 6. API Routes

1. **Save Score**

   * `POST /api/score`
   * Requires authentication.
   * Body: `{ score: number }`
   * Saves score in DB.

2. **Get Highscores**

   * `GET /api/highscores`
   * Returns top 10 scores with user name.

---

## 7. Leaderboard (Frontend)

1. **Leaderboard Component**

   * `components/Leaderboard.tsx`
   * Fetch from `/api/highscores`.
   * Show rank, username, score.

2. **Integration**

   * Add `pages/leaderboard.tsx`
   * Link from main game UI.

---

## 8. Deployment

1. **Database**

   * Use PlanetScale, Railway, or AWS RDS for MySQL.

2. **App Deployment**

   * Deploy to Vercel.
   * Configure `DATABASE_URL`, `NEXTAUTH_SECRET`, etc. in Vercel dashboard.

3. **Production Ready**

   * HTTPS enforced.
   * Input validation.
   * Error handling for all API routes.

---

## 9. Enhancements (Future Work)

* Add difficulty levels (16x16, 30x16).
* Win/loss stats per user.
* OAuth login (Google, GitHub).
* Animations & sound effects.
* Mobile-responsive grid.

---

## 10. Checklist

* [ ] Repo cloned and Next.js installed
* [ ] Tailwind CSS integrated
* [ ] Database schema defined and migrated
* [ ] Authentication with NextAuth complete
* [ ] Game board logic implemented
* [ ] Scoring system added
* [ ] API routes for saving/fetching scores
* [ ] Leaderboard UI built
* [ ] Deployment to Vercel with MySQL DB
* [ ] Testing & bug fixing


````
