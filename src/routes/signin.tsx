import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    if (!emailOrPhone || !password) {
      alert("Please enter email/phone and password");
      return;
    }

    // temporary navigation
    navigate({ to: "/dashboard" });
  };

  return (
    <PhoneShell noPadding>
      <div className="px-6 pt-2 flex items-center">
        <Link
          to="/welcome"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <div className="px-6 pt-4 pb-8 flex-1 overflow-y-auto no-scrollbar">
        <BrandHero />

        <h1 className="text-center text-2xl font-bold tracking-tight">
          Sign in
        </h1>

        <p className="text-center text-sm text-muted-foreground mt-1.5">
          Sign in using your registered email or phone number.
        </p>

        <div className="mt-7 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Email or Phone Number
            </Label>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

              <Input
                className="h-12 pl-10 rounded-2xl bg-card text-sm"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

              <Input
                type={showPassword ? "text" : "password"}
                className="h-12 pl-10 pr-10 rounded-2xl bg-card text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="flex justify-end mt-1">
              <Link
                to="/forgot-password"
                className="text-xs text-primary font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full h-12 rounded-2xl bg-gradient-primary"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New here?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Create account
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground mt-3">
          <Link to="/admin" className="hover:underline">
            Sign in as Officer
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