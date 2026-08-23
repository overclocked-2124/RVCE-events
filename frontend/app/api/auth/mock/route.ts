import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  validateInstitutionalEmail,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  SessionUser,
} from "@/src/bff/auth";

const MOCK_PROFILES: Record<string, SessionUser> = {
  student: {
    id: "mock-student-101",
    name: "Ananya Sharma",
    email: "ananya.cs23@rvce.edu.in",
    picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces",
    hd: "rvce.edu.in",
    role: "student",
  },
  faculty: {
    id: "mock-faculty-202",
    name: "Dr. K. N. Subramanya",
    email: "principal@rvce.edu.in",
    picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=faces",
    hd: "rvce.edu.in",
    role: "faculty",
  },
  gmail: {
    id: "mock-external-303",
    name: "Test Personal User",
    email: "personal.user@gmail.com",
    hd: "gmail.com",
    role: "external",
  },
};

export async function GET(request: NextRequest) {
  // Mock endpoint is disabled in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.redirect(new URL("/?auth_error=oauth_failed", request.url));
  }

  const profileKey = request.nextUrl.searchParams.get("profile") || "student";
  const mockUser = MOCK_PROFILES[profileKey] || MOCK_PROFILES.student;

  // Run through domain validation assertion
  const validation = validateInstitutionalEmail(mockUser.email, mockUser.hd);
  if (!validation.valid) {
    return NextResponse.redirect(new URL("/?auth_error=unauthorized_domain", request.url));
  }

  // Issue session token and redirect to /
  const token = await createSessionToken(mockUser);
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);

  return response;
}
