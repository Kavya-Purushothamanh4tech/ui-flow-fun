import { createFileRoute } from "@tanstack/react-router";
import { Wallet, ArrowDownLeft, BadgeIndianRupee, Building2, Smartphone } from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { Button } from "@/components/ui/button";
import { payouts } from "@/lib/mock";

export const Route = createFileRoute("/payouts")({ component: Payouts });

function Payouts() {
  const total = payouts.reduce((a, p) => a + p.amount, 0);
  return (
    <PhoneShell>
      <div className="px-6 pt-3 pb-2">
        <p className="text-xs text-muted-foreground font-medium">Wallet</p>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
      </div>

      {/* Wallet card */}
      <div className="px-6 mt-3">
        <div className="relative rounded-3xl bg-gradient-hero text-primary-foreground p-5 shadow-elevated overflow-hidden">
          <div className="absolute -top-12 -right-12 size-40 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/70 font-medium">Available balance</p>
              <p className="text-3xl font-bold mt-1 tracking-tight">₹{total.toLocaleString()}</p>
            </div>
            <div className="size-12 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
              <Wallet className="size-6" />
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-2 text-center">
            <Mini label="This week" value="₹750" />
            <Mini label="This month" value="₹2,450" />
            <Mini label="Lifetime" value="₹14,300" />
          </div>
          <div className="relative mt-5 flex gap-2">
            <Button className="flex-1 h-11 rounded-2xl bg-white text-primary hover:bg-white/90 font-semibold">Withdraw</Button>
            <Button variant="ghost" className="h-11 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold">Statement</Button>
          </div>
        </div>
      </div>

      {/* Methods */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold">Payout methods</h3>
          <button className="text-xs font-semibold text-primary">+ Add</button>
        </div>
        <div className="space-y-2.5">
          <Method icon={<Smartphone className="size-5" />} title="UPI · @arjun-okhdfc" sub="Default · Instant" />
          <Method icon={<Building2 className="size-5" />} title="HDFC Bank ••4521" sub="Savings · 1-2 days" />
        </div>
      </div>

      {/* History */}
      <div className="px-6 mt-6">
        <h3 className="text-sm font-bold mb-3">Recent payouts</h3>
        <div className="rounded-2xl bg-card border border-border shadow-card divide-y divide-border">
          {payouts.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3.5">
              <div className="size-10 rounded-xl bg-success/15 text-success flex items-center justify-center">
                <ArrowDownLeft className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate">{p.method}</p>
                  <p className="font-bold text-sm">+₹{p.amount}</p>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[11px] text-muted-foreground">{p.date} · {p.id}</p>
                  <StatusBadge status="paid" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 py-2">
      <p className="text-[10px] text-white/70 font-medium">{label}</p>
      <p className="font-bold text-sm mt-0.5">{value}</p>
    </div>
  );
}
function Method({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card">
      <div className="size-11 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-[11px] text-muted-foreground">{sub}</p>
      </div>
      <BadgeIndianRupee className="size-4 text-muted-foreground" />
    </div>
  );
}
