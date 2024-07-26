import React, { JSX } from "react";
import { Flex, Table } from "@radix-ui/themes";
import { IssueActions, IssueStatusBadge, RouteLink } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TableColumns } from "@/app/types";
import Link from "next/link";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";

interface Props {
    searchParams?: {
        status?: Status;
        orderBy?: keyof Issue;
        dir?: "asc" | "desc";
    };
}

const IssuesPage = async ({ searchParams = {} }: Props): Promise<JSX.Element> => {
    const columns: TableColumns<Issue> = [
        { label: "Issue", value: "title" },
        { label: "Status", value: "status", className: "hidden md:table-cell w-[140px] text-center" },
        { label: "Created", value: "createdAt", className: "hidden md:table-cell w-[140px] text-center" },
    ];

    let { status, orderBy = "createdAt", dir = "asc" } = searchParams;
    (status && Object.values(Status).includes(status)) || (status = undefined);

    const issues = await prisma.issue.findMany({ where: { status }, orderBy: { [orderBy]: dir } });

    return (
        <>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <Flex gap="1" align="center">
                                    <Link
                                        href={{
                                            query: {
                                                ...searchParams,
                                                orderBy: column.value,
                                                dir: orderBy !== column.value || dir === "desc" ? "asc" : "desc",
                                            },
                                        }}
                                    >
                                        {column.label}
                                    </Link>
                                    {column.value === searchParams.orderBy &&
                                        (dir === "asc" ? <FaSortAmountDownAlt /> : <FaSortAmountDown />)}
                                </Flex>
                            </Table.ColumnHeaderCell>
                        ))}
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
