export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const MENTOR_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning / AI",
  "DevOps & Cloud",
  "UI/UX Design",
  "Cybersecurity",
  "Blockchain",
  "Career Coaching",
  "Entrepreneurship",
  "Finance & Investment",
  "Marketing",
] as const;

export const SESSION_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const SESSION_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export const LANGUAGES = [
  "English",
  "Bengali",
  "Hindi",
  "Arabic",
  "French",
  "Spanish",
  "German",
  "Chinese",
  "Japanese",
  "Portuguese",
];

export const NAV_LINKS = [
  { label: "Browse Mentors", href: "/mentors" },
  // { label: "Become a Mentor", href: "/become-mentor" },
  // { label: "How it Works", href: "/#how-it-works" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  mentors: [
    { label: "Become a Mentor", href: "/become-mentor" },
    { label: "Mentor Guidelines", href: "/mentor-guidelines" },
    { label: "Community", href: "/community" },
  ],
};
