# MERN Blog (full website)

React (Vite) + Node/Express + MongoDB (view data in MongoDB Compass)

## Before you start
1. MongoDB Community Server must be running.
   Compass should connect to: mongodb://127.0.0.1:27017
2. Node.js (LTS) installed.

## Run (two terminals)
Terminal 1 (backend):
    cd server
    npm install
    npm run dev
  -> "MongoDB connected" and "Server running on http://localhost:5000"

Terminal 2 (frontend):
    cd client
    npm install
    npm run dev
  -> open http://localhost:5173

## Demo content
On first start the server adds sample posts automatically.
Demo login:  demo@blog.com  /  demo123

## Data in Compass
Database: mern_blog  ->  collections: users, posts, comments

## Features
- Home with hero, search and category filter
- Read full posts, reading time
- Sign up / login (JWT, hashed passwords)
- Write, edit, delete your own posts
- Comments (logged-in users), delete your own comments
- 5 color themes + light/dark toggle, animated gradient hero, floating shapes and buttons
- Tabbed sections (Features, How it works, FAQ), stats, testimonials, newsletter, contact tab
- Responsive design

Change JWT_SECRET in server/.env before putting the site online.
