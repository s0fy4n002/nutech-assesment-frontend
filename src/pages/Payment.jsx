import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import { Navigate, useSearchParams } from "react-router";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { useSelector } from "react-redux";
import apiClient from "@/lib/api";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const serviceKey = searchParams.get("service");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const nominalInput = useCurrencyInput("");

  useEffect(() => {
      async function fetchData() {
        try {
          const servicesResponse = await apiClient("/services", "GET", null, token);
          setServices(servicesResponse.data);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);

  const currentService = services.find((s) => s.service_code === serviceKey);

  useEffect(() => {
    if (currentService?.service_tariff) {
      nominalInput.setValue(
        currentService.service_tariff.toString()
      );
    }
  }, [currentService]);

  if (loading) {
    return <div>Loading...</div>;
  }


  if (!currentService) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="space-y-8">
      {/* 1. Header & Balance */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 flex items-center gap-4">
          <img
            src="/assets/Profile Photo.png"
            alt="Avatar"
            className="h-16 w-16 rounded-full border border-gray-200"
          />
          <div>
            <p className="text-gray-500 text-lg">Selamat datang,</p>
            <h2 className="text-3xl font-bold text-gray-900">
              Kristanto Wibowo
            </h2>
          </div>
        </div>

        <div className="md:col-span-3">
          <BalanceCard saldo={0} />
        </div>
      </div>

      {/* 2. Pembayaran Section */}
      <div className="pt-4">
        <p className="text-gray-600 text-lg">Pembayaran</p>

        {/* Detail Layanan (Sesuai gambar) */}
        <div className="flex items-center gap-3 mt-1 mb-6">
          <img
            src={currentService.service_icon}
            alt={currentService.service_name}
            className="w-8 h-8 object-contain"
          />
          <h3 className="text-2xl font-bold text-gray-900">
            {currentService.service_name}
          </h3>
        </div>

        {/* Input & Bayar */}
        <div className="max-w-full space-y-6">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Masukkan nominal"
              value={nominalInput.displayValue} // Gunakan displayValue untuk tampilan
              onChange={(e) => nominalInput.handleChange(e.target.value)} // Gunakan handler dari hook
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 bg-gray-50 focus:outline-none"
            />
          </div>

          <button className="w-full rounded-md py-3 font-semibold bg-red-600 text-white hover:bg-red-700 transition-all active:scale-[0.99]">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
