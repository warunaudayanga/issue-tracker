import { JSX } from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/app/components";

interface Props {
    params: {
        id: string;
    };
}

const IssueForm = dynamic(() => import("@/app/components/issue/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = async ({ params: { id } }: Props): Promise<JSX.Element> => {
    const issue = await prisma.issue.findUnique({ where: { id } });
    if (!issue) notFound();

    return <IssueForm issue={issue}></IssueForm>;
};

export default EditIssuePage;
