import { ComponentProps } from "react";
import clsx from "clsx";
import UserButton from "./UserButton";

import "./UsersList.css";
import User from "../types/User";

interface UsersListProps extends ComponentProps<"div"> {
    authUser: string | null;
    login: (userId: string) => void;
    users: User[];
}

const UsersList = ({ className, authUser, login, users, ...props }: UsersListProps) => {
    return (
        <div className="w-full">
            <p className="text-xl font-semibold w-full py-8">Login as:</p>
            <div className={clsx("grid justify-center users-list-grid gap-4 w-full", className)} {...props}>
                {users.map((user) => (
                    <UserButton key={user.id} isSelected={authUser === user.id} user={user} handleSelect={login} />
                ))}
            </div>
        </div>
    );
};

export default UsersList;
