# Aurel E-Commerce

Aurel is a Vite + React + Express + SQLite e-commerce demo.

## Run in VS Code

1. Open this folder in VS Code.
2. Open Terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the URL shown by Vite (normally http://localhost:5173).

`npm run dev` starts BOTH:
- the React/Vite frontend
- the Express + SQLite backend

The SQLite database is created automatically at `server/aurel.db` on first start.

## Login / Signup

Use the account icon in the top navigation.

- Create Account stores the user in SQLite.
- Sign In verifies the password against the SQLite database.
- Sessions are stored in SQLite and expire after 7 days.
- Passwords are stored as salted scrypt hashes, not plain text.

## If you still see an old database

You can safely delete `server/aurel.db` while the server is stopped. Start `npm run dev` again and the database will be recreated and the product catalog will be seeded.

## Production build

```bash
npm run build
npm run preview
```


## Windows setup

This version uses Node's built-in SQLite support (`node:sqlite`), so it does not require `better-sqlite3`, Visual Studio C++ Build Tools, or node-gyp. Node.js 22+ is required (Node 24 recommended).

Run: `npm install` then `npm run dev`. The command starts both the Express API and Vite.

The local SQLite database is created automatically at `server/aurel.db` and contains products, reviews, orders, newsletter subscribers, users, and sessions.
