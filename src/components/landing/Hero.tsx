import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden bg-background transition-colors duration-300">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(129,140,248,0.1),transparent)]" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[44px_44px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Badge
              variant="secondary"
              className="bg-primary text-primary-foreground hover:bg-primary/90 border-none mr-3 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            >
              Platform v2.0
            </Badge>
            <span className="text-sm font-semibold text-foreground/80">
              The New Standard for Mentorship Booking
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-[100px] font-heading font-extrabold tracking-tight mb-6 sm:mb-8 leading-[0.95] text-foreground animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Expert guidance <br className="hidden sm:block" />
            <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent italic px-2">
              simplified.
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 font-medium px-4">
            Connect with industry-leading mentors through a seamless booking
            experience. Scale your skills with personalized 1-on-1 attention.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link href="/register">
              <Button
                size="lg"
                className="group gap-2 text-lg px-12 h-16 rounded-full shadow-2xl shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-bold"
              >
                Join as Student
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/mentors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-12 h-16 rounded-full border-border hover:bg-accent transition-all duration-300 font-bold"
              >
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-12 pt-12 border-t border-border/50">
          <p className="text-sm font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-10">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale group pb-4">
            {["NextLevel", "TechGlobal", "Innova", "DataFlow", "CloudNet"].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-2xl font-heading font-black tracking-tighter hover:grayscale-0 transition-all cursor-default"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
