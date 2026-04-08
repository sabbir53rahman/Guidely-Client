import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TopMentors } from "@/components/landing/TopMentors";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { VideoMeetings } from "@/components/landing/VideoMeetings";
import { TestimonialsWall } from "@/components/landing/TestimonialsWall";
import { Workshops } from "@/components/landing/Workshops";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const metadata: Metadata = {
  title: "MentorFlow — Learn Without Limits",
  description:
    "Connect with expert mentors and transform your career. Learn programming, business, design, and marketing from industry leaders.",
};

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TopMentors />
        <HowItWorks />
        <VideoMeetings />
        <TestimonialsWall />
        <Workshops />
        <ComparisonTable />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
