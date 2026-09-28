# Deploying Aurel to Vercel

The local Aurel backend uses SQLite, but Vercel serverless functions cannot be used as a persistent SQLite database. This version therefore uses:

- A Vercel serverless `/api/products` catalog endpoint for products.
- Supabase Auth for persistent signup/login in production.
- The existing Express + SQLite backend for local VS Code development.

## 1. Create a Supabase project
Create a project at https://supabase.com/ and open its Project Settings -> API.
Copy the Project URL and the anon/public key.

## 2. Add Vercel environment variables
In Vercel -> your Aurel project -> Settings -> Environment Variables, add:

SUPABASE_URL = your Project URL
SUPABASE_ANON_KEY = your anon/public key

Add them for Production (and Preview if you want preview deployments to have login too).

## 3. Redeploy
Push this project to GitHub or upload the folder to Vercel and redeploy. No Vercel build command change is needed; `npm run build` is used automatically.

## 4. Test
Open:
- /api/products
- /api/health
- the home/shop page

Products should load even though the local Express server is not running.

Signup/login will use Supabase in production. Local `npm run dev` continues to use the SQLite backend.
