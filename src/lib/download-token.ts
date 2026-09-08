import crypto from "crypto";

const TOKEN_SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "fallback-dev-secret";

interface TokenPayload {
  orderId: string;
  expiresAt: number; // Unix timestamp in milliseconds
}

/**
 * Generate a secure, short-lived download token for a given order.
 * Token is HMAC-signed and expires after the specified duration.
 */
export function generateDownloadToken(
  orderId: string,
  expiresInHours: number = 24
): { token: string; expiresAt: Date } {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  const payload: TokenPayload = { orderId, expiresAt };
  const payloadStr = JSON.stringify(payload);
  const payloadBase64 = Buffer.from(payloadStr).toString("base64url");

  const signature = crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  const token = `${payloadBase64}.${signature}`;

  return {
    token,
    expiresAt: new Date(expiresAt),
  };
}

/**
 * Verify and decode a download token.
 * Returns the orderId if valid and not expired, null otherwise.
 */
export function verifyDownloadToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payloadBase64, signature] = parts;

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", TOKEN_SECRET)
      .update(payloadBase64)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    // Decode payload
    const payloadStr = Buffer.from(payloadBase64, "base64url").toString("utf8");
    const payload: TokenPayload = JSON.parse(payloadStr);

    // Check expiration
    if (Date.now() > payload.expiresAt) return null;

    return payload.orderId;
  } catch {
    return null;
  }
}
