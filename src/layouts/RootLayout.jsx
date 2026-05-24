import Loading from "@/components/Loading";
import apiClient from "@/lib/api";
import { setProfile } from "@/stores/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet } from "react-router";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch()

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-bold" 
      : "text-gray-700 hover:text-gray-900";

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    async function fetchData() {
      try {
        const profileResponse = await apiClient("/profile", "GET", null, token);
        dispatch(setProfile(profileResponse.data));
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if(isAuthenticated === false){
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center gap-2 font-bold">
            <img src="/logo.png" alt="Logo" className="h-6 w-6" /> SIMS PPOB
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
