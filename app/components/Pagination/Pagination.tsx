"use client";

import { JSX } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotFilledIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import "./pagination.css";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
    className?: string;
}

const Pagination = ({ itemCount, pageSize, currentPage, className }: Props): JSX.Element | null => {
    const router = useRouter();
    const searchParams = useSearchParams();

    if (itemCount <= pageSize) return null;

    const pageCount = Math.ceil(itemCount / pageSize || 0);
    const pageButtonCount = 5;

    const changePage = (page: number): void => {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const shownPages = (): number[] => {
        const length = Math.min(pageCount, pageButtonCount);
        const startIndex = Math.max(Math.min(currentPage - Math.ceil(length / 2), pageCount - length), 0);
        return Array.from(new Array(length).keys(), item => item + startIndex);
    };

    return (
        <Flex gap="5" align="center" justify="between" className={className}>
            <Flex>
                <Text>
                    Page {currentPage} of {pageCount}
                </Text>
            </Flex>
            <Flex gap="2" align="center">
                <Button
                    className="pagination-button"
                    color="gray"
                    variant="soft"
                    disabled={currentPage === 1}
                    onClick={() => changePage(1)}
                >
                    <DoubleArrowLeftIcon />
                </Button>
                <Button
                    className="pagination-button"
                    color="gray"
                    variant="soft"
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    <ChevronLeftIcon />
                </Button>
                <DotFilledIcon className="sm-only" />
                {shownPages().map(i =>
                    currentPage === i + 1 ? (
                        <Button key={i} className="pagination-button sm-only">
                            {i + 1}
                        </Button>
                    ) : (
                        <Button
                            key={i}
                            className="pagination-button sm-only"
                            color="gray"
                            variant="soft"
                            onClick={() => changePage(i + 1)}
                        >
                            {i + 1}
                        </Button>
                    ),
                )}
                <DotFilledIcon className="sm-only" />
                <Button
                    className="pagination-button"
                    color="gray"
                    variant="soft"
                    disabled={currentPage === pageCount}
                    onClick={() => changePage(currentPage + 1)}
                >
                    <ChevronRightIcon />
                </Button>
                <Button
                    className="pagination-button"
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
