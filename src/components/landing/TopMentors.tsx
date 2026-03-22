"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MOCK_MENTORS = [
  {
    id: "1",
    name: "Alex Rivera",
    expertise: "Product Design",
    rating: 4.9,
    reviews: 124,
    price: 80,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "2",
    name: "Sarah Chen",
    expertise: "Software Architecture",
    rating: 5.0,
    reviews: 89,
    price: 120,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "3",
    name: "Marcus Thorne",
    expertise: "Growth Marketing",
    rating: 4.8,
    reviews: 215,
    price: 95,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    expertise: "Data Science",
    rating: 4.9,
    reviews: 156,
    price: 110,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
];

export function TopMentors() {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-foreground tracking-tight mb-6">
              Learn from the <span className="text-primary">Best</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium">
              Connect with top-tier professionals from world-class companies.
              Our mentors are vetted for expertise and teaching ability.
            </p>
          </div>
          <Link href="/mentors">
            <Button
              variant="outline"
              className="rounded-full px-8 h-12 font-bold group"
            >
              View All Mentors
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_MENTORS.map((mentor) => (
            <div
              key={mentor.id}
              className="group relative bg-background rounded-[2.5rem] p-6 border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

              <div className="relative z-10">
                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-muted">
                  <Image
                    src={mentor.avatar}
                    alt={mentor.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-black text-foreground">
                      {mentor.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {mentor.expertise}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <span className="text-2xl font-black text-foreground">
                        ${mentor.price}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground ml-1">
                        /session
                      </span>
                    </div>
                    <Link href={`/mentors/${mentor.id}`}>
                      <Button
                        size="sm"
                        className="rounded-xl font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                      >
                        Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
