import { ComponentProps, useMemo } from "react";
import clsx from "clsx";
import { useChatContext } from "../context/useChatContext";
import { useAuthContext } from "../context/useAuthContext";
import { IMG_URL_FALLBACK } from "../const";

interface AuthUserCardProps extends ComponentProps<"div"> {}

const AuthUserCard = ({ className, ...props }: AuthUserCardProps) => {
    const { authUser } = useAuthContext();
    const { users } = useChatContext();

    const user = useMemo(() => users.find((u) => u.id === authUser?.id), [authUser, users]);

    if (!user) return null;

    return (
        <div className={clsx("max-w-[500px] bg-gray-800 p-8 flex gap-12", className)} {...props}>
            <div className="rounded-lg overflow-hidden h-24 w-20 shrink-0">
                <img className="h-full w-full object-cover" src={user?.avatar || IMG_URL_FALLBACK} alt="" />
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
                <div className="flex items-center gap-2">
                    <span className="font-semibold">Name:</span>
                    <span>{user.name ?? ""}</span>
                </div>
            </div>
        </div>
    );
};

export default AuthUserCard;
