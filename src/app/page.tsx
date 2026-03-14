import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { SocialProof } from "@/components/landing/SocialProof";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const metadata: Metadata = {
  title: "Guidely — Premium Mentor Management System",
  description:
    "The complete platform to manage, grow, and scale your mentorship programs. Scheduling, payments, and analytics in one place.",
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <HowItWorks />
        <Features />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
