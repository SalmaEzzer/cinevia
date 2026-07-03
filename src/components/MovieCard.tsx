import { Heart, Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSavedMovies } from "../context/SavedMoviesContext";
import type { Movie } from "../types/tmdb";
import { formatRating, formatYear } from "../utils/format";
import { imageUrl, posterPlaceholder } from "../utils/images";

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const { isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist } =
    useSavedMovies();

  return (
    <motion.article
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-glass backdrop-blur-xl"
    >
      <Link to={`/movie/${movie.id}`} aria-label={`Open ${movie.title}`}>
        <div className="aspect-[2/3] overflow-hidden bg-white/5">
          <img
            src={imageUrl(movie.poster_path, "w500") || posterPlaceholder}
            alt={movie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-4 pt-16">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="line-clamp-2 font-display text-base font-bold">
            {movie.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between text-xs text-white/70">
          <span>{formatYear(movie.release_date)}</span>
          <span className="flex items-center gap-1 text-champagne">
            <Star size={14} fill="currentColor" />
            {formatRating(movie.vote_average)}
          </span>
        </div>
      </div>

      <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition group-hover:opacity-100">
        <button
          className={`grid size-9 place-items-center rounded-full border border-white/15 backdrop-blur-xl transition ${
            isInWatchlist(movie.id)
              ? "bg-white text-black"
              : "bg-black/50 text-white hover:bg-white/20"
          }`}
          onClick={() => toggleWatchlist(movie)}
          aria-label="Toggle watchlist"
        >
          <Plus size={16} />
        </button>
        <button
          className={`grid size-9 place-items-center rounded-full border border-white/15 backdrop-blur-xl transition ${
            isFavorite(movie.id)
              ? "bg-ember text-white"
              : "bg-black/50 text-white hover:bg-white/20"
          }`}
          onClick={() => toggleFavorite(movie)}
          aria-label="Toggle favorite"
        >
          <Heart size={16} fill={isFavorite(movie.id) ? "currentColor" : "none"} />
        </button>
      </div>
    </motion.article>
  );
};
