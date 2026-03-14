import { Calendar, CreditCard, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Automated booking and time-zone management for global connections.",
    gradient: "from-primary/20 to-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: CreditCard,
    title: "Seamless Payments",
    description:
      "Secure, global payment processing with automated payouts for mentors.",
    gradient: "from-secondary/20 to-secondary/10",
    iconColor: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track performance, session growth, and revenue with detailed dashboards.",
    gradient: "from-chart-3/20 to-chart-3/10",
    iconColor: "text-chart-3",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-grade security and privacy controls for your data and sessions.",
    gradient: "from-chart-4/20 to-chart-4/10",
    iconColor: "text-chart-4",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20 max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground leading-[1.1]">
            Everything you need in one powerful suite
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Stop juggling multiple tools. Guidely brings scheduling, payments,
            and mentor management into a single, unified workflow.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {features.map(
            ({ icon: Icon, title, description, gradient, iconColor }) => (
              <div
                key={title}
                className="group p-px rounded-3xl bg-linear-to-br from-border to-border/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="h-full p-8 rounded-[1.45rem] bg-card transition-colors duration-300 flex flex-col sm:flex-row gap-6">
                  <div
                    className={`shrink-0 h-16 w-16 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                      {title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
