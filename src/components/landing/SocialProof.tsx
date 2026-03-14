import Image from "next/image";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SocialProof() {
  return (
    <section className="py-32 bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-20">
          <div className="flex-1 space-y-8 sm:space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-secondary/20">
                <Star className="h-3 w-3 fill-current" />
                Trusted by Industry Leaders
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight leading-[1.05] mb-6 sm:mb-8">
                Empowering the next <br />
                <span className="text-primary italic">generation</span> of
                leaders.
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium">
                Guidely isn&apos;t just a booking tool. It&apos;s a growth
                engine. We connect proven experts with ambitious learners to
                foster real-world impact.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  title: "Smart Matching",
                  desc: "Find the mentor who fits your goals perfectly.",
                },
                {
                  title: "Direct Access",
                  desc: "Skip the noise and get 1-on-1 time instantly.",
                },
                {
                  title: "Secure Workflow",
                  desc: "From booking to payment, it's all handled.",
                },
                {
                  title: "Global Context",
                  desc: "Connect with experts from any time zone.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="h-3 w-3 text-primary" />
                    </div>
                    <span className="font-bold text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-full px-12 h-16 text-lg font-bold bg-background border-border transition-all hover:bg-accent hover:scale-105"
            >
              See Success Stories
            </Button>
          </div>

          <div className="flex-1 relative w-full lg:max-w-none max-w-2xl mx-auto">
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-10 blur-3xl" />

            <div className="relative z-10 w-full aspect-square sm:aspect-4/5 rounded-[2rem] sm:rounded-[3rem] bg-muted shadow-2xl overflow-hidden group">
              <Image
                src="/images/mentor-session.png"
                alt="Mentorship Session"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                <div className="bg-white/10 backdrop-blur-2xl p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/20 text-white shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-3 w-3 sm:h-4 sm:w-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-lg sm:text-xl font-medium italic mb-4 sm:mb-6 leading-relaxed">
                    &quot;Guidely has transformed how we approach career growth.
                    The quality of mentors is unmatched in the industry.&quot;
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full border-2 border-white/30 overflow-hidden relative bg-slate-200">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                        alt="Sarah"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-lg sm:text-xl">
                        Sarah Jenkins
                      </div>
                      <div className="text-[10px] sm:text-sm opacity-80 font-medium tracking-wide leading-tight">
                        VP of Engineering at TechGlobal
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
