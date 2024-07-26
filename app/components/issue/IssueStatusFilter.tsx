"use client";

import { JSX, useState } from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { LabelValuePair } from "@/app/types";

const statuses: LabelValuePair<Status | "all">[] = [
    { label: "All", value: "all" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
];

const IssueStatusFilter = (): JSX.Element => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpened, setOpened] = useState(false);

    const handleFilter = (status: Status | "all"): void => {
        const params = new URLSearchParams(searchParams);
        if (status !== "all") params.set("status", status);
        const query = params.size ? `?${params}` : "";
        router.push(`/issues${query}`);
    };

    return (
        <Select.Root defaultValue="all" onOpenChange={opened => setOpened(opened)} onValueChange={handleFilter}>
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
