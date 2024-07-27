/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export type LabelBase = {
    label: string;
};

export type LabelValuePair<T = any, K extends string = "value"> = LabelBase & {
    [key in K]: T;
};

export interface TableColumn<T = any> {
    label: string;
    value: keyof T;
    type?: "text" | "link" | "date" | "component";
    align?: "center" | "between" | "start" | "end";
    href?: string;
    component?: ReactNode;
    className?: string;
}

export type TableColumns<T = any> = TableColumn<T>[];
