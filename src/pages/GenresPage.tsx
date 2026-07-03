import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Loader } from "../components/Loader";
import { MovieGrid } from "../components/MovieGrid";
import { StateView } from "../components/StateView";
import { getGenres, getMoviesByGenre } from "../services/tmdb";
import type { Genre, Movie } from "../types/tmdb";
import { getGenreTheme } from "../utils/genres";

export const GenresPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingGenres(true);
    getGenres()
      .then((items) => {
        setGenres(items);
        setSelectedGenre(items[0] || null);
      })
      .catch((genreError) =>
        setError(
          genreError instanceof Error
            ? genreError.message
            : "Could not load genres."
        )
      )
      .finally(() => setLoadingGenres(false));
  }, []);

  useEffect(() => {
    if (!selectedGenre) return;

    let active = true;
    setLoadingMovies(true);
    setError(null);

    getMoviesByGenre(selectedGenre.id)
      .then((response) => {
        if (active) setMovies(response.results);
      })
      .catch((movieError) => {
        if (active) {
          setMovies([]);
          setError(
            movieError instanceof Error
              ? movieError.message
              : "Could not load this genre."
          );
        }
      })
      .finally(() => {
        if (active) setLoadingMovies(false);
      });

    return () => {
      active = false;
    };
  }, [selectedGenre]);

  const theme = useMemo(
    () => getGenreTheme(selectedGenre?.name),
    [selectedGenre?.name]
  );

  if (loadingGenres) return <Loader label="Loading genres..." />;

  if (error && genres.length === 0) {
    return (
      <div className="px-4 py-16">
        <StateView
          type="error"
          title="Genres are offscreen"
          message={error}
        />
      </div>
    );
  }

  return (
    <section className={`min-h-screen bg-gradient-to-br ${theme.surface}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.32em] ${theme.accent}`}>
            Genre Studio
          </p>
          <h1 className="font-display text-4xl font-black sm:text-6xl">
            Browse by mood, myth, and mayhem.
          </h1>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-3">
          {genres.map((genre) => {
            const active = selectedGenre?.id === genre.id;
            return (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? theme.button
                    : "border-white/10 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            );
          })}
        </div>

        {error ? (
          <StateView type="error" title="Genre reel failed" message={error} />
        ) : null}

        {loadingMovies ? <Loader label="Curating the genre shelf..." /> : null}

        <AnimatePresence mode="wait">
          {!loadingMovies && !error ? (
            <motion.div
              key={selectedGenre?.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.3 }}
            >
              {movies.length > 0 ? (
                <MovieGrid movies={movies} />
              ) : (
                <StateView
                  title="No movies found"
                  message="This genre does not have visible results right now."
                />
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
};
