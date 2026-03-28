"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import {
  Star,
  Quote,
  Calendar,
  UserCheck,
  MessageSquarePlus,
} from "lucide-react";
import { useGetMyReviewsQuery } from "@/redux/features/review/reviewApi";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Review, ApiResponse } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MyReviewsPage() {
  const { data: reviewsResponse, isLoading } = useGetMyReviewsQuery(undefined);
  const reviews: Review[] =
    (reviewsResponse as unknown as ApiResponse<Review[]>)?.data || [];

  const columns = useMemo<Column<Review>[]>(
    () => [
      {
        key: "mentor",
        header: "Reviewed Mentor",
        cell: (row) => (
          <div className="flex items-center gap-4 py-2">
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
                {row.mentor?.name || "Expert Mentor"}
              </p>
              <p className="text-[11px] text-muted-foreground/70 font-semibold uppercase tracking-wider">
                {row.mentor?.expertise || "Consultant"}
              </p>
            </div>
          </div>
        ),
      },
      {
        key: "rating",
        header: "Your Rating",
        className: "w-[180px]",
        cell: (row) => (
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3.5 w-3.5",
                    star <= row.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/20",
                  )}
                />
              ))}
            </div>
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.15em] ml-0.5">
              {row.rating === 5 && "Outstanding"}
              {row.rating === 4 && "Excellent"}
              {row.rating === 3 && "Satisfactory"}
              {row.rating === 2 && "Fair"}
              {row.rating === 1 && "Poor"}
            </span>
          </div>
        ),
      },
      {
        key: "comment",
        header: "Feedback Content",
        cell: (row) => (
          <div className="relative group max-w-[350px]">
            <Quote className="absolute -top-2 -left-3 h-6 w-6 text-primary/5 z-0" />
            <p
              className="relative z-10 text-sm font-medium text-foreground leading-relaxed italic line-clamp-2"
              title={row.comment || ""}
            >
              {row.comment || "No detailed feedback provided."}
            </p>
          </div>
        ),
      },
      {
        key: "date",
        header: "Date Published",
        className: "text-right pr-8",
        cell: (row) => (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/80">
              <Calendar className="h-3 w-3" />
              {format(new Date(row.createdAt), "MMM dd, yyyy")}
            </div>
            <Badge
              variant="outline"
              className="text-[9px] uppercase tracking-widest font-black py-0 px-2 h-5 rounded-md border-emerald-500/20 bg-emerald-500/5 text-emerald-600"
            >
              Published
            </Badge>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <UserCheck className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Testimonial Ledger
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            My{" "}
            <span className="text-muted-foreground/30 font-light">Reviews</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Archive of your professional feedback. Your insights help maintain
            the elite standard of our mentorship ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <MessageSquarePlus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Feedback
            </p>
            <p className="text-xl font-black text-foreground">
              {reviews.length}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <section className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-[4rem] blur-3xl -z-10 pointer-events-none"></div>

        <DataTable<Review>
          data={reviews}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="You haven't shared your mentorship experiences yet. Complete sessions to publish reviews."
        />
      </section>
    </div>
  );
}
