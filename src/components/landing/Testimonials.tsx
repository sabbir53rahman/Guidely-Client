"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    content:
      "The mentorship I received through Guidely was a total game-changer for my career. I went from a junior dev to a lead in less than a year.",
    author: "James Wilson",
    role: "Lead Developer at Vercel",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 2,
    content:
      "Finding a mentor who actually understands your specific challenges is hard. Guidely makes it seamless and highly professional.",
    author: "Sophia Chen",
    role: "Product Manager at Airbnb",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  },
  {
    id: 3,
    content:
      "The payment and scheduling are so well-integrated that I can focus entirely on learning rather than logistics. Highly recommended!",
    author: "Michael Ross",
    role: "Senior UX Designer at Netflix",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-background transition-colors duration-300 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] bg-secondary/5 rounded-full blur-[100px]" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-black text-foreground tracking-tight mb-6">
            Trusted by learners <br /> worldwide
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Join thousands of satisfied students and professionals who have
            leveled up their skills with our premium mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="group bg-muted/30 hover:bg-background rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>

              <div className="relative mb-8">
                <Quote className="absolute -top-4 -left-4 h-12 w-12 text-primary/10 -rotate-12" />
                <p className="text-lg font-medium text-foreground leading-relaxed relative z-10">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8 border-t border-border/50">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 border-2 border-primary/20">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-foreground">{t.author}</div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
