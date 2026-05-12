import { cn } from "@/lib/utils";

type Status = "pending" | "approved" | "rejected" | "paid" | "review";

const map: Record<Status, { label: string; cls: string; dot: string }> = {
  pending: { label: "Pending", cls: "bg-warning/15 text-warning-foreground/90 border-warning/30", dot: "bg-warning" },
  review: { label: "In Review", cls: "bg-primary/15 text-primary border-primary/30", dot: "bg-primary" },
  approved: { label: "Approved", cls: "bg-success/15 text-success border-success/30", dot: "bg-success" },
  rejected: { label: "Rejected", cls: "bg-destructive/15 text-destructive border-destructive/30", dot: "bg-destructive" },
  paid: { label: "Paid", cls: "bg-success/15 text-success border-success/30", dot: "bg-success" },
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
        s.cls,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}
