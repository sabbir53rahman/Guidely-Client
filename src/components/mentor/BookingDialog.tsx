"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Zap,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import type { Mentor } from "@/types";

interface BookingDialogProps {
  mentor: Mentor;
}

export function BookingDialog({ mentor }: BookingDialogProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<string>("");
  const [sessionType, setSessionType] = useState<string>("video");
  const [isBooking, setIsBooking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mockSlots = [
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "02:00 PM - 03:00 PM",
    "04:30 PM - 05:30 PM",
  ];

  const handleBooking = async () => {
    if (!date || !slot) {
      toast.error("Please select a date and time slot");
      return;
    }

    setIsBooking(true);
    // Mimic API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsBooking(false);
    setIsSuccess(true);
    toast.success("Session requested! Waiting for mentor approval.");
  };

  if (isSuccess) {
    return (
      <DialogContent className="sm:max-w-md rounded-[2.5rem] p-12 overflow-hidden">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-foreground mb-2">
              Request Sent!
            </h3>
            <p className="text-muted-foreground font-medium">
              We&apos;ve sent your booking request to{" "}
              <span className="text-primary font-bold">{mentor.user.name}</span>
              . You&apos;ll be notified once they confirm.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsSuccess(false)}
            className="w-full rounded-2xl h-14 font-black"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-2xl rounded-[2.5rem] p-0 overflow-hidden bg-background border-border shadow-2xl">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Side: Summary */}
        <div className="md:w-1/3 bg-primary p-8 text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest border border-white/20">
            Booking Summary
          </div>
          <div>
            <h3 className="text-2xl font-black mb-1">{mentor.user.name}</h3>
            <p className="text-white/70 text-sm font-medium">
              Mentorship Session
            </p>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  Date
                </p>
                <p className="text-sm font-bold">
                  {date ? format(date, "PPP") : "Select date"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                  Time Slot
                </p>
                <p className="text-sm font-bold">{slot || "Select time"}</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/10">
              <span className="font-bold">Total price</span>
              <span className="text-2xl font-black">${mentor.hourlyRate}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selection */}
        <div className="flex-1 p-8 overflow-y-auto max-h-[80vh]">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-2xl font-black tracking-tight">
              Schedule your session
            </DialogTitle>
            <DialogDescription className="font-medium">
              Choose a date and time that works best for you.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-8">
            {/* Step 1: Select Date */}
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                1. Select Date
              </Label>
              <div className="p-4 rounded-3xl bg-muted/30 border border-border">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0"
                  disabled={(date: Date) =>
                    date < new Date() ||
                    date.getDay() === 0 ||
                    date.getDay() === 6
                  } // Example disable weekends and past
                />
              </div>
            </div>

            {/* Step 2: Select Slot */}
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                2. Select Time Slot
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockSlots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`p-4 rounded-2xl border text-sm font-black transition-all ${
                      slot === s
                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "bg-background text-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Session Type */}
            <div className="space-y-4">
              <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                3. Session Type
              </Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "video", label: "Video Call", icon: Video },
                  { id: "voice", label: "Voice Call", icon: Zap },
                ].map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSessionType(type.id)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${
                        sessionType === type.id
                          ? "bg-secondary/10 text-secondary border-secondary shadow-lg shadow-secondary/5"
                          : "bg-background text-muted-foreground border-border hover:border-secondary/50 group"
                      }`}
                    >
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-colors ${
                          sessionType === type.id
                            ? "bg-secondary text-white"
                            : "bg-muted text-muted-foreground group-hover:bg-secondary/20 group-hover:text-secondary"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-bold text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
            <Button
              variant="secondary"
              onClick={handleBooking}
              disabled={isBooking}
              className="flex-1 h-14 rounded-2xl font-black text-lg shadow-xl shadow-secondary/20"
            >
              {isBooking ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

// Helper Label component if not available
function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}
