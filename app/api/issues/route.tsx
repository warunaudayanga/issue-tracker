import { NextRequest, NextResponse } from "next/server";
import { Issue } from "@prisma/client";
import { createIssueDto, createIssueSchema } from "@/app/api/issues/schema";
import { ApiResponse } from "@/app/types/response.types";
import prisma from "@/prisma/client";

export const POST = async (request: NextRequest): Promise<ApiResponse<Issue>> => {
    const dto = createIssueDto(await request.json());

    const validation = createIssueSchema.safeParse(dto);
    if (!validation.success) {
        return NextResponse.json(validation.error.issues, { status: 400 });
    }

    const issue = await prisma.issue.create({ data: dto });

    return NextResponse.json(issue);
};
