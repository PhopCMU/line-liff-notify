import { cookies } from "next/headers";
import { findMockUser, type MockUser } from "./mock-users";

export const SESSION_COOKIE = "mock_user_id";

export async function getCurrentUser(): Promise<MockUser | null> {
  const store = await cookies();
  return findMockUser(store.get(SESSION_COOKIE)?.value);
}
