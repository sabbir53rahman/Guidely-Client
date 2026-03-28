"use client";

import React, { useMemo, useCallback, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  History,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Video,
  Link as LinkIcon,
  X,
} from "lucide-react";


import { useGetMyBookingsQuery, useUpdateBookingStatusMutation } from "@/redux/features/booking/bookingApi";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IBooking, ApiResponse } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";

// ── Meeting Link Dialog ─────────────────────────────────────────────────────
function UpdateLinkDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
  initialLink = "",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (link: string) => void;
  isLoading: boolean;
  initialLink?: string;
}) {
  const [link, setLink] = useState(initialLink);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-4 rounded-3xl bg-card border border-border shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose} className="absolute top-5 right-5 h-8 w-8 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors">
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-black tracking-tight text-foreground">Set Meeting Link</h3>
            <p className="text-muted-foreground text-sm font-medium">Provide a Jitsi, Zoom, or Google Meet URL for this session.</p>
          </div>

          <div className="space-y-4">
            <div className="relative group">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://meet.jit.si/..."
                className="pl-12 h-14 rounded-2xl bg-muted/50 border-border/50 focus:bg-background transition-all"
              />
            </div>

            <Button
              onClick={() => onConfirm(link)}
              disabled={isLoading || !link}
              className="w-full h-14 rounded-2xl font-bold bg-primary text-white shadow-xl shadow-primary/20 gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  Updating...
                </span>
              ) : (
                <>
                  <Video className="h-4 w-4" />
                  Save Meeting Link
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ManageSessionsPage() {
  const { data: bookingsResponse, isLoading: isBookingsLoading } = useGetMyBookingsQuery(undefined);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateBookingStatusMutation();

  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  const handleUpdateLink = useCallback(async (link: string) => {
    if (!selectedBooking) return;
    try {
      // Assuming the API can handle meetingLink in the patch body
      await updateStatus({
        id: selectedBooking.id,
        // Using any cast here if IBooking/mutation args don't yet explicitly include meetingLink
        // but we know the backend supports it.
        meetingLink: link,
      } as Parameters<typeof updateStatus>[0]).unwrap();

      toast.success("Meeting link updated successfully.");
      setLinkDialogOpen(false);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update link.");
    }
  }, [updateStatus, selectedBooking]);

  const handleStatusChange = useCallback(async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Session marked as ${status.toLowerCase()}.`);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update status.");
    }
  }, [updateStatus]);

  const columns = useMemo<Column<IBooking>[]>(
    () => [
      {
        key: "student",
        header: "Student Information",
        cell: (row) => (
          <div className="flex items-center gap-4 py-1">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shadow-inner border border-primary/10">
              {row.student?.profilePhoto ? (
                <Image
                  src={row.student.profilePhoto}
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                  alt="student"
                />
              ) : (
                <span className="text-xl font-heading">
                  {row.student?.name?.charAt(0).toUpperCase() || "S"}
                </span>
              )}
            </div>
            <div>
              <p className="font-extrabold text-foreground tracking-tight text-[15px]">
                {row.student?.name}
              </p>
              <p className="text-xs text-muted-foreground/70 font-medium">
                {row.student?.email}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "notes",
        header: "Agenda & Timing",
        cell: (row) => (
          <div className="py-1">
            <p className="font-bold tracking-tight text-foreground max-w-[220px] truncate" title={row.notes}>
              {row.notes || "General Mentorship"}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="flex items-center gap-1 bg-muted rounded-md px-2 py-0.5 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                <Clock className="h-3 w-3" />
                {row.startTime ? format(new Date(row.startTime), "MMM dd, yy") : "N/A"}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/50">—</span>
              <span className="text-[11px] font-extrabold tracking-tight text-primary">
                {row.startTime ? format(new Date(row.startTime), "HH:mm") : "N/A"} -{" "}
                {row.endTime ? format(new Date(row.endTime), "HH:mm") : "N/A"}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Session State",
        cell: (row) => {
          const variants: Record<string, string> = {
            PENDING: "bg-amber-100/50 text-amber-700 border-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.2)]",
            SCHEDULED: "bg-emerald-100/50 text-emerald-700 border-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.2)]",
            COMPLETED: "bg-blue-100/50 text-blue-700 border-blue-200 shadow-[0_0_10px_rgba(96,165,250,0.2)]",
            CANCELED: "bg-destructive/10 text-destructive border-destructive/20",
          };

          let icon = <AlertCircle className="h-3 w-3 mr-1.5" />;
          if (row.status === "SCHEDULED") icon = <CheckCircle2 className="h-3 w-3 mr-1.5" />;
          if (row.status === "COMPLETED") icon = <History className="h-3 w-3 mr-1.5" />;

          return (
            <Badge variant="outline" className={cn("px-4 py-1.5 font-bold rounded-xl border", variants[row.status] || variants.PENDING)}>
              <span className="flex items-center uppercase text-[10px] tracking-widest">
                {icon}
                {row.status}
              </span>
            </Badge>
          );
        },
      },
      {
        key: "payment",
        header: "Investment",
        cell: (row) => {
          const isPaid = row.paymentStatus === "PAID";
          const amount = row.payment?.amount || row.mentor?.hourlyRate || 0;
          return (
            <div className="flex flex-col gap-1.5 items-start">
              <span className="font-heading font-black text-2xl tracking-tighter text-foreground">${amount}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-md border-none",
                  isPaid ? "bg-emerald-500/15 text-emerald-700" : "bg-rose-500/10 text-rose-600 animate-pulse",
                )}
              >
                {isPaid ? "Settled" : "Awaiting"}
              </Badge>
            </div>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        className: "text-right w-[240px]",
        cell: (row) => {
          const isCancelled = row.status === "CANCELED";
          const isCompleted = row.status === "COMPLETED";

          if (isCancelled) {
            return (
              <div className="w-full text-center px-4 py-3 rounded-xl bg-destructive/5 border border-destructive/20">
                <span className="text-[10px] uppercase tracking-widest font-bold text-destructive/60">Cancelled</span>
              </div>
            );
          }

          if (isCompleted) {
             return (
               <div className="w-full text-center px-4 py-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                 <span className="text-[10px] uppercase tracking-widest font-bold text-blue-500/60">Session Finished</span>
               </div>
             );
          }

          return (
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={() => {
                  setSelectedBooking(row);
                  setLinkDialogOpen(true);
                }}
                className="w-full h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 gap-2 transition-all active:scale-95 group text-sm"
              >
                {row.meetingLink ? <ExternalLink className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                {row.meetingLink ? "Edit Link" : "Set Room"}
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleStatusChange(row.id, "COMPLETED")}
                  className="flex-1 h-11 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 text-white gap-2 transition-all active:scale-95 text-xs"
                >
                   Finalize
                </Button>
                <Button
                   onClick={() => handleStatusChange(row.id, "CANCELED")}
                   variant="outline"
                   className="flex-1 h-11 rounded-xl font-bold border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all text-xs"
                >
                   Drop
                </Button>
              </div>
            </div>
          );
        },
      },
    ],
    [handleStatusChange],
  );

  const bookings: IBooking[] = (bookingsResponse as unknown as ApiResponse<IBooking[]>)?.data || [];

  return (
    <>
      <UpdateLinkDialog
        open={linkDialogOpen}
        onClose={() => setLinkDialogOpen(false)}
        onConfirm={handleUpdateLink}
        isLoading={isUpdating}
        initialLink={selectedBooking?.meetingLink}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                <Video className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Mentor Command Center</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
              Manage <span className="text-muted-foreground/30 font-light">Sessions</span>
            </h1>

            <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
              Orchestrate your mentorship workflow. Set meeting rooms, track attendee status, and finalize your professional engagements.
            </p>
          </div>
        </div>

        {/* TABLE SECTION */}
        <section className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-[4rem] blur-3xl -z-10 pointer-events-none"></div>

          <DataTable<IBooking>
            data={bookings}
            columns={columns}
            isLoading={isBookingsLoading}
            emptyMessage="No mentorship sessions discovered in your command legacy. Time to synchronize with new students."
          />
        </section>
      </div>
    </>
  );
}
