import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleNextFromIdentifier = () => {
    if (!identifier) {
      alert("Enter email or phone number");
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    // mock OTP check
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successful (mock)");

    navigate({ to: "/signin" }); // ✅ redirect here
  };

  return (
    <PhoneShell noPadding>
      {/* Header */}
      <div className="px-6 pt-2 flex items-center">
        <Link
          to="/signin"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>
      </div>

      <div className="px-6 pt-6 flex-1 overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-bold text-center">
          Forgot Password
        </h1>

        <p className="text-center text-sm text-muted-foreground mt-2">
          Reset your password in 3 steps
        </p>

        {/* STEP 1: IDENTIFIER */}
        {step === 1 && (
          <div className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Email or Phone
              </Label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                <Input
                  className="h-12 pl-10 rounded-2xl bg-card text-sm"
                  placeholder="Enter email or phone"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full h-12 rounded-2xl bg-gradient-primary"
              onClick={handleNextFromIdentifier}
            >
              Send OTP
            </Button>
          </div>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <div className="mt-8 space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              OTP sent to {identifier}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Enter OTP
              </Label>

              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                <Input
                  className="h-12 pl-10 rounded-2xl bg-card text-sm"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full h-12 rounded-2xl bg-gradient-primary"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </Button>
          </div>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <div className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                New Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                <Input
                  type={showNewPassword ? "text" : "password"}
                  className="h-12 pl-10 pr-10 rounded-2xl bg-card text-sm"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Confirm Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  className="h-12 pl-10 pr-10 rounded-2xl bg-card text-sm"
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

            <Button
              className="w-full h-12 rounded-2xl bg-gradient-primary"
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
          </div>
        )}

        {/* back hint */}
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link to="/signin" className="text-primary font-semibold">
            Sign in
          </Link>
        </div>
      </div>
    </PhoneShell>
  );
}