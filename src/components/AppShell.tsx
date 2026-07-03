import { Film, Heart, Search, Sparkles, Tv } from "lucide-react";
import { useLayoutEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: Film },
  { to: "/search", label: "Search", icon: Search },
  { to: "/genres", label: "Genres", icon: Sparkles },
  { to: "/watchlist", label: "Watchlist", icon: Tv },
  { to: "/favorites", label: "Favorites", icon: Heart },
];

export const AppShell = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-ink text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-ember text-white shadow-glow">
              <Film size={20} />
            </span>
            <span className="font-display text-xl font-bold tracking-wide">
              Cinevia
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-white text-black"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="min-h-[calc(100vh-4rem)] pt-16">
        <Outlet />
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-2xl md:hidden">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] ${
                isActive ? "bg-white text-black" : "text-white/65"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
