import { JSX } from "react";
import { Button } from "@radix-ui/themes";
import { BiTrash } from "react-icons/bi";

const DeleteIssueButton = ({ issueId }: { issueId: string }): JSX.Element => {
    return (
        <Button color="red">
            <BiTrash />
            Delete Issue
        </Button>
    );
};

export default DeleteIssueButton;
