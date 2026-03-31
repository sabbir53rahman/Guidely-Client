"use client";

import { useGetOverviewStatsQuery } from "@/redux/features/meta/metaApi";
import { format } from "date-fns";
import { IAdminStats, IBooking } from "@/types";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  Clock,
  UserCheck,
  GraduationCap,
  Activity,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data, isLoading } = useGetOverviewStatsQuery();
  const stats = data?.data as IAdminStats;

  const STAT_CONFIG = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      trend: "+5.2%",
    },
    {
      label: "Total Mentors",
      value: stats?.totalMentors || 0,
      icon: UserCheck,
      color: "text-secondary",
      bg: "bg-secondary/10",
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
      <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping" />
            <div className="relative h-16 w-16 bg-primary rounded-full flex items-center justify-center">
              <Activity className="h-8 w-8 text-white animate-spin" />
            </div>
          </div>
          <p className="text-foreground font-bold text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:px-8 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Admin Control
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Admin{" "}
            <span className="text-muted-foreground/30 font-light">
              Dashboard
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Real-time platform analytics and management. Monitor user activity,
            track revenue, and oversee mentorship sessions{" "}
          </p>
        </div>

        {/* <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              System Status
            </p>
            <p className="text-xl font-black text-foreground">Active</p>
          </div>
        </div> */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="mb-12">
          {/* <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold text-foreground">
              Platform Overview
            </h2>
            <div className="h-1 w-8 bg-primary rounded-full" />
          </div> */}

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
        </div>

        {/* Recent Bookings */}
        <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <CardHeader className="bg-linear-to-r from-primary/5 to-secondary/5 border-b border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold  text-foreground">
                    Recent Bookings
                  </CardTitle>
                  {/* <p className="text-sm text-muted-foreground">
                    Latest mentorship sessions and transactions
                  </p> */}
                </div>
              </div>
              {/* 
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-muted/50"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button> */}
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/20">
                    <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Student
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="p-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentBookings?.map((booking: IBooking) => (
                    <tr
                      key={booking.id || booking._id}
                      className="border-b border-border/10 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-border/50">
                            <AvatarImage src={booking.student?.avatar || ""} />
                            <AvatarFallback className="font-bold bg-primary/10 text-primary text-xs">
                              {booking.student?.name
                                ?.substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-semibold text-foreground">
                              {booking.student?.name}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {booking.student?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                            <UserCheck className="h-4 w-4 text-secondary" />
                          </div>
                          <span className="font-semibold text-foreground">
                            {booking.mentor?.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-foreground">
                            {booking.startTime
                              ? format(
                                  new Date(booking.startTime),
                                  "MMM dd, yyyy",
                                )
                              : "N/A"}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {booking.startTime
                                ? format(new Date(booking.startTime), "HH:mm")
                                : "N/A"}
                              {" - "}
                              {booking.endTime
                                ? format(new Date(booking.endTime), "HH:mm")
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge
                          className={cn(
                            "rounded-lg px-3 py-1 font-medium border-none",
                            booking.status === "SCHEDULED"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : booking.status === "COMPLETED"
                                ? "bg-primary/10 text-primary"
                                : "bg-amber-500/10 text-amber-500",
                          )}
                        >
                          {booking.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right font-semibold text-primary">
                        {booking.paymentStatus || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {(!stats?.recentBookings || stats.recentBookings.length === 0) && (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-bold">
                  No recent bookings found
                </p>
              </div>
            )}

            {/* <div className="p-6 bg-muted/20 text-center border-t border-border/20">
              <Link href="/">
                <Button
                  variant="link"
                  className="font-bold text-primary hover:text-primary/80"
                >
                  View All Bookings
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </CardContent>
        </div>
      </div>
    </div>
  );
}
