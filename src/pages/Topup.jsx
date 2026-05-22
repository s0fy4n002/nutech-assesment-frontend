import { useState } from "react";
import { CheckCircle, CreditCard } from "lucide-react";
import CustomAlertDialog from "@/components/pages/CustomAlertDialog";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import Profile from "@/components/pages/Profile";
import { useSelector } from "react-redux";
import apiClient from "@/lib/api";

export default function TopUp() {
  const [isOpen, setIsOpen] = useState(false);
  const nominalInput = useCurrencyInput("");
  const [loadingTopup, setLoadingTopup] = useState(false);
  const [showModalSuccess, setModalSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleTopUp = async () => {
    setLoadingTopup(true);
    try {
      const servicesResponse = await apiClient(
        "/topup",
        "POST",
        { top_up_amount: nominalInput.value },
        token,
      );
      console.log("Top Up Response:", servicesResponse);
      setIsOpen(false);
      setModalSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTopup(false);
    }
  };

  // Daftar nominal cepat (quick pick)
  const quickAmounts = [
    { label: "Rp10.000", value: 10000 },
    { label: "Rp20.000", value: 20000 },
    { label: "Rp50.000", value: 50000 },
    { label: "Rp100.000", value: 100000 },
    { label: "Rp250.000", value: 250000 },
    { label: "Rp500.000", value: 500000 },
  ];

  return (
    <div className="space-y-8">
      <Profile />

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
                type="text"
                placeholder="masukan nominal Top Up"
                value={nominalInput.displayValue}
                onChange={(e) => nominalInput.handleChange(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <button
              onClick={() => setIsOpen(true)}
              disabled={
                !nominalInput.value ||
                nominalInput.value < 10000 ||
                nominalInput.value > 1000000
              }
              className={`w-full rounded-md py-3 font-semibold transition-all ${
                nominalInput.value >= 10000 && nominalInput.value <= 1000000
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
                onClick={() => nominalInput.handleChange(item.value.toString())}
                className="flex items-center justify-center rounded-md border border-gray-300 py-3 px-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-600 hover:text-red-600 active:bg-red-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={showModalSuccess}
        onClose={() => setModalSuccess(false)}
      >
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <p className="text-gray-600 mt-2">Top Up sebesar.</p>
          <h2 className="text-xl font-bold">Rp {nominalInput.displayValue}</h2>
          <p>Berhasil</p>

          <button
            onClick={() => setModalSuccess(false)}
            className="mt-6 w-full text-gray-600 cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </CustomAlertDialog>

      <CustomAlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-center">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="mx-auto h-10 w-10 mb-4"
          />
          <p className="text-gray-600 mt-2">Anda yakin untuk Topup sebesar</p>
          <h2 className="text-2xl font-bold">
            Rp {nominalInput.displayValue} ?
          </h2>

          <button
            disabled={loadingTopup}
            onClick={handleTopUp}
            className={`mt-6 w-full ${loadingTopup ? "text-gray-600":"text-red-600"} cursor-pointer`}
          >
            {loadingTopup
              ? (<><div className="my-spinner"></div> <span>Loading...</span></>)
              : "Ya, lanjutkan Top Up"}
          </button>

          <button
            disabled={loadingTopup}
            onClick={() => setIsOpen(false)}
            className={`mt-6 w-full text-gray-600 cursor-pointer`}
          >
            Batalkan
          </button>
        </div>
      </CustomAlertDialog>
    </div>
  );
}
