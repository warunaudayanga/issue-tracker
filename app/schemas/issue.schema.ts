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
        .max(65535, "Description must not exceed 65535 characters"),
});

export type CreateIssueDto = z.infer<typeof createIssueSchema>;

export const createIssueDto = ({ title, description }: any): CreateIssueDto => ({ title, description });

/** ***  */

export const updateIssueSchema = z.object({
    title: z
        .string()
        .min(5, "Title must be at least 5 characters")
        .max(255, "Title must not exceed 255 characters")
        .optional(),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters")
        .max(65535, "Description must not exceed 65535 characters")
        .optional(),
    userId: z.string().max(255, "User ID must not exceed 255 characters").optional().nullable(),
});

export type UpdateIssueDto = z.infer<typeof updateIssueSchema>;

export const updateIssueDto = ({ title, description, userId }: any): UpdateIssueDto => ({ title, description, userId });

export default createIssueSchema;
