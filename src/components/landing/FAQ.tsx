"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";

const FAQS = [
  {
    q: "How do I choose the right mentor for me?",
    a: "Our matching algorithm combines your tech stack, career goals, seniority level, and personal preferences to suggest the top 5 mentors for you. You can filter by company, skills, and even communication style. We also recommend booking a 'Discovery Call' (a free 15-minute intro session) before committing to a full booking.",
  },
  {
    q: "What if I'm not satisfied with a session?",
    a: "We stand behind every session with our 100% Satisfaction Guarantee. If you're unsatisfied for any reason after your first session with a new mentor, we'll give you a full refund or re-match you with a different mentor at no extra cost. No questions asked, no awkward forms.",
  },
  {
    q: "Is there a free trial for specific mentors?",
    a: "Yes! Every new member gets one free 20-minute 'Meet & Greet' call with any mentor of their choice. This lets you gauge chemistry and communication style before investing in a full session. Many mentors also offer a discounted rate for the first full session.",
  },
  {
    q: "How are mentors verified and vetted?",
    a: "Every mentor on Guidely goes through a thorough 3-step vetting process: a background and identity check, a technical skills assessment by our internal team, and a reference check from their current employer. Fewer than 8% of applicants are accepted. You're only talking to the real deal.",
  },
  {
    q: "Can I book recurring sessions with the same mentor?",
    a: "Absolutely. After your first session, you and your mentor can set up a recurring 'Mentorship Plan' — weekly, bi-weekly, or monthly. These recurring plans come with a discounted rate and allow you to build a long-term relationship with your mentor for sustained growth.",
  },
  {
    q: "What happens if my mentor cancels last minute?",
    a: "If a mentor cancels less than 24 hours before your scheduled session, you receive a full refund plus a 20% credit toward your next booking. Consistent cancellations result in the mentor's removal from the platform. We take your time seriously.",
  },
  {
    q: "What types of sessions are available?",
    a: "We offer 1-on-1 video sessions, code review sessions, portfolio reviews, system design whiteboards, mock interviews, and career coaching calls. Group workshops are also available for those who prefer a collaborative learning environment at a lower price point.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight mb-4">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Everything you need to know before your first session. Still have
            questions? Our team is one message away.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`group bg-card/40 backdrop-blur-md border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? "border-primary/40 shadow-xl shadow-primary/5" : "border-border/40 hover:border-border"}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-7 text-left cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={`font-bold text-base md:text-lg leading-snug transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"}`}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                >
                  <p className="text-muted-foreground leading-relaxed px-5 md:px-7 pb-6 text-sm md:text-base">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Nudge */}
        <div className="mt-12 bg-card/40 backdrop-blur-md border border-border/40 rounded-3xl p-8 text-center">
          <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team typically responds within 2 hours.
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20">
            Chat With Us
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
