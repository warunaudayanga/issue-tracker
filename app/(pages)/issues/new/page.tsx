"use client";

import { Button, TextField } from "@radix-ui/themes";
import { JSX } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = (): JSX.Element => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            <SimpleMdeReact></SimpleMdeReact>
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
