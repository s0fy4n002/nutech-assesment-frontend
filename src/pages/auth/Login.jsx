import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  return (
    <div>
      <h1 className="mb-10 text-center text-3xl font-bold leading-tight">
        Masuk atau buat akun <br /> untuk memulai
      </h1>

      <form className="space-y-5">
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">@</span>
          <input type="email" placeholder="masukkan email anda" className={`w-full rounded border border-gray-300 py-2.5 pl-10 pr-4  outline-none ${errors.email ? "border-red-600" : ""}`} />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input type={showPass ? "text" : "password"} placeholder="masukkan password anda" className={`w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 outline-none ${errors.password ? "border-red-600" : ""}`} />

          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <button type="submit" className="w-full rounded bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
          Masuk
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        belum punya akun? registrasi <Link to="/auth/register" className="font-bold text-red-600">di sini</Link>
      </p>
    </div>
  );
}