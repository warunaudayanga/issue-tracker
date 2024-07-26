"use client";

import { JSX, useState } from "react";
import { Box, Flex, Select, Skeleton, Text } from "@radix-ui/themes";
import { useUsers } from "@/app/hooks";
import { issueService } from "@/app/services/issue.service";
import { Issue } from "@prisma/client";
import { Spinner } from "@/app/components";
import { toast, Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }): JSX.Element | null => {
    const { users, error, isLoading } = useUsers();
    const [userId, setUserId] = useState(issue.userId || "unassigned");
    const [isAssigning, setAssigning] = useState(false);

    if (isLoading) return <Skeleton height="32px"></Skeleton>;

    if (error) return null;

    const handleAssign = async (id: string | null): Promise<void> => {
        try {
            setAssigning(true);
            await issueService.update(issue.id, { userId: id === "unassigned" ? null : id });
            setUserId(id || "unassigned");
        } catch (error) {
            toast.error("We were unable to assign the issue.");
        } finally {
            setAssigning(false);
        }
    };

    const getUserLabel = (): string => {
        const user = users?.find(user => user.id === userId);
        return user?.name || user?.email || "Unassigned";
    };

    return (
        <>
            <Select.Root disabled={isAssigning} value={userId || "unassigned"} onValueChange={handleAssign}>
                <Select.Trigger placeholder="Assign..." className="!w-full !relative">
                    <Flex align="center" gap="2">
                        <Text truncate mr="5">
                            {getUserLabel()}
                        </Text>
                        {isAssigning && (
                            <Box mr="1" position="absolute" right="5">
                                <Spinner />
                            </Box>
                        )}
                    </Flex>
                </Select.Trigger>
                <Select.Content>
                    <Select.Group className="min-w-24">
                        <Select.Item value="unassigned">Unassigned</Select.Item>
                        <Select.Label>Suggestions</Select.Label>
                        {users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>
                                {user.name || user.email} {user.name && <small>({user.email})</small>}
                            </Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>

            <Toaster />
        </>
    );
};

export default AssigneeSelect;
