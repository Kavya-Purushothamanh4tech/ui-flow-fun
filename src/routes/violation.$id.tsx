import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Clock, Car, User, Play, CheckCircle2, XCircle, Share2, Flag } from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { Button } from "@/components/ui/button";
import { violations } from "@/lib/mock";

export const Route = createFileRoute("/violation/$id")({ component: ViolationDetail });

function ViolationDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();
  const [confirm, setConfirm] = useState<null | "approve" | "reject">(null);
  const v = violations.find((x) => x.id === id) ?? violations[0];

  return (
    <PhoneShell noPadding>
      <div className="relative">
        <img src={v.thumb} alt="" className="w-full h-[340px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute top-3 left-0 right-0 px-4 flex items-center justify-between">
          <button onClick={() => nav({ to: "/admin/violations" })} className="size-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center">
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            <button className="size-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center">
              <Share2 className="size-4" />
            </button>
            <button className="size-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center">
              <Flag className="size-4" />
            </button>
          </div>
        </div>
        <button className="absolute inset-0 m-auto size-16 rounded-full bg-white/90 text-primary flex items-center justify-center shadow-elevated">
          <Play className="size-7 fill-primary" />
        </button>
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
          <div>
            <p className="text-[11px] text-white/80 font-medium">{v.id}</p>
            <h2 className="text-xl font-bold">{v.category}</h2>
          </div>
          <StatusBadge status={v.status} />
        </div>
      </div>

      <div className="px-6 pt-5 pb-28 space-y-4">
        <Row icon={<MapPin className="size-5" />} label="Location" value={v.location} sub="13.0428°N, 80.2336°E · GPS verified" />
        <Row icon={<Clock className="size-5" />} label="Timestamp" value={v.date} sub="Auto-captured · Device clock verified" />
        <Row icon={<Car className="size-5" />} label="Vehicle" value={v.vehicle} sub="2-wheeler · Black Honda Activa" />
        <Row icon={<User className="size-5" />} label="Reported by" value={v.reporter ?? "—"} sub="Gold Patroller · 18 verified reports" />

        <div className="rounded-2xl bg-card border border-border shadow-card p-4">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Description</p>
          <p className="mt-2 text-sm leading-relaxed">
            Vehicle crossed the stop line and proceeded through the red signal at the Anna Salai – Wallajah Road junction. Multiple pedestrians were on the crosswalk at the time.
          </p>
        </div>

        <div className="rounded-2xl bg-accent/40 border border-border p-4 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">+₹250</div>
          <div className="flex-1 text-sm">
            <p className="font-semibold">Suggested reward</p>
            <p className="text-xs text-muted-foreground">Auto-calculated from category & evidence quality</p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-background/95 backdrop-blur border-t border-border p-4 flex gap-3 z-40">
        <Button onClick={() => setConfirm("reject")} variant="outline" className="flex-1 h-12 rounded-2xl border-destructive/30 text-destructive hover:bg-destructive/10 font-semibold">
          <XCircle /> Reject
        </Button>
        <Button onClick={() => setConfirm("approve")} className="flex-1 h-12 rounded-2xl bg-gradient-success text-success-foreground shadow-elevated font-semibold">
          <CheckCircle2 /> Approve
        </Button>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center" onClick={() => setConfirm(null)}>
          <div className="w-full max-w-[420px] bg-card rounded-t-3xl p-6 animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto h-1 w-10 rounded-full bg-border mb-5" />
            <div className={`size-14 rounded-2xl flex items-center justify-center mx-auto ${confirm === "approve" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
              {confirm === "approve" ? <CheckCircle2 className="size-7" /> : <XCircle className="size-7" />}
            </div>
            <h3 className="text-center text-lg font-bold mt-4">
              {confirm === "approve" ? "Approve this report?" : "Reject this report?"}
            </h3>
            <p className="text-center text-sm text-muted-foreground mt-1">
              {confirm === "approve"
                ? "Reporter will be paid ₹250 within 24 hours."
                : "Reporter will be notified with a reason."}
            </p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl" onClick={() => setConfirm(null)}>Cancel</Button>
              <Button asChild className={`flex-1 h-12 rounded-2xl font-semibold ${confirm === "approve" ? "bg-gradient-success text-success-foreground" : "bg-gradient-danger text-destructive-foreground"}`}>
                <Link to="/admin/violations">Confirm</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </PhoneShell>
  );
}

function Row({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card">
      <div className="size-11 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold mt-0.5">{value}</p>
        {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}
