import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOtp,
});

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    // temporary validation
    if (otp.length === 6) {
      navigate({ to: "/signin" });
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <PhoneShell noPadding>
      <div className="px-6 pt-2 pb-2 flex items-center gap-3">
        <Link
          to="/signup"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <div className="px-6 pb-8 flex-1 overflow-y-auto no-scrollbar flex flex-col">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-primary-glow/25 blur-2xl" />
            <div className="relative size-20 rounded-3xl bg-gradient-hero text-primary-foreground border border-white/20 flex items-center justify-center shadow-elevated">
              <ShieldCheck className="!size-10" strokeWidth={1.6} />
            </div>
          </div>

          <p className="mt-4 text-2xl font-bold tracking-tight">
            Verify OTP
          </p>

          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Enter the 6-digit verification code sent to your email or phone number.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="h-14 text-center text-lg tracking-[0.4em] rounded-2xl"
          />

          <Button
            size="lg"
            className="w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
            onClick={handleVerify}
          >
            Verify OTP
          </Button>

          <button
            className="w-full text-sm font-medium text-primary"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}