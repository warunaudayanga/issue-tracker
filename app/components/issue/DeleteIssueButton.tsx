"use client";

import { JSX } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { BiTrash } from "react-icons/bi";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: string }): JSX.Element => {
    const router = useRouter();
    const handleDeleteIssue = async (): Promise<void> => {
        await axios.delete(`/api/issues/${issueId}`);
        router.push("/issues");
        router.refresh();
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">
                    <BiTrash />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                <AlertDialogDescription>
                    Are you sure you want to delete this issue? This action cannot be undone.
                </AlertDialogDescription>
                <Flex mt="4" gap="3" justify="end">
                    <AlertDialog.Cancel>
                        <Button color="gray" variant="soft">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red" onClick={handleDeleteIssue}>
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteIssueButton;
