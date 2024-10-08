"use client";

import { JSX } from "react";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props): JSX.Element => {
    const data = [
        { label: "Open", value: open },
        { label: "In Progress", value: inProgress },
        { label: "Closed", value: closed },
    ];

    return (
        <Card>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey={"label"} />
                    <YAxis />
                    <Bar dataKey={"value"} barSize={60} style={{ fill: "var(--accent-11)" }} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default IssueChart;
