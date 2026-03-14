import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Guidely — Find Your Perfect Mentor",
    template: "%s | Guidely",
  },
  description:
    "Connect with expert mentors to accelerate your career. Book 1-on-1 sessions, get personalized guidance, and achieve your goals faster with Guidely.",
  keywords: [
    "mentor",
    "mentorship",
    "learning",
    "career",
    "coaching",
    "booking",
  ],
  authors: [{ name: "Guidely Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://guidely.io",
    siteName: "Guidely",
    title: "Guidely — Find Your Perfect Mentor",
    description: "Connect with expert mentors to accelerate your career.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <ReduxProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
