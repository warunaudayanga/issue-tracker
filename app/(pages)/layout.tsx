import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { JSX, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import { Theme } from "@radix-ui/themes";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Create Next App ",
    description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body className={inter.variable}>
                <Theme accentColor="teal" radius="small">
                    <NavBar />
                    <main className="p-5">{children}</main>
                </Theme>
            </body>
        </html>
    );
}
