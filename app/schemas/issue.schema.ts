import { z } from "zod";

export const issueSchema = z.object({
    title: z
        .string()
        .regex(/./, "Title is required")
        .min(5, "Title must be at least 5 characters")
        .max(255, "Title must not exceed 255 characters"),
    description: z.string().regex(/./, "Title is required").min(5, "Description must be at least 5 characters"),
});

export type CreateIssueDto = z.infer<typeof issueSchema>;

export const issueDto = (body: any): CreateIssueDto => {
    return {
        title: body.title,
        description: body.description,
    };
};

export default issueSchema;
