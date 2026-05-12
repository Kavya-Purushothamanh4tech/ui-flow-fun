import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Camera, BadgeIndianRupee, ArrowRight } from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/welcome")({ component: Welcome });

function Welcome() {
  return (
    <PhoneShell noPadding>
      <div className="flex-1 flex flex-col">
        <div className="relative h-[58%] bg-gradient-hero overflow-hidden rounded-b-[44px]">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="absolute bottom-10 -left-12 size-60 rounded-full bg-white/10 blur-2xl" />
          <div className="relative h-full flex flex-col items-center justify-center text-primary-foreground p-8">
            <div className="size-24 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-elevated">
              <ShieldCheck className="!size-12" strokeWidth={1.6} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-center leading-tight">
              Make your city<br/>safer, together.
            </h1>
            <p className="mt-3 text-center text-white/75 text-sm max-w-[280px]">
              Report traffic violations in seconds. Get rewarded when verified.
            </p>
          </div>
        </div>

        <div className="flex-1 px-6 pt-6 pb-8 flex flex-col">
          <div className="space-y-3">
            <Feature icon={<Camera className="size-5" />} title="Capture & Submit" desc="Photo or 30-sec video with auto GPS." />
            <Feature icon={<ShieldCheck className="size-5" />} title="Verified by Officers" desc="Reviewed within 24 hours." />
            <Feature icon={<BadgeIndianRupee className="size-5" />} title="Earn Rewards" desc="Up to ₹500 per approved report." />
          </div>

          <div className="mt-auto space-y-3 pt-6">
            <Button asChild size="lg" className="w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold">
              <Link to="/signup">Create account <ArrowRight /></Link>
            </Button>
            <Button asChild variant="ghost" className="w-full h-12 rounded-2xl text-base font-medium">
              <Link to="/signin">I already have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-card border border-border shadow-sm">
      <div className="size-11 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
