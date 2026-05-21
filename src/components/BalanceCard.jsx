import { Eye, EyeClosed, EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export default function BalanceCard({ saldo }) {
  const [showSaldo, setShowSaldo] = useState(false);

  return (
    // Tambahkan 'relative overflow-hidden' agar gambar tidak keluar dari kotak
    <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg w-full">
      
      {/* Gambar Background */}
      <img 
        src="/assets/Background Saldo.png" // Pastikan path gambar Anda benar
        alt="Background" 
        className="absolute inset-0 h-full w-full object-cover " // opacity-20 agar teks tetap terbaca
      />

      {/* Konten tetap di atas gambar */}
      <div className="relative z-10">
        <p className="mb-2">Saldo anda</p>
        <h1 className="text-3xl font-bold mb-4">
          {showSaldo ? `Rp ${saldo.toLocaleString('id-ID')}` : "Rp ••••••••"}
        </h1>
        <p 
          className="text-sm cursor-pointer" 
          onClick={() => setShowSaldo(!showSaldo)}
        >
          {showSaldo ? "Tutup Saldo" : "Lihat Saldo"}
          {showSaldo ? <EyeClosedIcon size={16} className="inline ml-1" /> : <EyeIcon size={16}  className="inline ml-1" />}
        </p>
      </div>
    </div>
  );
}