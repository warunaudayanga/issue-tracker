import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import { EditIssueButton, IssueDetails } from "@/app/components";

interface Props {
    params: {
        id: string;
    };
}

const IssueDetailPage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssueDetails issue={issue}></IssueDetails>
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
