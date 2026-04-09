"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Headphones,
  Sparkles,
  CalendarDays,
  ArrowRight,
  Star,
  Play,
  Briefcase,
} from "lucide-react";

import hero_mentor_main from "../../../public/images/hero_mentor_main.jpg";
import hero_mentor_secondary from "../../../public/images/hero_mentor_secondary.jpg";

const TRUSTED_BY = [
  { name: "Google", logo: "Google" },
  { name: "Microsoft", logo: "Microsoft" },
  { name: "Amazon", logo: "Amazon" },
  { name: "Meta", logo: "Meta" },
  { name: "Netflix", logo: "Netflix" },
];

const MENU_LINKS = [
  {
    icon: BookOpen,
    title: "Read the Blog",
    actionText: "Explore insights",
    href: "/#",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Headphones,
    title: "The Tech Podcast",
    actionText: "Listen now",
    href: "/#",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    icon: Sparkles,
    title: "Career Reset",
    actionText: "Join community",
    href: "/#",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bg-gradient-slide {
          to { background-position: 200% center; }
        }
        .animate-bg-slide {
          animation: bg-gradient-slide 6s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
      `,
        }}
      />

      <section className="relative bg-background min-h-[calc(100vh-80px)] pt-15 pb-15 flex flex-col justify-center overflow-hidden border-b border-border/40">
        {/* Background Decorative Orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] max-w-[500px] h-[40%] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] max-w-[500px] h-[40%] rounded-full bg-secondary/20 blur-[100px] pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-8 items-center">
            {/* Left Column: Text & Links */}
            <div
              className={`flex flex-col justify-center pt-8 transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-sm font-semibold w-fit mb-8 shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-shadow cursor-default">
                <Sparkles className="w-4 h-4" />
                <span>Accepting new mentees for 2026</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-foreground leading-[1.05] mb-6 text-center md:text-start font-serif tracking-tight">
                Software Engineering <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-primary bg-size-[200%_auto] animate-bg-slide inline-block pb-2">
                  & Career Mentor.
                </span>{" "}
                <br className="hidden sm:block" />
                Author. Speaker
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 text-center md:text-start max-w-xl leading-relaxed italic">
                I help developers write cleaner code, rewire their
                problem-solving mind, and reclaim their career trajectory, so
                they can live fully actualized.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-2xl mb-14">
                <Link
                  href="/mentors"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-2xl bg-primary text-primary-foreground font-semibold overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-primary/20 hover:shadow-primary/30"
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CalendarDays className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">
                    Book a Mentoring Session
                  </span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button className="group flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-2xl bg-card border border-border hover:bg-muted/50 hover:border-border font-semibold transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch My Work</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:w-[95%]">
                {MENU_LINKS.map((link, idx) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex flex-col p-5 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/60 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg transition-all duration-300 group"
                    style={{ transitionDelay: `${mounted ? idx * 100 : 0}ms` }}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${link.bg} ${link.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors text-sm md:text-base">
                      {link.title}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-1">
                      {link.actionText}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Column: Imagery composition */}
            <div
              className={`relative flex items-center justify-center lg:justify-end h-[500px] lg:h-[700px] mt-16 lg:mt-0 transition-all duration-1000 delay-300 ease-out ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              {/* Main Background Glow for Image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[80px]" />

              {/* Main Picture */}
              <div className="relative w-[70%] lg:w-[65%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl z-10 border-8 border-background bg-secondary group">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
                <Image
                  src={hero_mentor_main}
                  alt="Main Mentor Portrait"
                  fill
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                  priority
                />
              </div>

              {/* Floating Element 1 - Secondary Picture */}
              <div className="absolute left-0 bottom-[5%] w-[45%] h-[35%] rounded-[2rem] overflow-hidden shadow-2xl z-20 border-[6px] border-background animate-float-delayed">
                <Image
                  src={hero_mentor_secondary}
                  alt="Mentor session"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[1.5rem]" />
              </div>

              {/* Floating Element 2 - Rating Badge */}
              <div className="absolute -top-4 right-[5%] bg-background/90 backdrop-blur-xl border border-border/60 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-float">
                <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-foreground leading-tight">
                    5.0 Rating
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    From 200+ mentees
                  </p>
                </div>
              </div>

              {/* Floating Element 3 - Experience Badge */}
              <div
                className="absolute top-[45%] -right-6 lg:-right-10 bg-card/90 backdrop-blur-xl border border-border/60 px-5 py-3.5 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="bg-green-500/10 text-green-500 p-2 rounded-full">
                  <Briefcase className="w-4 h-4" />
                </div>
                <p className="font-bold text-sm tracking-wide">10+ Yrs Exp.</p>
              </div>

              {/* Decorative Dots Pattern */}
              <div className="absolute -bottom-8 -right-8 grid grid-cols-5 gap-3 z-0 opacity-30">
                {Array.from({ length: 25 }).map((_, idx) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-primary" />
                ))}
              </div>
            </div>
          </div>

          {/* Trusted By Footer */}
          <div
            className={`mt-24 pt-12 border-t border-border/40 flex flex-col items-center transition-all duration-1000 delay-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground mb-8">
              Trusted by tech leaders from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 lg:gap-x-20 gap-y-8 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
              {TRUSTED_BY.map((company) => (
                <div
                  key={company.name}
                  className="text-2xl md:text-3xl font-black tracking-tighter text-foreground"
                >
                  {company.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
