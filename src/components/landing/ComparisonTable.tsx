"use client";

import { CheckCircle2, XCircle, MinusCircle, Zap } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    feature: "Real-time Code Review",
    desc: "Get instant feedback on your actual code",
    guidely: "full",
    courses: "none",
    youtube: "none",
  },
  {
    feature: "1-on-1 Video Sessions",
    desc: "Dedicated focus on your specific problems",
    guidely: "full",
    courses: "none",
    youtube: "none",
  },
  {
    feature: "Personalized Learning Path",
    desc: "Tailored roadmap built around your goals",
    guidely: "full",
    courses: "partial",
    youtube: "none",
  },
  {
    feature: "Industry Networking",
    desc: "Introductions to real professionals",
    guidely: "full",
    courses: "none",
    youtube: "none",
  },
  {
    feature: "Accountability & Progress Tracking",
    desc: "Stay on track with guided milestones",
    guidely: "full",
    courses: "partial",
    youtube: "none",
  },
  {
    feature: "Interview & Salary Negotiation Prep",
    desc: "Mock interviews with working professionals",
    guidely: "full",
    courses: "partial",
    youtube: "partial",
  },
  {
    feature: "Group Workshops & Live Q&A",
    desc: "Learn alongside peers from your community",
    guidely: "full",
    courses: "none",
    youtube: "partial",
  },
  {
    feature: "Satisfaction Guarantee",
    desc: "Full refund if you're not happy after session 1",
    guidely: "full",
    courses: "none",
    youtube: "none",
  },
];

type FeatureStatus = "full" | "partial" | "none";

function StatusIcon({ status }: { status: FeatureStatus }) {
  if (status === "full")
    return (
      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
    );
  if (status === "partial")
    return <MinusCircle className="w-5 h-5 text-amber-500 fill-amber-500/20" />;
  return <XCircle className="w-5 h-5 text-muted-foreground/40 fill-muted/10" />;
}

export function ComparisonTable() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden border-y border-border/30">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 fill-current" />
            <span>The Guidely Advantage</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Why pay for a mentor when{" "}
            <span className="text-primary">YouTube is free?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Because free content teaches everyone the same thing. A mentor
            teaches{" "}
            <span className="font-semibold text-foreground italic">you</span>.
          </p>
        </div>

        {/* Table */}
        <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] bg-muted/30 border-b border-border/50">
            <div className="p-5 md:p-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Feature
              </p>
            </div>
            <div className="p-5 md:p-6 text-center relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                  Best
                </span>
              </div>
              <p className="text-sm font-black text-primary mt-2">Guidely</p>
            </div>
            <div className="p-5 md:p-6 text-center">
              <p className="text-sm font-bold text-muted-foreground">
                Online Courses
              </p>
            </div>
            <div className="p-5 md:p-6 text-center">
              <p className="text-sm font-bold text-muted-foreground">YouTube</p>
            </div>
          </div>

          {/* Table Rows */}
          {FEATURES.map((row, idx) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1.8fr_1fr_1fr_1fr] border-b border-border/30 last:border-b-0 hover:bg-muted/10 transition-colors ${idx % 2 === 0 ? "" : "bg-muted/5"}`}
            >
              {/* Feature Name */}
              <div className="p-4 md:p-6 flex flex-col justify-center">
                <p className="font-bold text-foreground text-sm md:text-base">
                  {row.feature}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">
                  {row.desc}
                </p>
              </div>

              {/* Guidely */}
              <div className="p-4 md:p-6 flex items-center justify-center bg-primary/3">
                <StatusIcon status={row.guidely as FeatureStatus} />
              </div>

              {/* Online Courses */}
              <div className="p-4 md:p-6 flex items-center justify-center">
                <StatusIcon status={row.courses as FeatureStatus} />
              </div>

              {/* YouTube */}
              <div className="p-4 md:p-6 flex items-center justify-center">
                <StatusIcon status={row.youtube as FeatureStatus} />
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 bg-muted/20 border-t border-border/30 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fully
              supported
            </span>
            <span className="flex items-center gap-1.5">
              <MinusCircle className="w-4 h-4 text-amber-500" /> Partially
              available
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-muted-foreground/40" /> Not
              available
            </span>
          </div>
        </div>

        {/* CTA Below Table */}
        <div className="text-center mt-10">
          <Link href="/mentors">
            <button className="group inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/25">
              Start Free with Guidely
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
