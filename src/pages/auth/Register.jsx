import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h1 className="mb-10 text-center text-3xl font-bold leading-tight">
        Lengkapi data untuk <br /> membuat akun
      </h1>

      <form className="space-y-5">
        {/* Email */}
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">@</span>
          <input type="email" placeholder="masukkan email anda" className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" />
        </div>

        {/* Nama Depan */}
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="nama depan" className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" />
        </div>

        {/* Nama Belakang */}
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="nama belakang" className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input type={showPass ? "text" : "password"} placeholder="buat password" className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 focus:border-red-600 outline-none" />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {/* Konfirmasi Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input type={showConfirm ? "text" : "password"} placeholder="konfirmasi password" className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 focus:border-red-600 outline-none" />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400">
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <button type="submit" className="w-full rounded bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
          Registrasi
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        sudah punya akun? login <Link to="/auth/login" className="font-bold text-red-600">di sini</Link>
      </p>
    </div>
  );
}