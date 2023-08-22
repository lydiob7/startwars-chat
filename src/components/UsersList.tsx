import { ComponentProps } from "react";
import clsx from "clsx";
import UserButton from "./UserButton";
import { useChatContext } from "../context/useChatProvider";

import "./UsersList.css";

interface UsersListProps extends ComponentProps<"div"> {}

const UsersList = ({ className, ...props }: UsersListProps) => {
    const { authUser, login, users } = useChatContext();

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
