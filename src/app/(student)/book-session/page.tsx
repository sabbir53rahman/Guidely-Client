"use client";

import React, { useMemo, useCallback } from "react";
import { addDays } from "date-fns";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  ChevronRight,
  Award,
} from "lucide-react";

import { useGetAllSchedulesQuery } from "@/redux/features/schedule/scheduleApi";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Schedule } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Pagination } from "@/components/shared/Pagination";

export default function BookSessionPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: schedulesResponse, isLoading } = useGetAllSchedulesQuery({
    page,
    limit,
  });
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();
  const router = useRouter();

  const schedules: Schedule[] = schedulesResponse?.data || [];
  const meta = schedulesResponse?.meta;

  const handleBookSlot = useCallback(
    async (schedule: Schedule) => {
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

      // Get user's timezone and handle UTC conversion properly
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      // Convert local time to UTC for backend
      const convertToUTC = (date: string, time24: string) => {
        const [hours, minutes] = time24.split(':');
        const dateObj = new Date(date);
        dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        return dateObj.toISOString(); // Send UTC to backend
      };

      // Convert UTC to local time for display (debug)
      const convertToLocalTime = (utcDate: string) => {
        const date = new Date(utcDate);
        return date.toLocaleString('en-US', {
          timeZone: userTimezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
      };

      // Create booking times in UTC for backend
      const bookingDate = date.toISOString().split('T')[0]; // YYYY-MM-DD format
      const startTime = convertToUTC(bookingDate, schedule.startTime);
      const endTime = convertToUTC(bookingDate, schedule.endTime);

      const mentorId = schedule.mentorId || schedule.mentor?.id;
      if (!mentorId) {
        toast.error("Mentor information is missing for this schedule.");
        return;
      }

      // Debug logging to verify the timezone conversion process
      console.log("=== BOOKING DEBUG ===");
      console.log("User timezone:", userTimezone);
      console.log("Schedule data:", schedule);
      console.log("Original schedule time:", `${schedule.startTime} - ${schedule.endTime}`);
      console.log("Booking date:", bookingDate);
      console.log("UTC times being sent to backend:", {
        startTime: startTime,
        endTime: endTime,
        startTimeLocal: convertToLocalTime(startTime),
        endTimeLocal: convertToLocalTime(endTime)
      });
      console.log("==================");

      const toastId = toast.loading("Reserving your session...");
      try {
        await createBooking({
          mentorId,
          startTime: startTime, // Already in UTC ISO format
          endTime: endTime, // Already in UTC ISO format
          notes: "General mentorship session",
        }).unwrap();

        toast.success(
          "Session successfully requested! Please finalize payment.",
          {
            id: toastId,
          },
        );
        router.push("/session-history");
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Failed to book this session.", {
          id: toastId,
        });
      }
    },
    [createBooking, router],
  );

  const columns = useMemo<Column<Schedule>[]>(
    () => [
      {
        key: "mentor",
        header: "Expert Mentor",
        cell: (row) => (
          <div className="flex items-center gap-4 py-1">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shadow-inner border border-primary/10">
              {row.mentor?.profilePhoto ? (
                <Image
                  src={row.mentor.profilePhoto}
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                  alt="mentor"
                />
              ) : (
                <span className="text-xl font-heading">
                  {row.mentor?.user?.name?.charAt(0).toUpperCase() || "M"}
                </span>
              )}
            </div>
            <div>
              <p className="font-extrabold text-foreground tracking-tight text-[15px]">
                {row.mentor?.user?.name || "Expert Mentor"}
              </p>
              <p className="text-xs text-muted-foreground/70 font-medium">
                {row.mentor?.expertise || "Verified Expert"}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "day",
        header: "Availability",
        className: "w-[150px]",
        cell: (row) => (
          <Badge
            variant="outline"
            className="px-4 py-1.5 font-bold rounded-xl border border-primary/20 bg-primary/5 text-primary uppercase text-[10px] tracking-widest"
          >
            {row.dayOfWeek}
          </Badge>
        ),
      },
      {
        key: "time",
        header: "Session Window",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="text-[13px] font-extrabold tracking-tight text-foreground">
              {row.startTime} — {row.endTime}
            </span>
          </div>
        ),
      },
      {
        key: "exp",
        header: "Experience",
        cell: (row) => (
          <div className="flex items-center gap-1.5">
            <Award className="h-4 w-4 text-amber-500/80" />
            <span className="text-sm font-bold text-muted-foreground/80 whitespace-nowrap">
              {row.mentor?.experience || 0}+ Yrs Exp
            </span>
          </div>
        ),
      },
      {
        key: "actions",
        header: "Operation",
        className: "text-right pr-8",
        cell: (row) => (
          <Button
            onClick={() => handleBookSlot(row)}
            disabled={isBooking || row.isBooked}
            className={cn(
              "h-11 px-6 rounded-xl font-bold gap-2 transition-all active:scale-95 group text-xs min-w-30",
              row.isBooked
                ? "bg-muted text-muted-foreground cursor-not-allowed border-none shadow-none"
                : "bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20",
            )}
          >
            {row.isBooked ? (
              "Booked Out"
            ) : (
              <>
                <Video className="h-4 w-4" />
                Book Now
                <ChevronRight className="h-4 w-4 opacity-50 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </Button>
        ),
      },
    ],
    [handleBookSlot, isBooking],
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
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

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <CalendarIcon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Available
            </p>
            <p className="text-xl font-black text-foreground">
              {meta?.total || schedules.length}
            </p>
          </div>
        </div>
      </div>

      <section className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-[4rem] blur-3xl -z-10 pointer-events-none"></div>

        <DataTable<Schedule>
          data={schedules}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No available mentorship schedules discovered in our verified roster. Check back soon."
        />

        {/* Pagination Section */}
        {!isLoading && meta && meta.totalPages > 0 && (
          <Pagination
            currentPage={page}
            totalPages={meta.totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </section>
    </div>
  );
}
