import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import apiClient from "@/lib/api";
import { useDispatch } from "react-redux";
import { setToken } from "@/stores/slices/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null); // Reset error saat user mengetik
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient("/login", "POST", {
        email: formData.email,
        password: formData.password
      });

      dispatch(setToken(response.data.token));
      
      navigate("/");
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    }
  };

  return (
    <div>
      <h1 className="mb-10 text-center text-3xl font-bold leading-tight">
        Masuk atau buat akun <br /> untuk memulai
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Message */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">@</span>
          <input 
            name="email"
            type="email" 
            placeholder="masukkan email anda" 
            autoComplete="email" 
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-red-600"
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            name="password"
            type={showPass ? "text" : "password"} 
            autoComplete="current-password" 
            placeholder="masukkan password anda" 
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 outline-none focus:border-red-600"
            onChange={handleChange}
            required
          />
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