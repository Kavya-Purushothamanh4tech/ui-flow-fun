import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Settings,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  Award,
  Star,
  Edit3,
} from "lucide-react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  return (
    <PhoneShell>
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[36px] px-6 pt-3 pb-20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 size-48 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="relative flex items-center justify-between">
          <p className="font-semibold">Profile</p>
          <button className="size-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center">
            <Settings className="size-4" />
          </button>
        </div>
        <div className="relative mt-6 flex flex-col items-center text-center">
          <div className="relative">
            <div className="size-20 rounded-full bg-white/15 border border-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
              MC
            </div>
            <button className="absolute -bottom-1 -right-1 size-7 rounded-full bg-white text-primary flex items-center justify-center shadow-elevated">
              <Edit3 className="size-3.5" />
            </button>
          </div>
          <h2 className="mt-3 text-lg font-bold">Michael Carter</h2>
          <p className="text-xs text-white/70">michael.carter@example.com · +1 (555) 123-4567</p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-[11px] font-semibold">
            <Award className="size-3.5" /> Gold Patroller
          </div>
        </div>
      </div>

      <div className="px-6 -mt-12 grid grid-cols-3 gap-2.5 relative z-10">
        <Mini label="Reports" value="24" />
        <Mini label="Approved" value="18" />
        <Mini
          label="Rating"
          value="4.8"
          icon={<Star className="size-3 fill-warning text-warning" />}
        />
      </div>

      <div className="px-6 mt-6 space-y-2.5">
        <Section>
          <Row icon={<Shield className="size-4" />} label="Account & Security" />
          <Row icon={<Bell className="size-4" />} label="Notifications" rightHint="On" />
          <Row icon={<Award className="size-4" />} label="Rewards & Badges" rightHint="3 new" />
        </Section>
        <Section>
          <Row icon={<HelpCircle className="size-4" />} label="Help & Support" />
          <Row icon={<Settings className="size-4" />} label="App preferences" />
        </Section>
        <Link
          to="/welcome"
          className="flex items-center justify-center gap-2 rounded-2xl bg-destructive/10 text-destructive p-3.5 font-semibold text-sm"
        >
          <LogOut className="size-4" /> Sign out
        </Link>
        <p className="text-center text-[11px] text-muted-foreground pt-2">v1.0.0 · Build 240</p>
      </div>

      <BottomNav />
    </PhoneShell>
  );
}

function Mini({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card p-3 text-center">
      <div className="flex items-center justify-center gap-1 text-xl font-bold">
        {value}
        {icon}
      </div>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-card divide-y divide-border overflow-hidden">
      {children}
    </div>
  );
}
function Row({
  icon,
  label,
  rightHint,
}: {
  icon: React.ReactNode;
  label: string;
  rightHint?: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 p-3.5 hover:bg-accent/40">
      <div className="size-9 rounded-xl bg-accent text-accent-foreground flex items-center justify-center">
        {icon}
      </div>
      <span className="flex-1 text-left text-sm font-medium">{label}</span>
      {rightHint && <span className="text-[11px] text-muted-foreground">{rightHint}</span>}
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  );
}
