/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// noinspection JSUnusedGlobalSymbols

import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/auth-options";

const handler: (request: NextRequest, response: NextResponse) => void | NextResponse | Promise<void | NextResponse> =
    NextAuth(authOptions);

export { handler as GET, handler as POST };
