"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { format } from "date-fns";
import { IMentorStats, IBooking } from "@/types";

import {
  Users,
  Calendar,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Star as StarIcon,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 font-bold shadow-sm"
          >
            View Schedule
          </Button>
          <Button className="rounded-2xl h-12 px-6 font-black bg-primary shadow-lg shadow-primary/20">
            Create Time Slot
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CONFIG.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-[2.5rem] border-none shadow-premium hover:shadow-hover transition-all duration-300 overflow-hidden group bg-white/50 backdrop-blur-sm"
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
                    "flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full",
                    "bg-emerald-500/10 text-emerald-500",
                  )}
                >
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.trend}
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
        {/* Upcoming Sessions Table */}
        <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-premium overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="p-10 border-b border-border/50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black">
                Upcoming Sessions
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                Manage your next interactions with students
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
                  <tr className="border-b border-border/50">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Student
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Topic
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Time
                    </th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right px-10">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.upcomingBookings?.map((booking: IBooking) => (
                    <tr
                      key={booking.id || booking._id}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <AvatarImage src={booking.student?.avatar || ""} />
                            <AvatarFallback className="font-black bg-primary/5 text-primary text-xs">
                              {booking.student?.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-foreground">
                            {booking.student?.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                          {booking.notes || "General Session"}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground">
                            {booking.startTime
                              ? format(new Date(booking.startTime), "MMM dd, yy")
                              : "N/A"}
                          </span>
                          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" />
                            {booking.startTime
                              ? format(new Date(booking.startTime), "HH:mm")
                              : "N/A"}{" "}
                            -{" "}
                            {booking.endTime
                              ? format(new Date(booking.endTime), "HH:mm")
                              : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right px-10">
                        <Badge
                          className={cn(
                            "rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-wider",
                            booking.status === "SCHEDULED"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-amber-500/10 text-amber-500",
                          )}
                          variant="secondary"
                        >
                          {booking.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {(!stats?.upcomingBookings ||
                    stats.upcomingBookings.length === 0) && (
                    <tr>
                      <td colSpan={4} className="p-20 text-center">
                        <div className="inline-flex p-6 rounded-full bg-muted/50 mb-4">
                          <Calendar className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-bold">
                          No upcoming sessions
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-muted/20 text-center border-t border-border/50">
              <Button
                variant="link"
                className="font-black text-primary uppercase tracking-widest text-[10px]"
              >
                View All Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

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
