import { Navigate, Outlet } from "react-router-dom";
import routes from "../../config/routes";
import { useAuthContext } from "../../context/useAuthContext";

const PrivateRoutes = () => {
    const { session } = useAuthContext();

    return session ? <Outlet /> : <Navigate to={routes.login} />;
};

export default PrivateRoutes;
