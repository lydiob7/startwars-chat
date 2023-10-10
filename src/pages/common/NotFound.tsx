import { ComponentProps } from "react";
import clsx from "clsx";

interface NotFoundProps extends ComponentProps<"div"> {}

const NotFound = ({ className, ...props }: NotFoundProps) => {
    return (
        <div className={clsx("container", className)} {...props}>
            404 - Page Not Found
        </div>
    );
};

export default NotFound;
