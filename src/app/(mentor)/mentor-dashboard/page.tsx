"use client";

import {
  Users,
  Calendar,
  Clock,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Star as StarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

const STATS = [
  {
    label: "Total Students",
    value: "128",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Active Sessions",
    value: "24",
    change: "+4.2%",
    trend: "up",
    icon: Calendar,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    label: "Total Earnings",
    value: "$12,450",
    change: "+18.7%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Avg. Rating",
    value: "4.9",
    change: "+0.1",
    trend: "up",
    icon: StarIcon,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

const RECENT_SESSIONS = [
  {
    id: "1",
    student: "Alex Johnson",
    type: "Career Coaching",
    date: "Today, 2:00 PM",
    duration: "60 mins",
    status: "Upcoming",
    avatar: "AJ",
  },
  {
    id: "2",
    student: "Sarah Williams",
    type: "React Mentorship",
    date: "Tomorrow, 10:00 AM",
    duration: "45 mins",
    status: "Confirmed",
    avatar: "SW",
  },
  {
    id: "3",
    student: "Michael Chen",
    type: "Architecture Review",
    date: "Mar 16, 4:30 PM",
    duration: "90 mins",
    status: "Pending",
    avatar: "MC",
  },
];

export default function MentorDashboardPage() {
  return (
    <div className="space-y-10">
      {/* Welcome & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 mb-4">
            <ShieldCheck className="h-3 w-3" />
            Verified Mentor Account
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
            Welcome back, <span className="text-primary italic">John!</span>
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            You have{" "}
            <span className="text-foreground font-bold underline decoration-primary underline-offset-4">
              3 upcoming sessions
            </span>{" "}
            for today.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold">
            Download Report
          </Button>
          <Button className="rounded-2xl h-12 px-6 font-black bg-primary shadow-lg shadow-primary/20">
            Create Session Slot
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-[2.5rem] border-border shadow-premium hover:shadow-hover transition-all duration-300 overflow-hidden group"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    "p-3 rounded-2xl transition-transform group-hover:scale-110 duration-500",
                    stat.bg,
                    stat.color,
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full",
                    stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-red-500/10 text-red-500",
                  )}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-foreground tracking-tight">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Sessions Table */}
        <Card className="lg:col-span-2 rounded-[3rem] border-border shadow-premium overflow-hidden">
          <CardHeader className="p-10 border-b border-border flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black">
                Upcoming Sessions
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                Manage your next interactions
              </p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Student
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Type
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Time
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right px-10">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_SESSIONS.map((session) => (
                    <tr
                      key={session.id}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 text-primary font-black text-xs">
                            {session.avatar}
                          </div>
                          <span className="font-bold text-foreground">
                            {session.student}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 font-medium text-sm">
                        {session.type}
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">
                            {session.date}
                          </span>
                          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {session.duration}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right px-10">
                        <Button
                          variant="ghost"
                          className="h-10 px-4 rounded-xl font-bold text-primary hover:bg-primary/10"
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-muted/20 text-center">
              <Button variant="link" className="font-bold text-primary">
                View All Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Mini-Card (e.g. Availability summary) */}
        <div className="space-y-8">
          <Card className="rounded-[3rem] border-primary/20 bg-primary text-primary-foreground shadow-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black">Your Availability</h3>
              <p className="text-primary-foreground/70 font-medium text-sm leading-relaxed">
                You are currently available for <strong>24 hours</strong> this
                week across 8 slots.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                    Used
                  </p>
                  <p className="text-xl font-black">12h</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                    Free
                  </p>
                  <p className="text-xl font-black">12h</p>
                </div>
              </div>
              <Button className="w-full h-12 rounded-2xl bg-white text-primary font-black hover:bg-white/90">
                Edit Schedule
              </Button>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-border shadow-premium p-10">
            <h3 className="text-xl font-black mb-6">Quick Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Notification Preferences", status: "On" },
                { label: "Profile Visibility", status: "Public" },
                { label: "Instant Booking", status: "Off" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm font-bold text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
