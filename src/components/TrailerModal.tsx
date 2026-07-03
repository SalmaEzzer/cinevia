import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { Video } from "../types/tmdb";

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  video?: Video;
}

export const TrailerModal = ({ open, onClose, video }: TrailerModalProps) => (
  <AnimatePresence>
    {open ? (
      <motion.div
        className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-glass"
        >
          <button
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-black/70 text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
            onClick={onClose}
            aria-label="Close trailer"
          >
            <X size={20} />
          </button>
          {video ? (
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
                title={video.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="grid min-h-[360px] place-items-center p-8 text-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember">
                  Trailer Unavailable
                </p>
                <h2 className="mt-4 font-display text-3xl font-bold">
                  The curtain is still closed.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/65">
                  TMDB does not have a playable YouTube trailer for this title
                  yet, but the rest of the movie details are ready to explore.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
);
