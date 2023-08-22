import { ComponentProps } from "react";
import clsx from "clsx";
import { useChatContext } from "../context/useChatProvider";
import { compareDesc } from "date-fns";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps extends ComponentProps<"div"> {}

const ChatMessages = ({ className, ...props }: ChatMessagesProps) => {
    const { selectedRoom } = useChatContext();

    const reversedMessages = selectedRoom?.messages.sort((a, b) =>
        compareDesc(new Date(a.timestamp), new Date(b.timestamp))
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
