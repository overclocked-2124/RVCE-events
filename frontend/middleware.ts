import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME } from "@/src/bff/auth/session";
import type { SessionTokenPayload } from "@/src/bff/auth/types";

const DEFAULT_SECRET = "rvce-events-development-secret-key-min-32-chars";

async function verifyTokenInMiddleware(token?: string) {
  if (!token) return null;
  try {
    const secret = process.env.AUTH_SECRET || (process.env.NODE_ENV !== "production" ? DEFAULT_SECRET : "");
    if (!secret) {
      console.error("AUTH_SECRET is not configured. Session verification will fail for all users.");
      return null;
    }

    const secretKey = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify<SessionTokenPayload>(token, secretKey, {
      algorithms: ["HS256"],
    });

    return payload.user ?? null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await verifyTokenInMiddleware(token);

  // Attach session user info to request headers for downstream handlers
  const requestHeaders = new Headers(request.headers);
  if (user) {
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email);
    if (user.role) {
      requestHeaders.set("x-user-role", user.role);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes (handled individually)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - static assets: fonts, logos, storybook
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|logos|fonts|storybook).*)",
  ],
};
