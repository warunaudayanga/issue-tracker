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
                    sm: "5",
                }}
                mt="4"
                wrap={{ initial: "wrap-reverse", sm: "nowrap" }}
                justify="end"
            >
                <Card className="w-full !flex flex-col gap-4">
                    {lines.map(line => (
                        <Skeleton key={line} height="20px" className="w-full"></Skeleton>
                    ))}
                </Card>
                <Flex minWidth={{ sm: "260px" }} width="250px" direction="column" gap="4">
                    <Box>
                        <Skeleton height="32px"></Skeleton>
                    </Box>
                    <div className="flex flex-wrap sm:flex-nowrap justify-end gap-4">
                        <Skeleton
                            height="30px"
                            width={{
                                initial: "110px",
                                sm: "100%",
                            }}
                        ></Skeleton>
                        <Skeleton
                            height="30px"
                            width={{
                                initial: "130px",
                                sm: "100%",
                            }}
                        ></Skeleton>
                    </div>
                </Flex>
            </Flex>
        </Box>
    );
};

export default LoadingIssueDetailPage;
