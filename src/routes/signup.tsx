import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Home,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({ component: SignUp });

function SignUp() {
  const [mode, setMode] = useState<"otp" | "password">("otp");
  return (
    <PhoneShell noPadding>
      <div className="px-6 pt-2 pb-2 flex items-center gap-3">
        <Link
          to="/welcome"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>
      <div className="px-6 pb-8 flex-1 overflow-y-auto no-scrollbar">
        <BrandHero />
        <h1 className="text-center text-2xl font-bold tracking-tight">Sign up</h1>
        <p className="text-center text-sm text-muted-foreground mt-1">
          Complete your account details to register with Citizens On Patrol.
        </p>

        <div className="mt-7 space-y-4">
          <Field
            icon={<Mail className="size-4" />}
            label="Email ID"
            placeholder="michael.carter@example.com"
            type="email"
            helper="This email ID will be used as your user ID and must be validated with an OTP."
            actionLabel="Validate email"
          />
          <Field
            icon={<Phone className="size-4" />}
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
            helper="Used for additional authentication, OTP delivery, and account notifications."
            actionLabel="Validate phone"
          />
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Authentication mode
            </Label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-muted">
              <button
                type="button"
                onClick={() => setMode("otp")}
                className={cn(
                  "h-10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  mode === "otp" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground",
                )}
              >
                <KeyRound className="size-4" /> OTP
              </button>
              <button
                type="button"
                onClick={() => setMode("password")}
                className={cn(
                  "h-10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  mode === "password"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Lock className="size-4" /> Password
              </button>
            </div>
          </div>

          <div className={cn("space-y-4", mode === "password" ? "animate-fade-up" : "hidden")}>
            <Field
              icon={<Lock className="size-4" />}
              label="Password"
              placeholder="••••••••"
              type="password"
            />
            <Field
              icon={<Lock className="size-4" />}
              label="Confirm password"
              placeholder="••••••••"
              type="password"
            />
          </div>

          <Field icon={<User className="size-4" />} label="First name" placeholder="Michael" />
          <Field icon={<User className="size-4" />} label="Last name" placeholder="Carter" />
          <Field
            icon={<BadgeCheck className="size-4" />}
            label="ID proof"
            placeholder="Driver license, passport, or state ID"
          />
          <Field icon={<Home className="size-4" />} label="Address" placeholder="1427 Oak Street" />
          <Field
            icon={<MapPin className="size-4" />}
            label="Zip code"
            placeholder="94107"
            inputMode="numeric"
          />
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
        >
          <Link to="/signin">Create account</Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          Your identity details are used to verify account access and keep reports accountable.
        </p>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already a member?{" "}
          <Link to="/signin" className="text-primary font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </PhoneShell>
  );
}

function BrandHero() {
  return (
    <div className="mb-7 flex flex-col items-center text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-primary-glow/25 blur-2xl" />
        <div className="relative size-20 rounded-3xl bg-gradient-hero text-primary-foreground border border-white/20 flex items-center justify-center shadow-elevated">
          <ShieldCheck className="!size-10" strokeWidth={1.6} />
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">C.O.P</p>
      <p className="mt-1 text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.22em]">
        Citizens On Patrol
      </p>
    </div>
  );
}

function Field({
  actionLabel,
  helper,
  icon,
  label,
  ...rest
}: {
  actionLabel?: string;
  helper?: string;
  icon: React.ReactNode;
  label: string;
} & React.ComponentProps<"input">) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </span>
        <Input {...rest} className="h-12 pl-10 rounded-2xl bg-card border-border text-sm" />
      </div>
      {helper && <p className="text-xs leading-relaxed text-muted-foreground">{helper}</p>}
      {actionLabel && (
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-primary hover:bg-primary/10"
        >
          <CheckCircle2 className="size-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}
