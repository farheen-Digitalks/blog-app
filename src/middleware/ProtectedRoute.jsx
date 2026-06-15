import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Error parsing user data", error);
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Currently we just return Outlet. If you want to check user.isAdmin:
  if (user && !user.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}