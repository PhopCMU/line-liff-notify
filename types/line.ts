/** ผลจาก liff.getProfile() */
export type LineProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

/** payload ของ ID token (liff.getDecodedIDToken()) */
export type LineIdTokenClaims = {
  iss: string;
  sub: string; // ⭐ = userId
  aud: string;
  exp: number;
  iat: number;
  name?: string;
  picture?: string;
  email?: string;
};

/** ผลรวมที่ส่งกลับจาก /api/line/verify */
export type VerifiedLineUser = {
  lineUserId: string;
  displayName?: string;
  pictureUrl?: string;
  email?: string;
  verifiedAt: string;
};
