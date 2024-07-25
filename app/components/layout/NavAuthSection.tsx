import { JSX } from "react";
import { Avatar, DropdownMenu, Skeleton, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavAuthSection = (): JSX.Element | null => {
    const { status, data: session } = useSession();

    if (status === "loading") {
        return <Skeleton width="50px" height="25px"></Skeleton>;
    }

    if (status === "unauthenticated" || !session) {
        return (
            <Link href="/api/auth/signin" className="nav-link">
                Sign In
            </Link>
        );
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    src={session.user!.image!}
                    fallback={
                        <Text size="4" weight="bold">
                            {session.user!.name?.[0] || session.user!.email?.[0] || "?"}
                        </Text>
                    }
                    sizes="2"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                ></Avatar>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {session.user!.name && (
                    <DropdownMenu.Label>
                        <Text size="3" className="text-black font-medium">
                            {session.user!.name}
                        </Text>
                    </DropdownMenu.Label>
                )}
                <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default NavAuthSection;
