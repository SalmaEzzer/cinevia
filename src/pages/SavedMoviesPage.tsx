import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { MovieGrid } from "../components/MovieGrid";
import { StateView } from "../components/StateView";
import { useSavedMovies } from "../context/SavedMoviesContext";

export const SavedMoviesPage = ({ type }: { type: "watchlist" | "favorites" }) => {
  const { watchlist, favorites } = useSavedMovies();
  const movies = type === "watchlist" ? watchlist : favorites;
  const title = type === "watchlist" ? "Watchlist" : "Favorites";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-ember">
            Saved locally
          </p>
          <h1 className="font-display text-4xl font-black sm:text-6xl">
            {title}
          </h1>
        </div>
        <Link to="/search">
          <Button variant="ghost">Find movies</Button>
        </Link>
      </div>

      {movies.length > 0 ? (
        <MovieGrid movies={movies} />
      ) : (
        <StateView
          title={`Your ${title.toLowerCase()} is empty`}
          message="Save movies from the home page, search, genres, or detail pages. Everything persists in LocalStorage."
        />
      )}
    </section>
  );
};
