import { JSX } from "react";
import Pagination from "@/app/components/Pagination";

export default function Home(): JSX.Element {
    return <Pagination itemCount={10} pageSize={5} currentPage={1} />;
}
