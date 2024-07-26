import { JSX } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { ButtonLink } from "@/app/components";

const EditIssueButton = ({ issueId }: { issueId: string }): JSX.Element => {
    return (
        <ButtonLink href={`/issues/${issueId}/edit`}>
            <Pencil2Icon />
            Edit Issue
        </ButtonLink>
    );
};

export default EditIssueButton;
