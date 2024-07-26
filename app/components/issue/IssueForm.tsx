"use client";

import { Box, Button, Grid, TextField } from "@radix-ui/themes";
import { JSX, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CreateIssueDto, createIssueSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/components";
import ReactMarkdown from "react-markdown";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";
import { Issue } from "@prisma/client";
import SimpleMdeReact from "react-simplemde-editor";
import { issueService } from "@/app/services";
import { toast } from "react-hot-toast";

const options: EasyMDE.Options = {
    status: false,
    maxHeight: "400px",
};

const IssueForm = ({ issue }: { issue?: Issue }): JSX.Element => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [description, setDescription] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateIssueDto>({
        resolver: zodResolver(createIssueSchema),
    });

    const onSubmit = handleSubmit(async issueDto => {
        try {
            setSubmitting(true);
            if (issue) {
                await issueService.update(issue.id, issueDto);
                router.push(`/issues/${issue.id}`);
            } else {
                await issueService.create(issueDto);
                router.push("/issues");
            }
            router.refresh();
        } catch (error) {
            toast.error("Unexpected error occurred");
        } finally {
            setSubmitting(false);
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <Grid
                columns={{
                    initial: "1",
                    md: "2",
                }}
                gap="5"
            >
                <Box>
                    <Box className="space-y-5">
                        <TextField.Root
                            placeholder="Title"
                            {...register("title")}
                            defaultValue={issue?.title}
                        ></TextField.Root>
                        <ErrorMessage>{errors.title?.message}</ErrorMessage>

                        <Controller
                            name="description"
                            control={control}
                            defaultValue={issue?.description}
                            render={({ field }) => (
                                <SimpleMdeReact
                                    placeholder="Description"
                                    onBlur={field.onBlur}
                                    onChange={value => {
                                        setDescription(value);
                                        field.onChange(value);
                                    }}
                                    value={field.value}
                                    options={options}
                                />
                            )}
                        ></Controller>
                    </Box>
                </Box>
                <Box>
                    <Box className="prose !w-full max-w-full ps-5 h-[522px] overflow-y-auto border-2 rounded px-5 py-3">
                        <ReactMarkdown>{description || issue?.description}</ReactMarkdown>
                    </Box>
                </Box>
            </Grid>
            <Box className="mt-5">
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting} className="cursor-pointer">
                    {issue ? "Update" : "Submit New"} Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </Box>
        </form>
    );
};

export default IssueForm;
