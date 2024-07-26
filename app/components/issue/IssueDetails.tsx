import { JSX } from "react";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { EditIssueButton, IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";
import DeleteIssueButton from "@/app/components/issue/DeleteIssueButton";
import AssigneeSelect from "@/app/components/issue/AssigneeSelect";

const IssueDetails = ({ issue }: { issue: Issue }): JSX.Element => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" mt="2" align="center">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Flex gap={{ initial: "4", sm: "6" }} mt="4" wrap={{ initial: "wrap-reverse", sm: "nowrap" }}>
                <Card className="prose max-w-full">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
                <Flex
                    minWidth="150px"
                    width={{ initial: "100%", sm: "auto" }}
                    direction={{ initial: "row", sm: "column" }}
                    gap="4"
                >
                    <Box flexGrow={{ initial: "1", sm: "0" }}>
                        <AssigneeSelect></AssigneeSelect>
                    </Box>
                    <Flex direction={{ initial: "row", sm: "column" }} gap="4">
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default IssueDetails;
