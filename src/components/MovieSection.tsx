import type { Movie } from "../types/tmdb";
import { MovieCard } from "./MovieCard";

interface MovieSectionProps {
  title: string;
  eyebrow?: string;
  movies: Movie[];
}

export const MovieSection = ({ title, eyebrow, movies }: MovieSectionProps) => (
  <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-ember">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
    </div>
    <div className="grid grid-flow-col auto-cols-[170px] gap-4 overflow-x-auto pb-4 sm:auto-cols-[210px]">
      {movies.slice(0, 12).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </section>
);
