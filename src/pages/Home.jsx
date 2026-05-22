import React, { useEffect, useState } from "react";
import PromoSlider from "@/components/pages/PromoSlider";
import { Link, Navigate } from "react-router";
import apiClient from "@/lib/api";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";
import Profile from "@/components/pages/Profile";

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = useSelector((state) => state.auth.token);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          servicesResponse,
          bannerResponse,
        ] = await Promise.all([
          apiClient("/services", "GET", null, token),
          apiClient("/banner", "GET", null, token),
        ]);
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
      <Profile />

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

      <h3 className="font-bold text-lg mb-4">Temukan promo menarik</h3>
      <PromoSlider banners={banners} />
    </>
  );
}
