import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Guidely — Find Your Perfect Mentor",
  description:
    "Connect with world-class mentors across tech, business, and design. Book 1-on-1 sessions and fast-track your career growth.",
};

const stats = [
  { label: "Expert Mentors", value: "500+", icon: Users },
  { label: "Sessions Completed", value: "10K+", icon: BookOpen },
  { label: "Average Rating", value: "4.9★", icon: Star },
  { label: "Success Rate", value: "98%", icon: TrendingUp },
];

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description:
      "Every mentor is thoroughly vetted with background checks and portfolio reviews.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your schedule — mornings, evenings, or weekends.",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description:
      "Our smart algorithm finds the most suitable mentor for your specific goals.",
  },
  {
    icon: CheckCircle,
    title: "Money-Back Guarantee",
    description:
      "Not satisfied with your session? Get a full refund, no questions asked.",
  },
];

const categories = [
  "Web Development",
  "Data Science",
  "UI/UX Design",
  "Machine Learning",
  "DevOps & Cloud",
  "Career Coaching",
  "Blockchain",
  "Cybersecurity",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
              🚀 Join 10,000+ learners growing their careers
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Learn from{" "}
              <span className="bg-linear-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                World-Class
              </span>{" "}
              Mentors
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with verified industry experts for personalized 1-on-1
              mentorship. Accelerate your career growth with guidance tailored
              exactly to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mentors">
                <Button size="lg" className="gap-2 text-base px-8 h-12">
                  Browse Mentors
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register?role=mentor">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-8 h-12"
                >
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Expertise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find mentors across a wide range of disciplines and industries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-8">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/mentors?category=${encodeURIComponent(cat)}`}
              >
                <Badge
                  variant="outline"
                  className="px-5 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {cat}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/mentors">
              <Button variant="outline" className="gap-2">
                View All Categories <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Guidely?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We make finding the right mentor simple, safe, and effective.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card
                key={title}
                className="relative overflow-hidden border-0 bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
            Join thousands of professionals already growing with Guidely
            mentors. Start your journey today — your first session is just a
            click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base px-8 h-12"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/mentors">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Browse Mentors
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
