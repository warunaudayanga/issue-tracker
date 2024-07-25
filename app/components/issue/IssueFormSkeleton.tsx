import { JSX } from "react";
import { Box, Grid, Skeleton } from "@radix-ui/themes";

const IssueFormSkeleton = (): JSX.Element => {
    return (
        <>
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
                <Box className="space-y-5">
                    <Skeleton height="30px"></Skeleton>
                    <Skeleton height="470px"></Skeleton>
                </Box>
                <Box>
                    <Skeleton height="522px"></Skeleton>
                </Box>
            </Grid>
            <Skeleton height="32px" width="140px" mt="5"></Skeleton>
        </>
    );
};

export default IssueFormSkeleton;
