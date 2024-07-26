"use client";

import { JSX, useState } from "react";
import { Button } from "@radix-ui/themes";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { AlertDialog, Spinner } from "@/app/components";
import { issueService } from "@/app/services/issue.service";
import { toast } from "react-hot-toast";

const DeleteIssueButton = ({ issueId }: { issueId: string }): JSX.Element => {
    const router = useRouter();
    const [isDeleting, setDeleting] = useState(false);
    const handleDeleteIssue = async (): Promise<void> => {
        try {
            setDeleting(true);
            await issueService.delete(issueId);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            toast.error("We were unable to delete the issue.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <AlertDialog
                type="confirm"
                title="Confirm Deletion"
                message="Are you sure you want to delete this issue? This action cannot be undone."
                actionButton="Delete Issue"
                color="red"
                onAction={handleDeleteIssue}
            >
                <Button color="red" disabled={isDeleting} className="!w-[125px]">
                    <BiTrash />
                    {!isDeleting && "Delete Issue"}
                    {isDeleting && (
                        <>
                            Deleting
                            <Spinner />
                        </>
                    )}
                </Button>
            </AlertDialog>
        </>
    );
};

export default DeleteIssueButton;
