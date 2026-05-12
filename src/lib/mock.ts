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
  {
    id: "VR-2841",
    category: "Signal Jumping",
    vehicle: "NY ABC-4521",
    location: "5th Avenue & E 42nd Street, New York, NY 10017",
    date: "Today, 10:24 AM",
    status: "review",
    reward: 250,
    thumb: thumbs[0],
    reporter: "Michael C.",
  },
  {
    id: "VR-2840",
    category: "Wrong-way Driving",
    vehicle: "CA 8MK8821",
    location: "Wilshire Boulevard, Los Angeles, CA 90024",
    date: "Today, 09:12 AM",
    status: "approved",
    reward: 500,
    thumb: thumbs[1],
    reporter: "Emily J.",
  },
  {
    id: "VR-2839",
    category: "No Helmet",
    vehicle: "IL AA3344",
    location: "Michigan Avenue, Chicago, IL 60611",
    date: "Yesterday, 6:48 PM",
    status: "paid",
    reward: 150,
    thumb: thumbs[2],
    reporter: "David M.",
  },
  {
    id: "VR-2838",
    category: "Illegal Parking",
    vehicle: "TX XY9087",
    location: "Congress Avenue, Austin, TX 78701",
    date: "Yesterday, 2:20 PM",
    status: "pending",
    reward: 100,
    thumb: thumbs[3],
    reporter: "Olivia B.",
  },
  {
    id: "VR-2837",
    category: "Over-speeding",
    vehicle: "FL RT5566",
    location: "Biscayne Boulevard, Miami, FL 33132",
    date: "May 9, 11:05 AM",
    status: "rejected",
    reward: 0,
    thumb: thumbs[4],
    reporter: "Noah W.",
  },
  {
    id: "VR-2836",
    category: "Unsafe Passenger Load",
    vehicle: "WA PQ1209",
    location: "Pike Street, Seattle, WA 98101",
    date: "May 8, 4:30 PM",
    status: "approved",
    reward: 200,
    thumb: thumbs[5],
    reporter: "Sophia T.",
  },
];

export const categories = [
  {
    id: "signal",
    label: "Signal Jumping",
    icon: "🚦",
    color: "bg-destructive/15 text-destructive",
  },
  {
    id: "helmet",
    label: "No Helmet",
    icon: "🪖",
    color: "bg-warning/15 text-warning-foreground/90",
  },
  { id: "wrong", label: "Wrong Way", icon: "↩️", color: "bg-destructive/15 text-destructive" },
  { id: "speed", label: "Over-speeding", icon: "💨", color: "bg-primary/15 text-primary" },
  {
    id: "parking",
    label: "Illegal Parking",
    icon: "🅿️",
    color: "bg-warning/15 text-warning-foreground/90",
  },
  {
    id: "passenger",
    label: "Passenger Load",
    icon: "🛵",
    color: "bg-accent text-accent-foreground",
  },
  { id: "phone", label: "Mobile Use", icon: "📱", color: "bg-primary/15 text-primary" },
  { id: "drunk", label: "Drunk Driving", icon: "🍺", color: "bg-destructive/15 text-destructive" },
];

export const payouts = [
  {
    id: "PY-118",
    date: "May 10, 2026",
    amount: 750,
    method: "Debit Card · Visa ••4521",
    status: "paid" as const,
  },
  {
    id: "PY-117",
    date: "May 03, 2026",
    amount: 500,
    method: "Debit Card · Visa ••4521",
    status: "paid" as const,
  },
  {
    id: "PY-116",
    date: "Apr 26, 2026",
    amount: 1200,
    method: "Bank · Chase ••9142",
    status: "paid" as const,
  },
  {
    id: "PY-115",
    date: "Apr 19, 2026",
    amount: 350,
    method: "Debit Card · Visa ••4521",
    status: "paid" as const,
  },
  {
    id: "PY-114",
    date: "Apr 12, 2026",
    amount: 900,
    method: "Bank · Chase ••9142",
    status: "paid" as const,
  },
];
