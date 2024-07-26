import { AxiosResponse } from "axios";

export interface GetAllResponse<T> {
    request: Promise<AxiosResponse<T>>;
    cancel: () => void;
}

export interface ApiError {
    error: string;
}
