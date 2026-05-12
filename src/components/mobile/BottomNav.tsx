import { Link, useLocation } from "@tanstack/react-router";
import { Home, FileText, Plus, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { to: string; label: string; icon: typeof Home; primary?: boolean }[] = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/history", label: "Reports", icon: FileText },
  { to: "/submit", label: "Report", icon: Plus, primary: true },
  { to: "/payouts", label: "Payouts", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 px-4 pb-4 pointer-events-none">
      <nav className="pointer-events-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-elevated px-2 py-2 flex items-center justify-between">
        {items.map((it) => {
          const active = pathname === it.to;
          const Icon = it.icon;
          if (it.primary) {
            return (
              <Link
                key={it.to}
                to={it.to}
                className="-mt-8 flex flex-col items-center gap-1"
              >
                <span className="h-14 w-14 rounded-2xl bg-gradient-primary shadow-elevated flex items-center justify-center text-primary-foreground animate-pulse-glow">
                  <Icon className="!size-6" />
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">{it.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-colors min-w-[56px]",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("!size-5 transition-transform", active && "scale-110")} />
              <span className="text-[10px] font-medium">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
