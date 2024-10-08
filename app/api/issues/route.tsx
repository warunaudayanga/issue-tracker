import { NextRequest, NextResponse } from "next/server";
import { Issue } from "@prisma/client";
import { createIssueDto, createIssueSchema } from "@/app/schemas";
import { ApiResponse } from "@/app/types/response.types";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";

export const POST = async (request: NextRequest): Promise<ApiResponse<Issue>> => {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dto = createIssueDto(await request.json());

    const validation = createIssueSchema.safeParse(dto);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.create({ data: dto });

    return NextResponse.json(issue);
};
