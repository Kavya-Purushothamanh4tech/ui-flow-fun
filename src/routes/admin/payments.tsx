import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/payments")({
  component: AdminPayments,
});

/* ---------------- MOCK DATA ---------------- */

const PAYMENTS = [
  {
    id: "1",
    user: "Michael Carter",
    violation: "Red Light Violation",
    amount: 150,
    status: "paid",
    location: "National Ave & 5th St",
    date: "2026-05-14",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    violation: "No Helmet",
    amount: 80,
    status: "unpaid",
    location: "Beach Road",
    date: "2026-05-13",
  },
  {
    id: "3",
    user: "David Miller",
    violation: "Parking Violation",
    amount: 120,
    status: "paid",
    location: "North Avenue",
    date: "2026-05-12",
  },
  {
    id: "4",
    user: "Akhil Raj",
    violation: "No Seatbelt",
    amount: 60,
    status: "unpaid",
    location: "Bridge Highway",
    date: "2026-05-11",
  },
];

type Tab = "all" | "paid" | "unpaid";

/* ---------------- COMPONENT ---------------- */

function AdminPayments() {
  const [tab, setTab] = useState<Tab>("all");

  const filtered = PAYMENTS.filter((p) => {
    if (tab === "all") return true;
    return p.status === tab;
  });

  const paidCount = PAYMENTS.filter((p) => p.status === "paid").length;
  const unpaidCount = PAYMENTS.filter((p) => p.status === "unpaid").length;

  const totalRevenue = PAYMENTS
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <PhoneShell>
      {/* HEADER (MATCHING PROFILE STYLE) */}
      <div className="px-6 pt-5 pb-6 bg-gradient-hero text-primary-foreground rounded-b-[36px] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="flex items-center gap-4 relative">
          <div className="size-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <CreditCard className="size-6" />
          </div>

          <div>
            <p className="text-xs text-white/70">Admin Finance</p>
            <p className="text-base font-semibold">
              Payment Tracking
            </p>
            <p className="text-xs text-white/60">
              Monitor fines & settlements
            </p>
          </div>
        </div>

        {/* TOTAL REVENUE */}
        <div className="mt-5">
          <p className="text-xs text-white/70">
            Total Collected
          </p>
          <p className="text-3xl font-bold">
            ${totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* SUMMARY (PROFILE STYLE CARDS) */}
      <div className="px-6 mt-6 grid grid-cols-2 gap-3">
        <SummaryCard label="Paid" value={paidCount} type="paid" />
        <SummaryCard label="Unpaid" value={unpaidCount} type="unpaid" />
      </div>

      {/* TABS (CLEAN PROFILE STYLE) */}
      <div className="px-6 mt-5">
        <div className="flex gap-2 bg-card border rounded-2xl p-1">
          {(["all", "paid", "unpaid"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 text-xs font-semibold py-2 rounded-xl transition",
                tab === t
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground"
              )}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="px-6 mt-5 space-y-3 pb-24">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="p-4 border rounded-2xl bg-card shadow-card"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold">
                  {p.user}
                </p>
                <p className="text-xs text-muted-foreground">
                  {p.violation}
                </p>
              </div>

              <Status status={p.status} />
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {p.location}
            </div>

            {/* BOTTOM */}
            <div className="flex justify-between items-center mt-3">
              <p className="text-sm font-bold">
                ${p.amount.toLocaleString()}
              </p>

              <p className="text-xs text-muted-foreground">
                {p.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BottomNav role="admin" />
    </PhoneShell>
  );
}

/* ---------------- STATUS ---------------- */

function Status({ status }: { status: string }) {
  if (status === "paid") {
    return (
      <div className="flex items-center gap-1 text-green-600 text-xs font-semibold">
        <CheckCircle2 className="size-4" />
        Paid
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-red-500 text-xs font-semibold">
      <XCircle className="size-4" />
      Unpaid
    </div>
  );
}

/* ---------------- SUMMARY CARD ---------------- */

function SummaryCard({
  label,
  value,
  type,
}: {
  label: string;
  value: number;
  type: "paid" | "unpaid";
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl border bg-card shadow-card",
        type === "paid"
          ? "border-green-200"
          : "border-red-200"
      )}
    >
      <p className="text-xs text-muted-foreground">
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-bold mt-1",
          type === "paid"
            ? "text-green-600"
            : "text-red-500"
        )}
      >
        {value}
      </p>
    </div>
  );
}