export interface SessionUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  hd: string;
  role?: string;
}

export type AuthErrorReason =
  | "unauthorized_domain"
  | "access_denied"
  | "invalid_state"
  | "oauth_failed"
  | "missing_config";

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  id_token: string;
  refresh_token?: string;
}

export interface GoogleUserPayload {
  sub: string;
  email: string;
  email_verified?: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  hd?: string;
  [key: string]: unknown;
}

export interface SessionTokenPayload {
  user: SessionUser;
  iat?: number;
  exp?: number;
}
