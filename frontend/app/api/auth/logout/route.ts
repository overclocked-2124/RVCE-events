import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/src/bff/auth/session";

export async function POST(request: NextRequest) {
  const isJson = request.headers.get("accept")?.includes("application/json");

  if (isJson) {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" });
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
