import { JSX } from "react";
import Link from "next/link";
import { Button, ButtonProps } from "@radix-ui/themes";
import type { UrlObject } from "url";

interface Props extends ButtonProps {
    href: string | UrlObject;
    buttonClassName?: string | undefined;
}

const ButtonLink = ({ href, children, className, buttonClassName, ...rest }: Props): JSX.Element => {
    return (
        <Link href={href} className={`${className}`}>
            <Button className={`${buttonClassName}`} {...rest}>
                {children}
            </Button>
        </Link>
    );
};

export default ButtonLink;
