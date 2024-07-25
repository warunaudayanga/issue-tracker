import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { JSX, ReactNode } from "react";

const RouteLink = ({ href, children }: { href: string; children: ReactNode }): JSX.Element => {
    return (
        <NextLink href={href} passHref legacyBehavior>
            <RadixLink>{children}</RadixLink>
        </NextLink>
    );
};

export default RouteLink;
