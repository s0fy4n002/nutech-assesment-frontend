import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BalanceSkeleton from "./skeleton/BalanceSkeleton";

export default function BalanceCard() {
  const [showSaldo, setShowSaldo] = useState(false);
  const [saldo, setSaldo] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient("/balance", "GET", null, token);
        setSaldo(response.data.saldo);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    }
    setTimeout(() => {
      fetchData();
    }, 1700);
  }, [token]);

  console.log('saldo: ',saldo);

  if(loading){
    return <BalanceSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg w-full">
      <img 
        src="/assets/Background Saldo.png" // Pastikan path gambar Anda benar
        alt="Background" 
        className="absolute inset-0 h-full w-full object-cover " // opacity-20 agar teks tetap terbaca
      />

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