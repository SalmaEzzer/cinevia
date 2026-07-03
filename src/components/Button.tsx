import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  variant?: "primary" | "ghost" | "danger";
}

export const Button = ({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-white text-black hover:bg-champagne",
    ghost: "border border-white/15 bg-white/10 text-white hover:bg-white/20",
    danger: "border border-red-400/40 bg-red-500/20 text-red-100 hover:bg-red-500/30",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};
