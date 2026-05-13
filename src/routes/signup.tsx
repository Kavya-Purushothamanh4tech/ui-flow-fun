import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
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

        <h1 className="text-center text-2xl font-bold tracking-tight">
          Sign up
        </h1>

        <p className="text-center text-sm text-muted-foreground mt-1">
          Create your Citizens On Patrol account using email or phone number.
        </p>

        <div className="mt-7 space-y-4">
          <Field
            icon={<Mail className="size-4" />}
            label="Email"
            placeholder="michael.carter@example.com"
            type="email"
            helper="Use email or phone number to create your account."
          />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-medium text-muted-foreground uppercase">
              OR
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Field
            icon={<Phone className="size-4" />}
            label="Phone"
            placeholder="+1 (555) 123-4567"
            type="tel"
          />

          <Field
            icon={<Lock className="size-4" />}
            label="Password"
            placeholder="••••••••"
            type="password"
          />

          <Field
            icon={<Lock className="size-4" />}
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
          />
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
        >
          <Link to="/verify-otp">Create account</Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Your account credentials are used to securely access Citizens On
          Patrol services.
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

      <p className="mt-4 text-2xl font-bold tracking-tight">
        C.O.P
      </p>

      <p className="mt-1 text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.22em]">
        Citizens On Patrol
      </p>
    </div>
  );
}

function Field({
  helper,
  icon,
  label,
  ...rest
}: {
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

        <Input
          {...rest}
          className="h-12 pl-10 rounded-2xl bg-card border-border text-sm"
        />
      </div>

      {helper && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {helper}
        </p>
      )}
    </div>
  );
}