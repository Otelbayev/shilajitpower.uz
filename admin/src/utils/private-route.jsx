import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Loader from "../components/loader";

const PrivateRoute = () => {
  const { auth } = useAuth();

  if (auth.isLoading) return <Loader />;

  return auth.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
