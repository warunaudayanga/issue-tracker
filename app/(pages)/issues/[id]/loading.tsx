import { JSX } from "react";
import { Box, Card, Flex, Grid, Skeleton } from "@radix-ui/themes";

const LoadingIssueDetailPage = (): JSX.Element => {
    const lines = Array.from({ length: 12 }, (_, i) => i);

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <Skeleton height="30px"></Skeleton>
                <Flex gap="3" mt="2" align="center">
                    <Skeleton height="20px" width="60px"></Skeleton>
                    <Skeleton height="24px" width="115px"></Skeleton>
                </Flex>
                <Card className="max-w-full mt-4 !flex flex-col gap-4">
                    {lines.map(line => (
                        <Skeleton key={line} height="20px" className="w-full"></Skeleton>
                    ))}
                </Card>
            </Box>
            <Box>
                <Flex direction="column" gap="4">
                    <Skeleton height="30px"></Skeleton>
                    <Skeleton height="30px"></Skeleton>
                </Flex>
            </Box>
        </Grid>
    );
};

export default LoadingIssueDetailPage;
