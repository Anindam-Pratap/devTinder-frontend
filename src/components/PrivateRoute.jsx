import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector((store) => store.user);

  if (user) {
    return <Outlet />;
  }
<Navigate to="/login" replace />;
 
};

export default PrivateRoute;