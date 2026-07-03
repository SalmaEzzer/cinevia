import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { MovieGrid } from "../components/MovieGrid";
import { StateView } from "../components/StateView";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/tmdb";
import type { Movie } from "../types/tmdb";

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query.trim(), 450);

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setError(null);
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    searchMovies(debouncedQuery)
      .then((response) => {
        if (active) setMovies(response.results);
      })
      .catch((searchError) => {
        if (active) {
          setError(
            searchError instanceof Error
              ? searchError.message
              : "Search failed. Please try again."
          );
          setMovies([]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ember">
          Movie Search
        </p>
        <h1 className="font-display text-4xl font-black sm:text-6xl">
          Find your next scene-stealer.
        </h1>
      </div>

      <div className="relative mb-10">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/45"
          size={22}
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by movie title..."
          className="w-full rounded-3xl border border-white/10 bg-white/[0.07] py-5 pl-14 pr-5 text-lg outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-ember/60 focus:bg-white/[0.1]"
        />
      </div>

      {loading ? <Loader label="Searching the archive..." /> : null}

      {!loading && error ? (
        <StateView
          type="error"
          title="Search hit static"
          message={error}
          actionLabel="Clear search"
          onAction={() => setQuery("")}
        />
      ) : null}

      {!loading && !error && debouncedQuery && movies.length === 0 ? (
        <StateView
          title="No matches found"
          message="Try another title, spelling, or a broader search term."
        />
      ) : null}

      {!loading && !error && movies.length > 0 ? <MovieGrid movies={movies} /> : null}

      {!loading && !error && !debouncedQuery ? (
        <StateView
          title="Start with a title"
          message="Type a movie name above and Cinevia will search TMDB in real time."
        />
      ) : null}
    </section>
  );
};
