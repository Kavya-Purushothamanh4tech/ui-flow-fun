import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, FileText, Clock, CheckCircle2, XCircle, MapPin, ChevronRight, BarChart3 } from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { violations } from "@/lib/mock";

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  const queue = violations.filter((v) => v.status === "review" || v.status === "pending");
  return (
    <PhoneShell>
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-3 pb-24 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center font-semibold">RJ</div>
            <div>
              <p className="text-[11px] text-white/70">Officer dashboard</p>
              <p className="text-sm font-semibold">Insp. R. Joshi · ID 4521</p>
            </div>
          </div>
          <button className="relative size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-warning ring-2 ring-[oklch(0.32_0.16_264)]" />
          </button>
        </div>

        <div className="relative mt-6">
          <p className="text-xs text-white/70 font-medium">Reports today</p>
          <h2 className="text-4xl font-bold tracking-tight">128</h2>
          <p className="text-xs text-white/60 mt-1">Chennai Central Zone · 14 officers active</p>
        </div>
      </div>

      <div className="px-6 -mt-16 grid grid-cols-2 gap-3 relative z-10">
        <Stat icon={<Clock className="size-5" />} label="Pending review" value="42" tint="bg-warning/15 text-warning-foreground/90" />
        <Stat icon={<CheckCircle2 className="size-5" />} label="Approved" value="71" tint="bg-success/15 text-success" />
        <Stat icon={<XCircle className="size-5" />} label="Rejected" value="15" tint="bg-destructive/15 text-destructive" />
        <Stat icon={<FileText className="size-5" />} label="This week" value="612" tint="bg-primary/15 text-primary" />
      </div>

      {/* Chart */}
      <div className="px-6 mt-6">
        <div className="rounded-2xl bg-card border border-border shadow-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Reports — last 7 days</p>
              <p className="font-bold text-lg">612 <span className="text-xs text-success font-semibold">▲ 8%</span></p>
            </div>
            <div className="size-10 rounded-xl bg-accent text-primary flex items-center justify-center"><BarChart3 className="size-5" /></div>
          </div>
          <div className="mt-4 flex items-end justify-between gap-1.5 h-24">
            {[40, 65, 50, 80, 95, 70, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full rounded-lg bg-gradient-primary" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="px-6 mt-6 pb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Review queue</h3>
          <Link to="/admin/violations" className="text-xs font-semibold text-primary flex items-center gap-1">View all <ChevronRight className="size-3.5" /></Link>
        </div>
        <div className="space-y-2.5">
          {queue.map((v) => (
            <Link key={v.id} to="/violation/$id" params={{ id: v.id }} className="flex gap-3 p-3 rounded-2xl bg-card border border-border shadow-card">
              <img src={v.thumb} alt="" loading="lazy" className="size-14 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-sm truncate">{v.category}</p>
                  <StatusBadge status={v.status} />
                </div>
                <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="size-3 shrink-0" /> {v.location}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">By {v.reporter} · {v.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

function Stat({ icon, label, value, tint }: { icon: React.ReactNode; label: string; value: string; tint: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card p-4">
      <div className={`size-10 rounded-xl flex items-center justify-center ${tint}`}>{icon}</div>
      <p className="mt-3 text-2xl font-bold leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
