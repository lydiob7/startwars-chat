import { ComponentProps } from "react";
import clsx from "clsx";
import { useChatContext } from "../context/useChatContext";
import { compareDesc } from "date-fns";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps extends ComponentProps<"div"> {}

const ChatMessages = ({ className, ...props }: ChatMessagesProps) => {
    const { currentRoom } = useChatContext();

    const reversedMessages = currentRoom?.messages?.sort((a, b) =>
        compareDesc(new Date(a.created_at), new Date(b.created_at))
    );

    return (
        <div className={clsx("flex-1 overflow-y-scroll p-2 flex flex-col-reverse gap-2", className)} {...props}>
            {reversedMessages
                ? reversedMessages.map((message, index, wholeArray) => (
                      <ChatMessage key={message.id} message={message} messageIndex={index} wholeArray={wholeArray} />
                  ))
                : ""}
        </div>
    );
};

export default ChatMessages;
