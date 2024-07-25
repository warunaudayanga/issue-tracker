import { JSX } from "react";
import { Box, Skeleton } from "@radix-ui/themes";

const LoadingNewIssuePage = (): JSX.Element => {
    return (
        <Box className="max-w-xl space-y-3">
            <Skeleton height="1.7rem"></Skeleton>
            <Skeleton height="14rem"></Skeleton>
            <Skeleton height="1.7rem"></Skeleton>
        </Box>
    );
};

export default LoadingNewIssuePage;
