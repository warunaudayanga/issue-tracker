import { JSX } from "react";
import IssueForm from "@/app/components/issue/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

const EditIssuePage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return <IssueForm issue={issue}></IssueForm>;
};

export default EditIssuePage;
