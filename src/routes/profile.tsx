import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    phone: "+1 (555) 123-4567",
    firstName: "Michael",
    lastName: "Carter",
    address: "1427 Oak Street",
    zipCode: "94107",
    idStatus: "Not Verified",
  });

  const handleSave = () => {
    // later backend API call comes here
    navigate({ to: "/verify-profile-otp" });
  };

  return (
    <PhoneShell>
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-4 pb-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <Link
            to="/dashboard"
            className="size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <p className="font-semibold text-lg">
            Profile
          </p>

          <div className="size-10" />
        </div>

        <div className="relative mt-8 flex flex-col items-center text-center">
          <div className="relative size-20 rounded-full bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center">
            <ShieldCheck className="size-10" />
          </div>

          <h2 className="mt-4 text-lg font-bold">
            {profile.firstName} {profile.lastName}
          </h2>

          <p className="text-sm text-white/70">
            Update your account details
          </p>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        <Field
          label="Phone"
          icon={<Phone className="size-4" />}
          value={profile.phone}
          onChange={(value) =>
            setProfile({ ...profile, phone: value })
          }
        />

        <Field
          label="First Name"
          icon={<User className="size-4" />}
          value={profile.firstName}
          onChange={(value) =>
            setProfile({ ...profile, firstName: value })
          }
        />

        <Field
          label="Last Name"
          icon={<User className="size-4" />}
          value={profile.lastName}
          onChange={(value) =>
            setProfile({ ...profile, lastName: value })
          }
        />

        <Field
          label="Address"
          icon={<MapPin className="size-4" />}
          value={profile.address}
          onChange={(value) =>
            setProfile({ ...profile, address: value })
          }
        />

        <Field
          label="Zip Code"
          icon={<MapPin className="size-4" />}
          value={profile.zipCode}
          onChange={(value) =>
            setProfile({ ...profile, zipCode: value })
          }
        />

        <MenuRow
          icon={<CreditCard className="size-4" />}
          label="Receive Payouts"
        />

        <MenuRow
          icon={<ShieldCheck className="size-4" />}
          label="Proof of ID"
          hint={profile.idStatus}
        />

        <Button
          size="lg"
          className="mt-6 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) {
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 pl-10 rounded-2xl bg-card border-border text-sm"
        />
      </div>
    </div>
  );
}

function MenuRow({
  icon,
  label,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="size-10 rounded-xl bg-accent flex items-center justify-center">
        {icon}
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm font-medium">
          {label}
        </p>

        {hint && (
          <p className="text-xs text-muted-foreground mt-1">
            {hint}
          </p>
        )}
      </div>

      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}