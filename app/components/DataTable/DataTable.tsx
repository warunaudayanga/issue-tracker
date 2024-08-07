"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import { Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { IssueStatusBadge, Pagination, RouteLink } from "@/app/components";
import { TableColumns } from "@/app/types";
import { Issue } from "@prisma/client";
import { PaginationParams } from "@/app/interfaces";
import "@/app/components/DataTable/DataTable.css";
import classNames from "classnames";

interface Props {
    items: Issue[];
    columns: TableColumns;
    searchParams: PaginationParams;
    pageSize: number;
    totalItems: number;
    className?: string;
}

const DataTable = ({
    items = [],
    columns = [],
    searchParams = {},
    pageSize = 8,
    totalItems = 0,
    className,
}: Props): JSX.Element => {
    const tableHeader = useRef<HTMLTableRowElement>(null);
    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    let { page: currentPage = "1", dir } = searchParams;

    useEffect(() => {
        const cells = Array.from(tableHeader.current?.cells || []);
        setColumnWidths(cells.map(cell => cell.clientWidth));
    }, [columns, items]);

    return (
        <Table.Root variant="surface" className={`${className} overflow-y-auto`} layout="fixed">
            <Table.Header>
                <Table.Row ref={tableHeader}>
                    {columns.map(column => (
                        <Table.ColumnHeaderCell
                            key={column.value.toString()}
                            className={column.className}
                        ></Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
                {
                    <Table.Row className="data-table-header">
                        {columns.map((column, i) => (
                            <Table.ColumnHeaderCell
                                key={column.value.toString()}
                                className={column.className}
                                width={`${columnWidths[i]}px`}
                            >
                                <Flex gap="1" align="center" justify={column.align}>
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
                }
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
                <Table.Row
                    className={classNames({
                        "data-table-pagination-row": true,
                        hidden: totalItems <= pageSize,
                    })}
                >
                    <Table.ColumnHeaderCell
                        colSpan={columns.length}
                        className="text-center flex w-full data-table-pagination"
                    >
                        <Pagination
                            itemCount={totalItems}
                            pageSize={pageSize}
                            currentPage={Number(currentPage) || 1}
                            className="w-full"
                        />
                    </Table.ColumnHeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    );
};

export default DataTable;
