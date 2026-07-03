export const Loader = ({ label = "Loading the reels..." }: { label?: string }) => (
  <div className="grid min-h-[calc(100vh-4rem)] place-items-center px-4">
    <div className="flex flex-col items-center gap-4 text-white/70">
      <div className="size-14 animate-spin rounded-full border-2 border-white/20 border-t-ember" />
      <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
        {label}
      </span>
    </div>
  </div>
);
