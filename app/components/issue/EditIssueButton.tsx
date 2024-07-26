import { JSX } from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ issueId, className }: { issueId: string; className?: string }): JSX.Element => {
    return (
        <Button className={className}>
            <Pencil2Icon />
            <Link href={`/issues/${issueId}/edit`}>Edit</Link>
        </Button>
    );
};

export default EditIssueButton;
