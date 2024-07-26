import { JSX } from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { LabelValuePair } from "@/app/types";

const statusMap: Record<Status, LabelValuePair<"red" | "yellow" | "green", "color">> = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "yellow" },
    CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: { status: Status }): JSX.Element => {
    return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default IssueStatusBadge;
