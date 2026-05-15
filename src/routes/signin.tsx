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

  // Toggle state
  const [signInMethod, setSignInMethod] = useState<
    "email" | "phone"
  >("email");

  // Form state
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Password visibility
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSignIn = () => {
    const identifier =
      signInMethod === "email"
        ? email
        : phone;

    if (!identifier || !password) {
      alert(
        `Please enter ${
          signInMethod === "email"
            ? "email"
            : "phone number"
        } and password`
      );
      return;
    }

    // temporary navigation
    navigate({
      to: "/dashboard",
    });
  };

  return (
    <PhoneShell noPadding>
      {/* BACK BUTTON */}
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

        {/* TOGGLE */}
        <div className="mt-7 rounded-2xl bg-muted p-1 flex">
          <button
            onClick={() =>
              setSignInMethod("email")
            }
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              signInMethod === "email"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Email
          </button>

          <button
            onClick={() =>
              setSignInMethod("phone")
            }
            className={`flex-1 rounded-xl py-2 text-sm font-medium transition ${
              signInMethod === "phone"
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Phone
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {/* Dynamic Email / Phone Field */}
          {signInMethod === "email" ? (
            <Field
              icon={<Mail className="size-4" />}
              label="Email"
              placeholder="michael.carter@example.com"
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          ) : (
            <Field
              icon={<Phone className="size-4" />}
              label="Phone Number"
              placeholder="+1 (555) 123-4567"
              type="tel"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          )}

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Password
            </Label>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="size-4" />
              </span>

              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                className="h-12 pl-10 pr-10 rounded-2xl bg-card text-sm"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
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

          {/* SIGN IN BUTTON */}
          <Button
            size="lg"
            className="w-full h-12 rounded-2xl bg-gradient-primary"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          New here?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold"
          >
            Create account
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground mt-3">
          <Link
            to="/admin"
            className="hover:underline"
          >
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
  icon,
  label,
  ...rest
}: {
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
    </div>
  );
}