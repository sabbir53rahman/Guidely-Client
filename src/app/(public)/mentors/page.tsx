import type { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Browse Mentors",
  description:
    "Find expert mentors across tech, business, design, and more. Filter by expertise, rating, or hourly rate.",
};

export default function MentorsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-slate-900 dark:text-white">
          Find Your Expert Mentor
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl">
          Discover and connect with verified experts who can help you accelerate
          your career growth.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-premium">
            <h2 className="font-heading font-bold text-xl mb-6">Filters</h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 italic">
              Filter components are being synchronized with the backend...
            </div>
          </div>
        </aside>

        {/* Mentor Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-indigo-600">verified</span> experts
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {/* Mentor cards will be rendered here via MentorCard component */}
            <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-12 flex flex-col items-center justify-center min-h-[300px] text-slate-500 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Users className="h-6 w-6" />
              </div>
              <p className="text-sm leading-relaxed">
                Mentor profiles are loading.
                <br />
                Connecting to database...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
