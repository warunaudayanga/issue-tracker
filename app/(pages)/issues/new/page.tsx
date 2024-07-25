import { JSX } from "react";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/app/components";

const IssueForm = dynamic(() => import("@/app/components/issue/IssueForm"), {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = (): JSX.Element => {
    return <IssueForm />;
};

export default NewIssuePage;
