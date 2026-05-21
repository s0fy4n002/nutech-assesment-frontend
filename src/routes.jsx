import { createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout.jsx";
import About from "./pages/About.jsx";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import Register from "./pages/auth/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Layout yang punya Navbar/Sidebar
    children: [
      { index: true, element: <App /> },
      { path: "about", element: <About /> }
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
