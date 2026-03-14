import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, MessageSquare, Globe } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentor Profile",
  description:
    "View mentor profile, expertise, availability, and book a session.",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MentorProfilePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main Profile */}
        <div className="space-y-8">
          {/* Mentor Header */}
          <div className="flex items-start gap-6 p-6 rounded-xl border bg-card">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary shrink-0">
              M
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold">Mentor Name</h1>
              <p className="text-muted-foreground mt-1">
                Senior Software Engineer — #{id}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <strong>4.9</strong>
                  <span className="text-muted-foreground">(42 reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  128 sessions
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  English, Bengali
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {["React", "Next.js", "TypeScript", "Node.js"].map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div className="p-6 rounded-xl border bg-card">
            <h2 className="font-semibold text-lg mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mentor bio will be displayed here from the backend API.
            </p>
          </div>

          {/* Reviews */}
          <div className="p-6 rounded-xl border bg-card">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Reviews
            </h2>
            <p className="text-sm text-muted-foreground">
              Reviews will be loaded from the backend.
            </p>
          </div>
        </div>

        {/* Booking Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-xl border bg-card p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">$50</span>
              <span className="text-sm text-muted-foreground">/ session</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              60 minutes
            </div>
            <Link href={`/book-session/${id}`} className="block">
              <Button className="w-full" size="lg">
                Book a Session
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground text-center">
              Free cancellation up to 24 hours before the session.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
