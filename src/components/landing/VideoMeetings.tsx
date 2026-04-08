"use client";

import {
  Video,
  MessageCircle,
  Share2,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FEATURES = [
  {
    icon: Video,
    title: "HD Video Quality",
    description: "Crystal clear video calls with no lag or interruptions",
  },
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Instant messaging during sessions for better communication",
  },
  {
    icon: Share2,
    title: "Screen Sharing",
    description: "Share your screen for collaborative learning and debugging",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description:
      "Book sessions that fit your schedule with automatic reminders",
  },
];

export function VideoMeetings() {
  return (
    <section
      id="features"
      className="py-20 bg-background transition-colors duration-500"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Video className="h-4 w-4" />
              Instant, Embedded Video Meetings
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Connect Face-to-Face with{" "}
              <span className="text-primary">Experts</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience seamless video calls directly in your browser. No
              downloads, no installations - just instant, high-quality video
              meetings with your mentors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/mentors">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium">
                Start Video Meeting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Right Video Preview */}
          <div className="relative">
            <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-2xl border border-border">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src="/images/mentor_meet.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              HD Quality
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              No Downloads
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
