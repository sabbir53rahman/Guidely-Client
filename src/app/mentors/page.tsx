"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { MentorCard } from "@/components/mentor/MentorCard";
import { useGetAllMentorsQuery } from "@/redux/features/mentor/mentorApi";
import { Pagination } from "@/components/shared/Pagination";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Mentor } from "@/types";
import Footer from "@/components/layout/Footer";

const STATS = [
  { icon: Users, label: "Expert Mentors", value: "5,000+" },
  { icon: Star, label: "Average Rating", value: "4.9/5" },
  { icon: Award, label: "Success Stories", value: "10,000+" },
  { icon: TrendingUp, label: "Career Growth", value: "94%" },
];

export default function MentorListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllMentorsQuery({
    searchTerm,
    page,
    limit,
  });

  const mentors = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-background via-primary/5 to-secondary/5 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative mb-16 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse animation-delay-2000" />
            <div className="absolute bottom-10 left-1/2 w-36 h-36 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000" />
          </div>

          <div className="relative z-10 text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                <Sparkles className="h-4 w-4 text-primary relative" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                🎯 Find Your Perfect Mentor
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-4">
              Learn from
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Industry Experts
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Connect with 5,000+ vetted mentors who are passionate about
              helping you achieve your career goals and unlock your full
              potential.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-lg font-black text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-lg mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 group">
              <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search mentors by name or email..."
                  className="pl-14 pr-6 h-14 rounded-2xl bg-background/80 backdrop-blur-sm border-0 focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-lg"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* Advanced Filters Button */}
            <Button className="h-14 px-6 rounded-2xl bg-secondary text-secondary-foreground font-semibold hover:bg-secondary/90 transition-all duration-300">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {searchTerm
                ? `Search Results (${meta?.total || 0})`
                : `All Mentors (${meta?.total || 0})`}
            </h2>
            <p className="text-muted-foreground font-medium">
              {searchTerm
                ? `Mentors matching your search criteria`
                : `Browse our complete directory of ${
                    meta?.total || "expert"
                  } mentors`}
            </p>
          </div>

          {/* Sort Dropdown */}
          {/* <select className="px-4 py-2 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20">
            <option>Sort by: Rating</option>
            <option>Sort by: Experience</option>
            <option>Sort by: Price</option>
            <option>Sort by: Availability</option>
          </select> */}
        </div>

        {/* Mentors Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-ping" />
              <Loader2 className="h-16 w-16 text-primary animate-spin relative" />
            </div>
            <p className="text-foreground font-bold tracking-wider text-lg animate-pulse">
              Finding your perfect mentors...
            </p>
          </div>
        ) : mentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mentors.map((mentor: Mentor, index: number) => (
              <div
                key={mentor.id || index}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="relative h-24 w-24 bg-muted rounded-2xl flex items-center justify-center border border-border">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              No mentors found
            </h2>
            <p className="text-xl text-muted-foreground max-w-md mx-auto mb-8">
              We couldn&apos;t find mentors matching your search. Try different
              keywords or browse all mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setSearchTerm("")}
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                Clear Search
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 rounded-xl border-2 border-border font-semibold hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                Browse All Mentors
              </Button>
            </div>
          </div>
        )}

        {/* Pagination Section */}
        {!isLoading && mentors.length > 0 && (
          <div className="mt-20">
            <div className="h-px w-full bg-linear-to-r from-transparent via-border/50 to-transparent mb-12" />
            <Pagination
              currentPage={page}
              totalPages={meta?.totalPages || 1}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes animation-delay-2000 {
          animation-delay: 2000ms;
        }
        @keyframes animation-delay-4000 {
          animation-delay: 4000ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  );
}
