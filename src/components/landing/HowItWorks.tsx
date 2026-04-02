"use client";

import { Search, Calendar, Video, ArrowRight, UserCircle2 } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-24 bg-background transition-colors duration-500 relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side text */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
              Guidely&apos;s Mentorship is a <br /> game-changer for <br /> your
              career.
            </h2>
            <p className="text-xl text-muted-foreground">
              We guide you through the process, providing mentorship from real
              world professionals.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3 mt-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors">
              Find Mentor
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right Side Vertical Timeline */}
          <div className="relative pl-8 md:pl-0">
            {/* The vertical line */}
            <div className="absolute left-0 md:left-12 top-10 bottom-10 w-0.5 bg-secondary/20" />

            <div className="space-y-12">
              {/* Item 1 */}
              <div className="relative md:pl-24">
                <div className="absolute left-[-5px] md:left-[45px] top-4 h-3 w-3 rounded-full bg-secondary border-2 border-background" />
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 shrink-0 flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Find your mentor
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Search through our curated list of industry experts and
                      find the perfect match.
                    </p>
                    <div className="bg-muted rounded-xl p-3 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                        <UserCircle2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-20 bg-background rounded-full mb-1"></div>
                        <div className="h-1.5 w-12 bg-background/50 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative md:pl-24">
                <div className="absolute left-[-5px] md:left-[45px] top-4 h-3 w-3 rounded-full bg-secondary border-2 border-background" />
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 shrink-0 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Book a Session
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Pick a time that works for you and get instantly booked
                      for a 1-on-1 session.
                    </p>
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative md:pl-24">
                <div className="absolute left-[-5px] md:left-[45px] top-4 h-3 w-3 rounded-full bg-secondary border-2 border-background" />
                <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-xl flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 shrink-0 flex items-center justify-center">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Start Learning
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect via HD video and apply what you learn to advance
                      your career.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
