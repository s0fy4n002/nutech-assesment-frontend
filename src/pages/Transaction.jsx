import Profile from "@/components/pages/Profile";
import apiClient from "@/lib/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Transaction() {
  // Contoh data transaksi
  const transactions = [
    { id: 1, type: "TOPUP", amount: 10000, date: "17 Agustus 2023", time: "13:10 WIB", description: "Top Up Saldo" },
    { id: 2, type: "PAYMENT", amount: 40000, date: "17 Agustus 2023", time: "12:10 WIB", description: "Pulsa Prabayar" },
    { id: 3, type: "PAYMENT", amount: 10000, date: "17 Agustus 2023", time: "11:10 WIB", description: "Listrik Pascabayar" },
  ];

  const token = useSelector((state) => state.auth.token);
  const [saldo, setSaldo] = useState(0);
  const [profile, setProfile] = useState({
      email: "",
      first_name: "Kristanto",
      last_name: "Wibowo",
      profile_image: "/assets/Profile Photo.png",
    });


  useEffect(() => {
      async function fetchData() {
        try {
          const profileResponse= await  apiClient("/profile", "GET", null, token);

          setProfile(profileResponse.data);        
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);


  return (
    <div className="space-y-8">
      <Profile profile={profile} saldo={saldo} />

      {/* 2. Daftar Transaksi */}
      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Semua Transaksi</h3>
        
        <div className="space-y-4">
          {transactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-5 border rounded-lg border-gray-200">
              <div>
                <h4 className={`text-2xl font-semibold ${t.type === "TOPUP" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "TOPUP" ? "+" : "-"} Rp{t.amount.toLocaleString('id-ID')}
                </h4>
                <p className="text-sm text-gray-400 mt-1">{t.date} {t.time}</p>
              </div>
              <p className="text-sm font-medium text-gray-600">{t.description}</p>
            </div>
          ))}
        </div>

        {/* 3. Tombol Show More */}
        <div className="mt-8 text-center">
          <button className="text-red-600 font-semibold hover:underline">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
}