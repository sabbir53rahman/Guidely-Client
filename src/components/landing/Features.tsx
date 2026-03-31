"use client";

import {
  Calendar,
  Video,
  ShieldIcon,
  BookOpen,
  BarChart3,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    title: "Session Scheduling",
    description:
      "Intelligent booking system tailored for international timezones and dynamic mentor availability.",
    icon: Calendar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Premium HD Video",
    description:
      "Built-in, high-fidelity conferencing for uninterrupted mentorship and real-time collaboration.",
    icon: Video,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Secure Payments",
    description:
      "Enterprise-grade financial security with automated student billing and mentor payouts.",
    icon: ShieldIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Resource Library",
    description:
      "Curated materials and resources shared during sessions, accessible anytime from your personal history.",
    icon: BookOpen,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    title: "Progress Analytics",
    description:
      "Track your learning journey and visualize growth with our advanced performance metrics.",
    icon: BarChart3,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "Elite Community",
    description:
      "Join our verified directory of industry giants and top-tier talent scaling their impact.",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-20 space-y-4 text-center mx-auto">
          <Badge
            variant="outline"
            className="rounded-xl border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest px-3 py-1 uppercase"
          >
            Platform Capabilities
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-tight leading-tighter text-foreground drop-shadow-sm">
            The Framework for{" "}
            <span className="text-primary italic">Success.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
            We&apos;ve built the most comprehensive architecture for
            professional development, connecting elite talent with precise
            operations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-border shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2"
            >
              <div
                className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 transition-transform duration-700 group-hover:scale-110 shadow-sm border border-border/40`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>

              <h3 className="text-xl font-bold mb-4 tracking-tight group-hover:text-primary transition-all">
                {feature.title}
              </h3>

              <p className="text-muted-foreground font-medium leading-relaxed mb-6 group-hover:text-foreground transition-all text-sm">
                {feature.description}
              </p>

              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-primary/30 group-hover:text-primary transition-all">
                Capability Protocol
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
