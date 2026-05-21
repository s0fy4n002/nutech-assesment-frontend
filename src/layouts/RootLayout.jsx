import { Link, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <nav className="sticky top-0 left-0 right-0 bg-white z-10 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to={"/"} className="flex items-center gap-2 font-bold">
            <img src="/assets/logo.png" alt="Logo" className="h-6 w-6" /> SIMS PPOB
          </Link>
          <div className="flex gap-6 text-sm font-medium text-gray-700">
            <Link to="/topup">Top Up</Link>
            <Link to="/transaction">Transaction</Link>
            <Link to="/akun">Akun</Link>
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