import { ComponentProps, useEffect } from "react";
import clsx from "clsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import routes from "../../config/routes";

interface AuthPageProps extends ComponentProps<"div"> {}

const AuthPage = ({ className, ...props }: AuthPageProps) => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) navigate(routes.home);
    }, [authUser, navigate]);

    return (
        <div className={clsx("container mx-auto py-8 grid place-items-center gap-12", className)} {...props}>
            <div className="flex flex-col gap-8 w-full max-w-md py-12">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthPage;
