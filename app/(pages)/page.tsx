import { JSX } from "react";
import Pagination from "@/app/components/Pagination/Pagination";

export default function Home({ searchParams: { page = "1" } = {} }: { searchParams?: { page?: string } }): JSX.Element {
    return <Pagination itemCount={10} pageSize={5} currentPage={parseInt(page)} />;
}
