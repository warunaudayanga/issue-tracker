import { JSX, ReactNode } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children, error }: { children?: ReactNode; error?: string }): JSX.Element | null => {
    if (!children && !error) {
        return null;
    }

    return (
        <Text as="p" color="red">
            {children || error}
        </Text>
    );
};

export default ErrorMessage;
