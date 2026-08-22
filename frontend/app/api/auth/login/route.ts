import { NextRequest, NextResponse } from "next/server";
import { OAUTH_STATE_COOKIE_NAME, OAUTH_STATE_COOKIE_OPTIONS, INSTITUTIONAL_DOMAIN } from "@/src/bff/auth";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  if (!clientId) {
    console.error("Missing GOOGLE_CLIENT_ID in environment variables");
    return NextResponse.redirect(new URL("/auth/error?reason=missing_config", request.url));
  }

  const redirectUri = `${appUrl}/api/auth/callback/google`;
  const state = crypto.randomUUID();

  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("hd", INSTITUTIONAL_DOMAIN);
  googleAuthUrl.searchParams.set("prompt", "select_account");
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("access_type", "online");

  const response = NextResponse.redirect(googleAuthUrl.toString());

  // Store CSRF state token in HttpOnly cookie
  response.cookies.set(OAUTH_STATE_COOKIE_NAME, state, OAUTH_STATE_COOKIE_OPTIONS);

  return response;
}
