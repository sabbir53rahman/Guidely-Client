"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookingDialog } from "@/components/mentor/BookingDialog";
import { useGetMentorByIdQuery } from "@/redux/features/mentor/mentorApi";
import {
  Star,
  MapPin,
  Briefcase,
  Clock,
  ChevronRight,
  Award,
  CheckCircle2,
  Loader2,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function MentorProfilePage() {
  const { id } = useParams();
  const { data, isLoading } = useGetMentorByIdQuery(id as string);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="text-muted-foreground font-black tracking-widest text-sm uppercase italic">
          Consulting the experts...
        </p>
      </div>
    );
  }

  const mentor = data?.data;

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-black">Mentor not found</h2>
      </div>
    );
  }

  const {
    user,
    bio = "No bio available.",
    expertise = "",
    experience = 0,
    averageRating = 0,
  } = mentor;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {/* Profile Header Block */}
        <section className="relative pt-20 pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent dark:from-primary/5" />

          {/* Decorative Orbs */}
          <div className="absolute top-20 right-0 h-[600px] w-[600px] bg-primary/10 rounded-full blur-[120px] -mr-80" />
          <div className="absolute top-40 left-0 h-[400px] w-[400px] bg-secondary/15 rounded-full blur-[100px] -ml-40" />

          <div className="container mx-auto max-w-7xl px-4 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 sm:gap-16">
              {/* Profile Image & Quick Stats */}
              <div className="lg:w-1/3 space-y-8">
                <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-background group bg-muted">
                  <Image
                    src={
                      user?.avatar ||
                      user?.image ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600"
                    }
                    alt={user?.name || mentor.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 text-white flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      Verified Expert
                    </div>
                    <span>Available</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background p-6 rounded-[2rem] border border-border shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-foreground">
                      {averageRating || 0}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                        Rating
                      </span>
                    </div>
                  </div>
                  <div className="bg-background p-6 rounded-[2rem] border border-border shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-foreground">
                      {experience || 0}
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Clock className="h-3 w-3 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                        Years Exp.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Profile Info */}
              <div className="flex-1 space-y-10">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                    <h1 className="text-5xl sm:text-7xl font-heading font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground via-foreground/90 to-primary">
                      {user?.name || mentor.name}
                    </h1>
                    <div className="inline-flex h-10 items-center px-4 rounded-full bg-primary/10 text-primary text-xs font-black border border-primary/20 shadow-inner">
                      VERIFIED PROFESSIONAL
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-muted-foreground font-medium text-lg leading-relaxed mb-8">
                    <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-2xl border border-border shadow-sm">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Professional Mentor
                    </div>
                    <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-2xl border border-border shadow-sm">
                      <MapPin className="h-5 w-5 text-secondary" />
                      Remote Globally
                    </div>
                  </div>

                  <p className="text-xl text-muted-foreground leading-relaxed font-normal max-w-3xl italic">
                    &quot;{bio}&quot;
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {expertise && (
                    <div className="px-6 py-3 rounded-2xl bg-background border border-border shadow-sm flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
                        Primary Expertise
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {expertise}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-8 flex flex-col sm:flex-row items-center gap-8">
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button
                          size="lg"
                          className="rounded-2xl px-12 h-16 text-lg font-black bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-transform active:scale-[0.98]"
                        >
                          Book a Session
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                      }
                    />
                    <BookingDialog mentor={mentor} />
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Details */}
        <section className="container mx-auto max-w-7xl px-4 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left: About & Experience */}
            <div className="lg:col-span-2 space-y-16">
              <div className="space-y-8">
                <h2 className="text-3xl font-black flex items-center gap-4">
                  <Award className="h-8 w-8 text-primary" />
                  Expertise & Background
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-normal">
                  <p>
                    With intensive years of experience in the industry, I have
                    helped numerous products scale from concept to millions of
                    users. My approach to mentorship is hands-on and tailored to
                    your specific goals.
                  </p>
                  <p>
                    Whether you are looking to level up your technical skills,
                    navigate a career transition, or build a startup from
                    scratch, I can provide the strategic direction and practical
                    advice you need.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-black flex items-center gap-4">
                  <Star className="h-8 w-8 text-yellow-400" />
                  Recent Reviews
                </h2>

                <div className="grid gap-6">
                  {mentor.reviews && mentor.reviews.length > 0 ? (
                    mentor.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="bg-background p-8 rounded-[2.5rem] border border-border shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            March 2024
                          </span>
                        </div>
                        <p className="text-lg font-medium text-foreground mb-6">
                          &quot;{review.comment}&quot;
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden relative border border-border">
                            <Image
                              src={
                                review.student.avatar ||
                                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"
                              }
                              alt={review.student.name}
                              fill
                            />
                          </div>
                          <span className="font-bold text-sm">
                            {review.student.name}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-[2.5rem] border border-dashed border-border">
                      <p className="text-muted-foreground font-medium italic">
                        No reviews yet. Be the first to learn with this mentor!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Sticky Sidebar for availability info */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                <div className="bg-primary rounded-[2.5rem] p-10 text-primary-foreground shadow-2xl shadow-primary/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-40 w-40 bg-secondary/30 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 h-32 w-32 bg-background/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

                  <h3 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10">
                    <CalendarDays className="h-6 w-6 text-primary-foreground/90" />
                    Availability
                  </h3>
                  <div className="space-y-4 mb-8 relative z-10">
                    <div className="flex justify-between items-center py-3 border-b border-primary-foreground/20 uppercase tracking-widest text-[10px] font-black text-primary-foreground/70">
                      <span>Workdays</span>
                      <span className="text-primary-foreground">Mon — Fri</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10 uppercase tracking-widest text-[10px] font-black text-white/50">
                      <span>Timezone</span>
                      <span className="text-white">GMT +6:00</span>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button
                          variant="secondary"
                          className="w-full h-14 rounded-2xl font-black text-lg bg-secondary text-secondary-foreground shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-transform active:scale-[0.98]"
                        >
                          Book Session
                        </Button>
                      }
                    />
                    <BookingDialog mentor={mentor} />
                  </Dialog>
                </div>

                <div className="bg-background rounded-[2.5rem] p-10 border border-border shadow-premium">
                  <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary" />
                    Badges & Awards
                  </h3>
                  <div className="space-y-5">
                    {[
                      { label: "Top Rated 2024", color: "bg-yellow-400" },
                      { label: "Elite Mentor", color: "bg-primary" },
                      { label: "Community Leader", color: "bg-secondary" },
                    ].map((badge) => (
                      <div
                        key={badge.label}
                        className="flex items-center gap-4 bg-muted/50 p-3 rounded-2xl"
                      >
                        <div
                          className={`h-3 w-3 rounded-full ${badge.color} shadow-lg ring-4 ring-background`}
                        />
                        <span className="text-sm font-bold text-foreground">
                          {badge.label}
                        </span>
                      </div>
                    ))}
                  </div>
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
