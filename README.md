# Cinevia

Cinevia is a cinematic movie explorer built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, and the TMDB API. It helps users discover trending, popular, top rated, upcoming, and genre-based movies with a polished dark interface.

## Features

- Cinematic home page with a dynamic featured movie backdrop
- Trending, popular, top rated, and upcoming movie sections
- Movie search by title with loading, empty, and error states
- Detailed movie pages with poster, backdrop, metadata, genres, overview, cast, trailer, and similar movies
- Genre browsing with dynamic visual themes
- Watchlist and favorites stored in LocalStorage
- Trailer modal using TMDB video data with a graceful fallback message
- Responsive glassmorphism UI with Framer Motion page, card, modal, search, and genre transitions
- Clean TMDB service layer and TypeScript types

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- TMDB API
- LocalStorage

## Screenshots

Add screenshots here after deploying or running the app locally.

## Installation

```bash
npm install
npm run dev
```

The app will be available at the local URL shown by Vite, usually `http://localhost:5173`.

## Environment Variables

Create a `.env` file in the project root:

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

Do not commit a real API key. Use `.env.example` as the template.

You can get an API key from [The Movie Database](https://www.themoviedb.org/settings/api).

After changing `.env`, stop the dev server with `Ctrl + C` and run `npm run dev` again. Vite only reads environment variables when the server starts.

## Live Demo

[Live demo](https://cinevia-by-salma.netlify.app/)

## Future Improvements

- Add pagination or infinite scroll for search and genre pages
- Add person and actor detail pages
- Add richer filters for release year, rating, and language
- Add optional account sync while keeping LocalStorage as an offline fallback
- Add screenshot assets for the README after deployment
