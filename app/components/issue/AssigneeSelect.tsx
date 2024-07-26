"use client";

import { JSX } from "react";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = (): JSX.Element => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." className="!w-full" />
            <Select.Content>
                <Select.Group className="min-w-24">
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value={"1"}>Waruna</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
