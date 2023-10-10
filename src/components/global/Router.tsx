import { FC } from "react";
import { useRoutes } from "react-router-dom";
import routes from "../../config/routes";
import Layout from "./Layout";
import NotFound from "../../pages/common/NotFound";
import ChatPage from "../../pages/chat/ChatPage";
import AuthPage from "../../pages/auth/AuthPage";
import PrivateRoutes from "./PrivateRoutes";
import LoginForm from "../../pages/auth/LoginForm";
import SignupForm from "../../pages/auth/SignupForm";
import OAuthCallbackPage from "../../pages/auth/OAuthCallbackPage";

const Router: FC = () => {
    const router = useRoutes([
        {
            path: routes.home,
            element: <Layout />,
            children: [
                { element: <PrivateRoutes />, children: [{ path: routes.home, element: <ChatPage /> }] },
                {
                    path: routes.auth,
                    element: <AuthPage />,
                    children: [
                        { path: routes.login, element: <LoginForm /> },
                        { path: routes.signup, element: <SignupForm /> },
                        { path: routes.authCallback, element: <OAuthCallbackPage /> }
                    ]
                },
                { path: "*", element: <NotFound /> }
            ]
        }
    ]);

    return router;
};

export default Router;
