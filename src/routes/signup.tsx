import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const [signUpMethod, setSignUpMethod] = useState<
    "email" | "phone"
  >("email");

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form values
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          Create your Citizens On Patrol account.
        </p>

        {/* Toggle */}
        <div className="mt-7 rounded-2xl bg-muted p-1 flex">
          <button
            onClick={() => setSignUpMethod("email")}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              signUpMethod === "email"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Email
          </button>

          <button
            onClick={() => setSignUpMethod("phone")}
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              signUpMethod === "phone"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Phone
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {/* Dynamic Field */}
          {signUpMethod === "email" ? (
            <Field
              icon={<Mail className="size-4" />}
              label="Email"
              placeholder="michael.carter@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <Field
              icon={<Phone className="size-4" />}
              label="Phone"
              placeholder="+1 (555) 123-4567"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}

          {/* Password Field */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </Label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="size-4" />
              </span>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 pl-10 pr-10 rounded-2xl bg-card border-border text-sm"
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
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Confirm Password
            </Label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="size-4" />
              </span>

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 pl-10 pr-10 rounded-2xl bg-card border-border text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="mt-8 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
        >
          <Link to="/verify-otp">
            Create account
          </Link>
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Your account credentials are used to securely access
          Citizens On Patrol services.
        </p>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already a member?{" "}
          <Link
            to="/signin"
            className="text-primary font-semibold"
          >
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
          <ShieldCheck
            className="!size-10"
            strokeWidth={1.6}
          />
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