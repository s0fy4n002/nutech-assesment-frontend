import { useEffect, useState } from "react";
import { CheckCircle, CircleX, CreditCard } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import { Navigate, useSearchParams } from "react-router";
import { useCurrencyInput } from "@/hooks/useCurrencyInput";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/lib/api";
import Loading from "@/components/Loading";
import Profile from "@/components/pages/Profile";
import CustomAlertDialog from "@/components/pages/CustomAlertDialog";
import { formatNumber } from "@/lib/utils";
import { updateAmountPayment } from "@/stores/slices/topupSlice";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const serviceKey = searchParams.get("service");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [loadingTopup, setLoadingTopup] = useState(false);
  const [showModalSuccess, setModalSuccess] = useState(false);
  const [showModalError, setModalError] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const nominalInput = useCurrencyInput("");

  useEffect(() => {
    async function fetchData() {
      try {
        const servicesResponse = await apiClient(
          "/services",
          "GET",
          null,
          token,
        );
        setServices(servicesResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const currentService = services.find((s) => s.service_code === serviceKey);

  useEffect(() => {
    if (currentService?.service_tariff) {
      nominalInput.setValue(currentService.service_tariff.toString());
    }
  }, [currentService]);

  const handlePayment = async () => {
   setLoadingTopup(true);
    try {
      const servicesResponse = await apiClient(
        "/transaction",
        "POST",
        { service_code: currentService.service_code },
        token,
      );

      console.log("Top Up Response:", servicesResponse);

      dispatch(updateAmountPayment(nominalInput.value));
      setModalSuccess(true);
    } catch (error) {
      setModalError(true);
      setErrorMessage(error.message)
      console.error("Topup Error:", error);
    } finally {
      setIsOpen(false);
      setLoadingTopup(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  console.log("Current Service:", currentService);
  if (!currentService) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="space-y-8">
      <Profile />

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
              value={nominalInput.displayValue}
              onChange={(e) => nominalInput.handleChange(e.target.value)}
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 bg-gray-50 focus:outline-none"
            />
          </div>

          <button  onClick={() => setIsOpen(true)} className="w-full rounded-md py-3 font-semibold bg-red-600 text-white hover:bg-red-700 transition-all active:scale-[0.99]">
            Bayar
          </button>
        </div>
      </div>

      <CustomAlertDialog
        isOpen={showModalSuccess}
        onClose={() => setModalSuccess(false)}
      >
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <p className="text-gray-600 my-2">Pembayaran {currentService.service_name} sebesar.</p>
          <h2 className="text-xl font-bold mb-2">Rp. {formatNumber(currentService.service_tariff.toString())}</h2>
          <p className="text-gray-600">Berhasil</p>

          <button
            onClick={() => setModalSuccess(false)}
            className="mt-6 w-full text-red-600 cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </CustomAlertDialog>

      <CustomAlertDialog
        isOpen={showModalError}
        onClose={() => setModalError(false)}
      >
        <div className="text-center">
          <CircleX className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <p className="text-gray-600 my-2">Pembayaran {currentService.service_name} sebesar.</p>
          <h2 className="text-xl font-bold mb-2">Rp. {formatNumber(currentService.service_tariff.toString())}</h2>
          <p className="text-gray-600">gagal</p>

          <button
            onClick={() => setModalError(false)}
            className="mt-6 w-full text-red-600 cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </CustomAlertDialog>

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={() => !loadingTopup && setIsOpen(false)}
      >
        <div className="text-center">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="mx-auto h-10 w-10 mb-4"
          />
          <p className="text-gray-600 mt-2">Beli {currentService.service_name} senilai</p>
          <h2 className="text-2xl font-bold">Rp {formatNumber(currentService.service_tariff.toString())} ?</h2>

          <button
            disabled={loadingTopup}
            onClick={handlePayment}
            className={`mt-6 w-full flex items-center justify-center cursor-pointer ${
              loadingTopup ? "text-gray-400" : "text-red-600"
            }`}
          >
            {loadingTopup ? (
              <>
                <div className="my-spinner"></div>
                <span>Loading...</span>
              </>
            ) : (
              "Ya, lanjutkan Bayar"
            )}
          </button>

          {!loadingTopup && (
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-gray-600 cursor-pointer"
            >
              Batalkan
            </button>
          )}
        </div>
      </CustomAlertDialog>
    </div>
  );
}
