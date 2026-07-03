export const imageUrl = (
  path: string | null | undefined,
  size: "w342" | "w500" | "w780" | "w1280" | "original" = "w500"
) => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

export const posterPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%2310141f'/%3E%3Cpath d='M120 230h260v290H120z' fill='%231a2132'/%3E%3Cpath d='M160 285h180v28H160zm0 65h180v18H160zm0 42h135v18H160z' fill='%23374357'/%3E%3Ccircle cx='250' cy='455' r='54' fill='%23263045'/%3E%3C/svg%3E";

export const backdropPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1'%3E%3Cstop stop-color='%2307080d'/%3E%3Cstop offset='1' stop-color='%231d2436'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1280' height='720' fill='url(%23g)'/%3E%3Cpath d='M184 474 386 292l152 134 96-82 286 248H184z' fill='%23212a3e'/%3E%3Ccircle cx='954' cy='188' r='76' fill='%23374357'/%3E%3C/svg%3E";
