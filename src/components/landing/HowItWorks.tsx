import { Search, Calendar, Video } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Find Your Mentor",
      desc: "Browse through our curated list of industry experts and filter by specialty, rating, or price.",
      color: "bg-blue-500",
    },
    {
      icon: Calendar,
      title: "Book a Session",
      desc: "Choose a time that works for you and book a 1-on-1 session instantly with our smart scheduler.",
      color: "bg-indigo-500",
    },
    {
      icon: Video,
      title: "Start Learning",
      desc: "Connect via our secure video platform and start your journey towards excellence with expert guidance.",
      color: "bg-cyan-500",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 bg-muted/20 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground">
            How Guidely <span className="text-primary italic">works</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Three simple steps to connect with excellence. We handle the
            logistics so you can focus on your growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block -z-10" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-card p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-border shadow-premium hover:shadow-hover transition-all duration-500 hover:-translate-y-2">
                <div
                  className={`${step.color} h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="text-4xl sm:text-5xl font-heading font-black text-foreground/5 mb-4 absolute top-6 right-6 sm:top-10 sm:right-10">
                  0{idx + 1}
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold mb-3 sm:mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
