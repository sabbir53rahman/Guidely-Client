"use client";

import React, { useState } from "react";
import { Star, X, MessageSquare, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useCreateReviewMutation } from "@/redux/features/review/reviewApi";

interface ReviewModalProps {
  open: boolean;
  onClose: () => void;
  mentorId: string;
  mentorName: string;
}

export function ReviewModal({ open, onClose, mentorId, mentorName }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating before submitting.");
      return;
    }

    try {
      await createReview({
        mentorId,
        rating,
        comment,
      }).unwrap();
      toast.success("Thank you for your valuable feedback!");
      onClose();
      // Reset state for next time
      setRating(0);
      setComment("");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] bg-card border border-border/50 shadow-2xl p-8 md:p-10 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 h-10 w-10 rounded-2xl bg-muted hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-all active:scale-90"
        >
          <X className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <ShieldCheck className="h-3 w-3" />
              Verified Experience
            </div>
            <h2 className="text-3xl font-heading font-black tracking-tight text-foreground">
              Rate your session with <span className="text-primary italic whitespace-nowrap">{mentorName}</span>
            </h2>
            <p className="text-muted-foreground font-medium text-sm">
              Your honest feedback helps our community discover top mentors and helps {mentorName} improve their impact.
            </p>
          </div>

          {/* Star Rating Section */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-muted/30 border border-border/40 gap-4">
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">
                Overall Rating
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="relative transition-transform active:scale-90"
                  >
                    <Star
                      className={cn(
                        "h-10 w-10 transition-all duration-300",
                        (hoverRating || rating) >= star 
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                          : "text-muted-foreground/30",
                        rating >= star && "scale-110"
                      )}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-amber-600 h-5">
                {rating === 1 && "Need Improvement"}
                {rating === 2 && "Fair Session"}
                {rating === 3 && "Good Experience"}
                {rating === 4 && "Great Impact"}
                {rating === 5 && "Exceeds Expectations!"}
              </p>
            </div>
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
             <div className="flex items-center gap-2 ml-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Thoughts</Label>
             </div>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you liked most or how the session could be even better..."
              className="min-h-[140px] rounded-[1.5rem] border-border/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium p-6 resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || rating === 0}
            className="w-full h-16 rounded-[1.5rem] bg-primary text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-3"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Publishing Feed...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Submit Review
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

// Inline Label helper for the modal
function Label({ children, className }: { children: React.ReactNode, className?: string }) {
  return <label className={cn("block", className)}>{children}</label>;
}
