import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { Input } from "@/components/ui/input";
import { violations } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/admin/violations"
)({
  validateSearch: (search) => ({
    tab: (search.tab as string) || "queue",
  }),
  component: AdminViolations,
});

const tabs = [
  "Queue",
  "Approved",
  "Rejected",
  "All",
] as const;

function AdminViolations() {
  const search = Route.useSearch();

  const getTabFromSearch = () => {
    switch (search.tab?.toLowerCase()) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "all":
        return "All";
      default:
        return "Queue";
    }
  };

  const [tab, setTab] = useState<
    (typeof tabs)[number]
  >(getTabFromSearch());

  // update tab whenever URL search changes
  useEffect(() => {
    setTab(getTabFromSearch());
  }, [search.tab]);

  const filtered = violations.filter((v) => {
    if (tab === "Queue") {
      return (
        v.status === "pending" ||
        v.status === "review"
      );
    }

    if (tab === "Approved") {
      return (
        v.status === "approved" ||
        v.status === "paid"
      );
    }

    if (tab === "Rejected") {
      return v.status === "rejected";
    }

    return true;
  });

  return (
    <PhoneShell>
      {/* Header */}
      <div className="px-6 pt-2 pb-2 flex items-center justify-between">
        <Link
          to="/admin"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <p className="font-semibold">
          Violations
        </p>

        <button className="size-10 rounded-full hover:bg-accent flex items-center justify-center">
          <SlidersHorizontal className="size-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

          <Input
            className="h-11 pl-10 rounded-2xl bg-card text-sm"
            placeholder="Search reports, plates, reporters..."
          />
        </div>

        {/* Tabs */}
        <div className="mt-3 -mx-6 px-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 pb-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold transition-all",
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="px-6 mt-3 space-y-2.5 pb-8">
        {filtered.map((v) => (
          <Link
            key={v.id}
            to="/violation/$id"
            params={{ id: v.id }}
            className="flex gap-3 p-2.5 rounded-2xl bg-card border border-border shadow-card"
          >
            <img
              src={v.thumb}
              alt=""
              loading="lazy"
              className="size-20 rounded-xl object-cover"
            />

            <div className="flex-1 min-w-0 py-0.5">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold text-sm truncate">
                  {v.category}
                </p>

                <StatusBadge status={v.status} />
              </div>

              <p className="text-[11px] text-muted-foreground truncate mt-0.5 flex items-center gap-1">
                <MapPin className="size-3 shrink-0" />
                {v.location}
              </p>

              <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {v.vehicle} · {v.reporter}
              </p>

              <p className="text-[11px] text-muted-foreground mt-0.5">
                {v.date}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </PhoneShell>
  );
}