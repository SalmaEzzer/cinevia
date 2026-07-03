export const formatYear = (date: string) =>
  date ? new Date(date).getFullYear().toString() : "TBA";

export const formatDate = (date: string) =>
  date
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(date))
    : "TBA";

export const formatRuntime = (minutes: number | null) => {
  if (!minutes) return "Runtime TBA";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatRating = (rating: number) =>
  rating > 0 ? rating.toFixed(1) : "NR";
