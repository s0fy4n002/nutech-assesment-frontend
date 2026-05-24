import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BalanceSkeleton from "./skeleton/BalanceSkeleton";
import apiClient from "@/lib/api";
import { setAmount, setDisplayBalance } from "@/stores/slices/topupSlice";

export default function BalanceCard() {
  const [loading, setLoading] = useState(true);
  
  const token = useSelector((state) => state.auth.token);
  const balance = useSelector((state) => state.topup.amount);
  const isDisplayBalance = useSelector((state) => state.topup.displayBalance);
  const dispatch = useDispatch();


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await apiClient("/balance", "GET", null, token);
        dispatch(setAmount(response.data.balance));
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

      <div className="relative">
        <p className="mb-2">Saldo anda</p>
        <h1 className="text-3xl font-bold mb-4">
          {isDisplayBalance ? `Rp ${balance.toLocaleString('id-ID')}` : "Rp ••••••••"}
        </h1>
        <p 
          className="text-sm cursor-pointer" 
          onClick={() => dispatch(setDisplayBalance(!isDisplayBalance))}
        >
          {isDisplayBalance ? "Tutup Saldo" : "Lihat Saldo"}
          {isDisplayBalance ? <EyeClosedIcon size={16} className="inline ml-1" /> : <EyeIcon size={16}  className="inline ml-1" />}
        </p>
      </div>
    </div>
  );
}