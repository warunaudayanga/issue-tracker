import { JSX } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props): JSX.Element => {
    const pageCount = Math.ceil(itemCount / pageSize);
    return (
        <Flex gap="5" align="center" justify="between">
            <Flex>
                <Text>
                    Page {currentPage} of {pageCount}
                </Text>
            </Flex>
            <Flex gap="2">
                <Button color="gray" variant="soft" disabled={currentPage === 1}>
                    <DoubleArrowLeftIcon />
                </Button>
                <Button color="gray" variant="soft" disabled={currentPage === 1}>
                    <ChevronLeftIcon />
                </Button>
                {Array.from({ length: pageCount }, (_, i) =>
                    currentPage === i + 1 ? (
                        <Button key={i}>{i + 1}</Button>
                    ) : (
                        <Button key={i} color="gray" variant="soft">
                            {i + 1}
                        </Button>
                    ),
                )}
                <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
                    <ChevronRightIcon />
                </Button>
                <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
                    <DoubleArrowRightIcon />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Pagination;
