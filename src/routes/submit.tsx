import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Camera, Video, MapPin, Clock, Car, Check, ImagePlus } from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/submit")({ component: Submit });

function Submit() {
  const [cat, setCat] = useState("signal");
  return (
    <PhoneShell>
      <div className="px-6 pt-2 pb-3 flex items-center justify-between">
        <Link to="/dashboard" className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent">
          <ArrowLeft className="size-5" />
        </Link>
        <p className="font-semibold">Report Violation</p>
        <span className="text-xs font-semibold text-primary">Draft</span>
      </div>

      <div className="px-6 space-y-5">
        {/* Media capture */}
        <div className="grid grid-cols-2 gap-3">
          <button className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-hero text-primary-foreground p-4 flex flex-col justify-between shadow-elevated">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
            <Camera className="!size-6 relative" />
            <div className="relative">
              <p className="font-semibold">Take photo</p>
              <p className="text-[11px] text-white/70">Auto-watermarked</p>
            </div>
          </button>
          <button className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-card border border-dashed border-border p-4 flex flex-col justify-between">
            <Video className="!size-6 text-primary" />
            <div>
              <p className="font-semibold">Record video</p>
              <p className="text-[11px] text-muted-foreground">Up to 30 seconds</p>
            </div>
          </button>
        </div>

        <button className="w-full h-11 rounded-2xl border border-dashed border-border text-sm font-medium text-muted-foreground flex items-center justify-center gap-2 hover:bg-accent">
          <ImagePlus className="size-4" /> Upload from gallery
        </button>

        {/* Categories */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Violation category</Label>
          <div className="mt-2 -mx-6 px-6 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 w-max pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  className={cn(
                    "shrink-0 px-3.5 py-2.5 rounded-2xl border text-sm font-medium flex items-center gap-2 transition-all",
                    cat === c.id ? "bg-primary text-primary-foreground border-primary shadow-elevated" : "bg-card border-border text-foreground"
                  )}
                >
                  <span>{c.icon}</span> {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle */}
        <Block label="Vehicle details">
          <div className="grid grid-cols-2 gap-3 p-1">
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Number plate</Label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input className="h-11 pl-9 rounded-xl bg-background uppercase" defaultValue="TN 09 AB 4521" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] text-muted-foreground">Vehicle type</Label>
              <Input className="h-11 rounded-xl bg-background" defaultValue="2-wheeler" />
            </div>
          </div>
        </Block>

        {/* Location */}
        <Block label="Location">
          <div className="flex items-center gap-3 p-1">
            <div className="size-11 rounded-xl bg-success/15 text-success flex items-center justify-center"><MapPin className="size-5" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Anna Salai, Teynampet</p>
              <p className="text-[11px] text-muted-foreground">Chennai, TN · 13.0428°N, 80.2336°E</p>
            </div>
            <span className="text-[10px] font-bold text-success bg-success/15 px-2 py-1 rounded-full">GPS</span>
          </div>
        </Block>

        {/* Timestamp */}
        <Block label="Timestamp">
          <div className="flex items-center gap-3 p-1">
            <div className="size-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Clock className="size-5" /></div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Today, 10:24 AM</p>
              <p className="text-[11px] text-muted-foreground">Auto-captured · Tap to edit</p>
            </div>
          </div>
        </Block>

        {/* Notes */}
        <div>
          <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description (optional)</Label>
          <Textarea
            className="mt-2 rounded-2xl bg-card border-border min-h-[88px] text-sm"
            placeholder="Briefly describe what happened..."
          />
        </div>

        <Button asChild size="lg" className="w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold mt-2">
          <Link to="/history"><Check /> Submit report</Link>
        </Button>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</Label>
      <div className="mt-2 p-3 rounded-2xl bg-card border border-border shadow-card">{children}</div>
    </div>
  );
}
