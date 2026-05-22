export function ProfileSkeleton() {
  return (
    <div className="md:col-span-2 flex items-center gap-4 animate-pulse">
      <div className="h-16 w-16 rounded-full bg-gray-200" />
      <div>
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-40 bg-gray-300 rounded" />
      </div>
    </div>
  );
}