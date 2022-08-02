import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  return !isLoading && isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
