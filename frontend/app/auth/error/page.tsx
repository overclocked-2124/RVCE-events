import { AuthErrorCard, type AuthErrorReason } from "@/src/components/auth/auth-error-card";

type AuthErrorPageProps = {
  searchParams?: Promise<{
    reason?: string | string[];
  }>;
};
    
const VALID_REASONS: AuthErrorReason[] = [
  "unauthorized_domain",
  "invalid_state",
  "access_denied",
  "missing_config",
];

export default async function AuthErrorPage({
  searchParams,
}: AuthErrorPageProps) {
  const params = await searchParams;
  const reasonValue = Array.isArray(params?.reason)
    ? params.reason[0]
    : params?.reason;
  const reason = VALID_REASONS.includes(reasonValue as AuthErrorReason)
    ? (reasonValue as AuthErrorReason)
    : undefined;

  return <AuthErrorCard reason={reason} />;
}
