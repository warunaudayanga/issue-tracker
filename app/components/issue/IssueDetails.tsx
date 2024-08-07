import { JSX } from "react";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import { EditIssueButton, IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";
import DeleteIssueButton from "@/app/components/issue/DeleteIssueButton";
import AssigneeSelect from "@/app/components/issue/AssigneeSelect";

const IssueDetails = ({ issue }: { issue: Issue }): JSX.Element => {
    return (
        <Box>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" mt="2" align="center">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <p>{issue.createdAt.toDateString()}</p>
            </Flex>
            <Flex
                gap={{ initial: "5", xs: "4", sm: "5" }}
                mt="4"
                wrap={{ initial: "wrap-reverse", sm: "nowrap" }}
                justify="end"
            >
                <Card className="prose max-w-full w-full">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
                <Flex minWidth={{ sm: "255px" }} width="255px" direction="column" gap="4">
                    <Box>
                        <AssigneeSelect issue={issue} />
                    </Box>
                    <div className="flex flex-wrap justify-end gap-4">
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </div>
                </Flex>
            </Flex>
        </Box>
    );
};

export default IssueDetails;
