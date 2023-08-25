import { ComponentProps, useMemo } from "react";
import clsx from "clsx";
import User from "../types/User";

interface AuthUserCardProps extends ComponentProps<"div"> {
    authUser: string | null;
    users: User[];
}

const AuthUserCard = ({ authUser, className, users, ...props }: AuthUserCardProps) => {
    const user = useMemo(() => users.find((u) => u.id === authUser), [authUser, users]);

    if (!user) return null;

    return (
        <div className={clsx("max-w-[500px] bg-gray-800 p-8 flex gap-12", className)} {...props}>
            <div className="rounded-lg overflow-hidden h-24 w-20 shrink-0">
                <img className="h-full w-full object-cover" src={user?.avatar} alt="" />
            </div>
            <div className="grid">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Id:</span>
                    <span className="block max-w-[280px] whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {user?.id}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Username:</span>
                    <span>{user?.username}</span>
                </div>
            </div>
        </div>
    );
};

export default AuthUserCard;
