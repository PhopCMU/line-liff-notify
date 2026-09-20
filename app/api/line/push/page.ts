import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken, pushTextMessage } from "@/lib/line-server";

export async function POST(req: NextRequest) {
  const { idToken, text } = await req.json();

  if (!idToken)
    return NextResponse.json({ error: "missing idToken" }, { status: 400 });
  if (!text?.trim())
    return NextResponse.json({ error: "missing text" }, { status: 400 });

  // 1) verify → ได้ userId ที่เชื่อถือได้ (ปลอมไม่ได้)
  let lineUserId: string;
  try {
    const claims = await verifyIdToken(idToken);
    lineUserId = claims.sub;
  } catch (e) {
    return NextResponse.json(
      { error: "invalid id token", detail: String(e) },
      { status: 401 },
    );
  }

  // 2) กันพลาด: ต้องเป็น U... เท่านั้น (C = group, R = room)
  if (!lineUserId.startsWith("U")) {
    return NextResponse.json(
      { error: "not a personal userId" },
      { status: 400 },
    );
  }

  // 3) push
  const result = await pushTextMessage(lineUserId, text);

  if (!result.ok) {
    return NextResponse.json(
      { error: "push failed", lineUserId, detail: result.body },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    lineUserId,
    sentAt: new Date().toISOString(),
  });
}
