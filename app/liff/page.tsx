"use client";

import { useLiff } from "@/components/LiffProvider";
import ProfileCard from "@/components/ProfileCard";
import DataTable from "@/components/DataTable";
import PushTester from "@/components/PushTester";

export default function LiffPage() {
  const { liff, status, error, profile, claims, isFriend, logout } = useLiff();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-gray-500">กำลังเชื่อมต่อ LINE…</p>
      </main>
    );
  }

  if (status === "error" || !profile) {
    return (
      <main className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="mb-2 font-medium text-red-800">เชื่อมต่อไม่สำเร็จ</p>
          <pre className="overflow-auto text-xs text-red-700">{error}</pre>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md space-y-4 bg-gray-50 p-4 pb-10">
      <h1 className="text-xl font-bold">ข้อมูล LINE ที่ดึงมาได้</h1>

      <ProfileCard profile={profile} />

      {isFriend === false && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          ⚠️ คุณยังไม่ได้เพิ่ม Official Account เป็นเพื่อน —
          จะส่งข้อความหาไม่ได้
        </div>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">
          ค่าที่จะใช้เก็บ
        </h2>
        <DataTable
          rows={[
            { label: "userId ⭐", value: profile.userId, highlight: true },
            { label: "displayName", value: profile.displayName },
            { label: "pictureUrl", value: profile.pictureUrl },
            { label: "statusMessage", value: profile.statusMessage },
            { label: "email (จาก ID token)", value: claims?.email },
          ]}
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-gray-700">
          ข้อมูลสภาพแวดล้อม
        </h2>
        <DataTable
          rows={[
            {
              label: "เป็นเพื่อนกับ OA",
              value:
                isFriend === null
                  ? "ตรวจไม่ได้"
                  : isFriend
                    ? "✅ ใช่"
                    : "❌ ไม่",
            },
            {
              label: "เปิดในแอป LINE",
              value: liff?.isInClient() ? "✅ ใช่" : "เบราว์เซอร์นอก",
            },
            { label: "ล็อกอินแล้ว", value: liff?.isLoggedIn() ? "✅" : "❌" },
            { label: "OS", value: liff?.getOS() },
            { label: "LINE version", value: liff?.getLineVersion() ?? "-" },
            { label: "LIFF SDK version", value: liff?.getVersion() },
            { label: "ภาษา", value: liff?.getLanguage() },
          ]}
        />
      </section>

      <details className="rounded-xl border bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium">
          ดู Raw JSON ทั้งหมด
        </summary>
        <pre className="mt-3 overflow-auto rounded-lg bg-gray-900 p-3 text-[10px] leading-relaxed text-green-400">
          {JSON.stringify(
            { profile, idTokenClaims: claims, isFriend },
            null,
            2,
          )}
        </pre>
      </details>

      <PushTester />

      <div className="flex gap-2">
        <button
          onClick={logout}
          className="flex-1 rounded-lg border bg-white py-3 text-sm"
        >
          ออกจากระบบ LINE
        </button>
        {liff?.isInClient() && (
          <button
            onClick={() => liff.closeWindow()}
            className="flex-1 rounded-lg border bg-white py-3 text-sm"
          >
            ปิดหน้าต่าง
          </button>
        )}
      </div>
    </main>
  );
}
