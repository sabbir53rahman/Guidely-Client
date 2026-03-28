"use client";

import React from "react";
import { addDays } from "date-fns";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

import { useGetAllSchedulesQuery } from "@/redux/features/schedule/scheduleApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { Button } from "@/components/ui/button";
import { Schedule } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookSessionPage() {
  const { data: schedulesResponse, isLoading } =
    useGetAllSchedulesQuery(undefined);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const router = useRouter();

  const schedules: Schedule[] = schedulesResponse?.data || [];

  const handleBookSlot = async (schedule: Schedule) => {
    // Determine the next upcoming date for the target DayOfWeek
    const daysMap: Record<string, number> = {
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    };

    const targetDay = daysMap[schedule.dayOfWeek.toUpperCase()];
    if (targetDay === undefined) {
      toast.error("Invalid schedule day configurations");
      return;
    }

    let date = new Date();
    // Start looking from tomorrow to prevent booking a slot that already passed today
    date = addDays(date, 1);
    while (date.getDay() !== targetDay) {
      date = addDays(date, 1);
    }

    const [startH, startM] = schedule.startTime.split(":");
    const [endH, endM] = schedule.endTime.split(":");

    const startTime = new Date(date);
    startTime.setHours(parseInt(startH, 10), parseInt(startM, 10), 0);

    const endTime = new Date(date);
    endTime.setHours(parseInt(endH, 10), parseInt(endM, 10), 0);

    const mentorId = schedule.mentorId || schedule.mentor?.id;
    if (!mentorId) {
      toast.error("Mentor information is missing for this schedule.");
      return;
    }

    const toastId = toast.loading("Reserving your session...");
    try {
      const res = await createBooking({
        mentorId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        notes: "General mentorship session",
      }).unwrap();

      if (res?.success) {
        toast.success(
          "Session successfully requested! Please finalize payment.",
          {
            id: toastId,
          },
        );
        router.push("/session-history"); // Redirect to history page to view/pay
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to book this session.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
      {/* HEADER SECTION - PREMIUM DESIGN */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Global Roster
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Available{" "}
            <span className="text-muted-foreground/30 font-light">
              Schedules
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Discover times that work for you. Connect with elite mentors across
            the globe and elevate your skills in just one session.
          </p>
        </div>
      </div>

      {!isLoading ? (
        schedules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {schedules.map((schedule) => (
              <div
                key={schedule.id || schedule._id}
                className="group relative flex flex-col justify-between bg-card text-card-foreground rounded-3xl border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="p-8 space-y-6">
                  {/* Mentor Info */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shadow-inner border border-primary/10 transition-transform duration-500 group-hover:scale-110">
                      {schedule.mentor?.profilePhoto ? (
                        <Image
                          src={schedule.mentor.profilePhoto}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                          alt="mentor"
                        />
                      ) : (
                        <span className="text-2xl font-heading">
                          {schedule.mentor?.user?.name
                            ?.charAt(0)
                            .toUpperCase() || "M"}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-foreground tracking-tight text-lg group-hover:text-primary transition-colors">
                        {schedule.mentor?.user?.name || "Expert Mentor"}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Award className="h-3.5 w-3.5 text-primary" />
                        <p className="text-xs text-muted-foreground/80 font-semibold tracking-wide">
                          {schedule.mentor?.experience || 0}+ Yrs Exp
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timing Details */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <CalendarIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                          Day of Week
                        </p>
                        <p className="text-sm font-bold capitalize text-foreground">
                          {schedule.dayOfWeek.toLowerCase()}s
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                          Available Window
                        </p>
                        <p className="text-sm font-bold text-foreground">
                          {schedule.startTime}{" "}
                          <span className="text-muted-foreground/50 mx-1">
                            —
                          </span>{" "}
                          {schedule.endTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Area */}
                <div className="p-4 pt-0">
                  <Button
                    onClick={() => handleBookSlot(schedule)}
                    disabled={isBooking}
                    className="w-full h-14 rounded-2xl font-bold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 gap-2 transition-all active:scale-[0.98] group/btn"
                  >
                    <Video className="h-4 w-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                    <span className="tracking-tight">Book This Schedule</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 opacity-50 transition-transform" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 mt-8 rounded-3xl border border-dashed border-border/60 bg-muted/10 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <TrendingUp className="h-10 w-10 text-primary opacity-80" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-3 text-center">
              No Schedules Available
            </h3>
            <p className="text-muted-foreground text-center max-w-md font-medium">
              Currently, our mentors haven&apos;t published their public
              availability. Check back shortly to reserve your spot!
            </p>
          </div>
        )
      ) : null}
    </div>
  );
}
