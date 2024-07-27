/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PaginationParams<T = any> {
    page?: string;
    orderBy?: keyof T;
    dir?: "asc" | "desc";
}
