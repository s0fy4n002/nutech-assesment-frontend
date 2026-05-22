import { useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router";

export default function RootLayout() {
  // Fungsi helper untuk menentukan class berdasarkan status aktif
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-bold" // Warna saat aktif
      : "text-gray-700 hover:text-gray-900"; // Warna saat tidak aktif

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <img src="/logo.png" alt="Logo" className="h-6 w-6" /> SIMS
            PPOB
          </NavLink>

          <div className="flex gap-6 text-sm font-medium">
            <NavLink to="/topup" className={getLinkClass}>
              Top Up
            </NavLink>
            <NavLink to="/transaction" className={getLinkClass}>
              Transaction
            </NavLink>
            <NavLink to="/account" className={getLinkClass}>
              Akun
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-white max-w-6xl mx-auto">
        <main className="px-6 py-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
