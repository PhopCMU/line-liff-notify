"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Liff } from "@line/liff";
import type { LineProfile, LineIdTokenClaims } from "@/types/line";

type LiffContextValue = {
  liff: Liff | null;
  status: "loading" | "ready" | "error";
  error: string | null;
  profile: LineProfile | null;
  claims: LineIdTokenClaims | null;
  isFriend: boolean | null;
  logout: () => void;
};

const LiffContext = createContext<LiffContextValue>({
  liff: null,
  status: "loading",
  error: null,
  profile: null,
  claims: null,
  isFriend: null,
  logout: () => {},
});

export const useLiff = () => useContext(LiffContext);

export function LiffProvider({ children }: { children: React.ReactNode }) {
  const [liff, setLiff] = useState<Liff | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<LineProfile | null>(null);
  const [claims, setClaims] = useState<LineIdTokenClaims | null>(null);
  const [isFriend, setIsFriend] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const boot = async () => {
      try {
        // ⚠️ ต้อง dynamic import เพราะ SDK แตะ window ตั้งแต่ตอน import
        const liffModule = (await import("@line/liff")).default;

        await liffModule.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        if (cancelled) return;
        setLiff(liffModule);

        // ถ้ายังไม่ล็อกอิน (กรณีเปิดในเบราว์เซอร์นอก) → เด้ง login
        if (!liffModule.isLoggedIn()) {
          liffModule.login({ redirectUri: window.location.href });
          return;
        }

        const [p, f] = await Promise.all([
          liffModule.getProfile(),
          liffModule.getFriendship().catch(() => ({ friendFlag: null })),
        ]);

        if (cancelled) return;
        setProfile(p as LineProfile);
        setClaims(liffModule.getDecodedIDToken() as LineIdTokenClaims | null);
        setIsFriend((f as { friendFlag: boolean | null }).friendFlag);
        setStatus("ready");
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
        setStatus("error");
      }
    };

    boot();
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = useCallback(() => {
    liff?.logout();
    window.location.reload();
  }, [liff]);

  return (
    <LiffContext.Provider
      value={{ liff, status, error, profile, claims, isFriend, logout }}
    >
      {children}
    </LiffContext.Provider>
  );
}
