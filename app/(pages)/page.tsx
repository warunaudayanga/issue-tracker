import { JSX } from "react";
import { IssueSummary, LatestIssues } from "@/app/components";
import prisma from "@/prisma/client";
import IssueChart from "@/app/components/IssueChart";
import { Grid } from "@radix-ui/themes";

export default async function Home(): Promise<JSX.Element> {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    return <Grid columns={{ initial: "1", md: "2" }}></Grid>;
}
