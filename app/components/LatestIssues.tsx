import { JSX } from "react";
import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "@/app/components";
import classNames from "classnames";

const LatestIssues = async (): Promise<JSX.Element> => {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
        include: {
            user: true,
        },
    });
    return (
        <Card>
            <Heading size="4" mb="5">
                Latest Issues
            </Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map((issue, i) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell
                                className={classNames({
                                    "!shadow-none": i === issues.length - 1,
                                })}
                            >
                                <Flex justify="between">
                                    <Flex direction="column" align="start" gap="2">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.user && (
                                        <Avatar src={issue.user.image!} fallback="?" size="2" radius="full"></Avatar>
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
};

export default LatestIssues;
