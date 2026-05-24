import BalanceCard from "../BalanceCard";
import { useSelector } from "react-redux";

export default function Profile() {
  const profile = useSelector((state) => state.auth.profile);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
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

      <div className="md:col-span-3">
        <BalanceCard />
      </div>
    </div>
  );
}
