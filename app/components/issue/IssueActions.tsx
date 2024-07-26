import { JSX } from "react";
import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "@/app/components/issue/IssueStatusFilter";

const IssueActions = (): JSX.Element => {
    return (
        <Flex justify="between" mb="5">
            <Box>
                <IssueStatusFilter />
            </Box>
            <Box>
                <Button>
                    <Link href="/issues/new">New Issue</Link>
                </Button>
            </Box>
        </Flex>
    );
};

export default IssueActions;
