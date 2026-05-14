import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Camera,
  Video,
  MapPin,
  Clock,
  Check,
  ImagePlus,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/submit")({
  component: Submit,
});

/* ---------------- DATA ---------------- */

const VIOLATIONS = [
  { id: "1", label: "Ran a red light / Stop sign" },
  { id: "2", label: "Expired registration / inspection stickers" },
  { id: "3", label: "Missing / illegal license plates" },
  { id: "4", label: "Failure to signal" },
  { id: "5", label: "Not wearing seatbelt" },
  { id: "6", label: "Parking violation" },
];

const PARKING_VIOLATIONS = [
  "No parking zone",
  "Bus stop",
  "Loading zone",
  "Sidewalk",
  "Disabled without required permit",
  "Double parked",
  "Blocking driveway",
  "Blocking crosswalk",
  "Blocking fire hydrant",
  "Not within marked space",
  "Expired meter",
];

/* ---------------- COMPONENT ---------------- */

function Submit() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [violation, setViolation] = useState("1");

  const [seatbeltMoving, setSeatbeltMoving] = useState<
    "Yes" | "No" | null
  >(null);

  const [parkingType, setParkingType] =
    useState<string | null>(null);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const selectViolation = (id: string) => {
    setViolation(id);
    setOpen(false);

    setSeatbeltMoving(null);
    setParkingType(null);
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  const isSeatbelt = violation === "5";

  return (
    <PhoneShell>
      {/* HEADER */}
      <div className="px-6 pt-2 pb-3 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="size-10 -ml-2 rounded-full flex items-center justify-center hover:bg-accent"
        >
          <ArrowLeft className="size-5" />
        </Link>

        <p className="font-semibold">
          Report Violation
        </p>

        <span className="text-xs font-semibold text-primary">
          Draft
        </span>
      </div>

      <div className="px-6 space-y-5 pb-24">
        {/* MEDIA */}
        <div className="grid grid-cols-2 gap-3">
          <button className="aspect-[4/5] rounded-3xl bg-gradient-hero p-4 flex flex-col justify-between text-white">
            <Camera className="size-6" />
            <p className="font-semibold">
              Take photo
            </p>
          </button>

          <button className="aspect-[4/5] rounded-3xl border p-4 flex flex-col justify-between">
            <Video className="size-6 text-primary" />
            <p className="font-semibold">
              Record video
            </p>
          </button>
        </div>

        <button className="w-full h-11 rounded-2xl border border-dashed flex items-center justify-center gap-2">
          <ImagePlus className="size-4" />
          Upload from gallery
        </button>

        {/* CATEGORY DROPDOWN */}
        <div className="relative z-50">
          <Label className="text-xs uppercase text-muted-foreground">
            Violation category
          </Label>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="mt-2 w-full h-12 px-4 rounded-2xl border bg-card flex items-center justify-between shadow-sm"
          >
            <span className="text-sm font-medium truncate">
              {VIOLATIONS.find(
                (v) => v.id === violation
              )?.label || "Select violation"}
            </span>

            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-2 w-full rounded-2xl border bg-card shadow-xl overflow-hidden z-[100]">
              <div className="max-h-64 overflow-y-auto">
                {VIOLATIONS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() =>
                      selectViolation(v.id)
                    }
                    className={cn(
                      "w-full px-4 py-3 text-left text-sm border-b last:border-b-0 hover:bg-muted transition-colors",
                      violation === v.id &&
                        "bg-primary text-primary-foreground font-medium"
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEATBELT */}
        {isSeatbelt && (
          <Block label="Seatbelt violation details">
            <p className="text-sm font-semibold mb-2">
              Was the car moving?
            </p>

            <div className="flex gap-3">
              <Button
                variant={
                  seatbeltMoving === "Yes"
                    ? "default"
                    : "outline"
                }
                className="flex-1"
                onClick={() =>
                  setSeatbeltMoving("Yes")
                }
              >
                Yes
              </Button>

              <Button
                variant={
                  seatbeltMoving === "No"
                    ? "default"
                    : "outline"
                }
                className="flex-1"
                onClick={() =>
                  setSeatbeltMoving("No")
                }
              >
                No
              </Button>
            </div>
          </Block>
        )}

        {/* PARKING */}
        {violation === "6" && (
          <Block label="Parking violation type">
            {!parkingType ? (
              <div className="space-y-2">
                {PARKING_VIOLATIONS.map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setParkingType(type);
                        setOpen(false);
                      }}
                      className="w-full text-left px-3 py-3 rounded-xl border text-sm hover:bg-muted transition-colors"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border bg-primary text-white px-4 py-3 text-sm font-medium">
                  Selected: {parkingType}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    setParkingType(null)
                  }
                >
                  Change parking violation type
                </Button>
              </div>
            )}
          </Block>
        )}

        {/* VEHICLE */}
        <Block label="Vehicle details">
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Number plate"
              className="h-11 rounded-xl"
            />
            <Input
              placeholder="Vehicle type"
              className="h-11 rounded-xl"
            />
          </div>
        </Block>

        {/* LOCATION */}
        <Block label="Location">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-xl bg-green-100 flex items-center justify-center">
              <MapPin className="size-5 text-green-600" />
            </div>

            <div>
              <p className="text-sm font-semibold">
                5th Avenue & E 42nd Street
              </p>
              <p className="text-xs text-muted-foreground">
                GPS captured
              </p>
            </div>
          </div>
        </Block>

        {/* TIMESTAMP */}
        <Block label="Timestamp">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Clock className="size-5 text-primary" />
            </div>

            <p className="text-sm font-semibold">
              Auto captured
            </p>
          </div>
        </Block>

        {/* DESCRIPTION */}
        <div>
          <Label className="text-xs uppercase text-muted-foreground">
            Description
          </Label>

          <Textarea className="mt-2 min-h-[90px] rounded-2xl" />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          className="w-full h-12 rounded-2xl"
          onClick={handleSubmit}
        >
          <Check className="mr-2 size-4" />
          Submit report
        </Button>
      </div>

      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="w-full max-w-[420px] bg-card rounded-t-3xl p-6 animate-fade-up"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-border mb-5" />

            <div className="size-14 rounded-2xl bg-success/15 text-success flex items-center justify-center mx-auto">
              <Check className="size-7" />
            </div>

            <h3 className="text-center text-lg font-bold mt-4">
              Submission Successful
            </h3>

            <p className="text-center text-sm text-muted-foreground mt-2 leading-relaxed">
              Thank you for your public
              engagement!
              <br />
              If the violation is paid, you
              will receive{" "}
              <span className="font-semibold text-foreground">
                25% of the ticket payment.
              </span>
            </p>

            <div className="mt-6">
              <Button
                className="w-full h-12 rounded-2xl font-semibold"
                onClick={() => {
                  setShowSuccess(false);
                  navigate({
                    to: "/dashboard",
                  });
                }}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </PhoneShell>
  );
}

/* ---------------- BLOCK ---------------- */

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-xs uppercase text-muted-foreground">
        {label}
      </Label>

      <div className="mt-2 p-3 border rounded-2xl bg-card">
        {children}
      </div>
    </div>
  );
}