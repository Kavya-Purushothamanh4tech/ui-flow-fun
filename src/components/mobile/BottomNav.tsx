import { Link, useLocation } from "@tanstack/react-router";
import { Home, FileText, Plus, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav({ role = "user" }: { role?: "user" | "admin" }) {
  const { pathname } = useLocation();

  const userItems = [
    { to: "/dashboard", label: "Home", icon: Home },
    { to: "/history", label: "Tickets", icon: FileText },
    { to: "/submit", label: "Report", icon: Plus, primary: true },
    { to: "/payouts", label: "Payouts", icon: Wallet },
    { to: "/profile", label: "Profile", icon: User },
  ];

  const adminItems = [
    { to: "/admin", label: "Home", icon: Home },
    { to: "/admin/violations", label: "Violations", icon: FileText },
    { to: "/submit", label: "Submit", icon: Plus, primary: true },
    { to: "/admin/payments", label: "Payments", icon: Wallet },
    { to: "/admin/profile", label: "Profile", icon: User },
  ];

  const items = role === "admin" ? adminItems : userItems;

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] z-40 px-4 pb-4 pointer-events-none">
      <nav className="pointer-events-auto rounded-3xl bg-card/95 backdrop-blur-xl border border-border shadow-elevated px-2 py-2 flex items-center justify-between">
        {items.map((it) => {
          const Icon = it.icon;

          const active =
            pathname === it.to || pathname.startsWith(it.to + "/");

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
                <span className="text-[10px] font-medium text-muted-foreground">
                  {it.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-colors min-w-[56px]",
                active ? "text-primary" : "text-muted-foreground"
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