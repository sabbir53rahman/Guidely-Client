"use client";

import React, { useMemo, useCallback, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  History,
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  AlertTriangle,
  X,
  Star,
} from "lucide-react";

import { ReviewModal } from "@/components/student/ReviewModal";

import { useGetMyBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useCreateCheckoutSessionMutation } from "@/redux/features/payment/paymentApi";
import { useCancelBookingMutation } from "@/redux/features/booking/bookingApi";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IBooking, ApiResponse } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

// ── Inline confirmation dialog ──────────────────────────────────────────────
function ConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  isLoading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md mx-4 rounded-3xl bg-card border border-border shadow-2xl shadow-destructive/10 p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-8 w-8 rounded-xl bg-muted hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-8 space-y-2">
          <h3 className="text-xl font-black tracking-tight text-foreground">
            Cancel This Booking?
          </h3>
          <p className="text-muted-foreground font-medium leading-relaxed text-sm">
            This will permanently cancel your unpaid booking. This action cannot
            be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-12 rounded-2xl font-bold border-border/60"
          >
            Keep It
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 h-12 rounded-2xl font-bold bg-destructive hover:bg-destructive/90 text-white shadow-lg shadow-destructive/20 gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Cancelling...
              </span>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Yes, Cancel
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function SessionHistoryPage() {
  const { data: bookingsResponse, isLoading: isBookingsLoading } =
    useGetMyBookingsQuery(undefined);
  const [createCheckout, { isLoading: isCheckingOut }] =
    useCreateCheckoutSessionMutation();
  const [cancelBooking, { isLoading: isCancelling }] =
    useCancelBookingMutation();

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handlePayment = useCallback(
    async (bookingId: string) => {
      try {
        const res = await createCheckout(bookingId).unwrap();
        if (res?.success && res?.data?.paymentSessionUrl) {
          window.location.href = res.data.paymentSessionUrl;
        } else {
          toast.error("Failed to generate payment link.");
        }
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Payment initiation failed.");
      }
    },
    [createCheckout],
  );

  const handleConfirmCancel = useCallback(async () => {
    if (!pendingDeleteId) return;
    try {
      await cancelBooking(pendingDeleteId).unwrap();
      toast.success("Booking cancelled successfully.");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to cancel booking.");
    } finally {
      setPendingDeleteId(null);
    }
  }, [cancelBooking, pendingDeleteId]);

  const columns = useMemo<Column<IBooking>[]>(
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
                  {row.mentor?.name?.charAt(0).toUpperCase() || "M"}
                </span>
              )}
            </div>
            <div>
              <p className="font-extrabold text-foreground tracking-tight text-[15px]">
                {row.mentor?.name}
              </p>
              <p className="text-xs text-muted-foreground/70 font-medium">
                {row.mentor?.email}
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
            <p
              className="font-bold tracking-tight text-foreground max-w-[220px] truncate"
              title={row.notes}
            >
              {row.notes || "General Mentorship"}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="flex items-center gap-1 bg-muted rounded-md px-2 py-0.5 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                <Clock className="h-3 w-3" />
                {row.startTime
                  ? format(new Date(row.startTime), "MMM dd, yy")
                  : "N/A"}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground/50">
                —
              </span>
              <span className="text-[11px] font-extrabold tracking-tight text-primary">
                {row.startTime
                  ? format(new Date(row.startTime), "HH:mm")
                  : "N/A"}{" "}
                - {row.endTime ? format(new Date(row.endTime), "HH:mm") : "N/A"}
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
            PENDING:
              "bg-amber-100/50 text-amber-700 border-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.2)]",
            SCHEDULED:
              "bg-emerald-100/50 text-emerald-700 border-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.2)]",
            COMPLETED:
              "bg-blue-100/50 text-blue-700 border-blue-200 shadow-[0_0_10_px_rgba(96,165,250,0.2)]",
            CANCELED:
              "bg-destructive/10 text-destructive border-destructive/20",
          };

          let icon = <AlertCircle className="h-3 w-3 mr-1.5" />;
          if (row.status === "SCHEDULED")
            icon = <CheckCircle2 className="h-3 w-3 mr-1.5" />;
          if (row.status === "COMPLETED")
            icon = <History className="h-3 w-3 mr-1.5" />;

          return (
            <Badge
              variant="outline"
              className={cn(
                "px-4 py-1.5 font-bold rounded-xl border",
                variants[row.status] || variants.PENDING,
              )}
            >
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
              <span className="font-heading font-black text-2xl tracking-tighter text-foreground">
                ${amount}
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-md border-none",
                  isPaid
                    ? "bg-emerald-500/15 text-emerald-700"
                    : "bg-rose-500/10 text-rose-600 animate-pulse",
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
        className: "text-right w-[200px]",
        cell: (row) => {
          const bookingId = row.id || row._id || "";
          const isCancelled = row.status === "CANCELED";
          const isPaid = row.paymentStatus === "PAID";
          const isCompleted = row.status === "COMPLETED";

          // ── Completed state ──────────────────────────────────────────────
          if (isCompleted) {
            return (
              <Button
                onClick={() => {
                  setSelectedMentor({
                    id: row.mentor.id,
                    name: row.mentor.name,
                  });
                  setReviewModalOpen(true);
                }}
                disabled={!!row.review}
                className={cn(
                  "w-full h-11 rounded-xl font-bold gap-2 transition-all active:scale-95 text-sm",
                  row.review
                    ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 cursor-default"
                    : "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20",
                )}
              >
                <Star
                  className={cn("h-4 w-4", row.review && "fill-emerald-600")}
                />
                {row.review ? "Reviewed" : "Give Review"}
              </Button>
            );
          }

          // ── Cancelled state ──────────────────────────────────────────────
          if (isCancelled) {
            return (
              <div className="w-full text-center px-4 py-3 rounded-xl bg-destructive/5 border border-destructive/20">
                <span className="text-[10px] uppercase tracking-widest font-bold text-destructive/60">
                  Cancelled
                </span>
              </div>
            );
          }

          // ── Unpaid — show Pay + Delete ───────────────────────────────────
          if (!isPaid) {
            return (
              <div className="flex flex-col gap-2 w-full">
                <Button
                  onClick={() => handlePayment(bookingId)}
                  disabled={isCheckingOut}
                  className="w-full h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 gap-2 transition-all active:scale-95 group text-sm"
                >
                  <CreditCard className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                  Authorize
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPendingDeleteId(bookingId)}
                  disabled={isCancelling && pendingDeleteId === bookingId}
                  className="w-full h-11 rounded-xl font-bold gap-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all group text-sm"
                >
                  <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Delete
                </Button>
              </div>
            );
          }

          // ── Paid with meeting link ───────────────────────────────────────
          if (row.meetingLink) {
            return (
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl font-bold gap-2 border-2 border-primary/20 bg-primary/5 hover:bg-primary hover:text-white transition-all group"
              >
                <a
                  href={row.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2"
                >
                  Join Room
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Button>
            );
          }

          // ── Paid, no link yet ────────────────────────────────────────────
          return (
            <div className="w-full text-center px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">
                Generating Link...
              </span>
            </div>
          );
        },
      },
    ],
    [isCheckingOut, handlePayment, isCancelling, pendingDeleteId],
  );

  const bookings: IBooking[] =
    (bookingsResponse as unknown as ApiResponse<IBooking[]>)?.data || [];

  return (
    <>
      <ConfirmDeleteDialog
        open={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      {selectedMentor && (
        <ReviewModal
          open={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedMentor(null);
          }}
          mentorId={selectedMentor.id}
          mentorName={selectedMentor.name}
        />
      )}

      <div className=" px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
                <History className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
                Session Lifecycle Management
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
              Your{" "}
              <span className="text-muted-foreground/30 font-light">
                Bookings
              </span>
            </h1>

            <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
              Track your upcoming mentorship sessions, review past engagements,
              and seamlessly finalize your session commitments.
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
            emptyMessage="You haven't booked any sessions yet. Discover mentors to spark your learning journey."
          />
        </section>
      </div>
    </>
  );
}
