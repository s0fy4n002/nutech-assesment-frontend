import BalanceCard from "@/components/BalanceCard";

export default function Transaction() {
  // Contoh data transaksi
  const transactions = [
    { id: 1, type: "TOPUP", amount: 10000, date: "17 Agustus 2023", time: "13:10 WIB", description: "Top Up Saldo" },
    { id: 2, type: "PAYMENT", amount: 40000, date: "17 Agustus 2023", time: "12:10 WIB", description: "Pulsa Prabayar" },
    { id: 3, type: "PAYMENT", amount: 10000, date: "17 Agustus 2023", time: "11:10 WIB", description: "Listrik Pascabayar" },
  ];

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
            <h2 className="text-3xl font-bold text-gray-900">Kristanto Wibowo</h2>
          </div>
        </div>
        <div className="md:col-span-3">
          <BalanceCard saldo={0} />
        </div>
      </div>

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