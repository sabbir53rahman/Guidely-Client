"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Video,
  ArrowRight,
  UserCircle2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Find your mentor",
    description:
      "Search through our curated list of industry experts and find the perfect match for your career goals.",
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    preview: (
      <div className="bg-muted/50 rounded-xl p-3 flex items-center gap-3 border border-border/50">
        <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center shadow-sm">
          <UserCircle2 className="h-5 w-5 text-blue-500" />
        </div>
        <div className="flex-1">
          <div className="h-2 w-20 bg-foreground/10 rounded-full mb-1"></div>
          <div className="h-1.5 w-12 bg-foreground/5 rounded-full"></div>
        </div>
        <div className="h-6 w-14 rounded-md bg-blue-500/20 flex items-center justify-center">
          <div className="h-1.5 w-8 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    icon: Calendar,
    title: "Book a Session",
    description:
      "Pick a time that works for you and get instantly booked for a deep-dive 1-on-1 session.",
    color: "from-indigo-500 to-purple-400",
    bg: "bg-indigo-500/10",
    preview: (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-8 flex-1 rounded-lg border border-border/50 flex items-center justify-center text-[10px] font-bold ${i === 2 ? "bg-indigo-500 text-white border-indigo-500" : "bg-background"}`}
          >
            {i === 2 ? "10:00" : "—"}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Video,
    title: "Start Learning",
    description:
      "Connect via HD video, share screens, and apply what you learn to reclaim your career trajectory.",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10",
    preview: (
      <div className="relative h-12 rounded-xl bg-muted/30 border border-border/50 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/5 to-transparent"></div>
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full bg-emerald-500/20 border-2 border-background flex items-center justify-center">
            <Video className="h-3 w-3 text-emerald-500" />
          </div>
          <div className="h-6 w-6 rounded-full bg-indigo-500/20 border-2 border-background flex items-center justify-center">
            <UserCircle2 className="h-3 w-3 text-indigo-500" />
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-10 md:py-24 bg-background relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left Side: Static Content */}
          <div
            className={`sticky top-32 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Simple 3-Step Process</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.05] tracking-tight mb-8">
              Mentorship that is a <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_auto] animate-bg-slide">
                Game-Changer.
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              We guide you through the process, providing mentorship from
              real-world professionals who have been in your shoes.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "No hidden fees",
                "Verified mentors only",
                "Flexible scheduling",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-foreground/80 font-medium"
                >
                  <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <button className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Side: Stepped Timeline */}
          <div className="space-y-12 relative mt-20 md:mt-0 py-8">
            {/* The animated vertical line — hidden on mobile, shown md+ */}
            <div className="hidden md:block absolute left-12 top-0 bottom-0 w-1 bg-muted/30 rounded-full overflow-hidden">
              <div
                className={`absolute top-0 left-0 w-full bg-linear-to-b from-primary via-secondary to-transparent transition-all duration-1500 ease-in-out origin-top`}
                style={{ height: mounted ? "100%" : "0%" }}
              />
            </div>

            {STEPS.map((step, idx) => (
              <div
                key={step.title}
                className={`relative pl-16 md:pl-28 transition-all duration-1000 ease-out`}
                style={{
                  transitionDelay: `${mounted ? (idx + 1) * 300 : 0}ms`,
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(20px)",
                }}
              >
                {/* Step Circle */}
                <div
                  className={`absolute left-0 md:left-6 top-1/2 -translate-y-1/2 md:top-4 md:translate-y-0 h-12 w-12 rounded-2xl bg-card border-2 border-background shadow-xl flex items-center justify-center z-10 group`}
                >
                  <div
                    className={`h-8 w-8 rounded-xl bg-linear-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Step Card */}
                <div className="group bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-5 md:p-7 shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors" />

                  <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2 block text-muted-foreground/50">
                        Step 0{idx + 1}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="hidden md:block w-32 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.preview}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
