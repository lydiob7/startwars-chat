import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useLayoutEffect, useState } from "react";
import { messagesService, roomsService, usersService } from "../@fake-db";
import Room from "../types/Room";
import User from "../types/User";

export interface ChatContextProps {
    authUser: string | null;
    handleCreateNewConversation: (userId?: string | null) => void;
    handleReactToMessage: (messageId: string, reaction: string) => void;
    handleSendMessage: (roomId: string, body: string) => void;
    login: (userId: string) => void;
    logout: () => void;
    rooms: Room[];
    selectedRoom: Room | null;
    setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
    users: User[];
}

export const ChatContext = createContext<ChatContextProps | null>(null);

const ChatContextProvider = ({ children, ...props }: { children: ReactNode }) => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [authUser, setAuthUser] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const login = useCallback(async (userId: string) => {
        setAuthUser(userId);
        const roomsFromDb = await roomsService.getRoomByUserId(userId);
        setRooms(roomsFromDb);
    }, []);

    const logout = () => {
        setAuthUser(null);
        setSelectedRoom(null);
        setRooms([]);
    };

    const getUsers = useCallback(async () => {
        if (users.length) return;
        const usersFromDb = await usersService.getAll(undefined, 1, 15);
        setUsers(usersFromDb.documents);
    }, [users.length]);

    useLayoutEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleCreateNewConversation = async (userId?: string | null) => {
        if (!authUser || !userId) return;
        const newRoom = {
            id: crypto.randomUUID(),
            users: [users.find((u) => u.id === authUser)!, users.find((u) => u.id === userId)!],
            messages: []
        };
        await roomsService.create(newRoom);
        setRooms((prevState) => [...prevState, newRoom]);
        setSelectedRoom(newRoom);
    };

    const handleSendMessage = async (roomId: string, body: string) => {
        if (!authUser || !roomId || !rooms?.length) return;
        const roomToUpdate = rooms.find((room) => room.id === roomId);
        if (!roomToUpdate) return;
        const newMessage = {
            id: crypto.randomUUID(),
            body,
            authorId: authUser,
            reactions: [],
            comments: [],
            timestamp: new Date().toISOString()
        };
        await messagesService.create(newMessage);
        const updatedRoom = await roomsService.update(roomToUpdate.id, {
            messages: [...roomToUpdate.messages, newMessage]
        });
        setSelectedRoom(updatedRoom);
        const roomsFromDb = await roomsService.getRoomByUserId(authUser);
        setRooms(roomsFromDb);
    };

    const handleReactToMessage = async (messageId: string, reaction: string) => {
        if (!authUser || !selectedRoom) return;
        const messageToUpdate = await messagesService.getById(messageId);
        if (!messageToUpdate) return;
        const updatedMessage = await messagesService.update(messageId, {
            reactions: [...messageToUpdate.reactions, { authorId: authUser, emoji: reaction }]
        });
        const updatedRoom = await roomsService.update(selectedRoom.id, {
            messages: selectedRoom.messages.map((msg) => (msg.id === messageId ? updatedMessage : msg))
        });
        setSelectedRoom(updatedRoom);
    };

    const value = {
        authUser,
        handleCreateNewConversation,
        handleReactToMessage,
        handleSendMessage,
        login,
        logout,
        rooms,
        selectedRoom,
        setSelectedRoom,
        users
    };

    return (
        <ChatContext.Provider {...props} value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
