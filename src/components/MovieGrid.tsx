import { motion } from "framer-motion";
import type { Movie } from "../types/tmdb";
import { MovieCard } from "./MovieCard";

export const MovieGrid = ({ movies }: { movies: Movie[] }) => (
  <motion.div
    layout
    className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
  >
    {movies.map((movie, index) => (
      <motion.div
        key={movie.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.035, 0.35) }}
      >
        <MovieCard movie={movie} />
      </motion.div>
    ))}
  </motion.div>
);
