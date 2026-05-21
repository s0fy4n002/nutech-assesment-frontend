import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* BAGIAN KIRI: Form Area */}
      <div className="flex w-full flex-col justify-center items-center px-8 lg:w-1/2">
        <div className="w-full max-w-md py-10">
          <div className="mb-8 flex items-center justify-center gap-2">
            <img src="/assets/logo.png" alt="Logo" className="h-6 w-6" />{" "}
            <span className="text-xl font-bold">SIMS PPOB</span>
          </div>

          <Outlet />

        </div>
      </div>

      {/* BAGIAN KANAN: Ilustrasi (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-rose-50 items-center justify-center p-12">
        <img
          src="/assets/login-illustration.png"
          alt="Illustration"
          className="max-h-100 object-contain w-full"
        />
      </div>
    </div>
  );
}
