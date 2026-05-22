export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto"></div>
        <p className="mt-4 text-blue-700 font-semibold animate-pulse">Memuat data...</p>
      </div>
    </div>
  );
};