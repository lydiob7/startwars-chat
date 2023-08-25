import ChatWindow from "./components/ChatWindow";
import UsersList from "./components/UsersList";
import UserRoomsList from "./components/UserRoomsList";
import AuthUserCard from "./components/AuthUserCard";
import deathStar from "./assets/images/death-star.png";
import { useCallback, useLayoutEffect, useState } from "react";
import { messagesService, roomsService, usersService } from "./@fake-db";
import Room from "./types/Room";
import User from "./types/User";

function App() {
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

    return (
        <div className="w-screen h-screen bg-gray-900 text-white overflow-x-hidden">
            <header className="h-20 w-full p-8 bg-gray-800">
                <div className="container mx-auto h-full flex items-center justify-between">
                    <div className="flex gap-8 items-center">
                        <div className="h-16 w-16 rounded-full overflow-hidden shrink-0">
                            <img src={deathStar} alt="Death Star" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-2xl font-bold">Star Wars Chat</span>
                    </div>

                    {authUser && <button onClick={logout}>Logout</button>}
                </div>
            </header>
            <div className="container mx-auto py-8 grid place-items-center gap-12">
                {!authUser ? (
                    <UsersList authUser={authUser} login={login} users={users} />
                ) : (
                    <>
                        <AuthUserCard authUser={authUser} users={users} />
                        <div className="flex items-stretch justify-between gap-20 w-full">
                            <div className="flex-1 w-1/2">
                                <UserRoomsList
                                    authUser={authUser}
                                    handleCreateNewConversation={handleCreateNewConversation}
                                    rooms={rooms}
                                    selectedRoom={selectedRoom}
                                    setSelectedRoom={setSelectedRoom}
                                    users={users}
                                />
                            </div>
                            <div className="flex-1 w-1/2 flex justify-center">
                                <ChatWindow
                                    authUser={authUser}
                                    handleReactToMessage={handleReactToMessage}
                                    handleSendMessage={handleSendMessage}
                                    rooms={rooms}
                                    selectedRoom={selectedRoom}
                                    setSelectedRoom={setSelectedRoom}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
