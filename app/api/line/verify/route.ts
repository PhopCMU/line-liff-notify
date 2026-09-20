import { NextRequest, NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/line-server";

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  if (!idToken) {
    return NextResponse.json({ error: "missing idToken" }, { status: 400 });
  }

  try {
    const claims = await verifyIdToken(idToken);
    return NextResponse.json({
      lineUserId: claims.sub,
      displayName: claims.name,
      pictureUrl: claims.picture,
      email: claims.email,
      raw: claims,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 401 });
  }
}
