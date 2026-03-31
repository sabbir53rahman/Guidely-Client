"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { format } from "date-fns";
import { IMentorStats, IBooking } from "@/types";

import {
  Users,
  Calendar,
  Clock,
  Video,
  ArrowUpRight,
  ShieldCheck,
  Star as StarIcon,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function MentorDashboardPage() {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const stats = data?.data as IMentorStats;

  const STAT_CONFIG = [
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+12.5%",
    },
    {
      label: "Total Earnings",
      value: `$${(stats?.totalEarnings || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+18.7%",
    },
    {
      label: "Avg. Rating",
      value: stats?.averageRating?.toFixed(1) || "0.0",
      icon: StarIcon,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      trend: "+0.1",
    },
    {
      label: "Total Reviews",
      value: stats?.totalReviews || 0,
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      trend: "+4.2%",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-10 animate-pulse">
        <div className="h-24 w-full bg-muted rounded-3xl" />
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
      {/* Welcome & Global Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 mb-4">
            <ShieldCheck className="h-3 w-3" />
            Verified Mentor Account
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
            Welcome back, <span className="text-primary italic">Mentor!</span>
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            You have{" "}
            <span className="text-foreground font-bold underline decoration-primary underline-offset-4">
              {stats?.upcomingBookings?.length || 0} upcoming sessions
            </span>{" "}
            scheduled.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/availability">
            <Button
              variant="outline"
              className="rounded-2xl h-12 px-6 font-bold shadow-sm"
            >
              View Schedule
            </Button>
          </Link>
          <Link href="/availability">
            <Button className="rounded-2xl h-12 px-6 font-black bg-primary shadow-lg shadow-primary/20">
              Create Time Slot
            </Button>
          </Link>
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
        {/* Upcoming Sessions Table */}
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
                    Student
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
                          <AvatarImage src={booking.student?.avatar || ""} />
                          <AvatarFallback className="font-bold bg-primary/10 text-primary text-xs">
                            {booking.student?.name
                              ?.substring(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {booking.student?.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Student
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
                            ? format(
                                new Date(booking.startTime),
                                "MMM dd, yyyy",
                              )
                            : "N/A"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.startTime
                            ? format(new Date(booking.startTime), "HH:mm")
                            : "N/A"}
                          -{" "}
                          {booking.endTime
                            ? format(new Date(booking.endTime), "HH:mm")
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

        {/* Sidebar Mini-Card (Quick Information) */}
        <div className="space-y-8">
          <Card className="rounded-[3rem] border-none bg-primary text-primary-foreground shadow-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black">Daily Insight</h3>
              <p className="text-primary-foreground/70 font-medium text-sm leading-relaxed">
                Your average rating is in the top <strong>5%</strong> of mentors
                this month. Keep up the great work!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                    Growth
                  </p>
                  <p className="text-xl font-black">+12%</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
                    Reach
                  </p>
                  <p className="text-xl font-black">2.4k</p>
                </div>
              </div>
              <Button className="w-full h-12 rounded-2xl bg-white text-primary font-black hover:bg-white/90">
                Performance Report
              </Button>
            </div>
          </Card>

          <Card className="rounded-[3rem] border-none shadow-premium p-10 bg-white/50 backdrop-blur-sm">
            <h3 className="text-xl font-black mb-6">Quick Settings</h3>
            <div className="space-y-4">
              {[
                { label: "Availability Status", status: "Active" },
                { label: "Profile Visibility", status: "Public" },
                { label: "Instant Response", status: "On" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center py-2"
                >
                  <span className="text-sm font-bold text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
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
