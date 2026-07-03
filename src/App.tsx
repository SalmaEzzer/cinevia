import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { SavedMoviesProvider } from "./context/SavedMoviesContext";
import { GenresPage } from "./pages/GenresPage";
import { HomePage } from "./pages/HomePage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { SavedMoviesPage } from "./pages/SavedMoviesPage";
import { SearchPage } from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/genres", element: <GenresPage /> },
      { path: "/movie/:id", element: <MovieDetailsPage /> },
      { path: "/watchlist", element: <SavedMoviesPage type="watchlist" /> },
      { path: "/favorites", element: <SavedMoviesPage type="favorites" /> },
    ],
  },
]);

export const App = () => (
  <SavedMoviesProvider>
    <RouterProvider router={router} />
  </SavedMoviesProvider>
);
