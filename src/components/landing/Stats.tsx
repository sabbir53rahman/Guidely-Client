const stats = [
  { label: "Active Mentors", value: "850+" },
  { label: "Sessions Booked", value: "25K+" },
  { label: "Satisfaction", value: "99.2%" },
  { label: "Revenue Processed", value: "$2M+" },
];

export function Stats() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border transition-colors duration-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center group">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                {value}
              </div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em] leading-none">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
