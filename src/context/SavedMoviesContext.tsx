/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Movie } from "../types/tmdb";

type SavedMovie = Movie;

interface SavedMoviesContextValue {
  watchlist: SavedMovie[];
  favorites: SavedMovie[];
  isInWatchlist: (movieId: number) => boolean;
  isFavorite: (movieId: number) => boolean;
  toggleWatchlist: (movie: SavedMovie) => void;
  toggleFavorite: (movie: SavedMovie) => void;
}

const SavedMoviesContext = createContext<SavedMoviesContextValue | undefined>(
  undefined
);

const readStorage = (key: string): SavedMovie[] => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as SavedMovie[]) : [];
  } catch {
    return [];
  }
};

const writeStorage = (key: string, value: SavedMovie[]) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const toggleMovie = (movies: SavedMovie[], movie: SavedMovie) =>
  movies.some((item) => item.id === movie.id)
    ? movies.filter((item) => item.id !== movie.id)
    : [movie, ...movies];

export const SavedMoviesProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<SavedMovie[]>(() =>
    readStorage("cinevia-watchlist")
  );
  const [favorites, setFavorites] = useState<SavedMovie[]>(() =>
    readStorage("cinevia-favorites")
  );

  useEffect(() => writeStorage("cinevia-watchlist", watchlist), [watchlist]);
  useEffect(() => writeStorage("cinevia-favorites", favorites), [favorites]);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.some((movie) => movie.id === movieId),
    [watchlist]
  );

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((movie) => movie.id === movieId),
    [favorites]
  );

  const toggleWatchlist = useCallback((movie: SavedMovie) => {
    setWatchlist((current) => toggleMovie(current, movie));
  }, []);

  const toggleFavorite = useCallback((movie: SavedMovie) => {
    setFavorites((current) => toggleMovie(current, movie));
  }, []);

  const value = useMemo(
    () => ({
      watchlist,
      favorites,
      isInWatchlist,
      isFavorite,
      toggleWatchlist,
      toggleFavorite,
    }),
    [
      watchlist,
      favorites,
      isInWatchlist,
      isFavorite,
      toggleWatchlist,
      toggleFavorite,
    ]
  );

  return (
    <SavedMoviesContext.Provider value={value}>
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);

  if (!context) {
    throw new Error("useSavedMovies must be used inside SavedMoviesProvider");
  }

  return context;
};
