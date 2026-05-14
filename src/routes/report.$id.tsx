import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Car,
  User,
  Play,
  Share2,
  Flag,
  CircleDollarSign,
} from "lucide-react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { StatusBadge } from "@/components/mobile/StatusBadge";
import { violations } from "@/lib/mock";

export const Route = createFileRoute("/report/$id")({
  component: ReportDetail,
});

function ReportDetail() {
  const { id } = Route.useParams();
  const nav = useNavigate();

  const v =
    violations.find((x) => x.id === id) ?? violations[0];

  return (
    <PhoneShell noPadding>
      <div className="relative">
        <img
          src={v.thumb}
          alt=""
          className="w-full h-[340px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />

        <div className="absolute top-3 left-0 right-0 px-4 flex items-center justify-between">
          <button
            onClick={() => nav({ to: "/dashboard" })}
            className="size-10 rounded-full bg-black/30 backdrop-blur text-white flex items-center justify-center"
          >
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
            <p className="text-[11px] text-white/80 font-medium">
              {v.id}
            </p>

            <h2 className="text-xl font-bold">
              {v.category}
            </h2>
          </div>

          <StatusBadge status={v.status} />
        </div>
      </div>

      <div className="px-6 pt-5 pb-8 space-y-4">
        <Row
          icon={<MapPin className="size-5" />}
          label="Location"
          value={v.location}
          sub="GPS verified"
        />

        <Row
          icon={<Clock className="size-5" />}
          label="Timestamp"
          value={v.date}
          sub="Auto-captured"
        />

        <Row
          icon={<Car className="size-5" />}
          label="Vehicle"
          value={v.vehicle}
          sub="Vehicle details"
        />

        <Row
          icon={<User className="size-5" />}
          label="Reported by"
          value={v.reporter ?? "—"}
          sub="Citizen report"
        />

        {/* Description */}
        <div className="rounded-2xl bg-card border border-border shadow-card p-4">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
            Description
          </p>

          <p className="mt-2 text-sm leading-relaxed">
            Vehicle crossed the stop line and
            proceeded through the red signal.
          </p>
        </div>

        {/* Reward card */}
        <div className="rounded-2xl bg-success/10 border border-success/20 p-4 flex items-center gap-3">
          <div className="size-12 rounded-xl bg-success text-white flex items-center justify-center">
            <CircleDollarSign className="size-6" />
          </div>

          <div>
            <p className="font-semibold text-sm">
              Reward eligibility
            </p>

            <p className="text-xs text-muted-foreground">
              If approved and paid, you receive
              25% of the ticket payment.
            </p>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function Row({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card">
      <div className="size-11 rounded-xl bg-accent text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
          {label}
        </p>

        <p className="text-sm font-semibold mt-0.5">
          {value}
        </p>

        {sub && (
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}