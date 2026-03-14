import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Mentors",
  description:
    "Find expert mentors across tech, business, design, and more. Filter by expertise, rating, or hourly rate.",
};

export default function MentorsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Find Your Mentor</h1>
        <p className="text-muted-foreground text-lg">
          Discover and connect with verified experts in your field.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters Sidebar - content to be built with components */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border bg-card p-6 space-y-5">
            <h2 className="font-semibold text-base">Filters</h2>
            <p className="text-sm text-muted-foreground">
              Filter components will go here (coming soon with full backend
              integration).
            </p>
          </div>
        </aside>

        {/* Mentor Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">Showing all mentors</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* Mentor cards will be rendered here via MentorCard component */}
            <div className="rounded-xl border bg-card p-6 flex items-center justify-center min-h-[200px] text-muted-foreground text-sm">
              Mentor cards will render here once connected to backend.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
