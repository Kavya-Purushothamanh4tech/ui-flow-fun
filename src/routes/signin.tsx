import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Lock, Fingerprint } from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signin")({ component: SignIn });

function SignIn() {
  return (
    <PhoneShell noPadding>
      <div className="px-6 pt-2 flex items-center">
        <Link to="/welcome" className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent">
          <ArrowLeft className="size-5" />
        </Link>
      </div>
      <div className="px-6 pt-4 pb-8 flex-1 flex flex-col">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1.5">Sign in to continue patrolling your city.</p>

        <div className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input className="h-12 pl-10 rounded-2xl bg-card text-sm" placeholder="you@example.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input type="password" className="h-12 pl-10 rounded-2xl bg-card text-sm" placeholder="••••••••" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="size-4 rounded accent-primary" defaultChecked /> Remember me
            </label>
            <button className="text-sm text-primary font-semibold">Forgot?</button>
          </div>
        </div>

        <Button asChild size="lg" className="mt-8 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold">
          <Link to="/dashboard">Sign in</Link>
        </Button>

        <Button variant="outline" size="lg" className="mt-3 w-full h-12 rounded-2xl text-base font-medium">
          <Fingerprint className="size-5" /> Use biometric
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-auto pt-6">
          New here? <Link to="/signup" className="text-primary font-semibold">Create account</Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-3">
          <Link to="/admin" className="font-medium underline-offset-4 hover:underline">Sign in as Officer →</Link>
        </p>
      </div>
    </PhoneShell>
  );
}
