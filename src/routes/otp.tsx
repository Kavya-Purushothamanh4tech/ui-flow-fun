import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/otp")({ component: Otp });

function Otp() {
  const [code, setCode] = useState("");
  const [s, setS] = useState(42);
  useEffect(() => { const t = setInterval(() => setS((p) => (p > 0 ? p - 1 : 0)), 1000); return () => clearInterval(t); }, []);

  return (
    <PhoneShell noPadding>
      <div className="px-6 pt-2 flex items-center">
        <Link to="/signup" className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent">
          <ArrowLeft className="size-5" />
        </Link>
      </div>
      <div className="px-6 pt-4 pb-8 flex-1 flex flex-col">
        <div className="size-16 rounded-2xl bg-accent text-primary flex items-center justify-center">
          <ShieldCheck className="!size-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Verification code</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          We sent a 6-digit code to <span className="text-foreground font-medium">+91 98765 43210</span>
        </p>

        <div className="mt-8 flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup className="gap-2">
              {[0,1,2,3,4,5].map((i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="size-12 text-lg font-semibold rounded-xl border-border bg-card first:rounded-xl last:rounded-xl border"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          {s > 0 ? (
            <>Resend code in <span className="font-semibold text-foreground">0:{s.toString().padStart(2, "0")}</span></>
          ) : (
            <button className="text-primary font-semibold">Resend code</button>
          )}
        </p>

        <Button asChild size="lg" className="mt-auto w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold">
          <Link to="/dashboard">Verify & Continue</Link>
        </Button>
      </div>
    </PhoneShell>
  );
}
