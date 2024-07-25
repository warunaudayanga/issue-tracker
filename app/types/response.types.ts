import { NextResponse } from "next/server";
import { ApiError } from "@/app/interfaces/response.interfaces";
import { ZodFormattedError, ZodIssue } from "zod";
import { Issue } from "@prisma/client";

export type AllString<T> = {
    [key in keyof T]?: string;
};

export type ApiResponse<T> = NextResponse<T | ApiError | ZodFormattedError<AllString<Issue>> | ZodIssue | ZodIssue[]>;
