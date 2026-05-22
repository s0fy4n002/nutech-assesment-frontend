export default function BalanceSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gray-100 shadow-lg w-full h-[150px] animate-pulse">
      <div className="absolute inset-0 bg-gray-200" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
        
        <div className="h-8 w-48 bg-gray-300 rounded mb-4"></div>
        
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}