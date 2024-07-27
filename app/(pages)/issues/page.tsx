import React, { JSX } from "react";
import { DataTable, IssueActions } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TableColumns } from "@/app/types";
import { Flex } from "@radix-ui/themes";

interface Props {
    searchParams?: {
        page?: string;
        status?: Status;
        orderBy?: keyof Issue;
        dir?: "asc" | "desc";
    };
}

const IssuesPage = async ({ searchParams = {} }: Props): Promise<JSX.Element> => {
    const columns: TableColumns<Issue> = [
        { label: "Issue", value: "title", type: "link", href: "" },
        { label: "Status", value: "status", href: "", className: "hidden md:table-cell w-[140px]", align: "center" },
        { label: "Created", value: "createdAt", className: "hidden md:table-cell w-[140px]", align: "center" },
    ];

    let { page: currentPage, status, orderBy, dir } = searchParams;

    (status && Object.values(Status).includes(status)) || (status = undefined);
    (orderBy && columns.map(column => column.value).includes(orderBy)) || (orderBy = "createdAt");
    (dir && ["asc", "desc"].includes(dir)) || (dir = "desc");

    const page = Number(currentPage) || 1;
    const pageSize = 20;

    const items = await prisma.issue.findMany({
        where: { status },
        orderBy: { [orderBy]: dir },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalItems = await prisma.issue.count({ where: { status } });

    return (
        <Flex direction="column" height="100%">
            <IssueActions />
            <DataTable {...{ items, columns, searchParams, pageSize, totalItems }} className="grow" />
        </Flex>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
