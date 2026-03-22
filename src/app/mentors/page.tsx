"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MentorCard } from "@/components/mentor/MentorCard";
import { useGetAllMentorsQuery } from "@/redux/features/mentor/mentorApi";
import { Loader2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MentorListingPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllMentorsQuery({ search });

  const mentors = data?.data || [];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="relative mb-16 p-12 rounded-[3rem] bg-indigo-600 dark:bg-indigo-900 border border-white/10 shadow-2xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 h-48 w-48 bg-secondary/20 rounded-full blur-2xl -ml-24 -mb-24" />

          <div className="relative z-10 max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest mb-6 border border-white/20">
              <Sparkles className="h-3 w-3 fill-white" />
              Explore Experts
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-black tracking-tight mb-6">
              Find your perfect <span className="text-secondary">mentor</span>.
            </h1>
            <p className="text-lg text-white/80 font-medium mb-8">
              Unlock your potential with personal guidance from world-class
              professionals. Search by expertise, skill, or industry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60 group-focus-within:text-white transition-colors" />
                <Input
                  placeholder="Search by name or skill..."
                  className="pl-12 h-14 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:ring-secondary focus:border-secondary transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button className="h-14 px-8 rounded-2xl bg-secondary text-secondary-foreground font-black shadow-xl shadow-secondary/20 group">
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Mentors Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-bold tracking-widest text-sm uppercase">
              Retrieving experts...
            </p>
          </div>
        ) : mentors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mentors.map((mentor) => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 space-y-4">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-black text-foreground">
              No mentors found
            </h2>
            <p className="text-muted-foreground font-medium">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => setSearch("")}
              className="rounded-xl px-8 h-12 font-bold"
            >
              Clear search
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
