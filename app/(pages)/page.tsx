import { JSX } from "react";
import { IssueSummary, LatestIssues } from "@/app/components";
import prisma from "@/prisma/client";
import IssueChart from "@/app/components/IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home(): Promise<JSX.Element> {
    const open = await prisma.issue.count({ where: { status: "OPEN" } });
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } });
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
    const issues = { open, inProgress, closed };
    return (
        <Grid columns={{ initial: "1", sm: "2" }} gap="5">
            <Flex direction="column" gap="5">
                <IssueSummary {...issues} />
                <IssueChart {...issues} />
            </Flex>
            <Flex>
                <LatestIssues />
            </Flex>
        </Grid>
    );
}

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "View the latest issues and their summaries.",
};
