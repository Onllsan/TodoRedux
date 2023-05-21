import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/storeHook";

export function AuthRoutes() {
  const { user, initializing } = useAppSelector((state) => state.auth);
  if (initializing) {
    return null;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
}
