import type { LineProfile } from "@/types/line";

export default function ProfileCard({ profile }: { profile: LineProfile }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
      {profile.pictureUrl ? (
        <img
          src={profile.pictureUrl}
          alt=""
          className="h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <div className="h-16 w-16 rounded-full bg-gray-200" />
      )}
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold">{profile.displayName}</p>
        <p className="truncate text-sm text-gray-500">
          {profile.statusMessage || "— ไม่มีสเตตัส —"}
        </p>
      </div>
    </div>
  );
}
