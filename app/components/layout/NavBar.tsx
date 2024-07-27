"use client";

import { JSX } from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { Container, Flex } from "@radix-ui/themes";
import { NavAuthSection, NavLinks } from "@/app/components";

const NavBar = (): JSX.Element => {
    return (
        <nav className="border-b mb-5 px-5">
            <Container>
                <Flex justify="between" height="64px">
                    <Flex gap="6" align="center">
                        <Link href="/public">
                            <FaBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <Flex gap="3" align="center">
                        <NavAuthSection />
                    </Flex>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
