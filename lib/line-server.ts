import type { LineIdTokenClaims } from "@/types/line";

const VERIFY_URL = "https://api.line.me/oauth2/v2.1/verify";
const PUSH_URL = "https://api.line.me/v2/bot/message/push";

/**
 * verify ID token กับ LINE Platform
 * คืน claims ที่เชื่อถือได้ (sub = userId ตัวจริง)
 */
export async function verifyIdToken(
  idToken: string,
): Promise<LineIdTokenClaims> {
  const res = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      id_token: idToken,
      client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
    }),
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`verify failed: ${data.error_description ?? data.error}`);
  }
  return data as LineIdTokenClaims;
}

/** ส่งข้อความหา userId คนเดียว (ไม่ใช่กลุ่ม) */
export async function pushTextMessage(to: string, text: string) {
  const res = await fetch(PUSH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_MESSAGING_ACCESS_TOKEN}`,
      "X-Line-Retry-Key": crypto.randomUUID(), // กันส่งซ้ำ
    },
    body: JSON.stringify({ to, messages: [{ type: "text", text }] }),
  });

  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}
