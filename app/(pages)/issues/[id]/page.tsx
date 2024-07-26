import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { EditIssueButton, IssueDetails } from "@/app/components";
import DeleteIssueButton from "@/app/components/issue/DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/auth-options";

interface Props {
    params: {
        id: string;
    };
}

const IssueDetailPage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const session = await getServerSession(authOptions);
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue}></IssueDetails>
            </Box>
            {session && (
                <Box>
                    <Flex direction="column" gap="4">
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    );
};

export default IssueDetailPage;
