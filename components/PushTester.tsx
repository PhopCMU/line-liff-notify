"use client";

import { useState } from "react";
import { useLiff } from "./LiffProvider";

export default function PushTester() {
  const { liff, profile } = useLiff();
  const [text, setText] = useState("🔔 ทดสอบแจ้งเตือนส่วนตัว");
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!liff) return;
    setLoading(true);
    setResult(null);

    const idToken = liff.getIDToken();
    if (!idToken) {
      setResult({
        ok: false,
        msg: 'ไม่พบ ID token — ตรวจว่าเลือก scope "openid" แล้วหรือยัง',
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/line/push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, text }),
      });
      const json = await res.json();
      setResult(
        res.ok
          ? { ok: true, msg: `ส่งสำเร็จ → ${json.lineUserId}` }
          : { ok: false, msg: JSON.stringify(json, null, 2) },
      );
    } catch (e) {
      setResult({ ok: false, msg: String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white p-4">
      <p className="mb-2 font-medium">ทดสอบส่งข้อความ</p>
      <p className="mb-3 text-xs text-gray-500">
        ปลายทาง: {profile?.displayName} (ส่วนตัว ไม่ใช่กลุ่ม)
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        className="mb-3 w-full rounded-lg border p-3 text-sm"
      />

      <button
        onClick={send}
        disabled={loading || !text.trim()}
        className="w-full rounded-lg bg-[#06C755] py-3 font-medium text-white disabled:opacity-40"
      >
        {loading ? "กำลังส่ง…" : "ส่งข้อความ"}
      </button>

      {result && (
        <pre
          className={`mt-3 overflow-auto rounded-lg p-3 text-xs ${
            result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"
          }`}
        >
          {result.ok ? "✅ " : "❌ "}
          {result.msg}
        </pre>
      )}
    </div>
  );
}
