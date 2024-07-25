import { z } from "zod";

export const createIssueSchema = z.object({
    title: z
        .string()
        .regex(/./, "Title is required")
        .min(5, "Title must be at least 5 characters")
        .max(255, "Title must not exceed 255 characters"),
    description: z
        .string()
        .regex(/./, "Title is required")
        .min(5, "Description must be at least 5 characters")
        .max(2000, "Description must not exceed 2000 characters"),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;

export const createIssueDto = (body: any): CreateIssueDto => {
    return {
        title: body.title,
        description: body.description,
    };
};
