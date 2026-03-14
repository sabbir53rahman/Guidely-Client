// ─── User & Auth ─────────────────────────────────────────────────────────────
export type UserRole = "student" | "mentor" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Mentor ───────────────────────────────────────────────────────────────────
export interface Expertise {
  category: string;
  skills: string[];
}

export interface Review {
  _id: string;
  student: Pick<User, "_id" | "name" | "avatar">;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Mentor {
  _id: string;
  user: User;
  bio: string;
  expertise: Expertise[];
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  totalSessions: number;
  languages: string[];
  isAvailable: boolean;
  reviews: Review[];
  createdAt: string;
}

// ─── Availability ─────────────────────────────────────────────────────────────
export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface AvailabilityDay {
  date: string;
  slots: TimeSlot[];
}

// ─── Booking / Session ───────────────────────────────────────────────────────
export type SessionStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Session {
  _id: string;
  mentor: Mentor;
  student: User;
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  topic: string;
  notes?: string;
  meetingLink?: string;
  totalAmount: number;
  isPaid: boolean;
  review?: Review;
  createdAt: string;
}

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  totalMentors: number;
  totalSessions: number;
  totalRevenue: number;
  pendingSessions: number;
  completedSessions: number;
}

// ─── API Response ─────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Query Params ─────────────────────────────────────────────────────────────
export interface MentorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minRate?: number;
  maxRate?: number;
  rating?: number;
  sortBy?: "rating" | "hourlyRate" | "totalSessions";
  sortOrder?: "asc" | "desc";
}

export interface SessionQueryParams {
  page?: number;
  limit?: number;
  status?: SessionStatus;
  role?: "student" | "mentor";
}
