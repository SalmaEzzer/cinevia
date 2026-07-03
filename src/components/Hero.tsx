import { Info, Play, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Movie } from "../types/tmdb";
import { formatRating, formatYear } from "../utils/format";
import { backdropPlaceholder, imageUrl } from "../utils/images";
import { Button } from "./Button";
import { useSavedMovies } from "../context/SavedMoviesContext";

export const Hero = ({ movie }: { movie: Movie }) => {
  const { isInWatchlist, toggleWatchlist } = useSavedMovies();
  const backdrop = imageUrl(movie.backdrop_path, "original") || backdropPlaceholder;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdrop})` }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-champagne">
            Featured Tonight
          </p>
          <h1 className="font-display text-5xl font-black leading-tight sm:text-7xl">
            {movie.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/75">
            <span>{formatYear(movie.release_date)}</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span className="flex items-center gap-1 text-champagne">
              <Star size={16} fill="currentColor" />
              {formatRating(movie.vote_average)}
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            {movie.overview || "A new cinematic pick is waiting to be discovered."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-champagne"
            >
              <Play size={18} />
              Watch trailer
            </Link>
            <Link to={`/movie/${movie.id}`}>
              <Button variant="ghost" icon={<Info size={18} />}>
                Details
              </Button>
            </Link>
            <Button
              variant="ghost"
              icon={<Plus size={18} />}
              onClick={() => toggleWatchlist(movie)}
            >
              {isInWatchlist(movie.id) ? "Saved" : "Watchlist"}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
