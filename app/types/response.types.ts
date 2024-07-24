import { NextResponse } from "next/server";
import { ApiError } from "@/app/interfaces/response.interfaces";
import { ZodIssue } from "zod";

export type ApiResponse<T> = NextResponse<T | ApiError | ZodIssue | ZodIssue[]>;
