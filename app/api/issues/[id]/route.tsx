import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/types";
import { Issue } from "@prisma/client";
import { updateIssueDto, updateIssueSchema } from "@/app/schemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

export const PATCH = async (
    request: NextRequest,
    { params: { id } }: { params: { id: string } },
): Promise<ApiResponse<Issue>> => {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const dto = updateIssueDto(await request.json());

        const validation = updateIssueSchema.safeParse(dto);
        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const issue = await prisma.issue.findUnique({ where: { id } });
        if (!issue) {
            return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
        }

        if (dto.userId) {
            const user = await prisma.user.findUnique({ where: { id: dto.userId } });
            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
        }

        const updatedIssue = await prisma.issue.update({ where: { id }, data: dto });
        return NextResponse.json(updatedIssue);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const DELETE = async (
    _request: NextRequest,
    {
        params: { id },
    }: {
        params: { id: string };
    },
): Promise<ApiResponse<Issue>> => {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const deletedIssue = await prisma.issue.delete({ where: { id } });
    return NextResponse.json(deletedIssue);
};
