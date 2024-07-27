import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import "./globals.css";
import { JSX, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NavBar } from "@/app/components";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "@/app/(pages)/auth/Provider";
import { QueryClientProvider } from "@/app/providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
                <QueryClientProvider>
                    <AuthProvider>
                        <Theme accentColor="violet" radius="small">
                            <NavBar />
                            <main>
                                <Container className="content p-5">{children}</Container>
                                <ReactQueryDevtools />
                            </main>
                            <Toaster />
                        </Theme>
                    </AuthProvider>
                </QueryClientProvider>
                <input
                    type="hidden"
                    data-info="to-make-webstorm-happy"
                    className="nav-link-active data-table-pagination data-table-pagination-row data-table-header"
                />
            </body>
        </html>
    );
}
