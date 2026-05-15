import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  User,
  ShieldCheck,
  MapPin,
  CreditCard,
  Lock,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/profile")({
  component: AdminProfile,
});

function AdminProfile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [profile, setProfile] = useState({
    firstName: "David",
    lastName: "Miller",
    role: "Traffic Officer",
    badgeId: "4521",
    idStatus: "Verified",
    address: "Midtown Precinct Office",
    zipCode: "10001",
  });

  const handleSave = () => {
    setIsEditing(false);
    // later API call
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      alert("Fill all fields");
      return;
    }

    alert("Password updated (mock)");

    setCurrentPassword("");
    setNewPassword("");
    setShowPassword(false);
  };

  const handleLogout = () => {
    navigate({ to: "/signin" });
  };

  return (
    <PhoneShell>
      {/* HEADER */}
      <div className="px-6 pt-5 pb-6 bg-gradient-hero text-primary-foreground rounded-b-[36px] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />

        <div className="flex items-center gap-4 relative">
          <div className="size-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
            <User className="size-6" />
          </div>

          <div>
            <p className="text-xs text-white/70">Admin Officer</p>
            <p className="text-base font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-xs text-white/60">
              Badge ID: {profile.badgeId}
            </p>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 rounded-2xl border border-white/20 bg-white/15 px-4 py-2 text-sm"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* PERSONAL INFO */}
      <div className="px-6 mt-6 space-y-4">
        <SectionTitle title="PERSONAL INFORMATION" />

        <Field
          label="First Name"
          value={profile.firstName}
          disabled={!isEditing}
          onChange={(v) =>
            setProfile({ ...profile, firstName: v })
          }
        />

        <Field
          label="Last Name"
          value={profile.lastName}
          disabled={!isEditing}
          onChange={(v) =>
            setProfile({ ...profile, lastName: v })
          }
        />

        <Field
          label="Role"
          value={profile.role}
          disabled={!isEditing}
          onChange={(v) =>
            setProfile({ ...profile, role: v })
          }
        />

        <Field
          label="Badge ID"
          value={profile.badgeId}
          disabled
        />
      </div>

      {/* VERIFICATION */}
      <div className="px-6 mt-6 space-y-4">
        <SectionTitle title="VERIFICATION" />

        <MenuRow
          icon={<ShieldCheck className="size-4" />}
          label="Proof of ID"
          hint={profile.idStatus}
        />

        <Field
          label="Address"
          value={profile.address}
          disabled={!isEditing}
          onChange={(v) =>
            setProfile({ ...profile, address: v })
          }
        />

        <Field
          label="ZIP Code"
          value={profile.zipCode}
          disabled={!isEditing}
          onChange={(v) =>
            setProfile({ ...profile, zipCode: v })
          }
        />
      </div>

      {/* ACCOUNT */}
      <div className="px-6 mt-6 space-y-3">
        <SectionTitle title="ACCOUNT SETTINGS" />

        <MenuRow
          icon={<Lock className="size-4" />}
          label="Change Password"
          onClick={() => setShowPassword(!showPassword)}
        />

        {showPassword && (
          <div className="p-4 border rounded-2xl bg-card space-y-3">
            <Input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
            />

            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
            />

            <Button
              className="w-full"
              onClick={handleChangePassword}
            >
              Update Password
            </Button>
          </div>
        )}

        {/* SAVE */}
        {isEditing && (
          <Button
            className="w-full mt-3"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        )}
      </div>

      {/* LOGOUT */}
      <div className="px-6 mt-6 pb-10">
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="size-4 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNav role="admin" />
    </PhoneShell>
  );
}

/* ---------------- HELPERS ---------------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="text-xs font-semibold text-muted-foreground tracking-wider">
      {title}
    </p>
  );
}

function Field({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (v: string) => void;
}) {
  return (
    <div className="p-3 border rounded-2xl bg-card flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <Input
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange?.(e.target.value)
        }
        className="w-1/2 text-right border-0 bg-transparent shadow-none"
      />
    </div>
  );
}

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
      className="w-full flex items-center justify-between p-4 border rounded-2xl bg-card"
    >
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <div className="text-left">
          <p className="text-sm font-medium">{label}</p>
          {hint && (
            <p className="text-xs text-muted-foreground">
              {hint}
            </p>
          )}
        </div>
      </div>

      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}