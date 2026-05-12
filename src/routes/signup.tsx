import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, Lock, KeyRound, User } from "lucide-react";
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
        <Link to="/welcome" className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent">
          <ArrowLeft className="size-5" />
        </Link>
      </div>
      <div className="px-6 pb-8 flex-1 overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="text-sm text-muted-foreground mt-1">Join thousands keeping streets safer.</p>

        <div className="mt-7 space-y-4">
          <Field icon={<User className="size-4" />} label="Full name" placeholder="Arjun Mehta" />
          <Field icon={<Mail className="size-4" />} label="Email address" placeholder="you@example.com" type="email" />
          <Field icon={<Phone className="size-4" />} label="Phone number" placeholder="+91 98765 43210" type="tel" />

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Authentication mode</Label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-muted">
              <button
                onClick={() => setMode("otp")}
                className={cn("h-10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  mode === "otp" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
              >
                <KeyRound className="size-4" /> OTP
              </button>
              <button
                onClick={() => setMode("password")}
                className={cn("h-10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                  mode === "password" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground")}
              >
                <Lock className="size-4" /> Password
              </button>
            </div>
          </div>

          {mode === "password" && (
            <div className="space-y-4 animate-fade-up">
              <Field icon={<Lock className="size-4" />} label="Password" placeholder="••••••••" type="password" />
              <Field icon={<Lock className="size-4" />} label="Confirm password" placeholder="••••••••" type="password" />
            </div>
          )}
        </div>

        <Button asChild size="lg" className="mt-8 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold">
          <Link to="/otp">Continue</Link>
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4">
          By continuing you agree to our <span className="text-primary font-medium">Terms</span> & <span className="text-primary font-medium">Privacy Policy</span>.
        </p>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already a member? <Link to="/signin" className="text-primary font-semibold">Sign in</Link>
        </p>
      </div>
    </PhoneShell>
  );
}

function Field({ icon, label, ...rest }: { icon: React.ReactNode; label: string } & React.ComponentProps<"input">) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</Label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        <Input {...rest} className="h-12 pl-10 rounded-2xl bg-card border-border text-sm" />
      </div>
    </div>
  );
}
