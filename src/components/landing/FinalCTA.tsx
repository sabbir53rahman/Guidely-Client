"use client";

import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-20 bg-linear-to-br from-primary to-secondary relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to Transform
            <br />
            <span className="text-yellow-200">Your Career?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Join 2M+ learners getting personalized mentorship from world-class
            experts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/register">
              <Button
                size="lg"
                className="group gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <CheckCircle className="h-5 w-5" />
                Start Free Trial
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <div className="flex items-center gap-2 text-white/80 font-medium text-sm">
              <ShieldCheck className="h-4 w-4" />
              No credit card required
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/90">
              <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Users className="h-5 w-5" />
              <span className="font-semibold">2M+ Learners</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <ShieldCheck className="h-5 w-5" />
              <span className="font-semibold">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </section>
  );
}
