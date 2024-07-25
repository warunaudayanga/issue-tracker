import { JSX } from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusMap: Record<Status, { label: string; color: "red" | "yellow" | "green" }> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "yellow" },
    CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }): JSX.Element => {
    return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
