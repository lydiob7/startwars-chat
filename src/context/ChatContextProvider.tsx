import { ReactNode, createContext, useCallback, useEffect, useLayoutEffect, useState } from "react";
import supabase from "../services/supabase";
import Room from "../types/Room";
import { useAuthContext } from "./useAuthContext";
import User from "../types/User";

export interface ChatContextProps {
    currentRoom: Room | null;
    error: string | null;
    handleCreateNewConversation: (userId?: string | null) => void;
    handleReactToMessage: (messageId: string, reaction: string) => void;
    handleSelectRoom: (roomId: string) => void;
    handleSendMessage: (roomId: string, body: string) => void;
    rooms: Room[];
    users: User[];
}

export const ChatContext = createContext<ChatContextProps | null>(null);

const ChatContextProvider = ({ children, ...props }: { children: ReactNode }) => {
    const { authUser } = useAuthContext();
    const [error, setError] = useState<string | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

    useLayoutEffect(() => {
        const getUsers = async () => {
            if (users.length) return;

            const { data } = await supabase.from("users").select("username,name,id,avatar");

            setUsers(data || []);
        };

        getUsers();
    }, [users.length]);

    const handleGetUserRooms = useCallback(async (userId: string) => {
        const { data: userRooms, error: userRoomsError } = await supabase
            .from("room_users")
            .select("room_id")
            .eq("user_id", userId);

        if (userRoomsError) return setError(userRoomsError.message);

        const roomIds = userRooms.map((userRoom) => userRoom.room_id);

        const { data: rooms, error } = await supabase.from("rooms").select("*, users(*)").in("id", roomIds);

        if (error) return setError(error.message);

        setRooms(rooms);
    }, []);

    useEffect(() => {
        if (authUser?.id) handleGetUserRooms(authUser?.id);
    }, [authUser?.id, handleGetUserRooms]);

    const handleCreateNewConversation = async (userId?: string | null) => {
        if (!authUser || !userId) return;

        const { data: newRooms, error } = await supabase
            .from("rooms")
            .insert([
                {
                    name: `${users.find((u) => u.id === authUser?.id)?.username}-${
                        users.find((u) => u.id === userId)?.username
                    }`
                }
            ])
            .select();

        if (!error) {
            const { error: errorRoomUsers } = await supabase.from("room_users").insert([
                { room_id: newRooms[0].id, user_id: authUser.id },
                { room_id: newRooms[0].id, user_id: userId }
            ]);
            if (!errorRoomUsers) {
                await handleGetUserRooms(authUser.id);
            }
        } else return setError(error.message);
    };

    const handleSelectRoom = useCallback(async (roomId: string) => {
        if (roomId === null) return setCurrentRoom(null);
        const { data: newRooms, error } = await supabase
            .from("rooms")
            .select(
                `
                *,
                users(*),
                messages(
                    *,
                    reactions(*),
                    comments:message_comments!message_comments_comment_id_fkey(*)
                )
            `
            )
            .eq("id", roomId);

        if (error) return setError(error.message);
        if (newRooms?.[0]) setCurrentRoom(newRooms[0]);
    }, []);

    const handleSendMessage = async (roomId: string, body: string) => {
        if (!authUser || !roomId || !rooms?.length) return;
        const { data: newMessages, error } = await supabase
            .from("messages")
            .insert([
                {
                    body,
                    user_id: authUser.id,
                    room_id: roomId
                }
            ])
            .select();

        if (error) return setError(error.message);
        setCurrentRoom((room) =>
            room
                ? {
                      ...room,
                      messages: room.messages ? [...room.messages, newMessages?.[0]] : [newMessages?.[0]]
                  }
                : null
        );
    };

    const handleReactToMessage = async (messageId: string, reaction: string) => {
        if (!authUser || !currentRoom) return;
        const { data: newReactions, error } = await supabase
            .from("reactions")
            .insert([
                {
                    emoji: reaction,
                    user_id: authUser.id
                }
            ])
            .select();

        if (error) return setError(error.message);

        const { error: messageReactionsEerror } = await supabase
            .from("message_reactions")
            .insert([{ message_id: messageId, reaction_id: newReactions?.[0]?.id }])
            .select();

        if (messageReactionsEerror) return setError(messageReactionsEerror.message);
        setCurrentRoom((prevState) => {
            if (!prevState) return null;
            const newMessages = prevState.messages?.map((message) => {
                if (message.id === messageId)
                    return {
                        ...message,
                        reactions: [...message.reactions, newReactions?.[0]]
                    };
                else return message;
            });
            return {
                ...prevState,
                messages: newMessages
            };
        });
    };

    const value = {
        error,
        handleCreateNewConversation,
        handleReactToMessage,
        handleSelectRoom,
        handleSendMessage,
        rooms,
        currentRoom,
        users
    };

    return (
        <ChatContext.Provider {...props} value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
