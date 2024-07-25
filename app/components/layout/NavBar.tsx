"use client";

import { JSX } from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container, Flex } from "@radix-ui/themes";

const NavBar = (): JSX.Element => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        {
            label: "Dashboard",
            href: "/",
        },
        {
            label: "Issues",
            href: "/issues",
        },
    ];

    return (
        <nav className="border-b mb-5 px-5 py-3">
            <Container>
                <Flex justify="between">
                    <Flex gap="6" align="center">
                        <Link href="/public">
                            <FaBug />
                        </Link>
                        <ul className="flex gap-3">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className={`${link.href === currentPath ? "text-zinc-900" : "text-zinc-500"} hover:text-zinc-800 transition-colors `}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Flex gap="3" align="center">
                        {status === "authenticated" && (
                            <div className="flex gap-3">
                                <div className="text-primary font-bold">{session.user?.name}</div>
                                <Link href="/api/auth/signout">Sign Out</Link>
                            </div>
                        )}
                        {status === "unauthenticated" && <Link href="/api/auth/signin">Sign In</Link>}
                    </Flex>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
