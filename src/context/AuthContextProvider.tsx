import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import supabase from "../services/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";

interface LoginProps {
    email: string;
    password: string;
}

export interface AuthContextProps {
    authUser: User | null;
    authError: AuthError | null;
    authLoading: boolean;
    clearAuthState: () => void;
    exchangeToken: (code: string) => void;
    login: (loginProps: LoginProps) => void;
    loginWithGoogle: () => void;
    logout: () => void;
    session: Session | null;
    signup: (loginProps: LoginProps) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

const AuthContextProvider = ({ children, ...props }: { children: ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState<boolean>(false);
    const [initialauthLoading, setInitialAuthLoading] = useState<boolean>(true);
    const [authError, setAuthError] = useState<AuthError | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    const signup = useCallback(async ({ email, password }: LoginProps) => {
        setAuthLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        setAuthError(error);
        setAuthUser(data.user);
        setAuthLoading(false);
    }, []);

    const login = useCallback(async ({ email, password }: LoginProps) => {
        setAuthLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        setAuthError(error);
        setAuthUser(data.user);
        setAuthLoading(false);
    }, []);

    const loginWithGoogle = useCallback(async () => {
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
                queryParams: {
                    access_type: "offline",
                    prompt: "consent"
                }
            }
        });
        setAuthError(error);
        setAuthLoading(false);
    }, []);

    const exchangeToken = useCallback(async (code: string) => {
        setAuthLoading(true);
        await supabase.auth.exchangeCodeForSession(code);
        setAuthLoading(false);
    }, []);

    const clearAuthState = useCallback(() => {
        setAuthError(null);
        setAuthLoading(false);
    }, []);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
        setAuthUser(null);
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setInitialAuthLoading(false);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setInitialAuthLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (session) setAuthUser(session.user);
    }, [session]);

    const value = useMemo(
        () => ({
            authError,
            authLoading,
            authUser,
            clearAuthState,
            exchangeToken,
            login,
            loginWithGoogle,
            logout,
            session,
            signup
        }),
        [
            authError,
            authLoading,
            authUser,
            clearAuthState,
            exchangeToken,
            login,
            loginWithGoogle,
            logout,
            session,
            signup
        ]
    );

    if (initialauthLoading) return <div className="w-full h-screen container grid place-items-center">Loading...</div>;

    return (
        <AuthContext.Provider {...props} value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
