import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Bell, ArrowLeft } from "lucide-react";

type Role = "admin" | "user";

export const Route = createFileRoute("/notifications")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: (search.role as Role) ?? "user",
  }),
  component: Notifications,
});

function Notifications() {
  const { role } = Route.useSearch();

  const notifications = mockNotifications.filter(
    (n) => n.role === role
  );

  return (
    <PhoneShell>
      {/* HEADER */}
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-4 pb-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          {/* BACK BUTTON */}
          <Link
            to={role === "admin" ? "/admin" : "/dashboard"}
            className="size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <p className="font-semibold text-lg">Notifications</p>

          {/* BELL */}
          <div className="relative size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-orange-500 ring-2 ring-white/30" />
          </div>
        </div>

        {/* SUBTITLE */}
        <div className="relative mt-6">
          <p className="text-xs text-white/70">
            {role === "admin" ? "Admin alerts" : "Your updates"}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="relative p-4 rounded-2xl border border-border bg-gradient-to-r from-card to-primary/5 shadow-card overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-l-2xl" />

            <p className="text-sm font-semibold">{n.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {n.message}
            </p>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

/* MOCK DATA */
const mockNotifications = [
  {
    id: "1",
    role: "admin",
    title: "New violation submitted",
    message: "A red light violation needs review",
  },
  {
    id: "2",
    role: "admin",
    title: "System alert",
    message: "Queue backlog is increasing",
  },
  {
    id: "3",
    role: "user",
    title: "Payment received",
    message: "₹750 credited to your wallet",
  },
  {
    id: "4",
    role: "user",
    title: "Report approved",
    message: "Your violation report was approved",
  },
];