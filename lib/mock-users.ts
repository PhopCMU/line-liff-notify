export type MockUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  lineUserId: string | null; // เฟสนี้ null เสมอ (ยังไม่เก็บ DB)
};

export const MOCK_USERS: MockUser[] = [
  {
    id: "u001",
    name: "สมชาย ใจดี",
    email: "somchai@test.com",
    role: "Admin",
    lineUserId: null,
  },
  {
    id: "u002",
    name: "สมหญิง รักงาน",
    email: "somying@test.com",
    role: "Staff",
    lineUserId: null,
  },
  {
    id: "u003",
    name: "มานี มีนา",
    email: "manee@test.com",
    role: "Viewer",
    lineUserId: null,
  },
];

export function findMockUser(id: string | undefined): MockUser | null {
  if (!id) return null;
  return MOCK_USERS.find((u) => u.id === id) ?? null;
}
