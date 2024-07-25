import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";

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
                <Heading>{issue.title}</Heading>
                <Flex gap="3" mt="2" align="center">
                    <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                    <p>{issue.createdAt.toDateString()}</p>
                </Flex>
                <Card className="prose mt-4">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${id}/edit`}>Edit</Link>
                </Button>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
