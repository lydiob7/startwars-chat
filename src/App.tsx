import { BrowserRouter } from "react-router-dom";
import Router from "./components/global/Router";
import AuthContextProvider from "./context/AuthContextProvider";
import ChatContextProvider from "./context/ChatContextProvider";

function App() {
    return (
        <AuthContextProvider>
            <ChatContextProvider>
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ChatContextProvider>
        </AuthContextProvider>
    );
}

export default App;
