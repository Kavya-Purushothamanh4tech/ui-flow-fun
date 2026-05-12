import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { Input } from "@/components/ui/input";
import { violations } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({ component: History });

const tabs = ["All", "Pending", "Approved", "Rejected", "Paid"] as const;

function History() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const filtered = violations.filter((v) => {
    if (tab === "All") return true;
    return v.status === tab.toLowerCase();
  });

  return (
    <PhoneShell>
      <div className="px-6 pt-3 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Your activity</p>
            <h1 className="text-2xl font-bold tracking-tight">My Reports</h1>
          </div>
          <button className="size-10 rounded-2xl bg-card border border-border flex items-center justify-center shadow-sm">
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input className="h-11 pl-10 rounded-2xl bg-card text-sm" placeholder="Search by ID, vehicle, location..." />
        </div>
      </div>

      <div className="px-6 mt-1 -mx-0 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-6 -mx-6 pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "shrink-0 h-8 px-3.5 rounded-full text-xs font-semibold transition-all",
                tab === t ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-3 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((v) => (
            <Link key={v.id} to="/violation/$id" params={{ id: v.id }} className="block rounded-3xl bg-card border border-border shadow-card overflow-hidden">
              <div className="relative h-32">
                <img src={v.thumb} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3"><StatusBadge status={v.status} /></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <p className="text-xs text-white/70 font-medium">{v.id}</p>
                    <p className="font-bold leading-tight">{v.category}</p>
                  </div>
                  <span className="text-sm font-bold bg-success/90 px-2 py-1 rounded-lg">+₹{v.reward}</span>
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
                  <MapPin className="size-3.5 shrink-0" />
                  <span className="truncate">{v.location}</span>
                </div>
                <span className="text-[11px] text-muted-foreground shrink-0 ml-2">{v.date}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="size-20 mx-auto rounded-3xl bg-accent flex items-center justify-center text-3xl">📋</div>
      <p className="mt-4 font-semibold">No reports here yet</p>
      <p className="text-sm text-muted-foreground mt-1">Try a different filter.</p>
    </div>
  );
}
