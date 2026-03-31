"use client";

import {
  useGetMySchedulesQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} from "@/redux/features/schedule/scheduleApi";
import { useState, useMemo } from "react";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import {
  Plus,
  ChevronRight,
  Trash,
  Loader2,
  // Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  History,
  CalendarDays,
  Settings2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Schedule, TimeSlot } from "@/types";

export function ScheduleManagement() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { data: schedules, isLoading: isFetching } = useGetMySchedulesQuery();
  const [createSchedule, { isLoading: isCreating }] =
    useCreateScheduleMutation();
  const [deleteSchedule] = useDeleteScheduleMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    startTime: "09:00",
    endTime: "10:00",
  });

  const dayPreview = useMemo(() => {
    const today = startOfToday();
    return Array.from({ length: 14 }).map((_, i) => addDays(today, i));
  }, []);

  const selectedDay = format(selectedDate, "EEEE").toUpperCase();
  const todaysSchedules =
    schedules?.data?.filter((s) => s.dayOfWeek === selectedDay) || [];

  const handleCreateSlot = async () => {
    try {
      if (!newSlot.startTime || !newSlot.endTime) {
        toast.error("Please select both start and end times.");
        return;
      }

      const payload = {
        dayOfWeek: selectedDay,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
      };

      const res = await createSchedule(payload).unwrap();
      if (res.success) {
        toast.success("Availability slot successfully added.");
        setIsDialogOpen(false);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to add availability.");
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this availability slot?",
    );
    if (!isConfirmed) return;

    try {
      const res = await deleteSchedule(id).unwrap();
      if (res.success) {
        toast.success("Availability removed.");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to remove availability.");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Settings2 className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
              Availability Engine
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight text-foreground">
            Your Schedule{" "}
            <span className="text-muted-foreground/40 font-light">Mirror</span>
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg font-medium">
            Define your availability windows and let the platform synchronize
            your professional time.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
              Total Active Slots
            </span>
            <span className="text-2xl font-black tabular-nums">
              {schedules?.data?.length || 0}
            </span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger>
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 gap-2 group"
              >
                <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-bold tracking-tight">New Time Slot</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 overflow-hidden border-none shadow-2xl max-w-md rounded-3xl">
              <div className="bg-primary/5 p-8 border-b border-primary/10">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-2xl font-bold font-heading">
                  Add Availability
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  Recurring every {format(selectedDate, "EEEE")}
                </p>
              </div>
              <div className="p-8 space-y-6 bg-card">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                      Start Time
                    </Label>
                    <Input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) =>
                        setNewSlot((prev) => ({
                          ...prev,
                          startTime: e.target.value,
                        }))
                      }
                      className="h-12 border-muted bg-muted/30 focus:bg-background transition-colors rounded-xl font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground/70">
                      End Time
                    </Label>
                    <Input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) =>
                        setNewSlot((prev) => ({
                          ...prev,
                          endTime: e.target.value,
                        }))
                      }
                      className="h-12 border-muted bg-muted/30 focus:bg-background transition-colors rounded-xl font-bold"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCreateSlot}
                  disabled={isCreating}
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                >
                  {isCreating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Confirm Slot"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* --- HORIZONTAL DATE PICKER --- */}
      <section className="relative">
        <div className="bg-card/50 backdrop-blur-xl rounded-[2rem] border border-border/50 p-6 shadow-sm overflow-hidden group">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-foreground text-card flex items-center justify-center shadow-lg">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading tracking-tight">
                  Timeline Overview
                </h3>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  {format(selectedDate, "MMMM yyyy")}
                </p>
              </div>
            </div>

            {/* <Popover>
              <PopoverTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 rounded-xl px-4 font-bold border border-border/50 hover:bg-accent transition-all gap-2"
                >
                  <CalendarIcon className="h-4 w-4" />
                  Jump to Date
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 border-none shadow-2xl rounded-2xl"
                align="end"
              >
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="p-3"
                />
              </PopoverContent>
            </Popover> */}
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-2 -mx-2">
            {dayPreview.map((date) => {
              const isActive = isSameDay(date, selectedDate);
              const isToday = isSameDay(date, new Date());
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "shrink-0 w-24 md:w-32 py-5 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 relative",
                    isActive
                      ? "bg-primary text-white shadow-xl shadow-primary/30 scale-[1.02]"
                      : "bg-muted/40 text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {isToday && !isActive && (
                    <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-extrabold uppercase tracking-widest opacity-60",
                    )}
                  >
                    {format(date, "EEE")}
                  </span>
                  <span className="text-2xl md:text-3xl font-black tracking-tighter">
                    {format(date, "dd")}
                  </span>
                  {isActive && (
                    <div className="h-1 w-1 rounded-full bg-white mt-1 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SLOTS GRID --- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
            <h4 className="text-lg font-bold tracking-tight">
              Active Windows{" "}
              <span className="text-muted-foreground font-normal ml-2">
                — {format(selectedDate, "EEEE")}
              </span>
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isFetching ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-[2rem] bg-muted/20 animate-pulse border border-border/50"
              />
            ))
          ) : todaysSchedules.length > 0 ? (
            todaysSchedules.map((schedule: Schedule) => {
              const slots = schedule.slots || [schedule];
              return slots.map((slot: TimeSlot, idx: number) => (
                <Card
                  key={`${schedule.id || schedule._id}-${idx}`}
                  className="rounded-[2rem] border-border/50 shadow-premium bg-card overflow-hidden group hover:shadow-hover hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between h-48 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "h-10 w-10 rounded-xl flex items-center justify-center shadow-inner",
                          slot.isBooked
                            ? "bg-amber-100/50 text-amber-600"
                            : "bg-emerald-100/50 text-emerald-600",
                        )}
                      >
                        {slot.isBooked ? (
                          <History className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-wider border-none",
                          slot.isBooked
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600",
                        )}
                      >
                        {slot.isBooked ? "Reserved" : "Available"}
                      </Badge>
                    </div>

                    {!slot.isBooked && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const id = schedule.id || schedule._id;
                          if (id) handleDelete(id);
                        }}
                        className="h-9 w-9 text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                          Starts
                        </p>
                        <h5 className="text-3xl font-black font-heading tracking-tight">
                          {slot.startTime}
                        </h5>
                      </div>
                      <div className="pt-4 h-px flex-1 bg-linear-to-r from-muted via-muted to-transparent relative">
                        <ChevronRight className="absolute -right-2 -top-2 h-4 w-4 text-muted" />
                      </div>
                      <div className="space-y-0.5 text-right">
                        <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                          Ends
                        </p>
                        <h5 className="text-3xl font-black font-heading tracking-tight text-primary">
                          {slot.endTime}
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500/50" />
                      <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest leading-none">
                        Validated Sync
                      </span>
                    </div>
                  </div>
                </Card>
              ));
            })
          ) : (
            <div className="col-span-full py-24 flex flex-col items-center gap-6 border-2 border-dashed border-muted bg-muted/10 rounded-[2.5rem] transition-all group hover:bg-muted/20 hover:border-primary/20">
              <div className="h-20 w-20 rounded-3xl bg-card shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Clock className="h-8 w-8 text-muted-foreground/20" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="text-2xl font-bold font-heading tracking-tight">
                  No windows defined
                </h4>
                <p className="text-muted-foreground max-w-xs mx-auto text-sm font-medium">
                  Your availability is currently empty for this day. Synchronize
                  a new pulse to start connecting.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(true)}
                className="rounded-xl font-bold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                Create First Slot
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
