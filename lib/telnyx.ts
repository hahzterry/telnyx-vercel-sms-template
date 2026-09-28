/**
 * Minimal Telnyx helpers for this template: send an SMS, and verify the
 * Ed25519 signature Telnyx puts on every webhook. No SDK needed.
 */
import crypto from "node:crypto";

const API = "https://api.telnyx.com/v2";

export async function sendSms(to: string, text: string) {
  const res = await fetch(`${API}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.TELNYX_PHONE_NUMBER,
      to,
      text,
      messaging_profile_id: process.env.TELNYX_MESSAGING_PROFILE_ID,
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`Telnyx ${res.status}: ${JSON.stringify(json)}`);
  return json.data as { id: string; to: { status: string }[] };
}

// SubjectPublicKeyInfo header for a raw Ed25519 key (RFC 8410).
const SPKI_PREFIX = Buffer.from("302a300506032b6570032100", "hex");

/**
 * Verify `telnyx-signature-ed25519` over `${telnyx-timestamp}|${rawBody}`.
 * Fails closed: no configured public key, no headers, a stale timestamp
 * (> 5 minutes) or a bad signature all return false.
 */
export function verifyTelnyxSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
  publicKeyB64 = process.env.TELNYX_PUBLIC_KEY,
): boolean {
  if (!publicKeyB64 || !signature || !timestamp) return false;
  if (!/^\d+$/.test(timestamp)) return false;
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
  try {
    const raw = Buffer.from(publicKeyB64, "base64");
    const sig = Buffer.from(signature, "base64");
    if (raw.length !== 32 || sig.length !== 64) return false;
    const key = crypto.createPublicKey({
      key: Buffer.concat([SPKI_PREFIX, raw]),
      format: "der",
      type: "spki",
    });
    return crypto.verify(null, Buffer.from(`${timestamp}|${rawBody}`), key, sig);
  } catch {
    return false;
  }
}
