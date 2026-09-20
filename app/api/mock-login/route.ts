import { NextRequest, NextResponse } from "next/server";
import { findMockUser } from "@/lib/mock-users";
import { SESSION_COOKIE } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = findMockUser(
    req.nextUrl.searchParams.get("userId") ?? undefined,
  );
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });
  return res;
}
