import { MentorSidebar } from "@/components/layout/MentorSidebar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
// import { UserNav } from "@/components/layout/UserNav"; // I'll check if this exists, if not i'll create it
import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sidebar */}
      <MentorSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search sessions or students..."
                className="pl-12 h-11 rounded-xl bg-muted/50 border-transparent focus:bg-background focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors relative">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
            </button>

            {/* Simple User Display for now */}
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-sm font-black text-primary">JD</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-20">{children}</div>
        </main>
      </div>
    </div>
  );
}
