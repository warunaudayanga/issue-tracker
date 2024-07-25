"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { JSX } from "react";

const NewIssuePage = (): JSX.Element => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            <TextArea></TextArea>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
