"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { format } from "date-fns";
import { IAdminStats, IBooking } from "@/types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const stats = data?.data as IAdminStats;

  const STAT_CONFIG = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+5.2%",
    },
    {
      label: "Total Mentors",
      value: stats?.totalMentors || 0,
      icon: UserCheck,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
      trend: "+2.1%",
    },
    {
      label: "Total Students",
      value: stats?.totalStudents || 0,
      icon: GraduationCap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+8.4%",
    },
    {
      label: "Total Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      trend: "+12.5%",
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
        <div className="h-96 bg-muted rounded-[3rem]" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
            Platform <span className="text-primary italic">Overview</span>
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            Real-time analytics and management dashboard for Guidely.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="rounded-2xl h-12 px-6 font-bold shadow-sm"
          >
            Export Data
          </Button>
          <Button className="rounded-2xl h-12 px-6 font-black bg-primary shadow-lg shadow-primary/20">
            System Status
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CONFIG.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-[2.5rem] border-border shadow-premium hover:shadow-hover transition-all duration-300 overflow-hidden group border-none bg-white/50 backdrop-blur-sm"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    "p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500",
                    stat.bg,
                    stat.color,
                  )}
                >
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                  <ArrowUpRight className="h-3 w-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings Table */}
      <Card className="rounded-[3rem] border-none shadow-premium overflow-hidden bg-white/50 backdrop-blur-sm">
        <CardHeader className="p-10 border-b border-border/50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-black flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              Recent Bookings
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium mt-1">
              Latest transactions and session schedules
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
                    Mentor
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Date & Time
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    Status
                  </th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentBookings?.map((booking: IBooking) => (
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
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">
                            {booking.student?.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground font-medium">
                            {booking.student?.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <span className="font-semibold text-sm">
                          {booking.mentor?.name}
                        </span>
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
                    <td className="p-6">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "rounded-lg px-3 py-1 font-black text-[10px] uppercase tracking-wider border-none",
                          booking.status === "SCHEDULED"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : booking.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-500"
                              : "bg-red-500/10 text-red-500",
                        )}
                      >
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-6 text-right font-black text-primary">
                      ${booking.payment?.amount || booking.mentor?.hourlyRate || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(!stats?.recentBookings || stats.recentBookings.length === 0) && (
            <div className="p-20 text-center">
              <div className="inline-flex p-6 rounded-full bg-muted/50 mb-4">
                <Calendar className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-bold">
                No recent bookings found
              </p>
            </div>
          )}
          <div className="p-6 bg-muted/20 text-center border-t border-border/50">
            <Button
              variant="link"
              className="font-black text-primary uppercase tracking-widest text-[10px]"
            >
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
