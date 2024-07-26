"use client";

import { JSX, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";

const QueryClientProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const queryClient: QueryClient = new QueryClient();
    return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
