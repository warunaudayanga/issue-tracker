import { JSX } from "react";
import { Table } from "@radix-ui/themes";
import { IssueActions, IssueStatusBadge, RouteLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";

interface Props {
    searchParams?: {
        status?: Status;
    };
}

const IssuesPage = async ({ searchParams: { status } = {} }: Props): Promise<JSX.Element> => {
    (status && Object.values(Status).includes(status)) || (status = undefined);
    const issues = await prisma.issue.findMany({ where: { status } });

    return (
        <>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell w-[140px] text-center">
                            Status
                        </Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className="hidden md:table-cell w-[140px] text-center">
                            Created
                        </Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <RouteLink href={`/issues/${issue.id}`}>{issue.title}</RouteLink>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell w-[140px] text-center">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell w-[140px] text-center">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
