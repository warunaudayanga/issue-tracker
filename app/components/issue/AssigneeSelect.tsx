"use client";

import { JSX, useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import { User } from "next-auth";
import axios from "axios";

const AssigneeSelect = (): JSX.Element => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async (): Promise<void> => {
            const { data } = await axios.get<User[]>("/api/users");
            setUsers(data);
        };
        void fetchUsers();
    }, []);

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." className="!w-full" />
            <Select.Content>
                <Select.Group className="min-w-24">
                    <Select.Label>Suggestions</Select.Label>
                    {users.map(user => (
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
