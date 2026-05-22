import React from "react";
import PromoSlider from "@/components/pages/PromoSlider";
import BalanceCard from "@/components/BalanceCard";
import { Link } from "react-router";
import { SERVICES } from "@/lib/utils";

export default function Home() {

  const banners = [
    { id: 1, image: "/assets/Banner 1.png" },
    { id: 2, image: "/assets/Banner 2.png" },
    { id: 3, image: "/assets/Banner 3.png" },
    { id: 4, image: "/assets/Banner 4.png" },
    { id: 5, image: "/assets/Banner 5.png" },
  ];

  const [saldo, setSaldo] = React.useState(100000);

  return (
    <>
      {/* Profile & Balance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="flex items-center gap-4">
          <img
            src="/assets/Profile Photo.png"
            className="w-16 h-16 rounded-full"
            alt="avatar"
          />
          <div>
            <p className="text-gray-500">Selamat datang,</p>
            <h2 className="text-xl font-bold">Kristanto Wibowo</h2>
          </div>
        </div>

        <BalanceCard saldo={saldo} />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 mb-10">
        {SERVICES.map((m) => (
          <Link
            key={m.name}
            to={`/payment?service=${m.id}`}
            className="flex flex-col items-center gap-2 cursor-pointer group"
          >
            <div className="group-hover:bg-gray-100 w-16 h-16 flex items-center justify-center rounded-full transition-colors">
              <img
                src={m.icon}
                alt={m.name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-[10px] text-gray-600">{m.name}</span>
          </Link>
        ))}
      </div>

      {/* Promos */}
      <h3 className="font-bold text-lg mb-4">Temukan promo menarik</h3>
      <PromoSlider banners={banners} />
    </>
  );
}
