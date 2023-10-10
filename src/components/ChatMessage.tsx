import { ComponentProps, FC } from "react";
import clsx from "clsx";
import Message from "../types/Message";
import { differenceInHours, formatDistance } from "date-fns";
import { useChatContext } from "../context/useChatContext";
import { colorsArray, darkenHexColor, lightenHexColor } from "../utils";
import { useAuthContext } from "../context/useAuthContext";

interface ChatMessageProps extends ComponentProps<"div"> {
    message: Message;
    messageIndex: number;
    wholeArray: Message[];
}

const REACTIONS = ["🙌", "💚", "😂", "😢"];

const Tick: FC<{ delivered: boolean; readByAll: boolean }> = ({ delivered, readByAll }) => (
    <span
        className={clsx(
            "block h-3 w-2 border-b-2 border-r-2 rotate-[35deg] translate-y-[-2px] relative",
            delivered
                ? "after:content-[''] after:absolute after:-right-[6px] after:bottom-0 after:h-[120%] after:w-1 after:border-r-2"
                : "",
            readByAll ? "border-primary after:border-primary" : "border-gray-500 after:border-gray-500"
        )}
    />
);

const ChatMessage: FC<ChatMessageProps> = ({ className, messageIndex, message, wholeArray, ...props }) => {
    const { authUser } = useAuthContext();
    const { handleReactToMessage, currentRoom } = useChatContext();

    const isOwnMessage = message.user_id === authUser?.id;
    const author = currentRoom?.users.find((u) => u.id === message.user_id);
    const authorNameColor = colorsArray[currentRoom?.users.findIndex((u) => u.id === message.user_id) || 0];
    const showUsername = (currentRoom?.users?.length || 0) > 2;

    const currentMessageTimestamp = new Date(message?.timestamp || "0");
    const previousMessageTimestamp = new Date(wholeArray[messageIndex - 1]?.timestamp || "0");
    const isMoreThanOneHour = differenceInHours(previousMessageTimestamp, currentMessageTimestamp) > 1;
    const showMetadata = message?.user_id !== wholeArray[messageIndex - 1]?.user_id || isMoreThanOneHour;

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
                    "rounded-lg px-2 pb-2 pt-1",
                    isOwnMessage ? "bg-primary text-black" : "bg-gray-700",
                    message.reactions?.length ? "mb-2" : ""
                )}
            >
                {showUsername && (
                    <>
                        <span
                            className={clsx("font-bold text-xs")}
                            style={{
                                color: isOwnMessage ? darkenHexColor(authorNameColor) : lightenHexColor(authorNameColor)
                            }}
                        >
                            {author?.username}
                        </span>
                        <br />
                    </>
                )}
                {message.body}
                {!!message.reactions?.length && (
                    <div
                        className={clsx(
                            "absolute bottom-1 rounded-full bg-slate-800 flex gap-2 px-2 py-1",
                            isOwnMessage ? "left-2" : "right-2"
                        )}
                    >
                        {message.reactions?.map((r) => (
                            <span>{r.emoji}</span>
                        ))}
                    </div>
                )}
            </div>

            {showMetadata && (
                <div className="flex gap-2 items-center px-2">
                    <span className={clsx("text-xs italic", isOwnMessage ? "text-right" : "text-left")}>
                        {formatDistance(new Date(message.created_at), new Date(), {
                            addSuffix: true
                        })}
                    </span>

                    {isOwnMessage && <Tick delivered readByAll={message.read} />}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
