export interface LabelBase {
    label: string;
}

export type LabelValuePair<T, K extends string = "value"> = LabelBase & {
    [key in K]: T;
};

export interface TableColumn<T> {
    label: string;
    value: keyof T;
    className?: string;
}

export type TableColumns<T> = TableColumn<T>[];
