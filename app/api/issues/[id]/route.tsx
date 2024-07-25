import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/app/types";
import { Issue } from "@prisma/client";
import { issueDto, issueSchema } from "@/app/schemas";
import prisma from "@/prisma/client";

export const PATCH = async (
    request: NextRequest,
    { params: { id } }: { params: { id: string } },
): Promise<ApiResponse<Issue>> => {
    const dto = issueDto(await request.json());

    const validation = issueSchema.safeParse(dto);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({ where: { id }, data: dto });
    return NextResponse.json(updatedIssue);
};

export const DELETE = async (
    _request: NextRequest,
    {
        params: { id },
    }: {
        params: { id: string };
    },
): Promise<ApiResponse<Issue>> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const deletedIssue = await prisma.issue.delete({ where: { id } });
    return NextResponse.json(deletedIssue);
};
