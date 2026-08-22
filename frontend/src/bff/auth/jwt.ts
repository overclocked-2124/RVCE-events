import { SignJWT, jwtVerify } from "jose";
import { SessionUser, SessionTokenPayload } from "./types";

const DEFAULT_SECRET = "rvce-events-development-secret-key-min-32-chars";

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET || (process.env.NODE_ENV !== "production" ? DEFAULT_SECRET : "");
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is required.");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Creates a signed JWT session token for the authenticated user.
 */
export async function createSessionToken(
  user: SessionUser,
  expiresIn: string = "7d"
): Promise<string> {
  const secretKey = getSecretKey();
  return await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

/**
 * Verifies a signed JWT session token and returns the decoded SessionUser.
 * Returns null if the token is invalid or expired.
 */
export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  if (!token) return null;
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify<SessionTokenPayload>(token, secretKey, {
      algorithms: ["HS256"],
    });

    if (payload && payload.user && payload.user.email) {
      return payload.user;
    }
    return null;
  } catch {
    return null;
  }
}
