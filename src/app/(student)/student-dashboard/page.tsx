"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { IStudentStats, IBooking } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Star,
  TrendingUp,
  Clock,
  ArrowUpRight,
  MoreHorizontal,
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
      description: "Sessions booked",
    },
    {
      label: "Total Spent",
      value: `$${(stats?.totalSpent || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      description: "Investment in learning",
    },
    {
      label: "Total Reviews",
      value: stats?.totalReviews || 0,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      description: "Feedback shared",
    },
    {
      label: "Mentors Met",
      value: stats?.totalBookings || 0, // Simplified for now
      icon: Award,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      description: "Experts connected",
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
                <div className="bg-primary/5 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-foreground tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[10px] text-muted-foreground font-medium pt-1">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-2 rounded-[3rem] border-none shadow-premium overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="p-10 border-b border-border/50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                Upcoming Sessions
              </CardTitle>
              <p className="text-sm text-muted-foreground font-medium mt-1">
                Prepare for your next mentorship meetings
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
                      Mentor
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
                      key={booking._id}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-primary/10">
                            <AvatarImage
                              src={booking.mentor?.profilePhoto || ""}
                            />
                            <AvatarFallback className="font-black bg-primary/5 text-primary text-xs">
                              {booking.mentor?.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground">
                              {booking.mentor?.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {booking.mentor?.expertise}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge
                          variant="outline"
                          className="rounded-lg border-primary/20 text-primary font-bold bg-primary/5"
                        >
                          {booking.topic || "Mentorship"}
                        </Badge>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col text-sm">
                          <span className="font-bold text-foreground">
                            {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium italic">
                            <Clock className="h-2.5 w-2.5" />
                            {booking.startTime}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-right px-10">
                        <Button className="h-10 px-5 rounded-xl font-black bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all gap-2">
                          <Video className="h-4 w-4" />
                          Join
                        </Button>
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
                          No upcoming sessions found
                        </p>
                        <Button
                          variant="link"
                          className="mt-2 text-primary font-black uppercase tracking-widest text-[10px]"
                        >
                          Find a mentor
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

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
