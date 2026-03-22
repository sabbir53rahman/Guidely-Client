"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Activity, ShieldAlert } from "lucide-react";

export default function AdminDashboardPage() {
  const STATS = [
    {
      label: "Total Users",
      value: "1,248",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Revenue",
      value: "$45,231",
      icon: DollarSign,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Active Sessions",
      value: "34",
      icon: Activity,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Pending Approvals",
      value: "12",
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tight text-foreground">
            Admin <span className="text-primary italic">Dashboard</span>
          </h1>
          <p className="text-muted-foreground font-medium mt-2">
            Overview of the platform statistics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="rounded-[2.5rem] border-border shadow-premium hover:shadow-hover transition-all duration-300 overflow-hidden group"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-500 ${stat.bg} ${stat.color}`}
                >
                  <stat.icon className="h-6 w-6" />
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
    </div>
  );
}
