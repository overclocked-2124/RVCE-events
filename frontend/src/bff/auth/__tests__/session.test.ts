import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateInstitutionalEmail } from "../session";
import { createSessionToken, verifySessionToken } from "../jwt";
import { SessionUser } from "../types";

describe("Institutional Email & Domain Validation", () => {
  it("should approve valid @rvce.edu.in institutional email with matching hd", () => {
    const result = validateInstitutionalEmail("student.cs22@rvce.edu.in", "rvce.edu.in");
    assert.equal(result.valid, true);
  });

  it("should handle case-insensitive email and hd", () => {
    const result = validateInstitutionalEmail("STUDENT.EC23@RVCE.EDU.IN", "RVCE.EDU.IN");
    assert.equal(result.valid, true);
  });

  it("should reject personal @gmail.com email even if hd is provided incorrectly", () => {
    const result = validateInstitutionalEmail("john.doe@gmail.com", "rvce.edu.in");
    assert.equal(result.valid, false);
    assert.equal(result.reason, "unauthorized_domain");
  });

  it("should reject @rvce.edu.in email if hd is not rvce.edu.in", () => {
    const result = validateInstitutionalEmail("student@rvce.edu.in", "gmail.com");
    assert.equal(result.valid, false);
    assert.equal(result.reason, "unauthorized_domain");
  });

  it("should reject non-RVCE domains", () => {
    const result = validateInstitutionalEmail("user@pes.edu", "pes.edu");
    assert.equal(result.valid, false);
    assert.equal(result.reason, "unauthorized_domain");
  });

  it("should reject empty or null inputs", () => {
    assert.equal(validateInstitutionalEmail(null, null).valid, false);
    assert.equal(validateInstitutionalEmail("", "").valid, false);
  });
});

describe("JWT Session Token Lifecycle", () => {
  const mockUser: SessionUser = {
    id: "google-sub-12345",
    email: "ananya.cs23@rvce.edu.in",
    name: "Ananya Sharma",
    picture: "https://lh3.googleusercontent.com/a/mock-pic",
    hd: "rvce.edu.in",
    role: "student",
  };

  it("should create and verify a valid JWT session token", async () => {
    const token = await createSessionToken(mockUser);
    assert.ok(token);
    assert.equal(typeof token, "string");

    const decoded = await verifySessionToken(token);
    assert.ok(decoded);
    assert.equal(decoded.id, mockUser.id);
    assert.equal(decoded.email, mockUser.email);
    assert.equal(decoded.name, mockUser.name);
    assert.equal(decoded.hd, "rvce.edu.in");
  });

  it("should return null for tampered or invalid tokens", async () => {
    const validToken = await createSessionToken(mockUser);
    const tamperedToken = validToken.slice(0, -5) + "abcde";

    const result = await verifySessionToken(tamperedToken);
    assert.equal(result, null);
  });

  it("should return null for empty or malformed token", async () => {
    assert.equal(await verifySessionToken(""), null);
    assert.equal(await verifySessionToken("invalid.token.payload"), null);
  });
});
