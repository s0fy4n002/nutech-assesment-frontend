import apiClient from "@/lib/api";
import BalanceCard from "../BalanceCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileSkeleton } from "../skeleton/ProfileSkeleton";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    async function fetchData() {
      try {
        const profileResponse = await apiClient("/profile", "GET", null, token);
        setProfile(profileResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {loading ? (
        <ProfileSkeleton />
      ) : (
        <div className="md:col-span-2 flex items-center gap-4">
          <img
            src={profile.profile_image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/Profile Photo.png";
            }}
            alt="Avatar"
            className="h-16 w-16 rounded-full border border-gray-200"
          />
          <div>
            <p className="text-gray-500 text-lg">Selamat datang,</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {profile.first_name} {profile.last_name}
            </h2>
          </div>
        </div>
      )}

      <div className="md:col-span-3">
        <BalanceCard />
      </div>
    </div>
  );
}
