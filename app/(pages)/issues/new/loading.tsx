import { JSX } from "react";
import { Box, Skeleton } from "@radix-ui/themes";

const LoadingNewIssuePage = (): JSX.Element => {
    return (
        <Box className="max-w-xl">
            <Skeleton height="1.7rem"></Skeleton>
            <Skeleton height="24rem" className="mt-3"></Skeleton>
            <Skeleton height="1.7rem" width="10rem" className="mt-10"></Skeleton>
        </Box>
    );
};

export default LoadingNewIssuePage;
