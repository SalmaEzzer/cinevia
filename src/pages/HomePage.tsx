import { Hero } from "../components/Hero";
import { Loader } from "../components/Loader";
import { MovieSection } from "../components/MovieSection";
import { StateView } from "../components/StateView";
import {
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../services/tmdb";
import type { Movie } from "../types/tmdb";
import { useAsync } from "../hooks/useAsync";

interface HomeData {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const HomePage = () => {
  const { data, error, loading, refetch } = useAsync<HomeData>(async () => {
    const [trending, popular, topRated, upcoming] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
    ]);

    return {
      trending: trending.results,
      popular: popular.results,
      topRated: topRated.results,
      upcoming: upcoming.results,
    };
  }, []);

  if (loading) return <Loader />;

  if (error || !data) {
    return (
      <div className="px-4 py-16">
        <StateView
          type="error"
          title="The projector missed its cue"
          message={error || "We could not load movies right now."}
          actionLabel="Try again"
          onAction={refetch}
        />
      </div>
    );
  }

  const featured = data.trending[0] || data.popular[0];

  return (
    <>
      {featured ? <Hero movie={featured} /> : null}
      <MovieSection
        eyebrow="This week"
        title="Trending Movies"
        movies={data.trending}
      />
      <MovieSection title="Popular Movies" movies={data.popular} />
      <MovieSection title="Top Rated Movies" movies={data.topRated} />
      <MovieSection title="Upcoming Movies" movies={data.upcoming} />
    </>
  );
};
