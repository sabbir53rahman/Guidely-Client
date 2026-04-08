"use client";

import { useState } from "react";
import {
  Code2,
  Server,
  Mic,
  Briefcase,
  Layers,
  Bell,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const UPCOMING_FEATURES = [
  {
    icon: Code2,
    tag: "Portfolio",
    title: "Live Portfolio Review",
    desc: "Get real-time critique on your projects from senior engineers at top companies.",
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/20",
  },
  {
    icon: Server,
    tag: "System Design",
    title: "System Design Deep Dives",
    desc: "Master distributed systems, caching, and scalability with Staff-level mentors.",
    color: "from-indigo-500 to-purple-400",
    bg: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-500/20",
  },
  {
    icon: Mic,
    tag: "Recruiting",
    title: "Q&A with FAANG Recruiters",
    desc: "Ask real technical recruiters your burning questions in a live open session.",
    color: "from-rose-500 to-pink-400",
    bg: "bg-rose-500/10",
    textColor: "text-rose-500",
    borderColor: "border-rose-500/20",
  },
  {
    icon: Layers,
    tag: "Frontend",
    title: "Pixel-Perfect UI Workshops",
    desc: "Build polished, accessible interfaces with senior frontend engineers live.",
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/20",
  },
  {
    icon: Briefcase,
    tag: "Career",
    title: "Salary Negotiation Masterclass",
    desc: "Learn how to negotiate $200K+ offers with confidence, from those who've done it.",
    color: "from-amber-500 to-orange-400",
    bg: "bg-amber-500/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/20",
  },
];

export function Workshops() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Coming Soon</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-6 leading-tight">
            Group Workshops &{" "}
            <span className="text-secondary">Live Sessions</span>
            <br />
            <span className="text-2xl md:text-3xl font-semibold text-muted-foreground">
              are on their way.
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We&apos;re building a world-class group learning experience. Drop
            your email and be the{" "}
            <span className="font-bold text-foreground">first to get access</span>{" "}
            — completely free.
          </p>
        </div>

        {/* Feature Cards Grid — blurred / locked */}
        <div className="relative mb-16">
          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-linear-to-t from-background via-background/80 to-transparent pointer-events-none">
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-card border border-border shadow-2xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                Launching Soon
              </p>
            </div>
          </div>

          {/* Blurred Cards Preview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 select-none">
            {UPCOMING_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`relative bg-card/40 backdrop-blur-sm border ${feature.borderColor} rounded-3xl p-6 overflow-hidden blur-[2px]`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-12 w-12 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center text-white shadow-lg shrink-0`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full ${feature.bg} ${feature.textColor} text-[10px] font-black uppercase tracking-wider mb-2`}
                      >
                        {feature.tag}
                      </span>
                      <h3 className="text-base font-bold text-foreground mb-1 truncate">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Placeholder card */}
            <div className="relative bg-card/20 border border-dashed border-border/40 rounded-3xl p-6 flex items-center justify-center blur-[2px]">
              <span className="text-muted-foreground/40 font-bold text-sm">
                + More workshops
              </span>
            </div>
          </div>
        </div>

        {/* Email Capture CTA */}
        <div className="max-w-2xl mx-auto bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Bell className="w-6 h-6 text-primary" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            Be the first to know.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            Join the waitlist and unlock early access, free sessions, and
            insider updates before launch.
          </p>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="font-bold text-foreground text-lg">
                You&apos;re on the list!
              </p>
              <p className="text-muted-foreground text-sm">
                We&apos;ll notify you the moment workshops go live.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-muted/50 border border-border/60 text-foreground placeholder:text-muted-foreground/50 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                className="group shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/25"
              >
                Notify Me
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground/60 mt-5">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
