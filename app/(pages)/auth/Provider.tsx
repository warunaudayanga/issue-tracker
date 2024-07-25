"use client";
import { JSX, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
