"use client";

import { Search, Calendar, Video, Users, ArrowRight } from "lucide-react";

const STEPS = [
  {
    title: "Find Your Mentor",
    description: "Browse through our curated list of expert mentors and find the perfect match for your learning goals.",
    icon: Search,
    color: "bg-primary",
    number: "01",
  },
  {
    title: "Book a Session",
    description: "Schedule a one-on-one session at your convenience. Choose a time that works best for you.",
    icon: Calendar,
    color: "bg-secondary",
    number: "02",
  },
  {
    title: "Start Learning",
    description: "Connect via HD video call and get personalized guidance from industry experts.",
    icon: Video,
    color: "bg-emerald-500",
    number: "03",
  },
  {
    title: "Grow Your Skills",
    description: "Apply what you learn and track your progress as you advance in your career.",
    icon: Users,
    color: "bg-amber-500",
    number: "04",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/30 transition-colors duration-500">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in four simple steps and transform your career with expert guidance.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.title}
              className="relative text-center group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl font-bold text-muted-foreground/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </div>

              {/* Icon Circle */}
              <div className="relative mb-6 flex justify-center">
                <div
                  className={`h-16 w-16 rounded-full ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {step.description}
              </p>

              {/* Arrow Connector */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
