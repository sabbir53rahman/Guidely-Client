import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Protected route groups
const studentRoutes = [
  "/student-dashboard",
  "/book-session",
  "/session-history",
  "/review",
];
const mentorRoutes = [
  "/dashboard/mentor",
  "/mentor-dashboard",
  "/profile",
  "/availability",
  "/manage-sessions",
];
const adminRoutes = [
  "/admin-dashboard",
  "/manage-users",
  "/payments",
];
const authRoutes = ["/login", "/register"];

interface DecodedToken {
  role: string;
  exp: number;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // If visiting auth page while already logged in
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          const role = decoded.role?.toLowerCase() || "";
          if (role === "admin" || role === "super_admin") {
            return NextResponse.redirect(
              new URL("/admin-dashboard", request.url),
            );
          }
          if (role === "mentor") {
            return NextResponse.redirect(
              new URL("/mentor-dashboard", request.url),
            );
          }
          return NextResponse.redirect(
            new URL("/student-dashboard", request.url),
          );
        }
      } catch {
        // Invalid token - continue
      }
    }
    return NextResponse.next();
  }

  // Redirect /dashboard to the appropriate role-based dashboard
  if (pathname === "/dashboard") {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const role = decoded.role?.toLowerCase() || "";
        if (role === "admin" || role === "super_admin") {
          return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
        if (role === "mentor") {
          return NextResponse.redirect(new URL("/mentor-dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/student-dashboard", request.url));
      } catch {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protected routes - check token
  const isProtected = [...studentRoutes, ...mentorRoutes, ...adminRoutes].some(
    (route) => pathname.startsWith(route),
  );

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp * 1000 <= Date.now()) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
      const role = decoded.role?.toLowerCase() || "";
      // Role-based access
      if (
        adminRoutes.some((r) => pathname.startsWith(r)) &&
        role !== "admin" && role !== "super_admin"
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      if (
        mentorRoutes.some((r) => pathname.startsWith(r)) &&
        role !== "mentor" &&
        role !== "admin" && role !== "super_admin"
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/student-dashboard/:path*",
    "/book-session/:path*",
    "/session-history",
    "/review/:path*",
    "/mentor-dashboard/:path*",
    "/profile",
    "/availability",
    "/manage-sessions",
    "/admin-dashboard",
    "/manage-users",
    "/payments",
    "/login",
    "/register",
  ],
};
