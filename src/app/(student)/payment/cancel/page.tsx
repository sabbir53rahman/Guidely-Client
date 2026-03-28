"use client";

import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-2xl w-full bg-card/40 backdrop-blur-xl border border-border/50 rounded-[3rem] p-10 sm:p-16 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-destructive/20 blur-2xl rounded-full scale-125 pulse"></div>
            <div className="h-24 w-24 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center relative z-10">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-black uppercase tracking-widest mb-6 border border-destructive/20 shadow-sm">
            Transaction Cancelled
          </span>

          <h1 className="text-4xl sm:text-5xl font-heading font-black tracking-tighter text-foreground mb-6">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-md mb-12">
            The payment process was cancelled. No charges were made. You can try
            booking the session again from your history.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Button className="h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/25 gap-2 group">
              <Link href="/session-history">
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Retry Payment
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-14 rounded-2xl font-bold border-border/60 hover:bg-muted transition-all"
            >
              <Link href="/book-session">
                <ArrowLeft className="h-5 w-5 mr-2 opacity-70" />
                Browse Mentors
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
