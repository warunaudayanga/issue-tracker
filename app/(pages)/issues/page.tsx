import { JSX } from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = (): JSX.Element => {
    return (
        <Button>
            <Link href="/issues/new">New Issue</Link>
        </Button>
    );
};

export default IssuesPage;
