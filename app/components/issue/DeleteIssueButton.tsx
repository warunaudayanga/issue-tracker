"use client";

import { JSX, useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Spinner } from "@/app/components";

const DeleteIssueButton = ({ issueId, className }: { issueId: string; className?: string }): JSX.Element => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const handleDeleteIssue = async (): Promise<void> => {
        try {
            setDeleting(true);
            await axios.delete(`/api/issues/${issueId}`);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setError(true);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" disabled={isDeleting} className={className}>
                        <BiTrash />
                        Delete Issue {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
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

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Something went wrong</AlertDialog.Title>
                    <AlertDialog.Description>We were unable to delete the issue.</AlertDialog.Description>
                    <Flex mt="2" justify="end">
                        <Button color="gray" variant="soft" onClick={() => setError(false)}>
                            Close
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteIssueButton;
