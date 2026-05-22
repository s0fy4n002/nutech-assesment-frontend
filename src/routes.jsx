import { createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Register from "./pages/auth/Register.jsx";
import Home from "./pages/Home.jsx";
import TopUp from "./pages/Topup.jsx";
import Payment from "./pages/Payment.jsx";
import Transaction from "./pages/Transaction.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Layout yang punya Navbar/Sidebar
    children: [
      { index: true, element: <Home /> },
      { path: "topup", element: <TopUp /> },
      { path: "payment", element: <Payment /> },
      { path: "transaction", element: <Transaction /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />, // Layout yang punya Navbar/Sidebar
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
