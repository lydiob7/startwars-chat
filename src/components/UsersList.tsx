import { ComponentProps, useEffect } from "react";
import clsx from "clsx";
import UserButton from "./UserButton";
import { useChatContext } from "../context/useChatContext";

import "./UsersList.css";
import { useNavigate } from "react-router-dom";
import routes from "../config/routes";
import { useAuthContext } from "../context/useAuthContext";

interface UsersListProps extends ComponentProps<"div"> {}

const UsersList = ({ className, ...props }: UsersListProps) => {
    const { authUser, login } = useAuthContext();
    const { users } = useChatContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) navigate(routes.home);
    }, [authUser, navigate]);

    return (
        <div className="w-full">
            <p className="text-xl font-semibold w-full py-8">Login as:</p>
            <div className={clsx("grid justify-center users-list-grid gap-4 w-full", className)} {...props}>
                {users.map((user) => (
                    <UserButton
                        key={user.id}
                        isSelected={authUser?.id === user.id}
                        user={user}
                        handleSelect={() => login({ email: "", password: "" })}
                    />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
