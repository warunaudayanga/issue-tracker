import { z } from "zod";

export const createIssueSchema = z.object({
    title: z.string().min(5).max(255),
    description: z.string().min(5).max(255),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;

export const createIssueDto = (body: any): CreateIssueDto => {
    return {
        title: body.title,
        description: body.description,
    };
};
