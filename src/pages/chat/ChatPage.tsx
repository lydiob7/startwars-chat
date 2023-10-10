import { ComponentProps } from "react";
import clsx from "clsx";
import AuthUserCard from "../../components/AuthUserCard";
import ChatWindow from "../../components/ChatWindow";
import UserRoomsList from "../../components/UserRoomsList";

interface ChatPageProps extends ComponentProps<"div"> {}

const ChatPage = ({ className, ...props }: ChatPageProps) => {
    return (
        <div className={clsx("container mx-auto py-8 grid place-items-center gap-12", className)} {...props}>
            <AuthUserCard />
            <div className="flex items-stretch justify-between gap-20 w-full">
                <div className="flex-1 w-1/2">
                    <UserRoomsList />
                </div>
                <div className="flex-1 w-1/2 flex justify-center">
                    <ChatWindow />
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
