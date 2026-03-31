"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { format } from "date-fns";
import { IStudentStats, IBooking } from "@/types";

import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Video,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function StudentDashboardPage() {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const stats = data?.data as IStudentStats;

  const STAT_CONFIG = [
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+5.2%",
    },
    {
      label: "Total Spent",
      value: `$${(stats?.totalSpent || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+8.4%",
    },
    {
      label: "Total Reviews",
      value: stats?.totalReviews || 0,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      trend: "+12.1%",
    },
    {
      label: "Mentors Met",
      value: stats?.totalBookings || 0,
      icon: Award,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      trend: "+3.7%",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10 animate-pulse">
        <div className="h-12 w-64 bg-muted rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-muted rounded-[2.5rem]" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-muted rounded-[3rem]" />
          <div className="h-96 bg-muted rounded-[3rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
            Student <span className="text-primary italic">Dashboard</span>
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            Welcome back! Here&apos;s your personalized learning overview.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 font-bold shadow-sm"
          >
            My Courses
          </Button>
          <Button className="rounded-2xl h-12 px-6 font-black bg-primary shadow-lg shadow-primary/20">
            Book New Session
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CONFIG.map((stat, index) => (
          <div
            key={stat.label}
            className="group relative bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                    stat.bg,
                  )}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500">
                    {stat.trend}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <p className="text-2xl font-black text-foreground tracking-tight group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${70 + index * 5}%`,
                    animationDelay: `${index * 100 + 200}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-primary/5 to-secondary/5 border-b border-border/20 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Upcoming Sessions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Prepare for your next mentorship meetings
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/20">
                  <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Mentor
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Time
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats?.upcomingBookings?.map((booking: IBooking) => (
                  <tr
                    key={booking.id || booking._id}
                    className="border-b border-border/10 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-primary/20">
                          <AvatarImage
                            src={booking.mentor?.profilePhoto || ""}
                          />
                          <AvatarFallback className="font-bold bg-primary/10 text-primary text-xs">
                            {booking.mentor?.name
                              ?.substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {booking.mentor?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {booking.mentor?.expertise}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className="rounded-lg border-primary/20 text-primary bg-primary/5"
                      >
                        {booking.notes || "Mentorship"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-foreground">
                          {booking.startTime
                            ? format(new Date(booking.startTime), "MMM dd, yyyy")
                            : "N/A"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.startTime
                            ? format(new Date(booking.startTime), "HH:mm")
                            : "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        disabled={!booking.meetingLink}
                        onClick={() => {
                          if (booking.meetingLink) {
                            window.open(booking.meetingLink, "_blank");
                          }
                        }}
                        className="h-9 px-4 rounded-lg font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all gap-2"
                      >
                        <Video className="h-4 w-4" />
                        Join
                      </Button>
                    </td>
                  </tr>
                ))}
                {(!stats?.upcomingBookings ||
                  stats.upcomingBookings.length === 0) && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center">
                      <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground font-medium">
                        No upcoming sessions found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Mini-Card */}
        <div className="space-y-8">
          <Card className="rounded-[3rem] border-none bg-indigo-600 text-white shadow-2xl p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black">Learning Streak</h3>
              <p className="text-indigo-100 font-medium text-sm leading-relaxed">
                You&apos;ve completed <strong>3 sessions</strong> this week.
                Keep the momentum going!
              </p>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white w-3/4 rounded-full" />
              </div>
              <Button className="w-full h-12 rounded-2xl bg-white text-indigo-600 font-black hover:bg-white/90">
                Claim Reward
              </Button>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-premium p-10 bg-white/50 backdrop-blur-sm">
            <h3 className="text-xl font-black mb-6">Quick Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Study Plan", icon: BookOpen },
                { label: "Reports", icon: TrendingUp },
                { label: "Payments", icon: Award },
                { label: "Support", icon: Star },
              ].map((tool) => (
                <button
                  key={tool.label}
                  className="p-4 rounded-2xl bg-muted/30 hover:bg-primary/10 hover:text-primary transition-all flex flex-col items-center gap-2 group"
                >
                  <tool.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {tool.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
