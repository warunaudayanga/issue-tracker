"use client";

import { JSX, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statuses: { label: string; value: Status | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
];

const IssueStatusFilter = (): JSX.Element => {
    const [isOpened, setOpened] = useState(false);

    return (
        <Select.Root defaultValue="all" onOpenChange={opened => setOpened(opened)}>
            <Select.Trigger className="!w-[150px]"></Select.Trigger>
            <Select.Content>
                {statuses.map(({ label, value }) => (
                    <Select.Item key={label} value={value}>
                        {!isOpened && value === "all" ? "Filter by status..." : label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default IssueStatusFilter;
