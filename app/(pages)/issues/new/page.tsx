"use client";

import { Box, Button, Callout, Card, TextField } from "@radix-ui/themes";
import { JSX, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsInfoCircle } from "react-icons/bs";
import { CreateIssueDto, createIssueSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/components";
import ReactMarkdown from "react-markdown";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import EasyMDE from "easymde";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
const options: EasyMDE.Options = {
    status: false,
    maxHeight: "400px",
};

const NewIssuePage = (): JSX.Element => {
    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState(false);
    const [description, setDescription] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
    } = useForm<CreateIssueDto>({
        resolver: zodResolver(createIssueSchema),
    });

    // console.log(control.getFieldState("description"));

    const onSubmit = handleSubmit(async data => {
        try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            setError("Unexpected error occurred");
        } finally {
            setSubmitting(false);
        }
    });

    const handleDescriptionChange = (description: string) => {
        console.log(description);
    };

    return (
        <div className="flex flex-wrap">
            <div className="sm:w-full lg:w-1/2 lg:pe-5">
                {error && (
                    <Callout.Root color="red" className="mb-5">
                        <Callout.Icon>
                            <BsInfoCircle />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )}
                <form onSubmit={onSubmit} className="space-y-3">
                    <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
                    <ErrorMessage>{errors.title?.message}</ErrorMessage>

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <SimpleMDE
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
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>

                    <Button disabled={isSubmitting}>
                        Submit New Issue
                        {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </div>
            <div className="hidden lg:block w-1/2">
                <Box className="prose !w-full max-w-full ps-5 h-[512px] overflow-y-auto border-2 rounded px-5 py-3">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </Box>
            </div>
        </div>
    );
};

export default NewIssuePage;
