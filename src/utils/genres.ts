export const genreThemeMap: Record<
  string,
  {
    label: string;
    surface: string;
    accent: string;
    button: string;
  }
> = {
  Action: {
    label: "red / black cinematic",
    surface: "from-red-950 via-neutral-950 to-black",
    accent: "text-red-300",
    button: "border-red-400/40 bg-red-500/20 text-red-100",
  },
  Romance: {
    label: "soft pink / purple",
    surface: "from-pink-950 via-purple-950 to-neutral-950",
    accent: "text-pink-200",
    button: "border-pink-300/40 bg-pink-500/20 text-pink-100",
  },
  "Science Fiction": {
    label: "blue / violet futuristic",
    surface: "from-blue-950 via-violet-950 to-black",
    accent: "text-cyan-200",
    button: "border-cyan-300/40 bg-cyan-500/20 text-cyan-100",
  },
  Horror: {
    label: "dark green / black",
    surface: "from-emerald-950 via-neutral-950 to-black",
    accent: "text-emerald-300",
    button: "border-emerald-400/40 bg-emerald-500/20 text-emerald-100",
  },
  Fantasy: {
    label: "gold / magical",
    surface: "from-amber-950 via-stone-950 to-black",
    accent: "text-amber-200",
    button: "border-amber-300/40 bg-amber-500/20 text-amber-100",
  },
  Comedy: {
    label: "yellow / playful",
    surface: "from-yellow-900 via-orange-950 to-neutral-950",
    accent: "text-yellow-200",
    button: "border-yellow-300/40 bg-yellow-500/20 text-yellow-100",
  },
  Drama: {
    label: "warm neutral",
    surface: "from-stone-900 via-neutral-950 to-black",
    accent: "text-stone-200",
    button: "border-stone-300/30 bg-stone-500/20 text-stone-100",
  },
  Animation: {
    label: "colorful bright",
    surface: "from-sky-950 via-fuchsia-950 to-orange-950",
    accent: "text-sky-100",
    button: "border-sky-300/40 bg-sky-500/20 text-sky-100",
  },
};

export const getGenreTheme = (genreName?: string) =>
  (genreName && genreThemeMap[genreName]) || {
    label: "cinematic",
    surface: "from-neutral-950 via-slate-950 to-black",
    accent: "text-champagne",
    button: "border-white/20 bg-white/10 text-white",
  };
