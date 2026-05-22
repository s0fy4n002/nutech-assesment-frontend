import React, { useEffect, useState } from "react";
import PromoSlider from "@/components/pages/PromoSlider";
import BalanceCard from "@/components/BalanceCard";
import { Link } from "react-router";
import apiClient from "@/lib/api";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const token = localStorage.getItem("token");
  const [saldo, setSaldo] = React.useState(0);

  const [profile, setProfile] = React.useState({
    email: "",
    first_name: "Kristanto",
    last_name: "Wibowo",
    profile_image: "/assets/Profile Photo.png",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          profileResponse,
          balanceResponse,
          servicesResponse,
          bannerResponse,
        ] = await Promise.all([
          apiClient("/profile", "GET", null, token),
          apiClient("/balance", "GET", null, token),
          apiClient("/services", "GET", null, token),
          apiClient("/banner", "GET", null, token),
        ]);

        setProfile(profileResponse.data);
        setSaldo(balanceResponse.data.saldo);
        setServices(servicesResponse.data);
        setBanners(bannerResponse.data);
      } catch (error) {
        console.error(error);
      }finally{
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* Profile & Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="flex items-center gap-4">
          <img
            src={profile.profile_image}
            onError={(e) => {
              e.target.onerror = null; // Mencegah loop jika default image juga error
              e.target.src = "/assets/Profile Photo.png"; // Ganti dengan path ikon default Anda
            }}
            className="w-16 h-16 rounded-full"
            alt="avatar"
          />
          <div>
            <p className="text-gray-500">Selamat datang,</p>
            <h2 className="text-xl font-bold">
              {profile.first_name} {profile.last_name}
            </h2>
          </div>
        </div>

        <BalanceCard saldo={saldo} />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 mb-10">
        {services.map((m) => (
          <Link
            key={m.service_code}
            to={`/payment?service=${m.service_code}`}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="group-hover:bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full transition-colors">
              <img
                src={m.service_icon}
                alt={m.service_name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-[10px] text-gray-600 text-center">
              {m.service_name}
            </span>
          </Link>
        ))}
      </div>

      {/* Promos */}
      <h3 className="font-bold text-lg mb-4">Temukan promo menarik</h3>
      <PromoSlider banners={banners} />
    </>
  );
}
