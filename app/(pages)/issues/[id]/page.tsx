import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";

interface Props {
    params: {
        id: string;
    };
}

const IssueDetailPage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" mt="2" align="center">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="prose mt-4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    );
};

export default IssueDetailPage;
