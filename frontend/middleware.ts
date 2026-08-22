import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SESSION_COOKIE_NAME, SessionTokenPayload } from "@/src/bff/auth";

const DEFAULT_SECRET = "rvce-events-development-secret-key-min-32-chars";

async function verifyTokenInMiddleware(token?: string) {
  if (!token) return null;
  try {
    const secret = process.env.AUTH_SECRET || (process.env.NODE_ENV !== "production" ? DEFAULT_SECRET : "");
    if (!secret) return null;

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
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = await verifyTokenInMiddleware(token);

  // 1. If accessing protected route /coming-soon and unauthenticated -> redirect to /
  if (pathname.startsWith("/coming-soon")) {
    if (!user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 2. If accessing root landing page / and already authenticated -> redirect to /coming-soon
  if (pathname === "/") {
    if (user) {
      return NextResponse.redirect(new URL("/coming-soon", request.url));
    }
  }

  return NextResponse.next();
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
