import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  CircleDollarSign,
  ArrowRight,
  Camera,
} from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { violations } from "@/lib/mock";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const recent = violations.slice(0, 3);
  return (
    <PhoneShell>
      {/* Hero header */}
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-3 pb-24 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center font-semibold">
              MC
            </div>
            <div>
              <p className="text-[11px] text-white/70">Good morning</p>
              <p className="text-sm font-semibold">Michael Carter</p>
            </div>
          </div>
          <Link
            to="/notifications"
            search={{ role: "user" }}
            className="relative size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center"
          >
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-warning ring-2 ring-white/30" />
          </Link>
        </div>

        <div className="relative mt-6">
          <p className="text-xs text-white/70 font-medium">Total earnings</p>
          <div className="flex items-end gap-2 mt-1">
            <h2 className="text-4xl font-bold tracking-tight">$3,750</h2>
            <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-success/20 text-success-foreground px-2 py-0.5 text-[11px] font-semibold">
              <TrendingUp className="size-3" /> +12%
            </span>
          </div>
          <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
            <MapPin className="size-3" /> New York · Active patrol zone
          </p>
        </div>
      </div>

      {/* Stat cards floating */}
      <div className="px-6 -mt-16 grid grid-cols-3 gap-2.5 relative z-10">
        <Stat
          icon={<Clock className="size-4" />}
          label="Pending"
          value="4"
          tint="bg-warning/15 text-warning-foreground/90"
        />
        <Stat
          icon={<CheckCircle2 className="size-4" />}
          label="Approved"
          value="18"
          tint="bg-success/15 text-success"
        />
        <Stat
          icon={<ShieldCheck className="size-4" />}
          label="Tickets"
          value="24"
          tint="bg-primary/15 text-primary"
        />
      </div>

      {/* Quick actions */}
      <div className="px-6 mt-6">
        <h3 className="text-sm font-bold mb-3">Quick actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/submit"
            search={{ role: "user" }}
            className="relative overflow-hidden p-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-elevated"
          >
            <Camera className="size-6" />
            <p className="mt-3 font-semibold text-sm">Report Violation</p>
            <p className="text-[11px] text-white/70 mt-0.5">
              Photo, video, or live
            </p>
            <ArrowRight className="absolute bottom-3 right-3 size-4 opacity-70" />
          </Link>
          <Link
            to="/payouts"
            className="relative overflow-hidden p-4 rounded-2xl bg-card border border-border shadow-card"
          >
            <div className="size-10 rounded-xl bg-success/15 text-success flex items-center justify-center">
              <CircleDollarSign className="size-5" />
            </div>
            <p className="mt-3 font-semibold text-sm">Payouts</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">$750 last week</p>
            <ArrowRight className="absolute bottom-3 right-3 size-4 text-muted-foreground" />
          </Link>
        </div>
      </div>

      {/* Recent reports */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Recent tickets</h3>
          <Link to="/history" className="text-xs font-semibold text-primary">
            See all
          </Link>
        </div>
        <div className="space-y-2.5">
          {recent.map((v) => (
            <Link
              key={v.id}
              to="/report/$id"
              params={{ id: v.id }}
              className="flex gap-3 p-2.5 rounded-2xl bg-card border border-border shadow-card"
            >
              <img
                src={v.thumb}
                alt=""
                loading="lazy"
                className="size-16 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm truncate">{v.category}</p>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-[11px] text-muted-foreground truncate mt-0.5 flex items-center gap-1">
                  <MapPin className="size-3 shrink-0" /> {v.location}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px] text-muted-foreground">{v.date}</span>
                  <span className="text-xs font-bold text-success">+${v.reward}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function Stat({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: string;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card p-3">
      <div className={`size-8 rounded-lg flex items-center justify-center ${tint}`}>{icon}</div>
      <p className="mt-2 text-xl font-bold leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
