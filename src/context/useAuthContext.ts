import { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext should be used inside a AuthContextProvider");

    return context;
};
