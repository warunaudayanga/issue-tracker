"use client";

import { JSX } from "react";
import { Select, Skeleton } from "@radix-ui/themes";
import { useUsers } from "@/app/hooks";

const AssigneeSelect = (): JSX.Element | null => {
    const { users, error, isLoading } = useUsers();

    if (isLoading) return <Skeleton height="32px"></Skeleton>;

    if (error) return null;

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." className="!w-full" />
            <Select.Content>
                <Select.Group className="min-w-24">
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>
                            {user.name || user.email} {user.name && <small>({user.email})</small>}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default AssigneeSelect;
