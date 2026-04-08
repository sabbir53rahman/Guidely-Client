import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
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
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ReduxProvider>
            {children}
            <script dangerouslySetInnerHTML={{ __html: `window.chtlConfig = { chatbotId: "8329543734" }` }} />
            <script async data-id="8329543734" id="chtl-script" type="text/javascript" src="https://chatling.ai/js/embed.js"></script>
            <Toaster richColors position="top-right" />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
