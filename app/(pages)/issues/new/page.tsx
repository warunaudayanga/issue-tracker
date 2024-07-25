"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { JSX } from "react";
import { useForm } from "react-hook-form";
import { IssueDto } from "@/app/interfaces/issue.interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewIssuePage = (): JSX.Element => {
    const { register, handleSubmit } = useForm<IssueDto>();
    const router = useRouter();
    return (
        <form
            onSubmit={handleSubmit(async data => {
                await axios.post("/api/issues", data);
                router.push("/");
            })}
            className="max-w-xl space-y-3"
        >
            <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
            <TextArea rows={15} {...register("description")} />
            <Button>Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
