"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookingDialog } from "@/components/mentor/BookingDialog";
import { useGetMentorByIdQuery } from "@/redux/features/mentor/mentorApi";
import {
  Star,
  Briefcase,
  Clock,
  Award,
  CheckCircle2,
  Loader2,
  CalendarDays,
  Sparkles,
  TrendingUp,
  MessageSquareQuote,
  BadgeCheck,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";

export default function MentorProfilePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetMentorByIdQuery(id as string);

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="relative">
          <div className="h-16 w-16 rounded-full bg-primary/10 animate-pulse" />
          <Loader2 className="h-8 w-8 text-primary animate-spin absolute inset-0 m-auto" />
        </div>
        <p className="text-muted-foreground text-sm font-semibold tracking-widest uppercase">
          Loading profile…
        </p>
      </div>
    );
  }

  const mentor = data?.data;

  /* ── Not found ── */
  if (!mentor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="text-6xl">🔍</div>
        <h2 className="text-2xl font-black text-foreground">
          Mentor not found
        </h2>
        <p className="text-muted-foreground">
          The mentor you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const {
    user,
    bio,
    expertise,
    experience,
    averageRating,
    hourlyRate,
    isAvailable,
    reviews,
  } = mentor;

  const avatarSrc =
    user?.avatar ||
    user?.image ||
    user?.profilePhoto ||
    "/images/default-avatar.png";

  const rating = averageRating ?? 0;
  const reviewCount = reviews?.length ?? 0;

  const skills = expertise
    ? expertise
        .split(/[,/]/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const statCards = [
    {
      icon: Star,
      value: rating.toFixed(1),
      label: "Rating",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      icon: Clock,
      value: `${experience ?? 0}+`,
      label: "Yrs Exp.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Users,
      value: `${reviewCount}`,
      label: "Reviews",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      icon: DollarSign,
      value: `$${hourlyRate ?? 0}`,
      label: "Per Hour",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-8 pb-0">
          {/* Background gradient mesh */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-background to-secondary/8 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            {/* ── Main hero card ── */}
            <div className="relative rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-2xl shadow-primary/5 overflow-hidden">
              {/* Gradient accent top bar */}
              <div className="h-1.5 w-full bg-linear-to-r from-primary via-violet-500 to-secondary" />

              <div className="p-6 sm:p-10 lg:p-12">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                  {/* ── Avatar column ── */}
                  <div className="flex flex-col items-center lg:items-start gap-6 lg:w-64 shrink-0">
                    {/* Avatar with gradient ring */}
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52">
                      <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary via-violet-500 to-secondary p-[3px] shadow-2xl shadow-primary/40">
                        <div className="w-full h-full rounded-[calc(1.5rem-3px)] overflow-hidden bg-card">
                          <Image
                            src={avatarSrc}
                            alt={user?.name ?? "Mentor"}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                      </div>
                      {/* Availability dot */}
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 bg-card border border-border rounded-full pl-2 pr-3 py-1.5 shadow-lg">
                        {isAvailable ? (
                          <>
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                            </span>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              Available
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                            <span className="text-xs font-bold text-muted-foreground">
                              Busy
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick stat pills */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {statCards.map(
                        ({ icon: Icon, value, label, color, bg }) => (
                          <div
                            key={label}
                            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-muted/40 border border-border/60 hover:border-primary/30 transition-colors"
                          >
                            <div className={`p-1.5 rounded-lg ${bg} mb-1.5`}>
                              <Icon className={`h-3.5 w-3.5 ${color}`} />
                            </div>
                            <span className="text-base font-black text-foreground leading-tight">
                              {value}
                            </span>
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                              {label}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* ── Info column ── */}
                  <div className="flex-1 min-w-0 flex flex-col gap-6">
                    {/* Name + badges */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <Badge className="rounded-full px-3 py-1 text-xs font-bold bg-primary/10 text-primary border-primary/20">
                          <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                          Verified Professional
                        </Badge>
                        <Badge className="rounded-full px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                          <Award className="h-3.5 w-3.5 mr-1" />
                          Top Rated
                        </Badge>
                      </div>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight bg-linear-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent leading-tight mb-2">
                        {user?.name ?? mentor.name}
                      </h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4 shrink-0 text-primary" />
                        <span className="text-base font-medium">
                          {expertise ?? "Professional Mentor"}
                        </span>
                        <span className="text-border">·</span>
                        <span className="text-sm">
                          {experience ?? 0}+ years experience
                        </span>
                      </div>
                    </div>

                    {/* Star rating row */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`h-5 w-5 ${
                              s <= Math.round(rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-black text-foreground">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({reviewCount}{" "}
                        {reviewCount === 1 ? "review" : "reviews"})
                      </span>
                    </div>

                    {/* Bio */}
                    <div className="relative">
                      <MessageSquareQuote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                      <p className="pl-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-2xl">
                        {bio ??
                          "Passionate mentor dedicated to helping students unlock their full potential through personalised, hands-on guidance and real-world insights."}
                      </p>
                    </div>

                    {/* Skill chips */}
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                          >
                            <Sparkles className="h-3.5 w-3.5" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA row */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 mt-auto">
                      <Link href={`/book-session`}>
                        <Button
                          size="lg"
                          className="w-full sm:w-auto rounded-2xl px-10 h-14 text-base font-bold bg-linear-to-r from-primary to-violet-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.03] transition-all duration-300"
                        >
                          <CalendarDays className="mr-2 h-5 w-5" />
                          Book a Session
                        </Button>
                      </Link>

                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        Free 15-min intro call included
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTENT SECTION
        ══════════════════════════════════════════ */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ── Left: About & Reviews ── */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  About & Background
                </h2>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    With{" "}
                    <strong className="text-foreground font-semibold">
                      {experience ?? 0}+ years
                    </strong>{" "}
                    of hands-on industry experience, I&apos;ve helped
                    professionals at all levels go from confusion to clarity —
                    whether that&apos;s breaking into tech, leading engineering
                    teams, or launching their own venture.
                  </p>
                  <p>
                    My mentorship style is direct and tailored to your unique
                    goals. I blend strategic thinking with tactical execution so
                    every session delivers real, actionable value you can apply
                    immediately.
                  </p>
                  {bio && (
                    <p className="pt-2 border-t border-border/60 italic text-foreground/70">
                      &quot;{bio}&quot;
                    </p>
                  )}
                </div>
              </div>

              {/* Expertise highlights */}
              {skills.length > 0 && (
                <div className="bg-card rounded-3xl border border-border p-8 shadow-sm">
                  <h2 className="text-2xl font-black text-foreground flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-violet-500/10">
                      <Sparkles className="h-5 w-5 text-violet-500" />
                    </div>
                    Areas of Expertise
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-border bg-muted/40 hover:bg-primary/8 hover:border-primary/30 transition-all duration-200"
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{
                            background: `hsl(${(i * 60 + 220) % 360}, 70%, 60%)`,
                          }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-black text-foreground flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-amber-500/10">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                  Student Reviews
                  {reviewCount > 0 && (
                    <span className="ml-auto text-base font-semibold text-muted-foreground">
                      {reviewCount} total
                    </span>
                  )}
                </h2>

                {reviews && reviews.length > 0 ? (
                  <div className="grid gap-5">
                    {reviews.map((review) => (
                      <div
                        key={review._id ?? review.id}
                        className="group bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 rounded-2xl overflow-hidden bg-muted border border-border shrink-0">
                              <Image
                                src={
                                  review.student?.avatar ||
                                  review.student?.profilePhoto ||
                                  "/images/default-avatar.png"
                                }
                                alt={review.student?.name ?? "Student"}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-foreground">
                                {review.student?.name ?? "Anonymous"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                          {/* Star rating */}
                          <div className="flex items-center gap-0.5 shrink-0">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`h-4 w-4 ${
                                  s <= (review.rating ?? 5)
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-muted text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Comment */}
                        {review.comment && (
                          <p className="text-sm text-muted-foreground leading-relaxed pl-14">
                            &quot;{review.comment}&quot;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 rounded-3xl border border-dashed border-border bg-muted/20">
                    <div className="text-4xl mb-3">💬</div>
                    <p className="text-muted-foreground font-medium">
                      No reviews yet.
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Be the first to learn with this mentor!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right: Sticky Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Pricing + Book */}
                <div className="relative rounded-3xl border border-border bg-card shadow-xl shadow-primary/5 overflow-hidden">
                  {/* Color bar */}
                  <div className="h-1 w-full bg-linear-to-r from-primary to-violet-600" />

                  <div className="p-7">
                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-4xl font-black text-foreground">
                        ${hourlyRate ?? 0}
                      </span>
                      <span className="text-muted-foreground font-medium">
                        /session
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      Free 15-min intro call
                    </p>

                    {/* Availability rows */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2.5 border-b border-border/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Availability
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          {isAvailable ? "Open for bookings" : "Currently busy"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-border/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Response
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          Within 24h
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 border-b border-border/60">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Format
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          Video call
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Timezone
                        </span>
                        <span className="text-xs font-semibold text-foreground">
                          Flexible
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button className="w-full h-13 rounded-2xl font-bold text-base bg-linear-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
                            <CalendarDays className="mr-2 h-5 w-5" />
                            Book a Session
                            <ChevronRight className="ml-auto h-5 w-5" />
                          </Button>
                        }
                      />
                      <BookingDialog mentor={mentor} />
                    </Dialog>
                  </div>
                </div>

                {/* Highlights card */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-base font-black text-foreground flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    Why Choose This Mentor
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { text: "Personalised 1-on-1 sessions", icon: "🎯" },
                      { text: "Real-world industry experience", icon: "💼" },
                      { text: "Structured learning path", icon: "🗺️" },
                      { text: "Actionable feedback every session", icon: "⚡" },
                      { text: "Flexible scheduling", icon: "📅" },
                    ].map((item) => (
                      <li
                        key={item.text}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <span className="text-base shrink-0">{item.icon}</span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
