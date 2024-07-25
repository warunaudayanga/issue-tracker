"use client";

import { Button, Skeleton, TextArea, TextField } from "@radix-ui/themes";
import { JSX, useState } from "react";

const NewIssuePage = (): JSX.Element => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            <TextArea rows={15} />
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
