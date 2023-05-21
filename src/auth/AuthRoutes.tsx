import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";

export function AuthRoutes() {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
}
