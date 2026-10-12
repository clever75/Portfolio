import type { ReactNode } from "react";
import { Minus, Square, X } from "lucide-react";

type AppWindowProps = {
  variant: "web" | "desktop";
  title: string;
  children: ReactNode;
  className?: string;
};

export default function AppWindow({
  variant,
  title,
  children,
  className = "",
}: AppWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-trait bg-white shadow-sm ${className}`}
    >
      <div className="flex h-10 items-center gap-3 border-b border-trait bg-fond-doux px-4">
        {variant === "web" ? (
          <>
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-indigo/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-indigo/30" />
            </div>
            <div className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-encre-douce">
              {title}
            </div>
          </>
        ) : (
          <>
            <span className="min-w-0 flex-1 truncate text-xs font-medium text-encre-douce">
              {title}
            </span>
            <div
              className="flex items-center gap-2 text-encre-douce"
              aria-hidden="true"
            >
              <Minus size={14} />
              <Square size={12} />
              <X size={14} />
            </div>
          </>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}