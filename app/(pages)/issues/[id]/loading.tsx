import { JSX } from "react";
import { Box, Card, Flex, Skeleton } from "@radix-ui/themes";

const LoadingIssueDetailPage = (): JSX.Element => {
    const lines = Array.from({ length: 9 }, (_, i) => i);

    return (
        <Box>
            <Skeleton height="30px"></Skeleton>
            <Flex gap="3" mt="2" align="center">
                <Skeleton height="20px" width="60px"></Skeleton>
                <Skeleton height="24px" width="115px"></Skeleton>
            </Flex>
            <Flex
                gap={{
                    initial: "5",
                    xs: "4",
                    sm: "6",
                }}
                mt="4"
                wrap={{
                    initial: "wrap-reverse",
                    sm: "nowrap",
                }}
            >
                <Card className="w-full !flex flex-col gap-4">
                    {lines.map(line => (
                        <Skeleton key={line} height="20px" className="w-full"></Skeleton>
                    ))}
                </Card>
                <Flex
                    minWidth="200px"
                    width={{
                        initial: "100%",
                        sm: "250px",
                    }}
                    direction="column"
                    gap="4"
                >
                    <Box
                        flexGrow={{
                            initial: "1",
                            sm: "0",
                        }}
                        flexShrink="1"
                    >
                        <Skeleton height="30px"></Skeleton>
                    </Box>
                    <Flex
                        flexShrink="0"
                        direction={{
                            initial: "column",
                            xs: "row",
                            sm: "column",
                        }}
                        gap={{
                            initial: "3",
                            sm: "4",
                        }}
                    >
                        <Skeleton height="30px" width={{ initial: "100%", xs: "75px", sm: "100%" }}></Skeleton>
                        <Skeleton height="30px" width={{ initial: "100%", xs: "125px", sm: "100%" }}></Skeleton>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default LoadingIssueDetailPage;
