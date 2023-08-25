import { ComponentProps, Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import clsx from "clsx";
import ChatMessages from "./ChatMessages";
import Room from "../types/Room";

interface ChatWindowProps extends ComponentProps<"div"> {
    authUser: string | null;
    handleReactToMessage: (messageId: string, reaction: string) => void;
    handleSendMessage: (roomId: string, body: string) => void;
    rooms: Room[];
    selectedRoom: Room | null;
    setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
}

const ChatWindow = ({
    authUser,
    className,
    handleReactToMessage,
    handleSendMessage,
    selectedRoom,
    setSelectedRoom,
    ...props
}: ChatWindowProps) => {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const roomUser = selectedRoom?.users.find((u) => u.id !== authUser);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        const body = inputRef.current?.value;
        if (!body || !selectedRoom?.id) return;
        handleSendMessage(selectedRoom.id, body);
        inputRef.current.value = "";
    };

    return (
        <div
            className={clsx(
                "absolute bottom-0 right-32 max-h-0 overflow-hidden",
                !selectedRoom ? "" : isMinimized ? "animate-minimize-chat" : "animate-maximize-chat"
            )}
        >
            <div
                className={clsx(
                    "shrink-0 w-80 h-96 shadow-md border-1 border-gray-700 rounded-md flex flex-col justify-between",
                    className
                )}
                {...props}
            >
                <header className="h-12 border-b-1 border-gray-700 flex items-center justify-between gap-4 px-4">
                    <div className="flex items-center gap-2">
                        {roomUser && (
                            <div className="rounded-full overflow-hidden h-8 w-8">
                                <img
                                    className="h-full w-full object-cover"
                                    src={roomUser?.avatar}
                                    alt={roomUser?.username}
                                />
                            </div>
                        )}
                        {roomUser ? roomUser?.username : ""}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="w-4 h-4" onClick={() => setIsMinimized((bool) => !bool)}>
                            {isMinimized ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        className="fill-white"
                                        d="M15.41 302.7l191.1-183.1C212 114.2 218 111.1 224 111.1s11.97 2.219 16.59 6.688l191.1 183.1c9.594 9.152 9.906 24.34 .7187 33.9c-9.125 9.625-24.38 9.938-33.91 .7187L224 169.2l-175.4 168c-9.5 9.219-24.78 8.906-33.91-.7187C5.502 327 5.814 311.8 15.41 302.7z"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        className="fill-white"
                                        d="M432.6 209.3l-191.1 183.1C235.1 397.8 229.1 400 224 400s-11.97-2.219-16.59-6.688L15.41 209.3C5.814 200.2 5.502 184.1 14.69 175.4c9.125-9.625 24.38-9.938 33.91-.7187L224 342.8l175.4-168c9.5-9.219 24.78-8.906 33.91 .7187C442.5 184.1 442.2 200.2 432.6 209.3z"
                                    />
                                </svg>
                            )}
                        </button>
                        <button className="w-3 h-3" onClick={() => setSelectedRoom(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path
                                    className="fill-white"
                                    d="M312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0L160 289.9l-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94L126.1 256L7.027 136.1c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0L160 222.1l119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94L193.9 256L312.1 375z"
                                />
                            </svg>
                        </button>
                    </div>
                </header>

                <ChatMessages
                    authUser={authUser}
                    handleReactToMessage={handleReactToMessage}
                    selectedRoom={selectedRoom}
                />

                <footer className="h-16 border-t-1 border-gray-700">
                    <form
                        className="h-full w-full flex items-center justify-between gap-4 px-4"
                        onSubmit={handleSubmit}
                    >
                        <input
                            className="flex-1 bg-gray-800 border-b-2 border-gray-600 h-8"
                            disabled={!roomUser || !authUser}
                            ref={inputRef}
                        />
                        <button className="w-5 h-5" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path
                                    className="fill-primary"
                                    d="M492.6 226.6L44.6 34.59C40.54 32.85 36.26 31.1 32.02 31.1c-8.623 0-17.1 3.499-23.3 10.05C-.4983 51.81-2.623 66.3 3.377 78.31L96 256l-92.62 177.7c-6 12.02-3.875 26.5 5.344 36.27c6.188 6.547 14.66 10.05 23.28 10.05c4.25 0 8.531-.8438 12.59-2.594L492.6 285.4c11.78-5.031 19.41-16.61 19.41-29.41C511.1 243.2 504.4 231.6 492.6 226.6zM66.92 96.38L383.4 232H137.6L66.92 96.38zM137.6 280h245.7l-316.4 135.6L137.6 280z"
                                />
                            </svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default ChatWindow;
