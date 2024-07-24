import { JSX } from "react";
import Link from "next/link";
import { FaBug } from "react-icons/fa";

const NavBar = (): JSX.Element => {
    const links = [
        {
            label: "Dashboard",
            href: "/",
        },
        {
            label: "Issues",
            href: "/",
        },
    ];
    return (
        <nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <FaBug />
            </Link>
            <ul className="flex gap-3">
                {links.map((link, index) => (
                    <Link key={index} href={link.href} className="text-zinc-500 hover:text-zinc-800 transition-colors">
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
