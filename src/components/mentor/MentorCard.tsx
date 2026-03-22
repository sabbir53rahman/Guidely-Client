"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const { user, bio, expertise, hourlyRate, rating, totalReviews } = mentor;

  return (
    <div className="group bg-background rounded-[2.5rem] p-6 border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full">
      {/* Photo & Rating Overlay */}
      <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-muted">
        <Image
          src={
            user.avatar ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
          }
          alt={user.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-black text-foreground">
            {rating || 0}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground">
            ({totalReviews || 0})
          </span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
            {user.name}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {expertise.slice(0, 2).map((exp, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/10"
              >
                {exp.category}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 font-medium leading-relaxed">
          {bio}
        </p>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold truncate">Expert Mentor</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold truncate">Verified</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6">
        <div>
          <span className="text-2xl font-black text-foreground">
            ${hourlyRate}
          </span>
          <span className="text-xs font-bold text-muted-foreground ml-1">
            /session
          </span>
        </div>
        <Link href={`/mentors/${mentor._id}`}>
          <Button className="rounded-xl px-6 h-11 font-black group">
            View Profile
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
