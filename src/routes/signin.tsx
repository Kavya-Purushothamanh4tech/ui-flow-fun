import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signin")({ component: SignIn });

type AuthMode = "otp" | "password";
type NoticeTone = "info" | "error" | "success";

const authCopy: Record<AuthMode, { label: string; title: string; helper: string }> = {
  otp: {
    label: "OTP",
    title: "One-time password",
    helper: "Request an OTP for the email ID used during sign up.",
  },
  password: {
    label: "Password",
    title: "Account password",
    helper: "Enter the password created during sign up.",
  },
};

function SignIn() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("otp");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [notice, setNotice] = useState<{
    tone: NoticeTone;
    title: string;
    description: string;
  }>({
    tone: "info",
    title: "Verify your account",
    description: "Enter the email ID used during sign up to continue.",
  });

  const handleEmailCheck = () => {
    setAuthenticated(false);
    setEmailChecked(true);
    setNotice({
      tone: "success",
      title: "Email ID found",
      description: `${authCopy[mode].label} authentication is available for this account.`,
    });
  };

  const requestOtp = () => {
    setNotice({
      tone: "success",
      title: "OTP sent",
      description: "A one-time password has been sent to the registered email ID.",
    });
  };

  const verifyCredentials = () => {
    setNotice({
      tone: "success",
      title: "Authentication successful",
      description: "Your credentials have been verified. Continue to the dashboard.",
    });
    setAuthenticated(true);
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
        <h1 className="text-center text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="text-center text-sm text-muted-foreground mt-1.5">
          Enter the details registered with your Citizens On Patrol account.
        </p>

        <Notice tone={notice.tone} title={notice.title} description={notice.description} />

        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Email ID
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="h-12 pl-10 rounded-2xl bg-card text-sm"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailChecked(false);
                  setAuthenticated(false);
                }}
              />
            </div>
            <Button
              type="button"
              className="h-10 w-full rounded-xl text-sm font-semibold"
              onClick={handleEmailCheck}
            >
              Continue
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Authentication mode
            </Label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-muted">
              {(["otp", "password"] as const).map((authMode) => {
                const Icon = authMode === "otp" ? KeyRound : Lock;
                return (
                  <button
                    key={authMode}
                    type="button"
                    onClick={() => {
                      setMode(authMode);
                      setEmailChecked(false);
                      setAuthenticated(false);
                      setOtp("");
                      setPassword("");
                      setNotice({
                        tone: "info",
                        title: authCopy[authMode].title,
                        description: authCopy[authMode].helper,
                      });
                    }}
                    className={cn(
                      "h-10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                      mode === authMode
                        ? "bg-card shadow-sm text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon className="size-4" /> {authCopy[authMode].label}
                  </button>
                );
              })}
            </div>
          </div>

          {mode === "otp" ? (
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-semibold">One-time password</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Request an OTP after the registered email ID is verified.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full rounded-xl text-sm font-semibold"
                disabled={!emailChecked}
                onClick={requestOtp}
              >
                Request OTP
              </Button>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  className="h-12 pl-10 rounded-2xl bg-background text-sm tracking-[0.35em]"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(event) => {
                    setOtp(event.target.value);
                    setAuthenticated(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4">
              <div>
                <p className="text-sm font-semibold">Password</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the password associated with the verified email ID.
                </p>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="password"
                  className="h-12 pl-10 rounded-2xl bg-background text-sm"
                  placeholder="••••••••"
                  disabled={!emailChecked}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setAuthenticated(false);
                  }}
                />
              </div>
            </div>
          )}

          <Button
            type="button"
            className="h-11 w-full rounded-xl text-sm font-semibold"
            disabled={!emailChecked}
            onClick={verifyCredentials}
          >
            {mode === "otp" ? "Verify OTP" : "Verify password"}
          </Button>
        </div>

        <Button
          size="lg"
          className="mt-7 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
          disabled={!authenticated}
          onClick={() => navigate({ to: "/dashboard" })}
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          New here?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Create account
          </Link>
        </p>
        <p className="text-center text-xs text-muted-foreground mt-3">
          <Link to="/admin" className="font-medium underline-offset-4 hover:underline">
            Sign in as Officer
          </Link>
        </p>
      </div>
    </PhoneShell>
  );
}

function Notice({
  tone,
  title,
  description,
}: {
  tone: NoticeTone;
  title: string;
  description: string;
}) {
  const isError = tone === "error";
  const isSuccess = tone === "success";
  const Icon = isError ? AlertCircle : isSuccess ? CheckCircle2 : ShieldCheck;

  return (
    <div
      className={cn(
        "mt-6 rounded-2xl border p-4 flex gap-3",
        isError && "border-destructive/25 bg-destructive/10 text-destructive",
        isSuccess && "border-success/25 bg-success/10 text-success",
        tone === "info" && "border-primary/20 bg-primary/10 text-primary",
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/70">{description}</p>
      </div>
    </div>
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
