import { AlertTriangle, Clapperboard } from "lucide-react";
import { Button } from "./Button";

interface StateViewProps {
  title: string;
  message: string;
  type?: "empty" | "error";
  actionLabel?: string;
  onAction?: () => void;
}

export const StateView = ({
  title,
  message,
  type = "empty",
  actionLabel,
  onAction,
}: StateViewProps) => {
  const Icon = type === "error" ? AlertTriangle : Clapperboard;

  return (
    <div className="mx-auto flex min-h-[320px] max-w-xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-glass backdrop-blur-xl">
      <div className="mb-5 grid size-14 place-items-center rounded-full bg-white/10 text-champagne">
        <Icon size={26} />
      </div>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/65">{message}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};
