export default function CustomAlertDialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    // Kita tambahkan onClick={onClose} pada overlay
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose} 
    >
      {/* Kita tambahkan e.stopPropagation() pada container dialog 
        agar saat kita mengklik isi dialog (konten), dialog tidak ikut tertutup.
      */}
      <div 
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
}