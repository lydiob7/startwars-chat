import ChatWindow from "./components/ChatWindow";
import { useChatContext } from "./context/useChatProvider";
import UsersList from "./components/UsersList";
import UserRoomsList from "./components/UserRoomsList";
import AuthUserCard from "./components/AuthUserCard";
import deathStar from "./assets/images/death-star.png";

function App() {
    const { authUser, logout } = useChatContext();

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
                    <UsersList />
                ) : (
                    <>
                        <AuthUserCard />
                        <div className="flex items-stretch justify-between gap-20 w-full">
                            <div className="flex-1 w-1/2">
                                <UserRoomsList />
                            </div>
                            <div className="flex-1 w-1/2 flex justify-center">
                                <ChatWindow />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
