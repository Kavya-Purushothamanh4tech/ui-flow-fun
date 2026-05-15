import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/verify-profile-otp")({
  component: VerifyOtp,
  validateSearch: (search: Record<string, unknown>) => ({
    flow: (search.flow as string) || "user-profile-update",
  }),
});

type Status = "idle" | "error" | "success";

function VerifyOtp() {
  const navigate = useNavigate();
  const { flow } = Route.useSearch();

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const [message, setMessage] = useState("");

  /* ---------------- FLOW CONFIG ---------------- */

  const flowConfig: Record<
    string,
    { title: string; successRedirect: string }
  > = {
    "user-profile-update": {
      title: "Verify Profile Update",
      successRedirect: "/profile",
    },
    "admin-profile-update": {
      title: "Verify Admin Profile Update",
      successRedirect: "/admin/profile",
    },
    "password-change": {
      title: "Verify Password Change",
      successRedirect: "/signin",
    },
  };

  const config =
    flowConfig[flow] || flowConfig["user-profile-update"];

  /* ---------------- OTP GENERATION ---------------- */

  const generateOtp = () => {
    const randomOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(randomOtp);

    console.log("Generated OTP:", randomOtp);

    window.alert(`Test OTP: ${randomOtp}`);
  };

  useEffect(() => {
    generateOtp();

    setMessage(
      "Enter the OTP sent to your registered phone number or email address."
    );
  }, [flow]);

  /* ---------------- VERIFY OTP ---------------- */

  const handleVerifyOtp = () => {
  if (otp.trim() === generatedOtp.trim()) {
    setStatus("success");

    setMessage(
      "OTP verified successfully. Updating profile..."
    );

    setTimeout(() => {
      // apply pending update if exists
      const pending =
        sessionStorage.getItem(
          "pending_update"
        );

      if (pending) {
        console.log(
          "Applying update:",
          JSON.parse(pending)
        );

        sessionStorage.removeItem(
          "pending_update"
        );
      }

      // redirect based on flow
      switch (flow) {
        case "admin-profile-update":
          navigate({
            to: "/admin",
          });
          break;

        case "user-profile-update":
          navigate({
            to: "/dashboard",
          });
          break;

        case "password-change":
          navigate({
            to: "/signin",
          });
          break;

        default:
          navigate({
            to: "/profile",
          });
      }
    }, 1200);
  } else {
    setStatus("error");

    setMessage(
      "Incorrect OTP. Please enter the correct OTP."
    );
  }
};

  /* ---------------- RESEND OTP ---------------- */

  const handleResendOtp = () => {
    generateOtp();

    setStatus("success");

    setMessage(
      "A new OTP has been sent to your registered contact."
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <PhoneShell noPadding>
      {/* HEADER */}
      <div className="px-6 pt-2 flex items-center">
        <Link
          to={
            flow === "admin-profile-update"
              ? "/admin/profile"
              : "/profile"
          }
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <div className="px-6 pt-4 pb-8 flex-1 overflow-y-auto no-scrollbar">
        <BrandHero />

        <h1 className="text-center text-2xl font-bold tracking-tight">
          {config.title}
        </h1>

        <p className="text-center text-sm text-muted-foreground mt-1.5">
          Enter OTP to confirm this secure action.
        </p>

        <StatusNotice status={status} message={message} />

        <div className="mt-7 space-y-4">
          <Input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setStatus("idle");
            }}
            placeholder="000000"
            className="h-14 rounded-2xl text-center text-lg tracking-[0.45em]"
          />

          <Button
            size="lg"
            className="w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>

          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground">
              Didn’t receive it?
            </p>

            <button
              type="button"
              onClick={handleResendOtp}
              className="mt-1 text-sm font-semibold text-primary hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

/* ---------------- STATUS UI ---------------- */

function StatusNotice({
  status,
  message,
}: {
  status: Status;
  message: string;
}) {
  const isError = status === "error";
  const isSuccess = status === "success";

  const Icon = isError
    ? AlertCircle
    : isSuccess
    ? CheckCircle2
    : ShieldCheck;

  return (
    <div
      className={`mt-6 rounded-2xl border p-4 flex gap-3 ${
        isError
          ? "border-destructive/20 bg-destructive/10 text-destructive"
          : isSuccess
          ? "border-green-500/20 bg-green-500/10 text-green-600"
          : "border-primary/20 bg-primary/10 text-primary"
      }`}
    >
      <Icon className="mt-0.5 size-5 shrink-0" />

      <div>
        <p className="text-sm font-semibold">
          {isError
            ? "Verification Failed"
            : isSuccess
            ? "Verified"
            : "Security Verification"}
        </p>

        <p className="mt-1 text-xs text-foreground/70">
          {message}
        </p>
      </div>
    </div>
  );
}

/* ---------------- HERO ---------------- */

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
        Secure Verification
      </p>

      <p className="mt-1 text-[11px] text-muted-foreground font-semibold uppercase tracking-[0.22em]">
        One-Time Passcode
      </p>
    </div>
  );
}