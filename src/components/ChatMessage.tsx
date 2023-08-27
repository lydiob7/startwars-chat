import { ComponentProps } from "react";
import clsx from "clsx";
import Message from "../types/Message";
import { differenceInHours, formatDistance } from "date-fns";
import Room from "../types/Room";

interface ChatMessageProps extends ComponentProps<"div"> {
    authUser: string | null;
    handleReactToMessage: (messageId: string, reaction: string) => void;
    message: Message;
    messageIndex: number;
    selectedRoom: Room | null;
    wholeArray: Message[];
}

const REACTIONS = ["🙌", "💚", "😂", "😢"];

const ChatMessage = ({
    authUser,
    className,
    handleReactToMessage,
    messageIndex,
    message,
    selectedRoom,
    wholeArray,
    ...props
}: ChatMessageProps) => {
    const isOwnMessage = message.authorId === authUser;
    const author = selectedRoom?.users.find((u) => u.id === message.authorId);
    const currentMessageTimestamp = new Date(message?.timestamp || "0");
    const previousMessageTimestamp = new Date(wholeArray[messageIndex - 1]?.timestamp || "0");
    const isMoreThanOneHour = differenceInHours(previousMessageTimestamp, currentMessageTimestamp) > 1;
    const showMetadata = message?.authorId !== wholeArray[messageIndex - 1]?.authorId || isMoreThanOneHour;

    return (
        <div
            className={clsx(
                "group relative flex flex-col gap-2 max-w-[80%]",
                isOwnMessage ? "self-end items-end" : "self-start items-start",
                className
            )}
            {...props}
        >
            <div
                className={clsx(
                    "hidden group-hover:flex absolute z-20 -top-10 w-min bg-gray-800 rounded-full items-center justify-between px-4 py-2 gap-4",
                    isOwnMessage ? "right-4" : "left-4"
                )}
            >
                {REACTIONS.map((reaction) => (
                    <button
                        className="text-lg"
                        key={reaction}
                        onClick={() => handleReactToMessage(message.id, reaction)}
                    >
                        {reaction}
                    </button>
                ))}
            </div>

            <div
                className={clsx(
                    "rounded-lg p-2",
                    isOwnMessage ? "bg-primary text-black" : "bg-gray-700",
                    message.reactions.length ? "mb-4" : ""
                )}
            >
                {message.body}
                {!!message.reactions.length && (
                    <div
                        className={clsx(
                            "absolute bottom-8 rounded-full bg-slate-800 flex gap-2 px-2 py-1",
                            isOwnMessage ? "left-2" : "right-2"
                        )}
                    >
                        {message.reactions.map((r) => (
                            <span>{r.emoji}</span>
                        ))}
                    </div>
                )}
            </div>

            {showMetadata && (
                <span className={clsx("text-xs italic", isOwnMessage ? "text-right" : "text-left")}>
                    {author?.username}
                    <br />
                    {formatDistance(new Date(message.timestamp), new Date(), {
                        addSuffix: true
                    })}
                </span>
            )}
        </div>
    );
};

export default ChatMessage;
