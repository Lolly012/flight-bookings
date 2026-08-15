import * as React from "react";

export function Button({ children, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-full bg-[#0b1f44] px-4 py-2 text-sm font-semibold text-white ${className}`}
    >
      {children}
    </button>
  );
}
