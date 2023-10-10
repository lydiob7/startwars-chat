import { useNavigate, useSearchParams } from "react-router-dom";
import routes from "../../config/routes";
import { useAuthContext } from "../../context/useAuthContext";
import { useEffect } from "react";

const OAuthCallbackPage = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const { authLoading, exchangeToken } = useAuthContext();

    const code = params.get("code");
    const error = params.get("error");
    const errorDescription = params.get("error_description");

    useEffect(() => {
        if (code) exchangeToken(code);
    }, [code, exchangeToken]);

    return (
        <>
            {!authLoading && error && errorDescription && (
                <p className="text-red-500 font-semibold text-center border-1 border-red-500 px-8 py-4">
                    {error} - {errorDescription}
                </p>
            )}
            {authLoading && <p>Loading...</p>}
            <p className="text-center">
                Go back to{" "}
                <span className="cursor-pointer underline" onClick={() => navigate(routes.login)}>
                    Login
                </span>
            </p>
        </>
    );
};

export default OAuthCallbackPage;
