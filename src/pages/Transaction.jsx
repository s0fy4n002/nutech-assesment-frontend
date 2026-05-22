import Profile from "@/components/pages/Profile";
import apiClient from "@/lib/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router";

export default function Transaction() {
  const [searchParams, setSearchParams] = useSearchParams();

  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "5");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const transactionResponse = await apiClient(
          `/transaction/history?offset=${offset}&limit=${limit}`,
          "GET",
          null,
          token,
        );

        // Jika offset 0, ganti data. Jika lebih, tambahkan ke daftar yang ada
        setTransactions((prev) =>
          offset === 0
            ? transactionResponse.data.records
            : [...prev, ...transactionResponse.data.records],
        );
        console.log("Fetched transactions:", transactionResponse.data.records);
        setHasMore(
          transactionResponse.data.records.length === 0 ? false : true,
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [offset, limit, token]); // Efek dipicu saat offset atau limit berubah

  useEffect(() => {
    if (!searchParams.has("offset") || !searchParams.has("limit")) {
      setSearchParams({ offset, limit }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleShowMore = () => {
    if (hasMore) {
      const nextOffset = offset + limit;
      setSearchParams({ offset: nextOffset, limit });
    }
  };


  return (
    <div className="space-y-8">
      <Profile />

      <div className="pt-4">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Semua Transaksi
        </h3>

        <div className="space-y-4">
          {transactions.map((t) => (
            <div
              key={t.invoice_number}
              className="flex items-center justify-between p-5 border rounded-lg border-gray-200"
            >
              <div>
                <h4
                  className={`text-2xl font-semibold ${t.transaction_type === "TOPUP" ? "text-green-500" : "text-red-500"}`}
                >
                  {t.transaction_type === "TOPUP" ? "+" : "-"} Rp
                  {t.total_amount.toLocaleString("id-ID")}
                </h4>
                <p className="text-sm text-gray-400 mt-1">{t.created_on}</p>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {t.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          {hasMore && (
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="text-red-600 font-semibold hover:underline disabled:text-gray-400"
            >
              {loading ? "Loading..." : "Show more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
