import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/types";
import { User } from "next-auth";
import prisma from "@/prisma/client";

export const GET = async (_request: NextRequest): Promise<ApiResponse<User[]>> => {
    const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(users);
};
