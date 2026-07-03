import type {
  CreditsResponse,
  Genre,
  Movie,
  MovieDetails,
  PagedResponse,
  VideosResponse,
} from "../types/tmdb";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = (import.meta.env.VITE_TMDB_API_KEY as string | undefined)?.trim();
const REQUEST_TIMEOUT_MS = 12000;

type QueryParams = Record<string, string | number | undefined>;

const createUrl = (path: string, params: QueryParams = {}) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error(
      "Missing TMDB API key. Add your real VITE_TMDB_API_KEY to .env, then restart the dev server."
    );
  }

  const url = new URL(`${API_BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "en-US");

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
};

const request = async <T>(path: string, params?: QueryParams): Promise<T> => {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(createUrl(path, params), {
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("TMDB took too long to respond. Please try again.");
    }

    throw new Error("Could not reach TMDB. Check your connection and API key.");
  } finally {
    window.clearTimeout(timeout);
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "TMDB rejected the API key. Check .env, save it, and restart npm run dev."
      );
    }

    throw new Error("TMDB request failed. Please try again in a moment.");
  }

  return response.json() as Promise<T>;
};

export const getTrendingMovies = () =>
  request<PagedResponse<Movie>>("/trending/movie/week");

export const getPopularMovies = () =>
  request<PagedResponse<Movie>>("/movie/popular");

export const getTopRatedMovies = () =>
  request<PagedResponse<Movie>>("/movie/top_rated");

export const getUpcomingMovies = () =>
  request<PagedResponse<Movie>>("/movie/upcoming");

export const searchMovies = (query: string, page = 1) =>
  request<PagedResponse<Movie>>("/search/movie", {
    query,
    page,
    include_adult: "false",
  });

export const getMovieDetails = (movieId: number | string) =>
  request<MovieDetails>(`/movie/${movieId}`);

export const getMovieCredits = (movieId: number | string) =>
  request<CreditsResponse>(`/movie/${movieId}/credits`);

export const getMovieVideos = (movieId: number | string) =>
  request<VideosResponse>(`/movie/${movieId}/videos`);

export const getSimilarMovies = (movieId: number | string) =>
  request<PagedResponse<Movie>>(`/movie/${movieId}/similar`);

export const getGenres = async () => {
  const response = await request<{ genres: Genre[] }>("/genre/movie/list");
  return response.genres;
};

export const getMoviesByGenre = (genreId: number | string, page = 1) =>
  request<PagedResponse<Movie>>("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    page,
  });
