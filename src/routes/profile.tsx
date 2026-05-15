import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Lock,
  LogOut,
  Eye,
  EyeOff,
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

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [profile, setProfile] = useState({
    phone: "+1 (555) 123-4567",
    firstName: "Michael",
    lastName: "Carter",
    address: "1427 Oak Street",
    zipCode: "94107",
    idStatus: "Not Verified",
  });

  // Change password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = () => {
    setIsEditing(false);
    navigate({ to: "/verify-profile-otp" });
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    alert("Password changed successfully (mock)");

    // reset
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordSection(false);
  };

  const handleLogout = () => {
    // clear tokens later if you have auth
    alert("Logged out");
    navigate({ to: "/signin" });
  };

  return (
    <PhoneShell>
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-4 pb-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <Link
            to="/dashboard"
            className="size-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center"
          >
            <ArrowLeft className="size-5" />
          </Link>

          <p className="font-semibold text-lg">Profile</p>

          <div className="size-10" />
        </div>

        {/* Profile Section */}
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

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-4 rounded-2xl border border-white/20 bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 py-6 space-y-4">
        <Field
          label="Phone"
          icon={<Phone className="size-4" />}
          value={profile.phone}
          disabled={!isEditing}
          onChange={(value) =>
            setProfile({ ...profile, phone: value })
          }
        />

        <Field
          label="First Name"
          icon={<User className="size-4" />}
          value={profile.firstName}
          disabled={!isEditing}
          onChange={(value) =>
            setProfile({ ...profile, firstName: value })
          }
        />

        <Field
          label="Last Name"
          icon={<User className="size-4" />}
          value={profile.lastName}
          disabled={!isEditing}
          onChange={(value) =>
            setProfile({ ...profile, lastName: value })
          }
        />

        <Field
          label="Address"
          icon={<MapPin className="size-4" />}
          value={profile.address}
          disabled={!isEditing}
          onChange={(value) =>
            setProfile({ ...profile, address: value })
          }
        />

        <Field
          label="Zip Code"
          icon={<MapPin className="size-4" />}
          value={profile.zipCode}
          disabled={!isEditing}
          onChange={(value) =>
            setProfile({ ...profile, zipCode: value })
          }
        />

        {/* MENU ITEMS */}
        <MenuRow
          icon={<CreditCard className="size-4" />}
          label="Receive Payouts"
        />

        <MenuRow
          icon={<ShieldCheck className="size-4" />}
          label="Proof of ID"
          hint={profile.idStatus}
        />

        {/* CHANGE PASSWORD */}
        <MenuRow
          icon={<Lock className="size-4" />}
          label="Change Password"
          onClick={() => setShowPasswordSection(!showPasswordSection)}
        />

        {/* PASSWORD SECTION */}
        {showPasswordSection && (
          <div className="space-y-4 p-4 rounded-2xl border border-border bg-card shadow-card">
            <p className="text-sm font-semibold">Change Password</p>

            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-12 rounded-2xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 rounded-2xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 rounded-2xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1 h-10 rounded-xl"
                onClick={handleChangePassword}
              >
                Save
              </Button>

              <Button
                variant="outline"
                className="flex-1 h-10 rounded-xl"
                onClick={() => setShowPasswordSection(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* SAVE PROFILE */}
        <Button
          size="lg"
          className="mt-6 w-full h-12 rounded-2xl bg-gradient-primary shadow-elevated text-base font-semibold"
          onClick={handleSave}
          disabled={!isEditing}
        >
          Save Changes
        </Button>

        {/* LOGOUT BUTTON */}
        <Button
          variant="outline"
          size="lg"
          className="w-full h-12 rounded-2xl border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-4 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

/* FIELD COMPONENT */
function Field({
  label,
  icon,
  value,
  onChange,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
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
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`h-12 pl-10 rounded-2xl text-sm ${
            disabled
              ? "bg-card border-border text-foreground opacity-100 cursor-default"
              : "bg-card border-primary ring-2 ring-primary/20"
          }`}
        />
      </div>
    </div>
  );
}

/* MENU ROW */
function MenuRow({
  icon,
  label,
  hint,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"
    >
      <div className="size-10 rounded-xl bg-accent flex items-center justify-center">
        {icon}
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm font-medium">{label}</p>

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