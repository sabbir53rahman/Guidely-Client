"use client";

import { Star, Quote } from "lucide-react";

const TESTIMONIALS_ROW_1 = [
  {
    name: "Priya Sharma",
    photo: "PS",
    before: "Junior Developer",
    after: "Software Engineer at Stripe",
    company: "Stripe",
    quote:
      "I was stuck in tutorial hell for 2 years. After 3 months with my Guidely mentor, I had a system design framework, real projects, and an offer letter.",
    rating: 5,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ahmad Al-Rashid",
    photo: "AA",
    before: "CS Graduate",
    after: "Backend Eng. at Google",
    company: "Google",
    quote:
      "My mentor did mock interviews with me every week. The feedback was brutally honest and exactly what I needed. Cleared Google L4 on my first attempt.",
    rating: 5,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Linh Nguyen",
    photo: "LN",
    before: "PHP Freelancer",
    after: "React Dev at Remote Startup",
    company: "Remote",
    quote:
      "Switching from PHP to React felt daunting. My mentor didn't just teach me the syntax — she taught me how to think in components. Fully remote now.",
    rating: 5,
    color: "from-rose-500 to-pink-500",
  },
  {
    name: "James Okafor",
    photo: "JO",
    before: "Self-taught Coder",
    after: "Full-Stack Dev at Shopify",
    company: "Shopify",
    quote:
      "No CS degree, no bootcamp. Just me, my mentor, and 4 months of consistent work. The structured roadmap Guidely gave me made everything click.",
    rating: 5,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Sofia Reyes",
    photo: "SR",
    before: "Accounting Professional",
    after: "Data Analyst at Netflix",
    company: "Netflix",
    quote:
      "Complete career switch at 31. My mentor helped me build a portfolio of SQL and Python projects. Netflix reached out to me on LinkedIn 3 weeks after I posted it.",
    rating: 5,
    color: "from-emerald-500 to-teal-500",
  },
];

const TESTIMONIALS_ROW_2 = [
  {
    name: "Ravi Patel",
    photo: "RP",
    before: "Mid-level Engineer",
    after: "Staff Engineer at Meta",
    company: "Meta",
    quote:
      "I'd been a mid-level engineer for 5 years and couldn't break through. 6 months with a Staff-level mentor completely changed my thinking about systems and impact.",
    rating: 5,
    color: "from-violet-500 to-indigo-500",
  },
  {
    name: "Yuna Kim",
    photo: "YK",
    before: "Marketing Manager",
    after: "Product Manager at Airbnb",
    company: "Airbnb",
    quote:
      "My mentor had been a PM at two unicorns. She helped me position my marketing experience as a superpower. The PM role at Airbnb opens so many doors.",
    rating: 5,
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    name: "Ethan Clarke",
    photo: "EC",
    before: "QA Engineer",
    after: "DevOps Engineer at AWS",
    company: "AWS",
    quote:
      "The mentorship wasn't just technical — it was about confidence. My mentor believed in me before I believed in myself. Got the AWS role 4 months in.",
    rating: 5,
    color: "from-sky-500 to-blue-500",
  },
  {
    name: "Amara Diallo",
    photo: "AD",
    before: "Boot Camp Grad",
    after: "iOS Engineer at Apple",
    company: "Apple",
    quote:
      "Boot camp gave me the basics. Guidely gave me real-world mentorship. My mentor reviewed my Swift code every single week. That's what Apple was looking for.",
    rating: 5,
    color: "from-lime-500 to-green-500",
  },
  {
    name: "Lucas Ferreira",
    photo: "LF",
    before: "Graphic Designer",
    after: "UX Engineer at Figma",
    company: "Figma",
    quote:
      "I always knew design but felt impostor syndrome with code. My mentor bridged the gap — now I'm at the company that makes the design tool everyone uses.",
    rating: 5,
    color: "from-orange-500 to-red-500",
  },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS_ROW_1)[0];
}) {
  return (
    <div className="w-[340px] shrink-0 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 opacity-5 -mr-6 -mt-6">
        <Quote className="w-full h-full" />
      </div>

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-linear-to-br ${testimonial.color} flex items-center justify-center text-white text-sm font-black shrink-0`}
        >
          {testimonial.photo}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-foreground text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="line-through opacity-60">{testimonial.before}</span>
            {" → "}
            <span className="text-primary font-medium">{testimonial.after}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsWall() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden border-y border-border/30">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Wall of Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Real People. Real Careers.{" "}
            <span className="text-primary">Real Results.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Over 10,000 developers, designers, and career-switchers have used
            Guidely to land their dream jobs.
          </p>
        </div>
      </div>

      {/* Marquee Row 1 — Left */}
      <div className="relative mb-5 overflow-hidden">
        <div className="flex gap-5 w-max animate-marquee-left">
          {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Marquee Row 2 — Right */}
      <div className="relative overflow-hidden">
        <div className="flex gap-5 w-max animate-marquee-right">
          {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background/80 to-transparent z-10 pointer-events-none" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 45s linear infinite;
        }
        .animate-marquee-left:hover,
        .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
