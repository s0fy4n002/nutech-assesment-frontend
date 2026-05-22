import { User, AtSign, Pencil } from "lucide-react";
import { useState } from "react";

export default function Account() {
  // State untuk mengontrol apakah mode edit aktif atau tidak
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex flex-col items-center py-10">
      {/* 1. Profile Picture Section */}
      <div className="relative mb-4">
        <div className="h-32 w-32 overflow-hidden rounded-full border border-gray-200">
          <img
            src="/assets/Profile Photo.png" // Ganti ke path image Anda
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Tombol Edit Foto (Kecil di pojok) */}
        <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
          <Pencil className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-10">Kristanto Wibowo</h1>

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
              defaultValue="wallet@nutech.com"
              disabled={!isEditing}
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-red-600 focus:outline-none disabled:bg-white disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Nama Depan */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Nama Depan</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              defaultValue="Kristanto"
              disabled={!isEditing}
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-red-600 focus:outline-none disabled:bg-white disabled:text-gray-500"
            />
          </div>
        </div>

        {/* Nama Belakang */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Nama Belakang</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-4 w-4 text-gray-400" />
            </span>
            <input
              type="text"
              defaultValue="Wibowo"
              disabled={!isEditing}
              className="block w-full rounded-md border border-gray-300 py-3 pl-10 pr-4 text-gray-900 focus:border-red-600 focus:outline-none disabled:bg-white disabled:text-gray-500"
            />
          </div>
        </div>

        {/* 3. Buttons Section */}
        <div className="space-y-4 pt-6">
          {/* Tombol Edit Profil / Simpan */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full rounded-md border border-red-600 bg-red-600 py-3 font-semibold text-white transition-all hover:bg-red-700 active:scale-[0.99]"
          >
            {isEditing ? "Simpan" : "Edit Profil"}
          </button>

          {/* Tombol Logout */}
          <button className="w-full rounded-md border border-red-600 bg-white py-3 font-semibold text-red-600 transition-all hover:bg-red-50 active:scale-[0.99]">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}