"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { IssueDto } from "@/app/interfaces/issue.interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsInfo, BsInfoCircle } from "react-icons/bs";

const NewIssuePage = (): JSX.Element => {
    const { register, handleSubmit } = useForm<IssueDto>();
    const [error, setError] = useState<string>("");
    const router = useRouter();
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
            <form
                onSubmit={handleSubmit(async data => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/");
                    } catch (error) {
                        setError("Unexpected error occurred");
                    }
                })}
                className="space-y-3"
            >
                <TextField.Root placeholder="Title" {...register("title")}></TextField.Root>
                <TextArea rows={10} {...register("description")} />
                <Button>Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
