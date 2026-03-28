// ─── User & Auth ─────────────────────────────────────────────────────────────
export type UserRole = "student" | "mentor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string | UserRole;
  avatar?: string | null;
  image?: string | null;
  profilePhoto?: string | null;
  isVerified?: boolean;
  status?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Mentor ───────────────────────────────────────────────────────────────────
export interface Review {
  _id: string;
  student: Pick<User, "id" | "name" | "avatar">;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Mentor {
  id: string;
  userId: string;
  user: User;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  address?: string | null;
  registrationNumber?: string | null;
  experience: number;
  hourlyRate: number;
  bio?: string | null;
  expertise?: string | null;
  averageRating: number;
  isAvailable: boolean;
  isDeleted: boolean;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

// ─── Availability ─────────────────────────────────────────────────────────────
export interface TimeSlot {
  id?: string;
  _id?: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface Schedule {
  id: string;
  _id?: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  slots?: TimeSlot[];
  mentorId?: string;
  mentor?: Mentor;
}

export interface AvailabilityDay {
  date: string;
  slots: TimeSlot[];
}

// ─── Booking / Session ───────────────────────────────────────────────────────
export type SessionStatus =
  | "PENDING"
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED";
export type PaymentStatus = "PAID" | "UNPAID";


export interface Session {
  id: string;
  _id?: string;
  mentorId: string;
  studentId: string;
  mentor: Mentor;
  student: User;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  meetingLink?: string;
  payment?: {
    id: string;
    amount: number;
    transactionId: string;
    status: PaymentStatus;
  };
  totalAmount?: number; // Keep for compatibility
  isPaid?: boolean; // Keep for compatibility
  review?: Review;
  createdAt: string;
  updatedAt: string;
}


export type IBooking = Session;

// ─── Admin ────────────────────────────────────────────────────────────────────
export interface IAdminStats {
  totalUsers: number;
  totalMentors: number;
  totalStudents: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings: IBooking[];
}

export interface IMentorStats {
  totalBookings: number;
  totalReviews: number;
  totalEarnings: number;
  averageRating: number;
  upcomingBookings: IBooking[];
}

export interface IStudentStats {
  totalBookings: number;
  totalReviews: number;
  totalSpent: number;
  upcomingBookings: IBooking[];
}

export type IOverviewStats = IAdminStats | IMentorStats | IStudentStats;

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
