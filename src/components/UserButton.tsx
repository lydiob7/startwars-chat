import { ComponentProps } from "react";
import clsx from "clsx";
import User from "../types/User";

interface UserButtonProps extends ComponentProps<"button"> {
    isSelected?: boolean;
    user: User;
    handleSelect: (userId: string) => void;
}

const UserButton = ({ className, handleSelect, isSelected, user, ...props }: UserButtonProps) => {
    return (
        <button
            key={user.id}
            className={clsx(
                "w-full bg-gray-800 hover:bg-gray-700 transition-all text-white rounded-md p-4 flex flex-col gap-4 items-center",
                isSelected ? "outline outline-2 outline-offset-2 outline-primary" : "outline-none",
                className
            )}
            onClick={() => handleSelect(user.id)}
            {...props}
        >
            <div className="rounded-full overflow-hidden h-16 w-16 shrink-0 grow-0">
                <img className="h-full w-full object-cover" src={user.avatar} alt={user.username} />
            </div>
            <p>{user.username}</p>
        </button>
    );
};

export default UserButton;
