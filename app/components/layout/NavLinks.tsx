import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavLinks = (): JSX.Element => {
    const currentPath = usePathname();

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
        <ul className="flex gap-3">
            {links.map((link, index) => (
                <li key={index}>
                    <Link
                        href={link.href}
                        className={classNames({
                            "nav-link": true,
                            "nav-link-active": link.href === currentPath,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinks;
