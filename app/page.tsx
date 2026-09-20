import Link from "next/link";
import { MOCK_USERS } from "@/lib/mock-users";

export default function Home() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-1 text-2xl font-bold">เลือกผู้ใช้ (จำลอง)</h1>
      <p className="mb-6 text-sm text-gray-500">
        สมมติว่านี่คือหน้า login ของระบบเรา — ยังไม่เกี่ยวกับ LINE
      </p>

      <div className="space-y-2">
        {MOCK_USERS.map((u) => (
          <Link
            key={u.id}
            href={`/api/mock-login?userId=${u.id}`}
            className="flex items-center justify-between rounded-xl border bg-teal-50 p-4 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-black">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-blue-500">
              {u.role}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
