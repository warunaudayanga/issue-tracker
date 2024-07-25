import { JSX } from "react";
import { Box, Card, Flex, Skeleton, Text } from "@radix-ui/themes";

const LoadingIssueDetailPage = (): JSX.Element => {
    const lines = Array.from({ length: 8 }, (_, i) => i);

    return (
        <Box className="max-w-xl">
            <Skeleton height="2rem"></Skeleton>
            <Flex gap="3" mt="2" align="center">
                <Skeleton loading={true}>
                    <Text>{"A".repeat(8)}</Text>
                </Skeleton>
                <Skeleton>
                    <Text>{"A".repeat(20)}</Text>
                </Skeleton>
            </Flex>
            <Card className="prose mt-4 space-y-2">
                {lines.map(i => (
                    <Skeleton key={i}>
                        <Text key={i} className="w-full"></Text>
                    </Skeleton>
                ))}
            </Card>
        </Box>
    );
};

export default LoadingIssueDetailPage;
