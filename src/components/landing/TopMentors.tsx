"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  UserCircle2,
  Briefcase,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllMentorsQuery } from "@/redux/features/mentor/mentorApi";

export function TopMentors() {
  const { data: mentorsResponse, isLoading } = useGetAllMentorsQuery({
    sortBy: "rating",
    sortOrder: "desc",
    limit: 4,
  });

  const topMentors = mentorsResponse?.data || [];

  return (
    <section className="py-20 bg-background transition-colors duration-500 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Learn from the <span className="text-primary">Best</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with industry experts who have real-world experience and are
            passionate about sharing their knowledge.
          </p>
        </div>

        {/* Mentor Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-muted/20 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Mentor Image */}
                <div className="relative h-48 bg-muted">
                  {mentor.profilePhoto ? (
                    <Image
                      src={mentor.profilePhoto}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary/5">
                      <UserCircle2 className="h-16 w-16 text-primary/30" />
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs dark:text-black text-foreground font-semibold">
                      {mentor.averageRating?.toFixed(1) || "5.0"}
                    </span>
                  </div>
                </div>

                {/* Mentor Info */}
                <div className="p-5">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {mentor.expertise || "Expert Mentor"}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>150+ students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>500+ hours</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-foreground">
                        ${mentor.hourlyRate}
                      </span>
                      <span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                    <Link href={`/mentors/${mentor.id}`}>
                      <Button
                        size="sm"
                        className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-8 text-xs font-medium"
                      >
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && topMentors.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              Our expert mentors are getting ready. Check back soon!
            </p>
          </div>
        )}

        {/* View All Button */}
        {topMentors.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/mentors">
              <Button
                variant="outline"
                className="rounded-full px-8 h-12 font-medium group border border-border hover:bg-primary hover:text-primary-foreground transition-all"
              >
                View All Mentors
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
