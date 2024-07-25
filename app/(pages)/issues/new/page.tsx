"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { JSX, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsInfoCircle } from "react-icons/bs";
import { CreateIssueDto, createIssueSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage, Spinner } from "@/app/components";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = (): JSX.Element => {
    const [error, setError] = useState<string>("");
    const [isSubmitting, setSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateIssueDto>({
        resolver: zodResolver(createIssueSchema),
    });

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

    return (
        <div className="max-w-xl">
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
                        <SimpleMDE options={{ status: false }} placeholder="Description" {...field} />
                    )}
                ></Controller>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    Submit New Issue
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
