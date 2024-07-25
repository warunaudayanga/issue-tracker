import { JSX } from "react";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issue }: { issue: Issue }): JSX.Element => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" mt="2" align="center">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Card className="prose max-w-full mt-4">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </>
    );
};

export default IssueDetails;
