"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardSidebar } from "./DashboardSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppSelector } from "@/hooks/useRedux";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // ONLY redirect if we are CERTAIN there is no user AND auth initialization is finished
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
     return (
       <div className="h-screen flex flex-col items-center justify-center space-y-4">
         <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
         <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Synchronizing Session...</p>
       </div>
     );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 border-b border-border bg-background/80 backdrop-blur-2xl sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="p-0 w-72 border-r border-border bg-card"
                >
                  <DashboardSidebar
                    isMobile
                    onNavClick={() => setIsMobileMenuOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>

            {/* <div className="relative max-w-md w-full hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search sessions, users, or settings..."
                className="pl-12 h-11 rounded-full bg-accent/50 border-transparent focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-none transition-all"
              />
            </div> */}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
            <button className="h-10 w-10 rounded-full bg-accent/50 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors relative">
              <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-background" />
            </button>

            {/* Profile Element */}
            <div className="h-10 w-10 rounded-full bg-primary flex flex-col items-center justify-center border-2 border-primary/20 shadow-md shadow-primary/20 cursor-pointer overflow-hidden">
              <span className="text-sm font-black text-primary-foreground uppercase tracking-widest">
                {user?.name ? user.name.slice(0, 2) : "ME"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Rendering Area */}
        <main className="flex-1 overflow-y-auto overflow-hidden p-4 md:p-8 scroll-smooth bg-muted/20">
          <div className="max-w-full mx-auto pb-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
