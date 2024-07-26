import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { IssueDetails } from "@/app/components";

interface Props {
    params: {
        id: string;
    };
}

const IssueDetailPage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return <IssueDetails issue={issue}></IssueDetails>;
};

export default IssueDetailPage;
