import { NextRequest, NextResponse } from "next/server";
import { Issue } from "@prisma/client";
import { issueDto, issueSchema } from "@/app/schemas";
import { ApiResponse } from "@/app/types/response.types";
import prisma from "@/prisma/client";

export const POST = async (request: NextRequest): Promise<ApiResponse<Issue>> => {
    const dto = issueDto(await request.json());

    const validation = issueSchema.safeParse(dto);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const issue = await prisma.issue.create({ data: dto });

    return NextResponse.json(issue);
};
