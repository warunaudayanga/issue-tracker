import { JSX, cache } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { IssueDetails } from "@/app/components";
import { Metadata } from "next";
import { Issue } from "@prisma/client";

interface Props {
    params: {
        id: string;
    };
}

const fetchIssue = cache(
    (issueId: string): Promise<Issue | null> => prisma.issue.findUnique({ where: { id: issueId } }),
);

const IssueDetailPage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await fetchIssue(id);
    if (!issue) notFound();

    return <IssueDetails issue={issue}></IssueDetails>;
};

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
    const issue = await fetchIssue(id);
    return {
        title: `Issue Tracker - ${issue?.title}`,
        description: `Details of issue ${issue?.id}`,
    };
}

export default IssueDetailPage;
