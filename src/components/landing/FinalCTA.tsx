import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FinalCTA() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2rem] sm:rounded-[3.5rem] bg-slate-900 dark:bg-primary/10 p-8 sm:p-12 md:p-24 overflow-hidden border border-white/10 text-center group">
          {/* Animated Background Mesh */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary rounded-full blur-[80px] sm:blur-[120px] opacity-30 group-hover:scale-125 transition-transform duration-[3s]" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-secondary rounded-full blur-[80px] sm:blur-[120px] opacity-20 group-hover:scale-125 transition-transform duration-[3s] delay-1000" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <Badge className="bg-white/10 text-white border-white/20 px-4 py-1 mb-8 sm:mb-10 rounded-full font-bold uppercase tracking-widest text-[10px] backdrop-blur-md">
              Start your journey today
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-8 sm:mb-10 tracking-tighter leading-[0.9]">
              Turn your <span className="text-secondary">ambition</span> into
              action.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/60 mb-10 sm:mb-14 leading-relaxed font-medium px-4">
              Join 10,000+ students already accelerating their careers with
              world-class mentorship on Guidely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-white text-slate-900 hover:bg-secondary hover:text-secondary-foreground px-12 h-16 rounded-full text-lg font-black shadow-2xl transition-all hover:scale-105 active:scale-95 border-none"
                >
                  Join Guidely Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white bg-white/10 hover:bg-white/20 hover:text-white px-12 h-16 rounded-full text-lg font-bold backdrop-blur-md transition-all"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
