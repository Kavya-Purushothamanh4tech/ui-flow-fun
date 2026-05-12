import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Citizens On Patrol — Report. Earn. Protect." },
      { name: "description", content: "Premium citizen-led traffic violation reporting app." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav({ to: "/welcome" }), 1800);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <PhoneShell bg="bg-gradient-hero" noPadding>
      <div className="flex-1 flex flex-col items-center justify-center text-primary-foreground px-8">
        <div className="relative animate-fade-up">
          <div className="absolute inset-0 blur-3xl bg-primary-glow/40 rounded-full" />
          <div className="relative size-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-elevated">
            <ShieldCheck className="!size-14" strokeWidth={1.6} />
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight animate-fade-up">C.O.P.</h1>
        <p className="mt-1.5 text-sm text-white/70 font-medium animate-fade-up">Citizens On Patrol</p>
        <div className="mt-12 flex items-center gap-1.5 animate-fade-up">
          <span className="size-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="size-1.5 rounded-full bg-white/50 animate-pulse [animation-delay:.2s]" />
          <span className="size-1.5 rounded-full bg-white/30 animate-pulse [animation-delay:.4s]" />
        </div>
      </div>
      <p className="text-center text-white/50 text-[11px] pb-6">Powered by Traffic Police · v1.0</p>
    </PhoneShell>
  );
}
