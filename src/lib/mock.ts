export type ViolationStatus = "pending" | "review" | "approved" | "rejected" | "paid";

export interface Violation {
  id: string;
  category: string;
  vehicle: string;
  location: string;
  date: string;
  status: ViolationStatus;
  reward: number;
  thumb: string;
  reporter?: string;
}

const thumbs = [
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1523983254932-c7e6571c9d60?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
];

export const violations: Violation[] = [
  { id: "VR-2841", category: "Signal Jumping", vehicle: "TN 09 AB 4521", location: "Anna Salai, Chennai", date: "Today, 10:24 AM", status: "review", reward: 250, thumb: thumbs[0], reporter: "Arjun M." },
  { id: "VR-2840", category: "Wrong-side Driving", vehicle: "KA 03 MK 8821", location: "MG Road, Bangalore", date: "Today, 09:12 AM", status: "approved", reward: 500, thumb: thumbs[1], reporter: "Sneha P." },
  { id: "VR-2839", category: "No Helmet", vehicle: "DL 8C AA 3344", location: "Connaught Place, Delhi", date: "Yesterday, 6:48 PM", status: "paid", reward: 150, thumb: thumbs[2], reporter: "Rahul K." },
  { id: "VR-2838", category: "Illegal Parking", vehicle: "MH 12 XY 9087", location: "FC Road, Pune", date: "Yesterday, 2:20 PM", status: "pending", reward: 100, thumb: thumbs[3], reporter: "Diya S." },
  { id: "VR-2837", category: "Over-speeding", vehicle: "GJ 01 RT 5566", location: "SG Highway, Ahmedabad", date: "May 9, 11:05 AM", status: "rejected", reward: 0, thumb: thumbs[4], reporter: "Mohit R." },
  { id: "VR-2836", category: "Triple Riding", vehicle: "TS 07 PQ 1209", location: "Banjara Hills, Hyderabad", date: "May 8, 4:30 PM", status: "approved", reward: 200, thumb: thumbs[5], reporter: "Kavya N." },
];

export const categories = [
  { id: "signal", label: "Signal Jumping", icon: "🚦", color: "bg-destructive/15 text-destructive" },
  { id: "helmet", label: "No Helmet", icon: "🪖", color: "bg-warning/15 text-warning-foreground/90" },
  { id: "wrong", label: "Wrong Side", icon: "↩️", color: "bg-destructive/15 text-destructive" },
  { id: "speed", label: "Over-speeding", icon: "💨", color: "bg-primary/15 text-primary" },
  { id: "parking", label: "Illegal Parking", icon: "🅿️", color: "bg-warning/15 text-warning-foreground/90" },
  { id: "triple", label: "Triple Riding", icon: "🛵", color: "bg-accent text-accent-foreground" },
  { id: "phone", label: "Mobile Use", icon: "📱", color: "bg-primary/15 text-primary" },
  { id: "drunk", label: "Drunk Driving", icon: "🍺", color: "bg-destructive/15 text-destructive" },
];

export const payouts = [
  { id: "PY-118", date: "May 10, 2026", amount: 750, method: "UPI · @arjun-okhdfc", status: "paid" as const },
  { id: "PY-117", date: "May 03, 2026", amount: 500, method: "UPI · @arjun-okhdfc", status: "paid" as const },
  { id: "PY-116", date: "Apr 26, 2026", amount: 1200, method: "Bank · HDFC ••4521", status: "paid" as const },
  { id: "PY-115", date: "Apr 19, 2026", amount: 350, method: "UPI · @arjun-okhdfc", status: "paid" as const },
  { id: "PY-114", date: "Apr 12, 2026", amount: 900, method: "Bank · HDFC ••4521", status: "paid" as const },
];
