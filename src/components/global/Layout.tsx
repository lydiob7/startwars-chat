import { ComponentProps } from "react";
import clsx from "clsx";
import deathStar from "../../assets/images/death-star.png";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

interface LayoutProps extends ComponentProps<"div"> {}

const Layout = ({ className, ...props }: LayoutProps) => {
    const { authUser, logout } = useAuthContext();

    return (
        <div className={clsx("w-screen h-screen overflow-x-hidden", className)} {...props}>
            <header className="h-20 w-full p-8 bg-gray-800">
                <div className="container mx-auto h-full flex items-center justify-between">
                    <div className="flex gap-8 items-center">
                        <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                            <img src={deathStar} alt="Death Star" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-2xl font-bold">Star Wars Chat</span>
                    </div>

                    {authUser && <button onClick={logout}>Logout</button>}
                </div>
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;
