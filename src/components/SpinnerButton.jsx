export default function SpinnerButton() {
  return (
    <div className="flex items-center gap-2">
      {/* Spinner menggunakan div dengan border */}
      <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      Memproses...
    </div>
  );
}
