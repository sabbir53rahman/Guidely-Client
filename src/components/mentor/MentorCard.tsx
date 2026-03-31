"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Clock,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const {
    id,
    user,
    bio,
    expertise,
    experience,
    averageRating,
    hourlyRate,
    isAvailable,
    reviews,
  } = mentor;

  const avatarSrc =
    user?.avatar ||
    user?.image ||
    user?.profilePhoto ||
    "/images/default-avatar.png";

  const ratingCount = reviews?.length ?? 0;
  const rating = averageRating ?? 0;

  // Derive up to 3 skill chips from the expertise string
  const skills = expertise
    ? expertise.split(/[,/]/).map((s) => s.trim()).filter(Boolean).slice(0, 3)
    : ["Mentorship"];

  return (
    <div className="group relative flex flex-col bg-card border border-border rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1.5 transition-all duration-500">
      {/* ── Top gradient accent bar ── */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-violet-500 to-secondary" />

      {/* ── Header: avatar + meta ── */}
      <div className="relative px-6 pt-6 pb-4">
        {/* Availability pill – top right */}
        <div className="absolute top-5 right-5">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
              Busy
            </span>
          )}
        </div>

        {/* Avatar with ring */}
        <div className="relative w-20 h-20 mb-4">
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary to-secondary p-[2px] shadow-lg shadow-primary/30">
            <div className="w-full h-full rounded-full overflow-hidden bg-card">
              <Image
                src={avatarSrc}
                alt={user?.name ?? "Mentor"}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          {/* Verified tick */}
          <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-primary shadow-md shadow-primary/40">
            <BadgeCheck className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Name & role */}
        <h3 className="text-lg font-bold text-foreground leading-tight line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {user?.name ?? mentor.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
          <Briefcase className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">{expertise ?? "Professional Mentor"}</span>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{experience ?? 1}+ yrs experience</span>
        </div>
      </div>

      {/* ── Star rating row ── */}
      <div className="flex items-center gap-2 px-6 pb-4">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">
          ({ratingCount} {ratingCount === 1 ? "review" : "reviews"})
        </span>
      </div>

      {/* ── Bio ── */}
      <p className="px-6 pb-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {bio ??
          "Passionate mentor dedicated to helping students unlock their full potential through personalised, hands-on guidance."}
      </p>

      {/* ── Skill chips ── */}
      <div className="flex flex-wrap gap-2 px-6 pb-5">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-xs font-medium rounded-full px-3 py-1 bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            {skill}
          </Badge>
        ))}
        <Badge
          variant="secondary"
          className="text-xs font-medium rounded-full px-3 py-1 bg-secondary/10 text-secondary border-0"
        >
          <GraduationCap className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      </div>

      {/* ── Divider ── */}
      <div className="mx-6 border-t border-border/60" />

      {/* ── Footer: price + CTA ── */}
      <div className="flex items-center justify-between gap-3 px-6 py-5">
        {/* Price */}
        <div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-black text-foreground">${hourlyRate ?? 50}</span>
            <span className="text-xs text-muted-foreground ml-1">/hr</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">Free intro call</p>
        </div>

        {/* CTA */}
        <Link href={`/mentors/${id}`}>
          <Button
            size="sm"
            className="rounded-xl bg-linear-to-r from-primary to-secondary text-white font-semibold px-5 shadow-md shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300"
          >
            View Profile
            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
