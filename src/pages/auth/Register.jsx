import { Lock, User, Eye, EyeOff, CheckCircle, CircleX } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router"; // Pastikan import dari react-router-dom
import apiClient from "@/lib/api";
import CustomAlertDialog from "@/components/pages/CustomAlertDialog";

export default function Register() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({ email: "", first_name: "", last_name: "", password: "", confirm_password: "" });
  
  // State untuk data form
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(prev => ({ ...prev, [e.target.name]: "" })); // Reset error saat user mengetik
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Password
    if (formData.password !== formData.confirm_password) {
      setErrors(prev => ({ ...prev, confirm_password: "Password tidak cocok" }));
      return;
    }

    //min password 8 karakter
    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: "Password harus minimal 8 karakter" }));
      return;
    }
    

    try {
      // Memanggil apiClient dengan method POST
      const response = await apiClient("/registration", "POST", {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/auth/login");
    } catch (error) {
      setError(error.message || "Registrasi gagal, coba lagi.");
    }
  };

  return (
    <div>
      <h1 className="mb-10 text-center text-3xl font-bold leading-tight">
        Lengkapi data untuk <br /> membuat akun
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <span className="absolute left-3 top-3 text-gray-400">@</span>
          <input 
            name="email" type="email" placeholder="masukkan email anda" autoComplete="email"
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" 
            onChange={handleChange} required 
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            name="first_name" type="text" placeholder="nama depan" 
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" 
            onChange={handleChange} required 
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            name="last_name" type="text" placeholder="nama belakang" 
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-4 focus:border-red-600 outline-none" 
            onChange={handleChange} required 
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            name="password" type={showPass ? "text" : "password"} placeholder="buat password" autoComplete="new-password"
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 focus:border-red-600 outline-none" 
            onChange={handleChange} required 
          />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 text-gray-400">
            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>

          {errors.password && <p className="mt-2 text-sm text-end text-red-600">{errors.password}</p>}

        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input 
            name="confirm_password" type={showConfirm ? "text" : "password"} placeholder="konfirmasi password" autoComplete="new-password"
            className="w-full rounded border border-gray-300 py-2.5 pl-10 pr-10 focus:border-red-600 outline-none" 
            onChange={handleChange} required 
          />
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-400">
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>

          {errors.confirm_password && <p className="mt-2 text-sm text-end text-red-600">{errors.confirm_password}</p>}
        </div>

        <button type="submit" className="w-full rounded bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
          Registrasi
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        sudah punya akun? login <Link to="/auth/login" className="font-bold text-red-600">di sini</Link>
      </p>

      <CustomAlertDialog isOpen={!!error} onClose={() => setError(null)}>
        <div className="text-center">
          <CircleX className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold">Error</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-6 bg-red-600 text-white p-2 rounded-lg"
          >
            Kembali
          </button>
        </div>
      </CustomAlertDialog>
    </div>
  );
}