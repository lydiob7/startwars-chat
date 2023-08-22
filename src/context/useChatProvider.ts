import { useContext } from "react";
import { ChatContext } from "./ChatContextProvider";

export const useChatContext = () => {
    const context = useContext(ChatContext);

    if (!context) throw new Error("useChatContext should be used inside a ChatContextProvider");

    return context;
};
