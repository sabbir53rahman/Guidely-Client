"use client";

import {
  ArrowRight,
  Play,
  Star,
  Users,
  Zap,
  CheckCircle2,
  MessageCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRUSTED_BY = [
  { name: "Google", logo: "G" },
  { name: "Microsoft", logo: "M" },
  { name: "Amazon", logo: "A" },
  { name: "Meta", logo: "Meta" },
  { name: "Netflix", logo: "N" },
];

const FEATURES = [
  { icon: CheckCircle2, text: "Verified Expert Mentors" },
  { icon: MessageCircle, text: "1-on-1 Live Sessions" },
  { icon: Calendar, text: "Flexible Scheduling" },
  { icon: Zap, text: "Instant Booking" },
];

const MENTOR_PREVIEW = [
  {
    name: "Sarah Chen",
    role: "Senior Product Designer",
    company: "Airbnb",
    rating: 4.9,
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Lead",
    company: "Stripe",
    rating: 5.0,
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director",
    company: "Spotify",
    rating: 4.8,
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2">
              <Badge
                variant="secondary"
                className="px-4 py-2 rounded-full bg-primary/10 text-primary border-primary/20 font-medium"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                2,847 mentors online now
              </Badge>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                Master New Skills with{" "}
                <span className="relative">
                  <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    World-Class
                  </span>
                </span>{" "}
                Mentors
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Connect with 5,000+ industry experts for personalized 1-on-1
                sessions. Accelerate your career growth with real-world
                guidance.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              {FEATURES.map((feature) => (
                <div
                  key={feature.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  {feature.text}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group px-8 h-14 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-xl font-semibold border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Users className="mr-2 h-5 w-5" />
                Browse Mentors
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground font-medium">
                Trusted by professionals at
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {TRUSTED_BY.map((company) => (
                  <span
                    key={company.name}
                    className="text-lg font-bold text-muted-foreground/60 hover:text-foreground transition-colors"
                  >
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Mentor Cards */}
          <div className="relative">
            {/* Main Hero Card */}
            <div className="relative bg-card rounded-3xl border border-border shadow-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground">Top Mentors</span>
                </div>
                <Badge variant="outline" className="rounded-full">
                  <Star className="h-3 w-3 text-amber-500 mr-1 fill-current" />
                  4.9 avg rating
                </Badge>
              </div>

              {/* Mentor List */}
              <div className="space-y-4 relative z-10">
                {MENTOR_PREVIEW.map((mentor) => (
                  <div
                    key={mentor.name}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors group cursor-pointer"
                  >
                    <div className="h-14 w-14 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                      {mentor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground truncate">
                        {mentor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {mentor.role} @ {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-bold text-sm">{mentor.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button className="w-full h-12 rounded-xl bg-foreground text-background hover:bg-foreground/90 font-semibold">
                  View All 5,000+ Mentors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl border border-border shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">94%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>

            {/* Floating Rating Card */}
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl border border-border shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-linear-to-br from-primary to-secondary"
                    />
                  ))}
                </div>
                <div className="pl-2">
                  <p className="text-sm font-bold text-foreground">2M+</p>
                  <p className="text-xs text-muted-foreground">
                    Active learners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
