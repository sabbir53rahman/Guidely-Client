"use client";

import React, { useMemo } from "react";
import { format } from "date-fns";
import {
  Star,
  Quote,
  Calendar,
  UserCircle,
  HeartHandshake,
} from "lucide-react";
import { useGetMyReviewsQuery } from "@/redux/features/review/reviewApi";
import { DataTable, Column } from "@/components/ui/data-table";
import { Review } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Pagination } from "@/components/shared/Pagination";

export default function MentorReviewsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: reviewsResponse, isLoading } = useGetMyReviewsQuery({ page, limit });
  const reviews: Review[] = reviewsResponse?.data || [];
  const meta = reviewsResponse?.meta;

  const columns = useMemo<Column<Review>[]>(
    () => [
      {
        key: "student",
        header: "Student Contributor",
        cell: (row) => (
          <div className="flex items-center gap-4 py-2">
            <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-bold overflow-hidden shadow-inner border border-secondary/10">
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
                {row.student?.name || "Global Student"}
              </p>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <p className="text-[10px] text-muted-foreground/70 font-bold uppercase tracking-widest">
                  Verified Session
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "rating",
        header: "Student Rating",
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
                      ? "fill-primary text-primary"
                      : "text-muted-foreground/20",
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-foreground">
                {row.rating.toFixed(1)}
              </span>
              <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
                / 5.0 Rating
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "comment",
        header: "Feedback Experience",
        cell: (row) => (
          <div className="relative group max-w-[400px]">
            <Quote className="absolute -top-2 -left-3 h-6 w-6 text-primary/5 z-0 rotate-180" />
            <p
              className="relative z-10 text-sm font-medium text-foreground leading-relaxed antialiased italic"
              title={row.comment || ""}
            >
              {row.comment ||
                "The student enjoyed the session but left no comment."}
            </p>
          </div>
        ),
      },
      {
        key: "date",
        header: "Review Timestamp",
        className: "text-right pr-8",
        cell: (row) => (
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground/80">
              <Calendar className="h-3 w-3 text-primary" />
              {format(new Date(row.createdAt), "MMM dd, yyyy")}
            </div>
            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">
              {format(new Date(row.createdAt), "HH:mm a")}
            </p>
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
              <UserCircle className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Mentor Reputation
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Student{" "}
            <span className="text-muted-foreground/30 font-light">
              Feedback
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Your professional track record. Review feedback from your students
            to understand your impact and refine your mentorship approach.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/20">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Reviews
            </p>
            <p className="text-xl font-black text-foreground">
              {meta?.total || reviews.length}
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
          emptyMessage="No student feedback has been recorded for your profile yet. Completed sessions will appear here soon."
        />

        {/* Pagination */}
        {!isLoading && reviews.length > 0 && meta && (
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
