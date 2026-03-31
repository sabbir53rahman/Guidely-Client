"use client";

import React, { useMemo, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Users,
  Search,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";

import { useGetAllSchedulesQuery } from "@/redux/features/schedule/scheduleApi";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Schedule } from "@/types";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/shared/Pagination";

export default function ManageSessionsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data: schedulesResponse, isLoading } = useGetAllSchedulesQuery({
    page,
    limit,
    searchTerm: search || undefined,
  });

  const schedules: Schedule[] = useMemo(
    () => schedulesResponse?.data || [],
    [schedulesResponse?.data],
  );
  const meta = schedulesResponse?.meta;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getDayBadgeColor = (day: string) => {
    const colors: Record<string, string> = {
      SUNDAY: "bg-red-500/10 text-red-500 border-red-500/20",
      MONDAY: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      TUESDAY: "bg-green-500/10 text-green-500 border-green-500/20",
      WEDNESDAY: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      THURSDAY: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      FRIDAY: "bg-pink-500/10 text-pink-500 border-pink-500/20",
      SATURDAY: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    };
    return colors[day] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  const columns = useMemo<Column<Schedule>[]>(
    () => [
      {
        key: "mentor",
        header: "Mentor Information",
        cell: (row) => (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                {row.mentor?.name?.charAt(0) || "M"}
              </div>
              <div>
                <div className="font-semibold text-base">
                  {row.mentor?.name || "Not Assigned"}
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {row.mentor?.email || "No email"}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "expertise",
        header: "Expertise",
        cell: (row) => (
          <div className="space-y-1">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-500 border-blue-500/20"
            >
              {row.mentor?.expertise || "Not specified"}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {row.mentor?.experience || 0} years experience
            </div>
          </div>
        ),
      },
      {
        key: "hourlyRate",
        header: "Hourly Rate",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-green-600">
              {formatCurrency(row.mentor?.hourlyRate || 0)}
            </span>
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
        ),
      },
      {
        key: "contact",
        header: "Contact",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {row.mentor?.contactNumber || "N/A"}
            </span>
          </div>
        ),
      },
      {
        key: "schedule",
        header: "Schedule Details",
        cell: (row) => (
          <div className="space-y-2">
            <Badge
              variant="outline"
              className={cn(
                "px-3 py-1.5 font-medium rounded-xl border",
                getDayBadgeColor(row.dayOfWeek),
              )}
            >
              {row.dayOfWeek}
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {formatTime(row.startTime)} - {formatTime(row.endTime)}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "sessionCount",
        header: "Sessions",
        cell: (row) => (
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {row.isBooked ? "1" : "0"}
            </div>
            <div className="text-xs text-muted-foreground">
              {row.isBooked ? "Booked" : "Available"}
            </div>
          </div>
        ),
      },
      {
        key: "status",
        header: "Status",
        cell: (row) => (
          <div className="space-y-2">
            <Badge
              variant={row.isBooked ? "destructive" : "default"}
              className={cn(
                "px-3 py-1.5 font-medium rounded-xl",
                row.isBooked
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
              )}
            >
              {row.isBooked ? "Booked" : "Available"}
            </Badge>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Schedule Management
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Manage{" "}
            <span className="text-muted-foreground/30 font-light">
              Sessions
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            View all mentor schedules and availability, manage time slots, and oversee session bookings with comprehensive scheduling administration tools.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Schedules
            </p>
            <p className="text-xl font-black text-foreground">
              {meta?.total || schedules.length}
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by mentor name or email..."
          className="pl-10 h-11 rounded-lg bg-background border-input"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Total
              </div>
            </div>
            <h3 className="text-blue-100 text-sm font-medium mb-2">
              Total Schedules
            </h3>
            <p className="text-4xl font-bold">{schedules.length}</p>
            <div className="mt-3 text-xs text-blue-100">All time slots</div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Available
              </div>
            </div>
            <h3 className="text-emerald-100 text-sm font-medium mb-2">
              Available Slots
            </h3>
            <p className="text-4xl font-bold">
              {schedules.filter((s) => !s.isBooked).length}
            </p>
            <div className="mt-3 text-xs text-emerald-100">Ready to book</div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-red-500 via-rose-600 to-pink-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Booked
              </div>
            </div>
            <h3 className="text-red-100 text-sm font-medium mb-2">
              Booked Sessions
            </h3>
            <p className="text-4xl font-bold">
              {schedules.filter((s) => s.isBooked).length}
            </p>
            <div className="mt-3 text-xs text-red-100">Confirmed bookings</div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-purple-500 via-purple-600 to-violet-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Active
              </div>
            </div>
            <h3 className="text-purple-100 text-sm font-medium mb-2">
              Active Mentors
            </h3>
            <p className="text-4xl font-bold">
              {new Set(schedules.map((s) => s.mentorId).filter(Boolean)).size}
            </p>
            <div className="mt-3 text-xs text-purple-100">
              Available mentors
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-background rounded-xl border">
        <DataTable
          columns={columns}
          data={schedules}
          isLoading={isLoading}
          emptyMessage="No schedules found"
        />
      </div>

      {/* Pagination */}
      {meta && (
        <Pagination
          currentPage={page}
          totalPages={meta.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
