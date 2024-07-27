import React, { JSX } from "react";
import { IssueActions } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { TableColumns } from "@/app/types";
import DataTable from "@/app/components/DataTable";

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
        { label: "Status", value: "status", href: "", className: "hidden md:table-cell w-[140px] text-center" },
        { label: "Created", value: "createdAt", className: "hidden md:table-cell w-[140px] text-center" },
    ];

    let { page: currentPage, status, orderBy, dir } = searchParams;

    (status && Object.values(Status).includes(status)) || (status = undefined);
    (orderBy && columns.map(column => column.value).includes(orderBy)) || (orderBy = "createdAt");
    (dir && ["asc", "desc"].includes(dir)) || (dir = "desc");

    const page = Number(currentPage) || 1;
    const pageSize = 4;

    const items = await prisma.issue.findMany({
        where: { status },
        orderBy: { [orderBy]: dir },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalItems = await prisma.issue.count({ where: { status } });

    return (
        <>
            <IssueActions />
            <DataTable {...{ items, columns, searchParams, pageSize, totalItems }} />
        </>
    );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
