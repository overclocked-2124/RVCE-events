import { cookies } from "next/headers";
import { createSessionToken, verifySessionToken } from "./jwt";
import { AuthErrorReason, SessionUser } from "./types";

export const INSTITUTIONAL_DOMAIN = "rvce.edu.in";
export const SESSION_COOKIE_NAME = "rvce_session";
export const OAUTH_STATE_COOKIE_NAME = "rvce_oauth_state";

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

export const OAUTH_STATE_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 10 * 60, // 10 minutes in seconds
};

/**
 * Validates that an email and hosted domain strictly belong to RVCE (@rvce.edu.in).
 */
export function validateInstitutionalEmail(
  email?: string | null,
  hd?: string | null
): { valid: boolean; reason?: AuthErrorReason } {
  if (!email) {
    return { valid: false, reason: "unauthorized_domain" };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedHd = hd ? hd.trim().toLowerCase() : "";

  const endsWithDomain = normalizedEmail.endsWith(`@${INSTITUTIONAL_DOMAIN}`);
  const hasMatchingHd = normalizedHd === INSTITUTIONAL_DOMAIN;

  if (endsWithDomain && hasMatchingHd) {
    return { valid: true };
  }

  return { valid: false, reason: "unauthorized_domain" };
}

/**
 * Retrieves the current session user on the server (Server Components / Route Handlers).
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;

    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

/**
 * Sets the session cookie on the server.
 */
export async function createSession(user: SessionUser): Promise<string> {
  const token = await createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return token;
}

/**
 * Clears the session cookie on the server.
 */
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
