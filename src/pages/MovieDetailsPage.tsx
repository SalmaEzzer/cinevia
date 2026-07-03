import { Calendar, Clock, Heart, Play, Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Loader } from "../components/Loader";
import { MovieSection } from "../components/MovieSection";
import { StateView } from "../components/StateView";
import { TrailerModal } from "../components/TrailerModal";
import { useSavedMovies } from "../context/SavedMoviesContext";
import { useAsync } from "../hooks/useAsync";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getSimilarMovies,
} from "../services/tmdb";
import type { CastMember, Movie, MovieDetails, Video } from "../types/tmdb";
import {
  formatDate,
  formatRating,
  formatRuntime,
  formatYear,
} from "../utils/format";
import {
  backdropPlaceholder,
  imageUrl,
  posterPlaceholder,
} from "../utils/images";

interface DetailsData {
  details: MovieDetails;
  cast: CastMember[];
  videos: Video[];
  similar: Movie[];
}

export const MovieDetailsPage = () => {
  const { id } = useParams();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { isFavorite, isInWatchlist, toggleFavorite, toggleWatchlist } =
    useSavedMovies();

  const { data, error, loading, refetch } = useAsync<DetailsData>(async () => {
    if (!id) throw new Error("Movie id is missing.");

    const [details, credits, videos, similar] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getMovieVideos(id),
      getSimilarMovies(id),
    ]);

    return {
      details,
      cast: credits.cast.slice(0, 10),
      videos: videos.results,
      similar: similar.results,
    };
  }, [id]);

  const trailer = useMemo(
    () =>
      data?.videos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) || data?.videos.find((video) => video.site === "YouTube"),
    [data?.videos]
  );

  if (loading) return <Loader />;

  if (error || !data) {
    return (
      <div className="px-4 py-16">
        <StateView
          type="error"
          title="This title slipped out of frame"
          message={error || "We could not load the movie details."}
          actionLabel="Try again"
          onAction={refetch}
        />
      </div>
    );
  }

  const { details, cast, similar } = data;
  const movieForStorage: Movie = {
    id: details.id,
    title: details.title,
    overview: details.overview,
    poster_path: details.poster_path,
    backdrop_path: details.backdrop_path,
    release_date: details.release_date,
    vote_average: details.vote_average,
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              imageUrl(details.backdrop_path, "original") || backdropPlaceholder
            })`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[300px_1fr] lg:px-8 lg:py-24">
          <img
            src={imageUrl(details.poster_path, "w500") || posterPlaceholder}
            alt={details.title}
            className="w-full max-w-[300px] rounded-3xl border border-white/10 object-cover shadow-glass"
          />
          <div className="max-w-4xl self-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-champagne">
              {details.tagline || formatYear(details.release_date)}
            </p>
            <h1 className="font-display text-4xl font-black sm:text-6xl">
              {details.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(details.release_date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {formatRuntime(details.runtime)}
              </span>
              <span className="flex items-center gap-2 text-champagne">
                <Star size={16} fill="currentColor" />
                {formatRating(details.vote_average)}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {details.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/75">
              {details.overview || "No overview is available for this movie yet."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button icon={<Play size={18} />} onClick={() => setTrailerOpen(true)}>
                Trailer
              </Button>
              <Button
                variant="ghost"
                icon={<Plus size={18} />}
                onClick={() => toggleWatchlist(movieForStorage)}
              >
                {isInWatchlist(details.id) ? "Saved" : "Watchlist"}
              </Button>
              <Button
                variant="ghost"
                icon={<Heart size={18} />}
                onClick={() => toggleFavorite(movieForStorage)}
              >
                {isFavorite(details.id) ? "Favorited" : "Favorite"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-5 font-display text-2xl font-bold">Cast</h2>
        {cast.length > 0 ? (
          <div className="grid grid-flow-col auto-cols-[140px] gap-4 overflow-x-auto pb-4">
            {cast.map((person) => (
              <article
                key={`${person.id}-${person.character}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06]"
              >
                <img
                  src={imageUrl(person.profile_path, "w342") || posterPlaceholder}
                  alt={person.name}
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-3">
                  <h3 className="line-clamp-1 text-sm font-bold">{person.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/55">
                    {person.character}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-white/60">Cast details are unavailable.</p>
        )}
      </section>

      {similar.length > 0 ? (
        <MovieSection title="Similar Movies" movies={similar} />
      ) : null}

      <TrailerModal
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        video={trailer}
      />
    </>
  );
};
