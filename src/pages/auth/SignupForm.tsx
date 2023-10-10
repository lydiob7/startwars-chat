import { ComponentProps, FormEvent, useEffect } from "react";
import clsx from "clsx";
import useForm from "../../hooks/useForm";
import { useAuthContext } from "../../context/useAuthContext";
import routes from "../../config/routes";
import { useNavigate } from "react-router-dom";

interface SignupFormProps extends ComponentProps<"form"> {}

const initialValues = {
    email: "",
    password: "",
    confirmPassword: ""
};

const SignupForm = ({ className, ...props }: SignupFormProps) => {
    const navigate = useNavigate();

    const { data, handleChange } = useForm<typeof initialValues>(initialValues);
    const { authError, clearAuthState, loginWithGoogle, signup } = useAuthContext();

    useEffect(() => {
        clearAuthState();

        () => {
            clearAuthState();
        };
    }, [clearAuthState]);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        signup({ email: data.email, password: data.password });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={clsx("flex flex-col gap-4 bg-gray-800 px-8 py-12 rounded-sm w-full", className)}
                {...props}
            >
                <div className="w-full">
                    <input
                        className="text-input w-full"
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
                        name="password"
                        type="password"
                        value={data.password}
                        onChange={(ev) => handleChange(ev.target.name, ev.target.value)}
                        placeholder="Password"
                    />
                    {!!authError?.message && <p className="text-red-500 text-sm mt-4">{authError?.message}</p>}
                </div>
                <div className="w-full">
                    <input
                        className="text-input w-full"
                        name="confirmPassword"
                        type="password"
                        value={data.confirmPassword}
                        onChange={(ev) => handleChange(ev.target.name, ev.target.value)}
                        placeholder="Confirm password"
                    />
                    {!!authError?.message && <p className="text-red-500 text-sm mt-4">{authError?.message}</p>}
                </div>
                <button className="main-btn" type="submit">
                    Sign Up
                </button>
            </form>

            <div className="flex items-center gap-4">
                <hr className="block flex-1" />
                Or
                <hr className="block flex-1" />
            </div>

            <button className="main-btn" onClick={loginWithGoogle}>
                Sign up with Google
            </button>

            <p className="text-center">
                Already have an account?{" "}
                <span className="cursor-pointer underline" onClick={() => navigate(routes.login)}>
                    Login
                </span>
            </p>
        </>
    );
};

export default SignupForm;
