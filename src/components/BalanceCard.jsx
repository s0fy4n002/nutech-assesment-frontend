import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BalanceSkeleton from "./skeleton/BalanceSkeleton";
import apiClient from "@/lib/api";

export default function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient("/balance", "GET", null, token);
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [token]);

  if(loading){
    return <BalanceSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg w-full">
      <img 
        src="/assets/Background Saldo.png"
        alt="Background" 
        className="absolute inset-0 h-full w-full object-cover "
      />

      <div className="relative z-10">
        <p className="mb-2">Saldo anda</p>
        <h1 className="text-3xl font-bold mb-4">
          {showBalance ? `Rp ${balance.toLocaleString('id-ID')}` : "Rp ••••••••"}
        </h1>
        <p 
          className="text-sm cursor-pointer" 
          onClick={() => setShowBalance(!showBalance)}
        >
          {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
          {showBalance ? <EyeClosedIcon size={16} className="inline ml-1" /> : <EyeIcon size={16}  className="inline ml-1" />}
        </p>
      </div>
    </div>
  );
}