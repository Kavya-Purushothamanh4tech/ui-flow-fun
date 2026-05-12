import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PhoneShell({
  children,
  className,
  noPadding,
  bg = "bg-background",
}: {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  bg?: string;
}) {
  return (
    <div className="min-h-screen w-full flex items-stretch justify-center bg-muted/40 dark">
      <div
        className={cn(
          "relative w-full max-w-[420px] min-h-screen flex flex-col overflow-hidden",
          bg,
          className,
        )}
      >
        <StatusBar />
        <div className={cn("flex-1 flex flex-col", !noPadding && "pb-24")}>{children}</div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-foreground/80">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="i-signal">●●●●</span>
        <span>5G</span>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="currentColor" opacity=".5" />
          <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
          <rect x="20" y="3.5" width="1.5" height="4" rx=".5" fill="currentColor" opacity=".5" />
        </svg>
      </div>
    </div>
  );
}
