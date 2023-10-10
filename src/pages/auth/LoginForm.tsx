import { ComponentProps, FormEvent, useEffect } from "react";
import clsx from "clsx";
import useForm from "../../hooks/useForm";
import { useAuthContext } from "../../context/useAuthContext";
import routes from "../../config/routes";
import { useNavigate } from "react-router-dom";
// import { z } from "zod";

interface LoginFormProps extends ComponentProps<"form"> {}

const initialValues = {
    email: "",
    password: ""
};

// const validationsSchema = z.object({
//     email: z.string(),
//     password: z.string()
// });

const LoginForm = ({ className, ...props }: LoginFormProps) => {
    const navigate = useNavigate();

    const { data, handleChange } = useForm<typeof initialValues>(initialValues);
    const { authError, authLoading, clearAuthState, login, loginWithGoogle } = useAuthContext();

    useEffect(() => {
        clearAuthState();

        () => {
            clearAuthState();
        };
    }, [clearAuthState]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        login(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={clsx("flex flex-col gap-8 bg-gray-800 px-8 py-12 rounded-sm w-full", className)}
                {...props}
            >
                <div className="w-full">
                    <input
                        className="text-input w-full"
                        disabled={authLoading}
                        name="email"
                        value={data.email}
                        onChange={(ev) => handleChange(ev.target.name, ev.target.value)}
                        placeholder="Email"
                    />
                    {!!authError?.message && <p className="text-red-500 text-sm mt-4">{authError?.message}</p>}
                </div>
                <div className="w-full">
                    <input
                        className="text-input w-full"
                        disabled={authLoading}
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(ev) => handleChange(ev.target.name, ev.target.value)}
                        placeholder="Password"
                    />
                    {!!authError?.message && <p className="text-red-500 text-sm mt-4">{authError?.message}</p>}
                </div>
                <button className="main-btn" disabled={authLoading} type="submit">
                    Login
                </button>
            </form>
            <div className="flex items-center gap-4">
                <hr className="block flex-1" />
                Or
                <hr className="block flex-1" />
            </div>

            <button className="main-btn" onClick={loginWithGoogle}>
                Login with Google
            </button>

            <p className="text-center">
                Don't have an account yet?{" "}
                <span className="cursor-pointer underline" onClick={() => navigate(routes.signup)}>
                    Sign Up
                </span>
            </p>
        </>
    );
};

export default LoginForm;
