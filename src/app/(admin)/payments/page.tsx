"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { useGetPaymentsOverviewQuery } from "@/redux/features/admin/adminApi";
import { Badge } from "@/components/ui/badge";

export default function PaymentsPage() {
  const {
    data: paymentsData,
    isLoading,
    error,
  } = useGetPaymentsOverviewQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <p className="text-destructive font-medium">
            Failed to load payments data
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  const payments = paymentsData?.data;

  if (!payments) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-muted-foreground">No payments data available</p>
      </div>
    );
  }

  const { totalRevenue, monthlyRevenue, recentTransactions } = payments;

  // Calculate monthly growth (comparing last month to previous month)
  const currentMonth = monthlyRevenue[monthlyRevenue.length - 1]?.revenue || 0;
  const previousMonth = monthlyRevenue[monthlyRevenue.length - 2]?.revenue || 0;
  const monthlyGrowth =
    previousMonth > 0
      ? ((currentMonth - previousMonth) / previousMonth) * 100
      : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getMonthName = (monthData: {
    month: string;
    year: number;
    revenue: number;
  }) => {
    return `${monthData.month} ${monthData.year}`;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <DollarSign className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              Payment Analytics
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Payments{" "}
            <span className="text-muted-foreground/30 font-light">
              Overview
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Monitor revenue streams, track transaction patterns, and analyze
            financial performance with comprehensive payment analytics and
            insights.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Revenue
            </p>
            <p className="text-xl font-black text-foreground">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <div className="relative overflow-hidden bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Revenue
              </div>
            </div>
            <h3 className="text-emerald-100 text-sm font-medium mb-2">
              Total Revenue
            </h3>
            <p className="text-4xl font-bold">{formatCurrency(totalRevenue)}</p>
            <div className="mt-3 text-xs text-emerald-100">
              All time earnings
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-blue-500 via-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Monthly
              </div>
            </div>
            <h3 className="text-blue-100 text-sm font-medium mb-2">
              This Month
            </h3>
            <p className="text-4xl font-bold">{formatCurrency(currentMonth)}</p>
            <div className="mt-3 flex items-center gap-1">
              {monthlyGrowth > 0 ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-300" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-300" />
              )}
              <span className="text-xs text-blue-100">
                {Math.abs(monthlyGrowth).toFixed(1)}% from last month
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-purple-500 via-purple-600 to-violet-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Activity
              </div>
            </div>
            <h3 className="text-purple-100 text-sm font-medium mb-2">
              Transactions
            </h3>
            <p className="text-4xl font-bold">{recentTransactions.length}</p>
            <div className="mt-3 text-xs text-purple-100">Recent payments</div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-linear-to-br from-amber-500 via-orange-600 to-red-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                Average
              </div>
            </div>
            <h3 className="text-amber-100 text-sm font-medium mb-2">
              Avg. Transaction
            </h3>
            <p className="text-4xl font-bold">
              {formatCurrency(
                recentTransactions.length > 0
                  ? recentTransactions.reduce((sum, t) => sum + t.amount, 0) /
                      recentTransactions.length
                  : 0,
              )}
            </p>
            <div className="mt-3 text-xs text-amber-100">Per payment</div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Monthly Revenue Trend
              </h2>
              <p className="text-sm text-muted-foreground">
                Revenue performance overview
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>

        <div className="space-y-4">
          {monthlyRevenue.map((monthData, index) => {
            const maxRevenue = Math.max(
              ...monthlyRevenue.map((m) => m.revenue),
            );
            const percentage =
              maxRevenue > 0 ? (monthData.revenue / maxRevenue) * 100 : 0;
            const isCurrentMonth = index === monthlyRevenue.length - 1;

            return (
              <div
                key={index}
                className={`group relative rounded-lg border transition-all duration-300 ${
                  isCurrentMonth
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-muted/30 hover:bg-muted/50"
                } p-4`}
              >
                {isCurrentMonth && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                      Current
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className="w-24 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isCurrentMonth ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {getMonthName(monthData)}
                    </p>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="relative">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ease-out ${
                            isCurrentMonth ? "bg-primary" : "bg-secondary"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-28 text-right min-w-0">
                    <p
                      className={`text-base font-semibold ${
                        isCurrentMonth ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {formatCurrency(monthData.revenue)}
                    </p>
                    {monthData.revenue > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {percentage.toFixed(0)}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* {monthlyRevenue.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Periods
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {monthlyRevenue.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Average
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(
                    monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0) /
                      monthlyRevenue.length,
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Peak
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {formatCurrency(
                    Math.max(...monthlyRevenue.map((m) => m.revenue)),
                  )}
                </p>
              </div>
            </div>
          </div>
        )} */}
      </div>

      {/* Recent Transactions */}
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Recent Transactions
          </h2>
        </div>
        {recentTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground font-medium">
              No recent transactions
            </p>
            <p className="text-muted-foreground/70 text-sm mt-1">
              Payment activity will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="group flex items-center justify-between p-4 bg-background/50 border border-border/50 rounded-2xl hover:bg-background/80 hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-lg text-foreground">
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {transaction.student} → {transaction.mentor}
                    </div>
                    <div className="text-xs text-muted-foreground/70">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 font-medium px-3 py-1"
                  >
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
