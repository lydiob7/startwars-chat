import { ComponentProps } from "react";
import clsx from "clsx";
import { compareDesc } from "date-fns";
import ChatMessage from "./ChatMessage";
import Room from "../types/Room";

interface ChatMessagesProps extends ComponentProps<"div"> {
    authUser: string | null;
    handleReactToMessage: (messageId: string, reaction: string) => void;
    selectedRoom: Room | null;
}

const ChatMessages = ({ authUser, className, handleReactToMessage, selectedRoom, ...props }: ChatMessagesProps) => {
    const reversedMessages = selectedRoom?.messages.sort((a, b) =>
        compareDesc(new Date(a.timestamp), new Date(b.timestamp))
    );

    return (
        <div className={clsx("flex-1 overflow-y-scroll p-2 flex flex-col-reverse gap-2", className)} {...props}>
            {reversedMessages
                ? reversedMessages.map((message, index, wholeArray) => (
                      <ChatMessage
                          authUser={authUser}
                          key={message.id}
                          handleReactToMessage={handleReactToMessage}
                          message={message}
                          messageIndex={index}
                          selectedRoom={selectedRoom}
                          wholeArray={wholeArray}
                      />
                  ))
                : ""}
        </div>
    );
};

export default ChatMessages;
