"use client";

import React, { JSX } from "react";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { IssueStatusBadge, RouteLink } from "@/app/components/index";
import { Pagination } from "@/app/components";
import { TableColumns } from "@/app/types";
import { Issue } from "@prisma/client";
import { PaginationParams } from "@/app/interfaces";

interface Props {
    items: Issue[];
    columns: TableColumns;
    searchParams: PaginationParams;
    pageSize: number;
    totalItems: number;
}

const DataTable = ({
    items = [],
    columns = [],
    searchParams = {},
    pageSize = 8,
    totalItems = 0,
}: Props): JSX.Element => {
    let { page: currentPage = "1", dir } = searchParams;

    return (
        <Table.Root variant="surface" className="mb-3">
            <Table.Header>
                <Table.Row>
                    {columns.map(column => (
                        <Table.ColumnHeaderCell key={column.value.toString()} className={column.className}>
                            <Flex gap="1" align="center">
                                <Link
                                    href={{
                                        query: {
                                            ...searchParams,
                                            orderBy: String(column.value),
                                            dir:
                                                searchParams.orderBy !== column.value || dir === "desc"
                                                    ? "asc"
                                                    : "desc",
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
                {items.map(issue => (
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
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell colSpan={columns.length} className="text-center">
                        <Pagination itemCount={totalItems} pageSize={pageSize} currentPage={Number(currentPage) || 1} />
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
        </Table.Root>
    );
};

export default DataTable;
