"use client";

import {
  Radio,
  Users,
  Clock,
  CalendarDays,
  ArrowRight,
  Code2,
  Server,
  Mic,
  Briefcase,
  Layers,
} from "lucide-react";

const WORKSHOPS = [
  {
    id: 1,
    icon: Code2,
    tag: "Portfolio",
    title: "Live Portfolio Review",
    mentor: "Sarah Chen · Senior Eng. @ Amazon",
    date: "Today",
    time: "7:00 PM UTC",
    seats: 12,
    totalSeats: 20,
    isLive: true,
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/30",
  },
  {
    id: 2,
    icon: Server,
    tag: "System Design",
    title: "System Design Deep Dive: Distributed Caching",
    mentor: "Marcus Johnson · Staff SWE @ Netflix",
    date: "Tomorrow",
    time: "6:00 PM UTC",
    seats: 6,
    totalSeats: 15,
    isLive: false,
    color: "from-indigo-500 to-purple-400",
    bg: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    borderColor: "border-indigo-500/30",
  },
  {
    id: 3,
    icon: Mic,
    tag: "Recruiting",
    title: "Q&A with a Google Technical Recruiter",
    mentor: "Priya Nair · Technical Recruiter @ Google",
    date: "Apr 10",
    time: "5:30 PM UTC",
    seats: 3,
    totalSeats: 30,
    isLive: false,
    color: "from-rose-500 to-pink-400",
    bg: "bg-rose-500/10",
    textColor: "text-rose-500",
    borderColor: "border-rose-500/30",
  },
  {
    id: 4,
    icon: Layers,
    tag: "Frontend",
    title: "Building Pixel-Perfect UIs with React & CSS",
    mentor: "Yuki Tanaka · Principal FE @ Figma",
    date: "Apr 12",
    time: "4:00 PM UTC",
    seats: 14,
    totalSeats: 25,
    isLive: false,
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/30",
  },
  {
    id: 5,
    icon: Briefcase,
    tag: "Career",
    title: "Negotiating Your First $200K+ Offer",
    mentor: "Alex Kim · Career Coach & Ex-FAANG",
    date: "Apr 14",
    time: "7:00 PM UTC",
    seats: 18,
    totalSeats: 20,
    isLive: false,
    color: "from-amber-500 to-orange-400",
    bg: "bg-amber-500/10",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/30",
  },
];

export function Workshops() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              <span>Group Sessions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4 leading-tight">
              Upcoming Group{" "}
              <span className="text-secondary">Workshops</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl">
              Not ready for 1-on-1? Join a live group session with expert
              mentors — free for your first one.
            </p>
          </div>
          <button className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border hover:border-primary/40 hover:bg-primary/5 text-foreground font-semibold transition-all">
            View all workshops
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Workshop Cards */}
        <div className="space-y-4">
          {WORKSHOPS.map((workshop) => {
            const seatsLeft = workshop.totalSeats - workshop.seats;
            const seatsPercent = (workshop.seats / workshop.totalSeats) * 100;
            const IconComponent = workshop.icon;

            return (
              <div
                key={workshop.id}
                className={`group relative bg-card/40 backdrop-blur-sm border ${workshop.isLive ? `${workshop.borderColor} shadow-xl` : "border-border/50"} rounded-3xl p-5 md:p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden`}
              >
                {workshop.isLive && (
                  <div className="absolute inset-0 rounded-3xl border-2 border-primary/20 animate-pulse pointer-events-none" />
                )}

                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  {/* Icon */}
                  <div
                    className={`h-14 w-14 rounded-2xl bg-linear-to-br ${workshop.color} flex items-center justify-center text-white shadow-lg shrink-0`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {workshop.isLive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-black uppercase tracking-wider">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          Live Now
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full ${workshop.bg} ${workshop.textColor} text-xs font-bold border ${workshop.borderColor}`}
                      >
                        {workshop.tag}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                      {workshop.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {workshop.mentor}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2 shrink-0">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CalendarDays className="w-3.5 h-3.5 text-primary" />
                        {workshop.date}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {workshop.time}
                      </span>
                    </div>

                    {/* Seats Progress */}
                    <div className="w-full md:w-40">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                        <span className="flex items-center gap-1">
                          <Radio className="w-3 h-3" />
                          {seatsLeft} seats left
                        </span>
                        <span>{workshop.seats}/{workshop.totalSeats} filled</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full bg-linear-to-r ${workshop.color} transition-all duration-700`}
                          style={{ width: `${seatsPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className={`shrink-0 px-6 py-3 rounded-2xl bg-linear-to-br ${workshop.color} text-white font-bold text-sm shadow-lg hover:scale-[1.03] active:scale-95 transition-all`}
                  >
                    {workshop.isLive ? "Join Now" : "Reserve Seat"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
