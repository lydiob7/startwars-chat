import { ConsumerProps } from "react";
import { ChatContext, ChatContextProps } from "./ChatContextProvider";

const ChatContextConsumer = ({ children, ...props }: ConsumerProps<ChatContextProps>) => {
    return (
        <ChatContext.Consumer {...props}>
            {(context) => (context ? children(context) : "Consumer must be used inside a Provider")}
        </ChatContext.Consumer>
    );
};

export default ChatContextConsumer;
