import apiClient from "@/lib/api";
import { User, AtSign, Pencil } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Account() {
  const [edited, setIsEdited] = useState(false); // Status foto ada/tidak
  const [isEditing, setIsEditing] = useState(false); // Status tombol Edit/Simpan
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "",
  });

  const fileInputRef = useRef(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const profileResponse = await apiClient("/profile", "GET", null, token);
        const data = profileResponse.data;
        setProfile(data);

        // Cek apakah sudah ada foto
        if (
          data.profile_image &&
          data.profile_image.split("/").pop() !== "null"
        ) {
          setIsEdited(true);
        }
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, navigate]);

  // Handle Upload Image
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi 100KB
    if (file.size > 100 * 1024) {
      alert("Ukuran file terlalu besar! Maksimal 100KB.");
      return;
    }

    // Validasi Tipe
    if (!file.type.startsWith("image/")) {
      alert("Mohon upload file gambar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await apiClient("/profile/image", "PUT", formData, token);
      alert("Foto berhasil diupdate");
      window.location.reload();
    } catch (error) {
      alert("Gagal upload foto");
    }
  };

  // Handle Update Profile Teks
  const handleUpdateProfile = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      await apiClient(
        "/profile/update",
        "PUT",
        {
          first_name: profile.first_name,
          last_name: profile.last_name,
        },
        token,
      );

      setIsEditing(false);
      alert("Profil berhasil diupdate");
    } catch (error) {
      alert("Gagal update profil");
    }
  };

  if (loading)
    return <div className="flex justify-center py-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center py-10">
      {/* 1. Profile Picture Section */}
      <div className="relative mb-4">
        <div className="h-32 w-32 overflow-hidden rounded-full border border-gray-200">
          <img
            src={profile.profile_image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/Profile Photo.png";
            }}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          <Pencil className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        {profile.first_name} {profile.last_name}
      </h1>

      {/* 2. Form Section */}
      <div className="w-full max-w-3xl space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <AtSign className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="email"
              value={profile.email}
              disabled
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-500 bg-gray-50 focus:outline-none"
            />
          </div>
        </div>

        {/* Nama Depan */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Nama Depan
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={profile.first_name}
              disabled={!isEditing}
              onChange={(e) =>
                setProfile({ ...profile, first_name: e.target.value })
              }
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-red-600 focus:outline-none disabled:bg-white"
            />
          </div>
        </div>

        {/* Nama Belakang */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Nama Belakang
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              value={profile.last_name}
              disabled={!isEditing}
              onChange={(e) =>
                setProfile({ ...profile, last_name: e.target.value })
              }
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-red-600 focus:outline-none disabled:bg-white"
            />
          </div>
        </div>

        {/* 3. Buttons Section */}
        <div className="space-y-4 pt-6">
          <button
            onClick={handleUpdateProfile}
            className="w-full rounded-md border border-red-600 bg-red-600 py-3 font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.99]"
          >
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>

          <button className="w-full rounded-md border border-red-600 bg-white py-3 font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-[0.99]">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
