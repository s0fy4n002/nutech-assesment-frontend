import { useState } from "react";
import { CreditCard } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";

export default function TopUp() {
  // State untuk menampung nominal input
  const [nominal, setNominal] = useState("");

  // Daftar nominal cepat (quick pick)
  const quickAmounts = [
    { label: "Rp10.000", value: 10000 },
    { label: "Rp20.000", value: 20000 },
    { label: "Rp50.000", value: 50000 },
    { label: "Rp100.000", value: 100000 },
    { label: "Rp250.000", value: 250000 },
    { label: "Rp500.000", value: 500000 },
  ];

  // Fungsi untuk menangani klik nominal cepat
  const handleQuickAmount = (value) => {
    setNominal(value);
  };

  return (
    <div className="space-y-8">
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

      {/* 3. Top Up Section */}
      <div className="pt-4">
        <p className="text-gray-600 text-lg">Silahkan masukan</p>
        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          Nominal Top Up
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Kiri: Input & Submit */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="number"
                placeholder="masukan nominal Top Up"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <button
              disabled={!nominal || nominal < 10000 || nominal > 1000000}
              className={`w-full rounded-md py-3 font-semibold transition-all ${
                nominal >= 10000 && nominal <= 1000000
                  ? "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Top Up
            </button>
          </div>

          {/* Kolom Kanan: Pilihan Nominal Cepat */}
          <div className="grid grid-cols-3 gap-3">
            {quickAmounts.map((item) => (
              <button
                key={item.value}
                onClick={() => handleQuickAmount(item.value)}
                className="flex items-center justify-center rounded-md border border-gray-300 py-3 px-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-600 hover:text-red-600 active:bg-red-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
