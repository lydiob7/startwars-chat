import { ComponentProps, Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Room from "../types/Room";
import User from "../types/User";

interface UserRoomsListProps extends ComponentProps<"div"> {
    authUser: string | null;
    handleCreateNewConversation: (userId?: string | null) => void;
    rooms: Room[];
    selectedRoom: Room | null;
    setSelectedRoom: Dispatch<SetStateAction<Room | null>>;
    users: User[];
}

const UserRoomsList = ({
    authUser,
    className,
    handleCreateNewConversation,
    rooms,
    selectedRoom,
    setSelectedRoom,
    users,
    ...props
}: UserRoomsListProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [selectedNewUserId, setSelectedNewUserId] = useState<string | null>(null);

    const handleOpenDialog = () => {
        dialogRef.current?.showModal();
    };

    const handleCloseDialog = () => {
        dialogRef.current?.close();
    };

    const filteredUsers = useMemo(() => {
        const userIdsWithConversations: string[] = [];
        rooms.forEach((room) => {
            room.users.forEach((user) => {
                if (user.id !== authUser) userIdsWithConversations.push(user.id);
            });
        });
        return users.filter((user) => user.id !== authUser && !userIdsWithConversations.includes(user.id));
    }, [authUser, rooms, users]);

    return (
        <>
            <div className={clsx("grid gap-4", className)} {...props}>
                {rooms.map((room) => {
                    const roomUser = room.users.find((user) => user.id !== authUser);
                    return (
                        <button
                            className={clsx(
                                "w-full flex items-center justify-center gap-4 bg-gray-800 hover:bg-gray-700 transition-all py-4 border-1 rounded-md border-gray-700",
                                selectedRoom?.id === room.id ? "outline outline-2 outline-offset-2 outline-primary" : ""
                            )}
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                        >
                            <div className="rounded-full overflow-hidden h-8 w-8">
                                <img
                                    className="h-full w-full object-cover"
                                    src={roomUser?.avatar}
                                    alt={roomUser?.username}
                                />
                            </div>
                            <span>{roomUser?.username}</span>
                        </button>
                    );
                })}
                <button
                    className="w-full border-primary py-2 border-1 rounded-md text-primary font-semibold"
                    onClick={() => handleOpenDialog()}
                >
                    + New conversation
                </button>
            </div>

            <dialog ref={dialogRef} className="px-12 py-4 w-[500px] h-[70vh] bg-gray-800 text-white">
                <div className="flex flex-col h-full">
                    <header className="grow-0 shrink-0 h-12">Select user:</header>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-scroll">
                        {filteredUsers.map((user) => (
                            <button
                                className={clsx(
                                    "flex items-center gap-4 py-2 px-4 bg-gray-700 rounded-md hover:bg-gray-600",
                                    selectedNewUserId === user.id
                                        ? "outline outline-2 -outline-offset-2 outline-primary bg-gray-600"
                                        : "outline-none"
                                )}
                                key={user.id}
                                onClick={() => setSelectedNewUserId(user.id)}
                            >
                                <div className="rounded-full overflow-hidden h-8 w-8">
                                    <img className="h-full w-full object-cover" src={user.avatar} alt={user.username} />
                                </div>
                                <span>{user.username}</span>
                            </button>
                        ))}
                    </div>
                    <footer className="grow-0 shrink-0 h-12 flex items-center justify-between w-full gap-12 mt-4">
                        <button className="text-primary" onClick={handleCloseDialog}>
                            Cancel
                        </button>
                        <button
                            className="border-1 border-primary px-4 py-2 text-primary font-semibold rounded-md"
                            onClick={() => {
                                handleCreateNewConversation(selectedNewUserId);
                                handleCloseDialog();
                            }}
                        >
                            Create conversation
                        </button>
                    </footer>
                </div>
            </dialog>
        </>
    );
};

export default UserRoomsList;
