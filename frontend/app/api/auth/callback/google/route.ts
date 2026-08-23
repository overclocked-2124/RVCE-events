import { NextRequest, NextResponse } from "next/server";
import {
  OAUTH_STATE_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  createSessionToken,
  validateInstitutionalEmail,
  GoogleTokenResponse,
  GoogleUserPayload,
  SessionUser,
  INSTITUTIONAL_DOMAIN,
} from "@/src/bff/auth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  // 1. Check for OAuth errors from Google
  if (error) {
    console.error("Google OAuth returned error:", error);
    const reason = error === "access_denied" ? "access_denied" : "oauth_failed";
    return NextResponse.redirect(new URL(`/?auth_error=${reason}`, request.url));
  }

  // 2. Validate CSRF state parameter
  const savedState = request.cookies.get(OAUTH_STATE_COOKIE_NAME)?.value;
  if (!state || !savedState || state !== savedState) {
    console.error("OAuth state mismatch or missing CSRF token");
    return NextResponse.redirect(new URL("/?auth_error=invalid_state", request.url));
  }

  if (!code) {
    console.error("Missing authorization code in Google callback");
    return NextResponse.redirect(new URL("/?auth_error=oauth_failed", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in environment");
    return NextResponse.redirect(new URL("/?auth_error=missing_config", request.url));
  }

  const redirectUri = `${appUrl}/api/auth/callback/google`;

  try {
    // 3. Exchange authorization code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorBody = await tokenResponse.text();
      console.error("Failed to exchange code for token:", errorBody);
      return NextResponse.redirect(new URL("/?auth_error=oauth_failed", request.url));
    }

    const tokens: GoogleTokenResponse = await tokenResponse.json();

    // 4. Retrieve verified user info using the access token
    const userInfoResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      console.error("Failed to fetch Google userinfo");
      return NextResponse.redirect(new URL("/?auth_error=oauth_failed", request.url));
    }

    const userInfo: GoogleUserPayload = await userInfoResponse.json();

    // 5. Assert email is verified by Google (OpenID Connect requirement)
    if (!userInfo.email_verified) {
      console.warn(`Rejected unverified email: ${userInfo.email}`);
      const response = NextResponse.redirect(
        new URL("/?auth_error=unauthorized_domain", request.url)
      );
      response.cookies.delete(OAUTH_STATE_COOKIE_NAME);
      return response;
    }

    // 6. Strict Institutional Email & Domain Verification (P0)
    const validation = validateInstitutionalEmail(userInfo.email, userInfo.hd);
    if (!validation.valid) {
      console.warn(`Access denied for non-RVCE email: ${userInfo.email}, hd: ${userInfo.hd}`);
      const response = NextResponse.redirect(
        new URL("/?auth_error=unauthorized_domain", request.url)
      );
      // Clean up OAuth state cookie
      response.cookies.delete(OAUTH_STATE_COOKIE_NAME);
      return response;
    }

    // 7. Create session user and JWT
    const sessionUser: SessionUser = {
      id: userInfo.sub,
      email: userInfo.email.toLowerCase(),
      name: userInfo.name || userInfo.email.split("@")[0],
      picture: userInfo.picture,
      hd: userInfo.hd || INSTITUTIONAL_DOMAIN,
      role: "student",
    };

    const sessionToken = await createSessionToken(sessionUser);

    // 8. Set session cookie and redirect to /
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set(SESSION_COOKIE_NAME, sessionToken, SESSION_COOKIE_OPTIONS);
    response.cookies.delete(OAUTH_STATE_COOKIE_NAME);

    return response;
  } catch (err) {
    console.error("Unexpected error during Google OAuth callback:", err);
    return NextResponse.redirect(new URL("/?auth_error=oauth_failed", request.url));
  }
}
