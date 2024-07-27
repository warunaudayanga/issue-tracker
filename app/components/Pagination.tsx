"use client";

import { JSX } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props): JSX.Element | null => {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (itemCount <= pageSize) return null;

    const pageCount = Math.ceil(itemCount / pageSize);

    const changePage = (page: number): void => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <Flex gap="5" align="center" justify="between">
            <Flex>
                <Text>
                    Page {currentPage} of {pageCount}
                </Text>
            </Flex>
            <Flex gap="2">
                <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
                    <DoubleArrowLeftIcon />
                </Button>
                <Button
                    color="gray"
                    variant="soft"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <ChevronLeftIcon />
                </Button>
                {Array.from({ length: pageCount }, (_, i) =>
                    currentPage === i + 1 ? (
                        <Button key={i}>{i + 1}</Button>
                    ) : (
                        <Button key={i} color="gray" variant="soft" onClick={() => changePage(i + 1)}>
                            {i + 1}
                        </Button>
                    ),
                )}
                <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
                    <ChevronRightIcon onClick={() => changePage(currentPage + 1)} />
                </Button>
                <Button
                    color="gray"
                    variant="soft"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(pageCount)}
                >
                    <DoubleArrowRightIcon />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Pagination;
