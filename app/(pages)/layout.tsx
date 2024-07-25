import "@radix-ui/themes/styles.css";
import "./globals.css";
import { JSX, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App ",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Theme>
                    <NavBar />
                    <main className="p-5">{children}</main>
                </Theme>
            </body>
        </html>
    );
}
