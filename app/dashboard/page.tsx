import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

export default async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const liffUrl = `https://liff.line.me/${process.env.NEXT_PUBLIC_LIFF_ID}`;

  return (
    <main className="mx-auto max-w-md p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">สวัสดี {user.name}</h1>
        <p className="text-sm text-gray-500">
          {user.email} · {user.role}
        </p>
        <p className="mt-1 font-mono text-xs text-gray-400">
          system id: {user.id}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-medium">การแจ้งเตือนผ่าน LINE</p>
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-600">
            ยังไม่ผูก
          </span>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          ผูกบัญชี LINE เพื่อรับแจ้งเตือนส่วนตัว — ระบบจะไม่ส่งเข้ากลุ่ม
        </p>

        <a
          href={liffUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-lg bg-[#06C755] py-3 text-center font-medium text-white"
        >
          ผูกบัญชี LINE
        </a>

        <p className="mt-3 text-center text-xs text-gray-400">
          เปิดในแอป LINE จะได้ประสบการณ์ที่ดีที่สุด
        </p>
      </div>
    </main>
  );
}
